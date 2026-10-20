"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck, ChevronRight, LayoutGrid } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { getSubService } from "@/data/subServices";
import MotionStreaks from "@/components/MotionStreaks";
import type { SubServiceHeroCtas } from "@/data/subServiceTypes";

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

type SubServiceHeroProps = {
  mainSlug: string;
  subSlug: string;
  parentHref: string;
  parentTitle: string;
  title: string;
  intro: string;
  /**
   * When provided, the hero renders in the premium style used by the main
   * Services hero (grid texture, motion streaks, Home breadcrumb, two CTAs).
   * Pages that omit it render exactly as before.
   */
  ctas?: SubServiceHeroCtas;
};

/**
 * Generic hero for a sub-service page nested under a main service —
 * same visual pattern as AiSubServiceHero. The icon and gradient are
 * looked up internally from mainSlug/subSlug (both plain, serializable
 * strings) rather than received as props, because a Lucide icon is a
 * component function and functions can't be passed from a Server
 * Component into a Client Component as a prop value.
 */
export default function SubServiceHero({
  mainSlug,
  subSlug,
  parentHref,
  parentTitle,
  title,
  intro,
  ctas,
}: SubServiceHeroProps) {
  const service = getSubService(mainSlug, subSlug);
  if (!service) return null;
  const Icon = service.icon;
  const gradient = service.gradient;

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

      {ctas && (
        <>
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
        </>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`relative mx-auto px-6 lg:px-10 ${ctas ? "max-w-7xl" : "max-w-4xl"}`}
      >
        <motion.nav
          variants={fadeUp}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/50"
        >
          {ctas && (
            <>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <Link href="/services" className="transition-colors hover:text-white">
            Services
          </Link>
          <ChevronRight size={14} />
          <Link href={parentHref} className="transition-colors hover:text-white">
            {parentTitle}
          </Link>
          <ChevronRight size={14} />
          <span className="text-white/80">{title}</span>
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
          className={`mt-6 font-extrabold text-white ${
            ctas
              ? "max-w-3xl text-[36px] leading-[1.1] tracking-[-0.02em] sm:text-[48px] lg:text-[56px]"
              : "max-w-2xl text-[36px] leading-[1.12] tracking-[-0.01em] sm:text-[46px] lg:text-[52px]"
          }`}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={`mt-6 text-[16.5px] leading-relaxed text-white/70 lg:text-[17px] ${
            ctas ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {intro}
        </motion.p>

        {ctas ? (
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={ctas.primary.href}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-cyan) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:bg-white"
            >
              <CalendarCheck size={17} aria-hidden="true" />
              {ctas.primary.label}
            </Link>
            <Link
              href={ctas.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
            >
              <LayoutGrid size={17} aria-hidden="true" />
              {ctas.secondary.label}
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp} className="mt-9">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
