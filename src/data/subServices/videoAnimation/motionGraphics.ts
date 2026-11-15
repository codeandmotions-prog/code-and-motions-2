import { Layers } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { videoAreaServed, videoHeroCtas } from "./shared";

export const motionGraphicsServices: SubService = {
  slug: "motion-graphics",
  name: "Motion Graphics",
  shortDescription:
    "Motion graphics services: animated titles, data visualization, icons and brand motion assets for video, social and web.",
  tags: ["motion graphics services", "motion graphics studio", "animated graphics"],
  icon: Layers,
  gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",

  seoTitle: "Motion Graphics Services & Studio",
  metaDescription:
    "Motion graphics services and studio: animated titles, data visualization and brand motion assets for video, social and web. Working with brands worldwide.",
  h1: "Motion Graphics Services",
  primaryKeyword: "motion graphics services",
  secondaryKeywords: [
    "motion graphics studio",
    "motion graphics studios",
    "motion graphics video production",
    "motion graphics design services",
  ],
  heroCtas: videoHeroCtas,
  areaServed: videoAreaServed,
  intro:
    "Not every piece of motion content tells a story. As a motion graphics studio, we design and animate titles, data visualization, icons and brand motion assets for use across video, social, presentations and web. Brands worldwide use our motion graphics services when they need clean, on-brand movement without a narrative explainer structure.",

  whatIsQuestion: "What are motion graphics?",
  whatIsAnswer:
    "Motion graphics are animated graphic elements: text, shapes, icons, charts and logos that move on screen. Unlike a story-led animation with characters, motion graphics communicate information or brand identity through design and movement. They appear in titles, lower-thirds, data visuals, social posts, ads and explainer-style videos.",

  sections: [
    {
      heading: "Motion graphics design services we provide",
      paragraphs: [
        "Our motion graphics design services cover the elements that make video look finished and on-brand.",
      ],
      bullets: [
        {
          title: "Animated titles and lower-thirds",
          text: "Opening titles, name captions and on-screen text designed to match your brand.",
        },
        {
          title: "Data and chart visualization",
          text: "Numbers and statistics animated so the point is easy to follow, for video or presentations.",
        },
        {
          title: "Icon and infographic animation",
          text: "Simple, clear animated graphics that explain a feature, a process or a comparison.",
        },
        {
          title: "Brand motion assets",
          text: "Animated logos, transitions and graphic elements that give your content a consistent motion identity.",
        },
        {
          title: "Reusable packages and templates",
          text: "Intros, outros and graphic sets built so your team can reuse them across future content.",
        },
      ],
    },
    {
      heading: "Motion graphics video production",
      paragraphs: [
        "Motion graphics can also be the whole video. A motion graphics video production uses animated type, shapes and icons to carry a message without characters, and it is a good fit for product updates, data-led stories, announcements and social content. It tends to be faster to make and easier to update than character animation, because the elements are graphic rather than illustrated.",
        "When a video needs a story, characters or a voiced narrative, our [2D animation services](/services/video-animation/2d-animated-explainer-videos) and [explainer video production](/services/video-animation/explainer-videos) are usually the better fit, and motion graphics are layered in for text and data. Motion graphics are also added to filmed video, such as in our [corporate video production](/services/video-animation/corporate-video-production).",
      ],
    },
    {
      heading: "Working with a motion graphics studio",
      paragraphs: [
        "The best results come from a clear style. If you have brand guidelines, send them, along with any existing videos whose look you want to match. If you do not, we can propose a motion style and show a short test before building the full set. We can design graphics to drop into video you already have, not only new productions.",
      ],
    },
  ],

  capabilitiesHeading: "What a motion graphics project can include",
  capabilities: [
    "Animated titles, lower-thirds and on-screen text",
    "Data and chart visualization",
    "Icon, infographic and interface animation",
    "Logo animation and brand motion assets",
    "Reusable intros, outros and template packages",
    "Versions for video, social, presentations and web",
  ],

  benefitsHeading: "Why choose our motion graphics studio",
  benefits: [
    {
      title: "Built for reuse",
      description:
        "Packages and templates are made so you can use them across future content, not just one video.",
    },
    {
      title: "On-brand motion",
      description:
        "Animation follows your brand guidelines rather than a generic template look.",
    },
    {
      title: "Data made clear",
      description:
        "Charts and figures are animated to make numbers easy to follow, not just decorative.",
    },
    {
      title: "Fits into existing video",
      description:
        "We can design graphics to drop into footage or animation you already have.",
    },
  ],

  useCasesHeading: "Who uses motion graphics services",
  useCases: [
    "Brands that need animated titles or an intro and outro package for recurring video",
    "Companies that want data or statistics animated for a video or presentation",
    "Businesses that want their logo and brand elements animated for use across content",
    "Teams that need reusable motion templates for ongoing content production",
    "Agencies and production teams that need a motion graphics partner",
  ],

  processHeading: "How a motion graphics project runs",
  process: [
    {
      title: "Brief and references",
      description:
        "We agree what the graphics need to do, where they will appear and the style to aim for.",
    },
    {
      title: "Style frames",
      description:
        "We design key frames so you can approve the look before animation begins.",
    },
    {
      title: "Animation",
      description:
        "We animate the graphics, with review points along the way.",
    },
    {
      title: "Delivery and handover",
      description:
        "We deliver final files in the formats you need, plus editable versions of reusable packages where agreed.",
    },
  ],

  laterSections: [
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Motion graphics do not tell a story on their own",
          text: "They are strong at information and brand identity. If you need characters or a narrative, a different format fits better.",
        },
        {
          title: "Templates need a clear brief",
          text: "A reusable package is only as flexible as the brief for it, so decide early which elements will change between uses.",
        },
        {
          title: "Style takes a round to settle",
          text: "Agreeing the look on a few key frames first is faster than changing it once animation is finished.",
        },
      ],
    },
  ],

  faqHeading: "Motion graphics services questions",
  faqs: [
    {
      question: "How much do motion graphics cost?",
      answer:
        "We do not publish prices. The cost of motion graphics depends on how many elements there are, how complex the animation is, the length, whether the work is a one-off or a reusable package, and the number of revisions. We scope each project from your brief and quote from that.",
    },
    {
      question: "Are motion graphics the same as an explainer video?",
      answer:
        "No. Explainer videos tell a story, usually with a script and voiceover. Motion graphics are animated graphic elements such as titles, data visuals and brand animation, and they are often used inside other video content.",
    },
    {
      question: "Can you animate our existing logo?",
      answer:
        "Yes. Logo animation and brand motion assets are part of this service.",
    },
    {
      question: "Can you create a reusable intro and outro template?",
      answer:
        "Yes. Motion graphic packages built for repeated use across future content are a common request.",
    },
    {
      question: "Can you animate data or statistics for a presentation?",
      answer:
        "Yes. Data and chart visualization is part of this service, for video or presentation use.",
    },
    {
      question: "Can motion graphics be added to a video we have already filmed?",
      answer:
        "Yes. We can design titles, lower-thirds and graphics to fit footage you already have.",
    },
  ],

  relatedLink: {
    label: "Video & Animation",
    href: "/services/video-animation",
    description:
      "Our core video and animation service. Motion graphics covers the non-narrative animation work within it.",
  },
  relatedLinks: [
    {
      label: "2D animation services",
      href: "/services/video-animation/2d-animated-explainer-videos",
      description: "Illustrated, character-led animation for stories and explanations.",
    },
    {
      label: "Social media video production",
      href: "/services/video-animation/social-media-videos",
      description: "Platform-ready video where animated text and graphics carry the message.",
    },
    {
      label: "Corporate video production",
      href: "/services/video-animation/corporate-video-production",
      description: "Filmed business video that benefits from clean titles and graphics.",
    },
    {
      label: "Explainer video production",
      href: "/services/video-animation/explainer-videos",
      description: "Story-led videos that explain a product, service or idea.",
    },
  ],
  closingCta: {
    headline: "Ready to talk about your motion graphics?",
    subtext:
      "Tell us what you need animated and where it will appear, and we will outline the work and the style.",
  },
};
