"use client";

import { motion, type Variants } from "framer-motion";
import SubServiceCard from "./SubServiceCard";
import { getSubServicesForMainService } from "@/data/subServices";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
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

type SubServicesGridProps = {
  mainSlug: string;
  heading?: string;
  subheading?: string;
};

/**
 * Looks up its sub-services internally from mainSlug (a plain,
 * serializable string) rather than receiving the array as a prop —
 * each sub-service carries a Lucide icon component (a function), and
 * functions can't be passed from a Server Component into a Client
 * Component as a prop value.
 */
export default function SubServicesGrid({
  mainSlug,
  heading = "Sub-Services",
  subheading = "Each sub-service has its own dedicated page with the detail you need to scope a project.",
}: SubServicesGridProps) {
  const subServices = getSubServicesForMainService(mainSlug);

  if (subServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            Sub-Services
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
            {heading}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">{subheading}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {subServices.map((service) => (
            <motion.div key={service.slug} variants={item} className="h-full">
              <SubServiceCard service={service} mainSlug={mainSlug} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
