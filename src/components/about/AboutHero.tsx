"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight, CalendarCheck, Briefcase } from "lucide-react";
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

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-20 pt-16 lg:pb-28 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 15% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      {/* subtle grid-line texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6 lg:px-10"
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
          <span className="text-white/80">About</span>
        </motion.nav>

        <motion.h1
          variants={fadeUp}
          className="mt-7 max-w-3xl text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]"
        >
          <span className="block">We Build Digital Solutions.</span>
          <span className="block">We Mean It.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          Code &amp; Motions helps businesses across the USA, UK, Europe,
          and beyond build powerful digital solutions — from software
          development and websites to Shopify, AI, design, explainer
          videos, 2D animation, and SEO.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-(--color-cyan) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:bg-white"
          >
            <CalendarCheck size={17} />
            Book a Free Call
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
          >
            <Briefcase size={17} />
            See Our Work
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
