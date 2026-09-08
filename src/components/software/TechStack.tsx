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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

type TechStackProps = {
  slug: string;
};

export default function TechStack({ slug }: TechStackProps) {
  const product = getSoftwareProduct(slug);
  if (!product) return null;
  const { tech, accentColor } = product;

  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Technology
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-(--color-ink-soft)">
            Built on a stack chosen for reliability and security.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {tech.map(({ id, title, description, icon: Icon }) => (
            <motion.div
              key={id}
              variants={item}
              className="rounded-[24px] border border-(--color-line) bg-white p-8"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${accentColor}1A` }}
              >
                <Icon size={26} style={{ color: accentColor }} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[19px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
