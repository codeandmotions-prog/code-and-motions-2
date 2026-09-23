import Link from "next/link";
import { AlertTriangle, HelpCircle, ServerCrash, LucideIcon } from "lucide-react";

type ReportStateCardProps = {
  variant: "missing-id" | "not-found" | "unavailable";
  reportId?: string;
};

const copy: Record<
  ReportStateCardProps["variant"],
  { icon: LucideIcon; title: string; description: string }
> = {
  "missing-id": {
    icon: HelpCircle,
    title: "No Report ID Provided",
    description:
      "This link is missing a report ID. Please scan the QR code printed on your LabNova report again, or check the link you were given.",
  },
  "not-found": {
    icon: AlertTriangle,
    title: "Report Not Found",
    description:
      "We couldn't verify a report matching this ID. If you scanned a QR code directly from a printed LabNova report, please try again or contact the issuing laboratory.",
  },
  unavailable: {
    icon: ServerCrash,
    title: "Verification Temporarily Unavailable",
    description:
      "We're unable to check this report right now. Please try again shortly, or contact the issuing laboratory directly.",
  },
};

export default function ReportStateCard({ variant, reportId }: ReportStateCardProps) {
  const { icon: Icon, title, description } = copy[variant];

  return (
    <div className="overflow-hidden rounded-[28px] border border-(--color-line) bg-white p-8 text-center shadow-[0_30px_70px_-40px_rgba(11,28,77,0.25)] sm:p-10">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--color-surface)">
        <Icon size={26} className="text-(--color-ink-soft)" strokeWidth={1.75} />
      </span>
      <h1 className="mt-5 text-[19px] font-extrabold text-(--color-ink)">{title}</h1>
      <p className="mx-auto mt-2.5 max-w-sm text-[14px] leading-relaxed text-(--color-ink-soft)">
        {description}
      </p>
      {reportId && (
        <p className="mt-4 text-[12.5px] text-(--color-ink-soft)">
          Report ID: <span className="font-mono">{reportId}</span>
        </p>
      )}
      <Link
        href="/software/labnova"
        className="mt-7 inline-flex items-center justify-center rounded-full border border-(--color-line) px-6 py-3 text-[13.5px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
      >
        Learn about LabNova
      </Link>
    </div>
  );
}
