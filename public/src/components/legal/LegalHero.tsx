"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
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

type LegalHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  lastUpdated?: string;
};

export default function LegalHero({ eyebrow, title, description, breadcrumbLabel, lastUpdated }: LegalHeroProps) {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-16 lg:pb-20 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(120% 100% at 15% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-16 top-4 h-64 w-64 opacity-20 lg:h-80 lg:w-80" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl px-6 lg:px-10"
      >
        <motion.nav
          variants={fadeUp}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[13px] font-medium text-white/50"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white/80">{breadcrumbLabel}</span>
        </motion.nav>

        <motion.span
          variants={fadeUp}
          className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 max-w-2xl text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[42px] lg:text-[46px]"
        >
          {title}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
          {description}
        </motion.p>

        {lastUpdated && (
          <motion.div
            variants={fadeUp}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12.5px] font-medium text-white/60"
          >
            <Clock size={14} />
            Last updated: {lastUpdated}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
