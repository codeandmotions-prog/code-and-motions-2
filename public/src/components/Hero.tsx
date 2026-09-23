"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Code2,
  Globe,
  ShoppingBag,
  Sparkles,
  Clapperboard,
  TrendingUp,
  User,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import MotionStreaks from "./MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
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

const servicePills = [
  { label: "Software Development", icon: Code2 },
  { label: "Web Development", icon: Globe },
  { label: "Shopify Solutions", icon: ShoppingBag },
  { label: "AI & SaaS", icon: Sparkles },
  { label: "Video & Animation", icon: Clapperboard },
  { label: "SEO & Digital Growth", icon: TrendingUp },
];

// Purely decorative — generic silhouettes, never presented as real people.
const avatarTones = ["#1547E0", "#22D3EE", "#0B1C4D", "#2F6BFF", "#7CE6F7"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 opacity-[0.06] lg:h-[26rem] lg:w-[26rem]" />

      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-16 text-center lg:px-10 lg:pb-32 lg:pt-24">
        {/* trust bar */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] py-2 pl-2 pr-5 backdrop-blur-sm"
          >
            <div className="flex -space-x-2.5">
              {avatarTones.map((tone, i) => (
                <span
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-(--color-navy-deep) text-white"
                  style={{ backgroundColor: tone }}
                  aria-hidden="true"
                >
                  <User size={11} strokeWidth={2.5} />
                </span>
              ))}
            </div>
            <span className="text-left text-[12.5px] leading-snug text-white/75 sm:text-[13px]">
              <span className="font-bold text-white">One accountable team</span>
              {" "}— software, web, Shopify, video, design &amp; SEO
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-(--color-cyan)/25 bg-(--color-cyan)/[0.08] px-4 py-2.5 text-[12.5px] font-semibold text-(--color-cyan-soft) sm:text-[13px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-cyan) opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-cyan)" />
            </span>
            Available for new projects
          </motion.div>
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.22 }}
          className="mx-auto mt-9 max-w-3xl text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] sm:leading-[1.06] lg:text-[62px]"
        >
          <span className="block">We Build Digital Solutions</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(100deg, #22D3EE 15%, #7CE6F7 85%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            That Grow Your Business
          </span>
        </motion.h1>

        {/* description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.34 }}
          className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px]"
        >
          Code &amp; Motions is a full-service digital agency delivering
          custom software, websites, Shopify solutions, AI-powered
          products, creative design, animation, and SEO for businesses
          across the USA, UK, and Europe.
        </motion.p>

        {/* service pills */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.46 }}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
        >
          {servicePills.map(({ label, icon: Icon }) => (
            <motion.span
              key={label}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white/80"
            >
              <Icon size={14} className="text-(--color-cyan-soft)" strokeWidth={1.9} />
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.62 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#start-a-project"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-cyan) hover:text-(--color-ink) sm:w-auto"
          >
            Request a Quote
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white sm:w-auto"
          >
            <Calendar size={17} />
            Book Free Consultation
          </Link>
        </motion.div>

        {/* subtle brand mark, preserved */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.72 }}
          className="mt-12 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/25"
        >
          Design &middot; Develop &middot; Grow
        </motion.p>
      </div>
    </section>
  );
}
