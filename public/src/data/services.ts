import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Globe,
  Clapperboard,
  PenTool,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Card background, expressed as a CSS gradient so every tile reads as
   * a distinct, deliberate surface rather than a repeated grey card. */
  gradient: string;
  /** Foreground ink color tuned for contrast against the gradient. */
  ink: string;
};

export const services: Service[] = [
  {
    id: "software-development",
    title: "Software Development",
    description:
      "Custom platforms and internal tools built to handle real workloads, from first prototype to production.",
    icon: Code2,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
    ink: "#EEF2FF",
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Fast, accessible sites engineered on modern frameworks and designed to convert visitors into customers.",
    icon: Globe,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 60%, #7CE6F7 100%)",
    ink: "#FFFFFF",
  },
  {
    id: "video-animation",
    title: "Video & Animation",
    description:
      "Motion graphics, product films and social edits that give your brand a pulse across every screen.",
    icon: Clapperboard,
    gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",
    ink: "#F5F6FA",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Identity systems, decks and campaign assets designed to stay sharp across print and digital.",
    icon: PenTool,
    gradient: "linear-gradient(155deg, #22D3EE 0%, #1547E0 65%, #0B1C4D 100%)",
    ink: "#FFFFFF",
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Technical audits, content strategy and link building that move you up the results that matter.",
    icon: TrendingUp,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    ink: "#EEF2FF",
  },
  {
    id: "shopify-development",
    title: "Shopify Development",
    description:
      "Custom themes, apps and checkout tuning built to turn browsers into a growing revenue line.",
    icon: ShoppingBag,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    ink: "#FFFFFF",
  },
];
