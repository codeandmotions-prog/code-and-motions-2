import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { planningSubServices } from "@/data/subServices/planning";

/**
 * Homepage showcase for the business planning software services.
 * Server-rendered, CSS-only hover effects (no client JS).
 */
export default function BusinessPlanningSolutions() {
  return (
    <section
      id="business-planning-solutions"
      aria-labelledby="business-planning-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#081230] py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)">
            Business planning software
          </p>
          <h2
            id="business-planning-heading"
            className="mt-4 text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px]"
          >
            Smarter Planning. Better Business Decisions.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/70">
            Discover intelligent business software solutions for demand forecasting, inventory
            optimization, supply chain management, production planning, and AI-powered
            decision-making.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {planningSubServices.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug} className="h-full">
                <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-(--color-cyan)/50 hover:bg-white/[0.07] focus-within:border-(--color-cyan)/60">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: service.gradient }}
                  >
                    <Icon size={22} className="text-white" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold leading-snug text-white">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-white/65">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/services/software-development/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-(--color-cyan-soft) after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-cyan)"
                  >
                    Explore Service
                    <span className="sr-only"> : {service.name}</span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </article>
              </li>
            );
          })}

          <li className="sm:col-span-2 lg:col-span-2">
            <div className="flex h-full flex-col items-start justify-between gap-6 rounded-2xl border border-(--color-cyan)/30 bg-gradient-to-br from-(--color-blue)/30 to-transparent p-7 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-[22px] font-bold text-white">
                  Not sure which one fits your business?
                </h3>
                <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-white/70">
                  Tell us how you plan today and we will suggest a sensible place to start.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-(--color-cyan) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Discuss Your Project
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
