import 'server-only';
import { cache } from 'react';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import type { AuditDeletion, AuditEntry, AuditRow, DeviceModeStatus, DeviceSyncStatus, KeyCounts, Lab, OfflineAuditEntry, OfflineKey } from '@/lib/types';

/**
 * Reads go through the same admin_* database functions the Windows app's
 * Admin Panel uses. Each one checks is_admin() inside the database.
 */

/** "the database update has not been run yet" vs "something else went wrong". */
export class DataError extends Error {
  constructor(
    message: string,
    readonly kind: 'schema' | 'failed',
  ) {
    super(message);
  }
}

type RpcError = { code?: string; message?: string } | null;

/** PostgREST says PGRST202 / "Could not find the function" when an RPC is not installed. */
export function isMissingFunction(error: RpcError): boolean {
  if (!error) return false;
  return error.code === 'PGRST202' || /could not find the function/i.test(error.message ?? '');
}

function fail(error: RpcError, what: string): never {
  throw new DataError(
    isMissingFunction(error) ? `${what}: the latest database update has not been run yet.` : `${what}.`,
    isMissingFunction(error) ? 'schema' : 'failed',
  );
}

/** Runs a loader and turns a failure into a value the page can show, instead of crashing the page. */
export async function settle<T>(promise: Promise<T>): Promise<{ data: T; error: null } | { data: null; error: 'schema' | 'failed' }> {
  try {
    return { data: await promise, error: null };
  } catch (e) {
    // redirect()/notFound() are thrown as control-flow errors and must pass through.
    if (typeof e === 'object' && e !== null && 'digest' in e) throw e;
    if (e instanceof DataError) return { data: null, error: e.kind };
    return { data: null, error: 'failed' };
  }
}

export async function listLabs(): Promise<Lab[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_list_labs');
  if (error) fail(error, 'Could not load labs');
  return (data ?? []) as Lab[];
}

export async function getLab(ownerId: string): Promise<Lab | null> {
  const labs = await listLabs();
  return labs.find((lab) => lab.owner_id === ownerId) ?? null;
}

export type KeyCountMap = Map<string, { total: number; unused: number; activated: number; revoked: number; expired: number }>;

export async function listKeyCounts(): Promise<KeyCountMap> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_offline_key_counts');
  if (error) fail(error, 'Could not load activation key totals');
  const map: KeyCountMap = new Map();
  for (const row of (data ?? []) as KeyCounts[]) {
    map.set(row.owner_id, {
      total: Number(row.total_keys),
      unused: Number(row.unused_keys),
      activated: Number(row.activated_keys),
      revoked: Number(row.revoked_keys),
      // Absent until the phase-2 database update has been run.
      expired: Number(row.expired_keys ?? 0),
    });
  }
  return map;
}

/**
 * Writes the "key expired" history entry for keys that have passed their expiry date and have not been logged yet
 * (admin_sweep_expired_keys, phase-2 update). Best effort: the pages it is called from must never fail because of it,
 * and it does nothing before the phase-2 database update has been run.
 */
const SWEEP_EVERY_MS = 60_000;
const lastSweep = new Map<string, number>();

export async function sweepExpiredKeys(ownerId: string | null = null): Promise<void> {
  // The sweep is a write, and nothing is lost by waiting: the key lists already show expired keys as expired, and this only
  // adds the history entry. So it runs at most once a minute per server instead of on every page load.
  const scope = ownerId ?? 'all';
  const now = Date.now();
  if (now - (lastSweep.get(scope) ?? 0) < SWEEP_EVERY_MS) return;
  lastSweep.set(scope, now);
  try {
    await requireAdmin();
    const supabase = await createClient();
    await supabase.rpc('admin_sweep_expired_keys', { p_owner_id: ownerId });
  } catch (e) {
    // redirect() is thrown as control flow and must pass through.
    if (typeof e === 'object' && e !== null && 'digest' in e) throw e;
    lastSweep.delete(scope);
  }
}

export async function listOfflineKeys(ownerId: string): Promise<OfflineKey[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_list_offline_keys', { p_owner_id: ownerId });
  if (error) fail(error, 'Could not load activation keys');
  return (data ?? []) as OfflineKey[];
}

/**
 * Cloud-sync status of every activated/revoked PC of a lab (admin_device_sync_status, section 40 of
 * the database schema). A lab without that update shows "schema" and the rest of the page keeps working.
 */
export async function listDeviceSyncStatus(ownerId: string): Promise<DeviceSyncStatus[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_device_sync_status', { p_owner_id: ownerId });
  if (error) fail(error, 'Could not load PC sync status');
  return (data ?? []) as DeviceSyncStatus[];
}

/**
 * Where each activated PC of a lab stands in a switch from Offline to Online (admin_device_mode_status, phase-2
 * update). A status only: never any lab data. Shows "schema" until that update has been run.
 */
