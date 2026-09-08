"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LabNovaVisual from "@/components/labnova/LabNovaVisual";
import { labnova } from "@/data/labnova";

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
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="inline-flex items-center rounded-full bg-[#0070FE]/10 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#0070FE]">
            Featured Software
          </span>

          <div className="mt-6 flex items-center gap-3">
            <Image
              src="/images/labnova-icon.png"
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
              href="/software"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-line) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0070FE] px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink)"
            >
              Get LabNova
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
          <LabNovaVisual className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
