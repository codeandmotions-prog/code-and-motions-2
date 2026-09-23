"use client";

import { motion, type Variants } from "framer-motion";
import { getSoftwareProduct } from "@/data/softwareProducts";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

type HowItWorksProps = {
  slug: string;
};

export default function HowItWorks({ slug }: HowItWorksProps) {
  const product = getSoftwareProduct(slug);
  if (!product) return null;
  const { name: productName, workflow, accentColor } = product;

  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            How {productName} Works
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-(--color-ink-soft)">
            From setup to growth, in four simple steps.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {/* connecting line, desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-(--color-line) lg:block"
          />

          {workflow.map(({ id, step, title, description, icon: Icon }) => (
            <motion.div key={id} variants={item} className="relative flex flex-col items-start">
              <span
                className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl text-white"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 16px 32px -16px ${accentColor}99`,
                }}
              >
                <Icon size={22} strokeWidth={1.9} />
              </span>
              <span
                className="mt-4 text-[12.5px] font-bold uppercase tracking-[0.12em]"
                style={{ color: accentColor }}
              >
                Step {step}
              </span>
              <h3 className="mt-1.5 text-[19px] font-bold text-(--color-ink)">{title}</h3>
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
