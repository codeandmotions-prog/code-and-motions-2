"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import MotionStreaks from "./MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  "We Build Digital",
  "Experiences That",
  "Move Businesses Forward.",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(--color-surface-raised)">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-[42px] font-extrabold leading-[1.08] tracking-[-0.02em] text-(--color-ink) sm:text-[54px] lg:text-[62px]"
          >
            {headlineLines.map((line) => (
              <motion.span key={line} variants={lineVariant} className="block">
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="mt-7 max-w-md text-[17px] leading-relaxed text-(--color-ink-soft) lg:text-lg"
          >
            Web development, software, Shopify, SEO, design and video
            solutions built for ambitious brands.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.58 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#start-a-project"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink)"
            >
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-line) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-square w-full">
            <div className="absolute inset-8 rounded-[40px] bg-(--color-surface)" />
            <MotionStreaks className="relative h-full w-full" />
          </div>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-(--color-line) bg-white px-5 py-3.5 shadow-[0_20px_45px_-25px_rgba(11,28,77,0.45)] lg:left-4 lg:translate-x-0">
            <span className="h-2.5 w-2.5 rounded-full bg-(--color-cyan)" />
            <p className="text-[13px] font-semibold text-(--color-ink)">
              120+ products shipped for growing brands
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
