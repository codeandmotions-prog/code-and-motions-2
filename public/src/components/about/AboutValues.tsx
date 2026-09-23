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
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const values = [
  {
    number: "01",
    title: "Craftsmanship",
    description:
      "We sweat the details others skip — from pixel alignment to how a database is indexed.",
  },
  {
    number: "02",
    title: "Transparency",
    description:
      "You always know what's being built, why, and where things stand — no black boxes.",
  },
  {
    number: "03",
    title: "Accountability",
    description:
      "One team owns the outcome of a project, not just their individual piece of it.",
  },
  {
    number: "04",
    title: "Longevity",
    description:
      "We build things meant to hold up for years, not just look good on launch day.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="max-w-sm">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Our Values
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              What we hold ourselves to.
            </h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2"
          >
            {values.map(({ number, title, description }) => (
              <motion.div key={number} variants={item} className="flex gap-4">
                <span className="text-[14px] font-bold text-(--color-blue)">{number}</span>
                <div>
                  <h3 className="text-[17px] font-bold text-(--color-ink)">{title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
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
