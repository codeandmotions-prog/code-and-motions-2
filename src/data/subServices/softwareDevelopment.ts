import { Stethoscope, FlaskConical, Store, ShieldCheck, GraduationCap, Cpu } from "lucide-react";
import type { SubService } from "../subServiceTypes";

/**
 * Sub-services nested under /services/software-development/{slug}.
 *
 * "AI Software Development" deliberately has no dedicated page here —
 * it already has one at /services/ai-development/ai-software-development
 * (built in the AI Development pass). Its card reuses that page via
 * externalHref instead of generating a near-duplicate.
 */
export const softwareDevelopmentSubServices: SubService[] = [
  {
    slug: "medical-hospital-software-development",
    name: "Medical & Hospital Software Development",
    shortDescription:
      "Custom software for hospitals and medical practices — patient records, scheduling and clinical workflows built around how care teams actually work.",
    tags: ["hospital software", "medical software development", "healthcare software"],
    icon: Stethoscope,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Medical & Hospital Software Development Services",
    metaDescription:
      "Custom medical and hospital software development — patient records, scheduling and clinical workflow systems built for healthcare providers in the USA, UK and Europe.",
    h1: "Medical & Hospital Software Development",
    primaryKeyword: "medical software development",
    secondaryKeywords: [
      "hospital software development",
      "healthcare software development company",
      "clinical software development",
    ],
    intro:
      "We build custom software for hospitals, clinics and medical practices — covering patient records, scheduling and day-to-day clinical workflows. Every system is shaped around how your care team actually operates, informed by our own experience building LabNova, a laboratory management system already in use in medical settings.",
    whatIsQuestion: "What Is Medical & Hospital Software Development?",
    whatIsAnswer:
      "Medical and hospital software development is building custom systems for healthcare providers — patient records, appointment scheduling, clinical workflows and reporting — rather than forcing a hospital's operations into generic, one-size-fits-all software. At Code & Motions, this means software shaped around your actual clinical and administrative processes, with the data handling care healthcare work demands.",
    capabilitiesHeading: "Medical & Hospital Software, Covered End to End",
    capabilities: [
      "Patient record and management systems",
      "Appointment scheduling and calendar systems for clinical staff",
      "Clinical workflow and reporting tools",
      "Integration with existing hospital or clinic systems",
    ],
    benefitsHeading: "Why Choose Our Medical & Hospital Software Team",
    benefits: [
      {
        title: "Built On Real Healthcare Software Experience",
        description:
          "Our work building LabNova gives us first-hand experience with the operational detail healthcare software needs to actually be useful.",
      },
      {
        title: "Built With Care Around Patient Data",
        description:
          "Patient data is handled with the access controls and separation healthcare systems require.",
      },
      {
        title: "Fits Clinical Workflow",
        description: "Software is shaped around how your staff actually work, not a generic template.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch — fixing, extending and maintaining what we build.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Hospitals replacing manual or spreadsheet-based patient record processes",
      "Clinics that need a scheduling system built around their actual staff and room availability",
      "Medical practices needing a custom reporting tool",
      "Healthcare providers whose current software no longer fits how they operate",
    ],
    processHeading: "Our Process",
    process: [
      {
        title: "Discovery",
        description:
          "We map your clinical and administrative workflows before designing anything, so the system fits how your team actually works.",
      },
      {
        title: "Design & Build",
        description: "We design the data model and build the system in iterative, reviewable releases.",
      },
      {
        title: "Testing & Review",
        description: "The system is tested against your real workflows, with data handling reviewed against your requirements.",
      },
      {
        title: "Launch & Support",
        description: "We deploy, train your team, and stay involved after launch.",
      },
    ],
    faqHeading: "Medical & Hospital Software FAQs",
    faqs: [
      {
        question: "Do you have experience with healthcare software specifically?",
        answer:
          "Yes. We've built and shipped LabNova, our own laboratory management system used in medical settings, which informs how we approach hospital and clinic software.",
      },
      {
        question: "Can you integrate with our existing hospital systems?",
        answer:
          "Yes. We build custom integrations with existing hospital and clinic software where needed, rather than requiring you to replace everything at once.",
      },
      {
        question: "How do you handle patient data security?",
        answer:
          "We build with appropriate access controls and data handling practices for healthcare data; specific compliance requirements are discussed and agreed with you per project, based on your organization's own policies and applicable regulations.",
      },
      {
        question: "Can you build a patient scheduling system?",
        answer:
          "Yes, appointment scheduling and calendar systems for clinical staff are a core part of this service.",
      },
    ],
    relatedLink: {
      label: "Software Development",
      href: "/services/software-development",
      description: "Our core engineering service — Medical & Hospital Software Development is a specialized application of it.",
    },
  },
  {
    slug: "laboratory-software-development",
    name: "Laboratory Software Development",
    shortDescription:
      "Lab management software — patient and sample tracking, test results and reporting — built on our experience shipping LabNova.",
    tags: ["laboratory software development", "lab management software", "LIS development"],
    icon: FlaskConical,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #0070FE 100%)",
    seoTitle: "Laboratory Software Development Services",
    metaDescription:
      "Custom laboratory software development — patient management, test and result entry, and report generation, built on our experience shipping LabNova, for labs in the USA, UK and Europe.",
    h1: "Laboratory Software Development",
    primaryKeyword: "laboratory software development",
    secondaryKeywords: ["lab management software development", "laboratory information system", "LIS development"],
    intro:
      "We build custom laboratory management software — covering patient management, test and result entry, and report generation — drawing directly on our experience building and shipping LabNova, our own laboratory management product. If your lab needs something LabNova doesn't cover out of the box, we can build it.",
    whatIsQuestion: "What Is Laboratory Software Development?",
    whatIsAnswer:
      "Laboratory software development is building custom systems for lab operations — patient and sample management, test and result entry, and report generation — tailored to how a specific lab actually runs. At Code & Motions, this is informed directly by LabNova, our own laboratory management software already in use, not theoretical healthcare-software knowledge.",
    capabilitiesHeading: "Laboratory Software, Covered End to End",
    capabilities: [
      "Patient and sample management systems",
      "Test and result entry workflows",
      "Automated report generation and delivery",
      "Custom features beyond what an off-the-shelf lab system offers",
    ],
    benefitsHeading: "Why Choose Our Laboratory Software Team",
    benefits: [
      {
        title: "Built LabNova Ourselves",
        description: "We didn't just study lab software — we designed, built and shipped our own, LabNova.",
      },
      {
        title: "Real Operational Understanding",
        description:
          "We understand the day-to-day detail — critical result alerts, report formatting, data separation — that generic software misses.",
      },
      {
        title: "Extendable Beyond Off-the-Shelf",
        description: "When LabNova or another system doesn't cover a specific need, we build the custom piece that does.",
      },
      {
        title: "Secure, Lab-wise Data",
        description: "Each lab's data is kept separate and secure, matching how LabNova itself is built.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Labs that need custom features beyond an off-the-shelf lab management system",
      "Diagnostic and pathology labs replacing manual or paper-based processes",
      "Labs that want a system integrated with other tools they already use",
      "Growing labs that have outgrown a basic lab software setup",
    ],
    processHeading: "Our Process",
    process: [
      {
        title: "Discovery",
        description: "We map your lab's workflow, equipment and reporting needs before designing anything.",
      },
      {
        title: "Design & Build",
        description: "We design the data model and build the system in iterative, reviewable releases.",
      },
      {
        title: "Testing",
        description: "The system is tested against your real lab workflow before launch.",
      },
      {
        title: "Launch & Support",
        description: "We deploy, train your team, and stay involved after launch.",
      },
    ],
    faqHeading: "Laboratory Software FAQs",
    faqs: [
      {
        question: "Is this the same as LabNova?",
        answer:
          "LabNova is our ready-to-use lab management product. This service is for labs that need something custom — either extending LabNova or building a different system entirely.",
      },
      {
        question: "Can you customize LabNova for our lab?",
        answer: "In many cases, yes — contact us with what you need and we'll tell you whether it fits within LabNova or needs custom development.",
      },
      {
        question: "Do you build systems for pathology labs specifically?",
        answer: "Yes, diagnostic and pathology lab workflows are a core use case for this service.",
      },
      {
        question: "Can you integrate lab software with hospital systems?",
        answer: "Yes, we build integrations between laboratory software and other hospital or clinic systems where needed.",
      },
    ],
    relatedLink: {
      label: "LabNova",
      href: "/software/labnova",
      description: "Our own laboratory management software — the real-world experience behind this service.",
    },
  },
  {
    slug: "retail-shop-software-development",
    name: "Retail & Shop Software Development",
    shortDescription:
      "Point-of-sale, inventory and store management software built around how your retail business actually runs.",
    tags: ["retail software development", "POS software", "inventory management software"],
    icon: Store,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Retail & Shop Software Development Services",
    metaDescription:
      "Custom retail and shop software development — point-of-sale, inventory and store management systems for retail businesses in the USA, UK and Europe.",
    h1: "Retail & Shop Software Development",
    primaryKeyword: "retail software development",
    secondaryKeywords: ["shop management software", "POS software development", "inventory management software development"],
    intro:
      "We build custom software for retail businesses and shops — point-of-sale systems, inventory management and store operations tools — for businesses that have outgrown generic retail software or need something it doesn't offer.",
    whatIsQuestion: "What Is Retail & Shop Software Development?",
    whatIsAnswer:
      "Retail and shop software development is building custom point-of-sale, inventory and store management systems for retail businesses, rather than relying on generic off-the-shelf retail software. At Code & Motions, this means software built around your specific products, stock processes and store operations.",
    capabilitiesHeading: "Retail & Shop Software, Covered End to End",
    capabilities: [
      "Point-of-sale (POS) systems",
      "Inventory and stock management tools",
      "Multi-location store management features",
      "Integration with existing payment or supplier systems",
    ],
    benefitsHeading: "Why Choose Our Retail Software Team",
    benefits: [
      {
        title: "Built Around Your Stock",
        description: "Inventory systems shaped around your actual product catalog and stock processes, not a generic template.",
      },
      {
        title: "Scales With Your Stores",
        description: "Built to handle a single shop or multiple locations as you grow.",
      },
      {
        title: "Integrates With What You Use",
        description: "We connect to existing payment, accounting or supplier systems rather than forcing a rebuild of everything.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch — fixing, extending and maintaining what we build.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Retail businesses replacing manual or spreadsheet-based inventory tracking",
      "Shops needing a POS system built around their specific products",
      "Multi-location retailers needing centralized stock visibility",
      "Retailers whose current software no longer fits how they operate",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery", description: "We map your products, stock process and store operations before designing anything." },
      { title: "Design & Build", description: "We design the system around your catalog and build it in iterative, reviewable releases." },
      { title: "Testing", description: "The system is tested against real store operations before launch." },
      { title: "Launch & Support", description: "We deploy, train your team, and stay involved after launch." },
    ],
    faqHeading: "Retail & Shop Software FAQs",
    faqs: [
      {
        question: "Can you build a point-of-sale system for my shop?",
        answer: "Yes, custom POS systems built around your products and workflow are a core part of this service.",
      },
      {
        question: "Can you handle multiple store locations?",
        answer: "Yes, we build inventory and store management systems that work across a single shop or multiple locations.",
      },
      {
        question: "Can you integrate with our existing payment system?",
        answer: "Yes, we build integrations with existing payment and accounting systems where needed.",
      },
      {
        question: "Is this different from your Shopify Development service?",
        answer:
          "Yes — this service is for in-store and retail operations software (POS, inventory), while Shopify Development covers online stores. The two are often used together.",
      },
    ],
    relatedLink: {
      label: "Software Development",
      href: "/services/software-development",
      description: "Our core engineering service — Retail & Shop Software Development is a specialized application of it.",
    },
  },
  {
    slug: "cybersecurity-software-development",
    name: "Cybersecurity Software Development",
    shortDescription:
      "Security-focused software and tooling — from secure application architecture to custom monitoring and access-control tools.",
    tags: ["cybersecurity software development", "secure software development", "security tooling"],
    icon: ShieldCheck,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    seoTitle: "Cybersecurity Software Development Services",
    metaDescription:
      "Cybersecurity-focused software development — secure application architecture and custom security tooling for businesses in the USA, UK and Europe.",
    h1: "Cybersecurity Software Development",
    primaryKeyword: "cybersecurity software development",
    secondaryKeywords: ["secure software development", "security software development company", "custom security tools"],
    intro:
      "We build software with security considered from the architecture stage onward, and develop custom security tooling for businesses that need monitoring, access control or audit logging that an off-the-shelf tool doesn't cover.",
    whatIsQuestion: "What Is Cybersecurity Software Development?",
    whatIsAnswer:
      "Cybersecurity software development is building software with security considered from the architecture stage onward — access control, data handling and secure coding practices — plus custom tooling for monitoring, logging or access management. At Code & Motions, this means secure-by-design engineering applied to your product, not a bolted-on review at the end.",
    capabilitiesHeading: "Cybersecurity Software, Covered End to End",
    capabilities: [
      "Secure application architecture and access control",
      "Custom security monitoring and audit-logging tools",
      "Secure data handling practices built into development",
      "Security-focused code review as part of our engineering process",
    ],
    benefitsHeading: "Why Choose Our Cybersecurity Software Team",
    benefits: [
      {
        title: "Secure From Architecture Onward",
        description: "Security is considered during design, not patched in after launch.",
      },
      {
        title: "Senior Engineering",
        description: "The same senior team behind our core software development work builds with secure practices throughout.",
      },
      {
        title: "Custom Tooling, Not Generic Products",
        description: "We build monitoring and access-control tools shaped around your specific system, not a one-size-fits-all product.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch to maintain and extend what we build.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Businesses building software that handles sensitive data and need security considered from the start",
      "Teams needing a custom access-control or permissions system",
      "Companies that need internal security monitoring or audit-logging tooling",
      "Businesses extending an existing system with stronger access controls",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Requirements & Risk Review", description: "We review what the system handles and what needs protecting before designing anything." },
      { title: "Secure Architecture Design", description: "We design access control and data handling into the architecture from the start." },
      { title: "Development & Code Review", description: "The system is built with secure coding practices and reviewed as it's developed." },
      { title: "Launch & Support", description: "We deploy, monitor, and stay involved after launch." },
    ],
    faqHeading: "Cybersecurity Software FAQs",
    faqs: [
      {
        question: "Do you perform formal security audits or penetration testing?",
        answer:
          "Our focus is secure software development and custom security tooling, not formal third-party penetration testing or audits — if you need a certified audit, we're happy to coordinate with a specialist security firm as part of your project.",
      },
      {
        question: "Can you add access control and permissions to our existing software?",
        answer: "Yes, building or extending access control and permission systems in existing software is a common part of this service.",
      },
      {
        question: "Do you build security monitoring dashboards?",
        answer: "Yes, custom monitoring and audit-logging tools are part of this service, scoped to what your system actually needs to track.",
      },
      {
        question: "Is security built into your other software development work too?",
        answer: "Yes — secure coding practices are part of how we build all custom software, not only projects explicitly scoped as cybersecurity work.",
      },
    ],
    relatedLink: {
      label: "Software Development",
      href: "/services/software-development",
      description: "Our core engineering service — Cybersecurity Software Development applies secure-by-design practices to it.",
    },
  },
  {
    slug: "school-software-development",
    name: "School Software Development",
    shortDescription:
      "Custom software for schools — student records, scheduling and administrative workflows built around how schools actually operate.",
    tags: ["school software development", "education software development", "student management software"],
    icon: GraduationCap,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 55%, #7CE6F7 100%)",
    seoTitle: "School Software Development Services",
    metaDescription:
      "Custom school software development — student records, scheduling and administrative systems for schools in the USA, UK and Europe.",
    h1: "School Software Development",
    primaryKeyword: "school software development",
    secondaryKeywords: ["education software development", "student management software", "school administration software"],
    intro:
      "We build custom software for schools — student records, scheduling and administrative tools — for schools that need something a generic education platform doesn't offer, whether that's a specific workflow, integration or reporting need.",
    whatIsQuestion: "What Is School Software Development?",
    whatIsAnswer:
      "School software development is building custom systems for student records, scheduling and administrative workflows, shaped around how a specific school actually operates rather than a generic education platform. At Code & Motions, this can include AI-driven automation for school admin tasks where it genuinely helps, alongside straightforward custom software.",
    capabilitiesHeading: "School Software, Covered End to End",
    capabilities: [
      "Student record and management systems",
      "Class scheduling and timetabling tools",
      "Administrative workflow and reporting systems",
      "Integration with existing school systems",
    ],
    benefitsHeading: "Why Choose Our School Software Team",
    benefits: [
      {
        title: "Built Around Your School's Process",
        description: "Software shaped around how your administrators and teachers actually work, not a generic template.",
      },
      {
        title: "Scales With Your School",
        description: "Built to handle a single school or multiple campuses as you grow.",
      },
      {
        title: "Integrates With What You Use",
        description: "We connect to existing school systems rather than forcing a full replacement.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch — fixing, extending and maintaining what we build.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Schools replacing manual or spreadsheet-based student record processes",
      "Schools needing a custom timetabling or scheduling system",
      "Multi-campus schools needing centralized administrative tools",
      "Schools whose current software no longer fits how they operate",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery", description: "We map your school's administrative and scheduling workflow before designing anything." },
      { title: "Design & Build", description: "We design the system and build it in iterative, reviewable releases." },
      { title: "Testing", description: "The system is tested against your real school workflow before launch." },
      { title: "Launch & Support", description: "We deploy, train your staff, and stay involved after launch." },
    ],
    faqHeading: "School Software FAQs",
    faqs: [
      {
        question: "Can you build a student record system for our school?",
        answer: "Yes, custom student record and management systems are a core part of this service.",
      },
      {
        question: "Can you build AI agents for school administrative tasks?",
        answer:
          "Yes — see our AI Agents for Healthcare, Laboratories & Schools service for AI-driven school administrative automation specifically.",
      },
      {
        question: "Can you integrate with our existing school systems?",
        answer: "Yes, we build custom integrations with existing school software where needed.",
      },
      {
        question: "Do you build scheduling and timetabling tools?",
        answer: "Yes, class scheduling and timetabling systems are part of this service.",
      },
    ],
    relatedLink: {
      label: "AI Agents for Healthcare, Laboratories & Schools",
      href: "/services/ai-development/ai-agents",
      description: "Our dedicated AI agents service — for schools that want AI-driven automation on top of custom software.",
    },
  },
  // AI Software Development already has its own full dedicated page at
  // /services/ai-development/ai-software-development (built in the AI
  // Development pass). Reusing it here rather than creating a duplicate.
  {
    slug: "ai-software-development",
    name: "AI Software Development",
    shortDescription:
      "Custom software with AI built into the core product — from a single AI-powered feature to a full application built around an AI workflow.",
    tags: ["AI software development", "custom AI software", "AI-powered software"],
    icon: Cpu,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",
    externalHref: "/services/ai-development/ai-software-development",
  },
];
