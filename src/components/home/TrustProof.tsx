"use client";

import { Layers, Cpu, Grid3x3 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const proofPoints = [
  {
    icon: Layers,
    title: "Full-Service Team",
    description:
      "Design, development and growth handled by one accountable team, not scattered vendors.",
  },
  {
    icon: Cpu,
    title: "Modern Engineering",
    description:
      "Built on the same tools and frameworks fast-moving product teams use today.",
  },
  {
    icon: Grid3x3,
    title: "6 Core Disciplines",
    description:
      "Software, web, Shopify, video, design and SEO — under one roof, one workflow.",
  },
];

export default function TrustProof() {
  return (
    <section className="border-y border-(--color-line) bg-(--color-surface)">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-(--color-line) lg:px-10 lg:py-16"
      >
        {proofPoints.map(({ icon: Icon, title, description }) => (
          <motion.div key={title} variants={item} className="sm:pl-8 sm:first:pl-0">
            <Icon size={22} className="text-(--color-blue)" strokeWidth={1.75} />
            <h3 className="mt-4 text-[16.5px] font-bold text-(--color-ink)">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-(--color-ink-soft)">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
