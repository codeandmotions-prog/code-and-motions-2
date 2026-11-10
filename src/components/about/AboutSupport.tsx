"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Globe, Headset } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const inlineLinkClass =
  "font-semibold text-(--color-blue) underline-offset-4 hover:underline";

const textLinkClass =
  "group inline-flex items-center gap-2 text-[15px] font-semibold text-(--color-blue) underline-offset-4 hover:underline";

export default function AboutSupport() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Support &amp; Reach
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Based in Sargodha, working with clients worldwide
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <motion.div
            variants={item}
            className="rounded-[24px] border border-(--color-line) bg-white p-7"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
              <Globe size={22} className="text-(--color-blue)" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">
              Clients worldwide
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
              As a{" "}
              <Link href="/services/website-development" className={inlineLinkClass}>
                web development company in Pakistan
              </Link>
              , we work with businesses in the USA, UK, Australia, Germany,
              the UAE, Saudi Arabia and other international markets.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-[24px] border border-(--color-line) bg-white p-7"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
              <Headset size={22} className="text-(--color-blue)" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">
              24/7 customer support
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
              We provide 24/7 customer support to all our clients, and our
              team members handle client support outside regular office
              hours as well. Our office hours are {contactInfo.hoursDisplay}.
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/faq" className={textLinkClass}>
            Read our FAQ
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link href="/contact" className={textLinkClass}>
            Contact us
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
