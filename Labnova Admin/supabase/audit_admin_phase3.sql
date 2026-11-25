-- LabNova Web Admin Panel — audit logs: faster search + permissioned delete
-- Run ONCE in the Supabase SQL editor (safe to re-run). Needs web_admin_phase1.sql, sync_foundation.sql and
-- phase2_features.sql to have been run first.
--
-- This file is ADDITIVE: it creates new tables, new functions and (only if missing) two indexes. It does not change any
-- existing table, trigger, function (admin_audit_search, admin_list_audit, admin_update_lab_subscription, ...), policy
-- or Edge Function. Until it has been run, the Web Admin keeps using the existing admin_audit_search, so nothing breaks.
--
-- What it adds (section 46):
--   46a  admin_audit_delete_permissions  which administrators may delete audit entries (nobody, until you list them)
--   46b  admin_audit_deletions           a content-free record of every deletion: who, when, which lab, how many, why
--   46c  admin_can_delete_audit()        the Web Admin asks this to show or hide its delete buttons
--   46d  admin_audit_search_v2()         the same search as admin_audit_search, built to stay fast as the logs grow
--   46e  admin_audit_delete()            delete the selected entries (max 500 per call)
--   46f  admin_audit_delete_matching()   delete everything a lab/date filter matches (max 5,000 per call, count-checked)
--   46g  admin_audit_deletions_list()    the deletion history
--   46h  indexes on audit_logs and offline_license_audit, only if no suitable one exists
--
-- Security model (same as every other admin function): RLS is ON with no policies and no grants for the new tables;
-- every function is SECURITY DEFINER, is not callable by `anon`, and checks is_admin() itself. The two delete functions
-- additionally require a row in admin_audit_delete_permissions for the signed-in user.

-- =====================================================================================================
-- 46a. Who may delete audit entries
-- =====================================================================================================
create table if not exists public.admin_audit_delete_permissions (
    user_id uuid primary key references auth.users (id) on delete cascade,
    granted_at timestamptz not null default now(),
    granted_by uuid
);

alter table public.admin_audit_delete_permissions enable row level security;
revoke all on public.admin_audit_delete_permissions from anon, authenticated;

-- >>> STEP FOR YOU: give yourself the delete permission. Replace the e-mail with YOUR admin login e-mail, then run
-- >>> this statement. (Add more admins later by running it again with their e-mail.) It does nothing if the e-mail is
-- >>> not an administrator, so a typo can never grant access to someone else.
insert into public.admin_audit_delete_permissions (user_id)
select u.id
  from auth.users u
  join public.admins a on a.user_id = u.id
 where lower(u.email) = lower('YOUR-ADMIN-EMAIL@example.com')
on conflict (user_id) do nothing;

-- =====================================================================================================
-- 46b. Deletion record (no audit content is stored here, only the fact that entries were deleted)
-- =====================================================================================================
create table if not exists public.admin_audit_deletions (
    id bigserial primary key,
    deleted_at timestamptz not null default now(),
    actor_id uuid,
    actor_email text,
    mode text not null check (mode in ('selected', 'matching')),
    -- set when every deleted entry belonged to one lab
    owner_id uuid,
    lab_name text,
    lab_count integer not null default 0,
    row_count integer not null,
    -- {"account": n, "license": n, "lab_online": n, "lab_offline": n, "migrated_copies": n}
    counts jsonb not null,
    filter_summary text,
    reason text
);

create index if not exists idx_admin_audit_deletions_time on public.admin_audit_deletions (deleted_at desc);
create index if not exists idx_admin_audit_deletions_owner on public.admin_audit_deletions (owner_id, deleted_at desc);

alter table public.admin_audit_deletions enable row level security;
revoke all on public.admin_audit_deletions from anon, authenticated;

-- =====================================================================================================
-- 46c. May the signed-in administrator delete audit entries?
-- =====================================================================================================
create or replace function public.admin_can_delete_audit()
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
begin
  if not public.is_admin() then
    return false;
  end if;
  return exists (select 1 from public.admin_audit_delete_permissions p where p.user_id = auth.uid());
