import type { SubService } from "../../subServiceTypes";
import { twoDAnimationServices } from "./twoDAnimation";
import { threeDAnimationServices } from "./threeDAnimation";
import { threeDProductAnimationServices } from "./threeDProductAnimation";
import { whiteboardAnimationServices } from "./whiteboardAnimation";
import { motionGraphicsServices } from "./motionGraphics";
import { explainerVideoProduction } from "./explainerVideos";
import { saasExplainerVideoProduction } from "./saasExplainerVideos";
import { productExplainerVideos } from "./productExplanationVideos";
import { saasProductDemoVideos } from "./saasProductDemoVideos";
import { promotionalVideoProduction } from "./promotionalVideos";
import { corporateVideoProduction } from "./corporateVideoProduction";
import { socialMediaVideoProduction } from "./socialMediaVideos";
import { aiVideoAutomation } from "./aiVideoAutomation";

/**
 * Sub-services nested under /services/video-animation/{slug}.
 *
 * Each page owns its own primary keyword and leaves its neighbours' wording
 * alone, so the pages do not compete with each other in search:
 *  - 2D, 3D, 3D product and whiteboard animation: one page per animation style
 *  - Motion graphics: non-narrative animated graphics, titles and data
 *  - Explainer, SaaS explainer, product explainer and SaaS demo: one page per
 *    kind of explanation (general, software, feature-level, real interface)
 *  - Promotional, corporate (live-action) and social media video
 *
 * The earlier Short/Reels/TikTok page was folded into Social Media Videos; its
 * old URL redirects there (see next.config.ts).
 *
 * "AI Video Automation" has no page here. It reuses the existing page at
 * /services/ai-development/ai-video-development through externalHref.
 */
export const videoAnimationSubServices: SubService[] = [
  twoDAnimationServices,
  threeDAnimationServices,
  threeDProductAnimationServices,
  whiteboardAnimationServices,
  motionGraphicsServices,
  explainerVideoProduction,
  saasExplainerVideoProduction,
  productExplainerVideos,
  saasProductDemoVideos,
  promotionalVideoProduction,
  corporateVideoProduction,
  socialMediaVideoProduction,
  aiVideoAutomation,
];
