/**
 * Shop categories.
 *
 * The shop is organised as Shop → Category → Design. Only Home Décor exists
 * today. To add a category later:
 *   1. add its id to ShopCategoryId in ./shop.ts and tag designs with it,
 *   2. add an entry to `shopCategories` below.
 * The /shop landing page, the /shop/category/[category] route, the sitemap and
 * the breadcrumbs all read from this list, so nothing else needs to change.
 */
import { shopDesigns, type ShopCategoryId, type ShopDesign } from "./shop";

export type ShopCategory = {
  id: ShopCategoryId;
  /** URL segment: /shop/category/<slug>. */
  slug: string;
  name: string;
  /** One short line for the category card. */
  tagline: string;
  /** Slugs of real designs used as the card artwork (first is the lead image). */
  previewSlugs: [string, string, string];
};

export const shopCategories: ShopCategory[] = [
  {
    id: "home-decor",
    slug: "home-decor",
    name: "Home Décor",
    tagline: "3D flex wallpaper for ceilings and feature walls, from soft florals to marble and gold.",
    previewSlugs: ["royal-designs-r-01", "collection-2025-room-02", "polite-designs-room-51"],
  },
];

export function categoryHref(category: ShopCategory): string {
  return `/shop/category/${category.slug}`;
}

export function getShopCategory(slug: string): ShopCategory | undefined {
  return shopCategories.find((c) => c.slug === slug);
}

export function getShopCategoryById(id: ShopCategoryId): ShopCategory {
  const category = shopCategories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown shop category: ${id}`);
  return category;
}

export function designsInCategory(category: ShopCategory): ShopDesign[] {
  return shopDesigns.filter((d) => d.category === category.id);
}

export function previewDesigns(category: ShopCategory): ShopDesign[] {
  return category.previewSlugs
    .map((slug) => shopDesigns.find((d) => d.slug === slug))
    .filter((d): d is ShopDesign => Boolean(d));
}
