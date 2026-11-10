"use client";

import { motion, type Variants } from "framer-motion";
import { aboutFacts } from "@/data/aboutFacts";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export default function AboutLeadership() {
  const { name, title, bio } = aboutFacts.founder;

  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="max-w-sm">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Leadership
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              Led by our Co-Founder &amp; CEO
            </h2>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[28px] p-8 text-white sm:p-10"
            style={{
              background: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-28 w-28 rotate-45 bg-white/10"
            />
            <div className="relative">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-[22px] font-extrabold backdrop-blur-sm"
              >
                MS
              </div>
              <h3 className="mt-6 text-[22px] font-extrabold">{name}</h3>
              <p className="mt-1 text-[14px] font-medium text-(--color-cyan-soft)">
                {title}
              </p>
              <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/80">
                {bio}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
