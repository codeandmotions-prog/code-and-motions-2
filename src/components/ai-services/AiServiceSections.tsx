import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, UserCheck } from "lucide-react";
import type { AiServiceContent } from "@/data/aiServices";
import Reveal from "./Reveal";

function Eyebrow({ children, tone = "blue" }: { children: string; tone?: "blue" | "cyan" }) {
  return (
    <span
      className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${
        tone === "cyan" ? "text-(--color-cyan-soft)" : "text-(--color-blue)"
      }`}
    >
      {children}
    </span>
  );
}

const h2 = "mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]";

/* ---------- How it works ---------- */
export function HowItWorksSection({ service }: { service: AiServiceContent }) {
  const { howItWorks } = service;
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={h2}>{howItWorks.heading}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">{howItWorks.intro}</p>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-6 transition-colors duration-300 hover:border-(--color-blue)/40">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-blue) text-[14px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold leading-snug text-(--color-ink)">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */
export function UseCasesSection({ service }: { service: AiServiceContent }) {
  const { useCases } = service;
  return (
    <section id="use-cases" className="scroll-mt-24 bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Use cases</Eyebrow>
          <h2 className={h2}>{useCases.heading}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">{useCases.intro}</p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-(--color-line) bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-32px_rgba(11,28,77,0.35)]">
                  <h3 className="text-[18px] font-bold leading-snug text-(--color-ink)">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{item.scenario}</p>
                  <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-(--color-surface) px-3.5 py-3 text-[13.5px] leading-snug text-(--color-ink)">
                    <UserCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
                    <span>
                      <span className="font-semibold">Stays with your team: </span>
                      {item.stays}
                    </span>
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Features and benefits ---------- */
export function FeaturesBenefitsSection({ service }: { service: AiServiceContent }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.45fr_1fr] lg:gap-14 lg:px-10">
        <div>
          <Eyebrow>Key features</Eyebrow>
          <h2 className={h2}>What you get</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-blue)/10 text-(--color-blue)">
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[16px] font-bold text-(--color-ink)">{feature.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="self-start rounded-3xl bg-(--color-navy-deep) p-7 text-white sm:p-9 lg:sticky lg:top-32">
          <Eyebrow tone="cyan">Business benefits</Eyebrow>
          <h2 className="mt-4 text-[24px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[28px]">
            What changes for your business
          </h2>
          <ul className="mt-7 space-y-5">
            {service.benefits.map((benefit) => (
              <li key={benefit.title} className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                <h3 className="text-[16px] font-bold text-white">{benefit.title}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-white/65">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Who should / may not need it ---------- */
export function FitSection({ service }: { service: AiServiceContent }) {
  const { whoShouldConsider, notYet } = service;
  return (
    <section id="is-it-right-for-you" className="scroll-mt-24 bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Is it the right fit?</Eyebrow>
          <h2 className={h2}>An honest view of when this makes sense, and when it does not</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-(--color-line) bg-white p-7 sm:p-9">
              <h3 className="text-[21px] font-extrabold leading-snug text-(--color-ink)">{whoShouldConsider.heading}</h3>
              <ul className="mt-6 space-y-4">
                {whoShouldConsider.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-(--color-line) bg-white p-7 sm:p-9">
              <h3 className="text-[21px] font-extrabold leading-snug text-(--color-ink)">{notYet.heading}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">{notYet.intro}</p>
              <ul className="mt-6 divide-y divide-(--color-line)">
                {notYet.items.map((item) => (
                  <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                    <h4 className="text-[16px] font-bold text-(--color-ink)">{item.title}</h4>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{item.description}</p>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-(--color-ink)">
                      <span className="font-semibold text-(--color-blue)">A simpler route: </span>
                      {item.alternative}
                      {item.alternativeLink && (
                        <>
                          {" "}
                          <Link
                            href={item.alternativeLink.href}
                            className="font-semibold text-(--color-blue) underline underline-offset-4 hover:text-(--color-navy)"
                          >
                            {item.alternativeLink.label}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Challenges ---------- */
export function ChallengesSection({ service }: { service: AiServiceContent }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Business challenges</Eyebrow>
          <h2 className={h2}>Problems this service is built to solve</h2>
        </div>
        <ul className="mt-12 divide-y divide-(--color-line) border-y border-(--color-line)">
          {service.challenges.map((item) => (
            <li key={item.challenge} className="grid gap-2 py-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
              <h3 className="text-[17px] font-bold leading-snug text-(--color-ink)">{item.challenge}</h3>
              <p className="text-[15px] leading-relaxed text-(--color-ink-soft)">{item.approach}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Implementation considerations and limitations ---------- */
export function ConsiderationsSection({ service }: { service: AiServiceContent }) {
  return (
    <section id="considerations" className="scroll-mt-24 bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Before you start</Eyebrow>
          <h2 className={h2}>Implementation considerations and limitations</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
            Good results come from planning for the awkward parts early. These are the points we raise with every client.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {service.considerations.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 2) * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-(--color-line) bg-white p-6">
                  <h3 className="flex items-start gap-3 text-[17px] font-bold leading-snug text-(--color-ink)">
                    <CircleAlert size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
                    {item.title}
                  </h3>
                  <p className="mt-2.5 pl-[31px] text-[14.5px] leading-relaxed text-(--color-ink-soft)">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-3xl bg-(--color-navy-deep) p-7 text-white sm:p-9">
          <h3 className="text-[20px] font-extrabold">Honest limits</h3>
          <ul className="mt-5 space-y-3.5">
            {service.limitations.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-cyan)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Related links ---------- */
export function RelatedLinksSection({ service }: { service: AiServiceContent }) {
  return (
    <section className="border-t border-(--color-line) bg-(--color-surface) py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Eyebrow>Related services</Eyebrow>
        <h2 className="mt-4 text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
          Where to go next
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.related.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-2xl border border-(--color-line) bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-(--color-blue)/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
              >
                <span className="flex items-start justify-between gap-3 text-[16px] font-bold leading-snug text-(--color-ink)">
                  {link.label}
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-(--color-blue) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="mt-2 text-[14px] leading-relaxed text-(--color-ink-soft)">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[14.5px] text-(--color-ink-soft)">
          Looking at the wider picture?{" "}
          <Link
            href="/services/ai-development"
            className="inline-flex items-center gap-1 font-semibold text-(--color-blue) underline-offset-4 hover:underline"
          >
            See all AI development services
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
