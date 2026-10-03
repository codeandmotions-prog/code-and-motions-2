import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AiSubService } from "@/data/aiDevelopment";

type AiSubServiceCardProps = {
  service: AiSubService;
};

export default function AiSubServiceCard({ service }: AiSubServiceCardProps) {
  const Icon = service.icon;
  const href = `/services/ai-development/${service.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-(--color-line) bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-(--color-blue)/30 hover:shadow-[0_30px_60px_-35px_rgba(11,28,77,0.35)]">
      <div
        className="relative flex h-[112px] items-center justify-center overflow-hidden"
        style={{ background: service.gradient }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 280 160"
          className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 opacity-[0.18] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <rect x="0" y="90" width="180" height="14" rx="7" transform="rotate(-28 0 90)" fill="#fff" />
          <rect x="20" y="60" width="140" height="14" rx="7" transform="rotate(-28 20 60)" fill="#fff" />
          <rect x="40" y="30" width="90" height="12" rx="6" transform="rotate(-28 40 30)" fill="#fff" />
        </svg>

        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} className="text-white" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[18px] font-bold text-(--color-ink)">
          <Link href={href} className="transition-colors hover:text-(--color-blue)">
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          {service.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-(--color-surface) px-3 py-1.5 text-[12px] font-medium text-(--color-ink-soft)"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-5">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-blue)"
          >
            Explore {service.name}
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
