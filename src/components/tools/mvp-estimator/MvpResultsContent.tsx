import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Calculator,
  Clock,
  Layers,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import type { MvpEstimate, CostDriver, ImpactLevel } from "@/lib/mvp-estimator/estimation";
import { contactInfo } from "@/data/contactInfo";
import ComplexityMeter from "./ComplexityMeter";

type MvpResultsContentProps = {
  result: MvpEstimate;
};

const impactMeta: Record<ImpactLevel, { label: string; badge: string; border: string; icon: typeof AlertTriangle }> = {
  high: { label: "High Impact", badge: "bg-red-500/10 text-red-600", border: "border-red-200", icon: AlertTriangle },
  medium: {
    label: "Medium Impact",
    badge: "bg-amber-500/10 text-amber-600",
    border: "border-amber-200",
    icon: AlertCircle,
  },
  low: { label: "Low Impact", badge: "bg-(--color-blue)/10 text-(--color-blue)", border: "border-(--color-line)", icon: Info },
};

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

function CostDriverCard({ driver }: { driver: CostDriver }) {
  const meta = impactMeta[driver.impact];
  const Icon = meta.icon;
  return (
    <div className={`rounded-2xl border ${meta.border} bg-(--color-surface) p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className="shrink-0" />
          <span className="text-[14.5px] font-bold text-(--color-ink)">{driver.title}</span>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] ${meta.badge}`}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{driver.description}</p>
    </div>
  );
}

export default function MvpResultsContent({ result }: MvpResultsContentProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-(--color-line) bg-white text-left shadow-[0_30px_70px_-40px_rgba(11,28,77,0.35)]">
      {/* summary header */}
      <div className="flex flex-col gap-6 border-b border-(--color-line) p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-blue)/10 px-3 py-1 text-[12px] font-bold text-(--color-blue)">
            <Calculator size={14} /> MVP Cost &amp; Timeline Report
          </span>
          <h3 className="mt-3 text-[19px] font-bold text-(--color-ink)">
            {formatUsd(result.costMin)}–{formatUsd(result.costMax)}
          </h3>
          <p className="mt-1 max-w-md text-[13.5px] text-(--color-ink-soft)">
            Estimated range — final cost depends on detailed project scope. This is not an exact quote.
          </p>
        </div>

        <ComplexityMeter complexity={result.complexity} totalPoints={result.totalPoints} maxPoints={result.maxPoints} />
      </div>

      {/* stats row */}
      <div className="grid grid-cols-2 gap-px border-b border-(--color-line) bg-(--color-line) sm:grid-cols-4">
        {[
          { label: "Estimated Cost", value: `${formatUsd(result.costMin)}–${formatUsd(result.costMax)}` },
          { label: "Estimated Timeline", value: `${result.timelineMinWeeks}–${result.timelineMaxWeeks} wks` },
          { label: "Complexity", value: result.complexity },
          { label: "Scope Points", value: `${result.totalPoints}/${result.maxPoints}` },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 text-center">
            <p className="text-[18px] font-extrabold leading-tight text-(--color-ink)">{stat.value}</p>
            <p className="mt-1 text-[12px] font-medium text-(--color-ink-soft)">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* effort / feature breakdown */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          <Layers size={15} />
          How This Estimate Was Calculated
        </h4>
        <div className="mt-4 space-y-3">
          {result.effortFactors.map((factor) => (
            <div key={factor.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-(--color-ink)">{factor.label}</span>
                <span className="text-[13px] text-(--color-ink-soft)">— {factor.value}</span>
              </div>
              <span className="text-[13px] font-bold text-(--color-ink)">
                {factor.points}/{factor.maxPoints} pts
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-(--color-ink-soft)">
          Each answer adds points based on how much effort it typically takes to build. Your cost and timeline
          range is calculated directly from the total, using a transparent, disclosed formula — never a random
          or invented number.
        </p>
      </div>

      {/* cost drivers */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Major Cost Drivers
        </h4>
        {result.costDrivers.length === 0 ? (
          <p className="mt-4 flex items-start gap-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            Your scope is minimal — no major cost drivers were flagged based on your answers.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {result.costDrivers.map((driver) => (
              <CostDriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        )}
      </div>

      {/* development considerations */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Development Considerations
        </h4>
        <ul className="mt-4 space-y-3">
          {result.considerations.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-(--color-ink-soft)">
              <Info size={16} className="mt-0.5 shrink-0 text-(--color-blue)" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* recommended priorities */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          <Clock size={15} />
          Recommended MVP Priorities
        </h4>
        <ul className="mt-4 space-y-3">
          {result.priorities.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-(--color-ink-soft)">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-blue)/10 text-[11px] font-bold text-(--color-blue)">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* increase / decrease factors */}
      <div className="grid grid-cols-1 border-b border-(--color-line) sm:grid-cols-2">
        <div className="border-b border-(--color-line) p-6 sm:border-b-0 sm:border-r lg:p-8">
          <h4 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-red-600">
            <TrendingUp size={15} />
            What Could Increase the Estimate
          </h4>
          <ul className="mt-4 space-y-2.5">
            {result.increaseFactors.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 lg:p-8">
          <h4 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-600">
            <TrendingDown size={15} />
            What Could Decrease the Estimate
          </h4>
          <ul className="mt-4 space-y-2.5">
            {result.decreaseFactors.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
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
            Want a Detailed Quote for Your MVP?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">
            This is a self-assessed estimate. Our team can review your actual project scope and give you a
            detailed, accurate quote and build plan for your SaaS MVP.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Get a Detailed Quote
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
