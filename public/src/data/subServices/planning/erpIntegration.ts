import { Plug } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const erpIntegrationServices: SubService = {
  slug: "erp-integration-services",
  name: "ERP Integration Services",
  shortDescription:
    "Reliable, monitored connections between your ERP and the planning, e-commerce and reporting systems around it.",
  tags: ["ERP integration", "API integration", "data synchronisation"],
  icon: Plug,
  gradient: "linear-gradient(155deg, #060D24 0%, #1547E0 60%, #22D3EE 100%)",

  seoTitle: "ERP Integration Services & API Development",
  metaDescription:
    "ERP integration services for custom software: APIs, EDI, file exchange and middleware that synchronise orders, stock and master data reliably.",
  h1: "ERP Integration Services",
  primaryKeyword: "ERP integration services",
  secondaryKeywords: [
    "ERP API integration",
    "custom ERP integration development",
    "ERP data synchronisation",
    "ERP middleware integration",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Your ERP holds the orders, stock and financial records that every other system needs, yet it rarely talks to them cleanly. We design and build the integrations that move that data in and out reliably, with the error handling, monitoring and clear ownership that stop a quiet failure becoming a wrong stock figure on a Monday morning.",

  whatIsQuestion: "What are ERP integration services?",
  whatIsAnswer:
    "ERP integration services connect an enterprise resource planning system to other software, such as planning tools, online stores, warehouse systems and reporting databases, so data flows between them automatically. The work covers choosing an interface, mapping fields, handling errors and monitoring the connection so that systems stay consistent.",

  sections: [
    {
      heading: "Why ERP integrations are harder than they look",
      paragraphs: [
        "Connecting two systems is easy to demonstrate and hard to keep working. The difficulties are rarely in the first successful call.",
      ],
      bullets: [
        {
          title: "Master data does not match",
          text: "A product may have one code in the ERP, another in the storefront and a third in the warehouse system. Without a reliable mapping, records fail to match or duplicate.",
        },
        {
          title: "Systems disagree about timing",
          text: "Stock changes constantly. If one system updates hourly and another instantly, they will show different numbers at the same moment.",
        },
        {
          title: "Failures are silent",
          text: "A rejected record can sit unnoticed for days unless someone is alerted, and by then orders or stock levels are wrong.",
        },
        {
          title: "The ERP has limits",
          text: "Older systems may offer only file exports or restricted interfaces, and vendor upgrades can change behaviour.",
        },
        {
          title: "Retries can duplicate data",
          text: "A message sent twice after a timeout can create two orders unless the receiving side recognises it.",
        },
      ],
    },
    {
      heading: "How an ERP integration is designed",
      subsections: [
        {
          heading: "Choose the interface that the ERP actually supports",
          paragraphs: [
            "Common options are REST or SOAP APIs, webhooks that notify on change, EDI for exchange with trading partners, scheduled file transfers, and direct database access where the vendor permits it. Middleware or an integration platform can sit in between when several systems must be connected. The right choice depends on what your ERP exposes, how fresh the data must be, and what the vendor supports.",
          ],
        },
        {
          heading: "Map and validate the data",
          paragraphs: [
            "We define how each field in one system corresponds to the other, including units, currencies, date formats and status codes. Validation rules reject malformed records with a clear reason rather than passing bad data downstream.",
          ],
        },
        {
          heading: "Build for failure",
          paragraphs: [
            "Messages carry identifiers so a repeated delivery is recognised and ignored. Failed records are queued and retried with limits, and persistent failures raise an alert. An audit log records what was sent and when, which makes support questions answerable.",
          ],
        },
        {
          heading: "Secure the connection",
          paragraphs: [
            "Credentials are stored outside the code, access is limited to what each integration needs, and traffic is encrypted. Where the ERP holds personal or financial data, we discuss access, retention and your data protection obligations with you at the start.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "A distributor wants its planning tool to use current stock and open purchase orders from the ERP, and to write approved purchase proposals back. An integration would read stock and orders on a schedule, match items through a mapped product code, and post approved proposals as draft purchase orders for a buyer to confirm. Failed postings would appear in a monitored queue. This illustrates a typical design and is not a description of a delivered project.",
      ],
    },
  ],

  capabilitiesHeading: "What an ERP integration project can include",
  capabilities: [
    "API, webhook, EDI and file-based integrations",
    "Field mapping and master data matching",
    "Two-way synchronisation of orders, stock and prices",
    "Validation, retry and duplicate protection",
    "Monitoring, alerting and audit logging",
    "Integration with planning, e-commerce, warehouse and reporting systems",
    "Secure credential handling and access control",
    "Documentation for your team and future developers",
  ],

  benefitsHeading: "What a dependable integration gives you",
  benefits: [
    {
      title: "Less re-keying",
      description: "Orders and stock move between systems without manual copying and the errors that come with it.",
    },
    {
      title: "Consistent numbers",
      description: "Planning, sales and finance read from the same source rather than from exports of different dates.",
    },
    {
      title: "Problems you can see",
      description: "Monitoring and alerts surface failed records quickly instead of weeks later.",
    },
    {
      title: "A foundation for new tools",
      description: "A well-documented interface makes it easier to add planning or analytics software later.",
    },
  ],

  useCasesHeading: "Where this is used",
  useCases: [
    "Feeding stock, sales and purchase data from the ERP into a planning tool",
    "Sending approved purchase or transfer proposals back to the ERP",
    "Synchronising online store orders and inventory with the ERP",
    "Loading ERP data into a reporting database for dashboards",
    "Exchanging orders and invoices with trading partners",
  ],

  processHeading: "How we work",
  process: [
    {
      title: "Map the systems and data",
      description: "We document what each system holds, which interfaces exist and where the data must flow.",
    },
    {
      title: "Design the integration",
      description: "We choose the interface, define the mapping and agree how errors are handled and who is alerted.",
    },
    {
      title: "Build and test with realistic data",
      description: "We test against a non-production environment and examine edge cases such as duplicates and missing fields.",
    },
    {
      title: "Release and monitor",
      description: "We go live in stages with monitoring in place, then document the integration for your team.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and vendor considerations",
      paragraphs: [
        "We work with the interfaces your ERP provides, and the first step is always to confirm what they are and what the vendor permits. Some systems require the vendor or a certified partner to change configuration, and we plan around that rather than assume access. We do not claim vendor partnerships or certifications, and we will tell you if a particular ERP needs specialist help we cannot provide.",
        "Integrations usually support another project. They supply data to [demand forecasting software](/services/software-development/demand-forecasting-software), carry approved orders from [replenishment planning software](/services/software-development/replenishment-planning-software), and feed [business analytics and reporting software](/services/software-development/business-analytics-reporting-software). For online stores, our [Shopify development service](/services/shopify-development) covers storefront work, while this service concentrates on the connection to the ERP.",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "We depend on the ERP's interfaces",
          text: "If the system exposes little, the integration may be limited to batch files, which affects how fresh the data can be.",
        },
        {
          title: "Real time is not always possible",
          text: "Some data is better exchanged on a schedule. Near-real-time costs more and increases the load on the ERP.",
        },
        {
          title: "Data quality remains your responsibility",
          text: "An integration moves data accurately, but it cannot fix product codes or prices that are wrong at the source. We can flag them.",
        },
        {
          title: "Changes in either system can break it",
          text: "Upgrades and new fields need testing. Monitoring and documentation reduce the risk but do not remove it.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "List the systems you want connected, the data that should move between them and how often. Note which ERP and version you use and whether you have access to its interface documentation and a test environment.",
        "A small first integration, such as one-way stock and order data into a reporting database, proves the approach with limited risk. [Contact us](/contact) with that list and we will suggest a sensible starting scope.",
      ],
    },
  ],

  faqHeading: "ERP integration questions",
  faqs: [
    {
      question: "Which ERP systems do you integrate with?",
      answer:
        "That depends on the interfaces the system offers. Tell us which ERP and version you use and we will assess what is feasible before you commit. We do not claim vendor partnerships.",
    },
    {
      question: "Should we use an API, EDI or file transfer?",
      answer:
        "It depends on what your ERP and your partners support. APIs suit frequent, flexible exchange. EDI is common for trading partners. File transfer works when nothing else is available, with less freshness.",
    },
    {
      question: "How do you avoid duplicate orders?",
      answer:
        "Each message carries a unique identifier, and the receiving side ignores one it has already processed. Failed messages are retried within limits and raise an alert if they keep failing.",
    },
    {
      question: "Do we need middleware or an integration platform?",
      answer:
        "Not for every project. Two systems with a stable interface can connect directly. A platform becomes worthwhile when many systems are involved or when your team wants to manage connections itself.",
    },
    {
      question: "Can you change data inside the ERP?",
      answer:
        "Only through interfaces the system and its vendor permit. We usually write proposals as drafts for a person to confirm, which keeps control inside the ERP.",
    },
    {
      question: "Is this a packaged connector?",
      answer:
        "No. It is custom integration work designed around your systems, and we do not claim to have delivered it for a named client.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, which integration work supports.",
  },
  relatedLinks: [
    {
      label: "Supply Chain Planning Software",
      href: "/services/software-development/supply-chain-planning-software",
      description: "A planning layer that depends on clean ERP data.",
    },
    {
      label: "Inventory Optimization Software",
      href: "/services/software-development/inventory-optimization-software",
      description: "Set stock targets using current ERP inventory.",
    },
    {
      label: "Business Analytics & Reporting Software",
      href: "/services/software-development/business-analytics-reporting-software",
      description: "Dashboards built on data loaded from the ERP.",
    },
  ],
  closingCta: {
    headline: "Need your ERP to work with the rest of your stack?",
    subtext:
      "Tell us which systems you run and what should flow between them. We will assess the interfaces and suggest a sensible first integration.",
  },
};
