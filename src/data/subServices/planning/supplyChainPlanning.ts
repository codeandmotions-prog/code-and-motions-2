import { Network } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const supplyChainPlanningSoftware: SubService = {
  slug: "supply-chain-planning-software",
  name: "Supply Chain Planning Software",
  shortDescription:
    "One planning layer that connects demand, stock, purchasing and capacity, so the plans in different departments stop contradicting each other.",
  tags: ["supply chain planning software", "integrated planning", "exception-based planning"],
  icon: Network,
  gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",

  seoTitle: "Supply Chain Planning Software Development",
  metaDescription:
    "Custom supply chain planning software that links demand, inventory, purchasing and capacity in one planning layer on top of your ERP. Built for US, UK and European businesses.",
  h1: "Custom Supply Chain Planning Software",
  primaryKeyword: "supply chain planning software",
  secondaryKeywords: [
    "custom supply chain planning software",
    "supply chain planning system development",
    "integrated business planning software",
    "exception-based planning",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Ask three departments about next quarter and you will often hear three different plans: sales has a forecast, purchasing has an order schedule and operations has a capacity view, each built in a different tool. We design supply chain planning software that sits above your ERP and warehouse systems, brings those views into one place and shows planners what needs attention rather than handing them another report to read.",

  whatIsQuestion: "What is supply chain planning software?",
  whatIsAnswer:
    "Supply chain planning software looks forward rather than recording what has happened. It combines expected demand, current stock, supplier lead times and capacity to decide what to buy, make and move, and when. It complements an ERP, which records transactions, by turning that data into coordinated plans and highlighting where reality is drifting from them.",

  sections: [
    {
      heading: "Why supply chain plans drift out of sync",
      paragraphs: [
        "Each function is usually planning sensibly with the information it has. The difficulty is that the information is different, and so are the time horizons.",
      ],
      bullets: [
        {
          title: "Plans live in separate tools",
          text: "Sales keeps a forecast in a spreadsheet, purchasing works from ERP suggestions and production runs on a schedule maintained by one experienced person. Nobody sees all three at once.",
        },
        {
          title: "Horizons do not match",
          text: "Strategic decisions about capacity and product mix look many months ahead, material planning looks weeks ahead, and scheduling looks at days. Without a deliberate link, changes at one level never reach the others.",
        },
        {
          title: "Everything arrives as a list",
          text: "Thousands of order suggestions land on a planner's screen with no indication of which ones actually matter, so attention is spread thin.",
        },
        {
          title: "Assumptions go stale",
          text: "Lead times, minimum order quantities and capacity figures were correct when someone entered them. Plans built on them look fine and fail in practice.",
        },
      ],
    },
    {
      heading: "How a custom planning layer is structured",
      paragraphs: [
        "There is no single correct architecture, but planning systems of this kind tend to be built from the same layers, which is also what lets them grow module by module.",
      ],
      subsections: [
        {
          heading: "A data foundation",
          paragraphs: [
            "Orders, stock, purchase orders, supplier data and, where relevant, storefront or warehouse data are synchronised from their source systems on a schedule. The ERP typically remains the system of record, and the planning layer reads from it rather than replacing it.",
          ],
        },
        {
          heading: "Planning modules",
          paragraphs: [
            "Forecasting, stock targets, purchasing and production planning each become a module with clear inputs and outputs. You can begin with the one that hurts most, such as [demand forecasting](/services/software-development/demand-forecasting-software) or [inventory optimization](/services/software-development/inventory-optimization-software), and add others later.",
          ],
        },
        {
          heading: "One shared plan with exceptions",
          paragraphs: [
            "Instead of listing every recommendation, the system flags the ones that break a rule: a projected stockout, an order that will arrive late, a capacity overload. Planners spend their time on those and let routine decisions run.",
          ],
        },
        {
          heading: "Scenarios and version history",
          paragraphs: [
            "Planners can test a supplier delay or a demand surge against the current plan, compare the outcome and keep a record of which version was approved. This supports the monthly alignment process described in our [sales and operations planning](/services/software-development/sales-operations-planning-software) page.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "Consider a business that assembles products in one plant, stores them in three warehouses and sells through distributors and its own web shop. A planning layer could pull orders from the ERP and storefront, forecast by channel, compare projected stock with targets in each warehouse, and warn the purchasing team when a delayed component will cause a gap three weeks out. This sketches how such a system behaves and does not describe a delivered project.",
      ],
    },
  ],

  capabilitiesHeading: "What a supply chain planning build can include",
  capabilities: [
    "A unified data layer fed from your ERP, warehouse and sales systems",
    "Modular planning for demand, stock, purchasing and production",
    "Exception queues that rank issues by impact and urgency",
    "Scenario comparison for supplier, demand and capacity changes",
    "Role-based views for planners, buyers and management",
    "Plan versioning with an audit trail of changes",
    "Monitoring that shows when source data is late or incomplete",
  ],

  benefitsHeading: "What a connected planning layer changes",
  benefits: [
    {
      title: "One version of the plan",
      description: "Departments work from the same numbers, which reduces time spent reconciling spreadsheets before a meeting.",
    },
    {
      title: "Attention goes where it is needed",
      description: "Exception-based working lets planners concentrate on the few decisions that carry real risk.",
    },
    {
      title: "Earlier visibility of problems",
      description: "A projected shortage is visible weeks before it becomes an expedited shipment.",
    },
    {
      title: "Room to grow in stages",
      description: "Because the system is modular, you can add planning functions as the business is ready rather than committing to everything at once.",
    },
  ],

  useCasesHeading: "Who this is built for",
  useCases: [
    "Manufacturers coordinating materials, production and distribution",
    "Wholesale distributors balancing supplier lead times against customer demand",
    "Retailers and brands planning flow through distribution centres",
    "E-commerce companies working with third-party logistics providers",
    "Businesses currently running planning in spreadsheets around an ERP",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Map decisions and horizons",
      description: "We list who decides what, how far ahead, and with which data, so the system follows real decisions rather than an abstract model.",
    },
    {
      title: "Build the data foundation",
      description: "We connect source systems, clean master data and make the refresh schedule visible.",
    },
    {
      title: "Deliver the first module",
      description: "We build the planning function that matters most and prove it against how you plan today.",
    },
    {
      title: "Extend step by step",
      description: "We add modules, scenarios and views as the first one beds in.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "A planning layer is only as dependable as the data entering it, so integration usually takes more effort than the planning logic. Interfaces vary: some systems offer REST APIs, some rely on file exports, and some trading partners still expect EDI. Our [ERP integration services](/services/software-development/erp-integration-services) cover those routes and the master-data mapping that usually causes the most trouble.",
        "Technically we favour a modular, API-first design with background jobs for the heavy planning calculations, role-based access, and hosting chosen to fit your security and data-residency requirements. The specific stack is confirmed with you rather than assumed. Where analytics matter, the system can feed [business analytics and reporting](/services/software-development/business-analytics-reporting-software) so leadership sees the same numbers as planners.",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "It does not replace your ERP",
          text: "The ERP still records orders, stock and finance. The planning layer reads from it and writes recommendations back.",
        },
        {
          title: "Trying to model everything first causes delays",
          text: "Projects that attempt every edge case in the first release tend to stall. A narrower first module that works is more valuable.",
        },
        {
          title: "Master data decides feasibility",
          text: "Plans built on outdated lead times, routings or capacities will be technically correct and practically wrong, so data cleaning belongs in the plan.",
        },
        {
          title: "People have to use it",
          text: "If planners cannot see the plan in their normal workflow, they fall back to spreadsheets. Usability is a delivery requirement, not a finishing touch.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "A packaged supply chain planning product can be the right choice when your processes are conventional. Custom development is worth considering when your structure is unusual, when planning has to be embedded in a product you offer, or when licence costs and customisation limits outweigh the cost of owning the logic.",
        "The most useful first step is a decision map: a short working session listing the planning decisions you make each week and month, the data each depends on, and where today's process breaks. From that we can recommend a first module and a realistic scope. [Start the conversation](/contact) with a rough description of your sites, systems and planning pain points.",
      ],
    },
  ],

  faqHeading: "Supply chain planning software questions",
  faqs: [
    {
      question: "Is this the same as an ERP or a supply chain management system?",
      answer:
        "No. An ERP records transactions such as orders, stock movements and invoices. Planning software uses that data to look ahead and recommend what to buy, make and move. The two are normally used together.",
    },
    {
      question: "Do we have to replace our ERP?",
      answer:
        "No. The usual design keeps the ERP as the system of record and adds a planning layer that reads from it and returns recommendations.",
    },
    {
      question: "Where should we start?",
      answer:
        "With the single planning decision that causes the most pain, often forecasting, stock targets or purchasing. Starting narrow gets something useful into planners' hands sooner and teaches us what to build next.",
    },
    {
      question: "Can it cover several warehouses and many suppliers?",
      answer:
        "Yes. Multi-location stock and supplier-specific lead times are standard parts of the data model. The practical limit is data quality rather than the number of sites.",
    },
    {
      question: "What does exception-based planning mean?",
      answer:
        "It means the system only asks for attention when a rule is broken, such as a projected stockout or a late order, instead of presenting every recommendation for review.",
    },
    {
      question: "Do you sell a ready-made planning product?",
      answer:
        "No. We build custom planning software to your requirements, and we do not present it as a packaged product or as a project we have already delivered for a named customer.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which supply chain planning is one application area.",
  },
  relatedLinks: [
    {
      label: "Production Planning Software",
      href: "/services/software-development/production-planning-software",
      description: "Plan materials, capacity and schedules on the shop floor.",
    },
    {
      label: "Replenishment Planning Software",
      href: "/services/software-development/replenishment-planning-software",
      description: "Turn stock targets into daily purchasing and transfer recommendations.",
    },
    {
      label: "Business Analytics & Reporting Software",
      href: "/services/software-development/business-analytics-reporting-software",
      description: "Give leadership dashboards built from the same planning data.",
    },
  ],
  closingCta: {
    headline: "Ready to bring your plans into one place?",
    subtext:
      "Describe your sites, systems and the planning decisions that cause the most trouble. We will propose a focused first module.",
  },
};
