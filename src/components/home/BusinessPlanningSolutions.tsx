import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCardShell from "@/components/services/card/ServiceCardShell";
import { illustrationKeyFor } from "@/components/services/card/ServiceIllustration";
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

        <ul className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {planningSubServices.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug} className="h-full">
                <ServiceCardShell
                  name={service.name}
                  description={service.shortDescription}
                  icon={Icon}
                  illustration={illustrationKeyFor(service.slug, "software-development")}
                  href={`/services/software-development/${service.slug}`}
                  cta={{ label: "Explore Service", srSuffix: ` : ${service.name}` }}
                  overlayLink
                />
              </li>
            );
          })}

          <li className="lg:col-span-2">
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
