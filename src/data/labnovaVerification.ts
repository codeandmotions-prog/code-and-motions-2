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
 * and reads the first row of the returned array (data[0]).
 */
export async function getReportVerification(reportId: string): Promise<VerificationResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { outcome: "config-error" };
  }

  const { data, error } = await supabase.rpc("get_report_verification", {
    p_report_id: reportId,
  });

  if (error) {
    console.error("LabNova report verification RPC error:", error.message);
    return { outcome: "error" };
  }

  if (!Array.isArray(data) || data.length === 0 || !data[0]) {
    return { outcome: "not-found" };
  }

  return { outcome: "found", report: data[0] as ReportVerification };
}
