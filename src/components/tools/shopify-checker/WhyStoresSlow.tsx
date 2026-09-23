"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { LayoutGrid, Eye, ImageIcon, Code } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const reasons = [
  {
    icon: LayoutGrid,
    title: "Too Many Apps",
    description:
      "Every installed app adds its own script to your storefront. A handful is normal — a dozen or more starts to add up on every single page load.",
  },
  {
    icon: Eye,
    title: "Third-Party Tracking Scripts",
    description:
      "Analytics, pixels and heatmap tools are useful, but each one is a separate script your visitor's browser has to download and run.",
  },
  {
    icon: ImageIcon,
    title: "Heavy Assets",
    description:
      "Large, unoptimized images and videos are still one of the most common reasons Shopify storefronts feel slow to load.",
  },
  {
    icon: Code,
    title: "Unoptimized Theme Code",
    description:
      "Older or heavily customized themes can carry render-blocking scripts and stylesheets that delay the first thing your visitor sees.",
  },
];

export default function WhyStoresSlow() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Why Shopify Stores Become Slow
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Why Is Your Shopify Store Slow? The Usual Suspects
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {reasons.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-(--color-line) bg-(--color-surface-raised) p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                <Icon size={19} className="text-white" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[14.5px] leading-relaxed text-(--color-ink-soft)">
          If any of these sound familiar, our{" "}
          <Link href="/services/shopify-development" className="font-semibold text-(--color-blue) hover:underline">
            Shopify development team
          </Link>{" "}
          can audit your store and fix the root cause, not just the symptoms.
        </p>
      </div>
    </section>
  );
}
