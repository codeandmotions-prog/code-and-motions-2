"use client";

import { motion, type Variants } from "framer-motion";
import { MousePointerClick, PenLine, Sparkles } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const steps = [
  {
    step: "01",
    title: "Choose a Tool",
    description: "Pick the tool that matches what you're trying to figure out.",
    icon: MousePointerClick,
  },
  {
    step: "02",
    title: "Enter Your Information",
    description: "Answer a few short, relevant questions — nothing complicated.",
    icon: PenLine,
  },
  {
    step: "03",
    title: "Get Your Result",
    description: "See your result instantly, with clear next steps if you need them.",
    icon: Sparkles,
  },
];

export default function HowToolsWork() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            How It Works
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Three Steps to Your Result
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-(--color-line) sm:block"
          />

          {steps.map(({ step, title, description, icon: Icon }) => (
            <motion.div
              key={step}
              variants={item}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-(--color-blue) text-white shadow-[0_16px_32px_-16px_rgba(21,71,224,0.6)]">
                <Icon size={22} strokeWidth={1.9} />
              </span>
              <span className="mt-4 text-[12.5px] font-bold uppercase tracking-[0.12em] text-(--color-blue)">
                Step {step}
              </span>
              <h3 className="mt-1.5 text-[18px] font-bold text-(--color-ink)">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
