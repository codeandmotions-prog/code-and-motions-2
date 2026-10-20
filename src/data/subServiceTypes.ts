import type { LucideIcon } from "lucide-react";

/**
 * Shared shape for a "sub-service" dedicated page, nested under one of
 * the main service pages (e.g. /services/software-development/{slug}).
 * Deliberately mirrors the existing AiSubService shape in
 * data/aiDevelopment.ts so the same page template and components
 * (ServiceDefinition, ServiceOverview, ServiceUseCases, ServiceProcessSteps,
 * ServiceFAQSection, ClosingCTA) can be reused without duplicating any of
 * them — only the content differs per sub-service.
 */

export type SubServiceFAQ = {
  question: string;
  answer: string;
};

export type SubServiceBenefit = {
  title: string;
  description: string;
};

export type SubServiceProcessStep = {
  title: string;
  description: string;
};

export type SubServiceLink = {
  label: string;
  href: string;
  description: string;
};

/**
 * One long-form article section (rendered as an H2, with optional H3
 * subsections). Text supports internal links written as [label](/path).
 */
export type SubServiceSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: { title?: string; text: string }[];
  subsections?: {
    heading: string;
    paragraphs?: string[];
    bullets?: { title?: string; text: string }[];
  }[];
};

export type SubServiceHeroCtas = {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

/** Fields shown on the card — common to every sub-service, page or not. */
type SubServiceCardFields = {
  /** URL slug — the dedicated page (when one exists) lives at /services/{mainSlug}/{slug} */
  slug: string;
  name: string;
  /** Short, premium description shown on the sub-service card. */
  shortDescription: string;
  /** Short keyword chips shown on the card — not full sentences. */
  tags: string[];
  icon: LucideIcon;
  gradient: string;
};

/** Full dedicated-page content — required for every sub-service that gets its own page. */
type SubServicePageContent = {
  externalHref?: undefined;

  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;

  /** Direct-answer AEO definition block, rendered right after the hero. */
  whatIsQuestion: string;
  whatIsAnswer: string;

  capabilitiesHeading: string;
  capabilities: string[];

  benefitsHeading: string;
  benefits: SubServiceBenefit[];

  /** "Who this is for" / use-case / industry block. */
  useCasesHeading?: string;
  useCases?: string[];

  processHeading?: string;
  process?: SubServiceProcessStep[];

  faqHeading: string;
  faqs: SubServiceFAQ[];

  /** Real, internal "see also" link (usually back to the parent main service). */
  relatedLink: SubServiceLink;
  /** Optional link down to a relevant free tool. */
  relatedTool?: SubServiceLink;

  // ── Optional long-form extensions (all backward compatible) ──────────
  /** When set, the hero renders in the premium style with these two CTAs. */
  heroCtas?: SubServiceHeroCtas;
  /** Long-form article sections rendered right after the definition block. */
  sections?: SubServiceSection[];
  /** Long-form sections rendered after the process block, before the FAQs. */
  laterSections?: SubServiceSection[];
  /** Extra contextual internal links, rendered as a "Related services" block. */
  relatedLinks?: SubServiceLink[];
  /** Tailored closing CTA copy. */
  closingCta?: { headline: string; subtext: string };
};

/**
 * A sub-service whose card deliberately links straight to an existing,
 * already-dedicated page elsewhere on the site (e.g. "AI Software
 * Development" already has a full page under
 * /services/ai-development/ai-software-development) instead of
 * generating a near-duplicate page at a second URL. No page-content
 * fields are needed or generated for these.
 */
type SubServiceExternalLink = {
  externalHref: string;
};

export type SubService = SubServiceCardFields & (SubServicePageContent | SubServiceExternalLink);

/** One main service's full sub-service set. */
export type SubServiceGroup = {
  /** Must match a serviceCategories id (the parent main service's slug). */
  mainSlug: string;
  subServices: SubService[];
};
