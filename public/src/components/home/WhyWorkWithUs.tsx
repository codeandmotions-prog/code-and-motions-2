"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Target,
  Layers,
  Cpu,
  MessageCircle,
  TrendingUp,
  Circle,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const benefits = [
  {
    number: "01",
    icon: Target,
    title: "Business-Focused Solutions",
    description:
      "We build custom digital solutions around your business goals, users, and long-term growth.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Full-Service Digital Expertise",
    description:
      "Software development, web development, Shopify, AI, design, explainer videos, 2D animation, and SEO — all under one team.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Modern Technology",
    description:
      "We use modern technologies and creative solutions to create fast, scalable, and reliable digital products.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "Stay informed throughout your project with clear communication, progress updates, and a straightforward workflow.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Built to Grow",
    description:
      "Our websites, software, Shopify stores, and digital solutions are designed for scalability, performance, and long-term growth.",
  },
];

// Illustrative dashboard mockup only — category-level examples of the kind
// of work we do, not real client names, and no fabricated metrics. Status
// is shown as a qualitative label rather than an invented percentage.
const projectRows = [
  {
    name: "Website Redesign",
    category: "Website Development",
    status: "In Progress",
    fill: 68,
    barColor: "#1547E0",
  },
  {
    name: "Shopify Storefront",
    category: "Shopify Development",
    status: "Completed",
    fill: 100,
    barColor: "#22C55E",
  },
  {
    name: "AI Chat Automation",
    category: "AI Solutions",
    status: "In Review",
    fill: 52,
    barColor: "#22D3EE",
  },
  {
    name: "Brand Identity System",
    category: "Graphic Design",
    status: "Planning",
    fill: 20,
    barColor: "#7CE6F7",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-14">
          {/* left column */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-(--color-cyan)/30 bg-(--color-cyan)/[0.08] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-(--color-blue)"
            >
              Why Work With Code &amp; Motions
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] text-(--color-ink) sm:text-[42px] lg:text-[46px]"
            >
              We&apos;re Not Just a Digital Agency.
              <span className="block text-(--color-blue)">
                We&apos;re Your Growth Partner.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-(--color-ink-soft)"
            >
              We help startups, small businesses, and growing companies
              build high-performing digital solutions — from custom
              software and websites to Shopify, AI, design, explainer
              videos, 2D animation, and SEO.
            </motion.p>

            <div className="mt-11 space-y-8">
              {benefits.map(({ number, icon: Icon, title, description }) => (
                <motion.div key={number} variants={fadeUp} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                    <Icon size={19} className="text-white" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="flex items-baseline gap-2 text-[16.5px] font-bold text-(--color-ink)">
                      <span className="text-[13px] font-bold text-(--color-blue)">
                        {number} —
                      </span>
                      {title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#start-a-project"
                className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink)"
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-(--color-line) px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
              >
                About Code &amp; Motions
              </Link>
            </motion.div>
          </motion.div>

          {/* right column — illustrative dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: easeOut }}
            className="lg:sticky lg:top-28"
          >
            <div className="overflow-hidden rounded-[24px] border border-(--color-line) bg-(--color-navy-deep) shadow-[0_40px_90px_-40px_rgba(11,28,77,0.45)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="flex gap-1.5">
                  <Circle size={9} className="fill-[#FF5F57] text-[#FF5F57]" />
                  <Circle size={9} className="fill-[#FEBC2E] text-[#FEBC2E]" />
                  <Circle size={9} className="fill-[#28C840] text-[#28C840]" />
                </span>
                <span className="ml-2 text-[13px] font-medium text-white/50">
                  Active Projects
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {projectRows.map(({ name, category, status, fill, barColor }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-semibold text-white">
                        {name}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-white/45">{category}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2.5">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:w-20">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${fill}%`, backgroundColor: barColor }}
                        />
                      </span>
                      <span
                        className="whitespace-nowrap text-[12px] font-semibold"
                        style={{ color: status === "Completed" ? "#4ADE80" : "#7CE6F7" }}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-5 py-4 text-[12.5px] font-medium text-white/50 sm:px-6">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--color-cyan)" />
                  Tracked from kickoff to launch
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--color-blue-bright)" />
                  Built for scale
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
