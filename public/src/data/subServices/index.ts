import type { SubService } from "../subServiceTypes";
import { softwareDevelopmentSubServices } from "./softwareDevelopment";
import { websiteDevelopmentSubServices } from "./websiteDevelopment";
import { shopifyDevelopmentSubServices } from "./shopifyDevelopment";
import { videoAnimationSubServices } from "./videoAnimation";

/**
 * All sub-service groups, keyed by their parent main service's slug
 * (matching serviceCategories ids). Adding a new main service's
 * sub-services means adding one entry here — nothing else needs to
 * change: the [slug]/page.tsx grid, the [slug]/[subSlug]/page.tsx
 * route and the sitemap all read from this single map.
 */
export const subServicesByMainSlug: Record<string, SubService[]> = {
  "software-development": softwareDevelopmentSubServices,
  "website-development": websiteDevelopmentSubServices,
  "shopify-development": shopifyDevelopmentSubServices,
  "video-animation": videoAnimationSubServices,
};

export function getSubServicesForMainService(mainSlug: string): SubService[] {
  return subServicesByMainSlug[mainSlug] ?? [];
}

export function getSubService(mainSlug: string, subSlug: string): SubService | undefined {
  return getSubServicesForMainService(mainSlug).find((s) => s.slug === subSlug);
}

/**
 * Every real {slug, subSlug} pair that should get its own generated page.
 * Sub-services with an externalHref are intentionally excluded — their
 * card links to an existing dedicated page elsewhere instead of
 * generating a near-duplicate one.
 */
export function getAllSubServiceParams(): { slug: string; subSlug: string }[] {
  return Object.entries(subServicesByMainSlug).flatMap(([mainSlug, subs]) =>
    subs.filter((s) => !s.externalHref).map((s) => ({ slug: mainSlug, subSlug: s.slug }))
  );
}
