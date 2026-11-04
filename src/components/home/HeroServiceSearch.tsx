"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import type { ServiceSearchItem } from "@/data/serviceSearchIndex";

const MAX_RESULTS = 8;

/** Lowercase, drop punctuation and arrows, and treat "&" as "and". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

type Indexed = {
  item: ServiceSearchItem;
  title: string;
  haystack: string;
};

/**
 * Homepage hero service search. Receives the site's real service pages as props
 * (built on the server from the same data that generates those pages), so every
 * result is a page that exists. When nothing matches, it offers the contact page.
 */
export default function HeroServiceSearch({ items }: { items: ServiceSearchItem[] }) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-results`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const indexed = useMemo<Indexed[]>(
    () =>
      items.map((item) => ({
        item,
        title: normalize(item.title),
        haystack: normalize(`${item.title} ${item.category} ${item.keywords}`),
      })),
    [items],
  );

  const normalizedQuery = normalize(query);
  const searching = normalizedQuery.length >= 2;

  const matches = useMemo(() => {
    if (!searching) return [];
    const tokens = normalizedQuery.split(" ").filter(Boolean);
    return indexed
      .map((entry, order) => {
        if (!tokens.every((token) => entry.haystack.includes(token))) return null;
        let rank = 3;
        if (entry.title.startsWith(normalizedQuery)) rank = 0;
        else if (entry.title.includes(normalizedQuery)) rank = 1;
        else if (tokens.every((token) => entry.title.includes(token))) rank = 2;
        return { item: entry.item, rank, order };
      })
      .filter((match): match is { item: ServiceSearchItem; rank: number; order: number } => match !== null)
      .sort((a, b) => a.rank - b.rank || a.order - b.order)
      .map((match) => match.item);
  }, [indexed, normalizedQuery, searching]);

  const shown = matches.slice(0, MAX_RESULTS);
  const hiddenCount = matches.length - shown.length;
  const showResults = open && shown.length > 0;
  const showNoMatch = open && searching && matches.length === 0;

  // Close the panel on an outside click or Escape.
  useEffect(() => {
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  function handleChange(value: string) {
    setQuery(value.slice(0, 80));
    setActive(-1);
    setOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(true);
    const target = active >= 0 ? shown[active] : shown[0];
    if (target) router.push(target.href);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (event.key === "ArrowDown" && shown.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActive((current) => (current + 1) % shown.length);
    } else if (event.key === "ArrowUp" && shown.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActive((current) => (current <= 0 ? shown.length - 1 : current - 1));
    }
  }

  const status = showResults
    ? shown.length === 1
      ? "1 matching service"
      : `${matches.length} matching services`
    : showNoMatch
      ? "No matching service found"
      : "";

  return (
    <div ref={rootRef} className="relative z-20 mx-auto w-full max-w-3xl text-left">
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor={`${uid}-input`} className="sr-only">
          Search our services
        </label>
        <div className="flex items-center gap-1 rounded-full border border-(--color-cyan)/40 bg-white p-1.5 shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_32px_-4px_rgba(34,211,238,0.35),0_24px_50px_-28px_rgba(0,0,0,0.7)] transition-shadow duration-300 focus-within:border-(--color-cyan)/70 focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_0_40px_-2px_rgba(34,211,238,0.5),0_24px_50px_-28px_rgba(0,0,0,0.7)] focus-within:ring-2 focus-within:ring-(--color-cyan)/50 sm:p-2">
          <input
            id={`${uid}-input`}
            type="text"
            role="combobox"
            aria-expanded={showResults}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showResults && active >= 0 ? `${uid}-opt-${active}` : undefined}
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="What service are you looking for today?"
            // The global :focus-visible outline is unlayered and would draw a square box
            // inside the rounded bar; the wrapper's focus-within ring shows focus instead.
            style={{ outline: "none" }}
            className="h-12 min-w-0 flex-1 text-ellipsis bg-transparent pl-4 pr-1 text-[13px] min-[400px]:text-[14.5px] text-(--color-ink) placeholder:text-(--color-ink-soft)/70 focus:outline-none sm:h-14 sm:pl-6 sm:text-[17px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                handleChange("");
                setOpen(false);
              }}
              aria-label="Clear search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
            >
              <X size={17} aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            aria-label="Search services"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-ink) text-white transition-colors duration-300 hover:bg-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:h-12 sm:w-12"
          >
            <Search size={19} aria-hidden="true" />
          </button>
        </div>
      </form>

      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-3xl border border-(--color-line) bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.65)]">
          <ul id={listId} role="listbox" aria-label="Matching services" className="max-h-[min(22rem,60vh)] overflow-y-auto overscroll-contain p-2">
            {shown.map((item, index) => (
              <li key={item.href} id={`${uid}-opt-${index}`} role="option" aria-selected={index === active}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setActive(index)}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                    index === active ? "bg-(--color-surface)" : "hover:bg-(--color-surface)"
                  } focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--color-blue)`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-snug text-(--color-ink)">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-(--color-ink-soft)">
                      {item.category}
                    </span>
                  </span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-(--color-ink-soft) transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-(--color-blue)"
                  />
                </Link>
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <p className="border-t border-(--color-line) px-5 py-2.5 text-center text-[12.5px] text-(--color-ink-soft)">
              Showing the top {shown.length} of {matches.length} — type a little more to narrow it down.
            </p>
          )}
        </div>
      )}

      {showNoMatch && (
        <div
          role="dialog"
          aria-labelledby={`${uid}-nomatch-title`}
          className="absolute left-0 right-0 top-full z-30 mt-3 rounded-3xl border border-(--color-line) bg-white px-6 py-7 text-center shadow-[0_30px_60px_-24px_rgba(0,0,0,0.65)] sm:px-10 sm:py-9"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-(--color-blue)"
          >
            <X size={17} aria-hidden="true" />
          </button>
          <h2
            id={`${uid}-nomatch-title`}
            className="mx-auto max-w-md px-5 text-[19px] font-bold leading-snug text-(--color-ink) sm:text-[22px]"
          >
            Didn&apos;t find the service you&apos;re looking for?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-(--color-ink-soft) sm:text-[15.5px]">
            Contact our team and tell us what you need. We&apos;ll be happy to discuss your project.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:w-auto"
          >
            Contact Our Team
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
