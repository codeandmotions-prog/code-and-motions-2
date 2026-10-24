import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getApkUrl, type AppEntry } from "@/data/apps";
import AppIcon from "./AppIcon";

type AppCardProps = {
  app: AppEntry;
};

export default function AppCard({ app }: AppCardProps) {
  const hasApk = getApkUrl(app) !== null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-(--color-line) bg-white transition-all duration-300 focus-within:ring-2 focus-within:ring-(--color-blue) hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(15,20,40,0.35)]">
      <div
        className="relative flex h-[180px] items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${app.accentColor} 0%, #0B1C4D 100%)`,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 280 180"
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-[0.16] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <rect x="0" y="90" width="180" height="14" rx="7" transform="rotate(-28 0 90)" fill="#fff" />
          <rect x="20" y="60" width="140" height="14" rx="7" transform="rotate(-28 20 60)" fill="#fff" />
          <rect x="40" y="30" width="90" height="12" rx="6" transform="rotate(-28 40 30)" fill="#fff" />
        </svg>
        <AppIcon
          app={app}
          className="relative h-20 w-20 rounded-3xl shadow-[0_20px_40px_-16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
        />
        {!hasApk && (
          <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white ring-1 ring-white/25">
            APK coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="inline-flex w-fit items-center rounded-full bg-(--color-surface) px-3 py-1 text-[12px] font-semibold text-(--color-ink-soft)">
          {app.category}
        </span>
        <h3 className="mt-4 text-[22px] font-bold text-(--color-ink)">{app.name}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-(--color-ink-soft)">
          {app.shortDescription}
        </p>

        <div className="mt-6 pt-1">
          <Link
            href={`/apps/${app.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink) after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            Explore App
            <span className="sr-only"> {app.name}</span>
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
