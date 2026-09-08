"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import { labnova } from "@/data/labnova";

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

export default function SoftwareHero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-24 pt-20 lg:pb-28 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, #123a7a 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-20 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />
      <MotionStreaks className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 -scale-x-100 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <Image
            src="/images/labnova-icon.png"
            alt=""
            width={420}
            height={414}
            className="h-14 w-14 rounded-2xl"
          />
        </motion.div>

        <motion.span
          variants={fadeUp}
          className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#8FC2FF]"
        >
          LabNova
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-[36px] font-extrabold leading-[1.14] tracking-[-0.01em] text-white sm:text-[46px] lg:text-[54px]"
        >
          Smart Laboratory Management System
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-[19px] font-semibold text-[#8FC2FF] sm:text-[21px]"
        >
          Complete. Secure. Simple.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          {labnova.shortDescription}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#0070FE] px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            Get LabNova
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
          >
            View Features
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
