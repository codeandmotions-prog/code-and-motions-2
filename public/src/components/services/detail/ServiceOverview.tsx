"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import type { ServiceBenefit, ServiceExampleWork } from "@/data/serviceDetails";

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

type ServiceOverviewProps = {
  title: string;
  offerings: string[];
  benefits: ServiceBenefit[];
  heading?: string;
  exampleWork?: ServiceExampleWork;
};

export default function ServiceOverview({
  title,
  offerings,
  benefits,
  heading = "Built for real results",
  exampleWork,
}: ServiceOverviewProps) {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              What We Offer
            </span>
            <h2 className="mt-4 text-[26px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[30px]">
              {title}, covered end to end
            </h2>

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2"
            >
              {offerings.map((offering) => (
                <motion.li
                  key={offering}
                  variants={item}
                  className="flex items-start gap-2.5 text-[14.5px] text-(--color-ink-soft)"
                >
                  <Check size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-(--color-blue)" />
                  <span>{offering}</span>
                </motion.li>
              ))}
            </motion.ul>

            {exampleWork && (
              <Link
                href={exampleWork.href}
                className="group mt-6 flex items-start gap-3 rounded-2xl border border-(--color-line) bg-(--color-surface) p-5 transition-colors hover:border-(--color-blue)/40"
              >
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-(--color-blue) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="text-[14px] leading-relaxed text-(--color-ink-soft)">
                  <span className="font-semibold text-(--color-ink)">
                    Real example: {exampleWork.label}.
                  </span>{" "}
                  {exampleWork.description}
                </span>
              </Link>
            )}
          </div>

          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Why It Works
            </span>
            <h2 className="mt-4 text-[26px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[30px]">
              {heading}
            </h2>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 divide-y divide-(--color-line) border-t border-(--color-line)"
            >
              {benefits.map((benefit) => (
                <motion.div key={benefit.title} variants={item} className="py-5">
                  <h3 className="text-[15.5px] font-bold text-(--color-ink)">{benefit.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-(--color-ink-soft)">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
