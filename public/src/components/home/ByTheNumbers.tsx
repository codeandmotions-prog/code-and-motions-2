"use client";

import { motion, type Variants } from "framer-motion";
import CountUpNumber from "./CountUpNumber";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const stats = [
  { value: 75, suffix: "+", label: "Projects Delivered" },
  { value: 101, suffix: "", label: "Global Clients" },
  { value: 4, suffix: "", label: "Years of Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function ByTheNumbers() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-(--color-cyan)/30 bg-(--color-cyan)/[0.08] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-(--color-blue)"
          >
            By The Numbers
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] text-(--color-ink) sm:text-[42px] lg:text-[46px]"
          >
            Digital Work That
            <span className="block text-(--color-blue)">Delivers Results</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-(--color-ink-soft)"
          >
            We combine software development, web design, Shopify, creative
            services, and SEO to help businesses build, launch, and grow
            online.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 grid grid-cols-2 divide-x divide-y divide-(--color-line) overflow-hidden rounded-[24px] border border-(--color-line) bg-(--color-surface-raised) sm:grid-cols-4 sm:divide-y-0"
        >
          {stats.map(({ value, suffix, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="px-4 py-8 text-center sm:px-4"
            >
              <p className="text-[34px] font-extrabold tracking-[-0.01em] text-(--color-blue) sm:text-[38px]">
                <CountUpNumber value={value} suffix={suffix} />
              </p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-(--color-ink-soft)">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
