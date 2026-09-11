"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { serviceCategories } from "@/data/serviceCategories";

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

type ServiceDetailHeroProps = {
  slug: string;
  title: string;
  intro: string;
};

export default function ServiceDetailHero({ slug, title, intro }: ServiceDetailHeroProps) {
  const category = serviceCategories.find((item) => item.id === slug);
  if (!category) return null;
  const Icon = category.icon;

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
          <Link href="/services" className="transition-colors hover:text-white">
            Services
          </Link>
          <ChevronRight size={14} />
          <span className="text-white/80">{title}</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: category.gradient }}
        >
          <Icon size={26} className="text-white" strokeWidth={1.75} />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 max-w-2xl text-[36px] font-extrabold leading-[1.12] tracking-[-0.01em] text-white sm:text-[46px] lg:text-[52px]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          {intro}
        </motion.p>

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
      </motion.div>
    </section>
  );
}
