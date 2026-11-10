"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Bot, Cpu, ShoppingBag, Clapperboard, PenTool, TrendingUp } from "lucide-react";
import { aboutFacts } from "@/data/aboutFacts";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// Roles across the team. Gradients reuse the palette already used by the
// services cards, so these tiles stay in the site's existing visual language.
const roles = [
  {
    icon: Bot,
    title: "AI Developers",
    description: "AI integrations, automation and intelligent features.",
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
  },
  {
    icon: Cpu,
    title: "AI Software Developers",
    description: "Custom software with AI at its core.",
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 60%, #7CE6F7 100%)",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Developers",
    description: "Custom themes, apps and checkout tuning.",
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
  },
  {
    icon: Clapperboard,
    title: "Video & Animation Developers",
    description: "Explainer videos, 2D animation and motion graphics.",
    gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",
  },
  {
    icon: PenTool,
    title: "Graphic Designers",
    description: "Identity systems, decks and campaign assets.",
    gradient: "linear-gradient(155deg, #22D3EE 0%, #1547E0 65%, #0B1C4D 100%)",
  },
  {
    icon: TrendingUp,
    title: "SEO Specialists",
    description: "Technical audits, content strategy and link building.",
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
  },
];

export default function AboutTeam() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Our Team
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            A {aboutFacts.teamSize}-member team, one workflow
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            Code &amp; Motions is a team of {aboutFacts.teamSize}{" "}
            professionals, including our founder, working across AI
            development, AI software development, Shopify development, video
            and animation, graphic design and SEO. As a{" "}
            <Link
              href="/services/software-development"
              className="font-semibold text-(--color-blue) underline-offset-4 hover:underline"
            >
              software development company in Pakistan
            </Link>
            , we keep these specialists in one workflow, so your project is
            never handed between departments.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-6"
        >
          {roles.map(({ icon: Icon, title, description, gradient }) => (
            <motion.div
              key={title}
              variants={item}
              // Subtle pop on hover. Transform-only, so nothing around the
              // card shifts; skipped for visitors who prefer reduced motion.
              // Touch screens have no hover, so it never fires there.
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4, scale: 1.03, transition: { duration: 0.25, ease: easeOut } }
              }
              className="group"
            >
              <div
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-18px_rgba(11,28,77,0.45)]"
                style={{ background: gradient }}
              >
                {/* diagonal corner accent, echoing the reference structure without copying it */}
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-white/10"
                />
                <Icon
                  size={34}
                  className="text-white transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
