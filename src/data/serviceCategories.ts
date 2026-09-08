import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Globe,
  ShoppingBag,
  Clapperboard,
  PenTool,
  TrendingUp,
} from "lucide-react";

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Same brand-gradient language used by the homepage service cards,
   * so this page reads as part of the same design system. */
  gradient: string;
  subServices: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "software-development",
    title: "Software Development",
    description:
      "Custom platforms and internal tools engineered to handle real workloads.",
    icon: Code2,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
    subServices: [
      "Custom Software",
      "SaaS Development",
      "Web Applications",
      "AI Development",
      "API Development & Integrations",
      "CRM & ERP Solutions",
      "Automation & Internal Tools",
    ],
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Fast, accessible sites built on modern frameworks and designed to convert.",
    icon: Globe,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 60%, #7CE6F7 100%)",
    subServices: [
      "Custom Website",
      "Business Website",
      "WordPress Development",
      "Elementor Development",
      "Landing Pages",
      "Web Application",
      "Website Redesign & Maintenance",
    ],
  },
  {
    id: "shopify-development",
    title: "Shopify Development",
    description:
      "Custom themes, apps and migrations built to turn browsers into revenue.",
    icon: ShoppingBag,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    subServices: [
      "Shopify Store Development",
      "Shopify Theme Customization",
      "Shopify 2.0",
      "Custom Shopify Development",
      "Shopify Apps & Integrations",
      "Shopify Migration",
      "WooCommerce → Shopify",
    ],
  },
  {
    id: "video-animation",
    title: "Video & Animation",
    description:
      "Motion graphics and edits that give your brand a pulse on every screen.",
    icon: Clapperboard,
    gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",
    subServices: [
      "2D Animation",
      "Explainer Videos",
      "Motion Graphics",
      "Logo Animation",
      "Product Animation",
      "Social Media Videos",
      "Promotional Videos",
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Identity systems and campaign assets designed to stay sharp everywhere.",
    icon: PenTool,
    gradient: "linear-gradient(155deg, #22D3EE 0%, #1547E0 65%, #0B1C4D 100%)",
    subServices: [
      "Logo Design",
      "Brand Identity",
      "Social Media Design",
      "UI/UX Design",
      "Website Graphics",
      "Marketing Materials",
      "Presentation Design",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Technical, on-page and off-page strategy that moves you up the results.",
    icon: TrendingUp,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    subServices: [
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Local SEO",
      "E-commerce SEO",
      "Keyword Research",
      "SEO Audit & Optimization",
    ],
  },
];
