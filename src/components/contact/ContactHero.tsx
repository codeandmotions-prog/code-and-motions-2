"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-20 pt-16 lg:pb-24 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 15% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      {/* subtle grid-line texture, matching the About page hero */}
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
      <MotionStreaks className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

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
          <span className="text-white/80">Contact</span>
        </motion.nav>

        <motion.h1
          variants={fadeUp}
          className="mt-7 max-w-3xl text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]"
        >
          <span className="block">Let&apos;s Talk About</span>
          <span className="block">Your Project</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          No sales pitch, no pressure — tell us about your software,
          website, Shopify, animation or SEO project and we&apos;ll get
          back to you with honest, straightforward advice.
        </motion.p>
      </motion.div>
    </section>
  );
}
