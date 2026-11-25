-- 41-45. Phase 2: key expiry, offline QR verification, audit events, mode directive, offline -> online migration
-- (additive; safe to re-run). Requires sections 37 and 40.
--
--   41  Activation key expiry (signed into the license, so editing local files cannot extend it).
--   42  Offline QR report verification: snapshot of a report the PC sends while online + a public lookup function.
--   43  Audit events from offline PCs + one admin search function across every audit source.
--   44  Mode directive: what a PC may ask the server ("am I still offline? is my key valid / expiring?").
--   45  Offline -> Online migration: verified, idempotent upload of a PC's lab data into the lab's cloud tables.
--
-- Security model is unchanged from section 40: every new table has RLS ON with ZERO policies and no grants to
-- anon/authenticated; device functions are callable only by the service role (the Edge Functions); admin functions
-- check is_admin(); the one public function (get_offline_report_verification) returns a small fixed set of fields
-- for an unguessable token and nothing else. The owner of any stored row is ALWAYS taken from the key row, never
-- from the request.

-- =====================================================================================================
-- 41. Activation key expiry
-- =====================================================================================================
-- expires_at is NULL for every existing key = no expiry, so nothing changes for keys issued before this section.
-- The date is signed into the license the PC receives (license payload v3); a PC keeps working through
-- `grace_days` after the date, then shows an "expired" screen. Data is never deleted.
alter table public.offline_license_keys add column if not exists expires_at timestamptz;
alter table public.offline_license_keys add column if not exists grace_days integer not null default 7;
alter table public.offline_license_keys add column if not exists license_changed_at timestamptz;
alter table public.offline_license_keys add column if not exists expired_logged_at timestamptz;

update public.offline_license_keys set license_changed_at = coalesce(activated_at, created_at) where license_changed_at is null;
alter table public.offline_license_keys alter column license_changed_at set default now();
alter table public.offline_license_keys alter column license_changed_at set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'offline_license_keys_grace_days_check') then
    alter table public.offline_license_keys
      add constraint offline_license_keys_grace_days_check check (grace_days between 0 and 90);
  end if;
end $$;

