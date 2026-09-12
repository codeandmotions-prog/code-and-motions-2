"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Quote, User, ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function ClientSuccess() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)">
            Client Feedback
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.01em] text-white sm:text-[38px]">
            Client Success Stories
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto mt-12 max-w-xl"
        >
          {/* decorative placeholder avatars, deliberately generic — no real clients yet */}
          <div className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 flex-col gap-4 sm:-left-14 lg:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/20 text-white/25">
              <User size={16} />
            </span>
            <span className="ml-6 flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/15 text-white/15">
              <User size={13} />
            </span>
          </div>
          <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-4 sm:-right-14 lg:flex">
            <span className="ml-6 flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/20 text-white/25">
              <User size={16} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/15 text-white/15">
              <User size={13} />
            </span>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-9 backdrop-blur-sm sm:p-11">
            <Quote size={30} className="mx-auto text-(--color-cyan)" strokeWidth={1.5} />
            <p className="mt-5 text-[16.5px] leading-relaxed text-white/80">
              We&apos;re building our library of client stories. Real
              feedback from real projects will appear here as engagements
              wrap up — we&apos;d rather show you nothing than something
              made up.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-(--color-cyan-soft) transition-colors hover:text-white"
            >
              Become one of our first stories
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