end;
$$;

revoke all on function public.admin_can_delete_audit() from public, anon;
grant execute on function public.admin_can_delete_audit() to authenticated;

-- =====================================================================================================
-- 46d. Search, built to stay fast
-- =====================================================================================================
-- Same inputs, same columns and the same ordering as admin_audit_search (section 43b), plus total_capped. What changes
-- is how the work is done:
--   * every source applies the filters itself and keeps only its newest (offset + limit) rows, so the database reads
--     the (owner_id, created_at) indexes instead of merging whole tables and sorting everything;
--   * the total is counted only up to 10,000 (total_capped = true means "more than 10,000 match"), instead of counting
--     every row of every table on every page;
--   * the statement is planned with the real filter values (dynamic SQL), so a lab filter always uses its index.
--
-- 46d-1. Builds the SQL text. Internal: not callable by clients.
--   Placeholders: $1 owner, $2 sources, $3 actions, $4 entity types, $5 actor pattern, $6 search pattern, $7 from, $8 to.
--   p_mode: 'rows' (every column, newest first, limited) | 'count' (cheap, no order) | 'ids' (only the entry ids).
create or replace function public._audit_union_sql(
  p_mode text,
  p_owner boolean,
  p_sources boolean,
  p_actions boolean,
  p_entities boolean,
  p_actor boolean,
  p_query boolean,
  p_from boolean,
  p_to boolean,
  p_limit integer
)
returns text
language plpgsql
immutable
set search_path = public
as $fn$
declare
  v_esc constant text := $e$ escape '\'$e$;
  v_like constant text := ' ilike $6' || $e$ escape '\'$e$;
  v_lim text := case when p_limit is null then '' else ' limit ' || p_limit::text end;
  -- Text search: the filter is evaluated by one straight pass over the table (the `offset 0` keeps the planner from
  -- walking the whole table in date order through its index just to find a few rare matches), then the newest
  -- matches are kept.
  v_fence constant boolean := p_query and p_mode = 'rows';
  v_cols constant text := 'source, id, created_at, owner_id, lab_name, action, actor_type, actor_email, entity_type, entity_id, '
    || 'summary, field_name, old_value, new_value, reason, device_name, key_hint, before_json, after_json, metadata';
  v_sel text;
  v_from text;
  v_ord text;
  v_where text;
  v_sql text;
  v_branch text;
