import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/data/serviceCategories";

type RelatedServicesProps = {
  relatedSlugs: string[];
};

export default function RelatedServices({ relatedSlugs }: RelatedServicesProps) {
  const related = relatedSlugs
    .map((slug) => serviceCategories.find((category) => category.id === slug))
    .filter((category): category is (typeof serviceCategories)[number] => Boolean(category));

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-(--color-line) bg-(--color-surface) py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-ink-soft)">
          Related Services
        </span>
        <div className="mt-5 flex flex-wrap gap-3">
          {related.map((category) => (
            <Link
              key={category.id}
              href={`/services/${category.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-(--color-line) bg-white px-5 py-3 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
            >
              {category.title}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
