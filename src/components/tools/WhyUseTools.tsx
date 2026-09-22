"use client";

import { motion, type Variants } from "framer-motion";
import { Gift, Unlock, Zap, ClipboardCheck } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const reasons = [
  {
    icon: Gift,
    title: "Free to Use",
    description: "Every tool is free, with no hidden cost or trial period.",
  },
  {
    icon: Unlock,
    title: "No Signup Required",
    description: "Get your result straight away — no account or email wall.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Answer a few questions and see your result immediately.",
  },
  {
    icon: ClipboardCheck,
    title: "Practical Recommendations",
    description: "Every result comes with clear, actionable next steps.",
  },
];

export default function WhyUseTools() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Why Use Our Free Tools
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Built to Be Useful, Not Gated
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {reasons.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-start rounded-2xl border border-(--color-line) bg-(--color-surface) p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                <Icon size={19} className="text-white" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">
                {title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
