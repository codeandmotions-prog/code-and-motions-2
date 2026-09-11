/**
 * Placeholder data layer for LabNova report verification.
 *
 * IMPORTANT: This is UI-only mock data. Nothing here touches Supabase,
 * the LabNova Windows app, or QR generation. When the real verification
 * API/Supabase query is ready, replace the body of `getReportVerification`
 * with a real lookup (e.g. a fetch to a verification endpoint or a
 * server-side Supabase query) and keep the same return shape so the
 * page/components don't need to change.
 *
 * By design, this never includes test results or clinical values —
 * only the identifying/verification metadata printed on a report.
 */

export type ReportVerification = {
  status: "verified";
  reportId: string;
  laboratoryName: string;
  patientName: string;
  reportDate: string;
  doctorName: string | null;
  technicianName: string;
  technicianPhone: string;
};

export type VerificationResult =
  | { found: true; report: ReportVerification }
  | { found: false };

/**
 * Mock lookup, standing in for a future Supabase/API call.
 *
 * For local testing:
 * - Any non-empty id (e.g. "LN-2026-00842") returns a sample verified report.
 * - The id "notfound" specifically returns the "not found" state, so that
 *   UI can be reviewed without a real backend.
 */
export async function getReportVerification(
  reportId: string
): Promise<VerificationResult> {
  if (reportId.trim().toLowerCase() === "notfound") {
    return { found: false };
  }

  return {
    found: true,
    report: {
      status: "verified",
      reportId,
      laboratoryName: "Sample Diagnostic Laboratory",
      patientName: "Sample Patient Name",
      reportDate: "September 10, 2026",
      doctorName: "Dr. Sample Referring Physician",
      technicianName: "Sample Technician Name",
      technicianPhone: "+92 300 0000000",
    },
  };
}
