import { Smartphone } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { videoAreaServed, videoHeroCtas } from "./shared";

/**
 * Social Media Videos. This page also carries the Reels, TikTok and Shorts
 * content that used to have its own page (short-reels-tiktok-videos); that
 * old address now redirects here (see next.config.ts).
 */
export const socialMediaVideoProduction: SubService = {
  slug: "social-media-videos",
  name: "Social Media Videos",
  shortDescription:
    "Social media video production: platform-native video, including Reels, TikTok and Shorts, formatted and paced for the feed.",
  tags: [
    "social media video production",
    "social media video services",
    "Reels, TikTok and Shorts video",
  ],
  icon: Smartphone,
  gradient: "linear-gradient(155deg, #142B6B 0%, #0070FE 55%, #22D3EE 100%)",

  seoTitle: "Social Media Video Production Services",
  metaDescription:
    "Social media video production services for brands: platform-native video, Reels, TikTok and Shorts, planned, edited and captioned for the feed. Worldwide.",
  h1: "Social Media Video Production",
  primaryKeyword: "social media video production",
  secondaryKeywords: [
    "social media video production company",
    "video production for social media",
    "social media video production companies",
    "social media video production services",
    "social media video services",
    "short form video production",
  ],
  heroCtas: videoHeroCtas,
  areaServed: videoAreaServed,
  intro:
    "We are a social media video production company that makes video for how people actually watch on social: the right framing, pacing and length for each feed, with captions for sound-off viewing. That includes short-form video for Instagram Reels, TikTok and YouTube Shorts. We work with brands worldwide, including the USA, UK, Australia, Canada, Europe and the Middle East.",

  whatIsQuestion: "What is social media video production?",
  whatIsAnswer:
    "Social media video production is the planning, filming or animation, editing and captioning of video made for social platforms. The video is shaped for the feed it will appear in, with the right aspect ratio, a strong opening, on-screen text for viewing without sound and a length suited to the platform, rather than a general video simply cut down for each channel.",

  sections: [
    {
      heading: "Social media video services we provide",
      paragraphs: [
        "Our social media video services cover the full job of video production for social media, from the idea to platform-ready files.",
      ],
      bullets: [
        {
          title: "Platform-specific formats",
          text: "Aspect ratio, framing and length set for each platform you use, instead of one identical cut everywhere.",
        },
        {
          title: "Hooks and pacing for the feed",
          text: "The opening seconds are written to earn attention, and the pace keeps it.",
        },
        {
          title: "Captions and on-screen text",
          text: "Built in for sound-off viewing, since much social video is watched muted.",
        },
        {
          title: "Animated or filmed content",
          text: "Animated explainers, motion graphics, filmed clips or a mix, depending on your brand and message.",
        },
        {
          title: "Repurposing existing video",
          text: "Longer videos such as explainers, interviews and events cut into social-ready pieces.",
        },
      ],
    },
    {
      heading: "Short-form video: Reels, TikTok and YouTube Shorts",
      paragraphs: [
        "Short vertical video has its own pace and conventions, and we produce for it as part of this service. Whether you need short form video production for a new channel or a batch of clips from one shoot, we plan the content around how these formats are watched: a fast, clear opening, tight editing, on-screen text and a single idea per clip.",
        "We keep editing choices aware of current short-form conventions and apply them in a way that still fits your brand, rather than chasing every trend. If you are looking for a short form video agency to produce a regular series, tell us how many pieces you want and how often, and we will plan the production around that.",
      ],
    },
    {
      heading: "Making social video part of a wider video plan",
      paragraphs: [
        "Social video works hardest when it is connected to your other content. A single production can feed several channels, so we often plan social cut-downs at the same time as a main video. If you are producing a campaign, see our [promotional video production](/services/video-animation/promotional-video-production). If you have filmed material, our [corporate video production](/services/video-animation/corporate-video-production) page covers shoots, and animated titles and data can be added through [motion graphics services](/services/video-animation/motion-graphics). An existing [explainer video](/services/video-animation/explainer-videos) can also be cut into short social clips.",
      ],
    },
  ],

  capabilitiesHeading: "What a social media video project can include",
  capabilities: [
    "Content planning and scripting for each platform",
    "Animation, filming or both",
    "Short-form editing for Reels, TikTok and Shorts",
    "Captions and on-screen text",
    "Cut-downs from longer videos",
    "Platform-ready exports in the right aspect ratios",
  ],

  benefitsHeading: "Why choose our social video team",
  benefits: [
    {
      title: "Built for the feed",
      description:
        "Pacing and hooks are designed for scroll-based viewing, not a TV ad shrunk into a square.",
    },
    {
      title: "Platform-specific edits",
      description:
        "Format, pacing and length are adapted per platform rather than reused unchanged.",
    },
    {
      title: "Captioned for sound-off viewing",
      description:
        "Captions and on-screen text are built in from the start.",
    },
    {
      title: "Fits your other video work",
      description:
        "Social cuts can be planned alongside explainer, promotional or corporate video.",
    },
  ],

  useCasesHeading: "Who uses social media video production",
  useCases: [
    "Brands that need regular video for social feeds",
    "Businesses that want a longer video cut into social-ready pieces",
    "Companies launching a product that need social video beside other assets",
    "Brands building a presence on Reels, TikTok or Shorts",
    "Teams that need captioned, sound-off-friendly video",
  ],

  processHeading: "How a social media video project runs",
  process: [
    {
      title: "Platform and goal planning",
      description:
        "We confirm which platforms the video is for, what it should achieve and what formats each one needs.",
    },
    {
      title: "Script and shot plan",
      description:
        "We plan the hook, pacing and shots around feed-based viewing.",
    },
    {
      title: "Production and edit",
      description:
        "We animate or film, then edit the video for each platform.",
    },
    {
      title: "Captions and delivery",
      description:
        "We add captions and deliver platform-ready exports.",
    },
  ],

  laterSections: [
    {
      heading: "What makes a good social media video",
      bullets: [
        {
          title: "A reason to stay in the first seconds",
          text: "Open with the most interesting moment or a clear promise, not a logo.",
        },
        {
          title: "One idea per video",
          text: "A single clear point is easier to follow and easier to share than several crowded together.",
        },
        {
          title: "Readable without sound",
          text: "Captions and on-screen text carry the message when the audio is off.",
        },
        {
          title: "Framed for the platform",
          text: "Vertical, square and landscape each have a place, and the important content has to sit inside the visible area.",
        },
      ],
    },
    {
      heading: "How to choose a social media video production company",
      paragraphs: [
        "When you compare social media video production companies, look at whether they plan for the platform or only edit to a template. Ask how they handle hooks and captions, whether they can produce in several formats from one shoot, and how many revisions are included. Ask what they would do about a series rather than a single video, because social usually needs consistency over time.",
        "To talk through your plans, [get in touch](/contact) with the platforms you use and the kind of content you have in mind.",
      ],
    },
  ],

  faqHeading: "Social media video production questions",
  faqs: [
    {
      question: "What is social media video production?",
      answer:
        "It is the planning, filming or animation, editing and captioning of video made for social platforms, shaped for each feed rather than reused unchanged from another channel.",
    },
    {
      question: "How long should a social media video be?",
      answer:
        "There is no single right length. Short videos suit feeds, but each platform and format has its own limits, and those change over time, so we check current limits when we plan. As a rule, make the video as long as the message needs and put the point in the first few seconds.",
    },
    {
      question: "How much does a social media video cost?",
      answer:
        "We do not publish prices. The cost of social media video depends on whether it is animated or filmed, the length, how many videos you need, whether they are a one-off or a series, whether you need scripting and the number of revisions. We scope each project from your brief and quote from that.",
    },
    {
      question: "What makes a good social media video?",
      answer:
        "A strong opening, one clear idea, captions that work without sound, and a format made for the platform it appears on.",
    },
    {
      question: "How do I choose a social media video production company?",
      answer:
        "Check whether they plan for each platform, how they handle hooks and captions, whether they can produce several formats from one shoot, and what is included in the revisions.",
    },
    {
      question: "Can you make Reels, TikTok and YouTube Shorts?",
      answer:
        "Yes. Short-form video for Reels, TikTok and Shorts is part of this service, including batches of clips from a single shoot or from an existing longer video.",
    },
    {
      question: "Can you cut our existing explainer or video into social clips?",
      answer:
        "Yes. Adapting an existing video into social-ready cuts is a common part of this service.",
    },
  ],

  relatedLink: {
    label: "Video & Animation",
    href: "/services/video-animation",
    description:
      "Our core video and animation service. Social media video is the platform-native format within it.",
  },
  relatedLinks: [
    {
      label: "Promotional video production",
      href: "/services/video-animation/promotional-video-production",
      description: "Campaign and launch videos that social cut-downs can be made from.",
    },
    {
      label: "Motion graphics services",
      href: "/services/video-animation/motion-graphics",
      description: "Animated text, icons and data that carry a message without sound.",
    },
    {
      label: "Explainer video production",
      href: "/services/video-animation/explainer-videos",
      description: "A main explainer video that can be cut into social clips.",
    },
    {
      label: "Corporate video production",
      href: "/services/video-animation/corporate-video-production",
      description: "Filmed brand and company video that supplies social footage.",
    },
  ],
  closingCta: {
    headline: "Ready to make video for your feed?",
    subtext:
      "Tell us which platforms you use and the content you have in mind, and we will outline a plan.",
  },
};
