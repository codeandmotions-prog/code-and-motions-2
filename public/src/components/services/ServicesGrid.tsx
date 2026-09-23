"use client";

import { motion, type Variants } from "framer-motion";
import { serviceCategories } from "@/data/serviceCategories";
import ServiceCategoryCard from "./ServiceCategoryCard";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function ServicesGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
    >
      {serviceCategories.map((category) => (
        <motion.div key={category.id} variants={item} className="h-full">
          <ServiceCategoryCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
}
