"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight, HeartPulse, Landmark, Search, Shapes, Sigma, X } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import CalcIcon from "@/components/calculators/CalcIcon";
import { bySlug, calculators } from "@/data/calculators/registry";
import { CATEGORY_INFO, type CalcCategoryId, type CalcMeta } from "@/data/calculators/types";

const CATEGORY_ORDER: CalcCategoryId[] = ["financial", "health", "math", "other"];

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

const POPULAR_SLUGS = [
  "mortgage-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "loan-calculator",
  "age-calculator",
  "unit-conversion-calculator",
];
const popular = POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter((c): c is CalcMeta => Boolean(c));

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };

function matches(c: CalcMeta, q: string): boolean {
  if (!q) return true;
  const hay = [c.name, c.short, c.keywords.primary, ...c.keywords.secondary, ...c.keywords.tags, c.group].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

function PopularLinks({ label, tone }: { label: string; tone: "dark" | "light" }) {
  if (popular.length === 0) return null;
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-[13px] font-semibold ${dark ? "text-white/60" : "text-(--color-ink-soft)"}`}>{label}:</span>
      {popular.map((c) => (
        <Link
          key={c.slug}
          href={`/tools/${c.slug}`}
          className={`inline-flex min-h-11 items-center rounded-full border px-3.5 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-cyan) ${
            dark
              ? "border-white/20 text-white hover:border-white hover:bg-white/10"
              : "border-(--color-line) bg-white text-(--color-ink) hover:border-(--color-blue) hover:text-(--color-blue)"
          }`}
        >
          {c.name.replace(/ Calculator$/, "")}
        </Link>
      ))}
    </div>
  );
}

/** One calculator as an easy-to-scan link row. */
function CalcRow({ calc }: { calc: CalcMeta }) {
  return (
    <li>
      <Link
        href={`/tools/${calc.slug}`}
        className="group flex h-full min-h-[64px] items-start gap-3 rounded-xl border border-(--color-line) bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-blue)/40 hover:shadow-[0_18px_36px_-28px_rgba(11,28,77,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-blue)/10 text-(--color-blue) transition-colors group-hover:bg-(--color-blue) group-hover:text-white">
          <CalcIcon name={calc.icon} size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-blue)">
            {calc.name}
          </span>
          <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-(--color-ink-soft)">{calc.short}</span>
        </span>
        <ArrowRight size={15} className="mt-1 shrink-0 text-(--color-ink-soft) transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function CalculatorDirectory() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const q = query.trim();
  const filtering = q !== "";

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of calculators) m[c.category] = (m[c.category] ?? 0) + 1;
    return m;
  }, []);

  const visible = useMemo(() => calculators.filter((c) => matches(c, q)), [q]);

  return (
    <>
      <MotionConfig reducedMotion="user">
        <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-16 lg:pb-20 lg:pt-20">
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
          <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />

          <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/50">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link href="/tools" className="transition-colors hover:text-white">Free Tools</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/80" aria-current="page">All Calculators</span>
            </motion.nav>

            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-3xl text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[50px] lg:text-[58px]"
            >
              Free Online Calculators
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]">
              {calculators.length} calculators for money, health, maths and everyday questions. Each one shows its working, and nothing you type leaves your browser.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 max-w-2xl">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  // One clear match: go straight to it.
                  if (filtering && visible.length === 1) router.push(`/tools/${visible[0].slug}`);
                }}
              >
                <label htmlFor="calc-search" className="sr-only">
                  Search calculators
                </label>
                <div className="relative">
                  <Search size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-(--color-ink-soft)" aria-hidden="true" />
                  <input
                    id="calc-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search calculators…"
                    autoComplete="off"
                    enterKeyHint="search"
                    className="h-14 w-full rounded-full border border-transparent bg-white pl-13 pr-12 text-[16px] text-(--color-ink) shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] placeholder:text-(--color-ink-soft)/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-cyan)"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-(--color-ink-soft) hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
                    >
                      <X size={17} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </MotionConfig>

      {!filtering && (
        <>
          <nav aria-label="Calculator categories" className="sticky top-20 z-30 border-b border-(--color-line) bg-white/90 backdrop-blur lg:top-24">
            <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 no-scrollbar lg:px-10">
              {CATEGORY_ORDER.map((id) => (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${CATEGORY_INFO[id].anchor}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line) bg-white px-4 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
                  >
                    {CATEGORY_LABEL[id]}
                    <span className="rounded-full bg-(--color-surface) px-2 py-0.5 text-[11.5px] font-bold text-(--color-ink-soft)">{counts[id]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      <section id="all-calculators" className="scroll-mt-24 bg-(--color-surface) py-16 lg:py-24" aria-label="All calculators by category">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p role="status" aria-live="polite" className="text-[14px] text-(--color-ink-soft)">
            {filtering ? (
              <>
                {visible.length} calculator{visible.length === 1 ? "" : "s"} found for “{q}”
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="ml-3 inline-flex min-h-11 items-center font-semibold text-(--color-blue) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-(--color-blue)"
                >
                  Clear search
                </button>
              </>
            ) : (
              `All ${calculators.length} calculators, grouped by category`
            )}
          </p>

          {!filtering ? (
            <div className="mt-10 grid items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORY_ORDER.map((id) => {
                const info = CATEGORY_INFO[id];
                const Icon = CATEGORY_ICON[id];
                const items = calculators.filter((c) => c.category === id);
                const groups = Array.from(new Set(items.map((c) => c.group)));
                return (
                  <div key={id} id={info.anchor} className="min-w-0 scroll-mt-40">
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(155deg,#1547E0_0%,#0B1C4D_100%)] text-white shadow-[0_18px_36px_-20px_rgba(21,71,224,0.7)]">
                      <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-[22px] font-extrabold leading-snug tracking-[-0.01em] text-(--color-ink)">
                      {info.title}
                      <span className="ml-2 align-middle text-[14px] font-semibold text-(--color-ink-soft)">{items.length}</span>
                    </h2>
                    <p className="mt-1 text-[13.5px] leading-snug text-(--color-ink-soft)">{info.blurb}</p>
                    {groups.map((g) => (
                      <div key={g} className="mt-4">
                        {groups.length > 1 && (
                          <h3 className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-(--color-ink-soft)">{g}</h3>
                        )}
                        <ul>
                          {items
                            .filter((c) => c.group === g)
                            .map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/tools/${c.slug}`}
                                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-(--color-blue) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-(--color-blue)"
                                >
                                  {c.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : visible.length === 0 ? (
            <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-dashed border-(--color-line) bg-white px-6 py-12 text-center">
              <p className="text-[16px] font-semibold text-(--color-ink)">No calculator matches “{q}”.</p>
              <p className="mt-2 text-[14px] text-(--color-ink-soft)">Try a shorter word such as “loan”, “area” or “percent”.</p>
              <div className="mt-5 flex justify-center">
                <PopularLinks label="Or try" tone="light" />
              </div>
              <button
                type="button"
                onClick={() => setQuery("")}
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
              const Icon = CATEGORY_ICON[id];
              const groups = Array.from(new Set(inCat.map((c) => c.group)));
              return (
                <div key={id} id={info.anchor} className="mt-12 scroll-mt-40 first-of-type:mt-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(155deg,#1547E0_0%,#0B1C4D_100%)] text-white">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h2 className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
                      {info.title}
                      <span className="ml-3 align-middle text-[14px] font-semibold text-(--color-ink-soft)">{inCat.length}</span>
                    </h2>
                  </div>
                  <p className="mt-2 max-w-3xl text-[14.5px] text-(--color-ink-soft)">{info.blurb}</p>
                  {groups.map((g) => (
                    <div key={g} className="mt-6">
                      {groups.length > 1 && (
                        <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-(--color-blue)">{g}</h3>
                      )}
                      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {inCat
                          .filter((c) => c.group === g)
                          .map((c) => (
                            <CalcRow key={c.slug} calc={c} />
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
    </>
  );
}
