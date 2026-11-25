import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseEnv } from '@/lib/env';
import type { ReportVerification } from '@/lib/types';

/** The QR token: 22–64 URL-safe characters (the Windows app makes 192 random bits = 32 characters). */
export const TOKEN_RE = /^[A-Za-z0-9_-]{22,64}$/;

export type VerifyResult =
  | { kind: 'verified'; report: ReportVerification }
  /** No such report (yet): an unknown token and "the lab's PC has not synced it yet" look the same, on purpose. */
  | { kind: 'not_found' }
  | { kind: 'invalid' }
  | { kind: 'unavailable'; reason: 'schema' | 'failed' };

/**
 * Looks a QR token up through the public get_offline_report_verification function, as an anonymous visitor (no
 * session, no cookies, only the publishable key). The database function returns no row for an unknown or malformed
 * token and a fixed, small set of fields otherwise — never test results, phone numbers or billing.
 */
export async function verifyReport(token: string): Promise<VerifyResult> {
  if (!TOKEN_RE.test(token)) return { kind: 'invalid' };
  if (!isSupabaseConfigured()) return { kind: 'unavailable', reason: 'failed' };

  try {
    const { url, key } = supabaseEnv();
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data, error } = await supabase.rpc('get_offline_report_verification', { p_token: token });
    if (error) {
      const missing = error.code === 'PGRST202' || /could not find the function/i.test(error.message ?? '');
      return { kind: 'unavailable', reason: missing ? 'schema' : 'failed' };
    }
    const row = (Array.isArray(data) ? data[0] : data) as ReportVerification | null | undefined;
    if (!row) return { kind: 'not_found' };
    return { kind: 'verified', report: row };
  } catch {
    return { kind: 'unavailable', reason: 'failed' };
  }
}
