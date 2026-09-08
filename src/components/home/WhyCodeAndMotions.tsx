"use client";

import { motion, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const pillars = [
  {
    number: "01",
    title: "Custom, Not Templated",
    description:
      "Every build starts from your business and your users, not a recycled theme or boilerplate.",
  },
  {
    number: "02",
    title: "Modern Technology",
    description:
      "We work with the same tools and frameworks fast-moving product teams rely on today.",
  },
  {
    number: "03",
    title: "Design + Development, Together",
    description:
      "One team owns both the look and the build, so nothing gets lost in translation.",
  },
  {
    number: "04",
    title: "Long-Term Support",
    description:
      "We stay involved after launch — fixing, refining and growing what we built together.",
  },
];

export default function WhyCodeAndMotions() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="max-w-md">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Why Code &amp; Motions
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em] text-(--color-ink) sm:text-[38px]">
              Built to move your business forward.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-(--color-ink-soft)">
              We take a business-focused approach to every engagement —
              tying design and engineering decisions back to what actually
              moves your brand forward.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="divide-y divide-(--color-line) border-t border-(--color-line)"
          >
            {pillars.map(({ number, title, description }) => (
              <motion.div
                key={number}
                variants={item}
                className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="text-[15px] font-bold text-(--color-blue) sm:w-10 sm:shrink-0">
                  {number}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-(--color-ink)">{title}</h3>
                  <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-(--color-ink-soft)">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
