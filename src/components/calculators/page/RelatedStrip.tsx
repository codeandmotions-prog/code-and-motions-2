import Link from "next/link";
import type { CalcMeta } from "@/data/calculators/types";

/**
 * Compact row of links to the next most likely calculators, shown right under a tool so a visitor never has to
 * scroll to find them. Server-rendered; touch targets are at least 44 px tall.
 */
export default function RelatedStrip({ items }: { items: CalcMeta[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Related calculators" className="bg-(--color-surface) pb-8 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-(--color-line) bg-white px-4 py-3 sm:px-5">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-(--color-ink-soft)">Related</span>
          <ul className="flex flex-wrap gap-2">
            {items.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/tools/${c.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) bg-(--color-surface) px-4 text-[14px] font-semibold text-(--color-blue) transition-colors hover:border-(--color-blue)/50 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
