import {
  CheckCircle2,
  Building2,
  User,
  IdCard,
  FlaskConical,
  Calendar,
  Fingerprint,
  Stethoscope,
  UserCog,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReportVerification } from "@/data/labnovaVerification";

type VerificationCardProps = {
  reportId: string;
  report: ReportVerification;
};

type DetailRow = {
  icon: LucideIcon;
  label: string;
  value: string;
  secondaryLabel?: string;
  secondaryValue?: string;
};

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function VerificationCard({ reportId, report }: VerificationCardProps) {
  const rows: DetailRow[] = [
    {
      icon: Building2,
      label: "Laboratory",
      value: report.lab_name,
    },
    {
      icon: User,
      label: "Patient",
      value: report.patient_name,
    },
    {
      icon: IdCard,
      label: "Patient ID",
      value: report.patient_display_id,
    },
    {
      icon: Fingerprint,
      label: "Report ID",
      value: reportId,
    },
    {
      icon: FlaskConical,
      label: "Test",
      value: report.test_name,
    },
    ...(report.doctor_name
      ? [
          {
            icon: Stethoscope,
            label: "Doctor / Consultant",
            value: report.doctor_name,
          },
        ]
      : []),
    {
      icon: UserCog,
      label: "Technician",
      value: report.technician_name,
      secondaryLabel: "Contact",
      secondaryValue: report.technician_phone,
    },
    {
      icon: Calendar,
      label: "Date / Time",
      value: formatDateTime(report.registered_at),
    },
    {
      icon: ShieldCheck,
      label: "Verification Status",
      value: report.status,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border border-(--color-line) bg-white shadow-[0_30px_70px_-40px_rgba(0,112,254,0.35)]">
      <div className="flex flex-col items-center gap-3 border-b border-(--color-line) bg-[#0070FE]/[0.04] px-6 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0070FE]">
          <CheckCircle2 size={28} className="text-white" strokeWidth={2} />
        </span>
        <div>
          <h1 className="text-[19px] font-extrabold text-(--color-ink)">
            Report Verified
          </h1>
          <p className="mt-1 text-[13.5px] text-(--color-ink-soft)">
            This report was generated and issued using LabNova.
          </p>
        </div>
      </div>

      <dl className="divide-y divide-(--color-line)">
        {rows.map(({ icon: Icon, label, value, secondaryLabel, secondaryValue }) => (
          <div key={label} className="flex items-start gap-4 px-6 py-4 sm:px-7">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--color-surface)">
              <Icon size={16} className="text-[#0070FE]" strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <dt className="text-[12px] font-medium text-(--color-ink-soft)">{label}</dt>
              <dd className="mt-0.5 truncate text-[14.5px] font-semibold text-(--color-ink)">
                {value}
              </dd>
              {secondaryLabel && secondaryValue && (
                <div className="mt-2 flex items-center gap-1.5 text-[13px] text-(--color-ink-soft)">
                  <Phone size={12} />
                  <span>{secondaryValue}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
