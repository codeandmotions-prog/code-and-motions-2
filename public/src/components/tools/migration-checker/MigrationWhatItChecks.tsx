"use client";

import { motion, type Variants } from "framer-motion";
import { Package, Users, RefreshCw, Puzzle, Search, CreditCard } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const checks = [
  {
    icon: Package,
    title: "Product Catalog Complexity",
    description: "Your product count and variation depth — the biggest driver of import time and effort.",
  },
  {
    icon: Users,
    title: "Customers & Order History",
    description: "How much customer and historical order data needs to move with you to Shopify.",
  },
  {
    icon: RefreshCw,
    title: "Subscriptions & Reviews",
    description: "Recurring billing and product reviews, which each need their own migration path.",
  },
  {
    icon: Puzzle,
    title: "Plugins & Custom Code",
    description: "How many WooCommerce plugins and custom features need a Shopify equivalent or rebuild.",
  },
  {
    icon: Search,
    title: "SEO & URL Structure",
    description: "Whether your current URLs and search rankings need a redirect plan to stay protected.",
  },
  {
    icon: CreditCard,
    title: "Payments & Shipping",
    description: "Whether your payment gateway and shipping setup are standard or custom-built.",
  },
];

export default function MigrationWhatItChecks() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            What This Checker Evaluates
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            A Real Look at Your WooCommerce to Shopify Migration
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {checks.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-start rounded-2xl border border-(--color-line) bg-(--color-surface) p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                <Icon size={19} className="text-white" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
