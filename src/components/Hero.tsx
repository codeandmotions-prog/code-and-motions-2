"use client";

import Link from "next/link";
import { ArrowRight, Code2, Globe, ShoppingBag, Clapperboard, PenTool, TrendingUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import MotionStreaks from "./MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  { text: "Design.", accent: false },
  { text: "Develop.", accent: false },
  { text: "Grow.", accent: true },
];

const disciplineIcons = [Code2, Globe, ShoppingBag, Clapperboard, PenTool, TrendingUp];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
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
    <section className="relative overflow-hidden bg-(--color-navy-deep)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 65% at 20% -10%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-cyan)" />
            Digital Agency
          </motion.span>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-7 text-[54px] font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-[72px] lg:text-[84px]"
          >
            {headlineLines.map(({ text, accent }) => (
              <motion.span
                key={text}
                variants={lineVariant}
                className="block"
                style={
                  accent
                    ? {
                        background:
                          "linear-gradient(100deg, #22D3EE 15%, #7CE6F7 85%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }
                    : undefined
                }
              >
                {text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-md text-[17px] leading-relaxed text-white/70 lg:text-[18px]"
          >
            A digital agency for ambitious brands. We design, build and grow
            software, websites, Shopify stores, video and brand systems —
            under one roof.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.62 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#start-a-project"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
            >
              View Our Services
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-square">
            <div className="absolute inset-6 rounded-[40px] border border-white/10 bg-white/[0.03] sm:inset-10" />
            <MotionStreaks className="relative h-full w-full" />
          </div>

          {/* qualitative proof chip — no invented numbers */}
          <div className="absolute bottom-0 left-1/2 flex w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:left-2 sm:w-auto sm:translate-x-0">
            <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-(--color-cyan)" />
            <p className="text-[13.5px] font-semibold leading-snug text-white">
              Design, development &amp; growth — one accountable team.
            </p>
          </div>

          {/* discipline chip, top-right */}
          <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:flex lg:right-0">
            <div className="flex -space-x-1.5">
              {disciplineIcons.map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-(--color-navy-deep) bg-(--color-blue) text-white"
                >
                  <Icon size={12} strokeWidth={2} />
                </span>
              ))}
            </div>
            <span className="text-[12px] font-semibold text-white/70">
              6 disciplines
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
