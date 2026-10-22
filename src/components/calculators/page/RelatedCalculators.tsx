import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CalcIcon from "@/components/calculators/CalcIcon";
import type { CalcMeta } from "@/data/calculators/types";

export default function RelatedCalculators({ items }: { items: CalcMeta[] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-(--color-surface) py-16 lg:py-20" aria-labelledby="related-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-heading" className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
            Related calculators
          </h2>
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-(--color-blue) hover:underline">
            Browse all calculators <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => {
            return (
              <li key={c.slug}>
                <Link
                  href={`/tools/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-(--color-line) bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-(--color-blue)/30 hover:shadow-[0_24px_50px_-35px_rgba(11,28,77,0.4)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-blue)/10 text-(--color-blue)">
                    <CalcIcon name={c.icon} size={19} />
                  </span>
                  <span className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{c.name}</span>
                  <span className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-(--color-ink-soft)">{c.short}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
