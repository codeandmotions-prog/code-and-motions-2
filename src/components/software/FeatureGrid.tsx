"use client";

import { motion, type Variants } from "framer-motion";
import { labnovaFeatures } from "@/data/labnova";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function FeatureGrid() {
  return (
    <section id="features" className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Key Features
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-(--color-ink-soft)">
            Everything a modern lab needs, built into one desktop
            application.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {labnovaFeatures.map(({ id, title, icon: Icon }) => (
            <motion.div
              key={id}
              variants={item}
              className="group flex items-start gap-4 rounded-2xl border border-(--color-line) bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0070FE]/30 hover:shadow-[0_20px_40px_-28px_rgba(0,112,254,0.45)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0070FE]/10 transition-colors group-hover:bg-[#0070FE]/15">
                <Icon size={20} className="text-[#0070FE]" strokeWidth={1.9} />
              </span>
              <span className="pt-1.5 text-[14.5px] font-semibold leading-snug text-(--color-ink)">
                {title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
