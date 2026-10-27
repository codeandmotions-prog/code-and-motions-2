"use client";

import { MotionConfig } from "framer-motion";
import type { ShopDesign } from "@/data/shop";
import ShopCategoryCard from "./ShopCategoryCard";

export type ShopCategoryView = {
  id: string;
  name: string;
  tagline: string;
  href: string;
  designs: ShopDesign[];
  previews: ShopDesign[];
};

/** Categories section of the /shop landing page. Serialisable props only (server → client). */
export default function ShopCategories({ categories }: { categories: ShopCategoryView[] }) {
  // One category fills the row; once there are more they sit in a grid.
  const layout = categories.length === 1 ? "wide" : "tile";
  return (
    <MotionConfig reducedMotion="user">
      <section id="categories" aria-labelledby="categories-heading" className="bg-(--color-surface) py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">Categories</span>
            <h2
              id="categories-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
            >
              Browse by category
            </h2>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <ShopCategoryCard
                key={category.id}
                name={category.name}
                tagline={category.tagline}
                href={category.href}
                designCount={category.designs.length}
                collectionCount={new Set(category.designs.map((d) => d.collection)).size}
                previews={category.previews}
                layout={layout}
                index={i}
              />
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
