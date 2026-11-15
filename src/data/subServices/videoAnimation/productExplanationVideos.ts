import { PlayCircle } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { videoAreaServed, videoHeroCtas } from "./shared";

/**
 * Product Explainer Videos. The URL slug is unchanged from the earlier
 * "Product Explanation Videos" page. Its targets come from United States
 * demand data only and were not covered by the results-page tests, so they
 * are provisional.
 */
export const productExplainerVideos: SubService = {
  slug: "product-explanation-videos",
  name: "Product Explainer Videos",
  shortDescription:
    "Product explainer videos that walk through what a product does and how its features work, feature by feature.",
  tags: ["product explainer video", "product explanation video", "how it works video"],
  icon: PlayCircle,
  gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",

  seoTitle: "Product Explainer Video Production",
  metaDescription:
    "Product explainer video production that walks through what your product does and how its features work, feature by feature, for businesses worldwide.",
  h1: "Product Explainer Videos",
  primaryKeyword: "product explainer video",
  secondaryKeywords: [
    "product explainer videos",
    "animated product explainer video",
    "product explainer video production",
  ],
  heroCtas: videoHeroCtas,
  areaServed: videoAreaServed,
  intro:
    "Once a prospect knows what your product is, they need to see how it works. We produce product explainer videos that walk through specific features and workflows in detail: a more focused, feature-level video than a general introduction. We work with businesses worldwide, from script to final cut.",

  whatIsQuestion: "What is a product explainer video?",
  whatIsAnswer:
    "A product explainer video shows what a product does and how its features work. A product explanation video of this kind is more detailed than a general explainer: it walks through specific features, steps and benefits for an audience that already knows roughly what the product is. It can be animated, screen-based or a mix, depending on the product.",

  sections: [
    {
      heading: "Animated product explainer video production",
      paragraphs: [
        "Animation is a strong way to explain a product because it can show what is hidden or abstract. An animated product explainer video can highlight one feature at a time, zoom into a detail, show a process happening step by step, and keep attention on the part that matters. It also stays consistent across product versions, since individual scenes can be updated when a feature changes.",
        "We combine animation with screen capture or footage where that makes the product clearer, and we choose the mix from what your product needs.",
      ],
    },
    {
      heading: "How product explainer videos differ from other formats",
      paragraphs: [
        "A product explainer video sits between a general introduction and a full demo. It assumes the viewer knows roughly what you offer and wants to understand how it works.",
      ],
      bullets: [
        {
          title: "Compared with a general explainer",
          text: "A general [explainer video](/services/video-animation/explainer-videos) introduces what you do for a first-time viewer. A product explainer goes deeper into specific features.",
        },
        {
          title: "Compared with a software demo",
          text: "A real-interface walkthrough is covered by our [SaaS product demo videos](/services/video-animation/saas-product-demo-videos), and an animated introduction for software by our [SaaS explainer videos](/services/video-animation/saas-explainer-videos).",
        },
        {
          title: "Compared with 3D product films",
          text: "If you want a polished 3D showcase of a physical product, with exploded views and realistic materials, see our [3D product animation services](/services/video-animation/3d-product-animation-services).",
        },
      ],
    },
  ],

  capabilitiesHeading: "What a product explainer project can include",
  capabilities: [
    "Feature-by-feature script structuring",
    "Animation, screen capture or a mix of both",
    "Voiceover and on-screen annotation",
    "Separate videos for different features or product versions",
    "Edits for sales, onboarding and the website",
  ],

  benefitsHeading: "Why choose our product video team",
  benefits: [
    {
      title: "Feature-level detail",
      description:
        "Scripts go deeper than a general introduction and explain how specific features work.",
    },
    {
      title: "The right format for the product",
      description:
        "We mix animation, screen capture or footage based on what shows your product best.",
    },
    {
      title: "Useful for sales as well as marketing",
      description:
        "These videos help in sales conversations and onboarding, not only at the top of the funnel.",
    },
    {
      title: "Updatable as features change",
      description:
        "We can revisit and update videos as your product evolves.",
    },
  ],

  useCasesHeading: "Who uses product explainer videos",
  useCases: [
    "Products with enough functionality that a general explainer is not detailed enough",
    "Sales teams that need a video to show how specific features work",
    "Onboarding flows that need a feature-level walkthrough",
    "Products with distinct feature sets that need separate, focused videos",
  ],

  processHeading: "How a product explainer project runs",
  process: [
    {
      title: "Feature scoping",
      description:
        "We agree which features or workflows the video needs to cover and for whom.",
    },
    {
      title: "Script and capture plan",
      description:
        "We script the walkthrough and plan the animation, screen capture or footage it needs.",
    },
    {
      title: "Production",
      description:
        "We capture, animate and edit the walkthrough, with review points.",
    },
    {
      title: "Voiceover and delivery",
      description:
        "We add voiceover and annotations and deliver the final video.",
    },
  ],

  laterSections: [
    {
      heading: "Choosing between a product explainer and other video formats",
      paragraphs: [
        "If you are unsure which video you need, start with the viewer. Someone who has never heard of you needs an introduction. Someone comparing options needs to understand how your product works. Someone about to buy or onboard needs to see it in use. Each stage has its own format, and a product explainer video serves the middle one.",
        "[Tell us about your product](/contact) and who the video is for, and we will recommend the right format.",
      ],
    },
  ],

  faqHeading: "Product explainer video questions",
  faqs: [
    {
      question: "How is this different from a general explainer video?",
      answer:
        "A general explainer video introduces what your product is. A product explainer video goes deeper, walking through specific features and how they work, for an audience that already knows the basics.",
    },
    {
      question: "Can you use screen recordings of our actual product?",
      answer:
        "Yes. Screen capture of your real product, combined with animation or annotation where useful, is a core part of this service.",
    },
    {
      question: "Can we use these videos for sales calls?",
      answer:
        "Yes. Product explainer videos work well in sales and onboarding contexts, not only at the top of the funnel.",
    },
    {
      question: "Is this a fit for software products?",
      answer:
        "It can be. For software with a strong interface, our SaaS product demo videos may be an even closer fit, and we can advise which suits your product.",
    },
    {
      question: "Can we have separate videos for different features?",
      answer:
        "Yes. Separate, focused videos for different features or product versions are often clearer than one long video.",
    },
  ],

  relatedLink: {
    label: "Video & Animation",
    href: "/services/video-animation",
    description:
      "Our core video and animation service. Product explainer videos are the feature-level format within it.",
  },
  relatedLinks: [
    {
      label: "Explainer video production",
      href: "/services/video-animation/explainer-videos",
      description: "General explainer videos that introduce what you offer.",
    },
    {
      label: "3D product animation services",
      href: "/services/video-animation/3d-product-animation-services",
      description: "3D showcase films for physical products and their parts.",
    },
    {
      label: "SaaS product demo videos",
      href: "/services/video-animation/saas-product-demo-videos",
      description: "Screen-recorded demos of a real software interface.",
    },
  ],
  closingCta: {
    headline: "Ready to show how your product works?",
    subtext:
      "Tell us about the product and the features that matter most, and we will outline the video.",
  },
};
