"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function AboutUsTeaser() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/logo-header.png"
              alt="Code & Motions"
              width={1262}
              height={610}
              className="h-10 w-auto"
            />
            <span className="mt-6 block text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              About Us
            </span>
            <h2 className="mt-3 max-w-md text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              A digital agency built around one accountable team.
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-(--color-ink-soft)">
              Code & Motions designs, develops and grows digital products
              for ambitious brands — spanning software, web, Shopify,
              video, design and SEO. Instead of splitting your project
              across separate vendors, one team carries it from first
              sketch to production and beyond.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-blue)"
            >
              More about our team
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div className="rounded-[24px] border border-(--color-line) bg-(--color-surface) p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-blue)/10">
                <Target size={20} className="text-(--color-blue)" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">Our Mission</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-(--color-ink-soft)">
                To give ambitious brands access to senior-level design and
                engineering under one roof, so they can move as fast as
                their ideas.
              </p>
            </div>
            <div className="rounded-[24px] border border-(--color-line) bg-(--color-surface) p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-blue)/10">
                <Eye size={20} className="text-(--color-blue)" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">Our Vision</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-(--color-ink-soft)">
                To be the long-term digital partner businesses return to —
                not a one-off vendor, but a team invested in what they
                build lasting.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
