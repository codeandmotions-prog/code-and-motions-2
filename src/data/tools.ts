import type { LucideIcon } from "lucide-react";
import { Gauge, RefreshCw, Calculator } from "lucide-react";

export type FreeTool = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  /**
   * Set once a tool's real functionality ships. Tools without an `href`
   * still render on the /tools landing page, just with a "Coming Soon"
   * badge instead of a working link.
   */
  href?: string;
};

/**
 * Landing-page entries for the free tools we're building out. Tools 2
 * and 3 still ship later — those cards render as "Coming Soon" until
 * they have an `href`.
 */
export const freeTools: FreeTool[] = [
  {
    slug: "shopify-speed-app-bloat-checker",
    name: "Shopify Speed & App Bloat Checker",
    description:
      "Check how much your installed apps are slowing your Shopify store down, and see which ones are worth keeping.",
    icon: Gauge,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
    href: "/tools/shopify-speed-checker",
  },
  {
    slug: "woocommerce-to-shopify-migration-readiness",
    name: "WooCommerce → Shopify Migration Readiness",
    description:
      "Answer a few questions about your WooCommerce store and get a readiness score before you plan a Shopify migration.",
    icon: RefreshCw,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
  },
  {
    slug: "saas-mvp-cost-timeline-estimator",
    name: "SaaS MVP Cost & Timeline Estimator",
    description:
      "Get a realistic cost and timeline range for building your SaaS MVP, based on the features you actually need.",
    icon: Calculator,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
  },
];
