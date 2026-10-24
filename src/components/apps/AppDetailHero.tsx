"use client";

import Link from "next/link";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import type { AppEntry } from "@/data/apps";
import AppIcon from "./AppIcon";
import ApkDownloadButton from "./ApkDownloadButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function AppDetailHero({ app }: { app: AppEntry }) {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-20 pt-16 lg:pb-28 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
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
      <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />

      <MotionConfig reducedMotion="user">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-7xl px-6 lg:px-10"
        >
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/apps" className="transition-colors hover:text-white">
              Apps
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-white/80" aria-current="page">
              {app.name}
            </span>
          </motion.nav>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <motion.div variants={fadeUp} className="shrink-0">
              <div
                className="inline-flex rounded-[28px] p-1.5"
                style={{ background: `linear-gradient(155deg, ${app.accentColor} 0%, #0B1C4D 100%)` }}
              >
                <AppIcon app={app} className="h-24 w-24 rounded-3xl sm:h-28 sm:w-28" glyphSize={42} />
              </div>
            </motion.div>
            <div className="min-w-0">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan)"
              >
                {app.category}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="mt-4 text-[36px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white wrap-anywhere sm:text-[46px] lg:text-[54px]"
              >
                {app.name}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-2 text-[18px] font-semibold text-(--color-cyan-soft)">
                {app.tagline}
              </motion.p>
            </div>
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]"
          >
            {app.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9">
            <ApkDownloadButton app={app} tone="dark" />
          </motion.div>
        </motion.div>
      </MotionConfig>
    </section>
  );
}
