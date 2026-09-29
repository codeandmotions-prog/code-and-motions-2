"use client";

import { motion, type Variants } from "framer-motion";
import AiSubServiceCard from "./AiSubServiceCard";
import { aiSubServices } from "@/data/aiDevelopment";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function AiSubServicesGrid() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Sub-Services
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
            Six ways we put AI to work
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
            Each AI Development sub-service has its own dedicated page with the detail
            you need to scope a project.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {aiSubServices.map((service) => (
            <motion.div key={service.slug} variants={item} className="h-full">
              <AiSubServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
