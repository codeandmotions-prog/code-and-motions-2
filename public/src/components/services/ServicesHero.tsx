"use client";

import { motion, type Variants } from "framer-motion";
import MotionStreaks from "@/components/MotionStreaks";

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
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-24 pt-20 lg:pb-28 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -left-20 top-4 h-72 w-72 -scale-x-100 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />
      <MotionStreaks className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
        >
          What we do
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-[38px] font-extrabold leading-[1.12] tracking-[-0.01em] text-white sm:text-[48px] lg:text-[56px]"
        >
          Our Services
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          Code & Motions provides complete digital solutions for businesses
          and brands — from software and websites to Shopify, video, design
          and SEO, all under one roof.
        </motion.p>
      </motion.div>
    </section>
  );
}
