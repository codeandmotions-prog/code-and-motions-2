/**
 * Optional long-form sections for a service detail page.
 *
 * Only services that set `richSections` in serviceDetails.ts render these;
 * every other service page is unaffected. Icons are referenced by string
 * key (resolved inside the client component) because a Lucide component is a
 * function and can't be passed from a Server Component as a prop.
 */

export type RichIconKey =
  | "custom"
  | "saas"
  | "web"
  | "crm"
  | "ai"
  | "api"
  | "automation"
  | "fixed"
  | "hourly"
  | "support"
  | "ownership"
  | "security";

export type RichLink = {
  label: string;
  href: string;
};

export type RichServiceItem = {
  title: string;
  description: string;
  icon: RichIconKey;
  link?: RichLink;
  /** Optional labelled lines shown under the description (e.g. "Best when" / "Less suited when"). */
  points?: { label: string; text: string }[];
};

export type RichServiceGroup = {
  /** Optional DOM id so the section can be linked to from elsewhere on the page. */
  id?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: RichServiceItem[];
};

export type RichChoiceBlock = {
  eyebrow: string;
  heading: string;
  intro: string;
  rightHeading: string;
  rightItems: string[];
  notRightHeading: string;
  notRightIntro: string;
  notRightItems: string[];
  closing?: string;
};

export type RichCostBlock = {
  eyebrow: string;
  heading: string;
  intro: string;
  factorsHeading: string;
  factors: string[];
  timelineHeading: string;
  timeline: string;
  links: (RichLink & { description: string })[];
};

export type RichTechGroup = {
  label: string;
  items: string[];
};

export type RichTechBlock = {
  eyebrow: string;
  heading: string;
  intro: string;
  groups: RichTechGroup[];
  note: string;
  /** Optional contextual link shown after the note. */
  noteLink?: RichLink;
};

export type RichWorkBlock = {
  eyebrow: string;
  heading: string;
  intro: string;
  featuresHeading: string;
  features: string[];
  note?: string;
  links: RichLink[];
};

export type ServiceRichSections = {
  services: RichServiceGroup;
  choice: RichChoiceBlock;
  /** Heading shown above the industry/AI sub-service group. */
  industryGroup: { heading: string; subheading: string; slugs: string[] };
  planningGroup: { heading: string; subheading: string; slugs: string[] };
  engagement: RichServiceGroup;
  cost: RichCostBlock;
  tech: RichTechBlock;
  assurance: RichServiceGroup;
  work: RichWorkBlock;
};

