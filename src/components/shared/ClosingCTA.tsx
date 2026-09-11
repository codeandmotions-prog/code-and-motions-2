import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ClosingCTAProps = {
  headline: string;
  subtext: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export default function ClosingCTA({
  headline,
  subtext,
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
}: ClosingCTAProps) {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) py-20 lg:py-24">
      <svg
        aria-hidden="true"
        viewBox="0 0 900 300"
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-25 lg:opacity-40"
      >
        <rect x="420" y="180" width="380" height="18" rx="9" transform="rotate(-28 420 180)" fill="#1547E0" />
        <rect x="450" y="130" width="300" height="18" rx="9" transform="rotate(-28 450 130)" fill="#2F6BFF" />
        <rect x="480" y="80" width="200" height="16" rx="8" transform="rotate(-28 480 80)" fill="#22D3EE" />
      </svg>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h2 className="text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[40px]">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
          {subtext}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            {primaryLabel}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="mailto:codeandmotions@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
          >
            codeandmotions@gmail.com
          </Link>
        </div>
      </div>
    </section>
  );
}
