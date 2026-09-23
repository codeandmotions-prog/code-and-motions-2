"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { services } from "@/data/services";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export default function AboutIntro() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Who We Are
            </span>
            <h2 className="mt-4 max-w-lg text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              A digital agency built around one accountable team.
            </h2>
            <div className="mt-6 max-w-lg space-y-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
              <p>
                Code & Motions is a digital agency that designs, develops
                and grows digital products for businesses that want to move
                faster than their competitors. We work across software,
                web, Shopify, video, design and SEO — bringing every
                discipline a modern brand needs under one roof.
              </p>
              <p>
                Instead of handing your project between separate vendors,
                one team carries it from first sketch to production and
                beyond. That means fewer handoffs, clearer communication,
                and a build that actually holds together.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15 }}
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              What We Do
            </span>
            <h2 className="mt-4 text-[22px] font-bold text-(--color-ink)">
              Six disciplines, one workflow
            </h2>
            <ul className="mt-6 divide-y divide-(--color-line) border-t border-(--color-line)">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="group flex items-center justify-between py-4 text-[15.5px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-blue)"
                  >
                    {service.title}
                    <span
                      aria-hidden="true"
                      className="text-(--color-ink-soft) transition-transform duration-300 group-hover:translate-x-1 group-hover:text-(--color-blue)"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
