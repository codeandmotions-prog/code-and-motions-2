"use client";

import Link from "next/link";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

// The headline and intro are the largest paint, so they slide in but are never hidden in the server HTML.
const slideUp: Variants = {
  hidden: { opacity: 1, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/** Compact hero for the /shop landing page. */
export default function ShopLandingHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-16 lg:pb-20 lg:pt-20">
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
        <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />

        <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-white/80" aria-current="page">Shop</span>
          </motion.nav>

          <motion.h1
            variants={slideUp}
            className="mt-7 max-w-3xl text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[58px]"
          >
            Shop by Category
          </motion.h1>
          <motion.p variants={slideUp} className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]">
            Premium designs from Code &amp; Motions, organised by category. Pick a category to browse every design, open it full size and share your favorites.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
