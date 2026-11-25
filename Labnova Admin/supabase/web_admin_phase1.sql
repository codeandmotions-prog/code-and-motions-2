-- LabNova Web Admin Panel — database setup (run ONCE in the Supabase SQL editor; safe to re-run).
-- Contains sections 38 and 39 of the main schema.sql. Needs sections 1-37 already applied.
-- Additive only: nothing existing is changed or removed.

-- 38. Web Admin Panel — read-only overview helpers (additive)
--
-- Used by the web Admin Panel's Dashboard and Labs list. Read-only; each
-- one checks is_admin() like every other admin function. They do not
-- change the licensing tables or any existing function.

-- 38a. Key counts per lab (the web app adds them up for the Dashboard).
create or replace function public.admin_offline_key_counts()
returns table (
  owner_id uuid,
  total_keys bigint,
  unused_keys bigint,
  activated_keys bigint,
  revoked_keys bigint
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
           count(*) filter (where k.status = 'unused')::bigint,
           count(*) filter (where k.status = 'activated')::bigint,
           count(*) filter (where k.status = 'revoked')::bigint
    from public.offline_license_keys k
    group by k.owner_id;
end;
$$;

revoke all on function public.admin_offline_key_counts() from public, anon;
grant execute on function public.admin_offline_key_counts() to authenticated;

-- 38b. Most recent license/device activity across ALL labs.
create or replace function public.admin_offline_recent_activity(p_limit integer default 15)
returns table (
  id bigint,
  owner_id uuid,
  lab_name text,
  key_hint text,
  action text,
  actor_type text,
  actor_email text,
  device_name text,
  details text,
  created_at timestamptz
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
    select a.id, a.owner_id, l.lab_name, a.key_hint, a.action, a.actor_type, a.actor_email,
           a.device_name, a.details, a.created_at
    from public.offline_license_audit a
    left join public.labs l on l.owner_id = a.owner_id
    order by a.created_at desc, a.id desc
    limit greatest(1, least(coalesce(p_limit, 15), 100));
end;
$$;

revoke all on function public.admin_offline_recent_activity(integer) from public, anon;
grant execute on function public.admin_offline_recent_activity(integer) to authenticated;


-- 39. Web Admin Panel — Admin Audit Log (additive; safe to re-run).
--
-- Why this exists: licence/device actions were already audited
-- (offline_license_audit, section 37) but changes to a lab's plan,
-- account status, subscription status, subscription end date, payment
-- reference and SMS setting were not recorded anywhere. This section adds:
--
--   * admin_audit_log        — one row per changed field, with the previous
--                              and new value, who did it and (optionally) why.
--   * triggers on labs / lab_sms_config — record those changes no matter
--                              which admin screen (Windows or Web) made them.
--                              The existing admin_update_lab_subscription and
--                              admin_set_sms_enabled functions are NOT modified.
--   * admin_set_lab_subscription — a thin wrapper that attaches an optional
--                              reason, then calls the existing
--                              admin_update_lab_subscription (no duplicated logic).
--   * admin_list_audit       — one read function that merges account/plan
--                              changes with the existing licence audit trail,
--                              with lab / action / date filters.
--
-- Nothing here is callable by `anon`; every function checks is_admin().

create table if not exists public.admin_audit_log (
    id bigserial primary key,
    owner_id uuid,
    lab_name text,
    action text not null,
    field_name text,
    old_value text,
    new_value text,
    reason text,
    actor_type text not null default 'admin',
    actor_id uuid,
    actor_email text,
    created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_log_owner_id on public.admin_audit_log (owner_id, created_at desc);
create index if not exists idx_admin_audit_log_created_at on public.admin_audit_log (created_at desc);

-- 'admin' = a signed-in administrator, 'lab' = a lab owner's own change made from the app,
-- 'system' = no signed-in user (platform/SQL editor).
alter table public.admin_audit_log drop constraint if exists admin_audit_log_actor_type_check;
alter table public.admin_audit_log
  add constraint admin_audit_log_actor_type_check check (actor_type in ('admin', 'lab', 'system'));

alter table public.admin_audit_log enable row level security;
revoke all on public.admin_audit_log from anon, authenticated;

-- 39b. Internal writer (not callable by clients).
create or replace function public.admin_audit_write(
  p_owner_id uuid,
  p_lab_name text,
  p_action text,
  p_field text,
  p_old text,
  p_new text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_is_admin boolean := false;
begin
  if auth.uid() is not null then
    select exists (select 1 from public.admins where user_id = auth.uid()) into v_is_admin;
    select email into v_email from auth.users where id = auth.uid();
  end if;

  insert into public.admin_audit_log
    (owner_id, lab_name, action, field_name, old_value, new_value, reason, actor_type, actor_id, actor_email)
  values
    (p_owner_id, p_lab_name, p_action, p_field, p_old, p_new,
     nullif(trim(current_setting('app.admin_change_reason', true)), ''),
     case when auth.uid() is null then 'system' when v_is_admin then 'admin' else 'lab' end,
     auth.uid(),
     v_email);
exception when others then
  -- Never let a logging problem block the change itself (e.g. a lab owner choosing a plan).
  raise warning 'admin_audit_write failed: %', sqlerrm;
end;
$$;

revoke all on function public.admin_audit_write(uuid, text, text, text, text, text) from public, anon, authenticated;

-- 39c. labs: record every change to the admin-managed fields.
create or replace function public.audit_lab_account_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.account_status is distinct from old.account_status then
    perform public.admin_audit_write(new.owner_id, new.lab_name, 'lab_account_status_changed',
      'account_status', old.account_status, new.account_status);
  end if;
  if new.subscription_status is distinct from old.subscription_status then
    perform public.admin_audit_write(new.owner_id, new.lab_name, 'lab_subscription_status_changed',
      'subscription_status', old.subscription_status, new.subscription_status);
  end if;
  if new.plan is distinct from old.plan then
    perform public.admin_audit_write(new.owner_id, new.lab_name, 'lab_plan_changed',
      'plan', old.plan, new.plan);
  end if;
  if new.subscription_ends_at is distinct from old.subscription_ends_at then
    perform public.admin_audit_write(new.owner_id, new.lab_name, 'lab_subscription_end_changed',
      'subscription_ends_at',
      to_char(old.subscription_ends_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
      to_char(new.subscription_ends_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'));
  end if;
  if new.last_payment_reference is distinct from old.last_payment_reference then
    perform public.admin_audit_write(new.owner_id, new.lab_name, 'lab_payment_reference_changed',
      'last_payment_reference', old.last_payment_reference, new.last_payment_reference);
  end if;
  return null;
end;
$$;

revoke all on function public.audit_lab_account_changes() from public, anon, authenticated;

drop trigger if exists trg_audit_lab_account_changes on public.labs;
create trigger trg_audit_lab_account_changes
  after update of account_status, subscription_status, plan, subscription_ends_at, last_payment_reference
  on public.labs
  for each row
  execute function public.audit_lab_account_changes();

-- 39d. lab_sms_config: record an admin switching SMS on/off. Rows created by
--      the platform itself (not by a signed-in admin) are not logged.
create or replace function public.audit_lab_sms_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lab_name text;
  v_old text;
begin
  if auth.uid() is null or not exists (select 1 from public.admins where user_id = auth.uid()) then
    return null;
  end if;

  if tg_op = 'UPDATE' then
    if new.sms_enabled is not distinct from old.sms_enabled then
      return null;
    end if;
    v_old := case when old.sms_enabled then 'on' else 'off' end;
  else
    v_old := null;
  end if;

  select lab_name into v_lab_name from public.labs where owner_id = new.owner_id;
  perform public.admin_audit_write(new.owner_id, v_lab_name, 'lab_sms_changed', 'sms_enabled',
    v_old, case when new.sms_enabled then 'on' else 'off' end);
  return null;
end;
$$;

revoke all on function public.audit_lab_sms_changes() from public, anon, authenticated;

drop trigger if exists trg_audit_lab_sms_changes on public.lab_sms_config;
create trigger trg_audit_lab_sms_changes
  after insert or update of sms_enabled on public.lab_sms_config
  for each row
  execute function public.audit_lab_sms_changes();

-- 39e. Same as admin_update_lab_subscription, plus an optional reason that is
--      stored with the audit rows. All rules (trial reset, plan cleared on
--      trial, field protection) stay in the existing function.
create or replace function public.admin_set_lab_subscription(
  p_owner_id uuid,
  p_account_status text default null,
  p_subscription_status text default null,
  p_plan text default null,
  p_subscription_ends_at timestamptz default null,
  p_payment_reference text default null,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  if not exists (select 1 from public.labs where owner_id = p_owner_id) then
    raise exception 'Lab not found.';
  end if;

  perform set_config('app.admin_change_reason', left(coalesce(trim(p_reason), ''), 200), true);

  perform public.admin_update_lab_subscription(
    p_owner_id, p_account_status, p_subscription_status, p_plan, p_subscription_ends_at, p_payment_reference);

  perform set_config('app.admin_change_reason', '', true);
end;
$$;

revoke all on function public.admin_set_lab_subscription(uuid, text, text, text, timestamptz, text, text) from public, anon;
grant execute on function public.admin_set_lab_subscription(uuid, text, text, text, timestamptz, text, text) to authenticated;

-- 39f. One merged, filterable audit read for the Web Admin Panel.
create or replace function public.admin_list_audit(
  p_owner_id uuid default null,
  p_actions text[] default null,
  p_from timestamptz default null,
  p_to timestamptz default null,
  p_limit integer default 100,
  p_offset integer default 0
)
returns table (
  source text,
  id text,
  created_at timestamptz,
  owner_id uuid,
  lab_name text,
  action text,
  actor_type text,
  actor_email text,
  field_name text,
  old_value text,
  new_value text,
  reason text,
  details text,
  device_name text,
  key_hint text
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
    select u.source, u.id, u.created_at, u.owner_id, u.lab_name, u.action, u.actor_type, u.actor_email,
           u.field_name, u.old_value, u.new_value, u.reason, u.details, u.device_name, u.key_hint
    from (
      select
        'account'::text as source,
        g.id as sort_id,
        ('a' || g.id::text) as id,
        g.created_at,
        g.owner_id,
        coalesce(l.lab_name, g.lab_name) as lab_name,
        g.action,
        g.actor_type,
        g.actor_email,
        g.field_name,
        g.old_value,
        g.new_value,
        g.reason,
        null::text as details,
        null::text as device_name,
        null::text as key_hint
      from public.admin_audit_log g
      left join public.labs l on l.owner_id = g.owner_id
      union all
      select
        'license'::text,
        o.id,
        ('l' || o.id::text),
        o.created_at,
        o.owner_id,
        l.lab_name,
        o.action,
        o.actor_type,
        o.actor_email,
        null::text,
        null::text,
        null::text,
        null::text,
        o.details,
        o.device_name,
        o.key_hint
      from public.offline_license_audit o
      left join public.labs l on l.owner_id = o.owner_id
    ) u
    where (p_owner_id is null or u.owner_id = p_owner_id)
      and (p_actions is null or u.action = any (p_actions))
      and (p_from is null or u.created_at >= p_from)
      and (p_to is null or u.created_at < p_to)
    order by u.created_at desc, u.sort_id desc, u.source
    limit greatest(1, least(coalesce(p_limit, 100), 500))
    offset greatest(0, coalesce(p_offset, 0));
end;
$$;

revoke all on function public.admin_list_audit(uuid, text[], timestamptz, timestamptz, integer, integer) from public, anon;
grant execute on function public.admin_list_audit(uuid, text[], timestamptz, timestamptz, integer, integer) to authenticated;
