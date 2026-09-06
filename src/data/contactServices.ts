import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Globe,
  ShoppingBag,
  TrendingUp,
  Clapperboard,
  PenTool,
  Sparkles,
} from "lucide-react";

export type ContactService = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const contactServices: ContactService[] = [
  { id: "software-development", label: "Software Development", icon: Code2 },
  { id: "website-development", label: "Website Development", icon: Globe },
  { id: "shopify-development", label: "Shopify Development", icon: ShoppingBag },
  { id: "seo", label: "SEO", icon: TrendingUp },
  { id: "video-animation", label: "Video & Animation", icon: Clapperboard },
  { id: "graphic-design", label: "Graphic Design", icon: PenTool },
  { id: "other", label: "Other", icon: Sparkles },
];
