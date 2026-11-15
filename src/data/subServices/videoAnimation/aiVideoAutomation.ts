import { Bot } from "lucide-react";
import type { SubService } from "../../subServiceTypes";

/**
 * AI Video Automation deliberately has no dedicated page here. It already has
 * one at /services/ai-development/ai-video-development, built in the AI
 * Development pass. Its card reuses that page via externalHref instead of
 * generating a near-duplicate.
 */
export const aiVideoAutomation: SubService = {
  slug: "ai-video-automation",
  name: "AI Video Automation",
  shortDescription:
    "AI-assisted video production and repurposing — automated editing and workflows built on top of our video & animation work.",
  tags: ["AI video automation", "AI-assisted video production", "automated video editing"],
  icon: Bot,
  gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
  externalHref: "/services/ai-development/ai-video-development",
};
