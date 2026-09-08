"use client";

import { motion, type Variants } from "framer-motion";
import { Search, PenTool, Code2, TrendingUp } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn your business, your users and what success actually looks like.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape the experience — structure, interface and brand — before a line of code is written.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Develop",
    description:
      "We build it properly: clean, scalable, and ready for real-world use.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We stay on to refine, support and help what we built keep performing.",
    icon: TrendingUp,
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            How We Work
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[38px]">
            A simple, proven process.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-14 max-w-2xl lg:mx-0 lg:max-w-3xl"
        >
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-(--color-line) sm:block"
          />

          {steps.map(({ number, title, description, icon: Icon }) => (
            <motion.div
              key={number}
              variants={item}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_16px_32px_-20px_rgba(11,28,77,0.4)] ring-1 ring-(--color-line)">
                <Icon size={22} className="text-(--color-blue)" strokeWidth={1.75} />
              </span>
              <div className="pt-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold tracking-[0.05em] text-(--color-blue)">
                    {number}
                  </span>
                  <h3 className="text-[19px] font-bold text-(--color-ink)">{title}</h3>
                </div>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-(--color-ink-soft)">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
