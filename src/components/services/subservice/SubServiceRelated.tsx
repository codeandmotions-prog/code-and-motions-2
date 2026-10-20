import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SubServiceLink } from "@/data/subServiceTypes";

/** Server-rendered "related services" block of descriptive internal links. */
export default function SubServiceRelated({ links }: { links: SubServiceLink[] }) {
  if (links.length === 0) return null;

  return (
    <section className="border-t border-(--color-line) bg-(--color-surface) py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
          Related services
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full items-start gap-3 rounded-2xl border border-(--color-line) bg-white p-5 transition-colors hover:border-(--color-blue)/40"
              >
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="mt-1 shrink-0 text-(--color-blue) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="text-[14px] leading-relaxed text-(--color-ink-soft)">
                  <span className="font-semibold text-(--color-ink)">{link.label}.</span>{" "}
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
