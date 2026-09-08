"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import MotionStreaks from "@/components/MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function HomeFinalCTA() {
  return (
    <section
      id="start-a-project"
      className="relative overflow-hidden bg-(--color-navy-deep) py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[460px] w-[460px] -translate-y-1/2 opacity-[0.14] lg:opacity-20"
      >
        <MotionStreaks className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 -scale-x-100 rotate-180 opacity-[0.08]"
      >
        <MotionStreaks className="h-full w-full" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
      >
        <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.01em] text-white sm:text-[48px] lg:text-[56px]">
          Have an idea?
          <span
            className="block"
            style={{
              background: "linear-gradient(100deg, #22D3EE 15%, #7CE6F7 85%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Let&apos;s build it.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
          Tell us where your business needs to go next and we&apos;ll put the
          right mix of design, engineering and growth behind it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            Start a Project
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="mailto:hello@codeandmotions.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
          >
            hello@codeandmotions.com
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
