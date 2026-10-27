import type { LucideIcon } from "lucide-react";

/** Which small illustration to show on the homepage card and the page hero. */
export type AiServiceKind = "agent" | "chatbot" | "workflow" | "voice" | "saas";

export type AiServiceFaq = { question: string; answer: string };

export type AiServiceLink = {
  label: string;
  href: string;
  description: string;
};

export type AiServiceContent = {
  /** URL segment under /services/ai-development/ */
  slug: string;
  /** Short name used on the homepage card and in breadcrumbs. */
  name: string;
  kind: AiServiceKind;
  icon: LucideIcon;
  gradient: string;

  /** Homepage card copy. */
  cardDescription: string;
  cardTags: string[];

  /** Metadata (the root layout appends " | Code & Motions"). */
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];

  /** Hero. */
  h1: string;
  intro: string;

  /** "What is it?" direct answer. */
  definition: { question: string; answer: string };

  howItWorks: {
    heading: string;
    intro: string;
    steps: { title: string; description: string }[];
  };

  useCases: {
    heading: string;
    intro: string;
    items: { title: string; scenario: string; stays: string }[];
  };

  features: { title: string; description: string }[];
  benefits: { title: string; description: string }[];

  whoShouldConsider: { heading: string; items: string[] };

  notYet: {
    heading: string;
    intro: string;
    items: {
      title: string;
      description: string;
      alternative: string;
      /** Optional link to one of our own pages that covers the simpler alternative. */
      alternativeLink?: { label: string; href: string };
    }[];
  };

  challenges: { challenge: string; approach: string }[];

  considerations: { title: string; description: string }[];
  limitations: string[];

  faqs: AiServiceFaq[];
  related: AiServiceLink[];

  ctaHeadline: string;
  ctaSubtext: string;
};
