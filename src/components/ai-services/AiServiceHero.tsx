"use client";

import Link from "next/link";
import { ArrowRight, AudioLines, Bot, ChevronRight, LayoutDashboard, MessagesSquare, Workflow } from "lucide-react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import type { AiServiceKind } from "@/data/aiServices";
import AiServiceArt from "./AiServiceArt";

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const KIND_ICON = {
  agent: Bot,
  chatbot: MessagesSquare,
  workflow: Workflow,
  voice: AudioLines,
  saas: LayoutDashboard,
} as const;

type AiServiceHeroProps = {
  name: string;
  kind: AiServiceKind;
  gradient: string;
  h1: string;
  intro: string;
};

// Receives plain data only: components (icons) cannot cross the server/client boundary.
export default function AiServiceHero({ name, kind, gradient, h1, intro }: AiServiceHeroProps) {
  const Icon = KIND_ICON[kind];
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)" }}
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

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10"
        >
          <div className="min-w-0">
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/50"
            >
              <Link href="/services" className="transition-colors hover:text-white">
                Services
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link href="/services/ai-development" className="transition-colors hover:text-white">
                AI Development
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/80" aria-current="page">
                {name}
              </span>
            </motion.nav>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: gradient }}
            >
              <Icon size={26} className="text-white" strokeWidth={1.75} aria-hidden="true" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-2xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[50px]"
            >
              {h1}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70 lg:text-[17px]">
              {intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-cyan)"
              >
                Discuss Your Project
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-cyan)"
              >
                See How It Works
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative min-w-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-60 blur-2xl"
              style={{ background: gradient }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-(--color-navy-deep)/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur">
              <div className="flex min-h-[300px] items-center sm:min-h-[340px]">
                <AiServiceArt kind={kind} variant="hero" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
