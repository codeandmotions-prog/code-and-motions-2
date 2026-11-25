-- 40. Device sync foundation — offline PC  ->  cloud "outbox / inbox" (additive; safe to re-run)
--
-- A Basic Offline PC has no Supabase login after activation, so it cannot use RLS-protected tables.
-- Instead each activated PC gets its OWN random sync token (minted at activation, or once by the PC
-- itself if it was activated before this update). Only the token's SHA-256 hash is stored here.
-- The PC hands queued items to the `offline-sync` Edge Function (service role), which calls
-- `device_sync_push`. Nothing in sections 1-39 is changed by this section.
--
-- What it provides:
--   * idempotent receiving (a resent item is acknowledged as a duplicate, never stored twice),
--   * per-entity version ordering + last-write-wins between PCs (see device_sync_push),
--   * per-channel server allowlist and limits (a channel that is not listed/enabled is refused),
--   * rate limits, and credentials that die with the key (revoke / reset / re-bind).
--
-- Security model (same as section 37):
--   * every table has RLS ON with ZERO policies and no grants to anon/authenticated,
--   * the token functions and device_sync_push are callable ONLY by the service role,
--   * the admin functions check is_admin() themselves,
--   * the PC's data is only ever stored for the lab that owns the key (owner_id comes from the key row,
--     never from the request).
--
-- Requires section 37 (offline_license_keys, offline_audit_write).

-- 40a. Channels: the server-side allowlist. A new kind of data is only accepted once a row exists here.
create table if not exists public.device_sync_channels (
    channel text primary key check (channel ~ '^[a-z][a-z0-9_]{1,31}$'),
    enabled boolean not null default true,
    allowed_ops text[] not null default array['upsert', 'delete', 'event'],
    max_payload_bytes integer not null default 65536 check (max_payload_bytes between 1 and 262144),
    -- true: every accepted item is kept in device_sync_items (needed for append-only 'event' data and
    -- for exact duplicate detection). false: only the latest state per entity is kept (e.g. heartbeat).
    retain_items boolean not null default true,
    retention_days integer not null default 365 check (retention_days between 1 and 3650),
    description text,
    updated_at timestamptz not null default now(),
    constraint device_sync_channels_ops_valid check (allowed_ops <@ array['upsert', 'delete', 'event']),
    -- 'event' items are append-only and have no entity row to compare, so they need the item log to be
    -- idempotent.
    constraint device_sync_channels_event_needs_log check (retain_items or not ('event' = any (allowed_ops)))
);

alter table public.device_sync_channels enable row level security;
revoke all on public.device_sync_channels from anon, authenticated;

-- The one channel this foundation ships with: a tiny "this PC is alive" record. No lab data in it.
insert into public.device_sync_channels (channel, enabled, allowed_ops, max_payload_bytes, retain_items, retention_days, description)
values ('heartbeat', true, array['upsert'], 4096, false, 30,
        'Per-PC status: app version, local database version, queue size. Contains no patient or report data.')
on conflict (channel) do nothing;

-- 40b. One credential per activated key/PC (hash only).
create table if not exists public.device_sync_credentials (
    key_id uuid primary key references public.offline_license_keys (id) on delete cascade,
    owner_id uuid not null,
    fp_hash text not null,
    token_hash text not null unique,
    created_at timestamptz not null default now(),
    last_used_at timestamptz
);

alter table public.device_sync_credentials enable row level security;
revoke all on public.device_sync_credentials from anon, authenticated;

-- 40c. Per-key sync state: last contact, rate-limit windows, and what the PC last reported about itself.
create table if not exists public.device_sync_state (
    key_id uuid primary key references public.offline_license_keys (id) on delete cascade,
    owner_id uuid not null,
    last_push_at timestamptz,
    last_ok_at timestamptz,
    window_start timestamptz not null default now(),
    window_count integer not null default 0,
    fail_window_start timestamptz,
    fail_count integer not null default 0,
    items_received bigint not null default 0,
    app_version text,
    schema_version integer,
    outbox_pending integer,
    outbox_failed integer,
    updated_at timestamptz not null default now()
);

alter table public.device_sync_state enable row level security;
revoke all on public.device_sync_state from anon, authenticated;

