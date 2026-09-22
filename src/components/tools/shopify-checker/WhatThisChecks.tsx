"use client";

import { motion, type Variants } from "framer-motion";
import { Gauge, PackagePlus, Link2, Hourglass, BarChart3, Palette } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const checks = [
  {
    icon: Gauge,
    title: "Shopify Storefront Speed",
    description: "Real server response time measured directly from your public homepage.",
  },
  {
    icon: PackagePlus,
    title: "App & Script Bloat",
    description: "How many third-party apps and scripts are loading, and what they're likely doing.",
  },
  {
    icon: Link2,
    title: "Third-Party Scripts",
    description: "Analytics, marketing, chat and review scripts detected on your storefront.",
  },
  {
    icon: Hourglass,
    title: "Render-Blocking Resources",
    description: "Scripts and stylesheets in <head> that can delay your page from rendering.",
  },
  {
    icon: BarChart3,
    title: "Page & Resource Performance",
    description: "Homepage size, script counts and other measurable page-weight signals.",
  },
  {
    icon: Palette,
    title: "Theme & Resource Signals",
    description: "Publicly visible theme asset signatures found in your storefront's source.",
  },
];

export default function WhatThisChecks() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            What This Tool Checks
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            A Real Look at Your Shopify Storefront
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {checks.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-start rounded-2xl border border-(--color-line) bg-(--color-surface) p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                <Icon size={19} className="text-white" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
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
