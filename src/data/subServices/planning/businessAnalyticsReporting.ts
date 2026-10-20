import { BarChart3 } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const businessAnalyticsReportingSoftware: SubService = {
  slug: "business-analytics-reporting-software",
  name: "Business Analytics & Reporting Software",
  shortDescription:
    "Dashboards and reports built on one set of KPI definitions, so finance, sales and operations stop arguing about whose number is right.",
  tags: ["business analytics software", "custom reporting", "KPI dashboards"],
  icon: BarChart3,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #7CE6F7 100%)",

  seoTitle: "Business Analytics & Reporting Software Development",
  metaDescription:
    "Custom business analytics and reporting software: KPI dashboards, governed metric definitions and scheduled reports built on your ERP and sales data.",
  h1: "Business Analytics & Reporting Software Development",
  primaryKeyword: "business analytics software development",
  secondaryKeywords: [
    "custom reporting software",
    "KPI dashboard development",
    "business intelligence dashboard development",
    "operational reporting software",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Many businesses have plenty of data and very little agreement about what it says. Sales reports one margin, finance another, and operations pulls a stock figure from a third source. We build analytics and reporting software that pulls your systems together, defines each KPI once, and presents the result in dashboards and reports people can drill into rather than question.",

  whatIsQuestion: "What is business analytics and reporting software?",
  whatIsAnswer:
    "Business analytics and reporting software collects data from systems such as your ERP, storefront and CRM, defines key measures consistently, and presents them as dashboards and reports. Reporting shows what is happening in operations now, while analytics looks across systems and time for trends and causes. Good software supports both from the same governed numbers.",

  sections: [
    {
      heading: "Why reporting becomes a problem as a business grows",
      paragraphs: [
        "Reporting rarely starts as a problem. It becomes one gradually, as each department builds what it needs.",
      ],
      bullets: [
        {
          title: "The same metric has several definitions",
          text: "Each report calculates cost of goods, margin or service level in its own way, so two people can present different answers to the same question and both be technically right.",
        },
        {
          title: "Reports are built one request at a time",
          text: "Every new question becomes a custom extract, which takes time and leaves behind dozens of near-duplicate files.",
        },
        {
          title: "Spreadsheets are the glue",
          text: "Exports from several systems are merged by hand, which is slow, error-prone and depends on whoever built the file.",
        },
        {
          title: "Heavy queries hit the live system",
          text: "Running large reports directly on a production ERP can slow down the operation it is supposed to describe.",
        },
        {
          title: "Nobody can tell how fresh a figure is",
          text: "Without a visible refresh time, readers do not know whether they are looking at this morning or last month.",
        },
      ],
    },
    {
      heading: "How analytics and reporting software is built",
      subsections: [
        {
          heading: "Operational reporting and analytics are different jobs",
          paragraphs: [
            "Operational reports serve people who act on current status, such as which orders to ship today or which invoices to pay. They usually read close to the live system. Analytics serves decision-makers comparing trends across regions, products or customers, and typically draws on a separate store that combines several sources and is refreshed on a schedule. Treating the two as complementary avoids forcing one tool to do both badly.",
          ],
        },
        {
          heading: "A data pipeline that moves and checks the data",
          paragraphs: [
            "Data is extracted from each source, loaded into a reporting database and transformed into consistent structures. Automated checks flag missing loads, duplicates and values that fall outside expected ranges, so problems are found before a director sees a wrong chart.",
          ],
        },
        {
          heading: "A governed set of definitions",
          paragraphs: [
            "Each KPI is defined once, with its formula and its owner, and every dashboard draws on that definition. For planning, that might include forecast accuracy (WAPE and bias), weeks of cover, stockout rate, supplier on-time delivery and service level. Definitions such as on-time-in-full differ between companies, so agreeing the exact rule is part of the work.",
          ],
        },
        {
          heading: "Dashboards and reports that people use",
          paragraphs: [
            "Dashboards offer filters and drill-down from a headline figure to the underlying orders. Scheduled reports go out by email or export in the formats your team already uses, and alerts can warn when a measure crosses a threshold.",
          ],
        },
        {
          heading: "Access that matches your organisation",
          paragraphs: [
            "Permissions follow roles, so a regional manager sees their region and finance sees margin, rather than everyone seeing everything or nothing.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "An operations director wants a single weekly view of service level, stock cover and supplier performance across three warehouses. Today it takes an analyst a day to assemble. A reporting build would load the data nightly, calculate the agreed measures from shared definitions, and present them with drill-down to the late purchase orders behind each supplier score. This illustrates the intent and is not a description of a delivered project.",
      ],
    },
  ],

  capabilitiesHeading: "What an analytics and reporting build can include",
  capabilities: [
    "Data pipelines from your ERP, storefront, CRM and spreadsheets",
    "Automated data quality checks and visible refresh times",
    "A governed KPI layer with documented definitions",
    "Interactive dashboards with filters and drill-down",
    "Scheduled reports in PDF or spreadsheet form",
    "Threshold alerts for measures that move out of range",
    "Role-based access to data and dashboards",
    "Planning measures such as forecast accuracy, bias and stock cover",
  ],

  benefitsHeading: "What consistent reporting gives you",
  benefits: [
    {
      title: "Numbers people agree on",
      description: "One definition per KPI removes most arguments about whose figure is right.",
    },
    {
      title: "Faster answers",
      description: "Questions that needed a custom extract can be answered in a dashboard filter.",
    },
    {
      title: "Less load on the live system",
      description: "Analysis runs against a reporting store rather than your production ERP.",
    },
    {
      title: "Trust that can be checked",
      description: "Data quality checks and refresh times make it clear how reliable each figure is.",
    },
  ],

  useCasesHeading: "Who this is for",
  useCases: [
    "Operations and supply chain teams tracking service level, stock and supplier performance",
    "Finance teams reconciling figures across several systems",
    "Sales leaders who need pipeline and revenue views by region or product",
    "E-commerce businesses combining storefront, advertising and fulfilment data",
    "Companies whose reporting currently depends on one person's spreadsheets",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "List the decisions and KPIs",
      description: "We start with the decisions your team makes and the measures they need, then agree precise definitions.",
    },
    {
      title: "Build the pipeline",
      description: "We connect sources, load them into a reporting database and add quality checks.",
    },
    {
      title: "Design dashboards with users",
      description: "We build the first dashboards with the people who will use them and refine them against real questions.",
    },
    {
      title: "Govern and extend",
      description: "We document definitions and ownership, then add measures and sources in stages.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "The reporting store might be a relational database or a cloud data warehouse, depending on data volume, budget and where your systems are hosted. Loads are usually incremental, so only changes are processed, and they are scheduled to avoid peak operational hours. Getting clean data out of the source systems is often the hardest step, which is where [ERP integration services](/services/software-development/erp-integration-services) come in.",
        "We build custom dashboards where you need a tailored experience or want analytics embedded inside your own product. Sometimes an existing business intelligence tool on top of a well-built data layer is the better and cheaper answer, and we will say so. Planning measures such as forecast accuracy come from [demand forecasting software](/services/software-development/demand-forecasting-software), and the dashboards can serve a wider [supply chain planning](/services/software-development/supply-chain-planning-software) layer.",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Definitions are a business decision",
          text: "Software cannot decide how your company should define margin or on-time delivery. It can only apply the definition you agree.",
        },
        {
          title: "Bad data produces confident-looking charts",
          text: "Source data problems show up as wrong dashboards. Cleaning and monitoring the data is a core part of the project.",
        },
        {
          title: "Dashboards do not create insight by themselves",
          text: "A chart answers a question only if someone asked it. We design around real decisions, not around the number of charts.",
        },
        {
          title: "Scope grows quickly",
          text: "Every department will want its own measures. Starting with a small, well-defined set keeps the first release useful.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Collect the five or ten reports your managers rely on most, and note where the figures disagree or take too long to produce. That list shows which definitions need settling and which data sources are involved.",
        "A sensible pilot is one dashboard for one team, built on a small pipeline, so you can judge the value before investing more. [Contact us](/contact) with that list and we will suggest a first scope.",
      ],
    },
  ],

  faqHeading: "Business analytics and reporting questions",
  faqs: [
    {
      question: "What is the difference between reporting, business intelligence and analytics?",
      answer:
        "Reporting shows current or past status for an operation, often to prompt an immediate action. Business intelligence and analytics examine trends across several systems to inform broader decisions. They draw on shared data but serve different audiences.",
    },
    {
      question: "Do we need a data warehouse?",
      answer:
        "Not always. A small business may be well served by a reporting database fed from one or two systems. A warehouse becomes useful as sources, volume and users grow. We recommend the simplest option that fits.",
    },
    {
      question: "Should we build custom or buy a business intelligence tool?",
      answer:
        "An existing tool is often sensible for general analysis. Custom dashboards make sense when you need a tailored interface, embedded analytics in your own product, or tight integration with a workflow. We will tell you which applies.",
    },
    {
      question: "Can it show planning measures such as forecast accuracy?",
      answer:
        "Yes. Forecast accuracy, bias, stock cover, stockout rate and supplier delivery performance can all be calculated from planning and ERP data once their definitions are agreed.",
    },
    {
      question: "Will the data be real time?",
      answer:
        "Most analytics refreshes on a schedule, from hourly to nightly. Near-real-time is possible for specific operational views, at greater cost and complexity.",
    },
    {
      question: "Is this a packaged analytics product?",
      answer:
        "No. It is custom software designed around your data and decisions, and we do not claim to have delivered it for a named client.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which analytics and reporting software is one application.",
  },
  relatedLinks: [
    {
      label: "ERP Integration Services",
      href: "/services/software-development/erp-integration-services",
      description: "Move clean data out of the ERP and into your reporting store.",
    },
    {
      label: "Supply Chain Planning Software",
      href: "/services/software-development/supply-chain-planning-software",
      description: "A planning layer that analytics can sit alongside.",
    },
    {
      label: "AI-Powered Business Planning",
      href: "/services/software-development/ai-business-planning-software",
      description: "Ask questions of your planning data in plain language.",
    },
  ],
  closingCta: {
    headline: "Want one version of the truth in your reports?",
    subtext:
      "Share the reports your managers rely on and where the numbers disagree. We will suggest a first dashboard and the definitions it needs.",
  },
};
