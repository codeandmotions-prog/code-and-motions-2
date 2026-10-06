import { PenTool, Film, PlayCircle, Layers, Rocket, Monitor, Smartphone, Clapperboard, Bot } from "lucide-react";
import type { SubService } from "../subServiceTypes";

/**
 * Sub-services nested under /services/video-animation/{slug}.
 *
 * "AI Video Automation" deliberately has no dedicated page here — it
 * already has one at /services/ai-development/ai-video-development
 * (built in the AI Development pass). Its card reuses that page via
 * externalHref instead of generating a near-duplicate.
 *
 * The other 8 are intentionally differentiated by format and use case
 * rather than restated as near-synonyms:
 *  - 2D Animated Explainer Videos: the illustrated/animated technique itself
 *  - Explainer Videos: the broader explainer format/category, style-agnostic
 *  - Product Explanation Videos: feature-walkthrough angle for a specific product
 *  - Motion Graphics: non-narrative graphic animation (titles, data, brand assets)
 *  - SaaS Explainer Videos: vertical-specific framing for software landing pages
 *  - SaaS Product Demo Videos: screen-recording/UI-walkthrough format, not animated
 *  - Social Media Videos: short-form platform-native content generally
 *  - Short/Reels/TikTok Videos: the Reels/TikTok/Shorts-specific sub-category
 */
