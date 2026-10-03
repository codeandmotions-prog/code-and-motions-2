import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Video,
  LayoutTemplate,
  ImagePlus,
  Cpu,
  Palette,
  Bot,
  Search,
  Layers,
  Code2,
  Rocket,
} from "lucide-react";

export type AiBenefit = {
  title: string;
  description: string;
};

export type AiFaq = {
  question: string;
  answer: string;
};

export type AiProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** A real, existing internal page this sub-service naturally pairs with. */
export type AiRelatedLink = {
  label: string;
  href: string;
  description: string;
};

export type AiSubService = {
  slug: string;
  name: string;
  /** Short, premium description shown on the sub-service card. */
  shortDescription: string;
  /** Short keyword chips shown on the card — not full sentences. */
  tags: string[];
  icon: LucideIcon;
  gradient: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  capabilitiesHeading: string;
  capabilities: string[];
  benefitsHeading: string;
  benefits: AiBenefit[];
  faqHeading: string;
  faqs: AiFaq[];
  relatedLink: AiRelatedLink;
};

export type AiDevelopmentContent = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  capabilitiesHeading: string;
  capabilities: string[];
  benefitsHeading: string;
  benefits: AiBenefit[];
  process: AiProcessStep[];
  faqHeading: string;
  faqs: AiFaq[];
  relatedSlugs: string[];
};

export const aiDevelopment: AiDevelopmentContent = {
  seoTitle: "AI Development Services",
  metaDescription:
    "Custom AI development services for businesses in the USA, UK and Europe — AI-powered websites, software, video, image and design work, plus custom AI agents.",
  h1: "AI Development Services",
  primaryKeyword: "AI development services",
  secondaryKeywords: ["AI development company", "custom AI development", "AI solutions", "AI automation"],
  intro:
    "Code & Motions builds custom AI development solutions for businesses across the USA, UK and Europe — from AI-powered websites and software to AI video, image and design work, and domain-specific AI agents. We fold practical AI into the products and workflows you already run, rather than adding a chatbot for its own sake.",
  capabilitiesHeading: "AI Development, Covered End to End",
  capabilities: [
    "Custom AI feature development for existing software and websites",
    "AI-powered content workflows — video, image and design",
    "Custom AI agent development for domain-specific tasks",
    "Integrating AI models and APIs (such as OpenAI or Anthropic) into your product",
    "AI-assisted automation for repetitive business processes",
    "AI strategy and scoping for teams new to AI adoption",
  ],
  benefitsHeading: "Why Choose Our AI Development Services",
  benefits: [
    {
      title: "Practical, Not Hype",
      description:
        "We build AI features that solve a real problem in your product or workflow — not AI for the sake of a press release.",
    },
    {
      title: "Full-Stack Capability",
      description:
        "The same team that builds your software, website or design can integrate AI directly into it — no extra vendor to coordinate.",
    },
    {
      title: "Domain-Aware Agents",
      description:
        "Our experience building software like LabNova means we understand the operational detail domain-specific AI agents need to actually be useful.",
    },
    {
      title: "Built to Extend",
      description:
        "AI features are engineered to grow with your product, not as a disconnected bolt-on that becomes technical debt.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discover",
      description: "We start by understanding your workflow, data and the problem you actually want AI to solve.",
      icon: Search,
    },
    {
      step: "02",
      title: "Design & Prototype",
      description: "We map out the right approach — model, integration point and user experience — before writing production code.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Build & Integrate",
      description: "We build and integrate the AI feature or agent into your existing software, website or workflow.",
      icon: Code2,
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "We launch, monitor real-world performance, and refine the feature as usage teaches us more.",
      icon: Rocket,
    },
  ],
  faqHeading: "AI Development FAQs",
  faqs: [
    {
      question: "What is AI development?",
      answer:
        "AI development is building software, features or agents that use artificial intelligence — such as machine learning models or large language models — to automate tasks, generate content, or handle work that would otherwise need to be done manually.",
    },
    {
      question: "How much does custom AI development cost?",
      answer:
        "Cost depends heavily on scope — a single AI feature added to an existing product costs far less than a custom AI agent built from scratch. Contact us with your project details and we'll give you a clear estimate.",
    },
    {
      question: "What can an AI development company build?",
      answer:
        "Beyond chatbots, AI development spans AI-powered content tools (video, image, design), custom AI features inside software or websites, workflow automation, and domain-specific AI agents. Code & Motions builds across all of these — see our AI Development sub-services below.",
    },
    {
      question: "Can AI be integrated into an existing website or software?",
      answer:
        "Yes. Most of our AI development work is adding AI capability to a product you already have, rather than building something from a blank page.",
    },
    {
      question: "How long does AI development take?",
      answer:
        "Timelines vary depending on scope and complexity — we'll give you a clear estimate once we understand your requirements.",
    },
    {
      question: "Can you build custom AI agents?",
      answer:
        "Yes, including domain-specific AI agents for healthcare, laboratory and school environments — see our AI Agents service below.",
    },
    {
      question: "Do you offer support after an AI feature is launched?",
      answer:
        "Yes. AI features typically need monitoring and refinement after launch, and we stay involved to do that.",
    },
  ],
  relatedSlugs: ["software-development", "website-development", "graphic-design"],
};

