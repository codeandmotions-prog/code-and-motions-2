import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { ServiceCategory } from "@/data/serviceCategories";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export default function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  const Icon = category.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-(--color-line) bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-(--color-blue)/30 hover:shadow-[0_30px_60px_-35px_rgba(11,28,77,0.35)]">
      <div
        className="relative flex h-[132px] items-center justify-center overflow-hidden"
        style={{ background: category.gradient }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 280 160"
          className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 opacity-[0.18] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <rect x="0" y="90" width="180" height="14" rx="7" transform="rotate(-28 0 90)" fill="#fff" />
          <rect x="20" y="60" width="140" height="14" rx="7" transform="rotate(-28 20 60)" fill="#fff" />
          <rect x="40" y="30" width="90" height="12" rx="6" transform="rotate(-28 40 30)" fill="#fff" />
        </svg>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon size={26} className="text-white" strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[20px] font-bold text-(--color-ink)">{category.title}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          {category.description}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {category.subServices.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13.5px] text-(--color-ink-soft)">
              <Check
                size={14}
                strokeWidth={2.25}
                className="mt-[3px] shrink-0 text-(--color-blue)"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-blue)"
          >
            Get a quote
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
