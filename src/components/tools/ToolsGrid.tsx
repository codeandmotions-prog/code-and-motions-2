"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { freeTools } from "@/data/tools";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function ToolsGrid() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Choose a Tool
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Three Free Tools, Built for Real Decisions
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            Each tool gives you a clear, practical answer in a couple of
            minutes — no account, no sales call.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {freeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.slug}
                variants={fadeUp}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-(--color-line) bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-(--color-blue)/30 hover:shadow-[0_30px_60px_-35px_rgba(11,28,77,0.35)]"
              >
                <div
                  className="relative flex h-[120px] items-center justify-center overflow-hidden"
                  style={{ background: tool.gradient }}
                >
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    Coming Soon
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} className="text-white" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-[18px] font-bold leading-snug text-(--color-ink)">
                    {tool.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                    {tool.description}
                  </p>

                  <div className="mt-6 pt-5">
                    <span
                      className="inline-flex cursor-not-allowed items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink-soft)"
                      aria-disabled="true"
                    >
                      Use Tool
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