-- 41a. Generate a key, optionally with an expiry. The old two-argument function is replaced (the new one accepts the
--      same two-argument call), so existing callers keep working and PostgREST sees a single function.
drop function if exists public.admin_generate_offline_key(uuid, text);
create or replace function public.admin_generate_offline_key(
  p_owner_id uuid,
  p_note text default null,
  p_expires_at timestamptz default null
)
returns table (key_id uuid, key_text text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lab public.labs%rowtype;
  v_alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_bytes bytea;
  v_plain text := '';
  v_i integer;
  v_id uuid;
  v_open integer;
  v_details text;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  select * into v_lab from public.labs where owner_id = p_owner_id;
  if not found then
    raise exception 'Lab not found.';
  end if;
  if v_lab.account_status <> 'active' then
    raise exception 'This lab account is not active.';
  end if;
  if v_lab.plan is distinct from 'basic_offline' then
    raise exception 'This lab is not on the Basic Offline plan.';
  end if;
  if p_expires_at is not null and (p_expires_at <= now() + interval '1 hour' or p_expires_at > now() + interval '10 years') then
    raise exception 'This key expiry must be a future date within 10 years.';
  end if;

  select count(*) into v_open from public.offline_license_keys
    where owner_id = p_owner_id and status <> 'revoked';
  if v_open >= 20 then
    raise exception 'This lab already has 20 active/unused keys. Revoke or delete some first.';
  end if;

  v_bytes := extensions.gen_random_bytes(25);
  for v_i in 0..24 loop
    v_plain := v_plain || substr(v_alphabet, (get_byte(v_bytes, v_i) % 32) + 1, 1);
  end loop;

  insert into public.offline_license_keys (owner_id, key_hash, key_hint, note, created_by, expires_at)
  values (p_owner_id, public.offline_hash_key(v_plain), right(v_plain, 4), nullif(trim(p_note), ''), auth.uid(), p_expires_at)
  returning id into v_id;

  v_details := concat_ws(' · ', nullif(trim(p_note), ''),
    case when p_expires_at is null then 'No expiry'
         else 'Expires ' || to_char(p_expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"') end);
  perform public.offline_audit_write(p_owner_id, v_id, right(v_plain, 4), 'key_generated', 'admin', null, v_details);

  return query select v_id,
    'LN-' || substr(v_plain, 1, 5) || '-' || substr(v_plain, 6, 5) || '-' || substr(v_plain, 11, 5)
          || '-' || substr(v_plain, 16, 5) || '-' || substr(v_plain, 21, 5);
end;
$$;

revoke all on function public.admin_generate_offline_key(uuid, text, timestamptz) from public, anon;
grant execute on function public.admin_generate_offline_key(uuid, text, timestamptz) to authenticated;

-- 41b. List a lab's keys. effective_status: unused | activated | expired | revoked ("expired" = past its expiry date
--      and not revoked; the PC may still be inside its grace period, see grace_ends_at).
drop function if exists public.admin_list_offline_keys(uuid);
create or replace function public.admin_list_offline_keys(p_owner_id uuid)
returns table (
  id uuid,
  key_hint text,
  note text,
  status text,
  created_at timestamptz,
  activated_at timestamptz,
  device_name text,
  device_info text,
  last_seen_at timestamptz,
  revoked_at timestamptz,
  revoked_reason text,
  reset_count integer,
  expires_at timestamptz,
  grace_days integer,
  grace_ends_at timestamptz,
  effective_status text
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
    select k.id, k.key_hint, k.note, k.status, k.created_at, k.activated_at, k.device_name,
           k.device_info, k.last_seen_at, k.revoked_at, k.revoked_reason, k.reset_count,
           k.expires_at, k.grace_days,
           case when k.expires_at is null then null else k.expires_at + make_interval(days => k.grace_days) end,
           case when k.status = 'revoked' then 'revoked'
                when k.expires_at is not null and k.expires_at <= now() then 'expired'
                else k.status end
    from public.offline_license_keys k
    where k.owner_id = p_owner_id
    order by k.created_at desc;
end;
$$;

revoke all on function public.admin_list_offline_keys(uuid) from public, anon;
grant execute on function public.admin_list_offline_keys(uuid) to authenticated;

-- 41c. Change, extend, shorten or remove (NULL) a key's expiry. The next time the PC is online it receives a newly
--      signed license (see check_offline_license_v2), so extending a key brings an expired PC back.
create or replace function public.admin_set_offline_key_expiry(
  p_key_id uuid,
  p_expires_at timestamptz,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key public.offline_license_keys%rowtype;
  v_old text;
  v_new text;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  select * into v_key from public.offline_license_keys where id = p_key_id for update;
  if not found then
    raise exception 'Key not found.';
  end if;
  if v_key.status = 'revoked' then
    raise exception 'This key is revoked, so its expiry cannot be changed.';
  end if;
  if p_expires_at is not null and (p_expires_at < timestamptz '2020-01-01 00:00:00+00' or p_expires_at > now() + interval '10 years') then
    raise exception 'This key expiry must be a date between 2020 and 10 years from now.';
  end if;
  if v_key.expires_at is not distinct from p_expires_at then
    raise exception 'This key already has that expiry.';
  end if;

  update public.offline_license_keys
     set expires_at = p_expires_at, license_changed_at = now(), expired_logged_at = null, updated_at = now()
   where id = p_key_id;

  v_old := case when v_key.expires_at is null then 'no expiry'
                else to_char(v_key.expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"') end;
  v_new := case when p_expires_at is null then 'no expiry'
                else to_char(p_expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"') end;
  perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'key_expiry_changed', 'admin',
    v_key.device_name, concat_ws(' · ', v_old || ' → ' || v_new, nullif(trim(p_reason), '')));
end;
$$;

revoke all on function public.admin_set_offline_key_expiry(uuid, timestamptz, text) from public, anon;
grant execute on function public.admin_set_offline_key_expiry(uuid, timestamptz, text) to authenticated;

-- 41d. Record (once) that a key has passed its expiry date. Called by the Web Admin before it lists a lab's keys and
--      by check_offline_license_v2; the audit entry is written when the system notices, and says when it expired.
create or replace function public.admin_sweep_expired_keys(p_owner_id uuid default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.offline_license_keys%rowtype;
  n integer := 0;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  for r in
    select * from public.offline_license_keys k
     where k.status in ('unused', 'activated')
       and k.expires_at is not null and k.expires_at <= now() and k.expired_logged_at is null
       and (p_owner_id is null or k.owner_id = p_owner_id)
     for update
  loop
    update public.offline_license_keys set expired_logged_at = now() where id = r.id;
    insert into public.offline_license_audit (owner_id, key_id, key_hint, action, actor_type, device_name, details)
    values (r.owner_id, r.id, r.key_hint, 'key_expired', 'system', r.device_name,
            'Key expired on ' || to_char(r.expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"')
            || ' (grace period: ' || r.grace_days || ' days)');
    n := n + 1;
  end loop;
  return n;
end;
$$;

revoke all on function public.admin_sweep_expired_keys(uuid) from public, anon;
grant execute on function public.admin_sweep_expired_keys(uuid) to authenticated;

-- 41e. Activation: same as section 37j plus the expiry rule. A key past its expiry date cannot be activated (or
--      re-activated on the same PC) until an admin extends it. Result adds: expired.
drop function if exists public.claim_offline_key(uuid, text, text, text, text);
create or replace function public.claim_offline_key(
  p_owner_id uuid,
  p_key text,
  p_fp_hash text,
  p_device_name text,
  p_device_info text
)
returns table (result text, license_id uuid, key_hint text, expires_at timestamptz, grace_days integer)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_lab public.labs%rowtype;
  v_key public.offline_license_keys%rowtype;
  v_hash text := public.offline_hash_key(p_key);
  v_failures integer;
begin
  if p_fp_hash is null or length(p_fp_hash) <> 64 then
    return query select 'invalid'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  select count(*) into v_failures from public.offline_license_audit a
    where a.owner_id = p_owner_id and a.action = 'activation_failed' and a.created_at > now() - interval '15 minutes';
  if v_failures >= 8 then
    return query select 'rate_limited'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  select * into v_lab from public.labs l where l.owner_id = p_owner_id;
  if not found or v_lab.account_status <> 'active' or v_lab.plan is distinct from 'basic_offline' then
    perform public.offline_audit_write(p_owner_id, null, null, 'activation_failed', 'device', p_device_name,
      'Lab is not eligible (not active or not on the Basic Offline plan).');
    return query select 'not_eligible'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  select * into v_key from public.offline_license_keys k where k.key_hash = v_hash for update;
  if not found or v_key.owner_id <> p_owner_id then
    perform public.offline_audit_write(p_owner_id, null, null, 'activation_failed', 'device', p_device_name,
      'Key not recognised for this lab.');
    return query select 'invalid'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  if v_key.status = 'revoked' then
    perform public.offline_audit_write(p_owner_id, v_key.id, v_key.key_hint, 'activation_failed', 'device',
      p_device_name, 'Key is revoked.');
    return query select 'revoked'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  if v_key.expires_at is not null and v_key.expires_at <= now() then
    perform public.offline_audit_write(p_owner_id, v_key.id, v_key.key_hint, 'activation_failed', 'device',
      p_device_name, 'Key expired on ' || to_char(v_key.expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"') || '.');
    return query select 'expired'::text, null::uuid, null::text, null::timestamptz, null::integer;
    return;
  end if;

  if v_key.status = 'unused' then
    update public.offline_license_keys k
       set status = 'activated', device_fp_hash = p_fp_hash, device_name = left(p_device_name, 120),
           device_info = left(p_device_info, 240), activated_at = now(), last_seen_at = now(),
           license_changed_at = now(), updated_at = now()
     where k.id = v_key.id;
    perform public.offline_audit_write(p_owner_id, v_key.id, v_key.key_hint, 'device_activated', 'device',
      p_device_name, left(p_device_info, 240));
    return query select 'ok'::text, v_key.id, v_key.key_hint, v_key.expires_at, v_key.grace_days;
    return;
  end if;

  -- status = 'activated'
  if v_key.device_fp_hash = p_fp_hash then
    update public.offline_license_keys k
       set device_name = left(p_device_name, 120), device_info = left(p_device_info, 240),
           last_seen_at = now(), updated_at = now()
     where k.id = v_key.id;
    perform public.offline_audit_write(p_owner_id, v_key.id, v_key.key_hint, 'device_reactivated', 'device',
      p_device_name, 'Same PC activated again.');
    return query select 'ok'::text, v_key.id, v_key.key_hint, v_key.expires_at, v_key.grace_days;
    return;
  end if;

  perform public.offline_audit_write(p_owner_id, v_key.id, v_key.key_hint, 'activation_failed', 'device',
    p_device_name, 'Key is already activated on another PC (' || coalesce(v_key.device_name, 'unknown') || ').');
  return query select 'in_use'::text, null::uuid, null::text, null::timestamptz, null::integer;
end;
$$;

revoke all on function public.claim_offline_key(uuid, text, text, text, text) from public, anon, authenticated;
grant execute on function public.claim_offline_key(uuid, text, text, text, text) to service_role;

-- 41f. Online status check, version 2 (the old check_offline_license is kept for older Edge Function deployments).
--      Answers: status 'valid' | 'revoked' (a PC decides expiry itself from the signed license), the key's current
--      expiry, whether the PC should fetch a newly signed license (the key changed after the license it holds was
--      issued), and whether the key is past its expiry date (for the PC's message; not security relevant).
create or replace function public.check_offline_license_v2(p_license_id uuid, p_fp_hash text, p_issued_at timestamptz default null)
returns table (status text, owner_id uuid, expires_at timestamptz, grace_days integer, refresh boolean, expired boolean)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_key public.offline_license_keys%rowtype;
  v_expired boolean;
begin
  select * into v_key from public.offline_license_keys k where k.id = p_license_id;
  if not found then
    return query select 'revoked'::text, null::uuid, null::timestamptz, null::integer, false, false;
    return;
  end if;
  if v_key.status = 'activated' and v_key.device_fp_hash = p_fp_hash then
    update public.offline_license_keys k set last_seen_at = now() where k.id = v_key.id;
    v_expired := v_key.expires_at is not null and v_key.expires_at <= now();
    if v_expired and v_key.expired_logged_at is null then
      update public.offline_license_keys k set expired_logged_at = now() where k.id = v_key.id;
      insert into public.offline_license_audit (owner_id, key_id, key_hint, action, actor_type, device_name, details)
      values (v_key.owner_id, v_key.id, v_key.key_hint, 'key_expired', 'system', v_key.device_name,
              'Key expired on ' || to_char(v_key.expires_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI"Z"')
              || ' (grace period: ' || v_key.grace_days || ' days)');
    end if;
    return query select 'valid'::text, v_key.owner_id, v_key.expires_at, v_key.grace_days,
      (p_issued_at is not null and v_key.license_changed_at > p_issued_at), v_expired;
    return;
  end if;
  return query select 'revoked'::text, v_key.owner_id, v_key.expires_at, v_key.grace_days, false, false;
end;
$$;

revoke all on function public.check_offline_license_v2(uuid, text, timestamptz) from public, anon, authenticated;
grant execute on function public.check_offline_license_v2(uuid, text, timestamptz) to service_role;

-- 41g. Key counts per lab, now with expired keys counted on their own (so the four numbers add up).
drop function if exists public.admin_offline_key_counts();
create or replace function public.admin_offline_key_counts()
returns table (
  owner_id uuid,
  total_keys bigint,
  unused_keys bigint,
  activated_keys bigint,
  revoked_keys bigint,
  expired_keys bigint
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
    select k.owner_id,
           count(*)::bigint,
           count(*) filter (where k.status = 'unused' and not (k.expires_at is not null and k.expires_at <= now()))::bigint,
           count(*) filter (where k.status = 'activated' and not (k.expires_at is not null and k.expires_at <= now()))::bigint,
           count(*) filter (where k.status = 'revoked')::bigint,
           count(*) filter (where k.status in ('unused', 'activated') and k.expires_at is not null and k.expires_at <= now())::bigint
    from public.offline_license_keys k
    group by k.owner_id;
end;
$$;

revoke all on function public.admin_offline_key_counts() from public, anon;
grant execute on function public.admin_offline_key_counts() to authenticated;

-- =====================================================================================================
-- 42. Offline QR report verification
-- =====================================================================================================
-- A Basic Offline PC prints a QR code that holds ONLY an unguessable random token (22+ characters, 128 bits). When the PC
-- is next online it sends a small snapshot of the report through the sync channel `report_verification`; the server
-- stores the snapshot under SHA-256(token) — the token itself is never stored (the PC sends the hash). A patient's
-- phone then asks get_offline_report_verification(token). Nothing about the lab's other data is reachable from a token.
insert into public.device_sync_channels (channel, enabled, allowed_ops, max_payload_bytes, retain_items, retention_days, description)
values ('report_verification', true, array['upsert', 'delete'], 8192, false, 30,
        'QR verification snapshot of a finished report: lab, patient name and ID, test, status, dates, doctor and technician names. No result values.')
on conflict (channel) do nothing;

create table if not exists public.report_verifications (
    token_hash text primary key check (token_hash ~ '^[0-9a-f]{64}$'),
    owner_id uuid not null references auth.users (id) on delete cascade,
    key_id uuid references public.offline_license_keys (id) on delete set null,
    report_id text not null,
    lab_name text,
    patient_name text,
    patient_display_id text,
    test_name text,
    status text,
    registered_at timestamptz,
    reported_at timestamptz,
    doctor_name text,
    technician_name text,
    -- true once the PC deleted the report: the page then says "withdrawn" and the personal fields are cleared.
    withdrawn boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_report_verifications_owner_report on public.report_verifications (owner_id, report_id);

alter table public.report_verifications enable row level security;
revoke all on public.report_verifications from anon, authenticated;

-- Dates from a PC must be real ISO-8601 timestamps. (PostgreSQL would otherwise also accept words such as 'yesterday',
-- 'epoch' or 'infinity' as a timestamptz.)
create or replace function public.iso_timestamptz_or_null(p_text text)
returns timestamptz
language plpgsql
immutable
set search_path = public
as $$
begin
  if p_text is null or btrim(p_text) = '' then
    return null;
  end if;
  if p_text !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}[T ][0-9]{2}:[0-9]{2}(:[0-9]{2}([.][0-9]{1,9})?)?(Z|[+-][0-9]{2}(:?[0-9]{2})?)?$' then
    raise exception 'bad date';
  end if;
  return p_text::timestamptz;
end;
$$;

revoke all on function public.iso_timestamptz_or_null(text) from public, anon, authenticated;

create or replace function public.trg_project_report_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_p jsonb := new.payload;
  v_rows integer;
begin
  if new.channel <> 'report_verification' then
    return new;
  end if;
  if new.entity_id !~ '^[0-9a-f]{64}$' then
    raise exception 'bad token hash';
  end if;

  if new.deleted then
    update public.report_verifications
       set withdrawn = true, patient_name = null, patient_display_id = null, doctor_name = null,
           technician_name = null, updated_at = now()
     where token_hash = new.entity_id and owner_id = new.owner_id;
    return new;
  end if;

  if v_p is null or jsonb_typeof(v_p) <> 'object' then
    raise exception 'bad snapshot';
  end if;

  insert into public.report_verifications as v
    (token_hash, owner_id, key_id, report_id, lab_name, patient_name, patient_display_id, test_name, status,
     registered_at, reported_at, doctor_name, technician_name, withdrawn, updated_at)
  values
    (new.entity_id, new.owner_id, new.key_id, left(coalesce(nullif(v_p ->> 'reportId', ''), 'unknown'), 64),
     left(nullif(v_p ->> 'labName', ''), 200), left(nullif(v_p ->> 'patientName', ''), 200),
     left(nullif(v_p ->> 'patientDisplayId', ''), 40), left(nullif(v_p ->> 'testName', ''), 200),
     left(nullif(v_p ->> 'status', ''), 40),
     public.iso_timestamptz_or_null(v_p ->> 'registeredAt'), public.iso_timestamptz_or_null(v_p ->> 'reportedAt'),
     left(nullif(v_p ->> 'doctorName', ''), 200), left(nullif(v_p ->> 'technicianName', ''), 200), false, now())
  on conflict (token_hash) do update
     set key_id = excluded.key_id, report_id = excluded.report_id, lab_name = excluded.lab_name,
         patient_name = excluded.patient_name, patient_display_id = excluded.patient_display_id,
         test_name = excluded.test_name, status = excluded.status, registered_at = excluded.registered_at,
         reported_at = excluded.reported_at, doctor_name = excluded.doctor_name,
         technician_name = excluded.technician_name, withdrawn = false, updated_at = now()
   where v.owner_id = excluded.owner_id;
  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'token belongs to another lab';
  end if;
  return new;
end;
$$;

revoke all on function public.trg_project_report_verification() from public, anon, authenticated;

drop trigger if exists trg_project_report_verification on public.device_sync_entities;
create trigger trg_project_report_verification
  after insert or update on public.device_sync_entities
  for each row when (new.channel = 'report_verification')
  execute function public.trg_project_report_verification();

-- 42b. The public lookup. Returns NO row for an unknown/malformed token (so it reveals nothing about which tokens exist)
--      and a fixed set of fields otherwise. Callable by anyone (the phone that scanned the QR).
create or replace function public.get_offline_report_verification(p_token text)
returns table (
  lab_name text,
  patient_name text,
  patient_display_id text,
  test_name text,
  status text,
  registered_at timestamptz,
  reported_at timestamptz,
  doctor_name text,
  technician_name text,
  withdrawn boolean,
  last_confirmed_at timestamptz
)
language sql
security definer
stable
set search_path = public
as $$
  select v.lab_name, v.patient_name, v.patient_display_id, v.test_name, v.status, v.registered_at, v.reported_at,
         v.doctor_name, v.technician_name, v.withdrawn, v.updated_at
    from public.report_verifications v
   where p_token ~ '^[A-Za-z0-9_-]{22,64}$'
     and v.token_hash = encode(sha256(convert_to(p_token, 'UTF8')), 'hex');
$$;

revoke all on function public.get_offline_report_verification(text) from public;
grant execute on function public.get_offline_report_verification(text) to anon, authenticated;

-- =====================================================================================================
-- 43. Audit events from offline PCs + the admin audit search
-- =====================================================================================================
insert into public.device_sync_channels (channel, enabled, allowed_ops, max_payload_bytes, retain_items, retention_days, description)
values ('audit', true, array['event'], 16384, true, 90,
        'Activity log entries from a Basic Offline PC: who, what, when, which record, and before/after values where applicable.')
on conflict (channel) do nothing;

create table if not exists public.lab_audit_events (
    id bigserial primary key,
    owner_id uuid not null references auth.users (id) on delete cascade,
    key_id uuid references public.offline_license_keys (id) on delete set null,
    item_id uuid not null,
    occurred_at timestamptz not null,
    received_at timestamptz not null default now(),
    actor_email text,
    action text not null,
    entity_type text,
    entity_id text,
    summary text,
    before_json jsonb,
    after_json jsonb,
    metadata jsonb,
    device_name text,
    app_version text,
    unique (owner_id, item_id)
);

-- The id this event had in the PC's own activity log. After the lab moves to Online Mode that log is uploaded
-- into audit_logs under the same id, so the search below can show each event once.
alter table public.lab_audit_events add column if not exists source_log_id uuid;

create index if not exists idx_lab_audit_events_owner_time on public.lab_audit_events (owner_id, occurred_at desc);
create index if not exists idx_lab_audit_events_time on public.lab_audit_events (occurred_at desc);
create index if not exists idx_lab_audit_events_source_log on public.lab_audit_events (owner_id, source_log_id)
  where source_log_id is not null;

alter table public.lab_audit_events enable row level security;
revoke all on public.lab_audit_events from anon, authenticated;

create or replace function public.trg_project_audit_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_p jsonb := new.payload;
  v_action text;
  v_meta jsonb;
  v_device text;
begin
  if new.channel <> 'audit' then
    return new;
  end if;
  if v_p is null or jsonb_typeof(v_p) <> 'object' then
    raise exception 'audit payload must be an object';
  end if;
  v_action := lower(btrim(coalesce(v_p ->> 'action', '')));
  if v_action !~ '^[a-z][a-z0-9_.]{1,63}$' then
    raise exception 'bad audit action';
  end if;
  v_meta := v_p -> 'metadata';
  if v_meta is not null and jsonb_typeof(v_meta) <> 'object' then
    v_meta := null;
  end if;
  select k.device_name into v_device from public.offline_license_keys k where k.id = new.key_id;

  insert into public.lab_audit_events
    (owner_id, key_id, item_id, occurred_at, actor_email, action, entity_type, entity_id, summary,
     before_json, after_json, metadata, device_name, app_version, source_log_id)
  values
    (new.owner_id, new.key_id, new.item_id, new.client_ts, left(nullif(v_p ->> 'actor', ''), 200), v_action,
     left(nullif(v_p ->> 'entityType', ''), 64), left(nullif(v_p ->> 'entityId', ''), 128),
     left(nullif(v_p ->> 'description', ''), 1000),
     case when jsonb_typeof(v_meta -> 'before') = 'object' then v_meta -> 'before' end,
     case when jsonb_typeof(v_meta -> 'after') = 'object' then v_meta -> 'after' end,
     v_meta, v_device, left(nullif(v_p ->> 'appVersion', ''), 40),
     case when (v_p ->> 'logId') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
          then (v_p ->> 'logId')::uuid end)
  on conflict (owner_id, item_id) do nothing;
  return new;
end;
$$;

revoke all on function public.trg_project_audit_event() from public, anon, authenticated;

drop trigger if exists trg_project_audit_event on public.device_sync_items;
create trigger trg_project_audit_event
  after insert on public.device_sync_items
  for each row when (new.channel = 'audit')
  execute function public.trg_project_audit_event();

-- 43b. One search over every audit source, newest first, with a total for paging. Sources:
--        account      = plan / status / SMS changes made by an admin (admin_audit_log)
--        license      = key and device events (offline_license_audit)
--        lab_online   = what a lab's own users did in Online mode (audit_logs)
--        lab_offline  = what a lab did on its Basic Offline PC (lab_audit_events)
--      p_query searches action, summary/details, who, record type/id and lab name (text, case-insensitive, literal).
create or replace function public.admin_audit_search(
  p_owner_id uuid default null,
  p_sources text[] default null,
  p_actions text[] default null,
  p_entity_types text[] default null,
  p_actor text default null,
  p_query text default null,
  p_from timestamptz default null,
  p_to timestamptz default null,
  p_limit integer default 50,
  p_offset integer default 0
)
returns table (
  total_count bigint,
  source text,
  id text,
  created_at timestamptz,
  owner_id uuid,
  lab_name text,
  action text,
  actor_type text,
  actor_email text,
  entity_type text,
  entity_id text,
  summary text,
  field_name text,
  old_value text,
  new_value text,
  reason text,
  device_name text,
  key_hint text,
  before_json jsonb,
  after_json jsonb,
  metadata jsonb
)
language plpgsql
security definer
stable
set search_path = public
as $$
#variable_conflict use_column
declare
  v_like text;
  v_actor text;
  v_limit integer;
  v_offset integer;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  v_limit := greatest(1, least(coalesce(p_limit, 50), 5000));
  v_offset := greatest(0, least(coalesce(p_offset, 0), 1000000));
  v_like := case when nullif(btrim(p_query), '') is null then null
                 else '%' || replace(replace(replace(btrim(p_query), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;
  v_actor := case when nullif(btrim(p_actor), '') is null then null
                  else '%' || replace(replace(replace(btrim(p_actor), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;

  return query
  with merged as (
    select 'account'::text as source, 'a' || a.id::text as id, a.created_at, a.owner_id, a.lab_name, a.action,
           a.actor_type, a.actor_email, 'lab'::text as entity_type, a.owner_id::text as entity_id,
           null::text as summary, a.field_name, a.old_value, a.new_value, a.reason,
           null::text as device_name, null::text as key_hint, null::jsonb as before_json, null::jsonb as after_json,
           null::jsonb as metadata
      from public.admin_audit_log a
     where (p_sources is null or 'account' = any (p_sources))
       and (p_owner_id is null or a.owner_id = p_owner_id)
       and (p_from is null or a.created_at >= p_from) and (p_to is null or a.created_at < p_to)
    union all
    select 'license'::text, 'l' || l.id::text, l.created_at, l.owner_id, lb.lab_name, l.action,
           l.actor_type, l.actor_email, 'license_key'::text, l.key_id::text,
           l.details, null::text, null::text, null::text, null::text,
           l.device_name, l.key_hint, null::jsonb, null::jsonb, null::jsonb
      from public.offline_license_audit l
      left join public.labs lb on lb.owner_id = l.owner_id
     where (p_sources is null or 'license' = any (p_sources))
       and (p_owner_id is null or l.owner_id = p_owner_id)
       and (p_from is null or l.created_at >= p_from) and (p_to is null or l.created_at < p_to)
    union all
    select 'lab_online'::text, 'o' || o.id::text, o.created_at, o.owner_id, lb.lab_name, o.action,
           'lab'::text, o.performed_by_email, o.entity_type, o.entity_id::text,
           o.description, null::text, null::text, null::text, null::text,
           null::text, null::text,
           case when jsonb_typeof(o.metadata -> 'before') = 'object' then o.metadata -> 'before' end,
           case when jsonb_typeof(o.metadata -> 'after') = 'object' then o.metadata -> 'after' end,
           o.metadata
      from public.audit_logs o
      left join public.labs lb on lb.owner_id = o.owner_id
     where (p_sources is null or 'lab_online' = any (p_sources))
       and (p_owner_id is null or o.owner_id = p_owner_id)
       and (p_from is null or o.created_at >= p_from) and (p_to is null or o.created_at < p_to)
       -- An event the offline PC already reported (and that was later uploaded with the rest of its data when the
       -- lab moved to Online Mode) is listed once, as the offline entry.
       and not exists (select 1 from public.lab_audit_events x
                        where x.owner_id = o.owner_id and x.source_log_id = o.id)
    union all
    select 'lab_offline'::text, 'd' || e.id::text, e.occurred_at, e.owner_id, lb.lab_name, e.action,
           'lab'::text, e.actor_email, e.entity_type, e.entity_id,
           e.summary, null::text, null::text, null::text, null::text,
           e.device_name, null::text, e.before_json, e.after_json, e.metadata
      from public.lab_audit_events e
      left join public.labs lb on lb.owner_id = e.owner_id
     where (p_sources is null or 'lab_offline' = any (p_sources))
       and (p_owner_id is null or e.owner_id = p_owner_id)
       and (p_from is null or e.occurred_at >= p_from) and (p_to is null or e.occurred_at < p_to)
  )
  select count(*) over ()::bigint, m.source, m.id, m.created_at, m.owner_id, m.lab_name, m.action, m.actor_type,
         m.actor_email, m.entity_type, m.entity_id, m.summary, m.field_name, m.old_value, m.new_value, m.reason,
         m.device_name, m.key_hint, m.before_json, m.after_json, m.metadata
    from merged m
   where (p_actions is null or m.action = any (p_actions))
     and (p_entity_types is null or m.entity_type = any (p_entity_types))
     and (v_actor is null or m.actor_email ilike v_actor escape '\')
     and (v_like is null
          or m.action ilike v_like escape '\'
          or m.summary ilike v_like escape '\'
          or m.actor_email ilike v_like escape '\'
          or m.entity_type ilike v_like escape '\'
          or m.entity_id ilike v_like escape '\'
          or m.lab_name ilike v_like escape '\'
          or m.old_value ilike v_like escape '\'
          or m.new_value ilike v_like escape '\'
          or m.reason ilike v_like escape '\'
          or m.device_name ilike v_like escape '\')
   order by m.created_at desc, m.id desc
   limit v_limit offset v_offset;
end;
$$;

revoke all on function public.admin_audit_search(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, integer) from public, anon;
grant execute on function public.admin_audit_search(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, integer) to authenticated;

-- =====================================================================================================
-- 44. Mode directive
-- =====================================================================================================
alter table public.device_sync_state add column if not exists last_check_at timestamptz;

-- 44a. Shared token check for the device functions below (same rules and failed-guess limit as device_sync_push).
create or replace function public.device_sync_auth(p_license_id uuid, p_token_hash text)
returns table (ok boolean, code text, retry_after integer, key_id uuid, owner_id uuid, device_name text)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_now timestamptz := now();
  v_key public.offline_license_keys%rowtype;
  v_state public.device_sync_state%rowtype;
  v_cred public.device_sync_credentials%rowtype;
  v_authorized boolean;
  v_retry integer;
begin
  select * into v_key from public.offline_license_keys k where k.id = p_license_id;
  if not found then
    return query select false, 'unauthorized'::text, null::integer, null::uuid, null::uuid, null::text;
    return;
  end if;

  insert into public.device_sync_state (key_id, owner_id) values (v_key.id, v_key.owner_id)
    on conflict (key_id) do nothing;
  select * into v_state from public.device_sync_state s where s.key_id = v_key.id for update;

  select * into v_cred from public.device_sync_credentials c where c.key_id = v_key.id;
  v_authorized := found
    and v_cred.token_hash = coalesce(p_token_hash, '')
    and v_key.status = 'activated'
    and v_key.device_fp_hash is not distinct from v_cred.fp_hash;

  if not v_authorized then
    if v_state.fail_window_start is null or v_state.fail_window_start < v_now - interval '10 minutes' then
      v_state.fail_window_start := v_now;
      v_state.fail_count := 0;
    end if;
    if v_state.fail_count >= 20 then
      v_retry := greatest(1, ceil(extract(epoch from (v_state.fail_window_start + interval '10 minutes' - v_now)))::integer);
      return query select false, 'rate_limited'::text, v_retry, null::uuid, null::uuid, null::text;
      return;
    end if;
    update public.device_sync_state s
       set fail_window_start = v_state.fail_window_start, fail_count = v_state.fail_count + 1, updated_at = v_now
     where s.key_id = v_key.id;
    return query select false, 'unauthorized'::text, null::integer, null::uuid, null::uuid, null::text;
    return;
  end if;

  return query select true, 'ok'::text, null::integer, v_key.id, v_key.owner_id, v_key.device_name;
end;
$$;

revoke all on function public.device_sync_auth(uuid, text) from public, anon, authenticated;
grant execute on function public.device_sync_auth(uuid, text) to service_role;

-- 44b. What the PC may know. mode: 'offline' (lab is on Basic Offline), 'online' (an admin moved the lab to a Premium
--      Online plan: the PC should offer to upload its data and switch), 'unknown' (no plan set). The PC never loses
--      access because of this answer; it only decides what to offer the lab.
create or replace function public.device_directive(p_license_id uuid, p_token_hash text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth record;
  v_now timestamptz := now();
  v_key public.offline_license_keys%rowtype;
  v_lab public.labs%rowtype;
  v_mig_id uuid;
  v_mig_state text;
  v_mig_verified timestamptz;
  v_mode text;
begin
  select * into v_auth from public.device_sync_auth(p_license_id, p_token_hash);
  if not v_auth.ok then
    return jsonb_build_object('ok', false, 'code', v_auth.code)
      || case when v_auth.retry_after is null then '{}'::jsonb else jsonb_build_object('retry_after', v_auth.retry_after) end;
  end if;

  select * into v_key from public.offline_license_keys where id = v_auth.key_id;
  select * into v_lab from public.labs where owner_id = v_auth.owner_id;
  select id, state, verified_at into v_mig_id, v_mig_state, v_mig_verified
    from public.device_migrations where key_id = v_auth.key_id order by started_at desc limit 1;

  v_mode := case v_lab.plan
              when 'basic_offline' then 'offline'
              when 'premium_monthly' then 'online'
              when 'premium_yearly' then 'online'
              else 'unknown' end;

  update public.device_sync_state set last_check_at = v_now, updated_at = v_now where key_id = v_auth.key_id;

  return jsonb_build_object(
    'ok', true,
    'server_time', v_now,
    'mode', v_mode,
    'plan', v_lab.plan,
    'lab_active', coalesce(v_lab.account_status = 'active', false),
    'key', jsonb_build_object(
      'status', v_key.status,
      'expires_at', v_key.expires_at,
      'grace_days', v_key.grace_days,
      'license_changed_at', v_key.license_changed_at),
    'migration', case when v_mig_id is null then null
                      else jsonb_build_object('state', v_mig_state, 'verified_at', v_mig_verified) end);
end;
$$;

revoke all on function public.device_directive(uuid, text) from public, anon, authenticated;
grant execute on function public.device_directive(uuid, text) to service_role;

-- =====================================================================================================
-- 45. Offline -> Online migration
-- =====================================================================================================
-- When an admin moves a lab from Basic Offline to a Premium Online plan, the lab's PC (not the server) uploads every
-- lab table. Safety rules:
--   * rows keep the PC's own ids and are UPSERTED (a re-run, or a resent batch, never duplicates anything);
--   * the owner of every row is the key's lab, never what the request says; a row whose id already belongs to
--     another lab is left alone and then fails verification;
--   * nothing is deleted from the cloud;
--   * the PC switches to Online only after device_migration_finish says "verified": the server compares per table the
--     number of rows and a checksum of their ids with what the PC declared, and checks every uploaded id really
--     exists in the real table for this lab.
create table if not exists public.device_migration_tables (
    table_name text primary key,
    position integer not null unique,
    columns text[] not null
);

alter table public.device_migration_tables enable row level security;
revoke all on public.device_migration_tables from anon, authenticated;

-- Which columns may be uploaded for each table (and in which order tables must arrive: parents first).
-- signature images / the logo are files, not rows, and are not part of this upload.
insert into public.device_migration_tables (table_name, position, columns) values
  ('lab_profile',         1, array['lab_name','owner_name','mobile_number','address','phone_number','report_footer_text','report_disclaimer','show_test_price']),
  ('doctors',             2, array['name','clinic_name','phone_number','designation','qualifications','created_at']),
  ('technicians',         3, array['name','phone_number','email','designation','created_at']),
  ('patients',            4, array['patient_number','full_name','guardian_name','age','gender','mobile_number','address','date_of_birth','doctor_id','selected_tests','created_at']),
  ('tests',               5, array['name','short_name','price','sample_type','is_active','created_at','updated_at']),
  ('test_parameters',     6, array['test_id','parameter_name','unit','normal_range','male_range','female_range','created_at']),
  ('reports',             7, array['patient_id','test_name','status','technician_id','result_entered_at','stock_deducted_at','created_at','updated_at']),
  ('report_results',      8, array['report_id','parameter_name','unit','reference_range','result_value','result_flag','created_at']),
  ('invoices',            9, array['patient_id','invoice_number','discount_amount','notes','created_at','updated_at']),
  ('invoice_items',      10, array['invoice_id','test_name','amount']),
  ('payments',           11, array['invoice_id','amount','payment_method','note','paid_at']),
  ('lab_stock_items',    12, array['item_name','category','quantity','unit','minimum_stock_level','expiry_date','created_at','updated_at']),
  ('report_templates',   13, array['name','is_default','footer_text','disclaimer_text','show_test_price','show_signature_area','accent_color_hex','created_at','updated_at']),
  ('expenses',           14, array['amount','category','note','spent_at','created_at','updated_at']),
  ('full_body_templates',15, array['name','test_names','created_at','updated_at']),
  ('audit_logs',         16, array['action','entity_type','entity_id','description','performed_by_email','metadata','created_at'])
on conflict (table_name) do update set position = excluded.position, columns = excluded.columns;

create table if not exists public.device_migrations (
    id uuid primary key default gen_random_uuid(),
    key_id uuid not null references public.offline_license_keys (id) on delete cascade,
    owner_id uuid not null references auth.users (id) on delete cascade,
    state text not null default 'uploading' check (state in ('uploading', 'verified')),
    started_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    verified_at timestamptz,
    batches integer not null default 0,
    summary jsonb,
    last_error text
);

create index if not exists idx_device_migrations_key on public.device_migrations (key_id, started_at desc);

alter table public.device_migrations enable row level security;
revoke all on public.device_migrations from anon, authenticated;

create table if not exists public.device_migration_rows (
    migration_id uuid not null references public.device_migrations (id) on delete cascade,
    table_name text not null,
    row_id uuid not null,
    primary key (migration_id, table_name, row_id)
);

alter table public.device_migration_rows enable row level security;
revoke all on public.device_migration_rows from anon, authenticated;

-- 45a. Start an upload. Only allowed while the lab is on a Premium Online plan and active. EVERY attempt starts a fresh
--      upload record: an earlier unfinished one is discarded (it only holds the list of ids it received - nothing in the
--      lab's real tables is removed), so the checksums of this attempt describe exactly what this attempt sent, even if
--      records were deleted on the PC between two attempts. Re-sent rows are upserted by id, so nothing is duplicated.
create or replace function public.device_migration_begin(p_license_id uuid, p_token_hash text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth record;
  v_lab public.labs%rowtype;
  v_mig public.device_migrations%rowtype;
  v_key public.offline_license_keys%rowtype;
begin
  select * into v_auth from public.device_sync_auth(p_license_id, p_token_hash);
  if not v_auth.ok then
    return jsonb_build_object('ok', false, 'code', v_auth.code)
      || case when v_auth.retry_after is null then '{}'::jsonb else jsonb_build_object('retry_after', v_auth.retry_after) end;
  end if;

  select * into v_lab from public.labs where owner_id = v_auth.owner_id;
  if not found or v_lab.account_status <> 'active' or v_lab.plan not in ('premium_monthly', 'premium_yearly') then
    return jsonb_build_object('ok', false, 'code', 'not_allowed');
  end if;

  -- Serialise attempts of one key (a second call waits for the first), then drop any unfinished upload of this key.
  select * into v_key from public.offline_license_keys where id = v_auth.key_id for update;
  delete from public.device_migrations where key_id = v_auth.key_id and state = 'uploading';
  insert into public.device_migrations (key_id, owner_id) values (v_auth.key_id, v_auth.owner_id)
    returning * into v_mig;
  perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'migration_started', 'device',
    v_key.device_name, 'Upload of this PC''s lab data for the switch to Online started.');

  return jsonb_build_object('ok', true, 'migration_id', v_mig.id,
    'tables', (select jsonb_agg(t.table_name order by t.position) from public.device_migration_tables t));
end;
$$;

revoke all on function public.device_migration_begin(uuid, text) from public, anon, authenticated;
grant execute on function public.device_migration_begin(uuid, text) to service_role;

-- 45b. Receive one batch (<= 500 rows) of one table. Returns { ok: true, accepted } or { ok: false, code, ... }.
create or replace function public.device_migration_push(
  p_license_id uuid,
  p_token_hash text,
  p_migration_id uuid,
  p_table text,
  p_rows jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth record;
  v_mig public.device_migrations%rowtype;
  v_cfg public.device_migration_tables%rowtype;
  v_cols text[];
  v_sql text;
  v_bad integer;
  v_n integer;
  v_err text;
  v_uuid constant text := '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
begin
  select * into v_auth from public.device_sync_auth(p_license_id, p_token_hash);
  if not v_auth.ok then
    return jsonb_build_object('ok', false, 'code', v_auth.code)
      || case when v_auth.retry_after is null then '{}'::jsonb else jsonb_build_object('retry_after', v_auth.retry_after) end;
  end if;

  select * into v_mig from public.device_migrations where id = p_migration_id for update;
  if not found or v_mig.key_id <> v_auth.key_id or v_mig.state <> 'uploading' then
    return jsonb_build_object('ok', false, 'code', 'bad_migration');
  end if;

  select * into v_cfg from public.device_migration_tables where table_name = p_table;
  if not found then
    return jsonb_build_object('ok', false, 'code', 'bad_table');
  end if;
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) not between 1 and 500 then
    return jsonb_build_object('ok', false, 'code', 'bad_request');
  end if;
  select count(*) into v_bad from jsonb_array_elements(p_rows) r
   where jsonb_typeof(r) <> 'object' or coalesce(r ->> 'id', '') !~ v_uuid;
  if v_bad > 0 then
    return jsonb_build_object('ok', false, 'code', 'bad_request');
  end if;
  if v_mig.batches >= 20000 then
    return jsonb_build_object('ok', false, 'code', 'too_many_batches');
  end if;

  begin
    if p_table = 'lab_profile' then
      -- The lab's own row already exists in the cloud (created at sign-up). Only the profile fields are updated, and
      -- only with values the PC actually has; account status, plan and dates are never touched.
      if jsonb_array_length(p_rows) <> 1 or lower(p_rows -> 0 ->> 'id') <> lower(v_auth.owner_id::text) then
        return jsonb_build_object('ok', false, 'code', 'bad_request');
      end if;
      update public.labs l set
        lab_name = coalesce(nullif(btrim(p_rows -> 0 ->> 'lab_name'), ''), l.lab_name),
        owner_name = coalesce(nullif(btrim(p_rows -> 0 ->> 'owner_name'), ''), l.owner_name),
        mobile_number = coalesce(nullif(btrim(p_rows -> 0 ->> 'mobile_number'), ''), l.mobile_number),
        address = coalesce(nullif(btrim(p_rows -> 0 ->> 'address'), ''), l.address),
        phone_number = coalesce(nullif(btrim(p_rows -> 0 ->> 'phone_number'), ''), l.phone_number),
        report_footer_text = coalesce(nullif(btrim(p_rows -> 0 ->> 'report_footer_text'), ''), l.report_footer_text),
        report_disclaimer = coalesce(nullif(btrim(p_rows -> 0 ->> 'report_disclaimer'), ''), l.report_disclaimer),
        show_test_price = coalesce((p_rows -> 0 ->> 'show_test_price')::boolean, l.show_test_price)
       where l.owner_id = v_auth.owner_id;
    else
      -- Only the columns this batch actually carries are written (anything else keeps its table default).
      select coalesce(array_agg(c order by c), '{}') into v_cols
        from unnest(v_cfg.columns) c
       where exists (select 1 from jsonb_array_elements(p_rows) r where r ? c);
      if coalesce(array_length(v_cols, 1), 0) = 0 then
        return jsonb_build_object('ok', false, 'code', 'bad_request');
      end if;
      v_sql := format(
        'insert into public.%1$I as t (id, owner_id, %2$s) '
        'select x.id, $2, %3$s from jsonb_populate_recordset(null::public.%1$I, $1) x '
        'on conflict (id) do update set %4$s where t.owner_id = excluded.owner_id',
        p_table,
        (select string_agg(quote_ident(c), ', ') from unnest(v_cols) c),
        (select string_agg('x.' || quote_ident(c), ', ') from unnest(v_cols) c),
        (select string_agg(quote_ident(c) || ' = excluded.' || quote_ident(c), ', ') from unnest(v_cols) c));
      execute v_sql using p_rows, v_auth.owner_id;
    end if;

    insert into public.device_migration_rows (migration_id, table_name, row_id)
    select p_migration_id, p_table, (r ->> 'id')::uuid from jsonb_array_elements(p_rows) r
    on conflict do nothing;
  exception when others then
    get stacked diagnostics v_err = returned_sqlstate;
    update public.device_migrations
       set last_error = left(p_table || ': ' || v_err || coalesce(' ' || sqlerrm, ''), 300), updated_at = now()
     where id = p_migration_id;
    return jsonb_build_object('ok', false, 'code', 'rejected', 'sqlstate', v_err, 'table', p_table);
  end;

  v_n := jsonb_array_length(p_rows);
  update public.device_migrations set batches = batches + 1, updated_at = now(), last_error = null where id = p_migration_id;
  return jsonb_build_object('ok', true, 'accepted', v_n);
end;
$$;

revoke all on function public.device_migration_push(uuid, text, uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.device_migration_push(uuid, text, uuid, text, jsonb) to service_role;

-- 45b-1. Branding images (the lab logo, doctor / technician signatures) are files, not rows. The Edge Function uploads
--        each one to the private `lab-branding` bucket under the lab's own folder and this function (a) says where
--        (p_commit = false: authenticates, checks the record belongs to this lab, returns the path) and (b) records the
--        path on the record once the upload worked (p_commit = true). The path is built here, never taken from the PC.
create or replace function public.device_migration_file(
  p_license_id uuid,
  p_token_hash text,
  p_migration_id uuid,
  p_kind text,
  p_entity_id uuid,
  p_commit boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth record;
  v_mig public.device_migrations%rowtype;
  v_path text;
begin
  select * into v_auth from public.device_sync_auth(p_license_id, p_token_hash);
  if not v_auth.ok then
    return jsonb_build_object('ok', false, 'code', v_auth.code)
      || case when v_auth.retry_after is null then '{}'::jsonb else jsonb_build_object('retry_after', v_auth.retry_after) end;
  end if;

  select * into v_mig from public.device_migrations where id = p_migration_id;
  if not found or v_mig.key_id <> v_auth.key_id or v_mig.state <> 'uploading' then
    return jsonb_build_object('ok', false, 'code', 'bad_migration');
  end if;

  if p_kind = 'logo' then
    v_path := v_auth.owner_id::text || '/logo.png';
  elsif p_kind = 'doctor_signature' then
    if p_entity_id is null or not exists (select 1 from public.doctors d where d.id = p_entity_id and d.owner_id = v_auth.owner_id) then
      return jsonb_build_object('ok', false, 'code', 'bad_request');
    end if;
    v_path := v_auth.owner_id::text || '/signature-migrated-' || p_entity_id::text || '.png';
  elsif p_kind = 'technician_signature' then
    if p_entity_id is null or not exists (select 1 from public.technicians t where t.id = p_entity_id and t.owner_id = v_auth.owner_id) then
      return jsonb_build_object('ok', false, 'code', 'bad_request');
    end if;
    v_path := v_auth.owner_id::text || '/signature-migrated-' || p_entity_id::text || '.png';
  else
    return jsonb_build_object('ok', false, 'code', 'bad_request');
  end if;

  if coalesce(p_commit, false) then
    if p_kind = 'logo' then
      update public.labs set logo_path = v_path where owner_id = v_auth.owner_id;
    elsif p_kind = 'doctor_signature' then
      update public.doctors set signature_path = v_path where id = p_entity_id and owner_id = v_auth.owner_id;
    else
      update public.technicians set signature_path = v_path where id = p_entity_id and owner_id = v_auth.owner_id;
    end if;
  end if;

  return jsonb_build_object('ok', true, 'owner_id', v_auth.owner_id, 'path', v_path);
end;
$$;

revoke all on function public.device_migration_file(uuid, text, uuid, text, uuid, boolean) from public, anon, authenticated;
grant execute on function public.device_migration_file(uuid, text, uuid, text, uuid, boolean) to service_role;

-- 45c-1. Helper for the numbering rule above. Table/column names are fixed literals chosen by this file, never user input.
create or replace function public.device_migration_bump_sequence(p_table text, p_column text, p_owner_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_seq text := pg_get_serial_sequence(format('public.%I', p_table), p_column);
  v_max bigint;
  v_last bigint;
begin
  if v_seq is null then
    return;
  end if;
  execute format('select max(%I) from public.%I where owner_id = $1', p_column, p_table) into v_max using p_owner_id;
  if v_max is null then
    return;
  end if;
  execute format('select last_value from %s', v_seq) into v_last;
  if v_max > v_last then
    perform setval(v_seq, v_max, true);
  end if;
end;
$$;

revoke all on function public.device_migration_bump_sequence(text, text, uuid) from public, anon, authenticated;

-- 45c. Verify. p_expected = { "<table>": { "count": n, "digest": "<sha256 hex of the table's ids>" } } as the PC computed it
--      from its own database. The digest is SHA-256 over the lower-case ids, sorted ascending and joined by ",".
--      Returns { ok: true, verified: true|false, tables, mismatches }. Only a fully matching upload becomes 'verified'.
create or replace function public.device_migration_finish(
  p_license_id uuid,
  p_token_hash text,
  p_migration_id uuid,
  p_expected jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth record;
  v_mig public.device_migrations%rowtype;
  v_key public.offline_license_keys%rowtype;
  v_t record;
  v_count bigint;
  v_digest text;
  v_present bigint;
  v_exp_count bigint;
  v_exp_digest text;
  v_empty constant text := encode(sha256(convert_to('', 'UTF8')), 'hex');
  v_tables jsonb := '{}'::jsonb;
  v_bad jsonb := '[]'::jsonb;
  v_total bigint := 0;
begin
  select * into v_auth from public.device_sync_auth(p_license_id, p_token_hash);
  if not v_auth.ok then
    return jsonb_build_object('ok', false, 'code', v_auth.code)
      || case when v_auth.retry_after is null then '{}'::jsonb else jsonb_build_object('retry_after', v_auth.retry_after) end;
  end if;

  select * into v_mig from public.device_migrations where id = p_migration_id for update;
  if not found or v_mig.key_id <> v_auth.key_id then
    return jsonb_build_object('ok', false, 'code', 'bad_migration');
  end if;
  if p_expected is null or jsonb_typeof(p_expected) <> 'object' then
    return jsonb_build_object('ok', false, 'code', 'bad_request');
  end if;

  -- Already verified earlier: answer from the stored summary (the per-row list was dropped).
  if v_mig.state = 'verified' then
    return jsonb_build_object('ok', true, 'verified', coalesce(v_mig.summary, '{}'::jsonb) = coalesce(
      (select jsonb_object_agg(e.key, jsonb_build_object('count', (e.value ->> 'count')::bigint, 'digest', e.value ->> 'digest'))
         from jsonb_each(p_expected) e where (e.value ->> 'count')::bigint > 0), '{}'::jsonb),
      'tables', v_mig.summary, 'mismatches', '[]'::jsonb);
  end if;

  for v_t in select table_name from public.device_migration_tables order by position loop
    select count(*), encode(sha256(convert_to(coalesce(string_agg(r.row_id::text, ',' order by r.row_id), ''), 'UTF8')), 'hex')
      into v_count, v_digest
      from public.device_migration_rows r where r.migration_id = p_migration_id and r.table_name = v_t.table_name;

    if v_t.table_name = 'lab_profile' then
      select count(*) into v_present from public.labs l
        join public.device_migration_rows r on r.migration_id = p_migration_id and r.table_name = 'lab_profile' and r.row_id = l.owner_id
       where l.owner_id = v_auth.owner_id;
    else
      execute format(
        'select count(*) from public.%I t join public.device_migration_rows r '
        'on r.row_id = t.id and r.migration_id = $1 and r.table_name = $2 where t.owner_id = $3', v_t.table_name)
        into v_present using p_migration_id, v_t.table_name, v_auth.owner_id;
    end if;

    v_exp_count := coalesce((p_expected -> v_t.table_name ->> 'count')::bigint, 0);
    v_exp_digest := coalesce(p_expected -> v_t.table_name ->> 'digest', v_empty);

    if v_count <> v_exp_count or v_digest <> v_exp_digest or v_present <> v_count then
      v_bad := v_bad || jsonb_build_array(jsonb_build_object(
        'table', v_t.table_name, 'expected', v_exp_count, 'received', v_count, 'present', v_present,
        'digest_match', v_digest = v_exp_digest));
    end if;
    if v_count > 0 then
      v_tables := v_tables || jsonb_build_object(v_t.table_name, jsonb_build_object('count', v_count, 'digest', v_digest));
      v_total := v_total + v_count;
    end if;
  end loop;

  select * into v_key from public.offline_license_keys where id = v_auth.key_id;
  if jsonb_array_length(v_bad) = 0 then
    update public.device_migrations
       set state = 'verified', verified_at = now(), updated_at = now(), summary = v_tables, last_error = null
     where id = p_migration_id;
    delete from public.device_migration_rows where migration_id = p_migration_id;
    -- patients.patient_number and invoices.invoice_number come from global sequences; the migrated rows carry the PC's own
    -- numbers. Move each sequence past this lab's highest number (never backwards) so a record created after the switch
    -- cannot reuse a number the lab has already printed.
    perform public.device_migration_bump_sequence('patients', 'patient_number', v_auth.owner_id);
    perform public.device_migration_bump_sequence('invoices', 'invoice_number', v_auth.owner_id);
    perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'migration_verified', 'device',
      v_key.device_name, v_total || ' records from ' || jsonb_object_keys_count(v_tables) || ' tables uploaded and verified.');
    return jsonb_build_object('ok', true, 'verified', true, 'tables', v_tables, 'mismatches', '[]'::jsonb);
  end if;

  update public.device_migrations
     set last_error = left('verification failed: ' || v_bad::text, 300), updated_at = now()
   where id = p_migration_id;
  perform public.offline_audit_write(v_key.owner_id, v_key.id, v_key.key_hint, 'migration_failed', 'device',
    v_key.device_name, 'Verification of the uploaded data did not match; this PC stays in Offline mode.');
  return jsonb_build_object('ok', true, 'verified', false, 'tables', v_tables, 'mismatches', v_bad);
end;
$$;

-- helper used above (kept separate so the message line stays readable)
create or replace function public.jsonb_object_keys_count(p_obj jsonb)
returns integer
language sql
immutable
as $$
  select count(*)::integer from jsonb_object_keys(p_obj);
$$;

revoke all on function public.jsonb_object_keys_count(jsonb) from public, anon, authenticated;
revoke all on function public.device_migration_finish(uuid, text, uuid, jsonb) from public, anon, authenticated;
grant execute on function public.device_migration_finish(uuid, text, uuid, jsonb) to service_role;

-- 45d. Admin views.
-- What each of a lab's PCs last reported (never any item contents), now also when it last checked in.
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
  items_received bigint,
  last_check_at timestamptz
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
           s.schema_version, s.outbox_pending, s.outbox_failed, coalesce(s.items_received, 0::bigint), s.last_check_at
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

-- Where each activated PC of a lab stands in a switch from Offline to Online.
create or replace function public.admin_device_mode_status(p_owner_id uuid)
returns table (
  key_id uuid,
  key_hint text,
  device_name text,
  key_status text,
  lab_plan text,
  directive_mode text,
  migration_state text,
  migration_started_at timestamptz,
  migration_verified_at timestamptz,
  migrated_rows bigint,
  last_check_at timestamptz,
  last_error text
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
    select k.id, k.key_hint, k.device_name, k.status, l.plan,
           case l.plan when 'basic_offline' then 'offline' when 'premium_monthly' then 'online'
                       when 'premium_yearly' then 'online' else 'unknown' end,
           m.state, m.started_at, m.verified_at,
           coalesce((select sum((e.value ->> 'count')::bigint) from jsonb_each(coalesce(m.summary, '{}'::jsonb)) e), 0)::bigint,
           s.last_check_at, m.last_error
      from public.offline_license_keys k
      left join public.labs l on l.owner_id = k.owner_id
      left join public.device_sync_state s on s.key_id = k.id
      left join lateral (select * from public.device_migrations dm where dm.key_id = k.id order by dm.started_at desc limit 1) m on true
     where k.owner_id = p_owner_id and k.status <> 'unused'
     order by k.created_at desc;
end;
$$;

revoke all on function public.admin_device_mode_status(uuid) from public, anon;
grant execute on function public.admin_device_mode_status(uuid) to authenticated;