-- 40d. The inbox: every accepted item of a channel with retain_items = true (also the idempotency record).
create table if not exists public.device_sync_items (
    id bigserial primary key,
    key_id uuid not null references public.offline_license_keys (id) on delete cascade,
    owner_id uuid not null,
    device_fp_hash text not null,
    item_id uuid not null,
    channel text not null,
    entity_type text not null,
    entity_id text not null,
    op text not null check (op in ('upsert', 'delete', 'event')),
    seq bigint not null,
    client_ts timestamptz not null,
    payload jsonb,
    -- applied: became the current version / appended. stale: an older version of an entity that was already
    -- superseded (kept for audit, not applied). conflict: lost to a newer write from another PC (same).
    status text not null check (status in ('applied', 'stale', 'conflict')),
    received_at timestamptz not null default now(),
    unique (key_id, item_id)
);

create index if not exists idx_device_sync_items_owner_channel on public.device_sync_items (owner_id, channel, received_at desc);
create index if not exists idx_device_sync_items_key_received on public.device_sync_items (key_id, received_at);

alter table public.device_sync_items enable row level security;
revoke all on public.device_sync_items from anon, authenticated;

-- 40e. Latest version of every entity of a lab (what later features read).
create table if not exists public.device_sync_entities (
    owner_id uuid not null,
    channel text not null,
    entity_type text not null,
    entity_id text not null,
    key_id uuid not null references public.offline_license_keys (id) on delete cascade,
    device_fp_hash text not null,
    seq bigint not null,
    client_ts timestamptz not null,
    deleted boolean not null default false,
    payload jsonb,
    updated_at timestamptz not null default now(),
    primary key (owner_id, channel, entity_type, entity_id)
);

alter table public.device_sync_entities enable row level security;
revoke all on public.device_sync_entities from anon, authenticated;

-- 40f. A credential never outlives the activation it was issued for: revoking a key, resetting it, or
--      re-binding it to another PC removes it (the PC must enrol again). Updates that only refresh the
--      device name / last-seen leave it alone.
create or replace function public.trg_device_sync_drop_credentials()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status is distinct from 'activated' or new.device_fp_hash is distinct from old.device_fp_hash then
    delete from public.device_sync_credentials where key_id = new.id;
  end if;
  return new;
end;
$$;

revoke all on function public.trg_device_sync_drop_credentials() from public, anon, authenticated;

drop trigger if exists trg_device_sync_drop_credentials on public.offline_license_keys;
create trigger trg_device_sync_drop_credentials
  after update of status, device_fp_hash on public.offline_license_keys
  for each row execute function public.trg_device_sync_drop_credentials();

-- 40g. Store a PC's sync token (hash only). The Edge Function creates the random token and hashes it.
--      p_replace = true : used right after a successful activation (the lab just proved itself with its
--                         login AND its one-time key), so any older token for this key is replaced.
--      p_replace = false: used by a PC that was activated before sync existed. Allowed ONCE (first
--                         enrolment wins); a PC that lost its token needs an admin reset.
--      Result: ok | invalid | not_activated | already_enrolled | rate_limited
create or replace function public.device_sync_issue_token(
  p_license_id uuid,
  p_fp_hash text,
  p_token_hash text,
  p_replace boolean default false
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_key public.offline_license_keys%rowtype;
  v_state public.device_sync_state%rowtype;
begin
  if p_license_id is null
     or p_fp_hash is null or p_fp_hash !~ '^[0-9a-f]{64}$'
     or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    return 'invalid';
  end if;

  select * into v_key from public.offline_license_keys where id = p_license_id for update;
  if not found or v_key.status <> 'activated' or v_key.device_fp_hash is distinct from p_fp_hash then
    return 'not_activated';
  end if;

  insert into public.device_sync_state (key_id, owner_id) values (v_key.id, v_key.owner_id)
    on conflict (key_id) do nothing;
  select * into v_state from public.device_sync_state where key_id = v_key.id for update;

  if v_state.fail_window_start is null or v_state.fail_window_start < v_now - interval '10 minutes' then
    v_state.fail_window_start := v_now;
    v_state.fail_count := 0;
  end if;

  if not p_replace and exists (select 1 from public.device_sync_credentials where key_id = v_key.id) then
    if v_state.fail_count >= 20 then
      return 'rate_limited';
    end if;
    update public.device_sync_state
       set fail_window_start = v_state.fail_window_start, fail_count = v_state.fail_count + 1, updated_at = v_now
     where key_id = v_key.id;
    -- Leave a trace for the admin, at most once an hour per key.
    if not exists (select 1 from public.offline_license_audit
                    where key_id = v_key.id and action = 'sync_enroll_refused'
                      and created_at > v_now - interval '1 hour') then
      perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'sync_enroll_refused', 'device',
        v_key.device_name, 'A sync enrolment was refused because this PC already has a sync token.');
    end if;
    return 'already_enrolled';
  end if;

  insert into public.device_sync_credentials (key_id, owner_id, fp_hash, token_hash)
  values (v_key.id, v_key.owner_id, p_fp_hash, p_token_hash)
  on conflict (key_id) do update
     set owner_id = excluded.owner_id, fp_hash = excluded.fp_hash, token_hash = excluded.token_hash,
         created_at = now(), last_used_at = null;

  perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'sync_enrolled', 'device',
    v_key.device_name,
    case when p_replace then 'Sync enabled for this PC (at activation).' else 'Sync enabled for this PC (first enrolment).' end);
  return 'ok';