begin
  if p_mode not in ('rows', 'count', 'ids') then
    raise exception 'bad mode';
  end if;

  -- ---------------- account (admin_audit_log) ----------------
  v_sel := case p_mode
    when 'count' then '1'
    when 'ids' then $s$'a' || a.id::text$s$
    else $s$'account'::text as source, 'a' || a.id::text as id, a.created_at, a.owner_id, a.lab_name, a.action,
            a.actor_type, a.actor_email, 'lab'::text as entity_type, a.owner_id::text as entity_id,
            null::text as summary, a.field_name, a.old_value, a.new_value, a.reason,
            null::text as device_name, null::text as key_hint, null::jsonb as before_json, null::jsonb as after_json,
            null::jsonb as metadata$s$ end;
  v_where := case when p_sources then $s$ and 'account' = any($2)$s$ else '' end
    || case when p_owner then ' and a.owner_id = $1' else '' end
    || case when p_from then ' and a.created_at >= $7' else '' end
    || case when p_to then ' and a.created_at < $8' else '' end
    || case when p_actions then ' and a.action = any($3)' else '' end
    || case when p_entities then $s$ and 'lab' = any($4)$s$ else '' end
    || case when p_actor then ' and a.actor_email ilike $5' || v_esc else '' end
    || case when p_query then
         ' and (a.action' || v_like || ' or a.actor_email' || v_like || $s$ or 'lab'$s$ || v_like
         || ' or a.owner_id::text' || v_like || ' or a.lab_name' || v_like || ' or a.old_value' || v_like
         || ' or a.new_value' || v_like || ' or a.reason' || v_like || ')'
       else '' end;
  v_from := ' from public.admin_audit_log a where true';
  v_ord := $s$ order by a.created_at desc, ('a' || a.id::text) desc$s$;
  v_branch := case when v_fence
    then '(select * from (select ' || v_sel || v_from || v_where || ' offset 0) f(' || v_cols || ') order by f.created_at desc, f.id desc' || v_lim || ')'
    else '(select ' || v_sel || v_from || v_where || case when p_mode = 'rows' then v_ord else '' end || v_lim || ')' end;
  v_sql := v_branch;

  -- ---------------- license (offline_license_audit) ----------------
  v_sel := case p_mode
    when 'count' then '1'
    when 'ids' then $s$'l' || l.id::text$s$
    else $s$'license'::text, 'l' || l.id::text, l.created_at, l.owner_id, lb.lab_name, l.action,
            l.actor_type, l.actor_email, 'license_key'::text, l.key_id::text,
            l.details, null::text, null::text, null::text, null::text,
            l.device_name, l.key_hint, null::jsonb, null::jsonb, null::jsonb$s$ end;
  v_where := case when p_sources then $s$ and 'license' = any($2)$s$ else '' end
    || case when p_owner then ' and l.owner_id = $1' else '' end
    || case when p_from then ' and l.created_at >= $7' else '' end
    || case when p_to then ' and l.created_at < $8' else '' end
    || case when p_actions then ' and l.action = any($3)' else '' end
    || case when p_entities then $s$ and 'license_key' = any($4)$s$ else '' end
    || case when p_actor then ' and l.actor_email ilike $5' || v_esc else '' end
    || case when p_query then
         ' and (l.action' || v_like || ' or l.details' || v_like || ' or l.actor_email' || v_like
         || $s$ or 'license_key'$s$ || v_like || ' or l.key_id::text' || v_like || ' or lb.lab_name' || v_like
         || ' or l.device_name' || v_like || ')'
       else '' end;
  v_from := ' from public.offline_license_audit l left join public.labs lb on lb.owner_id = l.owner_id where true';
  v_ord := $s$ order by l.created_at desc, ('l' || l.id::text) desc$s$;
  v_branch := case when v_fence
    then '(select * from (select ' || v_sel || v_from || v_where || ' offset 0) f(' || v_cols || ') order by f.created_at desc, f.id desc' || v_lim || ')'
    else '(select ' || v_sel || v_from || v_where || case when p_mode = 'rows' then v_ord else '' end || v_lim || ')' end;
  v_sql := v_sql || ' union all ' || v_branch;

  -- ---------------- lab_online (audit_logs; skipping events the offline PC already reported) ----------------
  v_sel := case p_mode
    when 'count' then '1'
    when 'ids' then $s$'o' || o.id::text$s$
    else $s$'lab_online'::text, 'o' || o.id::text, o.created_at, o.owner_id, lb.lab_name, o.action,
            'lab'::text, o.performed_by_email, o.entity_type, o.entity_id::text,
            o.description, null::text, null::text, null::text, null::text,
            null::text, null::text,
            case when jsonb_typeof(o.metadata -> 'before') = 'object' then o.metadata -> 'before' end,
            case when jsonb_typeof(o.metadata -> 'after') = 'object' then o.metadata -> 'after' end,
            o.metadata$s$ end;
  v_where := case when p_sources then $s$ and 'lab_online' = any($2)$s$ else '' end
    || case when p_owner then ' and o.owner_id = $1' else '' end
    || case when p_from then ' and o.created_at >= $7' else '' end
    || case when p_to then ' and o.created_at < $8' else '' end
    || case when p_actions then ' and o.action = any($3)' else '' end
    || case when p_entities then ' and o.entity_type = any($4)' else '' end
    || case when p_actor then ' and o.performed_by_email ilike $5' || v_esc else '' end
    || case when p_query then
         ' and (o.action' || v_like || ' or o.description' || v_like || ' or o.performed_by_email' || v_like
         || ' or o.entity_type' || v_like || ' or o.entity_id::text' || v_like || ' or lb.lab_name' || v_like || ')'
       else '' end;
  v_from := ' from public.audit_logs o left join public.labs lb on lb.owner_id = o.owner_id where true';
  v_where := v_where
    || ' and not exists (select 1 from public.lab_audit_events x where x.owner_id = o.owner_id and x.source_log_id = o.id)';
  v_ord := $s$ order by o.created_at desc, ('o' || o.id::text) desc$s$;
  v_branch := case when v_fence
    then '(select * from (select ' || v_sel || v_from || v_where || ' offset 0) f(' || v_cols || ') order by f.created_at desc, f.id desc' || v_lim || ')'
    else '(select ' || v_sel || v_from || v_where || case when p_mode = 'rows' then v_ord else '' end || v_lim || ')' end;
  v_sql := v_sql || ' union all ' || v_branch;

  -- ---------------- lab_offline (lab_audit_events) ----------------
  v_sel := case p_mode
    when 'count' then '1'
    when 'ids' then $s$'d' || e.id::text$s$
    else $s$'lab_offline'::text, 'd' || e.id::text, e.occurred_at, e.owner_id, lb.lab_name, e.action,
            'lab'::text, e.actor_email, e.entity_type, e.entity_id,
            e.summary, null::text, null::text, null::text, null::text,
            e.device_name, null::text, e.before_json, e.after_json, e.metadata$s$ end;
  v_where := case when p_sources then $s$ and 'lab_offline' = any($2)$s$ else '' end
    || case when p_owner then ' and e.owner_id = $1' else '' end
    || case when p_from then ' and e.occurred_at >= $7' else '' end
    || case when p_to then ' and e.occurred_at < $8' else '' end
    || case when p_actions then ' and e.action = any($3)' else '' end
    || case when p_entities then ' and e.entity_type = any($4)' else '' end
    || case when p_actor then ' and e.actor_email ilike $5' || v_esc else '' end
    || case when p_query then
         ' and (e.action' || v_like || ' or e.summary' || v_like || ' or e.actor_email' || v_like
         || ' or e.entity_type' || v_like || ' or e.entity_id' || v_like || ' or lb.lab_name' || v_like
         || ' or e.device_name' || v_like || ')'
       else '' end;
  v_from := ' from public.lab_audit_events e left join public.labs lb on lb.owner_id = e.owner_id where true';
  v_ord := $s$ order by e.occurred_at desc, ('d' || e.id::text) desc$s$;
  v_branch := case when v_fence
    then '(select * from (select ' || v_sel || v_from || v_where || ' offset 0) f(' || v_cols || ') order by f.created_at desc, f.id desc' || v_lim || ')'
    else '(select ' || v_sel || v_from || v_where || case when p_mode = 'rows' then v_ord else '' end || v_lim || ')' end;
  v_sql := v_sql || ' union all ' || v_branch;

  return v_sql;
