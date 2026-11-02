"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { freeTools, type FreeTool } from "@/data/tools";
import { calculators } from "@/data/calculators/registry";

const UNAVAILABLE_MESSAGE = "We're working on this tool. It will be available very soon!";

/**
 * Extra words people may type for each tool, keyed by tool slug. Names and
 * descriptions on the cards stay untouched; these only widen what the search
 * recognises. All Calculators also matches every calculator it contains.
 */
const ALIASES: Record<string, string[]> = {
  "shopify-speed-app-bloat-checker": [
    "shopify speed checker",
    "speed test",
    "page speed",
    "store speed",
    "site speed",
    "app checker",
    "shopify apps",
    "performance",
  ],
  "woocommerce-to-shopify-migration-readiness": [
    "woocommerce to shopify migration checker",
    "woo commerce",
    "migrate",
    "migrating",
    "replatform",
    "platform migration",
    "readiness score",
    "migration checker",
  ],
  "saas-mvp-cost-timeline-estimator": [
    "saas mvp cost estimator",
    "mvp",
    "software cost",
    "app cost",
    "development cost",
    "build cost",
    "cost estimator",
    "timeline estimator",
    "startup",
  ],
  "all-calculators": ["calculator", "calculators", "calc", "online calculators"],
};

/** Lowercase, drop punctuation and arrows, and treat "&" as "and". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

type SearchableTool = {
  tool: FreeTool;
  haystack: string;
};

const searchable: SearchableTool[] = freeTools
  .filter((tool) => tool.href)
  .map((tool) => {
    const extra = tool.slug === "all-calculators"
      ? calculators.flatMap((calc) => [calc.name, calc.keywords.primary, ...calc.keywords.tags])
      : [];
    return {
      tool,
      haystack: normalize([tool.name, tool.slug, ...(ALIASES[tool.slug] ?? []), ...extra].join(" ")),
    };
  });

type Match = {
  tool: FreeTool;
  /** Calculators inside "All Calculators" that matched, for a short hint line. */
  includes: string[];
};

function findMatches(query: string): Match[] {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  return searchable
    .filter(({ haystack }) => tokens.every((token) => haystack.includes(token)))
    .map(({ tool }) => {
      const includes =
        tool.slug === "all-calculators"
          ? calculators
              .filter((calc) => {
                const text = normalize([calc.name, calc.keywords.primary, ...calc.keywords.tags].join(" "));
                return tokens.every((token) => text.includes(token));
              })
              .slice(0, 3)
              .map((calc) => calc.name)
          : [];
      return { tool, includes };
    });
}

export default function ToolsSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const trimmed = query.trim();
  const matches = findMatches(trimmed);
  const showNotFound = trimmed.length > 0 && matches.length === 0 && (trimmed.length >= 2 || submitted);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (matches.length === 1 && matches[0].tool.href) {
      router.push(matches[0].tool.href);
    }
  }

  function handleChange(value: string) {
    setQuery(value.slice(0, 80));
    setSubmitted(false);
  }

  return (
    <div className="w-full max-w-3xl">
      <div>
        <form role="search" onSubmit={handleSubmit}>
          <label htmlFor="tools-search" className="sr-only">
            Search tools
          </label>
          <div className="flex items-center gap-1 rounded-full border border-(--color-line) bg-white p-1.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.7)] transition-shadow duration-300 focus-within:border-(--color-cyan)/60 focus-within:shadow-[0_24px_50px_-26px_rgba(34,211,238,0.35)] focus-within:ring-2 focus-within:ring-(--color-cyan)/50 sm:p-2">
            <input
              id="tools-search"
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => handleChange(event.target.value)}
              placeholder="What tool are you looking for today?"
              aria-describedby="tools-search-status"
              // The global :focus-visible outline is unlayered and would draw a square box
              // inside the rounded bar; the wrapper's focus-within ring shows focus instead.
              style={{ outline: "none" }}
              className="h-12 min-w-0 flex-1 bg-transparent pl-4 pr-2 text-[14.5px] text-(--color-ink) placeholder:text-(--color-ink-soft)/70 focus:outline-none sm:h-14 sm:pl-6 sm:text-[17px]"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  handleChange("");
                }}
                aria-label="Clear search"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
            <button
              type="submit"
              aria-label="Search tools"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-ink) text-white transition-colors duration-300 hover:bg-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:h-12 sm:w-12"
            >
              <Search size={19} aria-hidden="true" />
            </button>
          </div>
        </form>

        <div id="tools-search-status" aria-live="polite" className="mt-4">
          {matches.length > 0 && (
            <>
              <p className="sr-only">
                {matches.length === 1 ? "1 matching tool" : `${matches.length} matching tools`}
              </p>
              <ul className="space-y-3">
                {matches.map(({ tool, includes }) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={tool.href ?? "/tools"}
                        className="group flex items-center gap-4 rounded-3xl border border-(--color-line) bg-white p-4 transition-all duration-300 hover:border-(--color-blue)/30 hover:shadow-[0_24px_50px_-35px_rgba(11,28,77,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:p-5"
                      >
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white sm:h-14 sm:w-14"
                          style={{ background: tool.gradient }}
                        >
                          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[16px] font-bold leading-snug text-(--color-ink)">
                            {tool.name}
                          </span>
                          <span className="mt-1 block text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                            {tool.description}
                          </span>
                          {includes.length > 0 && (
                            <span className="mt-1.5 block text-[12.5px] font-semibold text-(--color-blue)">
                              Includes: {includes.join(", ")}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={18}
                          aria-hidden="true"
                          className="shrink-0 text-(--color-ink-soft) transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-(--color-blue)"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {showNotFound && (
            <p
              className="rounded-3xl border border-(--color-line) bg-white px-5 py-4 text-center text-[15px] font-medium leading-relaxed text-(--color-ink-soft)"
            >
              {UNAVAILABLE_MESSAGE}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
