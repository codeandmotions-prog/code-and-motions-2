"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

type ServiceUseCasesProps = {
  useCases: string[];
};

export default function ServiceUseCases({ useCases }: ServiceUseCasesProps) {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Who This Is For
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
            Built for teams like yours
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {useCases.map((useCase) => (
            <motion.div
              key={useCase}
              variants={item}
              className="flex items-start gap-3 rounded-2xl border border-(--color-line) bg-white p-5"
            >
              <ArrowUpRight size={16} strokeWidth={2} className="mt-1 shrink-0 text-(--color-blue)" />
              <p className="text-[14.5px] leading-relaxed text-(--color-ink)">{useCase}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
