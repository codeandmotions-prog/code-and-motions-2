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

type WhoItsForProps = {
  slug: string;
};

export default function WhoItsFor({ slug }: WhoItsForProps) {
  const product = getSoftwareProduct(slug);
  if (!product) return null;
  const { audiences, audiencesHeading, audiencesIntro, accentColor } = product;

  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            {audiencesHeading}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-(--color-ink-soft)">
            {audiencesIntro}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6"
        >
          {audiences.map(({ id, title, description, icon: Icon }) => (
            <motion.div
              key={id}
              variants={item}
              className="flex flex-col items-start rounded-2xl border border-(--color-line) bg-(--color-surface) p-6"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: accentColor }}
              >
                <Icon size={19} className="text-white" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
