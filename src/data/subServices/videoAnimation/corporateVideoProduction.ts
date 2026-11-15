import { Video } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { videoAreaServed, videoHeroCtas } from "./shared";

/**
 * Live-action and corporate video. The copy deliberately makes no claims
 * about filming locations, crew size or equipment: those are not confirmed
 * facts, so it says they are agreed per project.
 */
export const corporateVideoProduction: SubService = {
  slug: "corporate-video-production",
  name: "Corporate & Live-Action Video",
  shortDescription:
    "Corporate video production: filmed company, product and brand videos from script to final edit.",
  tags: ["corporate video production", "live-action video", "commercial video production"],
  icon: Video,
  gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",

  seoTitle: "Corporate Video Production Services",
  metaDescription:
    "Corporate video production services: filmed company, brand and commercial videos from script to final edit, for clients worldwide.",
  h1: "Corporate Video Production Services",
  primaryKeyword: "corporate video production",
  secondaryKeywords: [
    "corporate video production services",
    "corporate video production company",
    "commercial video production company",
    "corporate video production companies",
    "corporate event video production",
    "corporate video production agency",
  ],
  heroCtas: videoHeroCtas,
  areaServed: videoAreaServed,
  intro:
    "We provide corporate video production services for businesses that need filmed, professional video: company introductions, brand films, product and service videos, interviews and event coverage. As a corporate video production company we plan the project, direct the shoot where filming is involved, and finish the edit, for clients in the USA, UK, Australia, Canada, the Middle East and beyond.",

  whatIsQuestion: "What is a corporate video?",
  whatIsAnswer:
    "A corporate video is a professionally produced video made for a business to present itself, its people, products or services. Common types are company introductions, brand films, product and service videos, customer testimonials, training and internal communications, and event videos. Live-action corporate video is filmed with real people and places rather than animated.",

  sections: [
    {
      heading: "Corporate video production services we offer",
      paragraphs: [
        "Corporate video covers many different jobs. These are the formats businesses ask us for most often:",
      ],
      bullets: [
        {
          title: "Company and brand films",
          text: "A short film that explains who you are, what you do and what makes you different, for your website, pitches and recruitment.",
        },
        {
          title: "Product and service videos",
          text: "Filmed demonstrations and walk-throughs that show your offer in use and answer buyers' questions.",
        },
        {
          title: "Testimonials and interviews",
          text: "Customers and team members speaking on camera, planned so the answers are focused and credible.",
        },
        {
          title: "Commercial and marketing video",
          text: "Filmed video made to sell or promote, for campaigns, ads and landing pages. See also our [promotional video production](/services/video-animation/promotional-video-production).",
        },
        {
          title: "Training and internal communications",
          text: "Clear videos for onboarding, procedures and company updates.",
        },
        {
          title: "Corporate event video production",
          text: "Coverage of conferences, launches and company events, edited into highlights and shareable clips.",
        },
      ],
    },
    {
      heading: "How a corporate video production project works",
      paragraphs: [
        "A corporate video is won or lost in preparation. We plan the video around its purpose before anyone picks up a camera.",
      ],
      subsections: [
        {
          heading: "1. Brief and concept",
          paragraphs: [
            "We agree who the video is for, what it should achieve and where it will be used, then develop a concept and treatment you can approve.",
          ],
        },
        {
          heading: "2. Script, shot list and planning",
          paragraphs: [
            "We write the script or interview questions, plan the shots and agree locations, people, schedule and permissions, so the shoot day runs to a plan.",
          ],
        },
        {
          heading: "3. Filming",
          paragraphs: [
            "The shoot is directed against the plan. Where and how we film depends on the project. Because location, crew and travel affect both the schedule and the result, we agree them with you at the start rather than assuming.",
          ],
        },
        {
          heading: "4. Edit, sound and graphics",
          paragraphs: [
            "We edit the footage, add music and sound, color correct and add titles, captions or animated graphics. Our [motion graphics services](/services/video-animation/motion-graphics) can be layered into a filmed video for data, logos and lower-thirds.",
          ],
        },
        {
          heading: "5. Delivery and versions",
          paragraphs: [
            "You receive the final video and the shorter versions you need for your website, social channels and presentations.",
          ],
        },
      ],
    },
    {
      heading: "Live action or animation?",
      paragraphs: [
        "Live action is the right choice when people, places and real products are the point: a founder explaining the company, a customer telling their story, a product shown in use. If your subject is an idea, a process or software, animation is often clearer and easier to update, and our [explainer video production](/services/video-animation/explainer-videos) and [animated video production](/services/video-animation) pages cover it. Many businesses use both, with filmed video for credibility and animation to explain.",
      ],
    },
  ],

  capabilitiesHeading: "What a corporate video project can include",
  capabilities: [
    "Concept, script and treatment",
    "Shot list, shoot planning and direction",
    "Filming of interviews, products and locations",
    "Editing, color correction and sound",
    "Animated titles, captions and graphics",
    "Cut-downs for web, social and presentations",
  ],

  benefitsHeading: "Why choose us for corporate video production",
  benefits: [
    {
      title: "Planned around your goal",
      description:
        "Every video starts with what it should achieve, so the shoot is built around a purpose.",
    },
    {
      title: "Filmed and animated in one place",
      description:
        "Live action and animation come from the same studio, so graphics and footage work together.",
    },
    {
      title: "Clear agreement on logistics",
      description:
        "Location, crew and schedule are agreed at the start, so there are no surprises on the day.",
    },
    {
      title: "Versions for every channel",
      description:
        "One production gives you the main video and shorter edits for web, social and presentations.",
    },
  ],

  useCasesHeading: "Who uses corporate video production",
  useCases: [
    "Businesses that need a company or brand film for their website",
    "Teams that want customer testimonials and interviews filmed professionally",
    "Companies producing training or internal communication videos",
    "Organizations that need a record of a conference, launch or event",
    "Startups that need credible footage for investors and customers",
  ],

  processHeading: "How a corporate video project runs",
  process: [
    {
      title: "Brief and treatment",
      description:
        "We agree the goal, audience and format, and share a concept for your approval.",
    },
    {
      title: "Script and shoot plan",
      description:
        "We write the script or questions, plan the shots and agree location, people and schedule.",
    },
    {
      title: "Filming",
      description:
        "We direct the shoot against the plan and capture everything the edit needs.",
    },
    {
      title: "Edit and delivery",
      description:
        "We edit, add sound and graphics, take your feedback and deliver the final files.",
    },
  ],

  laterSections: [
    {
      heading: "How to choose a video production company",
      paragraphs: [
        "Whether you are comparing corporate video production companies or a corporate video production agency, a few questions separate a good partner from a poor fit.",
      ],
      bullets: [
        {
          title: "Ask to see work like yours",
          text: "Look for videos of the same type and tone, not only the most impressive reel.",
        },
        {
          title: "Ask who does what",
          text: "Find out who writes, who directs and who edits, and whether the people you meet are the people who will do the work.",
        },
        {
          title: "Ask what is included",
          text: "Clarify scripting, music, revisions and delivery versions so you can compare like with like.",
        },
        {
          title: "Ask how logistics work",
          text: "Location, travel, crew and schedule should be explained clearly, not left vague.",
        },
        {
          title: "Check the process",
          text: "A clear brief, script approval and review points are a sign of a well-run project.",
        },
      ],
    },
    {
      heading: "Measuring whether a corporate video worked",
      paragraphs: [
        "Decide before filming what success looks like, because the answer shapes the video and tells you what to measure. A website film might be judged on how many viewers watch to the end and whether visitors who watch go on to enquire. A training video might be judged on completion and on fewer repeated questions. A sales video might be judged on whether prospects who see it move forward more often.",
        "Compare against what you had before the video, such as the same page without it, rather than looking at views alone. We can help you set up that comparison when we plan the project. To discuss a corporate video, [contact us](/contact) with what you want it to achieve.",
      ],
    },
  ],

  faqHeading: "Corporate video production questions",
  faqs: [
    {
      question: "What is a corporate video?",
      answer:
        "A corporate video is a professionally made video that presents a business, its people, products or services. Typical examples are company films, product videos, testimonials, training videos and event coverage.",
    },
    {
      question: "How much does video production cost?",
      answer:
        "We do not publish prices, because video production cost varies with the project. The main factors are the length of the finished video, the number of shoot days and locations, how many people appear on camera, the crew and equipment needed, the amount of editing and graphics, and the number of versions and revisions. We scope each project from your brief and quote from that.",
    },
    {
      question: "What does a video production company do?",
      answer:
        "A video production company plans, films and edits video for clients. That usually includes developing the idea, writing the script, directing the shoot, editing the footage, adding sound and graphics, and delivering the finished files.",
    },
    {
      question: "What should I look for in a video production company?",
      answer:
        "Look for relevant work, a clear process, a clear statement of what is included, and straight answers about location, crew and schedule. Make sure you know who will actually do the work.",
    },
    {
      question: "Should I hire a videographer or a production company?",
      answer:
        "A single videographer can suit a simple shoot. A production company is the better fit when the project also needs scripting, direction, editing, sound, graphics or animation handled together, which is how most corporate videos are made.",
    },
    {
      question: "How long should a corporate video be?",
      answer:
        "It depends on the purpose. A company film or homepage video is usually kept short, while training or event videos can run longer. We recommend a length from your goal and where the video will be shown.",
    },
    {
      question: "How do I prove the ROI of video production?",
      answer:
        "Set a goal and a measure before filming, such as enquiries from the page with the video, completion of a training video or movement through your sales process. Then compare with what you had before, rather than relying on view counts alone.",
    },
  ],

  relatedLink: {
    label: "Video & Animation",
    href: "/services/video-animation",
    description:
      "Our core video and animation service. Corporate and live-action video is the filmed side of it.",
  },
  relatedLinks: [
    {
      label: "Promotional video production",
      href: "/services/video-animation/promotional-video-production",
      description: "Videos built to promote a product, offer or campaign, filmed or animated.",
    },
    {
      label: "Explainer video production",
      href: "/services/video-animation/explainer-videos",
      description: "Animated or mixed-media videos that explain what you do.",
    },
    {
      label: "Social media video production",
      href: "/services/video-animation/social-media-videos",
      description: "Short, platform-ready edits of your filmed video for social feeds.",
    },
    {
      label: "Motion graphics services",
      href: "/services/video-animation/motion-graphics",
      description: "Animated titles, data and graphics that finish a filmed video.",
    },
  ],
  closingCta: {
    headline: "Ready to plan your corporate video?",
    subtext:
      "Tell us what the video needs to achieve and where it will be shown, and we will outline how we would produce it.",
  },
};
