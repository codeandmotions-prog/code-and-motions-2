"use client";

import { motion, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const proofPoints = [
  {
    headline: "One Team",
    caption: "Design, development and growth handled by one accountable team — not scattered vendors.",
    gradient: "linear-gradient(155deg, #EAF2FF 0%, #DCEBFF 100%)",
  },
  {
    headline: "6 Disciplines",
    caption: "Software, web, Shopify, video, design and SEO, all under one roof.",
    gradient: "linear-gradient(155deg, #E6FBFF 0%, #D6F5FB 100%)",
  },
  {
    headline: "Modern Stack",
    caption: "Built on the same tools and frameworks fast-moving product teams use today.",
    gradient: "linear-gradient(155deg, #EFF2FF 0%, #E2E8FF 100%)",
  },
];

export default function TrustProof() {
  return (
    <section className="border-y border-(--color-line) bg-(--color-surface-raised) py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-[14.5px] font-semibold text-(--color-ink-soft)">
          Why brands choose to work with Code &amp; Motions
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {proofPoints.map(({ headline, caption, gradient }) => (
            <motion.div
              key={headline}
              variants={item}
              className="rounded-[28px] p-7"
              style={{ background: gradient }}
            >
              <h3 className="text-[22px] font-extrabold tracking-[-0.01em] text-(--color-ink)">
                {headline}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-(--color-ink-soft)">
                {caption}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