export const videoAnimationSubServices: SubService[] = [
  {
    slug: "2d-animated-explainer-videos",
    name: "2D Animated Explainer Videos",
    shortDescription:
      "Illustrated, fully animated explainer videos — custom characters and scenes built to explain an idea visually.",
    tags: ["2D animated explainer video", "animated explainer video", "2D animation video"],
    icon: PenTool,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "2D Animated Explainer Video Production",
    metaDescription:
      "Custom 2D animated explainer videos — illustrated characters and scenes built to explain your product or idea, for businesses in the USA, UK and Europe.",
    h1: "2D Animated Explainer Videos",
    primaryKeyword: "2D animated explainer video",
    secondaryKeywords: ["animated explainer video production", "2D animation video", "illustrated explainer video"],
    intro:
      "We produce fully illustrated, 2D animated explainer videos — custom characters, scenes and motion built from scratch to explain an idea, product or process visually, rather than relying on stock footage or screen recordings.",
    whatIsQuestion: "What Is A 2D Animated Explainer Video?",
    whatIsAnswer:
      "A 2D animated explainer video is a fully illustrated video — custom-drawn characters, scenes and motion — used to explain an idea, product or process visually, as opposed to live-action footage or a screen-recorded demo. At Code & Motions, this is the illustrated-animation technique itself, distinct from our broader Explainer Videos service, which covers the explainer format generally across different styles.",
    capabilitiesHeading: "2D Animated Explainer Videos, Covered End to End",
    capabilities: [
      "Script and storyboard development",
      "Custom character and scene illustration",
      "Full 2D animation and motion design",
      "Voiceover, sound design and final edit",
    ],
    benefitsHeading: "Why Choose Our 2D Animation Team",
    benefits: [
      {
        title: "Fully Custom Illustration",
        description: "Characters and scenes are illustrated for your brand, not pulled from a generic template library.",
      },
      {
        title: "Built To Explain, Not Just Entertain",
        description: "Every scene is built around making a concept clear, with the story structured around that goal.",
      },
      {
        title: "End-to-End Production",
        description: "Script, illustration, animation and sound all come from one team, so nothing gets lost in handoffs.",
      },
      {
        title: "Brand-Consistent Style",
        description: "The illustration style is built to match your brand rather than a one-size-fits-all animation look.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Businesses explaining an abstract or complex idea that's hard to film",
      "Brands wanting a distinctive, illustrated visual style rather than live action",
      "Products or services with no physical product to film",
      "Companies needing a video that works across very different marketing channels",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Script & Storyboard", description: "We write the script and storyboard the video around what needs explaining." },
      { title: "Illustration", description: "We design and illustrate the characters and scenes in your brand's style." },
      { title: "Animation", description: "We animate the storyboard into full motion." },
      { title: "Voiceover & Final Edit", description: "We add voiceover, sound design and deliver the final cut." },
    ],
    faqHeading: "2D Animated Explainer Video FAQs",
    faqs: [
      {
        question: "How is this different from your Explainer Videos service?",
        answer:
          "This service is specifically the 2D illustrated-animation technique. Our broader Explainer Videos service covers the explainer format generally, including styles beyond 2D animation.",
      },
      {
        question: "Do you design the characters and illustrations from scratch?",
        answer: "Yes, characters and scenes are custom-illustrated for your brand rather than pulled from a stock template.",
      },
      {
        question: "Is voiceover included?",
        answer: "Yes, voiceover and sound design are part of the full production.",
      },
      {
        question: "How long does production usually take?",
        answer: "Timelines depend on script complexity and the amount of animation needed — we'll scope this with you before starting.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — 2D Animated Explainer Videos is one specific technique within it.",
    },
  },
  {
    slug: "explainer-videos",
    name: "Explainer Videos",
    shortDescription:
      "Explainer video production across formats — animated, mixed-media or live-action, built around what explains your product best.",
    tags: ["explainer video production", "explainer video company", "explainer video service"],
    icon: Film,
    gradient: "linear-gradient(155deg, #142B6B 0%, #0070FE 55%, #22D3EE 100%)",
    seoTitle: "Explainer Video Production Services",
    metaDescription:
      "Explainer video production across animated, mixed-media and live-action formats, built around how your product is best explained, for businesses in the USA, UK and Europe.",
    h1: "Explainer Videos",
    primaryKeyword: "explainer video production",
    secondaryKeywords: ["explainer video company", "explainer video service", "business explainer video"],
    intro:
      "Explainer videos don't all need the same format. We produce explainer videos in whatever format best fits what you're explaining — fully animated, mixed media, or live-action — rather than defaulting to one style for every brief.",
    whatIsQuestion: "What Is An Explainer Video?",
    whatIsAnswer:
      "An explainer video is a short video built to make a product, service or idea clear quickly — typically used on a homepage, landing page or in early-funnel marketing. The format can be fully animated, mixed media, or live-action, chosen based on what explains the specific product best. At Code & Motions, this is the broader explainer-video service; our 2D Animated Explainer Videos service covers the illustrated-animation technique specifically when that's the right fit.",
    capabilitiesHeading: "Explainer Video Production, Covered End to End",
    capabilities: [
      "Format selection — animated, mixed media or live-action",
      "Script and storyboard development",
      "Production or animation, depending on format",
      "Voiceover, sound design and final edit",
    ],
    benefitsHeading: "Why Choose Our Explainer Video Team",
    benefits: [
      {
        title: "Format Chosen For The Product",
        description: "We recommend the explainer format that actually fits your product, not a default style applied to everything.",
      },
      {
        title: "Built For Early-Funnel Clarity",
        description: "Scripts are structured to make a product clear fast, for viewers who may know nothing about it yet.",
      },
      {
        title: "End-to-End Production",
        description: "Script, visuals and sound all come from one team, regardless of format.",
      },
      {
        title: "Works Across Channels",
        description: "Videos are produced with your website, landing pages and social use in mind.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Businesses needing a homepage or landing-page explainer video",
      "Products that are hard to understand from text alone",
      "Companies unsure whether animation or live-action best suits their product",
      "Teams needing a single clear video to introduce what they do",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery & Format Selection", description: "We figure out what needs explaining and which format will do that best." },
      { title: "Script & Storyboard", description: "We write and storyboard the video around that format." },
      { title: "Production", description: "We animate or film the video, depending on the chosen format." },
      { title: "Voiceover & Final Edit", description: "We add voiceover, sound design and deliver the final cut." },
    ],
    faqHeading: "Explainer Video FAQs",
    faqs: [
      {
        question: "Does my explainer video have to be animated?",
        answer: "No — we'll recommend animated, mixed-media or live-action based on what best explains your specific product.",
      },
      {
        question: "What's the difference between this and your 2D Animated Explainer Videos service?",
        answer:
          "2D Animated Explainer Videos is the illustrated-animation technique specifically. This service covers explainer videos generally, including formats beyond 2D animation.",
      },
      {
        question: "How long should an explainer video be?",
        answer: "Most effective explainer videos run roughly 60-90 seconds, though the right length depends on what you're explaining.",
      },
      {
        question: "Where will the video be used?",
        answer: "We produce with your intended placement in mind — homepage, landing page, or social — since that affects pacing and length.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — Explainer Videos is the broader format within it.",
    },
  },
  {
    slug: "product-explanation-videos",
    name: "Product Explanation Videos",
    shortDescription:
      "Feature-focused videos that walk through exactly how a specific product works, for prospects who already know what it is.",
    tags: ["product explanation video", "product video production", "how it works video"],
    icon: PlayCircle,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Product Explanation Video Production",
    metaDescription:
      "Product explanation videos that walk through exactly how your product works, feature by feature, for businesses in the USA, UK and Europe.",
    h1: "Product Explanation Videos",
    primaryKeyword: "product explanation video",
    secondaryKeywords: ["product video production", "how it works video", "feature walkthrough video"],
    intro:
      "Once a prospect already knows what your product is, they need to see exactly how it works. We produce product explanation videos that walk through specific features and workflows in detail — a more technical, feature-level video than a general introductory explainer.",
    whatIsQuestion: "What Is A Product Explanation Video?",
    whatIsAnswer:
      "A product explanation video walks through exactly how a specific product works — its features, workflow and functionality — for an audience that already knows roughly what the product is. At Code & Motions, this is a feature-level, how-it-works video, distinct from a general introductory Explainer Video aimed at someone encountering the product for the first time.",
    capabilitiesHeading: "Product Explanation Videos, Covered End to End",
    capabilities: [
      "Feature-by-feature script structuring",
      "Screen capture, animation or a mix of both, depending on the product",
      "Voiceover and on-screen annotation",
      "Edits for different feature sets or product versions",
    ],
    benefitsHeading: "Why Choose Our Product Video Team",
    benefits: [
      {
        title: "Feature-Level Detail",
        description: "Scripts go deeper than a general introduction, walking through how specific features actually work.",
      },
      {
        title: "Right Format For The Product",
        description: "We mix screen capture, animation or both, based on what best shows your product's functionality.",
      },
      {
        title: "Useful For Sales, Not Just Marketing",
        description: "These videos work well in sales conversations and onboarding, not only top-of-funnel marketing.",
      },
      {
        title: "Updatable As Features Change",
        description: "We can revisit and update videos as your product evolves.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Products with enough functionality that a general explainer video isn't detailed enough",
      "Sales teams needing a video to show prospects exactly how specific features work",
      "Onboarding flows needing a feature-level walkthrough video",
      "Products with distinct feature sets that need separate, focused videos",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Feature Scoping", description: "We identify which features or workflows the video needs to cover." },
      { title: "Script & Capture Plan", description: "We script the walkthrough and plan screen capture or animation needs." },
      { title: "Production", description: "We capture, animate and edit the walkthrough." },
      { title: "Voiceover & Final Edit", description: "We add voiceover, annotations and deliver the final cut." },
    ],
    faqHeading: "Product Explanation Video FAQs",
    faqs: [
      {
        question: "How is this different from a general explainer video?",
        answer:
          "A general explainer video introduces what your product is. A product explanation video goes deeper — walking through specific features and how they work, for an audience that already knows the basics.",
      },
      {
        question: "Can you use screen recordings of our actual product?",
        answer: "Yes, screen capture of your real product, combined with animation or annotation where useful, is a core part of this service.",
      },
      {
        question: "Can we use this for sales calls, not just marketing?",
        answer: "Yes, product explanation videos work well in sales and onboarding contexts, not only top-of-funnel marketing.",
      },
      {
        question: "Is this a fit for SaaS products specifically?",
        answer:
          "It can be — for software with a strong UI focus, our SaaS Product Demo Videos service may be an even closer fit; we can advise which suits your product.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — Product Explanation Videos is the feature-level format within it.",
    },
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    shortDescription:
      "Non-narrative graphic animation — animated titles, data visualization and brand motion assets for use across your marketing.",
    tags: ["motion graphics", "motion design", "animated graphics"],
    icon: Layers,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    seoTitle: "Motion Graphics Design Services",
    metaDescription:
      "Motion graphics and animated brand assets — titles, data visualization and animated graphics for marketing, for businesses in the USA, UK and Europe.",
    h1: "Motion Graphics",
    primaryKeyword: "motion graphics",
    secondaryKeywords: ["motion design", "animated graphics", "animated titles and data visuals"],
    intro:
      "Not every piece of motion content tells a story. We produce motion graphics — animated titles, data visualization, logo animation and brand motion assets — for use across video, social and web, without a narrative explainer structure.",
    whatIsQuestion: "What Are Motion Graphics?",
    whatIsAnswer:
      "Motion graphics are non-narrative animated visuals — titles, lower-thirds, data visualization, logo animation and other brand motion assets — used across video, social and web content. At Code & Motions, this is distinct from our narrative explainer-video services: motion graphics aren't telling a story, they're animating graphic elements for use across your broader content.",
    capabilitiesHeading: "Motion Graphics, Covered End to End",
    capabilities: [
      "Animated titles, lower-thirds and on-screen graphics",
      "Data and chart visualization",
      "Logo animation and brand motion assets",
      "Motion graphic packages for recurring content (intros, outros, templates)",
    ],
    benefitsHeading: "Why Choose Our Motion Graphics Team",
    benefits: [
      {
        title: "Built For Reuse",
        description: "Motion graphic packages and templates are built so you can reuse them across future content, not just a single video.",
      },
      {
        title: "Brand-Consistent Motion",
        description: "Animation style matches your existing brand guidelines rather than a generic template look.",
      },
      {
        title: "Data Made Clear",
        description: "Charts and data visualizations are animated to make numbers easy to follow, not just decorative.",
      },
      {
        title: "Fits Into Existing Video",
        description: "We can design motion graphics to drop into video you already have, not only new productions.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Brands needing animated titles or intro/outro packages for recurring video content",
      "Companies needing data or statistics visualized in an animated video or presentation",
      "Businesses wanting their logo or brand elements animated for use across content",
      "Teams needing a reusable motion graphics template for ongoing content production",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Scoping", description: "We identify which graphic elements need animating and where they'll be used." },
      { title: "Design", description: "We design the graphics in your brand style before animating them." },
      { title: "Animation", description: "We animate the designed graphics into final motion assets." },
      { title: "Delivery", description: "We deliver final files in the formats your team needs for ongoing use." },
    ],
    faqHeading: "Motion Graphics FAQs",
    faqs: [
      {
        question: "Is this the same as an explainer video?",
        answer:
          "No — explainer videos tell a story. Motion graphics are non-narrative animated elements like titles, data visuals and brand animation, often used within other video content.",
      },
      {
        question: "Can you animate our existing logo?",
        answer: "Yes, logo animation and brand motion assets are part of this service.",
      },
      {
        question: "Can you create a reusable intro/outro template?",
        answer: "Yes, motion graphic packages built for repeated use across future content are a common request.",
      },
      {
        question: "Can you animate data or statistics for a presentation?",
        answer: "Yes, data and chart visualization is part of this service, for video or presentation use.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — Motion Graphics covers the non-narrative animation work within it.",
    },
  },
  {
    slug: "saas-explainer-videos",
    name: "SaaS Explainer Videos",
    shortDescription:
      "Explainer videos built for SaaS landing pages — framed around software positioning, onboarding and conversion.",
    tags: ["SaaS explainer video", "software explainer video", "SaaS landing page video"],
    icon: Rocket,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 55%, #7CE6F7 100%)",
    seoTitle: "SaaS Explainer Video Production",
    metaDescription:
      "SaaS explainer videos built for software landing pages and conversion, for SaaS and software businesses in the USA, UK and Europe.",
    h1: "SaaS Explainer Videos",
    primaryKeyword: "SaaS explainer video",
    secondaryKeywords: ["software explainer video", "SaaS landing page video", "SaaS marketing video"],
    intro:
      "SaaS products have a specific explainer-video job to do — getting a visitor from 'what is this' to 'I want to try this' on a landing page. We build explainer videos framed around SaaS positioning and conversion specifically, informed by our own software development background.",
    whatIsQuestion: "What Is A SaaS Explainer Video?",
    whatIsAnswer:
      "A SaaS explainer video is an explainer video framed specifically for software products — built around SaaS positioning, pricing tiers and landing-page conversion goals, rather than a general product introduction. At Code & Motions, this is a vertical-specific application of our broader Explainer Videos service, informed by our own software development experience.",
    capabilitiesHeading: "SaaS Explainer Videos, Covered End to End",
    capabilities: [
      "Script framing around SaaS positioning and value proposition",
      "Animated or mixed-media production, matched to your product",
      "Landing-page-optimized pacing and length",
      "Variants for different pricing tiers or audience segments where needed",
    ],
    benefitsHeading: "Why Choose Our SaaS Video Team",
    benefits: [
      {
        title: "We Understand SaaS, Not Just Video",
        description: "Our own software development background means scripts reflect how SaaS products actually get positioned and sold.",
      },
      {
        title: "Built For Landing-Page Conversion",
        description: "Pacing and structure are built around getting a landing-page visitor to the next step, not just entertaining them.",
      },
      {
        title: "Works Alongside Our Software Development Service",
        description: "A natural fit if we're already building or have built your SaaS product.",
      },
      {
        title: "Flexible Format",
        description: "Animated, screen-based, or mixed — whichever format fits your product's positioning best.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "SaaS companies needing a landing-page explainer video",
      "Software products preparing for a launch or re-launch",
      "SaaS teams wanting a video framed around conversion, not just awareness",
      "Software businesses that want their explainer video to reflect how the product is actually positioned and sold",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Positioning Review", description: "We review how your SaaS product is positioned and sold before scripting." },
      { title: "Script & Storyboard", description: "We write and storyboard the video around that positioning and your conversion goal." },
      { title: "Production", description: "We animate or film the video in the format that fits your product." },
      { title: "Voiceover & Final Edit", description: "We add voiceover, sound design and deliver the final cut." },
    ],
    faqHeading: "SaaS Explainer Video FAQs",
    faqs: [
      {
        question: "How is this different from a general explainer video?",
        answer:
          "It's framed specifically around SaaS positioning, pricing and landing-page conversion, drawing on our own software development experience — not just a general product introduction.",
      },
      {
        question: "Can you make a video if you're also building our SaaS product?",
        answer: "Yes — this pairs naturally with our Software Development work if we're building your product.",
      },
      {
        question: "Do you need access to our product to make the video?",
        answer: "Often yes, for screen-based segments — we'll confirm access needs once we know the format.",
      },
      {
        question: "Can you make different versions for different pricing tiers?",
        answer: "Yes, variants for different audience segments or pricing tiers are possible where it's useful.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — SaaS Explainer Videos is a vertical-specific application of it.",
    },
  },
  {
    slug: "saas-product-demo-videos",
    name: "SaaS Product Demo Videos",
    shortDescription:
      "Screen-recorded, UI-driven product demo videos — showing a real SaaS product in use rather than an animated explanation.",
    tags: ["SaaS product demo video", "software demo video", "UI walkthrough video"],
    icon: Monitor,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",
    seoTitle: "SaaS Product Demo Video Production",
    metaDescription:
      "Screen-recorded SaaS product demo videos showing your real software UI in use, for SaaS and software businesses in the USA, UK and Europe.",
    h1: "SaaS Product Demo Videos",
    primaryKeyword: "SaaS product demo video",
    secondaryKeywords: ["software demo video", "UI walkthrough video", "SaaS screen recording video"],
    intro:
      "Sometimes the clearest way to show a SaaS product is to show the real thing. We produce screen-recorded product demo videos — a UI walkthrough of your actual software — rather than an animated or illustrated explanation.",
    whatIsQuestion: "What Is A SaaS Product Demo Video?",
    whatIsAnswer:
      "A SaaS product demo video is a screen-recorded walkthrough of your actual software interface, showing real features and workflows in use. At Code & Motions, this is a format distinction from SaaS Explainer Videos: a demo video shows the real UI directly, rather than animating or illustrating an explanation of it.",
    capabilitiesHeading: "SaaS Product Demo Videos, Covered End to End",
    capabilities: [
      "Screen recording of your live or staging product",
      "On-screen annotation and callouts",
      "Voiceover scripted to match the real workflow shown",
      "Edits for different features, versions or audience segments",
    ],
    benefitsHeading: "Why Choose Our SaaS Demo Video Team",
    benefits: [
      {
        title: "Shows The Real Product",
        description: "Prospects see your actual interface and workflow, not an animated stand-in for it.",
      },
      {
        title: "Scripted Around The Real Workflow",
        description: "Voiceover and pacing are written to match exactly what's happening on screen.",
      },
      {
        title: "Useful Beyond Marketing",
        description: "These videos work for sales demos, onboarding and support, as well as landing pages.",
      },
      {
        title: "Updatable As Your UI Changes",
        description: "We can re-record or update segments as your product's interface evolves.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "SaaS companies wanting to show their real product rather than an animated explanation",
      "Sales teams needing a demo video to send prospects before a live call",
      "Onboarding flows needing a screen-recorded walkthrough of key features",
      "Software products with a strong, demo-worthy UI",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Workflow Scoping", description: "We identify which features and workflows the demo needs to show." },
      { title: "Script & Recording Plan", description: "We script the voiceover and plan the exact screens to record." },
      { title: "Screen Recording", description: "We record the real product, following the planned workflow." },
      { title: "Voiceover & Final Edit", description: "We add voiceover, annotations and deliver the final cut." },
    ],
    faqHeading: "SaaS Product Demo Video FAQs",
    faqs: [
      {
        question: "How is this different from a SaaS Explainer Video?",
        answer:
          "A SaaS Explainer Video typically uses animation or mixed media to introduce your product's value. A Product Demo Video screen-records your actual UI directly — a different format, often used further down the funnel.",
      },
      {
        question: "Do you need access to our product to record this?",
        answer: "Yes, access to a live or staging version of your product is needed for screen recording.",
      },
      {
        question: "Can we use this in sales calls, not just on our website?",
        answer: "Yes, these videos work well as pre-call sales assets and in onboarding, not only on landing pages.",
      },
      {
        question: "What happens if our UI changes after the video is made?",
        answer: "We can re-record or update affected segments — let us know when significant UI changes happen.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — SaaS Product Demo Videos is the screen-recorded format within it.",
    },
  },
  {
    slug: "social-media-videos",
    name: "Social Media Videos",
    shortDescription:
      "Platform-native video content for social feeds — formatted and paced for how people actually watch on social media.",
    tags: ["social media video production", "social video content", "video for social media"],
    icon: Smartphone,
    gradient: "linear-gradient(155deg, #142B6B 0%, #0070FE 55%, #22D3EE 100%)",
    seoTitle: "Social Media Video Production Services",
    metaDescription:
      "Social media video production — platform-native video content formatted and paced for social feeds, for businesses in the USA, UK and Europe.",
    h1: "Social Media Videos",
    primaryKeyword: "social media video production",
    secondaryKeywords: ["social video content", "video for social media", "social media video editing"],
    intro:
      "We produce video content built for how people actually watch on social media — the right aspect ratio, pacing and length for the feed it's going into, rather than a single video cut down for every platform.",
    whatIsQuestion: "What Are Social Media Videos?",
    whatIsAnswer:
      "Social media videos are short-form, platform-native video content — formatted and paced for how people actually scroll and watch on social feeds. At Code & Motions, this is the general social-video service; our Short/Reels/TikTok Videos service covers the specific, trend-aware sub-category of Reels, TikTok and Shorts content.",
    capabilitiesHeading: "Social Media Video Production, Covered End to End",
    capabilities: [
      "Platform-appropriate aspect ratio and formatting",
      "Pacing and hooks built for feed-based viewing",
      "Captioning and on-screen text for sound-off viewing",
      "Edits adapted per platform, rather than one cut used everywhere",
    ],
    benefitsHeading: "Why Choose Our Social Video Team",
    benefits: [
      {
        title: "Built For The Feed, Not Just Resized",
        description: "Pacing and hooks are built for scroll-based viewing, not a TV ad shrunk into a square.",
      },
      {
        title: "Platform-Specific Edits",
        description: "We adapt format and pacing per platform rather than using one identical cut everywhere.",
      },
      {
        title: "Captioned For Sound-Off Viewing",
        description: "Captions and on-screen text are built in, since most social video is watched muted.",
      },
      {
        title: "Fits Your Broader Content",
        description: "Social cuts can be produced alongside other video work, like explainer or demo videos.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Brands needing ongoing video content for social feeds",
      "Businesses wanting a longer video (like an explainer) cut into social-ready pieces",
      "Companies launching a product and needing social video alongside other marketing assets",
      "Teams needing captioned, sound-off-friendly video for social distribution",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Platform Planning", description: "We confirm which platforms the video is for and their format needs." },
      { title: "Script & Shot Plan", description: "We plan pacing, hooks and shots around feed-based viewing." },
      { title: "Production & Edit", description: "We produce and edit the video, adapted per platform." },
      { title: "Captioning & Delivery", description: "We add captions and deliver platform-ready exports." },
    ],
    faqHeading: "Social Media Video FAQs",
    faqs: [
      {
        question: "Can you cut our existing explainer video for social?",
        answer: "Yes, adapting existing video — like an explainer video — into social-ready cuts is part of this service.",
      },
      {
        question: "Do you add captions?",
        answer: "Yes, captioning and on-screen text for sound-off viewing is included.",
      },
      {
        question: "Is this the same as your Short/Reels/TikTok Videos service?",
        answer:
          "This covers social video generally. Short/Reels/TikTok Videos is the more specific, trend-aware sub-category focused on Reels, TikTok and Shorts content.",
      },
      {
        question: "Can you deliver different versions for different platforms?",
        answer: "Yes, we adapt aspect ratio, pacing and length per platform rather than using one identical cut everywhere.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core video and animation service — Social Media Videos covers general platform-native content within it.",
    },
  },
  {
    slug: "short-reels-tiktok-videos",
    name: "Short/Reels/TikTok Videos",
    shortDescription:
      "Reels, TikTok and Shorts-specific video content — fast-paced, trend-aware short-form video for those platforms specifically.",
    tags: ["TikTok video production", "Instagram Reels video", "YouTube Shorts video"],
    icon: Clapperboard,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Reels, TikTok & Shorts Video Production",
    metaDescription:
      "Trend-aware, fast-paced video production for Instagram Reels, TikTok and YouTube Shorts, for businesses in the USA, UK and Europe.",
    h1: "Short/Reels/TikTok Videos",
    primaryKeyword: "TikTok video production",
    secondaryKeywords: ["Instagram Reels video", "YouTube Shorts video", "short-form video production"],
    intro:
      "Reels, TikTok and Shorts have their own pacing, editing conventions and trend cycles. We produce short-form video specifically for these formats, rather than treating them as just a shorter cut of a general social video.",
    whatIsQuestion: "What Is Reels/TikTok/Shorts Video Production?",
    whatIsAnswer:
      "Reels, TikTok and Shorts video production is short-form content built specifically for those platforms' pacing, editing style and trend conventions — fast cuts, on-screen text and audio choices suited to that specific viewing format. At Code & Motions, this is a more specific sub-category within our broader Social Media Videos service, focused on where trend-awareness matters most.",
    capabilitiesHeading: "Reels/TikTok/Shorts Production, Covered End to End",
    capabilities: [
      "Fast-paced editing suited to Reels, TikTok and Shorts conventions",
      "Trend and audio-aware editing choices",
      "On-screen text and caption styling built for the format",
      "Batches of short-form content from a single shoot or source video",
    ],
    benefitsHeading: "Why Choose Our Short-Form Video Team",
    benefits: [
      {
        title: "Built For These Platforms Specifically",
        description: "Edits follow the pacing and conventions of Reels, TikTok and Shorts, not a generic short video.",
      },
      {
        title: "Trend-Aware Editing",
        description: "We keep editing choices aware of current short-form video conventions, within what fits your brand.",
      },
      {
        title: "Batch Production",
        description: "We can produce a batch of short-form clips from one shoot or one longer source video.",
      },
      {
        title: "Works With Other Formats",
        description: "Short-form clips can be produced alongside explainer, demo or broader social video work.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Brands building an ongoing presence on TikTok, Reels or Shorts specifically",
      "Businesses wanting a batch of short-form clips cut from a single shoot",
      "Companies needing content edited specifically for short-form trend conventions",
      "Teams repurposing longer video into multiple short-form clips",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Format Planning", description: "We confirm which short-form platforms and formats the content is for." },
      { title: "Shoot Or Source Review", description: "We shoot new footage or review existing source video to pull clips from." },
      { title: "Fast-Paced Edit", description: "We edit with the pacing and conventions of Reels, TikTok and Shorts in mind." },
      { title: "Delivery", description: "We deliver platform-ready exports, in batches where needed." },
    ],
    faqHeading: "Short/Reels/TikTok Video FAQs",
    faqs: [
      {
        question: "Is this different from your Social Media Videos service?",
        answer:
          "Yes — Social Media Videos covers platform-native content generally. This service is specifically the Reels, TikTok and Shorts sub-category, with its own pacing and trend conventions.",
      },
      {
        question: "Can you cut multiple short clips from one video shoot?",
        answer: "Yes, producing a batch of short-form clips from a single shoot or longer source video is part of this service.",
      },
      {
        question: "Do you follow current TikTok/Reels trends?",
        answer: "We keep editing choices aware of current short-form conventions, applied in a way that still fits your brand.",
      },
      {
        question: "Can you repurpose our existing long-form video into Shorts?",
        answer: "Yes, repurposing existing longer video into short-form clips is a common use of this service.",
      },
    ],
    relatedLink: {
      label: "Social Media Videos",
      href: "/services/video-animation/social-media-videos",
      description: "Our broader social video service — Short/Reels/TikTok Videos is the platform-specific sub-category within it.",
    },
  },
  // AI Video Automation already has its own full dedicated page at
  // /services/ai-development/ai-video-development (built in the AI
  // Development pass). Reusing it here rather than creating a duplicate.
  {
    slug: "ai-video-automation",
    name: "AI Video Automation",
    shortDescription:
      "AI-assisted video production and repurposing — automated editing and workflows built on top of our video & animation work.",
    tags: ["AI video automation", "AI-assisted video production", "automated video editing"],
    icon: Bot,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    externalHref: "/services/ai-development/ai-video-development",
  },
];