export const softwareDevelopmentRichSections: ServiceRichSections = {
  services: {
    eyebrow: "Services",
    heading: "Custom Software Development Services We Offer",
    intro:
      "Seven areas of work, from building a first product to connecting and automating the systems you already run.",
    items: [
      {
        title: "Custom Software Development",
        icon: "custom",
        description:
          "Business software designed around your own processes: internal systems, customer portals and tools that replace spreadsheets and repeated manual steps.",
      },
      {
        title: "SaaS Development",
        icon: "saas",
        description:
          "Subscription-style software products, from a first working version to a platform you can extend, including user accounts, roles and admin tools.",
        link: { label: "Estimate a SaaS MVP", href: "/tools/saas-mvp-cost-estimator" },
      },
      {
        title: "Web Application Development",
        icon: "web",
        description:
          "Browser-based applications with dashboards, workflows and data entry, built with modern front-end and back-end frameworks.",
      },
      {
        title: "CRM & ERP Development",
        icon: "crm",
        description:
          "Custom CRM and ERP systems where an off-the-shelf tool no longer fits, plus extensions and integrations for the platforms you already use.",
        link: {
          label: "ERP integration services",
          href: "/services/software-development/erp-integration-services",
        },
      },
      {
        title: "AI Software Development",
        icon: "ai",
        description:
          "AI-powered features and applications, from intelligent workflows to assistants built into your own product.",
        link: {
          label: "AI software development",
          href: "/services/ai-development/ai-software-development",
        },
      },
      {
        title: "API Development & Integrations",
        icon: "api",
        description:
          "APIs and connections between your existing tools, so data moves between systems without manual copying.",
      },
      {
        title: "Business Automation Solutions",
        icon: "automation",
        description:
          "Automation for repetitive internal work such as approvals, data handling, notifications and reporting.",
        link: {
          label: "AI workflow automation",
          href: "/services/ai-development/ai-workflow-automation",
        },
      },
    ],
  },

  choice: {
    eyebrow: "Is Custom Right For You?",
    heading: "When Custom Software Is the Right Choice",
    intro:
      "Custom software costs more up front than a subscription product, so it has to earn its place. It usually does when:",
    rightHeading: "Custom software tends to fit when",
    rightItems: [
      "Your process is part of what makes your business work, and generic software forces you to work around it.",
      "The same job is spread across several tools, spreadsheets or manual steps.",
      "You need integrations that ready-made products don't support.",
      "You are building a product to sell, such as a SaaS platform, where the software is the business.",
      "Per-user licence fees or customization limits are holding the business back.",
    ],
    notRightHeading: "When It Isn't",
    notRightIntro:
      "Off-the-shelf software or a low-code tool is often the better choice when:",
    notRightItems: [
      "A standard product already covers your needs with only minor settings changes.",
      "You are still testing whether an idea works, and a simple tool can answer that first.",
      "The process is likely to change completely soon, so what you build would be redone.",
      "The budget is better spent on improving the process than on new software.",
    ],
    closing:
      "A short scoping conversation is the quickest way to see which side of that line your project falls on.",
  },

  industryGroup: {
    heading: "Industry-Specific and AI Software We Build",
    subheading:
      "Specialist software for healthcare, laboratories, retail, security and education, plus AI-powered applications. Each has its own dedicated page.",
    slugs: [
      "medical-hospital-software-development",
      "laboratory-software-development",
      "retail-shop-software-development",
      "cybersecurity-software-development",
      "school-software-development",
      "ai-software-development",
    ],
  },

  planningGroup: {
    heading: "Planning, Forecasting and ERP Integration Software",
    subheading:
      "Software for demand, inventory, production and supply chain planning, and for connecting planning to the ERP you already run. Each has its own dedicated page.",
    slugs: [
      "demand-forecasting-software",
      "inventory-optimization-software",
      "replenishment-planning-software",
      "production-planning-software",
      "supply-chain-planning-software",
      "sales-operations-planning-software",
      "retail-wholesale-planning-software",
      "business-analytics-reporting-software",
      "ai-business-planning-software",
      "erp-integration-services",
    ],
  },

  engagement: {
    eyebrow: "Engagement Models",
    heading: "Engagement Models",
    intro:
      "Choose the arrangement that fits how well defined your project is. Describe what you need and we will suggest the best fit.",
    items: [
      {
        title: "Fixed-price projects",
        icon: "fixed",
        description:
          "Best when the scope is clear. Deliverables, milestones and price are agreed before work begins.",
      },
      {
        title: "Hourly development",
        icon: "hourly",
        description:
          "Suits evolving scope, continuing improvements or work that needs flexibility. You pay for the time spent.",
      },
      {
        title: "Ongoing maintenance and support",
        icon: "support",
        description:
          "Continued fixes, updates and improvements after launch, so the software keeps working as your needs change.",
      },
    ],
  },

  cost: {
    eyebrow: "Cost and Timeline",
    heading: "What Affects Cost and Timeline",
    intro:
      "Every project is quoted from its requirements, so we do not publish fixed prices. Quotations are custom and based on what you need built.",
    factorsHeading: "What moves the price",
    factors: [
      "Scope and the number of features",
      "Complexity of workflows and business rules",
      "Number and type of integrations, such as CRM, ERP, payments or third-party APIs",
      "Design and user-experience requirements",
      "AI or data-processing components",
      "Testing, deployment and support needs",
    ],
    timelineHeading: "Timeline",
    timeline:
      "Timelines depend on requirements, complexity and scope. A realistic schedule comes out of discovery, not before it, and we do not promise delivery dates until the scope is understood.",
    links: [
      {
        label: "SaaS MVP Cost & Timeline Estimator",
        href: "/tools/saas-mvp-cost-estimator",
        description: "A free tool for a first indication on a SaaS MVP.",
      },
      {
        label: "Request a custom quotation",
        href: "/contact",
        description: "Tell us what you need built and we will respond with a quotation.",
      },
    ],
  },

  tech: {
    eyebrow: "Technologies",
    heading: "Technologies We Work With",
    intro:
      "We select the stack for each project based on its requirements, your existing systems and who will maintain it afterwards.",
    groups: [
      { label: "Front end", items: ["React", "Next.js", "Angular", "TypeScript"] },
      { label: "Back end", items: ["Node.js", "Python", "Go"] },
      { label: "Mobile and cross-platform", items: ["Flutter"] },
      { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
      { label: "Backend services", items: ["Supabase", "Firebase"] },
      { label: "AI and machine learning", items: ["OpenAI API", "Google Gemini API", "TensorFlow"] },
      {
        label: "Cloud and DevOps",
        items: ["Google Cloud Platform", "Docker", "Kubernetes", "GitHub Actions", "CI/CD"],
      },
    ],
    note: "This is a guide, not a fixed list. We recommend technology that suits the project rather than adding it for its own sake.",
  },

  assurance: {
    eyebrow: "Ownership and Support",
    heading: "Code Ownership, Security and Support",
    intro: "Questions clients ask before signing, answered up front.",
    items: [
      {
        title: "Code ownership",
        icon: "ownership",
        description:
          "On project completion and agreed payment, the complete source code is handed over to you. Final terms are set out in the project agreement.",
      },
      {
        title: "Security",
        icon: "security",
        description:
          "User roles, data access and hosting requirements are discussed during discovery and designed into the architecture instead of being added at the end.",
      },
      {
        title: "Support after launch",
        icon: "support",
        description:
          "Maintenance and support are available as an ongoing arrangement, so fixes and improvements continue once the software is live.",
      },
    ],
  },

  work: {
    eyebrow: "Our Work",
    heading: "Our Work: LabNova Laboratory Management Software",
    intro:
      "LabNova is our own laboratory management software. It shows how we take a product from database architecture through to a working, launched release.",
    featuresHeading: "What LabNova includes",
    features: [
      "Patient management",
      "Test and result entry",
      "Professional report generation",
      "Direct report printing",
      "Audit logs",
      "Offline activation",
    ],
    links: [
      { label: "View LabNova", href: "/software/labnova" },
      {
        label: "Laboratory software development",
        href: "/services/software-development/laboratory-software-development",
      },
    ],
  },
};

/**
 * Ordered section list for services that opt into a fully sequenced page
 * (see `pageSections` in serviceDetails.ts). Each entry either carries its
 * own copy or points at data the service already has (benefits, use cases,
 * process), so the order lives in one place and other service pages are
 * unaffected.
 */
export type PageSection =
  | { type: "cards"; tone: "surface" | "raised"; columns?: 3 | 4; group: RichServiceGroup }
  | { type: "overview" }
  | { type: "usecases" }
  | { type: "process" }
  | { type: "subgrid"; heading: string; subheading: string; slugs: string[]; id?: string; raised?: boolean }
  | { type: "cost"; tone: "surface" | "raised"; block: RichCostBlock }
  | { type: "tech"; tone: "surface" | "raised"; block: RichTechBlock };

export const websiteDevelopmentPageSections: PageSection[] = [
  {
    type: "cards",
    tone: "raised",
    columns: 4,
    group: {
      id: "website-services",
      eyebrow: "Services",
      heading: "Website Services We Offer",
      intro:
        "Seven kinds of website work, each designed and built by the same team and supported after launch.",
      items: [
        {
          title: "Custom Website Design and Development",
          icon: "custom",
          description:
            "Fully custom-coded websites with a design shaped around your brand, built on modern frameworks for projects where performance and flexibility matter most.",
          link: { label: "Custom websites", href: "/services/website-development/custom-websites" },
        },
        {
          title: "Business Websites",
          icon: "web",
          description:
            "Professional websites that present your business and services clearly to customers, designed and built to match your brand.",
        },
        {
          title: "WordPress Development",
          icon: "crm",
          description:
            "WordPress sites for when a client-editable CMS is the priority, including WooCommerce online stores.",
          link: { label: "WordPress websites", href: "/services/website-development/wordpress-websites" },
        },
        {
          title: "Elementor Development",
          icon: "saas",
          description:
            "Elementor-built pages and sites on WordPress, for teams that want to edit layouts and content themselves.",
          link: { label: "Elementor websites", href: "/services/website-development/elementor-websites" },
        },
        {
          title: "Landing Pages",
          icon: "api",
          description:
            "Standalone landing pages optimized for a single conversion goal, designed to work with paid campaigns and A/B testing.",
        },
        {
          title: "Web Applications",
          icon: "ai",
          description:
            "Browser-based applications and portals, built by the same engineering team that delivers our software projects.",
          link: { label: "Software development services", href: "/services/software-development" },
        },
        {
          title: "Redesign and Maintenance",
          icon: "automation",
          description:
            "Redesigns of existing sites, migrations from other platforms, and ongoing maintenance and support after launch.",
          link: { label: "Website maintenance", href: "#website-maintenance" },
        },
      ],
    },
  },
  {
    type: "cards",
    tone: "surface",
    columns: 3,
    group: {
      id: "platform-choice",
      eyebrow: "Choosing a Platform",
      heading: "Custom, WordPress or Elementor: Which Is Right for You?",
      intro:
        "We build on all three and recommend the one that fits your goals, not the one that is easiest for us.",
      items: [
        {
          title: "Custom-coded website",
          icon: "custom",
          description: "Built from scratch on a modern framework, with the design and functionality planned around your requirements.",
          points: [
            { label: "Best when", text: "performance matters, or the site needs functionality a CMS does not handle well." },
            { label: "Less suited when", text: "your requirements are simple and you need to launch quickly." },
          ],
        },
        {
          title: "WordPress",
          icon: "web",
          description: "A widely used CMS that lets your team manage pages and posts without a developer.",
          points: [
            { label: "Best when", text: "a client-editable CMS is the priority, or you need an online store through WooCommerce." },
            { label: "Less suited when", text: "the site needs highly specific functionality beyond what a CMS handles well." },
          ],
        },
        {
          title: "Elementor",
          icon: "saas",
          description: "A visual page builder on WordPress, for editing layouts as well as content.",
          points: [
            { label: "Best when", text: "your team wants to adjust page layouts visually after launch." },
            { label: "Less suited when", text: "the project needs a very lean, performance-critical build." },
          ],
        },
      ],
    },
  },
  { type: "overview" },
  { type: "usecases" },
  {
    type: "subgrid",
    id: "industry-websites",
    raised: true,
    heading: "Websites for Your Industry",
    subheading:
      "Websites for real estate, e-commerce, healthcare, education, agencies and startups. Each has its own dedicated page.",
    slugs: [
      "real-estate-websites",
      "ecommerce-websites",
      "hospital-websites",
      "school-websites",
      "agency-websites",
      "startup-websites",
    ],
  },
  {
    type: "subgrid",
    id: "platform-websites",
    heading: "Websites by Platform and Build Type",
    subheading:
      "Custom-coded, WordPress, WooCommerce and Elementor builds. Each has its own dedicated page.",
    slugs: ["custom-websites", "wordpress-websites", "woocommerce-websites", "elementor-websites"],
  },
  { type: "process" },
  {
    type: "tech",
    tone: "raised",
    block: {
      eyebrow: "Technologies",
      heading: "Technologies We Use for Websites",
      intro:
        "We choose the stack for each website based on its requirements, your existing systems and who will maintain it afterwards.",
      groups: [
        { label: "Front end", items: ["React", "Next.js", "Angular", "TypeScript"] },
        { label: "Back end", items: ["Node.js", "Python", "Go"] },
        { label: "CMS and platforms", items: ["WordPress", "Elementor", "WooCommerce"] },
        { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
        { label: "Backend services", items: ["Supabase", "Firebase"] },
        {
          label: "Cloud and deployment",
          items: ["Google Cloud Platform", "Docker", "GitHub Actions", "CI/CD"],
        },
        { label: "AI features, where a site needs them", items: ["OpenAI API", "Google Gemini API"] },
      ],
      note: "This is a guide, not a fixed list.",
      noteLink: {
        label: "Websites with built-in AI features",
        href: "/services/ai-development/ai-website-development",
      },
    },
  },
  {
    type: "cards",
    tone: "surface",
    columns: 3,
    group: {
      id: "website-quality",
      eyebrow: "Quality",
      heading: "Performance, Responsive Design and SEO-Ready Structure",
      intro:
        "What we build in from the start. None of it is a ranking guarantee, because no one can promise one.",
      items: [
        {
          title: "Performance",
          icon: "automation",
          description:
            "Performance is considered from the start of the build, not patched on afterward.",
        },
        {
          title: "Responsive design",
          icon: "web",
          description:
            "Every site is fully responsive and tested across desktop, tablet and mobile before it goes live.",
        },
        {
          title: "SEO-ready structure",
          icon: "api",
          description:
            "Clean semantic markup, a clear heading structure and proper technical foundations give search engines a solid base to work from.",
        },
      ],
    },
  },
  {
    type: "cards",
    tone: "raised",
    columns: 3,
    group: {
      id: "hosting-deployment",
      eyebrow: "Delivery",
      heading: "Hosting, Domain Setup and Deployment",
      intro:
        "We take care of getting the site live as well as building it. The specifics are agreed in your quotation.",
      items: [
        {
          title: "Hosting",
          icon: "security",
          description: "We provide hosting for your website, so you are not left to arrange it separately.",
        },
        {
          title: "Domain setup",
          icon: "ownership",
          description: "We set up your domain so the finished site is reachable at your own web address.",
        },
        {
          title: "Deployment",
          icon: "automation",
          description: "We deploy the finished site and test it across devices at launch.",
        },
      ],
    },
  },
  {
    type: "cards",
    tone: "surface",
    columns: 3,
    group: {
      id: "website-redesign",
      eyebrow: "Redesign and Migration",
      heading: "Redesign and Migration",
      intro:
        "Replacing an existing website starts with understanding it. Rankings cannot be guaranteed, so the work is planned to preserve what is already working.",
      items: [
        {
          title: "Audit first",
          icon: "custom",
          description: "A redesign starts with an audit of your current site's performance, structure and content.",
        },
        {
          title: "Rebuild what needs it",
          icon: "web",
          description: "We keep what works, fix what does not, and rebuild the pages and design that hold the site back.",
        },
        {
          title: "Migration",
          icon: "api",
          description: "Content is migrated from your current site or page builder, with existing search value preserved where possible.",
        },
      ],
    },
  },
  {
    type: "cards",
    tone: "raised",
    columns: 3,
    group: {
      id: "website-maintenance",
      eyebrow: "After Launch",
      heading: "Website Maintenance and Support",
      intro: "A website needs looking after once it is live. Our website maintenance services are available as packages after launch.",
      items: [
        {
          title: "Updates and fixes",
          icon: "security",
          description: "Regular updates and fixes keep the site working as software and browsers change.",
        },
        {
          title: "Small content changes",
          icon: "web",
          description: "Small content changes can be handled for you, so the site stays current.",
        },
        {
          title: "Ongoing support",
          icon: "support",
          description: "Support continues after launch, so there is someone to ask when something needs attention.",
        },
      ],
    },
  },
  {
    type: "cost",
    tone: "surface",
    block: {
      eyebrow: "Cost and Timeline",
      heading: "What Affects Website Cost and Timeline",
      intro:
        "Every website is quoted from its requirements, so we do not publish fixed prices. Quotations are custom and based on what you need built.",
      factorsHeading: "What moves the price",
      factors: [
        "The number and type of pages",
        "Design complexity and brand requirements",
        "Custom functionality or web application features",
        "Platform choice: custom-coded, WordPress or Elementor",
        "Integrations, such as payments, forms or third-party services",
        "Content migration from an existing site",
        "Hosting, domain setup and ongoing maintenance",
      ],
      timelineHeading: "Timeline",
      timeline:
        "Timelines depend on requirements, complexity and scope. A realistic schedule comes out of planning and structure, not before it, and we do not promise delivery dates until the scope is understood.",
      links: [
        {
          label: "Request a custom quotation",
          href: "/contact",
          description: "Tell us about your website and we will respond with a quotation.",
        },
      ],
    },
  },
];
