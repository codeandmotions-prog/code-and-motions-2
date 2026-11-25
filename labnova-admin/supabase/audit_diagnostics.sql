-- LabNova Web Admin Panel — audit diagnostics (READ-ONLY)
-- Optional. Paste into the Supabase SQL editor and run BEFORE audit_admin_phase3.sql if you want to see what the
-- database looks like today. It only reads: it creates, changes and deletes nothing.
--
-- It returns one list with three columns: check, item, detail. Please send me (or look through) any row whose
-- check is "TRIGGER" or "POLICY": those are the places where something could block or react to deleting audit entries.

select * from (

  -- 1. The tables the audit page reads, and how many rows each has.
  select 'ROWS' as "check", t.name as item,
         (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from public.%I', t.name), false, true, '')))[1]::text as detail
    from (values ('admin_audit_log'), ('offline_license_audit'), ('audit_logs'), ('lab_audit_events'), ('labs')) as t(name)
   where to_regclass('public.' || t.name) is not null

  union all
  select 'MISSING TABLE', t.name, 'this table does not exist (the audit page needs it)'
    from (values ('admin_audit_log'), ('offline_license_audit'), ('audit_logs'), ('lab_audit_events'), ('labs')) as t(name)
   where to_regclass('public.' || t.name) is null

  -- 2. The columns the new search relies on (name and type).
  union all
  select 'COLUMN', c.table_name || '.' || c.column_name, c.data_type
    from information_schema.columns c
   where c.table_schema = 'public'
     and ((c.table_name = 'audit_logs' and c.column_name in ('id', 'owner_id', 'created_at', 'action', 'description', 'performed_by_email', 'entity_type', 'entity_id', 'metadata'))
       or (c.table_name = 'offline_license_audit' and c.column_name in ('id', 'owner_id', 'key_id', 'created_at', 'action', 'details', 'actor_email', 'device_name', 'key_hint'))
       or (c.table_name = 'lab_audit_events' and c.column_name in ('id', 'owner_id', 'occurred_at', 'source_log_id', 'summary'))
       or (c.table_name = 'admin_audit_log' and c.column_name in ('id', 'owner_id', 'created_at', 'lab_name')))

  -- 3. Indexes on those tables.
  union all
  select 'INDEX', i.tablename || '.' || i.indexname, i.indexdef
    from pg_indexes i
   where i.schemaname = 'public'
     and i.tablename in ('admin_audit_log', 'offline_license_audit', 'audit_logs', 'lab_audit_events')

  -- 4. Triggers on those tables (anything that fires when an entry is added, changed or DELETED).
  union all
  select 'TRIGGER', c.relname || '.' || tg.tgname, pg_get_triggerdef(tg.oid)
    from pg_trigger tg
    join pg_class c on c.oid = tg.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relname in ('admin_audit_log', 'offline_license_audit', 'audit_logs', 'lab_audit_events')
     and not tg.tgisinternal

  -- 5. Row-level-security policies on those tables.
  union all
  select 'POLICY', p.tablename || '.' || p.policyname, p.cmd || ' for ' || coalesce(array_to_string(p.roles, ','), '?')
    from pg_policies p
   where p.schemaname = 'public'
     and p.tablename in ('admin_audit_log', 'offline_license_audit', 'audit_logs', 'lab_audit_events')

  union all
  select 'RLS', c.relname, case when c.relrowsecurity then 'row-level security is ON' else 'row-level security is OFF' end
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relname in ('admin_audit_log', 'offline_license_audit', 'audit_logs', 'lab_audit_events')

  -- 6. Foreign keys that point INTO audit_logs (they would stop a delete or delete other rows with it).
  union all
  select 'FOREIGN KEY INTO AUDIT', con.conrelid::regclass::text || '.' || con.conname, pg_get_constraintdef(con.oid)
    from pg_constraint con
   where con.contype = 'f'
     and con.confrelid in ('public.audit_logs'::regclass, 'public.admin_audit_log'::regclass,
                           'public.offline_license_audit'::regclass, 'public.lab_audit_events'::regclass)

  -- 7. Are the new objects installed?
  union all
  select 'INSTALLED', p.proname, 'function exists'
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public'
     and p.proname in ('admin_audit_search', 'admin_audit_search_v2', 'admin_audit_delete', 'admin_audit_delete_matching',
                       'admin_audit_deletions_list', 'admin_can_delete_audit', 'is_admin')


) r
order by 1, 2;
