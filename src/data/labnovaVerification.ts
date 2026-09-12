import { getSupabaseClient } from "@/lib/supabase/server";

/**
 * Shape of a row returned by the LabNova Supabase RPC `get_report_verification`.
 * This mirrors the backend contract exactly — field names are not renamed
 * so this stays a straightforward pass-through of what the RPC returns.
 *
 * Deliberately excludes test results and reference ranges: this page only
 * ever selects/display the identifying and status fields listed below.
 */
export type ReportVerification = {
  lab_name: string;
  patient_name: string;
  patient_display_id: string;
  test_name: string;
  status: string;
  registered_at: string;
  doctor_name: string | null;
  technician_name: string;
  technician_phone: string;
};

export type VerificationResult =
  | { outcome: "found"; report: ReportVerification }
  | { outcome: "not-found" }
  | { outcome: "config-error" }
  | { outcome: "error" };

/**
 * Looks up a report's verification record via the LabNova Supabase RPC.
 *
 * Calls exactly: supabase.rpc('get_report_verification', { p_report_id: id })
 * and reads the first row of the returned data.
 *
 * Response handling is deliberately defensive: PostgREST returns an array
 * for functions that RETURNS SETOF/TABLE, but a single JSON object for
 * functions that RETURN a single row type. Both shapes are handled here
 * so a schema-side return-type detail doesn't silently look like
 * "not found".
 */
export async function getReportVerification(reportId: string): Promise<VerificationResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    // getSupabaseClient() already logs exactly which env var is missing
    // or why client creation failed.
    return { outcome: "config-error" };
  }

  let data: unknown;
  let error: { message: string; code?: string; details?: string; hint?: string } | null = null;

  try {
    const response = await supabase.rpc("get_report_verification", {
      p_report_id: reportId,
    });
    data = response.data;
    error = response.error;
  } catch (err) {
    // Covers network failures, DNS errors, etc. — anything thrown rather
    // than returned as a Supabase `error` object.
    console.error("LabNova verification: RPC call threw an unexpected error.", err);
    return { outcome: "error" };
  }

  if (error) {
    // Log every diagnostic field Postgres/PostgREST gives us. In
    // particular: a "permission denied" or 42501 code almost always
    // means the `anon` role hasn't been granted EXECUTE on the function
    // (or RLS is blocking it) — that only shows up here, never in the
    // Supabase SQL Editor, which runs as the superuser.
    console.error("LabNova verification: get_report_verification RPC returned an error.", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      reportId,
    });
    return { outcome: "error" };
  }

  const row = Array.isArray(data) ? data[0] : data;

  if (!row) {
    return { outcome: "not-found" };
  }

  return { outcome: "found", report: row as ReportVerification };
}
