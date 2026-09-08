"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import LabNovaVisual from "@/components/labnova/LabNovaVisual";
import MotionStreaks from "@/components/MotionStreaks";
import { getSoftwareProduct } from "@/data/softwareProducts";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function FeaturedLabNova() {
  const labnova = getSoftwareProduct("labnova");

  if (!labnova) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden border-b border-(--color-line) py-20 lg:py-28"
      style={{
        background:
          "radial-gradient(120% 100% at 15% 0%, #E4EFFF 0%, #EFF6FF 45%, #F5F6FA 80%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-64 w-64 opacity-[0.07] lg:h-80 lg:w-80"
      >
        <MotionStreaks className="h-full w-full" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em]"
            style={{ backgroundColor: `${labnova.accentColor}1A`, color: labnova.accentColor }}
          >
            Featured Software
          </span>

          <div className="mt-6 flex items-center gap-3">
            <Image
              src={labnova.logoIcon}
              alt=""
              width={420}
              height={414}
              className="h-10 w-10 rounded-xl"
            />
            <span className="text-[24px] font-extrabold text-(--color-ink)">
              {labnova.name}
            </span>
          </div>
          <p className="mt-1.5 text-[15px] font-semibold text-(--color-ink-soft)">
            {labnova.tagline}
          </p>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-(--color-ink-soft)">
            {labnova.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/software/${labnova.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-(--color-line) bg-white px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink)"
              style={{ backgroundColor: labnova.accentColor }}
            >
              Get {labnova.name}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* app-window frame around the product visual, for a real SaaS-showcase feel */}
          <div className="overflow-hidden rounded-[24px] border border-(--color-line) bg-white shadow-[0_40px_80px_-40px_rgba(11,28,77,0.35)]">
            <div className="flex items-center gap-1.5 border-b border-(--color-line) bg-(--color-surface) px-4 py-3">
              <Circle size={9} className="fill-(--color-line) text-(--color-line)" />
              <Circle size={9} className="fill-(--color-line) text-(--color-line)" />
              <Circle size={9} className="fill-(--color-line) text-(--color-line)" />
            </div>
            <div className="p-4">
              <LabNovaVisual className="h-full w-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
