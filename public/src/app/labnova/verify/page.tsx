import type { Metadata } from "next";
import VerifyHeader from "@/components/labnova/verify/VerifyHeader";
import VerifyFooter from "@/components/labnova/verify/VerifyFooter";
import VerificationCard from "@/components/labnova/verify/VerificationCard";
import ReportStateCard from "@/components/labnova/verify/ReportStateCard";
import { getReportVerification } from "@/data/labnovaVerification";

type VerifyPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Report Verification",
  description:
    "Verify the authenticity of a laboratory report issued using LabNova, the smart laboratory management system.",
  alternates: {
    canonical: "/labnova/verify",
  },
  // Individual report lookups are private, per-record pages, not content
  // meant to rank in search — so this route is intentionally excluded
  // from indexing while remaining fully crawlable/linkable.
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LabNovaVerifyPage({ searchParams }: VerifyPageProps) {
  const resolvedParams = await searchParams;
  const rawId = resolvedParams.id;
  const reportId = Array.isArray(rawId) ? rawId[0] : rawId;
  const trimmedId = reportId?.trim();

  const result = trimmedId ? await getReportVerification(trimmedId) : null;

  return (
    <div className="flex min-h-full flex-col bg-(--color-surface)">
      <VerifyHeader />

      <main className="flex-1 px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-md">
          {!trimmedId && <ReportStateCard variant="missing-id" />}
          {trimmedId && result?.outcome === "not-found" && (
            <ReportStateCard variant="not-found" reportId={trimmedId} />
          )}
          {trimmedId && (result?.outcome === "config-error" || result?.outcome === "error") && (
            <ReportStateCard variant="unavailable" />
          )}
          {trimmedId && result?.outcome === "found" && (
            <VerificationCard reportId={trimmedId} report={result.report} />
          )}
        </div>
      </main>

      <VerifyFooter />
    </div>
  );
}
