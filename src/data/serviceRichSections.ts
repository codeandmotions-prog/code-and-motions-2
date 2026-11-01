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
};

export type RichServiceGroup = {
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
