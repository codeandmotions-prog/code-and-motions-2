import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import CalcIcon from "@/components/calculators/CalcIcon";
import { CATEGORY_INFO, type CalcMeta } from "@/data/calculators/types";

/** Server-rendered hero for a single calculator page. */
export default function CalcPageHero({ calc }: { calc: CalcMeta }) {
  const cat = CATEGORY_INFO[calc.category];
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-14 pt-14 lg:pb-20 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-20 top-6 h-64 w-64 opacity-20 lg:h-80 lg:w-80 lg:opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/50">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/tools" className="transition-colors hover:text-white">Free Tools</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/tools/calculators" className="transition-colors hover:text-white">All Calculators</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" className="text-white/80">{calc.name}</span>
        </nav>

        <div className="mt-7 flex items-start gap-4 sm:gap-5">
          <span className="mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-(--color-cyan) sm:flex">
            <CalcIcon name={calc.icon} size={26} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h1 className="max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[52px]">
              {calc.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]">{calc.short}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
              <li>
                <Link
                  href={`/tools/calculators#${cat.anchor}`}
                  className="inline-flex min-h-8 items-center rounded-full border border-(--color-cyan)/40 px-3 py-1 text-[12px] font-semibold text-(--color-cyan) transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-cyan)"
                >
                  {cat.title}
                </Link>
              </li>
              {calc.keywords.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/70">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
