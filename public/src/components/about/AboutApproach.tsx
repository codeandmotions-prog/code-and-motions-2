"use client";

import { motion, type Variants } from "framer-motion";
import { Target, Layers, LineChart, Clock } from "lucide-react";

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

const principles = [
  {
    icon: Target,
    title: "We Start With Your Business",
    description:
      "Every decision — technical or creative — gets tied back to what actually moves your business forward, not what looks impressive in a portfolio.",
  },
  {
    icon: Layers,
    title: "Design and Engineering, Together",
    description:
      "The same team that designs the experience builds it, so nothing gets lost translating a mockup into working software.",
  },
  {
    icon: LineChart,
    title: "Experience Across Disciplines",
    description:
      "From backend systems to brand identity, our team has hands-on experience across the six disciplines we offer — not just one narrow specialty.",
  },
  {
    icon: Clock,
    title: "Built for the Long Run",
    description:
      "We stay involved after launch, treating every project as something we're accountable for well past delivery day.",
  },
];

export default function AboutApproach() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Our Approach
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Why clients work with us
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {principles.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="rounded-[24px] border border-(--color-line) bg-white p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
                <Icon size={22} className="text-(--color-blue)" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
