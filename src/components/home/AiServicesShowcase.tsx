"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { aiServiceHref, aiServices } from "@/data/aiServices";
import AiServiceArt from "@/components/ai-services/AiServiceArt";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

/**
 * Homepage showcase for the five AI services. Each card is one link to its
 * own page. Layout: 1 column on phones, 2 on tablets (last card spans both),
 * and on desktop a 3 + 2 arrangement.
 */
export default function AiServicesShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="ai-services"
        aria-labelledby="ai-services-heading"
        className="relative overflow-hidden bg-white py-20 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-blue)/30 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="max-w-3xl"
          >
            <motion.p variants={rise} className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              AI services
            </motion.p>
            <motion.h2
              variants={rise}
              id="ai-services-heading"
              className="mt-4 text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] text-(--color-ink) sm:text-[42px] lg:text-[48px]"
            >
              AI Built Around How Your Business Actually Works
            </motion.h2>
            <motion.p variants={rise} className="mt-5 text-[16.5px] leading-relaxed text-(--color-ink-soft)">
              Practical AI for support, operations and product: agents, chatbots, workflow automation, voice and
              SaaS. Each one is scoped to a real job, tested on your own data and honest about its limits.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6"
          >
            {aiServices.map((service, index) => {
              const Icon = service.icon;
              // Desktop: first three cards take 2 of 6 columns, last two take 3 of 6.
              const span = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
              // Tablet: odd one out (the fifth card) spans both columns.
              const tablet = index === aiServices.length - 1 ? "sm:col-span-2" : "";
              return (
                <motion.li key={service.slug} variants={rise} className={`${span} ${tablet}`}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-line) bg-white transition duration-300 hover:-translate-y-1.5 hover:border-(--color-blue)/45 hover:shadow-[0_30px_60px_-34px_rgba(21,71,224,0.45)] focus-within:border-(--color-blue)">
                    <div className="relative h-[190px] overflow-hidden" style={{ background: service.gradient }}>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <div className="relative h-full transition-transform duration-500 group-hover:scale-[1.03]">
                        <AiServiceArt kind={service.kind} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                          style={{ background: service.gradient }}
                        >
                          <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <h3 className="text-[20px] font-extrabold leading-snug tracking-[-0.01em] text-(--color-ink)">
                          {service.name}
                        </h3>
                      </div>
                      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-(--color-ink-soft)">
                        {service.cardDescription}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.name} highlights`}>
                        {service.cardTags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-(--color-line) bg-(--color-surface) px-3 py-1 text-[12px] font-medium text-(--color-ink-soft)"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={aiServiceHref(service.slug)}
                        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-[14.5px] font-semibold text-(--color-blue) after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-blue)"
                      >
                        Explore {service.name}
                        <ArrowUpRight
                          size={17}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-(--color-line) bg-(--color-surface) p-7 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-[20px] font-extrabold text-(--color-ink)">Not sure where AI would help first?</h3>
              <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                Tell us about the work that takes most of your team&apos;s time. We will say plainly whether AI is the
                right answer.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-(--color-ink) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-blue)"
            >
              Talk to Us
              <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
