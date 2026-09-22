"use client";

import { motion, type Variants } from "framer-motion";
import { Link2, ScanSearch, FileCheck2 } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const steps = [
  {
    step: "01",
    title: "Enter Your Shopify Store URL",
    description: "Paste any public Shopify storefront URL — no login or admin access needed.",
    icon: Link2,
  },
  {
    step: "02",
    title: "We Analyze the Public Storefront",
    description: "We fetch your live homepage and detect real speed, app and script signals.",
    icon: ScanSearch,
  },
  {
    step: "03",
    title: "Get Your Free Performance Report",
    description: "See your score, detected apps, and clear recommendations — instantly.",
    icon: FileCheck2,
  },
];

export default function CheckerHowItWorks() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            How It Works
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Three Steps to Your Report
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
              <h3 className="mt-1.5 text-[18px] font-bold text-(--color-ink)">{title}</h3>
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