end;
$$;

revoke all on function public.device_sync_issue_token(uuid, text, text, boolean) from public, anon, authenticated;
grant execute on function public.device_sync_issue_token(uuid, text, text, boolean) to service_role;

-- 40h. Receive a batch (<= 100 items) from one PC. Returns jsonb:
--        { ok: false, code: 'unauthorized' | 'rate_limited' | 'bad_request', retry_after? }
--        { ok: true, server_time, results: [ { item_id, result, reason? } ] }
--      result: applied | duplicate | stale | conflict | rejected
--      The PC treats applied/duplicate/stale/conflict as "the server has it" and rejected as "this item can
--      never be accepted" (it keeps those locally). A bad item never fails the rest of the batch.
--
--      Ordering / conflicts per entity (upsert/delete):
--        * no version yet                      -> applied
--        * same PC (same fingerprint)          -> higher seq wins; seq <= current is 'stale'
--        * a different PC of the same lab      -> newer client time wins (a tie goes to the later arrival);
--                                                 the loser is 'conflict' and is kept in the log, not applied
--      'event' items are append-only and never conflict. client time is clamped to [2020-01-01, now + 5 min].
create or replace function public.device_sync_push(
  p_license_id uuid,
  p_token_hash text,
  p_items jsonb,
  p_meta jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_key public.offline_license_keys%rowtype;
  v_cred public.device_sync_credentials%rowtype;
  v_state public.device_sync_state%rowtype;
  v_ch public.device_sync_channels%rowtype;
  v_ent public.device_sync_entities%rowtype;
  v_item jsonb;
  v_results jsonb := '[]'::jsonb;
  v_result text;
  v_reason text;
  v_item_id text;
  v_channel text;
  v_etype text;
  v_eid text;
  v_op text;
  v_seq bigint;
  v_ts timestamptz;
  v_payload jsonb;
  v_rows integer;
  v_applied integer := 0;
  v_retry integer;
  v_app text;
  v_schema integer;
  v_pending integer;
  v_failed integer;
  v_authorized boolean;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) > 100 then
    return jsonb_build_object('ok', false, 'code', 'bad_request');
  end if;
  if p_meta is null or jsonb_typeof(p_meta) <> 'object' then
    p_meta := '{}'::jsonb;
  end if;

  select * into v_key from public.offline_license_keys where id = p_license_id;
  if not found then
    return jsonb_build_object('ok', false, 'code', 'unauthorized');
  end if;

  insert into public.device_sync_state (key_id, owner_id) values (v_key.id, v_key.owner_id)
    on conflict (key_id) do nothing;
  -- One push at a time per PC: keeps the ordering rules below race-free.
  select * into v_state from public.device_sync_state where key_id = v_key.id for update;

  select * into v_cred from public.device_sync_credentials where key_id = v_key.id;
  v_authorized := found
    and v_cred.token_hash = coalesce(p_token_hash, '')
    and v_key.status = 'activated'
    and v_key.device_fp_hash is not distinct from v_cred.fp_hash;

  if not v_authorized then
    -- Wrong/unknown token: answer cheaply and cap how much work a guesser can cause. A request with the
    -- right token is never blocked by this counter.
    if v_state.fail_window_start is null or v_state.fail_window_start < v_now - interval '10 minutes' then
      v_state.fail_window_start := v_now;
      v_state.fail_count := 0;
    end if;
    if v_state.fail_count >= 20 then
      v_retry := greatest(1, ceil(extract(epoch from (v_state.fail_window_start + interval '10 minutes' - v_now)))::integer);
      return jsonb_build_object('ok', false, 'code', 'rate_limited', 'retry_after', v_retry);
    end if;
    update public.device_sync_state
       set fail_window_start = v_state.fail_window_start, fail_count = v_state.fail_count + 1, updated_at = v_now
     where key_id = v_key.id;
    return jsonb_build_object('ok', false, 'code', 'unauthorized');
  end if;

  if v_state.window_start < v_now - interval '10 minutes' then
    v_state.window_start := v_now;
    v_state.window_count := 0;
  end if;
  if v_state.window_count >= 60 then
    v_retry := greatest(1, ceil(extract(epoch from (v_state.window_start + interval '10 minutes' - v_now)))::integer);
    return jsonb_build_object('ok', false, 'code', 'rate_limited', 'retry_after', v_retry);
  end if;
  v_state.window_count := v_state.window_count + 1;

  for v_item in select value from jsonb_array_elements(p_items) loop
    v_result := null;
    v_reason := null;
    v_item_id := v_item ->> 'item_id';

    begin
      v_channel := v_item ->> 'channel';
      v_etype := v_item ->> 'entity_type';
      v_eid := v_item ->> 'entity_id';
      v_op := v_item ->> 'op';
      v_seq := (v_item ->> 'seq')::bigint;
      v_ts := (v_item ->> 'client_ts')::timestamptz;
      v_payload := v_item -> 'payload';
      if v_payload is not null and jsonb_typeof(v_payload) = 'null' then
        v_payload := null;
      end if;
      perform v_item_id::uuid;

      if v_channel is null or v_channel !~ '^[a-z][a-z0-9_]{1,31}$'
         or v_etype is null or v_etype !~ '^[a-z][a-z0-9_]{1,31}$'
         or v_eid is null or char_length(v_eid) not between 1 and 128
         or v_op is null or v_op not in ('upsert', 'delete', 'event')
         or v_seq is null or v_seq < 1
         or v_ts is null then
        v_result := 'rejected';
        v_reason := 'bad_item';
      else
        select * into v_ch from public.device_sync_channels where channel = v_channel;
        if not found then
          v_result := 'rejected';
          v_reason := 'unknown_channel';
        elsif not v_ch.enabled then
          v_result := 'rejected';
          v_reason := 'channel_disabled';
        elsif not (v_op = any (v_ch.allowed_ops)) then
          v_result := 'rejected';
          v_reason := 'op_not_allowed';
        elsif v_op <> 'delete' and (v_payload is null or jsonb_typeof(v_payload) <> 'object') then
          v_result := 'rejected';
          v_reason := 'bad_item';
        elsif v_op <> 'delete' and octet_length(v_payload::text) > v_ch.max_payload_bytes then
          v_result := 'rejected';
          v_reason := 'payload_too_large';
        end if;
      end if;

      if v_result is null then
        if v_op = 'delete' then
          v_payload := null;
        end if;
        v_ts := least(greatest(v_ts, timestamptz '2020-01-01 00:00:00+00'), v_now + interval '5 minutes');

        if v_ch.retain_items then
          insert into public.device_sync_items
            (key_id, owner_id, device_fp_hash, item_id, channel, entity_type, entity_id, op, seq, client_ts, payload, status)
          values
            (v_key.id, v_key.owner_id, v_key.device_fp_hash, v_item_id::uuid, v_channel, v_etype, v_eid, v_op, v_seq,
             v_ts, v_payload, 'applied')
          on conflict (key_id, item_id) do nothing;
          get diagnostics v_rows = row_count;
          if v_rows = 0 then
            v_result := 'duplicate';
          end if;
        end if;

        if v_result is null then
          if v_op = 'event' then
            v_result := 'applied';
          else
            insert into public.device_sync_entities
              (owner_id, channel, entity_type, entity_id, key_id, device_fp_hash, seq, client_ts, deleted, payload, updated_at)
            values
              (v_key.owner_id, v_channel, v_etype, v_eid, v_key.id, v_key.device_fp_hash, v_seq, v_ts, v_op = 'delete',
               v_payload, v_now)
            on conflict (owner_id, channel, entity_type, entity_id) do nothing;
            get diagnostics v_rows = row_count;
            if v_rows = 1 then
              v_result := 'applied';
            else
              select * into v_ent from public.device_sync_entities
               where owner_id = v_key.owner_id and channel = v_channel and entity_type = v_etype and entity_id = v_eid
               for update;
              if v_ent.device_fp_hash = v_key.device_fp_hash then
                v_result := case when v_seq > v_ent.seq then 'applied' else 'stale' end;
              else
                v_result := case when v_ts >= v_ent.client_ts then 'applied' else 'conflict' end;
              end if;
              if v_result = 'applied' then
                update public.device_sync_entities
                   set key_id = v_key.id, device_fp_hash = v_key.device_fp_hash, seq = v_seq, client_ts = v_ts,
                       deleted = (v_op = 'delete'), payload = v_payload, updated_at = v_now
                 where owner_id = v_key.owner_id and channel = v_channel and entity_type = v_etype and entity_id = v_eid;
              end if;
            end if;
          end if;

          if v_result in ('stale', 'conflict') and v_ch.retain_items then
            update public.device_sync_items set status = v_result
             where key_id = v_key.id and item_id = v_item_id::uuid;
          end if;
        end if;
      end if;
    exception when others then
      -- This one item is unusable (for example a malformed value). Its own writes are rolled back; the rest
      -- of the batch is unaffected.
      v_result := 'rejected';
      v_reason := 'bad_item';
    end;

    if v_result = 'applied' then
      v_applied := v_applied + 1;
    end if;
    v_results := v_results || jsonb_build_array(
      jsonb_build_object('item_id', v_item_id, 'result', v_result)
      || case when v_reason is null then '{}'::jsonb else jsonb_build_object('reason', v_reason) end);
  end loop;

  v_app := left(nullif(p_meta ->> 'app_version', ''), 40);
  v_schema := case when (p_meta ->> 'schema_version') ~ '^[0-9]{1,6}$' then (p_meta ->> 'schema_version')::integer end;
  v_pending := case when (p_meta ->> 'outbox_pending') ~ '^[0-9]{1,9}$' then (p_meta ->> 'outbox_pending')::integer end;
  v_failed := case when (p_meta ->> 'outbox_failed') ~ '^[0-9]{1,9}$' then (p_meta ->> 'outbox_failed')::integer end;

  update public.device_sync_state
     set last_push_at = v_now,
         last_ok_at = v_now,
         window_start = v_state.window_start,
         window_count = v_state.window_count,
         fail_count = 0,
         fail_window_start = null,
         items_received = items_received + v_applied,
         app_version = coalesce(v_app, app_version),
         schema_version = coalesce(v_schema, schema_version),
         outbox_pending = coalesce(v_pending, outbox_pending),
         outbox_failed = coalesce(v_failed, outbox_failed),
         updated_at = v_now
   where key_id = v_key.id;

  update public.device_sync_credentials set last_used_at = v_now where key_id = v_key.id;

  -- Housekeeping: drop a bounded number of this PC's items that are past their channel's retention.
  delete from public.device_sync_items
   where id in (
     select i.id
       from public.device_sync_items i
       join public.device_sync_channels c on c.channel = i.channel
      where i.key_id = v_key.id
        and i.received_at < v_now - make_interval(days => c.retention_days)
      limit 200
   );

  return jsonb_build_object('ok', true, 'server_time', v_now, 'results', v_results);
