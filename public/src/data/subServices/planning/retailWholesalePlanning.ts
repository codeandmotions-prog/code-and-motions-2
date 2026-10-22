import { Warehouse } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const retailWholesalePlanningSoftware: SubService = {
  slug: "retail-wholesale-planning-software",
  name: "Retail & Wholesale Planning Software",
  shortDescription:
    "Planning across stores, branches, online and trade accounts, with stock allocation rules for when supply cannot cover every channel.",
  tags: ["retail planning software", "wholesale planning software", "multi-channel inventory planning"],
  icon: Warehouse,
  gradient: "linear-gradient(155deg, #384057 0%, #142B6B 55%, #22D3EE 100%)",

  seoTitle: "Retail & Wholesale Planning Software",
  metaDescription:
    "Custom retail and wholesale planning software for multi-channel demand, store and branch stock, and allocation rules when supply is short. Built for US, UK and EU teams.",
  h1: "Retail & Wholesale Planning Software",
  primaryKeyword: "retail and wholesale planning software",
  secondaryKeywords: [
    "wholesale demand planning software",
    "retail inventory planning software",
    "multi-channel inventory planning",
    "distributor planning software",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Selling through your own stores, a web shop, marketplaces and trade accounts means the same stock is promised to customers who behave very differently. We build retail and wholesale planning software that plans demand by channel and location, shows where stock is out of balance, and applies agreed rules when there is not enough to go around.",

  whatIsQuestion: "What is retail and wholesale planning software?",
  whatIsAnswer:
    "Retail and wholesale planning software forecasts demand and plans stock across the places a business sells: stores, branches, online channels and trade customers. It treats each channel and location as its own demand pattern, plans replenishment between warehouses and outlets, and applies allocation rules when supply cannot cover every channel.",

  sections: [
    {
      heading: "Why retail and wholesale planning is harder than it looks",
      paragraphs: [
        "Retail and wholesale each bring their own difficulties, and many businesses face both at once.",
      ],
      bullets: [
        {
          title: "Each channel behaves differently",
          text: "Retailer orders arrive in batches from their distribution centres, trade customers order on their own cycles, direct sales follow your marketing calendar, and marketplace sales depend on search position and deal events. A single combined forecast hides all of that.",
        },
        {
          title: "Shared stock is not interchangeable",
          text: "Stock in a marketplace fulfilment centre cannot fill a trade order, and stock in one region may be wrong for customers in another.",
        },
        {
          title: "A few accounts drive a lot of volume",
          text: "In wholesale, large customers often account for much of the demand, so aggregate forecasts miss what matters and key accounts need to be forecast individually.",
        },
        {
          title: "Catalogues are large and demand is lumpy",
          text: "Project timing and year-end buying create spikes, and many items sell rarely, which makes simple averages unreliable.",
        },
        {
          title: "Data sits in many systems",
          text: "Each channel reports in its own format, so sales history has to be standardised before it can be compared.",
        },
      ],
    },
    {
      heading: "How retail and wholesale planning software works",
      subsections: [
        {
          heading: "One consolidated view of sales, planned by channel and location",
          paragraphs: [
            "Sales from point of sale, e-commerce, marketplaces and wholesale orders are collected, standardised by product and week, and kept separate by channel. Forecasts are made per channel and location, then combined, and the combined figure is netted against stock on hand, stock on order and commitments.",
          ],
        },
        {
          heading: "Account-level forecasting for key customers",
          paragraphs: [
            "Major trade customers are forecast on their own ordering rhythm, so a retailer that has quietly stopped reordering is noticed and a one-off bulk order is not mistaken for a trend.",
          ],
        },
        {
          heading: "Promotions tied to their channel",
          paragraphs: [
            "A retailer's promotion affects that retailer, your own campaign affects direct sales, and a marketplace deal affects marketplace sales. Adjustments stay with the channel they belong to instead of being spread across the total.",
          ],
        },
        {
          heading: "Allocation rules when supply is short",
          paragraphs: [
            "Teams agree in advance how to share scarce stock, for example priority to one channel, a proportional split or reserved quantities for key accounts. The software surfaces a shortfall early enough for the owners of each channel to decide, and records the decision.",
          ],
        },
        {
          heading: "Flow between warehouses, stores and branches",
          paragraphs: [
            "Transfer and replenishment recommendations help balance stock between a central warehouse and outlets, and fit deliveries to practical limits such as pack sizes and truck loads. Ordering from suppliers builds on [replenishment planning](/services/software-development/replenishment-planning-software).",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "Imagine a homeware brand with twelve of its own stores, a web shop and thirty trade accounts, all served from one warehouse. A planning tool would forecast each channel separately, show that a best-selling line is about to run short, and apply the agreed rule of holding back a share for trade accounts before the web shop campaign launches. This illustrates the approach and is not a record of an actual client.",
      ],
    },
  ],

  capabilitiesHeading: "What a retail and wholesale planning build can include",
  capabilities: [
    "Consolidation of sales from point of sale, e-commerce, marketplaces and wholesale orders",
    "Forecasts by channel and by location, combined into a total view",
    "Account-level forecasting for key trade customers",
    "A promotion and event calendar tied to specific channels",
    "Allocation rules with reserved quantities and priority settings",
    "Transfer recommendations between warehouse, stores and branches",
    "Service and stock dashboards by channel and location",
    "A trace of overrides with owner, date and reason",
  ],

  benefitsHeading: "What channel-aware planning gives you",
  benefits: [
    {
      title: "Signals that are not averaged away",
      description: "Separate channels reveal changes that a combined forecast hides.",
    },
    {
      title: "Allocation decided in advance",
      description: "Shortages are handled by agreed rules rather than by whoever shouts loudest.",
    },
    {
      title: "Better balance across locations",
      description: "Excess in one place and shortage in another becomes visible and actionable.",
    },
    {
      title: "Traceable adjustments",
      description: "Overrides are recorded, so reviews can see what changed and why.",
    },
  ],

  useCasesHeading: "Who this is built for",
  useCases: [
    "Wholesale distributors with large catalogues and several key accounts",
    "Brands selling through their own stores, an online shop and trade partners",
    "Retail chains planning flow from distribution centres to stores",
    "E-commerce businesses selling across their own site and marketplaces",
    "Manufacturers that also sell directly and need to protect trade customer supply",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Map channels and stock",
      description: "We document your channels, locations and how stock moves between them.",
    },
    {
      title: "Consolidate the data",
      description: "We standardise sales and stock data from each source into one structure.",
    },
    {
      title: "Plan and allocate",
      description: "We build per-channel forecasts, netting and allocation rules with the people who own each channel.",
    },
    {
      title: "Pilot and extend",
      description: "We pilot on one product range or region, review results, then widen coverage.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "In most businesses the ERP remains the system of record for orders and inventory, and a separate planning layer reads from it, with nightly or more frequent synchronisation from each sales channel. Storefront and marketplace data typically arrives through their APIs or scheduled exports. If your online shop runs on Shopify, our [Shopify development](/services/shopify-development) work covers the storefront side, and our [ERP integration services](/services/software-development/erp-integration-services) cover the connection to your back office.",
        "This page is about planning. If what you need is point-of-sale and day-to-day stock handling inside shops, that is covered by [Retail & Shop Software Development](/services/software-development/retail-shop-software-development). Stock targets across locations build on [inventory optimization](/services/software-development/inventory-optimization-software).",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Channel data is rarely consistent",
          text: "Different systems define a sale, a return and a product differently. Standardising them is real work and affects the result.",
        },
        {
          title: "Returns and cancellations need deliberate treatment",
          text: "Whether and how they adjust demand depends on your data and business, and we agree the approach rather than assuming one.",
        },
        {
          title: "Allocation is a business decision",
          text: "Software applies the rules you choose. It cannot decide which channel deserves priority.",
        },
        {
          title: "Lumpy wholesale demand stays uncertain",
          text: "Account-level forecasting helps, but project-driven orders cannot be predicted precisely.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Begin with the channel or range where stock imbalance hurts most. List your sales sources, locations and any allocation rules you already apply informally, and bring a sample of sales history from each channel.",
        "A pilot on one range lets us test whether per-channel forecasting and explicit allocation rules improve availability, without committing to a full rollout. [Get in touch](/contact) with a description of your channels and we will suggest a starting scope.",
      ],
    },
  ],

  faqHeading: "Retail and wholesale planning software questions",
  faqs: [
    {
      question: "How is wholesale planning different from retail planning?",
      answer:
        "Wholesale demand tends to come from fewer, larger customers ordering in lumps, with supplier minimums and large catalogues. Retail demand is more granular across stores and promotions. Businesses that do both need to plan the two side by side.",
    },
    {
      question: "How does this differ from retail and shop software?",
      answer:
        "Retail and shop software handles transactions and stock movements, such as point of sale. Planning software forecasts demand, balances stock across locations and applies allocation rules. They complement each other.",
    },
    {
      question: "Can it plan across our online shop and marketplaces?",
      answer:
        "Yes, where the sales data can be extracted through APIs or exports. Each channel is forecast separately and then combined against shared stock.",
    },
    {
      question: "What happens when there is not enough stock for every channel?",
      answer:
        "You define allocation rules in advance, such as priority to one channel, proportional splits or reserved quantities. The software shows the shortfall early and applies or proposes the rule you chose.",
    },
    {
      question: "Do we need to replace our ERP?",
      answer:
        "No. The ERP stays as the system of record. The planning software reads from it and returns recommendations.",
    },
    {
      question: "Is this a ready-made product?",
      answer:
        "No. It is custom software designed around your channels and rules, and we do not claim to have delivered it for a named client.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which retail and wholesale planning is one commercial application.",
  },
  relatedLinks: [
    {
      label: "Retail & Shop Software Development",
      href: "/services/software-development/retail-shop-software-development",
      description: "Point-of-sale, stock handling and store operations software.",
    },
    {
      label: "Replenishment Planning Software",
      href: "/services/software-development/replenishment-planning-software",
      description: "Daily purchase and transfer recommendations for each location.",
    },
    {
      label: "Demand Forecasting Software",
      href: "/services/software-development/demand-forecasting-software",
      description: "The forecasting foundation behind per-channel planning.",
    },
  ],
  closingCta: {
    headline: "Want every channel planned on its own terms?",
    subtext:
      "Tell us where you sell, how stock moves between locations and what goes wrong when supply is tight. We will suggest a focused pilot.",
  },
};
