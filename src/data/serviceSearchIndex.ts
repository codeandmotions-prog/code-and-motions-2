import { serviceCategories } from "./serviceCategories";
import { subServicesByMainSlug } from "./subServices";
import { aiSubServices } from "./aiDevelopment";
import { aiServices, aiServiceHref } from "./aiServices";

/**
 * One searchable, real service page. Built from the same data the site's
 * pages and sitemap are generated from, so every result links to a page that
 * exists and nothing is listed that the site does not actually offer.
 */
export type ServiceSearchItem = {
  title: string;
  href: string;
  /** Parent service shown under the title, e.g. "Shopify Development". */
  category: string;
  /** Extra words people may type for this page (tags and page keywords). */
  keywords: string;
};

/**
 * Server-side only: the page data is large, so the homepage builds this small
 * list on the server and passes it to the client search as plain props.
 */
export function getServiceSearchItems(): ServiceSearchItem[] {
  const byHref = new Map<string, ServiceSearchItem>();

  function add(title: string, href: string, category: string, keywords: string[]) {
    const extra = keywords.filter(Boolean).join(" ");
    const existing = byHref.get(href);
    if (existing) {
      // Two cards that point at the same page: keep one result, merge its words.
      existing.keywords = `${existing.keywords} ${extra}`.trim();
      return;
    }
    byHref.set(href, { title, href, category, keywords: extra });
  }

  // 1. Main service pages. The offerings listed on each main page become
  //    search words for that page, not separate results.
  for (const category of serviceCategories) {
    add(category.title, `/services/${category.id}`, "Service", category.subServices);
  }

  // 2. AI Development pages (added before the other sub-services so their
  //    own names win when a sub-service card links to one of them).
  for (const ai of aiSubServices) {
    add(ai.name, `/services/ai-development/${ai.slug}`, "AI Development", [
      ...ai.tags,
      ai.primaryKeyword,
      ...ai.secondaryKeywords,
    ]);
  }
  for (const ai of aiServices) {
    add(ai.name, aiServiceHref(ai.slug), "AI Development", [
      ...ai.cardTags,
      ai.primaryKeyword,
      ...ai.secondaryKeywords,
    ]);
  }

  // 3. Every sub-service page under the main services.
  for (const category of serviceCategories) {
    for (const sub of subServicesByMainSlug[category.id] ?? []) {
      if (sub.externalHref) {
        add(sub.name, sub.externalHref, category.title, sub.tags);
      } else if ("primaryKeyword" in sub) {
        add(sub.name, `/services/${category.id}/${sub.slug}`, category.title, [
          ...sub.tags,
          sub.primaryKeyword,
          ...sub.secondaryKeywords,
        ]);
      }
    }
  }

  return [...byHref.values()];
}