end;
$$;

revoke all on function public.device_sync_push(uuid, text, jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.device_sync_push(uuid, text, jsonb, jsonb) to service_role;

-- 40i. Admin: what each of a lab's PCs last reported (never any item contents).
drop function if exists public.admin_device_sync_status(uuid);
create or replace function public.admin_device_sync_status(p_owner_id uuid)
returns table (
  key_id uuid,
  key_hint text,
  device_name text,
  key_status text,
  enrolled boolean,
  last_ok_at timestamptz,
  app_version text,
  schema_version integer,
  outbox_pending integer,
  outbox_failed integer,
  items_received bigint
)
language plpgsql
security definer
stable
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  return query
    select k.id, k.key_hint, k.device_name, k.status, (c.key_id is not null), s.last_ok_at, s.app_version,
           s.schema_version, s.outbox_pending, s.outbox_failed, coalesce(s.items_received, 0::bigint)
      from public.offline_license_keys k
      left join public.device_sync_credentials c on c.key_id = k.id
      left join public.device_sync_state s on s.key_id = k.id
     where k.owner_id = p_owner_id
       and k.status <> 'unused'
     order by k.created_at desc;
end;
$$;

revoke all on function public.admin_device_sync_status(uuid) from public, anon;
grant execute on function public.admin_device_sync_status(uuid) to authenticated;

-- 40j. Admin: open the enrolment again for a PC that lost its sync token (the next time it is online it
--      enrols once more). Does not touch the license or the key.
create or replace function public.admin_reset_device_sync(p_key_id uuid, p_reason text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key public.offline_license_keys%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  select * into v_key from public.offline_license_keys where id = p_key_id for update;
  if not found then
    raise exception 'Key not found.';
  end if;

  delete from public.device_sync_credentials where key_id = p_key_id;
  update public.device_sync_state set fail_count = 0, fail_window_start = null, updated_at = now() where key_id = p_key_id;

  perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'sync_credential_reset', 'admin',
    v_key.device_name, nullif(trim(p_reason), ''));
end;
$$;

revoke all on function public.admin_reset_device_sync(uuid, text) from public, anon;
grant execute on function public.admin_reset_device_sync(uuid, text) to authenticated;
