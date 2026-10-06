"use client";

import { motion, type Variants } from "framer-motion";
import type { ServiceProcessStep } from "@/data/serviceDetails";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
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

type ServiceProcessStepsProps = {
  steps: ServiceProcessStep[];
  heading?: string;
};

export default function ServiceProcessSteps({
  steps,
  heading = "Our Process",
}: ServiceProcessStepsProps) {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            How We Work
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
            {heading}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-(--color-line) lg:block"
          />

          {steps.map(({ title, description }, index) => (
            <motion.div key={title} variants={item} className="relative flex flex-col items-start">
              <span
                className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl text-[17px] font-bold text-white"
                style={{
                  backgroundColor: "#1547e0",
                  boxShadow: "0 16px 32px -16px #1547e099",
                }}
              >
                {index + 1}
              </span>
              <span className="mt-4 text-[12.5px] font-bold uppercase tracking-[0.12em] text-(--color-blue)">
                Step {index + 1}
              </span>
              <h3 className="mt-1.5 text-[19px] font-bold text-(--color-ink)">{title}</h3>
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
