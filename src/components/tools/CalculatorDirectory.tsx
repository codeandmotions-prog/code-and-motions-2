"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, HeartPulse, Landmark, LayoutGrid, List, Search, Shapes, Sigma, X } from "lucide-react";
import CalcIcon from "@/components/calculators/CalcIcon";
import { bySlug, calculators } from "@/data/calculators/registry";
import { CATEGORY_INFO, type CalcCategoryId, type CalcMeta } from "@/data/calculators/types";

const CATEGORY_ORDER: CalcCategoryId[] = ["financial", "health", "math", "other"];

/** Short labels for the category buttons. */
const CATEGORY_LABEL: Record<CalcCategoryId, string> = {
  financial: "Financial",
  health: "Fitness & Health",
  math: "Math",
  other: "Other",
};

const CATEGORY_ICON = {
  financial: Landmark,
  health: HeartPulse,
  math: Sigma,
  other: Shapes,
} as const;

/** Popular starting points, shown under the search box. Unknown slugs are skipped. */
const POPULAR_SLUGS = [
  "mortgage-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "loan-calculator",
  "age-calculator",
  "unit-conversion-calculator",
];

const popular = POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter((c): c is CalcMeta => Boolean(c));

function matches(c: CalcMeta, q: string): boolean {
  if (!q) return true;
  const hay = [c.name, c.short, c.keywords.primary, ...c.keywords.secondary, ...c.keywords.tags, c.group].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

function PopularLinks({ label = "Popular" }: { label?: string }) {
  if (popular.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-[13px] font-semibold text-(--color-ink-soft)">{label}:</span>
      {popular.map((c) => (
        <Link
          key={c.slug}
          href={`/tools/${c.slug}`}
          className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) bg-white px-3.5 text-[13.5px] font-medium text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
        >
          {c.name.replace(/ Calculator$/, "")}
        </Link>
      ))}
    </div>
  );
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

/** Compact one-line row: the fastest way to scan a long list of calculators. */
function CalcRow({ calc }: { calc: CalcMeta }) {
  return (
    <li>
      <Link
        href={`/tools/${calc.slug}`}
        className="group flex min-h-12 items-center gap-3 rounded-xl border border-(--color-line) bg-white px-3.5 py-2 text-[14.5px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/40 hover:text-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-blue)/10 text-(--color-blue)">
          <CalcIcon name={calc.icon} size={16} />
        </span>
        <span className="min-w-0 flex-1 leading-snug">{calc.name}</span>
        <ArrowRight size={15} className="shrink-0 text-(--color-ink-soft) transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function CalculatorDirectory() {
  const router = useRouter();
  const resultsRef = useRef<HTMLParagraphElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CalcCategoryId | "all">("all");
  const [view, setView] = useState<"cards" | "list">("cards");

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

  function chooseCategory(id: CalcCategoryId) {
    const next = category === id ? "all" : id;
    setCategory(next);
    // On phones the results sit below the category buttons, so bring them into view.
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  function clearAll() {
    setQuery("");
    setCategory("all");
  }

  return (
    <section id="calculators" className="scroll-mt-20 bg-(--color-surface) py-16 lg:py-24" aria-labelledby="calculators-heading">
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
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              // One clear match: go straight to it.
              if (query.trim() && visible.length === 1) router.push(`/tools/${visible[0].slug}`);
            }}
          >
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
                placeholder="Search calculators…"
                autoComplete="off"
                enterKeyHint="search"
                className="h-13 w-full rounded-full border border-(--color-line) bg-white pl-11 pr-11 text-[16px] text-(--color-ink) shadow-[0_12px_30px_-24px_rgba(11,28,77,0.4)] placeholder:text-(--color-ink-soft)/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-(--color-ink-soft) hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          {!filtering && (
            <div className="mt-4">
              <PopularLinks />
            </div>
          )}
        </div>

        <div role="group" aria-label="Browse by category" className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORY_ORDER.map((id) => {
            const active = category === id;
            const Icon = CATEGORY_ICON[id];
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => chooseCategory(id)}
                className={`group flex min-h-[88px] flex-col items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:flex-row sm:items-center sm:justify-start sm:gap-4 ${
                  active
                    ? "border-(--color-blue) bg-(--color-blue) text-white shadow-[0_20px_40px_-28px_rgba(21,71,224,0.8)]"
                    : "border-(--color-line) bg-white text-(--color-ink) hover:-translate-y-0.5 hover:border-(--color-blue)/40"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    active ? "bg-white/20 text-white" : "bg-(--color-blue)/10 text-(--color-blue)"
                  }`}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-snug">{CATEGORY_LABEL[id]}</span>
                  <span className={`block text-[12.5px] ${active ? "text-white/80" : "text-(--color-ink-soft)"}`}>
                    {counts[id]} calculators
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p ref={resultsRef} role="status" aria-live="polite" className="scroll-mt-28 text-[14px] text-(--color-ink-soft)">
            {filtering ? `${visible.length} calculator${visible.length === 1 ? "" : "s"} found` : `Showing all ${calculators.length} calculators`}
            {filtering && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-3 inline-flex min-h-11 items-center font-semibold text-(--color-blue) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-(--color-blue)"
              >
                Clear filters
              </button>
            )}
          </p>
          <div role="group" aria-label="Choose layout" className="inline-flex rounded-full border border-(--color-line) bg-white p-1">
            {(
              [
                { id: "cards", label: "Cards", Icon: LayoutGrid },
                { id: "list", label: "Compact list", Icon: List },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-blue) ${
                  view === id ? "bg-(--color-ink) text-white" : "text-(--color-ink-soft) hover:text-(--color-ink)"
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-(--color-line) bg-white px-6 py-12 text-center">
            <p className="text-[16px] font-semibold text-(--color-ink)">No calculator matches “{query}”.</p>
            <p className="mt-2 text-[14px] text-(--color-ink-soft)">Try a shorter word such as “loan”, “area” or “percent”, or choose another category.</p>
            <div className="mt-5">
              <PopularLinks label="Or try" />
            </div>
            <button
              type="button"
              onClick={clearAll}
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
            const listClass =
              view === "cards"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
            return (
              <div key={id} id={info.anchor} className="mt-14 scroll-mt-24 first-of-type:mt-10">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
                    {info.title}
                    <span className="ml-3 align-middle text-[14px] font-semibold text-(--color-ink-soft)">{inCat.length}</span>
                  </h3>
                  <p className="text-[14px] text-(--color-ink-soft)">{info.blurb}</p>
                </div>
                {groups.map((g) => (
                  <div key={g} className="mt-6">
                    {showGroups && <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-(--color-blue)">{g}</h4>}
                    <ul className={listClass}>
                      {inCat
                        .filter((c) => c.group === g)
                        .map((c) => (view === "cards" ? <CalcCard key={c.slug} calc={c} /> : <CalcRow key={c.slug} calc={c} />))}
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
