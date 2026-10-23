"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { AppEntry } from "@/data/apps";
import AppCard from "./AppCard";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type AppsGridProps = {
  apps: AppEntry[];
};

export default function AppsGrid({ apps }: AppsGridProps) {
  if (apps.length === 0) {
    return (
      <p className="rounded-[28px] border border-dashed border-(--color-line) bg-(--color-surface) p-10 text-center text-[15px] text-(--color-ink-soft)">
        New apps are on the way. Check back soon.
      </p>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
      >
        {apps.map((app) => (
          <motion.li key={app.slug} variants={item} className="h-full">
            <AppCard app={app} />
          </motion.li>
        ))}
      </motion.ul>
    </MotionConfig>
  );
}
