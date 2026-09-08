"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { getSoftwareProduct } from "@/data/softwareProducts";

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
  const labnova = getSoftwareProduct("labnova");

  if (!labnova) {
    return null;
  }

  return (
    <section className="border-y border-(--color-line) bg-(--color-surface)">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 lg:px-10 lg:py-14"
      >
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-ink-soft)">
          Trusted Partners
        </span>

        <Image
          src={labnova.logoMark}
          alt={labnova.name}
          width={1305}
          height={625}
          className="h-14 w-auto sm:h-16"
        />
      </motion.div>
    </section>
  );
}
