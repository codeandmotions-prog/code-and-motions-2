"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { labnova } from "@/data/labnova";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function TrustedPartners() {
  return (
    <section className="border-y border-(--color-line) bg-(--color-surface)">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row lg:px-10"
      >
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-ink-soft)">
          Trusted Partners
        </span>

        <div className="flex items-center gap-4">
          <Image
            src="/images/labnova-mark.png"
            alt="LabNova"
            width={1305}
            height={625}
            className="h-8 w-auto"
          />
          <span className="hidden h-6 w-px bg-(--color-line) sm:block" />
          <span className="hidden text-[13.5px] text-(--color-ink-soft) sm:block">
            {labnova.tagline}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
