import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Minimal Supabase client used ONLY by the LabNova report verification
 * route (/labnova/verify). This does not touch or configure any other
 * part of the site.
 *
 * Requires these environment variables to be set:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Uses the public anon key intentionally — this route calls a single
 * read-only RPC (get_report_verification) that is expected to be safe
 * to expose publicly, since the verification page itself is public
 * (reached by scanning a printed QR code).
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}
