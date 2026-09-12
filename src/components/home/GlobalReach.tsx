"use client";

import { motion, type Variants } from "framer-motion";
import { Globe2 } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const regions = ["Pakistan", "United States", "United Kingdom", "Europe"];

export default function GlobalReach() {
  return (
    <section className="bg-(--color-surface) py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
          <Globe2 size={15} />
          Global Reach
        </span>
        <h2 className="mt-4 text-[26px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[30px]">
          Based in Pakistan. Working worldwide.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-(--color-ink-soft)">
          We work with businesses locally and internationally, delivering
          the same senior-level design and engineering wherever a project
          takes us.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {regions.map((region) => (
            <motion.span
              key={region}
              variants={item}
              className="rounded-full border border-(--color-line) bg-white px-5 py-2.5 text-[14px] font-semibold text-(--color-ink)"
            >
              {region}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