export async function listDeviceModeStatus(ownerId: string): Promise<DeviceModeStatus[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_device_mode_status', { p_owner_id: ownerId });
  if (error) fail(error, 'Could not load the Online/Offline mode status');
  return (data ?? []) as DeviceModeStatus[];
}

export async function listOfflineAudit(ownerId: string): Promise<OfflineAuditEntry[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_list_offline_audit', { p_owner_id: ownerId, p_limit: 200 });
  if (error) fail(error, 'Could not load license history');
  return (data ?? []) as OfflineAuditEntry[];
}

export type AuditFilter = {
  ownerId?: string | null;
  actions?: string[] | null;
  from?: string | null;
  to?: string | null;
  limit?: number;
  offset?: number;
};

/** Merged admin audit trail (plan/account/SMS changes + offline key & device events). */
export async function listAudit(filter: AuditFilter = {}): Promise<AuditEntry[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_list_audit', {
    p_owner_id: filter.ownerId ?? null,
    p_actions: filter.actions ?? null,
    p_from: filter.from ?? null,
    p_to: filter.to ?? null,
    p_limit: filter.limit ?? 50,
    p_offset: filter.offset ?? 0,
  });
  if (error) fail(error, 'Could not load the audit log');
  return (data ?? []) as AuditEntry[];
}

export type AuditSearch = {
  ownerId?: string | null;
  sources?: string[] | null;
  actions?: string[] | null;
  entityTypes?: string[] | null;
  /** Part of the who's e-mail address. */
  actor?: string | null;
  /** Free text over action, summary, who, record, lab, old/new values, reason and PC name. */
  query?: string | null;
  from?: string | null;
  to?: string | null;
  limit?: number;
  offset?: number;
};

/** admin_audit_search_v2 counts only up to this many matches (the page then shows "10,000+"). */
export const AUDIT_TOTAL_CAP = 10_000;

export type AuditResult = {
  rows: AuditRow[];
  /** Matching rows; when `capped` it is a lower bound (AUDIT_TOTAL_CAP). */
  total: number;
  capped: boolean;
  /** 'v2' = the fast search (audit_admin_phase3.sql installed); 'legacy' = the original admin_audit_search. */
  engine: 'v2' | 'legacy';
};

/**
 * Every audit event (admin changes, key & device events, what labs did Online and on their Offline PCs) with
 * entity, before/after values and a total for paging. The first row carries the total of the matching rows.
 *
 * Uses admin_audit_search_v2 (audit_admin_phase3.sql) and quietly falls back to the original admin_audit_search while
 * that update has not been run, so the page works either way.
 */
export async function searchAudit(filter: AuditSearch = {}): Promise<AuditResult> {
  await requireAdmin();
  const supabase = await createClient();
  const args = {
    p_owner_id: filter.ownerId ?? null,
    p_sources: filter.sources ?? null,
    p_actions: filter.actions ?? null,
    p_entity_types: filter.entityTypes ?? null,
    p_actor: filter.actor ?? null,
    p_query: filter.query ?? null,
    p_from: filter.from ?? null,
    p_to: filter.to ?? null,
    p_limit: filter.limit ?? 50,
    p_offset: filter.offset ?? 0,
  };

  let engine: AuditResult['engine'] = 'v2';
  let { data, error } = await supabase.rpc('admin_audit_search_v2', args);
  if (error && isMissingFunction(error)) {
    engine = 'legacy';
    ({ data, error } = await supabase.rpc('admin_audit_search', args));
  }
  if (error) fail(error, 'Could not load the audit log');

  const rows = (data ?? []) as AuditRow[];
  return {
    rows,
    total: rows.length > 0 ? Number(rows[0].total_count) : 0,
    capped: engine === 'v2' && rows.length > 0 && rows[0].total_capped === true,
    engine,
  };
}

/**
 * May the signed-in admin delete audit entries? (admin_can_delete_audit, audit_admin_phase3.sql.) false until that update
 * has been run and the admin has been given the permission; the delete buttons are then simply not shown. The database
 * checks the same permission again inside the delete functions, so this only decides what the page shows.
 */
export const canDeleteAudit = cache(async (): Promise<boolean> => {
  await requireAdmin();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('admin_can_delete_audit');
    return !error && data === true;
  } catch {
    return false;
  }
});

/** The record of deleted audit entries (who, when, which lab, how many, why). Never any audit content. */
export async function listAuditDeletions(limit = 50, offset = 0): Promise<{ rows: AuditDeletion[]; total: number }> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_audit_deletions_list', { p_limit: limit, p_offset: offset });
  if (error) fail(error, 'Could not load the deletion history');
  const rows = (data ?? []) as AuditDeletion[];
  return { rows, total: rows.length > 0 ? Number(rows[0].total_count) : 0 };
}