export const aiSubServices: AiSubService[] = [
  {
    slug: "ai-video-development",
    name: "AI Video Development",
    shortDescription:
      "AI-assisted video production — from AI-generated supporting footage to automated editing and repurposing workflows.",
    tags: ["AI video creation", "AI video production", "automated video editing"],
    icon: Video,
    gradient: "linear-gradient(155deg, #0A0E1A 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "AI Video Development Services",
    metaDescription:
      "AI video development services — AI-assisted video creation, editing and production workflows for marketing, product and social video, for brands in the USA, UK and Europe.",
    h1: "AI Video Development",
    primaryKeyword: "AI video creation",
    secondaryKeywords: ["AI video development", "AI video production services"],
    intro:
      "We combine our video & animation production experience with AI video tools to speed up editing, generate supporting footage, and build repeatable AI-assisted video workflows — for marketing, product and social content.",
    capabilitiesHeading: "AI Video Development, Covered End to End",
    capabilities: [
      "AI-assisted editing workflows that cut production turnaround",
      "AI-generated supporting footage and B-roll",
      "AI voice and avatar-based video for explainer and training content",
      "Automated repurposing of long-form video into social clips",
    ],
    benefitsHeading: "Why Choose Our AI Video Development Service",
    benefits: [
      { title: "Faster Turnaround", description: "AI-assisted workflows shorten the time between brief and finished video." },
      { title: "Human-Led, AI-Assisted", description: "AI speeds up production; our video and animation team still directs the creative." },
      { title: "Built On Real Production Experience", description: "This sits on top of our existing video & animation service, not a standalone AI experiment." },
    ],
    faqHeading: "AI Video Development FAQs",
    faqs: [
      {
        question: "What's the difference between AI video and your regular animation service?",
        answer:
          "AI Video Development uses AI tools to speed up parts of production — editing, footage generation, repurposing — while our core Video & Animation service is fully human-led. Many projects use both together.",
      },
      {
        question: "Can AI generate a full video for us?",
        answer:
          "AI can generate supporting elements — footage, voice, avatars — but we recommend a human-directed process for anything customer-facing, to keep quality and brand consistency high.",
      },
      {
        question: "Do you use AI avatars for explainer videos?",
        answer: "Yes, AI avatar and voice tools are one option for explainer and training video content, depending on your use case.",
      },
      {
        question: "Can AI speed up editing of footage we already have?",
        answer: "Yes — AI-assisted editing workflows can speed up cutting, repurposing and captioning of footage you already have.",
      },
    ],
    relatedLink: {
      label: "Video & Animation",
      href: "/services/video-animation",
      description: "Our core production service — AI Video Development builds on top of it.",
    },
  },
  {
    slug: "ai-website-development",
    name: "AI Website Development",
    shortDescription:
      "Websites with built-in AI features — smart search, on-site AI assistants and personalization — built on our website development foundation.",
    tags: ["AI website development", "AI-powered websites", "website AI integration"],
    icon: LayoutTemplate,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 55%, #22D3EE 100%)",
    seoTitle: "AI Website Development Services",
    metaDescription:
      "AI website development services — AI-powered search, chat and personalization features built into fast, custom-coded or WordPress websites, for businesses in the USA, UK and Europe.",
    h1: "AI Website Development",
    primaryKeyword: "AI website development",
    secondaryKeywords: ["AI-powered website", "AI website features"],
    intro:
      "We build websites with AI features built in — from AI-powered search and on-site assistants to content personalization — on the same custom-coded or WordPress foundation as our core website development service.",
    capabilitiesHeading: "AI Website Development, Covered End to End",
    capabilities: [
      "AI-powered on-site search and assistants",
      "AI-driven content personalization",
      "AI-assisted content generation workflows for site content",
      "Integrating AI features into an existing website, not just new builds",
    ],
    benefitsHeading: "Why Choose Our AI Website Development Service",
    benefits: [
      { title: "Performance First", description: "AI features are added without compromising the page speed our website builds are known for." },
      { title: "Works With What You Have", description: "We can add AI features to an existing website, not just new builds." },
      { title: "One Team, Full Stack", description: "The same team building your site builds the AI feature inside it — no handoff between vendors." },
    ],
    faqHeading: "AI Website Development FAQs",
    faqs: [
      {
        question: "Can you add AI features to my existing website?",
        answer: "Yes — adding an AI feature (search, assistant, personalization) to an existing site is one of the most common AI Website Development requests.",
      },
      {
        question: "Will AI features slow my website down?",
        answer: "We design AI integrations to avoid hurting page speed, since fast-loading pages are core to how we build websites.",
      },
      {
        question: "Do you build AI chatbots for websites?",
        answer: "Yes, on-site AI assistants and chat-style interfaces are part of this service, scoped to your actual use case rather than a generic bolt-on widget.",
      },
      {
        question: "Can this be added to a WordPress site?",
        answer: "Yes, AI features can be integrated into WordPress or Elementor sites as well as fully custom-coded builds.",
      },
    ],
    relatedLink: {
      label: "Website Development",
      href: "/services/website-development",
      description: "Our core website service — AI Website Development adds AI features on top of it.",
    },
  },
  {
    slug: "ai-image-creation",
    name: "AI Image Creation",
    shortDescription:
      "AI-generated and AI-assisted imagery for marketing, product and web use — refined to fit your existing brand.",
    tags: ["AI image generation", "AI image creation", "AI-generated graphics"],
    icon: ImagePlus,
    gradient: "linear-gradient(155deg, #22D3EE 0%, #1547E0 55%, #384057 100%)",
    seoTitle: "AI Image Creation Services",
    metaDescription:
      "AI image creation and generation services — AI-generated marketing, product and web imagery designed to fit your existing brand, for businesses in the USA, UK and Europe.",
    h1: "AI Image Creation",
    primaryKeyword: "AI image generation",
    secondaryKeywords: ["AI image creation", "AI-generated graphics"],
    intro:
      "We use AI image generation tools to produce marketing, product and web imagery — then apply our graphic design experience to make sure it actually fits your brand, rather than looking like generic AI output.",
    capabilitiesHeading: "AI Image Creation, Covered End to End",
    capabilities: [
      "AI-generated marketing and social imagery",
      "AI-assisted product and concept visuals",
      "Brand-consistent AI image workflows",
      "AI image editing and refinement — background, style and variation generation",
    ],
    benefitsHeading: "Why Choose Our AI Image Creation Service",
    benefits: [
      { title: "Designed, Not Just Generated", description: "Our design team reviews and refines AI output so it fits your brand — not raw, unfiltered AI images." },
      { title: "Faster Concepting", description: "AI image generation speeds up the concept and iteration stage of a design project." },
      { title: "Backed By Real Design Experience", description: "This sits on top of our graphic design service, applying the same design judgment to AI-generated work." },
    ],
    faqHeading: "AI Image Creation FAQs",
    faqs: [
      {
        question: "Will AI-generated images look generic?",
        answer: "Raw AI output often does — which is why our design team reviews, refines and art-directs every AI image before it's used, rather than delivering unedited AI output.",
      },
      {
        question: "Can you generate product images with AI?",
        answer: "Yes, AI-assisted product and concept visuals are one of the most common uses of this service.",
      },
      {
        question: "Do you use AI to edit existing images, or only generate new ones?",
        answer: "Both — AI-assisted editing (background changes, style variations, upscaling) is part of this service alongside generating new images.",
      },
      {
        question: "Can AI-generated images match our existing brand guidelines?",
        answer: "Yes, keeping AI-generated imagery consistent with your existing brand is a core part of how we approach this service.",
      },
    ],
    relatedLink: {
      label: "Graphic Design",
      href: "/services/graphic-design",
      description: "Our core design service — AI Image Creation uses the same design judgment, applied to AI-generated work.",
    },
  },
  {
    slug: "ai-software-development",
    name: "AI Software Development",
    shortDescription:
      "Custom software with AI built into the core product — from a single AI-powered feature to full applications built around an AI workflow.",
    tags: ["AI software development", "custom AI software", "AI-powered software"],
    icon: Cpu,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",
    seoTitle: "AI Software Development Services",
    metaDescription:
      "Custom AI software development — AI-powered features, automation and full applications built around AI models, for businesses in the USA, UK and Europe.",
    h1: "AI Software Development",
    primaryKeyword: "AI software development",
    secondaryKeywords: ["custom AI software", "AI-powered software development"],
    intro:
      "We build custom software with AI at the core — from a single AI-powered feature added to an existing product, to a full application built around an AI model or workflow — using the same engineering standards as our core software development service.",
    capabilitiesHeading: "AI Software Development, Covered End to End",
    capabilities: [
      "AI-powered features added to existing software",
      "Full applications architected around an AI model or workflow",
      "Integration with third-party AI APIs and models",
      "AI-driven automation for internal tools and processes",
    ],
    benefitsHeading: "Why Choose Our AI Software Development Service",
    benefits: [
      { title: "Senior Engineering", description: "AI features are built by the same senior engineering team behind our core software development work, not a separate AI-only contractor." },
      { title: "Architected to Scale", description: "AI-powered features are built to handle real usage, not just a demo." },
      { title: "Model-Agnostic Approach", description: "We choose the AI model or API that fits your project, rather than defaulting to one provider." },
      { title: "Ongoing Support", description: "AI features need monitoring and refinement as usage grows — we stay involved after launch." },
    ],
    faqHeading: "AI Software Development FAQs",
    faqs: [
      {
        question: "Do you build custom AI models, or use existing AI APIs?",
        answer: "Most projects use existing AI models and APIs, integrated into custom software — building a model from scratch is rarely the most practical approach for a business application.",
      },
      {
        question: "Can you add an AI feature to our existing software?",
        answer: "Yes — adding a single, well-scoped AI feature to an existing product is one of the most common AI Software Development requests.",
      },
      {
        question: "What AI providers do you work with?",
        answer: "We integrate with major AI providers and models (such as OpenAI or Anthropic) based on what fits your project's requirements.",
      },
      {
        question: "Is this the same as your Software Development service?",
        answer: "It's the AI-focused extension of it — the same engineering team, applied specifically to AI-powered features and applications.",
      },
    ],
    relatedLink: {
      label: "Software Development",
      href: "/services/software-development",
      description: "Our core engineering service — AI Software Development is its AI-focused extension.",
    },
  },
  {
    slug: "ai-design",
    name: "AI Design",
    shortDescription:
      "AI-assisted design tooling for UI concepting, design variation and production-ready assets — directed by our design team.",
    tags: ["AI design services", "AI-assisted design", "AI design tools"],
    icon: Palette,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #7CE6F7 100%)",
    seoTitle: "AI Design Services",
    metaDescription:
      "AI design services — AI-assisted UI concepting, design variation and production-ready assets, directed by a design team, for businesses in the USA, UK and Europe.",
    h1: "AI Design",
    primaryKeyword: "AI design services",
    secondaryKeywords: ["AI-assisted design", "AI design tools"],
    intro:
      "We use AI design tools to speed up concepting and explore more directions faster — then apply our design and UI/UX experience to turn AI-assisted output into production-ready work.",
    capabilitiesHeading: "AI Design, Covered End to End",
    capabilities: [
      "AI-assisted UI/UX concepting",
      "Rapid design variation and exploration",
      "AI-assisted production of marketing and brand assets",
      "AI design tooling integrated into an existing design workflow",
    ],
    benefitsHeading: "Why Choose Our AI Design Service",
    benefits: [
      { title: "Design-Led AI Use", description: "AI speeds up exploration; our design team makes the final creative decisions." },
      { title: "Faster Concept-to-Option Cycles", description: "Explore more directions in less time before committing to a design path." },
      { title: "Grounded in Real Design Practice", description: "This sits on top of our graphic design and UI/UX experience, not a standalone AI tool with no design oversight." },
    ],
    faqHeading: "AI Design FAQs",
    faqs: [
      {
        question: "Does AI replace your designers?",
        answer: "No — AI speeds up exploration and iteration; our designers direct the process and make the final calls on what ships.",
      },
      {
        question: "Can AI design tools be used for UI/UX work?",
        answer: "Yes, AI-assisted concepting is part of how we approach UI/UX exploration, alongside traditional design work.",
      },
      {
        question: "Will AI Design look different from your regular Graphic Design work?",
        answer: "No — AI is a tool inside our existing design process, so the output is held to the same design standard as our regular graphic design work.",
      },
      {
        question: "Can you use AI design tools within our existing brand guidelines?",
        answer: "Yes, staying consistent with your existing brand system is part of how we scope any AI Design project.",
      },
    ],
    relatedLink: {
      label: "Graphic Design",
      href: "/services/graphic-design",
      description: "Our core design service — AI Design uses AI tooling inside the same design process.",
    },
  },
  {
    slug: "ai-agents",
    name: "AI Agents for Healthcare, Laboratories & Schools",
    shortDescription:
      "Domain-specific AI agents built for the operational detail of healthcare, laboratory and school environments — informed by our own lab software experience.",
    tags: ["AI agents", "AI agents for healthcare", "AI agents for laboratories", "AI agents for schools"],
    icon: Bot,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    seoTitle: "AI Agents for Healthcare, Laboratories & Schools",
    metaDescription:
      "Custom AI agents for healthcare, laboratory and school environments — built around real operational workflows, for organizations in the USA, UK and Europe.",
    h1: "AI Agents for Healthcare, Laboratories & Schools",
    primaryKeyword: "AI agents for healthcare",
    secondaryKeywords: ["AI agents for laboratories", "AI agents for schools", "AI agents", "AI automation"],
    intro:
      "We build domain-specific AI agents for healthcare, laboratory and school environments — automating well-defined, repetitive tasks around the operational reality of how these organizations actually run, informed by our experience building LabNova, our own laboratory management software.",
    capabilitiesHeading: "AI Agents, Covered End to End",
    capabilities: [
      "AI agents for laboratory workflows — informed by building LabNova",
      "AI agents for healthcare administrative and operational tasks",
      "AI agents for school administrative workflows",
      "Custom AI agent design around your specific process, not a generic chatbot",
    ],
    benefitsHeading: "Why Choose Our AI Agents Service",
    benefits: [
      { title: "Built On Real Domain Experience", description: "We've built and shipped LabNova, our own laboratory management software — we understand this kind of operational environment first-hand." },
      { title: "Scoped to Real Tasks", description: "Every AI agent is scoped to specific, well-defined tasks, not an open-ended \"do everything\" assistant." },
      { title: "Data-Aware by Design", description: "We design agents around how your data and systems actually work, not a generic template." },
      { title: "Human Oversight Built In", description: "Agents are built with appropriate human checkpoints for sensitive healthcare, lab and school environments." },
    ],
    faqHeading: "AI Agents FAQs",
    faqs: [
      {
        question: "Can you build AI agents specifically for healthcare?",
        answer: "Yes — AI agents for healthcare administrative and operational tasks are part of this service, scoped around your specific workflow.",
      },
      {
        question: "Can you build AI agents for laboratories?",
        answer: "Yes, and this is informed directly by our experience building LabNova, our own laboratory management software.",
      },
      {
        question: "Can you build AI agents for schools?",
        answer: "Yes, for school administrative and operational workflows.",
      },
      {
        question: "Are these agents safe to use with sensitive healthcare or student data?",
        answer:
          "We design agents with appropriate human oversight and scope them to your specific task — exact data handling and compliance requirements are discussed and agreed with you per project, based on your organization's own policies and applicable regulations.",
      },
      {
        question: "Is this the same as a general chatbot?",
        answer: "No — these are scoped to specific, well-defined operational tasks in your environment, not an open-ended general-purpose chatbot.",
      },
    ],
    relatedLink: {
      label: "LabNova",
      href: "/software/labnova",
      description: "Our own laboratory management software — the real-world experience behind our AI Agents for Laboratories.",
    },
  },
];

export function getAiSubService(slug: string): AiSubService | undefined {
  return aiSubServices.find((service) => service.slug === slug);
}

/** Icon + gradient for the AI Development category itself (used by its hero). */
export const aiDevelopmentIcon: LucideIcon = BrainCircuit;
export const aiDevelopmentGradient = "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)";
