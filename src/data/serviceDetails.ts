export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceExampleWork = {
  label: string;
  href: string;
  description: string;
};

export type ServiceDetail = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  benefits: ServiceBenefit[];
  useCases: string[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  /**
   * Optional per-service overrides for headings that are otherwise
   * hardcoded (and identical) across every service page. Left undefined,
   * a page falls back to the existing shared copy — so adding these only
   * for one service does not change any other service page's output.
   */
  overviewHeading?: string;
  useCasesHeading?: string;
  faqHeading?: string;
  /** Optional real, internal proof-of-work link (e.g. to LabNova). */
  exampleWork?: ServiceExampleWork;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "software-development",
    seoTitle: "Custom Software Development Services",
    metaDescription:
      "Custom software, SaaS, AI and CRM/ERP development for growing businesses in the USA, UK and Europe — built and supported by a senior engineering team.",
    h1: "Software Development Services",
    primaryKeyword: "software development services",
    secondaryKeywords: [
      "custom software development company",
      "SaaS application development",
      "enterprise software development services",
    ],
    intro:
      "Code & Motions designs and builds custom software for businesses that have outgrown off-the-shelf tools — from SaaS platforms and AI-powered applications to CRM/ERP systems and internal automation. We handle the full lifecycle for clients across the USA, UK and Europe: architecture, engineering and long-term support.",
    benefits: [
      {
        title: "Built Around Your Workflow",
        description:
          "Off-the-shelf software forces you to adapt. We build systems shaped around how your team actually works.",
      },
      {
        title: "Scalable From Day One",
        description:
          "Every system is architected to handle growth, not just today's requirements.",
      },
      {
        title: "Senior Engineering",
        description:
          "Your project is handled by experienced engineers, not a rotating cast of juniors.",
      },
      {
        title: "Ongoing Support",
        description:
          "We stay involved after launch — fixing, extending and maintaining what we build.",
      },
    ],
    useCases: [
      "Startups building a SaaS product from the ground up",
      "Businesses replacing spreadsheets and manual processes with a proper internal system",
      "Teams needing custom integrations between existing tools",
      "Companies scaling past what a no-code platform can handle",
    ],
    overviewHeading: "Why Choose Our Software Development Team",
    useCasesHeading: "Who We Build Software For",
    faqHeading: "Software Development FAQs",
    exampleWork: {
      label: "LabNova",
      href: "/software/labnova",
      description:
        "Our laboratory management software, covering everything from database architecture to a working, launched product.",
    },
    faqs: [
      {
        question: "How long does a custom software project take?",
        answer:
          "Timelines vary by scope, but most projects move from discovery to a working first version within 8–16 weeks, with iterative releases after that.",
      },
      {
        question: "Do you work with startups or only established companies?",
        answer:
          "Both. We work with early-stage startups building their first product and established businesses modernizing internal systems.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We choose the stack based on the project — typically modern frameworks like React and Node.js, backed by cloud infrastructure such as Supabase.",
      },
      {
        question: "Do you build AI-powered software?",
        answer:
          "Yes. We build AI-powered features and applications — from automation and intelligent workflows to AI-assisted tools embedded directly in your product.",
      },
      {
        question: "Can you integrate with our existing CRM or ERP system?",
        answer:
          "Yes. We regularly build custom integrations and extensions for existing CRM and ERP platforms, as well as full custom CRM/ERP systems where an off-the-shelf tool no longer fits.",
      },
      {
        question: "Can you take over an existing codebase?",
        answer:
          "Yes. We regularly audit and continue development on projects started elsewhere.",
      },
    ],
    relatedSlugs: ["website-development", "seo"],
  },
  {
    slug: "website-development",
    seoTitle: "Custom Website Development Services",
    metaDescription:
      "Custom website development, WordPress and Elementor builds, landing pages and web applications for growing businesses in the USA, UK and Europe.",
    h1: "Website Development Services",
    primaryKeyword: "website development services",
    secondaryKeywords: [
      "custom website development company",
      "WordPress development agency",
      "web application development",
    ],
    intro:
      "We build custom websites, WordPress sites, Elementor pages, landing pages and web applications that load fast, rank well and convert — for growing businesses across the USA, UK and Europe. Whether you need a fully custom build or a client-editable WordPress site, we match the platform to your goals.",
    benefits: [
      {
        title: "Built for Speed",
        description:
          "Performance is designed in from the start, not patched on afterward.",
      },
      {
        title: "SEO-Ready Structure",
        description:
          "Clean semantic markup and proper technical foundations, so search engines can actually find you.",
      },
      {
        title: "Fully Custom Design",
        description:
          "No templates. Every site reflects your brand, not a theme marketplace.",
      },
      {
        title: "Easy to Maintain",
        description:
          "Clear, documented code that you — or any developer — can build on later.",
      },
    ],
    useCases: [
      "Businesses replacing an outdated or slow website",
      "Brands that need a landing page built to convert for a specific campaign",
      "Companies migrating off page builders onto a faster, custom-coded site",
      "Teams that need ongoing redesign and maintenance support",
    ],
    overviewHeading: "Why Our Website Development Stands Out",
    useCasesHeading: "Who We Build Websites For",
    faqHeading: "Website Development FAQs",
    faqs: [
      {
        question: "Do you build on WordPress or custom code?",
        answer:
          "Both, depending on your needs. We build fully custom sites on modern frameworks for performance-critical projects, and WordPress or Elementor sites when a client-editable CMS is the priority.",
      },
      {
        question: "Will my website be mobile-friendly?",
        answer:
          "Yes — every site we build is fully responsive and tested across desktop, tablet and mobile.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Yes, we regularly redesign and rebuild existing sites, migrating content and preserving existing SEO value.",
      },
      {
        question: "Do you offer ongoing maintenance after launch?",
        answer:
          "Yes, we offer maintenance packages covering updates, fixes and small content changes.",
      },
      {
        question: "Do you build landing pages for ad campaigns?",
        answer:
          "Yes. We build standalone landing pages optimized for a single conversion goal, designed to work with paid campaigns and A/B testing.",
      },
      {
        question: "What does a website redesign typically involve?",
        answer:
          "A redesign starts with an audit of your current site's performance, structure and content, then a rebuild that keeps what works, fixes what doesn't, and preserves your existing SEO rankings where possible.",
      },
    ],
    relatedSlugs: ["shopify-development", "software-development", "seo"],
  },
  {
    slug: "shopify-development",
    seoTitle: "Shopify Development & Migration Services",
    metaDescription:
      "Shopify store development, custom Shopify 2.0 themes, app integrations, and WooCommerce-to-Shopify migration for e-commerce brands in the USA, UK and Europe.",
    h1: "Shopify Development Services",
    primaryKeyword: "Shopify development services",
    secondaryKeywords: [
      "Shopify store development company",
      "custom Shopify theme development",
      "WooCommerce to Shopify migration",
    ],
    intro:
      "We design, build and optimize Shopify stores for e-commerce brands across the USA, UK and Europe — from custom Shopify 2.0 themes and app integrations to WooCommerce-to-Shopify migrations, we handle the full store experience end to end.",
    benefits: [
      {
        title: "Conversion-Focused Builds",
        description:
          "Every store is structured around how customers actually shop, not just how it looks.",
      },
      {
        title: "Shopify 2.0 Ready",
        description:
          "We build on the latest Shopify architecture for better performance and flexibility.",
      },
      {
        title: "Clean App Integrations",
        description:
          "We connect the tools you rely on without bloating your store's load time.",
      },
      {
        title: "Migration Without Downtime",
        description:
          "Moving from WooCommerce or another platform is handled carefully, with your data and SEO intact.",
      },
    ],
    useCases: [
      "Brands launching their first Shopify store",
      "Merchants migrating from WooCommerce or another platform",
      "Stores that need a custom theme built around a specific product experience",
      "Businesses whose current Shopify store has become slow or hard to manage",
    ],
    overviewHeading: "What Makes Our Shopify Builds Different",
    useCasesHeading: "Who We Build Shopify Stores For",
    faqHeading: "Shopify Development FAQs",
    faqs: [
      {
        question: "Can you migrate my store from WooCommerce to Shopify?",
        answer:
          "Yes, we handle full migrations, including products, customer data and redirects to protect your existing SEO.",
      },
      {
        question: "Do you build custom Shopify themes?",
        answer:
          "Yes, we build fully custom themes on Shopify 2.0, as well as customize existing themes.",
      },
      {
        question: "Will you help set up payments and shipping?",
        answer:
          "Yes, store configuration — payments, shipping and taxes — is part of every build.",
      },
      {
        question: "Can you improve the speed of my existing Shopify store?",
        answer:
          "Yes, we audit and optimize existing stores for load time and Core Web Vitals.",
      },
      {
        question: "What is Shopify 2.0 and why does it matter?",
        answer:
          "Shopify 2.0 is Shopify's current theme architecture, built around flexible sections and blocks. It gives merchants more control over page layout without custom code, and gives us more flexibility when building your theme.",
      },
      {
        question: "Can you build custom Shopify apps?",
        answer:
          "Yes. When an off-the-shelf app doesn't fit, we build custom Shopify apps and integrations tailored to your store's workflow.",
      },
    ],
    relatedSlugs: ["website-development", "seo", "video-animation"],
  },
  {
    slug: "video-animation",
    seoTitle: "2D Animation & Explainer Video Services",
    metaDescription:
      "2D animation, explainer videos and motion graphics for SaaS and product brands in the USA, UK and Europe — from product animation to promotional videos.",
    h1: "Video & Animation Services",
    primaryKeyword: "video and animation services",
    secondaryKeywords: [
      "2D animation studio",
      "SaaS explainer video production",
      "promotional video production",
    ],
    intro:
      "We produce 2D animation, explainer videos and motion graphics that turn complex products into content people actually watch — including SaaS and product explainer videos, logo animation, and promotional videos for brands across the USA, UK and Europe.",
    benefits: [
      {
        title: "Built to Explain",
        description:
          "Complex products and ideas, made clear in seconds, not paragraphs.",
      },
      {
        title: "Platform-Native Formats",
        description:
          "Content sized and paced for where it will actually run — social, web or ads.",
      },
      {
        title: "Consistent Brand Motion",
        description:
          "A visual style that stays recognizable across every video you publish.",
      },
      {
        title: "Structured Production",
        description:
          "A clear process from script to delivery that keeps projects moving without sacrificing quality.",
      },
    ],
    useCases: [
      "SaaS products that need an explainer video for their landing page",
      "Brands producing ongoing social media video content",
      "Companies launching a product that needs an animated demo",
      "Teams that want a consistent motion identity across campaigns",
    ],
    overviewHeading: "Why Brands Choose Our Animation Studio",
    useCasesHeading: "Who We Create Animation For",
    faqHeading: "Video & Animation FAQs",
    faqs: [
      {
        question: "How long does an explainer video take to produce?",
        answer:
          "Most explainer videos take 3–5 weeks from script to final delivery, depending on length and complexity.",
      },
      {
        question: "Do you write the script, or do we provide it?",
        answer:
          "Either — we can write the script from your brief, or animate a script you've already prepared.",
      },
      {
        question: "What formats do you deliver?",
        answer:
          "Whatever formats and aspect ratios you need — landscape for web, square or vertical for social.",
      },
      {
        question: "Can you animate our existing logo?",
        answer:
          "Yes, logo animation is one of our most common smaller-scope projects.",
      },
      {
        question: "Do you specialize in 2D animation specifically?",
        answer:
          "Yes. Most of our explainer and product videos are 2D animation — it's typically faster to produce and more cost-effective than 3D or live-action for explaining a product or idea.",
      },
      {
        question: "Can you create an explainer video for our SaaS product?",
        answer:
          "Yes. SaaS and product explainer videos are one of our most common projects — we break down what your product does and why it matters into a short, watchable video for your landing page or onboarding flow.",
      },
    ],
    relatedSlugs: ["graphic-design", "website-development", "software-development"],
  },
  {
    slug: "graphic-design",
    seoTitle: "Graphic Design Services",
    metaDescription:
      "Brand identity, logo design and marketing materials that keep your brand sharp across print and digital.",
    h1: "Graphic Design Services",
    primaryKeyword: "graphic design services",
    secondaryKeywords: [
      "brand identity design agency",
      "logo design company",
      "graphic design agency Pakistan",
    ],
    intro:
      "We design brand identities, marketing materials and digital graphics built to stay consistent everywhere your business shows up — from your logo to your next pitch deck.",
    benefits: [
      {
        title: "Systemized, Not One-Off",
        description:
          "We build design systems — logo, color, type — not just individual assets.",
      },
      {
        title: "Consistent Across Channels",
        description:
          "Your brand looks the same on your website, your packaging and your slides.",
      },
      {
        title: "Practical Deliverables",
        description:
          "Every asset comes ready to use — proper file formats, no guesswork for your team.",
      },
      {
        title: "Design That Serves the Business",
        description:
          "Decisions are made for clarity and conversion, not just aesthetics.",
      },
    ],
    useCases: [
      "Startups that need a complete brand identity before launch",
      "Businesses refreshing a dated logo and visual identity",
      "Marketing teams that need ongoing social and campaign design",
      "Companies preparing an investor deck or sales presentation",
    ],
    faqs: [
      {
        question: "Do you design logos as a standalone service?",
        answer:
          "Yes, though most clients pair a logo with a broader brand identity for consistency.",
      },
      {
        question: "What do we receive at the end of a brand identity project?",
        answer:
          "A full brand kit — logo files, color palette, typography and usage guidelines.",
      },
      {
        question: "Can you design within our existing brand guidelines?",
        answer:
          "Yes, we regularly design campaign and marketing assets that follow an existing brand system.",
      },
      {
        question: "Do you do UI/UX design for apps and websites?",
        answer:
          "Yes, UI/UX design is part of our graphic design offering, often paired with our website or software development services.",
      },
    ],
    relatedSlugs: ["website-development", "video-animation"],
  },
  {
    slug: "seo",
    seoTitle: "SEO Services",
    metaDescription:
      "Technical SEO, on-page optimization and content strategy that moves your site up the search results that actually matter.",
    h1: "SEO Services",
    primaryKeyword: "SEO services",
    secondaryKeywords: ["SEO agency", "technical SEO audit", "SEO company Pakistan"],
    intro:
      "We improve how search engines find, understand and rank your website — combining technical fixes, on-page optimization and content strategy into one focused plan.",
    benefits: [
      {
        title: "Technical Foundations First",
        description:
          "We fix the crawlability and performance issues that block rankings before anything else.",
      },
      {
        title: "Search-Intent Focused",
        description:
          "Content and structure built around what people are actually searching for.",
      },
      {
        title: "Transparent Reporting",
        description:
          "You see exactly what's been changed and why — no black-box tactics.",
      },
      {
        title: "Built to Last",
        description:
          "We focus on sustainable, white-hat SEO, not shortcuts that put your site at risk.",
      },
    ],
    useCases: [
      "Websites with strong content that isn't ranking due to technical issues",
      "Local businesses that need to show up in local search results",
      "E-commerce stores that need product and category pages optimized",
      "Companies that have never had a formal SEO strategy",
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Meaningful movement typically starts within 2–3 months, with compounding results over 6–12 months — SEO is a long-term investment, not an overnight fix.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No credible SEO provider can guarantee specific rankings. We focus on the technical and content fundamentals that drive sustainable growth.",
      },
      {
        question: "Do you offer local SEO for businesses in Pakistan?",
        answer:
          "Yes, alongside our work with international clients, we help local businesses in Pakistan improve their visibility in local search results.",
      },
      {
        question: "What does an SEO audit include?",
        answer:
          "A full review of technical health, on-page structure, content gaps and competitor positioning, with a prioritized action plan.",
      },
    ],
    relatedSlugs: ["website-development", "shopify-development"],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}
