import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Database,
  Search,
  Puzzle,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import type { MigrationResult, MigrationRisk, RiskSeverity } from "@/lib/migration-checker/scoring";
import { contactInfo } from "@/data/contactInfo";
import MigrationScoreRing from "./MigrationScoreRing";

type MigrationResultsContentProps = {
  result: MigrationResult;
};

const severityMeta: Record<
  RiskSeverity,
  { label: string; badge: string; border: string; icon: typeof AlertTriangle }
> = {
  high: { label: "High Impact", badge: "bg-red-500/10 text-red-600", border: "border-red-200", icon: AlertTriangle },
  medium: {
    label: "Medium Impact",
    badge: "bg-amber-500/10 text-amber-600",
    border: "border-amber-200",
    icon: AlertCircle,
  },
  low: { label: "Low Impact", badge: "bg-(--color-blue)/10 text-(--color-blue)", border: "border-(--color-line)", icon: Info },
};

function RiskCard({ risk }: { risk: MigrationRisk }) {
  const meta = severityMeta[risk.severity];
  const Icon = meta.icon;
  return (
    <div className={`rounded-2xl border ${meta.border} bg-(--color-surface) p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className="shrink-0" />
          <span className="text-[14.5px] font-bold text-(--color-ink)">{risk.title}</span>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] ${meta.badge}`}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{risk.description}</p>
    </div>
  );
}

function CategorySection({
  icon: Icon,
  title,
  risks,
  emptyMessage,
}: {
  icon: typeof Database;
  title: string;
  risks: MigrationRisk[];
  emptyMessage: string;
}) {
  return (
    <div className="border-b border-(--color-line) p-6 lg:p-8">
      <h4 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
        <Icon size={15} />
        {title}
      </h4>
      {risks.length === 0 ? (
        <p className="mt-4 flex items-start gap-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
          {emptyMessage}
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {risks.map((risk) => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MigrationResultsContent({ result }: MigrationResultsContentProps) {
  const labelCopy: Record<MigrationResult["label"], string> = {
    Ready: "Your store looks ready for a straightforward Shopify migration.",
    "Needs Preparation": "Migration is realistic, but a few things need planning first.",
    Complex: "This is a more complex migration — worth planning carefully with a developer.",
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-(--color-line) bg-white text-left shadow-[0_30px_70px_-40px_rgba(11,28,77,0.35)]">
      {/* summary header */}
      <div className="flex flex-col gap-6 border-b border-(--color-line) p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-blue)/10 px-3 py-1 text-[12px] font-bold text-(--color-blue)">
            <ListChecks size={14} /> Migration Readiness Report
          </span>
          <h3 className="mt-3 text-[19px] font-bold text-(--color-ink)">{result.label}: {result.complexity} Complexity</h3>
          <p className="mt-1 max-w-md text-[13.5px] text-(--color-ink-soft)">{labelCopy[result.label]}</p>
        </div>

        <MigrationScoreRing score={result.score} label={result.label} />
      </div>

      {/* performance-style metrics: complexity + risk count */}
      <div className="grid grid-cols-2 gap-px border-b border-(--color-line) bg-(--color-line) sm:grid-cols-4">
        {[
          { label: "Readiness Score", value: `${result.score}/100` },
          { label: "Complexity", value: result.complexity },
          { label: "Risks Flagged", value: `${result.risks.length}` },
          { label: "High-Impact Risks", value: `${result.mainRisks.length}` },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 text-center">
            <p className="text-[20px] font-extrabold text-(--color-ink)">{stat.value}</p>
            <p className="mt-1 text-[12px] font-medium text-(--color-ink-soft)">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* score breakdown */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          How This Score Was Calculated
        </h4>
        <div className="mt-4 space-y-3">
          {result.scoreFactors.map((factor) => (
            <div key={factor.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-(--color-ink)">{factor.label}</span>
                <span className="text-[13px] text-(--color-ink-soft)">— {factor.value}</span>
              </div>
              <span className="text-[13px] font-bold text-(--color-ink)">
                {(factor.maxPenalty - factor.penalty).toFixed(0)}/{factor.maxPenalty} pts
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-(--color-ink-soft)">
          Each answer costs points based on how much complexity it typically adds to a WooCommerce → Shopify
          migration. Your score is 100 minus the total, based only on what you selected above.
        </p>
      </div>

      {/* main risks */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Main Risks
        </h4>
        {result.mainRisks.length === 0 ? (
          <p className="mt-4 flex items-start gap-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            No high-impact risks were flagged based on your answers — this looks like a manageable migration.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {result.mainRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        )}
      </div>

      <CategorySection
        icon={Database}
        title="Data Migration Considerations"
        risks={result.dataRisks}
        emptyMessage="No major data migration risks flagged — a standard product, customer, and order export/import should work well."
      />

      <CategorySection
        icon={Search}
        title="SEO & URL Risks"
        risks={result.seoRisks}
        emptyMessage="No major SEO risks flagged based on your answers."
      />

      <CategorySection
        icon={Puzzle}
        title="Plugin & Custom Functionality Risks"
        risks={result.pluginRisks}
        emptyMessage="No major plugin or custom-code risks flagged — your feature set looks fairly standard."
      />

      {/* recommended next steps */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Recommended Next Steps
        </h4>
        <ul className="mt-4 space-y-3">
          {result.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-(--color-ink-soft)">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-blue)/10 text-[11px] font-bold text-(--color-blue)">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden bg-(--color-navy-deep) p-7 text-center sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(110% 140% at 50% 0%, #14245c 0%, #0b1c4d 50%, #060d24 100%)",
          }}
        />
        <div className="relative">
          <h3 className="text-[22px] font-extrabold leading-snug text-white sm:text-[26px]">
            Need Help Migrating Your Store?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">
            Our Shopify development team can turn this report into a real migration plan — handling your
            data, custom features, SEO redirects, and integrations from start to finish.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/services/shopify-development"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Talk to Our Shopify Team
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={contactInfo.whatsappConsultationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:border-white"
            >
              <Image src="/images/whatsapp-icon.png" alt="" width={299} height={299} className="h-[18px] w-[18px]" />
              WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
