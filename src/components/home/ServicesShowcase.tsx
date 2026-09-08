"use client";

import { motion, type Variants } from "framer-motion";
import { MoveRight } from "lucide-react";
import ServicesCarousel from "@/components/ServicesCarousel";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export default function ServicesShowcase() {
  return (
    <section
      id="services"
      className="relative border-b border-(--color-line) bg-(--color-surface-raised) py-20 lg:py-28"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(11,28,77,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10"
      >
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            What We Do
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[38px]">
            One team. Every discipline you need.
          </h2>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-(--color-ink-soft)">
            Six disciplines, one accountable team — covering a project end
            to end.
          </p>
        </div>

        <div className="hidden items-center gap-2 text-[13.5px] font-semibold text-(--color-ink-soft) sm:flex">
          <MoveRight size={16} />
          Drag to explore
        </div>
      </motion.div>

      <div className="relative mt-10">
        <ServicesCarousel />
      </div>
    </section>
  );
}
