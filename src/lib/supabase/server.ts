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
 *
 * NOTE: the anon key can only do what the database explicitly allows it
 * to do. If `get_report_verification` doesn't have EXECUTE granted to
 * the `anon` role (or the tables it reads are blocked by RLS for `anon`),
 * calls made with this client will fail even though the same query
 * succeeds in the Supabase SQL Editor, which runs as the Postgres
 * superuser and bypasses grants/RLS entirely.
 */
export function getSupabaseClient(): SupabaseClient | null {
  // Defensive trim: env values pasted into Railway/host dashboards
  // occasionally pick up stray whitespace or newlines, which silently
  // breaks the client (e.g. an invalid URL) without an obvious error.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url) {
    console.error(
      "LabNova verification: NEXT_PUBLIC_SUPABASE_URL is not set (or empty) in this environment."
    );
    return null;
  }

  if (!anonKey) {
    console.error(
      "LabNova verification: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set (or empty) in this environment."
    );
    return null;
  }

  try {
    return createClient(url, anonKey);
  } catch (err) {
    // createClient throws synchronously on a malformed URL — catch it so
    // a bad env value degrades to the "unavailable" state instead of a
    // hard 500 error page.
    console.error("LabNova verification: failed to create Supabase client.", err);
    return null;
  }
}
