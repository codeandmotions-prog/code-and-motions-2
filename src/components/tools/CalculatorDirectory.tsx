"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import CalcIcon from "@/components/calculators/CalcIcon";
import { calculators } from "@/data/calculators/registry";
import { CATEGORY_INFO, type CalcCategoryId, type CalcMeta } from "@/data/calculators/types";

const CATEGORY_ORDER: CalcCategoryId[] = ["financial", "health", "math", "other"];

function matches(c: CalcMeta, q: string): boolean {
  if (!q) return true;
  const hay = [c.name, c.short, c.keywords.primary, ...c.keywords.secondary, ...c.keywords.tags, c.group].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

function CalcCard({ calc }: { calc: CalcMeta }) {
  return (
    <li>
      <Link
        href={`/tools/${calc.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-(--color-line) bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-(--color-blue)/30 hover:shadow-[0_24px_50px_-35px_rgba(11,28,77,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-blue)/10 text-(--color-blue) transition-colors group-hover:bg-(--color-blue) group-hover:text-white">
          <CalcIcon name={calc.icon} size={20} />
        </span>
        <span className="mt-4 text-[16px] font-bold leading-snug text-(--color-ink)">{calc.name}</span>
        <span className="mt-2 flex-1 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{calc.short}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-blue)">
          Open calculator
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

export default function CalculatorDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CalcCategoryId | "all">("all");

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: calculators.length };
    for (const c of calculators) m[c.category] = (m[c.category] ?? 0) + 1;
    return m;
  }, []);

  const visible = useMemo(
    () => calculators.filter((c) => (category === "all" || c.category === category) && matches(c, query.trim())),
    [category, query],
  );
  const filtering = query.trim() !== "" || category !== "all";

  return (
    <section id="calculators" className="bg-(--color-surface) py-16 lg:py-24" aria-labelledby="calculators-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">Free online calculators</span>
          <h2 id="calculators-heading" className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            {calculators.length} Free Calculators for Money, Health, Maths &amp; Everyday Life
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            Each one shows its working, explains the formula and tells you what it assumes. No sign-up, and nothing you type leaves your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="calc-search" className="sr-only">
              Search calculators
            </label>
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-ink-soft)" aria-hidden="true" />
              <input
                id="calc-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators, e.g. mortgage, BMI, triangle…"
                autoComplete="off"
                className="h-13 w-full rounded-full border border-(--color-line) bg-white pl-11 pr-11 text-[15px] text-(--color-ink) shadow-[0_12px_30px_-24px_rgba(11,28,77,0.4)] placeholder:text-(--color-ink-soft)/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-(--color-ink-soft) hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          <div role="group" aria-label="Filter by category" className="mt-5 flex flex-wrap justify-center gap-2">
            {(["all", ...CATEGORY_ORDER] as const).map((id) => {
              const active = category === id;
              const label = id === "all" ? "All" : CATEGORY_INFO[id].title.replace(" Calculators", "");
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) ${
                    active
                      ? "border-(--color-blue) bg-(--color-blue) text-white"
                      : "border-(--color-line) bg-white text-(--color-ink) hover:border-(--color-blue)/50"
                  }`}
                >
                  {label}
                  <span className={`rounded-full px-2 py-0.5 text-[11.5px] ${active ? "bg-white/20" : "bg-(--color-surface)"}`}>{counts[id]}</span>
                </button>
              );
            })}
          </div>

          <p role="status" aria-live="polite" className="mt-4 text-center text-[13.5px] text-(--color-ink-soft)">
            {filtering ? `${visible.length} calculator${visible.length === 1 ? "" : "s"} found` : `Showing all ${calculators.length} calculators`}
          </p>
        </div>

        {visible.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-(--color-line) bg-white px-6 py-12 text-center">
            <p className="text-[16px] font-semibold text-(--color-ink)">No calculator matches “{query}”.</p>
            <p className="mt-2 text-[14px] text-(--color-ink-soft)">Try a shorter word such as “loan”, “area” or “percent”, or choose another category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-(--color-blue) px-6 text-[14px] font-semibold text-white hover:bg-(--color-navy-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
            >
              Show all calculators
            </button>
          </div>
        ) : (
          CATEGORY_ORDER.map((id) => {
            const inCat = visible.filter((c) => c.category === id);
            if (inCat.length === 0) return null;
            const info = CATEGORY_INFO[id];
            const groups = Array.from(new Set(inCat.map((c) => c.group)));
            const showGroups = groups.length > 1;
            return (
              <div key={id} id={info.anchor} className="mt-14 scroll-mt-24 first-of-type:mt-12">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">{info.title}</h3>
                  <p className="text-[14px] text-(--color-ink-soft)">{info.blurb}</p>
                </div>
                {groups.map((g) => (
                  <div key={g} className="mt-6">
                    {showGroups && <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-(--color-blue)">{g}</h4>}
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {inCat
                        .filter((c) => c.group === g)
                        .map((c) => (
                          <CalcCard key={c.slug} calc={c} />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
