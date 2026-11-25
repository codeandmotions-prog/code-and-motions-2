'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { isMissingFunction } from '@/lib/data';
import { MAX_DELETE_MATCHING, parseAuditFilters, toSearch } from '@/lib/audit-query';
import { createClient } from '@/lib/supabase/server';

export type DeleteResult = { ok: true; deleted: number } | { ok: false; error: string };

const SCHEMA_MESSAGE =
  'The audit-delete database update has not been run yet. Run supabase/audit_admin_phase3.sql in the Supabase SQL editor, then try again.';

// Entry ids as the audit search returns them: a<number> (admin change), l<number> (key / device event),
// d<number> (Offline-PC entry), o<uuid> (lab's Online entry).
const ENTRY_ID = /^(?:[ald]\d{1,18}|o[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

// The database raises short, admin-safe messages. Show those; anything unexpected becomes a generic message.
const SAFE_PREFIXES = [
  'Not authorized',
  'Nothing',
  'Select at most',
  'Invalid entry',
  'Add a lab',
  'Too many entries',
  'The list changed',
];

function safeMessage(message: string | undefined, fallback: string): string {
  if (message && SAFE_PREFIXES.some((prefix) => message.startsWith(prefix))) return message;
  return fallback;
}

function cleanReason(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const text = value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, 200);
  return text || null;
}

function refresh() {
  revalidatePath('/audit');
  revalidatePath('/audit/deletions');
  revalidatePath('/');
}

function deletedCount(data: unknown): number {
  const value = typeof data === 'object' && data !== null ? (data as Record<string, unknown>).deleted : null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * Deletes the audit entries an admin ticked. Both locks are checked again here and in the database: requireAdmin()
 * (signed in and listed as an admin), and inside admin_audit_delete the delete permission itself.
 */
export async function deleteAuditEntriesAction(ids: string[], reason: string): Promise<DeleteResult> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0) return { ok: false, error: 'Nothing is selected.' };
  if (!ids.every((id) => typeof id === 'string' && ENTRY_ID.test(id))) return { ok: false, error: 'Invalid selection. Reload the page and try again.' };
  const unique = Array.from(new Set(ids));
  if (unique.length > 500) return { ok: false, error: 'Select at most 500 entries at a time.' };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('admin_audit_delete', { p_ids: unique, p_reason: cleanReason(reason) });
    if (error) {
      if (isMissingFunction(error)) return { ok: false, error: SCHEMA_MESSAGE };
      return { ok: false, error: safeMessage(error.message, 'The entries could not be deleted. Nothing was changed.') };
    }
    refresh();
    return { ok: true, deleted: deletedCount(data) };
  } catch (e) {
    if (typeof e === 'object' && e !== null && 'digest' in e) throw e;
    return { ok: false, error: 'The entries could not be deleted right now. Please try again.' };
  }
}

/**
 * Deletes everything the current filters match (for example "all history of this lab"). The browser sends the filters as
 * the page's own query string, which is validated again here, plus the number of entries it was shown: the database
 * deletes only if exactly that many still match.
 */
export async function deleteAuditMatchingAction(filtersQuery: string, expectedCount: number, reason: string, confirmText: string): Promise<DeleteResult> {
  await requireAdmin();
  if (typeof filtersQuery !== 'string' || filtersQuery.length > 2000) return { ok: false, error: 'Invalid request.' };
  if (confirmText !== 'DELETE') return { ok: false, error: 'Type DELETE to confirm.' };
  if (!Number.isInteger(expectedCount) || expectedCount < 1) return { ok: false, error: 'Nothing to delete.' };
  if (expectedCount > MAX_DELETE_MATCHING) {
    return { ok: false, error: `At most ${MAX_DELETE_MATCHING.toLocaleString('en-GB')} entries can be deleted at once. Choose one lab or a shorter date range.` };
  }

  const filters = parseAuditFilters(new URLSearchParams(filtersQuery));
  const search = toSearch(filters);
  if (!search.ownerId && !(search.from && search.to)) {
    return { ok: false, error: 'Choose a lab, or a from and to date, before deleting a whole list.' };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('admin_audit_delete_matching', {
      p_owner_id: search.ownerId ?? null,
      p_sources: search.sources ?? null,
      p_actions: search.actions ?? null,
      p_entity_types: search.entityTypes ?? null,
      p_actor: search.actor ?? null,
      p_query: search.query ?? null,
      p_from: search.from ?? null,
      p_to: search.to ?? null,
      p_expected_count: expectedCount,
      p_reason: cleanReason(reason),
    });
    if (error) {
      if (isMissingFunction(error)) return { ok: false, error: SCHEMA_MESSAGE };
      return { ok: false, error: safeMessage(error.message, 'The entries could not be deleted. Nothing was changed.') };
    }
    refresh();
    return { ok: true, deleted: deletedCount(data) };
  } catch (e) {
    if (typeof e === 'object' && e !== null && 'digest' in e) throw e;
    return { ok: false, error: 'The entries could not be deleted right now. Please try again.' };
  }
}
