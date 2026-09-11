"use client";

import { motion, type Variants } from "framer-motion";
import { PenTool, Code2, Clapperboard, LineChart } from "lucide-react";

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

const disciplines = [
  {
    icon: PenTool,
    title: "Design",
    description: "Brand, product and interface design.",
    gradient: "linear-gradient(155deg, #22D3EE 0%, #1547E0 65%, #0B1C4D 100%)",
  },
  {
    icon: Code2,
    title: "Engineering",
    description: "Software, web and Shopify development.",
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
  },
  {
    icon: Clapperboard,
    title: "Motion & Video",
    description: "Animation, editing and motion graphics.",
    gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",
  },
  {
    icon: LineChart,
    title: "Strategy & Growth",
    description: "SEO, content and performance strategy.",
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
  },
];

export default function AboutTeam() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Our Team
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            The disciplines behind every project
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            A small, senior team spanning design, engineering, motion and
            growth — working together on every build rather than handing
            your project between departments.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {disciplines.map(({ icon: Icon, title, description, gradient }) => (
            <motion.div key={title} variants={item} className="group">
              <div
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px]"
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
