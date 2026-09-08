"use client";

import { motion, type Variants } from "framer-motion";
import { Code2, Globe, ShoppingBag } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const slots = [
  {
    id: "software",
    category: "Software Development",
    icon: Code2,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
  },
  {
    id: "website",
    category: "Website Development",
    icon: Globe,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 60%, #7CE6F7 100%)",
  },
  {
    id: "shopify",
    category: "Shopify Development",
    icon: ShoppingBag,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
  },
];

export default function FeaturedWork() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Selected Work
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[38px]">
              Case studies, in progress
            </h2>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-(--color-ink-soft)">
              We&apos;re building out our public case-study library. Here&apos;s
              the kind of work headed here soon.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {slots.map(({ id, category, icon: Icon, gradient }) => (
            <motion.div
              key={id}
              variants={item}
              className="group overflow-hidden rounded-[28px] border border-(--color-line) bg-white"
            >
              <div
                className="relative flex h-56 items-center justify-center overflow-hidden"
                style={{ background: gradient }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 220"
                  className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 opacity-[0.16] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <rect x="0" y="120" width="180" height="14" rx="7" transform="rotate(-28 0 120)" fill="#fff" />
                  <rect x="20" y="90" width="140" height="14" rx="7" transform="rotate(-28 20 90)" fill="#fff" />
                  <rect x="40" y="60" width="90" height="12" rx="6" transform="rotate(-28 40 60)" fill="#fff" />
                </svg>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <Icon size={26} className="text-white" strokeWidth={1.75} />
                </span>
              </div>

              <div className="p-6">
                <span className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-ink-soft)">
                  {category}
                </span>
                <p className="mt-2 text-[15px] font-semibold text-(--color-ink)">
                  Case study coming soon
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