end;
$fn$;

revoke all on function public._audit_union_sql(text, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, integer)
  from public, anon, authenticated;

-- 46d-2. The search the Web Admin calls.
create or replace function public.admin_audit_search_v2(
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
  total_capped boolean,
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
  c_cap constant integer := 10000;
  v_like text;
  v_actor text;
  v_limit integer;
  v_offset integer;
  v_count_sql text;
  v_rows_sql text;
  v_counted bigint;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  v_limit := greatest(1, least(coalesce(p_limit, 50), 5000));
  v_offset := greatest(0, least(coalesce(p_offset, 0), 200000));
  v_like := case when nullif(btrim(p_query), '') is null then null
                 else '%' || replace(replace(replace(btrim(p_query), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;
  v_actor := case when nullif(btrim(p_actor), '') is null then null
                  else '%' || replace(replace(replace(btrim(p_actor), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;

  if v_like is null then
    -- Browsing and filtering: count first (cheap, stops at c_cap + 1 per source), then fetch only the page.
    v_count_sql := 'select count(*) from (' || public._audit_union_sql('count',
        p_owner_id is not null, p_sources is not null, p_actions is not null, p_entity_types is not null,
        v_actor is not null, false, p_from is not null, p_to is not null, c_cap + 1) || ') t';
    execute v_count_sql into v_counted
      using p_owner_id, p_sources, p_actions, p_entity_types, v_actor, v_like, p_from, p_to;

    -- Each source returns only its newest (offset + limit) rows; the newest `limit` after `offset` of those is the page.
    v_rows_sql := 'select $9::bigint, $10::boolean, m.source, m.id, m.created_at, m.owner_id, m.lab_name, m.action,
           m.actor_type, m.actor_email, m.entity_type, m.entity_id, m.summary, m.field_name, m.old_value, m.new_value,
           m.reason, m.device_name, m.key_hint, m.before_json, m.after_json, m.metadata
      from (' || public._audit_union_sql('rows',
        p_owner_id is not null, p_sources is not null, p_actions is not null, p_entity_types is not null,
        v_actor is not null, false, p_from is not null, p_to is not null, v_offset + v_limit) || ') m
     order by m.created_at desc, m.id desc
     limit $11 offset $12';

    return query execute v_rows_sql
      using p_owner_id, p_sources, p_actions, p_entity_types, v_actor, v_like, p_from, p_to,
            least(v_counted, c_cap)::bigint, v_counted > c_cap, v_limit, v_offset;
  else
    -- Text search: a match can be anywhere in the log, so one pass finds the newest matches of every source and the
    -- total at the same time (a separate count would scan the log a second time).
    v_rows_sql := 'select least(count(*) over (), $9)::bigint, count(*) over () > $9, m.source, m.id, m.created_at,
           m.owner_id, m.lab_name, m.action, m.actor_type, m.actor_email, m.entity_type, m.entity_id, m.summary,
           m.field_name, m.old_value, m.new_value, m.reason, m.device_name, m.key_hint, m.before_json, m.after_json,
           m.metadata
      from (' || public._audit_union_sql('rows',
        p_owner_id is not null, p_sources is not null, p_actions is not null, p_entity_types is not null,
        v_actor is not null, true, p_from is not null, p_to is not null, greatest(c_cap + 1, v_offset + v_limit)) || ') m
     order by m.created_at desc, m.id desc
     limit $10 offset $11';

    return query execute v_rows_sql
      using p_owner_id, p_sources, p_actions, p_entity_types, v_actor, v_like, p_from, p_to,
            c_cap, v_limit, v_offset;
  end if;
end;
$$;

revoke all on function public.admin_audit_search_v2(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, integer) from public, anon;
grant execute on function public.admin_audit_search_v2(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, integer) to authenticated;

-- =====================================================================================================
-- 46e. Delete entries
-- =====================================================================================================
-- 46e-1. The deleting itself. Internal: not callable by clients. `p_ids` are entry ids as the search returns them
--        ('a<number>' admin change, 'l<number>' key/device event, 'o<uuid>' lab Online entry, 'd<number>' lab Offline-PC entry).
--        Deleting an Offline-PC entry that was later uploaded to the lab's own cloud log (when the lab moved to Online
--        Mode) also deletes that uploaded copy; otherwise the entry would show up again as an Online entry.
create or replace function public._audit_delete_ids(p_ids text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_a bigint[];
  v_l bigint[];
  v_d bigint[];
  v_o uuid[];
  n_a integer := 0;
  n_l integer := 0;
  n_o integer := 0;
  n_d integer := 0;
  n_copies integer := 0;
  v_owners uuid[] := '{}';
  v_tmp uuid[];
begin
  select coalesce(array_agg(substr(x, 2)::bigint), '{}') into v_a from unnest(p_ids) x where x ~ '^a[0-9]{1,18}$';
  select coalesce(array_agg(substr(x, 2)::bigint), '{}') into v_l from unnest(p_ids) x where x ~ '^l[0-9]{1,18}$';
  select coalesce(array_agg(substr(x, 2)::bigint), '{}') into v_d from unnest(p_ids) x where x ~ '^d[0-9]{1,18}$';
  select coalesce(array_agg(substr(x, 2)::uuid), '{}') into v_o from unnest(p_ids) x
   where x ~* '^o[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

  with d as (delete from public.admin_audit_log where id = any (v_a) returning owner_id)
  select count(*)::integer, coalesce(array_agg(owner_id), '{}') into n_a, v_tmp from d;
  v_owners := v_owners || v_tmp;

  with d as (delete from public.offline_license_audit where id = any (v_l) returning owner_id)
  select count(*)::integer, coalesce(array_agg(owner_id), '{}') into n_l, v_tmp from d;
  v_owners := v_owners || v_tmp;

  with d as (delete from public.audit_logs where id = any (v_o) returning owner_id)
  select count(*)::integer, coalesce(array_agg(owner_id), '{}') into n_o, v_tmp from d;
  v_owners := v_owners || v_tmp;

  -- Offline-PC entries: first remove their uploaded copy in audit_logs (if the lab has moved to Online Mode) ...
  with m as (
    select e.owner_id, e.source_log_id
      from public.lab_audit_events e
     where e.id = any (v_d) and e.source_log_id is not null
  ), d as (
    delete from public.audit_logs a using m where a.id = m.source_log_id and a.owner_id = m.owner_id returning a.id
  )
  select count(*)::integer into n_copies from d;

  -- ... then the entries themselves.
  with d as (delete from public.lab_audit_events where id = any (v_d) returning owner_id)
  select count(*)::integer, coalesce(array_agg(owner_id), '{}') into n_d, v_tmp from d;
  v_owners := v_owners || v_tmp;

  return jsonb_build_object(
    'account', n_a, 'license', n_l, 'lab_online', n_o, 'lab_offline', n_d, 'migrated_copies', n_copies,
    'total', n_a + n_l + n_o + n_d,
    'lab_count', (select count(distinct x) from unnest(v_owners) x where x is not null),
    'has_unassigned', exists (select 1 from unnest(v_owners) x where x is null),
    'owner_id', case when (select count(distinct x) from unnest(v_owners) x where x is not null) = 1
                      and not exists (select 1 from unnest(v_owners) x where x is null)
                     then (select min(x::text) from unnest(v_owners) x) end);
end;
$$;

revoke all on function public._audit_delete_ids(text[]) from public, anon, authenticated;

-- 46e-2. Writes the deletion record (internal).
create or replace function public._audit_record_deletion(p_mode text, p_result jsonb, p_filter text, p_reason text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_owner uuid := nullif(p_result ->> 'owner_id', '')::uuid;
begin
  select email into v_email from auth.users where id = auth.uid();
  insert into public.admin_audit_deletions
    (actor_id, actor_email, mode, owner_id, lab_name, lab_count, row_count, counts, filter_summary, reason)
  values
    (auth.uid(), v_email, p_mode, v_owner,
     (select lb.lab_name from public.labs lb where lb.owner_id = v_owner),
     coalesce((p_result ->> 'lab_count')::integer, 0) + case when coalesce((p_result ->> 'has_unassigned')::boolean, false) then 1 else 0 end,
     (p_result ->> 'total')::integer,
     p_result - 'total' - 'lab_count' - 'has_unassigned' - 'owner_id',
     left(p_filter, 400),
     left(nullif(btrim(p_reason), ''), 200));
end;
$$;

revoke all on function public._audit_record_deletion(text, jsonb, text, text) from public, anon, authenticated;

-- 46e-3. Delete the entries the admin ticked.
create or replace function public.admin_audit_delete(p_ids text[], p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ids text[];
  v_result jsonb;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;
  if not exists (select 1 from public.admin_audit_delete_permissions p where p.user_id = auth.uid()) then
    raise exception 'Not authorized: your account is not allowed to delete audit entries.';
  end if;

  select array_agg(distinct x) into v_ids from unnest(coalesce(p_ids, '{}')) x where x is not null;
  if v_ids is null then
    raise exception 'Nothing selected.';
  end if;
  if array_length(v_ids, 1) > 500 then
    raise exception 'Select at most 500 entries at a time.';
  end if;
  if exists (select 1 from unnest(v_ids) x
              where x !~* '^(a[0-9]{1,18}|l[0-9]{1,18}|d[0-9]{1,18}|o[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$') then
    raise exception 'Invalid entry in the selection.';
  end if;

  v_result := public._audit_delete_ids(v_ids);
  if (v_result ->> 'total')::integer > 0 then
    perform public._audit_record_deletion('selected', v_result, 'Entries ticked in the list', p_reason);
  end if;
  return jsonb_build_object('deleted', (v_result ->> 'total')::integer);
end;
$$;

revoke all on function public.admin_audit_delete(text[], text) from public, anon;
grant execute on function public.admin_audit_delete(text[], text) to authenticated;

-- =====================================================================================================
-- 46f. Delete everything a filter matches (for example "all history of this lab")
-- =====================================================================================================
-- The caller passes the number of entries it was shown (p_expected_count). If the count has changed since (new events
-- arrived, someone else deleted some), nothing is deleted and the admin is asked to reload. A lab or a complete date
-- range is required, so a bare "delete everything" is impossible. At most 5,000 entries per call.
create or replace function public.admin_audit_delete_matching(
  p_owner_id uuid default null,
  p_sources text[] default null,
  p_actions text[] default null,
  p_entity_types text[] default null,
  p_actor text default null,
  p_query text default null,
  p_from timestamptz default null,
  p_to timestamptz default null,
  p_expected_count integer default null,
  p_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_like text;
  v_actor text;
  v_ids text[];
  v_result jsonb;
  v_filter text;
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;
  if not exists (select 1 from public.admin_audit_delete_permissions p where p.user_id = auth.uid()) then
    raise exception 'Not authorized: your account is not allowed to delete audit entries.';
  end if;
  if p_owner_id is null and (p_from is null or p_to is null) then
    raise exception 'Add a lab, or a from and to date, before deleting a whole list.';
  end if;
  if p_expected_count is null or p_expected_count < 1 then
    raise exception 'Nothing to delete.';
  end if;

  v_like := case when nullif(btrim(p_query), '') is null then null
                 else '%' || replace(replace(replace(btrim(p_query), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;
  v_actor := case when nullif(btrim(p_actor), '') is null then null
                  else '%' || replace(replace(replace(btrim(p_actor), '\', '\\'), '%', '\%'), '_', '\_') || '%' end;

  execute 'select coalesce(array_agg(t.id), ''{}'') from (' || public._audit_union_sql('ids',
      p_owner_id is not null, p_sources is not null, p_actions is not null, p_entity_types is not null,
      v_actor is not null, v_like is not null, p_from is not null, p_to is not null, 5001) || ') t(id)'
    into v_ids
    using p_owner_id, p_sources, p_actions, p_entity_types, v_actor, v_like, p_from, p_to;

  -- 5,001 per source can reach 20,004 ids; anything above 5,000 is refused.
  if coalesce(array_length(v_ids, 1), 0) > 5000 then
    raise exception 'Too many entries match (more than 5,000). Narrow the date range or choose one lab, then repeat.';
  end if;
  if coalesce(array_length(v_ids, 1), 0) <> p_expected_count then
    raise exception 'The list changed (% entries match now). Reload the page and try again.', coalesce(array_length(v_ids, 1), 0);
  end if;

  v_result := public._audit_delete_ids(v_ids);

  v_filter := concat_ws('; ',
    case when p_owner_id is not null then 'one lab' end,
    case when p_sources is not null then 'sources: ' || array_to_string(p_sources, ', ') end,
    case when p_actions is not null then 'action types' end,
    case when p_entity_types is not null then 'record type' end,
    case when v_actor is not null then 'by person' end,
    case when v_like is not null then 'text search' end,
    case when p_from is not null then 'from ' || to_char(p_from at time zone 'UTC', 'YYYY-MM-DD') end,
    case when p_to is not null then 'before ' || to_char(p_to at time zone 'UTC', 'YYYY-MM-DD') end);

  if (v_result ->> 'total')::integer > 0 then
    perform public._audit_record_deletion('matching', v_result, v_filter, p_reason);
  end if;
  return jsonb_build_object('deleted', (v_result ->> 'total')::integer);
end;
$$;

revoke all on function public.admin_audit_delete_matching(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, text) from public, anon;
grant execute on function public.admin_audit_delete_matching(uuid, text[], text[], text[], text, text, timestamptz, timestamptz, integer, text) to authenticated;

-- =====================================================================================================
-- 46g. Deletion history (any administrator may read it)
-- =====================================================================================================
create or replace function public.admin_audit_deletions_list(p_limit integer default 50, p_offset integer default 0)
returns table (
  total_count bigint,
  id bigint,
  deleted_at timestamptz,
  actor_email text,
  mode text,
  owner_id uuid,
  lab_name text,
  lab_count integer,
  row_count integer,
  counts jsonb,
  filter_summary text,
  reason text
)
language plpgsql
security definer
stable
set search_path = public
as $$
#variable_conflict use_column
begin
  if not public.is_admin() then
    raise exception 'Not authorized: admin access required.';
  end if;

  return query
    select count(*) over ()::bigint, d.id, d.deleted_at, d.actor_email, d.mode, d.owner_id,
           coalesce(lb.lab_name, d.lab_name), d.lab_count, d.row_count, d.counts, d.filter_summary, d.reason
      from public.admin_audit_deletions d
      left join public.labs lb on lb.owner_id = d.owner_id
     order by d.deleted_at desc, d.id desc
     limit greatest(1, least(coalesce(p_limit, 50), 200))
    offset greatest(0, least(coalesce(p_offset, 0), 100000));
end;
$$;

revoke all on function public.admin_audit_deletions_list(integer, integer) from public, anon;
grant execute on function public.admin_audit_deletions_list(integer, integer) to authenticated;

-- =====================================================================================================
-- 46h. Indexes (created only when no index starting with these columns exists yet)
-- =====================================================================================================
do $$
begin
  if to_regclass('public.audit_logs') is not null
     and not exists (select 1 from pg_indexes where schemaname = 'public' and tablename = 'audit_logs'
                      and indexdef ~* '\(owner_id, created_at') then
    create index idx_audit_logs_owner_time on public.audit_logs (owner_id, created_at desc);
  end if;
  if to_regclass('public.audit_logs') is not null
     and not exists (select 1 from pg_indexes where schemaname = 'public' and tablename = 'audit_logs'
                      and indexdef ~* '\(created_at') then
    create index idx_audit_logs_time on public.audit_logs (created_at desc);
  end if;
  if to_regclass('public.offline_license_audit') is not null
     and not exists (select 1 from pg_indexes where schemaname = 'public' and tablename = 'offline_license_audit'
                      and indexdef ~* '\(owner_id, created_at') then
    create index idx_offline_license_audit_owner_time on public.offline_license_audit (owner_id, created_at desc);
  end if;
  if to_regclass('public.offline_license_audit') is not null
     and not exists (select 1 from pg_indexes where schemaname = 'public' and tablename = 'offline_license_audit'
                      and indexdef ~* '\(created_at') then
    create index idx_offline_license_audit_time on public.offline_license_audit (created_at desc);
  end if;
end $$;
