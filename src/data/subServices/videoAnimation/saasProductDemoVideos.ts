import { Monitor } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { videoAreaServed, videoHeroCtas } from "./shared";

/**
 * SaaS Product Demo Videos. Targets are provisional: they come from United
 * States demand data only and were not covered by the results-page tests.
 */
export const saasProductDemoVideos: SubService = {
  slug: "saas-product-demo-videos",
  name: "SaaS Product Demo Videos",
  shortDescription:
    "Screen-recorded SaaS product demo videos that show your real software interface in use.",
  tags: ["SaaS product demo video", "software demo video", "UI walkthrough video"],
  icon: Monitor,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",

  seoTitle: "SaaS Product Demo Video Production",
  metaDescription:
    "SaaS product demo video production: screen-recorded walkthroughs of your real software interface, scripted and edited for sales, onboarding and landing pages.",
  h1: "SaaS Product Demo Video Production",
  primaryKeyword: "saas product demo video",
  secondaryKeywords: ["software demo video"],
  heroCtas: videoHeroCtas,
  areaServed: videoAreaServed,
  intro:
    "Sometimes the clearest way to show a SaaS product is to show the real thing. We produce SaaS product demo videos: scripted, screen-recorded walkthroughs of your actual software, with voiceover and on-screen guidance, for SaaS and software teams worldwide.",

  whatIsQuestion: "What is a SaaS product demo video?",
  whatIsAnswer:
    "A SaaS product demo video is a screen-recorded walkthrough of your actual software interface, showing real features and workflows in use. It differs from an animated explainer: a demo video shows the real product directly rather than illustrating an explanation of it, and is often used further down the funnel, in sales and onboarding.",

  sections: [
    {
      heading: "Software demo video production",
      paragraphs: [
        "A good software demo video is scripted before it is recorded. The recording follows a planned path through the product, so the viewer sees one clear workflow rather than a tour of every screen.",
      ],
      bullets: [
        {
          title: "Planned workflows",
          text: "We choose the workflows that matter to the viewer and script the exact screens and clicks to show.",
        },
        {
          title: "Clean recordings",
          text: "Recordings use a prepared account with clear data, so the demo looks tidy and there is nothing private on screen.",
        },
        {
          title: "Voiceover matched to the screen",
          text: "The narration is written to match what is happening on screen at each moment.",
        },
        {
          title: "Callouts and annotation",
          text: "Highlights, zooms and labels direct attention to the part of the interface that matters.",
        },
      ],
    },
    {
      heading: "When to use a demo video instead of an animated explainer",
      paragraphs: [
        "An animated [SaaS explainer video](/services/video-animation/saas-explainer-videos) introduces the problem and the idea, which suits visitors who are new to the category. A demo video shows the real interface, which suits people who are already considering the product and want to see it. Many software companies use both: an explainer on the homepage and a demo in the sales process and onboarding.",
        "For a wider look at how features work across different kinds of product, see our [product explainer videos](/services/video-animation/product-explanation-videos).",
      ],
    },
  ],

  capabilitiesHeading: "What a product demo video project can include",
  capabilities: [
    "Workflow planning and demo script",
    "Screen recording of your live or staging product",
    "On-screen callouts, zooms and annotation",
    "Voiceover matched to the real workflow",
    "Edits for different features, versions or audiences",
  ],

  benefitsHeading: "Why choose our SaaS demo video team",
  benefits: [
    {
      title: "Shows the real product",
      description:
        "Prospects see your actual interface and workflow, not a stand-in for it.",
    },
    {
      title: "Scripted around the real workflow",
      description:
        "Voiceover and pacing are written to match exactly what is happening on screen.",
    },
    {
      title: "Useful beyond marketing",
      description:
        "These videos work for sales demos, onboarding and support as well as landing pages.",
    },
    {
      title: "Updatable as your interface changes",
      description:
        "We can re-record or update segments as your product evolves.",
    },
  ],

  useCasesHeading: "Who uses SaaS product demo videos",
  useCases: [
    "SaaS companies that want to show their real product rather than an animated explanation",
    "Sales teams that need a demo video to send prospects before a live call",
    "Onboarding flows that need a screen-recorded walkthrough of key features",
    "Software products with a strong, demonstrable interface",
  ],

  processHeading: "How a demo video project runs",
  process: [
    {
      title: "Workflow scoping",
      description:
        "We identify which features and workflows the demo needs to show, and for whom.",
    },
    {
      title: "Script and recording plan",
      description:
        "We script the voiceover and plan the exact screens to record.",
    },
    {
      title: "Screen recording",
      description:
        "We record the real product, following the planned path.",
    },
    {
      title: "Voiceover and final edit",
      description:
        "We add voiceover and annotations and deliver the final video.",
    },
  ],

  laterSections: [
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "A demo shows what your interface is",
          text: "If the interface is changing soon, tell us. We can time the recording or plan for an update, since a demo recorded on an old interface dates quickly.",
        },
        {
          title: "Access is needed",
          text: "We need access to a live or staging version of your product, ideally with a prepared demo account.",
        },
        {
          title: "It is not an introduction",
          text: "A demo assumes interest. For viewers who do not yet know the problem you solve, an animated explainer introduces it better.",
        },
      ],
    },
  ],

  faqHeading: "SaaS product demo video questions",
  faqs: [
    {
      question: "How is this different from a SaaS explainer video?",
      answer:
        "A SaaS explainer video usually uses animation or mixed media to introduce your product's value. A product demo video screen-records your actual interface, a different format that is often used further down the funnel.",
    },
    {
      question: "Do you need access to our product to record the demo?",
      answer:
        "Yes. Access to a live or staging version of your product is needed for screen recording, ideally with a prepared demo account.",
    },
    {
      question: "Can we use the video in sales calls, not just on our website?",
      answer:
        "Yes. These videos work well as pre-call sales assets and in onboarding, not only on landing pages.",
    },
    {
      question: "What happens if our interface changes after the video is made?",
      answer:
        "We can re-record or update affected segments. Let us know when significant interface changes are planned.",
    },
    {
      question: "Can you make a short demo for each key feature?",
      answer:
        "Yes. Short, focused demos for individual features are often clearer than one long walkthrough, and they are easier to update.",
    },
  ],

  relatedLink: {
    label: "Video & Animation",
    href: "/services/video-animation",
    description:
      "Our core video and animation service. SaaS product demo videos are the screen-recorded format within it.",
  },
  relatedLinks: [
    {
      label: "SaaS explainer videos",
      href: "/services/video-animation/saas-explainer-videos",
      description: "Animated introductions to a software product and the problem it solves.",
    },
    {
      label: "Product explainer videos",
      href: "/services/video-animation/product-explanation-videos",
      description: "Feature-level videos that explain how a product works.",
    },
    {
      label: "Software development services",
      href: "/services/software-development",
      description: "Custom SaaS and software development from the same team.",
    },
  ],
  closingCta: {
    headline: "Ready to show your product in action?",
    subtext:
      "Share a link to your product and the workflows that matter, and we will outline how we would record the demo.",
  },
};
