import { CalendarClock } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const salesOperationsPlanningSoftware: SubService = {
  slug: "sales-operations-planning-software",
  name: "Sales & Operations Planning (S&OP)",
  shortDescription:
    "Workflow software for the monthly planning cycle: one agreed demand plan, a supply plan that matches it, and a decision log that sticks.",
  tags: ["S&OP software", "sales and operations planning", "demand and supply review"],
  icon: CalendarClock,
  gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 55%, #7CE6F7 100%)",

  seoTitle: "Sales & Operations Planning (S&OP) Software",
  metaDescription:
    "Custom S&OP software that supports the monthly demand, supply and finance review with one shared plan, scenarios and a decision log. For US, UK and European teams.",
  h1: "Sales & Operations Planning (S&OP) Software",
  primaryKeyword: "sales and operations planning software",
  secondaryKeywords: [
    "S&OP software",
    "S&OP process software",
    "demand and supply review software",
    "integrated business planning tool",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "A sales and operations planning meeting is supposed to settle one question: given what we expect to sell, what are we going to make, buy and spend? In practice much of the meeting is spent arguing about whose spreadsheet is right. We build S&OP software that gives the monthly cycle a shared set of numbers, a clear calendar and a record of what was decided.",

  whatIsQuestion: "What is S&OP software?",
  whatIsAnswer:
    "S&OP software supports the recurring cross-functional process in which sales, operations, finance and leadership agree a single plan. It collects the demand view, tests whether supply and capacity can meet it, translates the result into financial terms and records the decisions made, so that everyone works from one set of figures until the next cycle.",

  sections: [
    {
      heading: "Why S&OP often disappoints in practice",
      paragraphs: [
        "The method itself is sound. What undermines it is usually the machinery around the meeting.",
      ],
      bullets: [
        {
          title: "Packs are assembled by hand",
          text: "Analysts spend days pulling figures from several systems into slides, and by the time the meeting happens the numbers are already out of date.",
        },
        {
          title: "People debate the numbers, not the decisions",
          text: "When demand, supply and finance each bring their own version, the time goes on reconciling them instead of on choosing between options.",
        },
        {
          title: "Gaps between plans stay hidden",
          text: "A mismatch between the sales plan and the budget, or between demand and capacity, is easy to miss in a static file.",
        },
        {
          title: "Decisions evaporate",
          text: "Without owners and deadlines recorded somewhere visible, actions from one cycle are forgotten by the next.",
        },
        {
          title: "Nobody can see what changed",
          text: "If plans are overwritten each month, it is hard to learn from how the forecast moved or who adjusted it.",
        },
      ],
    },
    {
      heading: "How S&OP software supports each stage of the cycle",
      paragraphs: [
        "Companies run the cycle slightly differently, and some place the finance review in a different position, but the shape is broadly consistent. This is how software typically helps at each stage.",
      ],
      subsections: [
        {
          heading: "Product and portfolio review",
          paragraphs: [
            "The system shows launches, phase-outs and their expected effect on existing products, so the team can see where a new item will cannibalise an old one before the demand plan is built.",
          ],
        },
        {
          heading: "Demand review",
          paragraphs: [
            "A statistical forecast is combined with input from sales and marketing into a single consensus demand plan, in units and in revenue. Each adjustment has an owner and a reason, and the plan is compared with the budget so the gap is visible.",
          ],
        },
        {
          heading: "Supply review",
          paragraphs: [
            "The software checks the demand plan against material availability and rough-cut capacity, and lets planners compare alternatives such as adding a shift, shifting orders or buying in. Each scenario shows its effect on service, stock and cost.",
          ],
        },
        {
          heading: "Finance reconciliation",
          paragraphs: [
            "Plans are translated into financial terms and set against actuals, which also gives a rolling measure of forecast accuracy by product, region or channel.",
          ],
        },
        {
          heading: "Pre-meeting alignment and the executive decision",
          paragraphs: [
            "Open gaps and disagreements are listed in advance, so the senior meeting is spent deciding. The outcome, with owners and dates, is recorded in a decision log that carries into the next cycle.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "A food producer runs its cycle on the first Tuesday of the month. A year ago the supply team rebuilt its figures in a spreadsheet the night before. With a purpose-built tool, the consensus demand plan, capacity check and budget comparison would already be on screen, the team would test two options for covering a seasonal peak, and the agreed choice would be logged with an owner. This describes how such a tool would work and not a project we have delivered.",
      ],
    },
  ],

  capabilitiesHeading: "What an S&OP build can include",
  capabilities: [
    "A cycle calendar with owners, deadlines and reminders",
    "A consensus demand plan with sales, marketing and finance inputs",
    "Supply and rough-cut capacity checks against the demand plan",
    "Unit-to-revenue translation and comparison with budget",
    "Scenario comparison showing service, stock and cost effects",
    "Review packs generated from live data rather than assembled by hand",
    "A decision and action log with owners and due dates",
    "Plan version history and a record of who changed what",
  ],

  benefitsHeading: "What a better cycle gives you",
  benefits: [
    {
      title: "A single set of numbers",
      description: "Every function sees the same plan, so the meeting can focus on trade-offs.",
    },
    {
      title: "Less preparation, fresher data",
      description: "Review packs come from live data, which cuts the days analysts spend rebuilding slides.",
    },
    {
      title: "Gaps surface early",
      description: "Mismatches between demand, supply and budget are visible before the executive meeting.",
    },
    {
      title: "Decisions that are followed up",
      description: "Actions have owners and dates in a place everyone can see, so they carry forward.",
    },
  ],

  useCasesHeading: "Who this is for",
  useCases: [
    "Manufacturers aligning production capacity with a rolling demand plan",
    "Distributors coordinating purchasing commitments with sales expectations",
    "Consumer goods companies managing launches and seasonal peaks",
    "Growing businesses moving from ad hoc planning to a formal monthly cycle",
    "Companies whose S&OP currently runs on emailed spreadsheets",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Map your cycle",
      description: "We document how your meetings run today, who contributes what and where time is lost.",
    },
    {
      title: "Model the plan",
      description: "We define the shared plan structure: products, periods, units, revenue and the supply and capacity limits.",
    },
    {
      title: "Build workflow and views",
      description: "We build the calendar, input screens, scenarios and review pages around your stages.",
    },
    {
      title: "Run a live cycle",
      description: "We support your first real cycle, then refine based on what the team actually used.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "The demand side usually comes from a forecasting tool or spreadsheet, and the supply side from ERP data such as stock, open purchase orders and capacity. Getting those inputs refreshed reliably is a larger task than the interface, and our [ERP integration services](/services/software-development/erp-integration-services) cover it. If you need a statistical baseline for the demand review, [demand forecasting software](/services/software-development/demand-forecasting-software) can provide it.",
        "On the technical side, we would normally build role-based access so each function edits only its own inputs, keep every version of the plan, and support exports to the formats executives expect. The wider planning layer around S&OP is described under [supply chain planning software](/services/software-development/supply-chain-planning-software).",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Software does not create the discipline",
          text: "S&OP depends on leaders attending, honouring the calendar and accepting the agreed plan. A tool makes that easier but cannot enforce it.",
        },
        {
          title: "Terminology and sequence vary",
          text: "Organisations differ on where finance review sits and whether they call the process IBP. We adapt to your design rather than imposing a standard one.",
        },
        {
          title: "Garbage in, confident-looking garbage out",
          text: "If the underlying demand or capacity data is unreliable, a tidy interface will not rescue the plan.",
        },
        {
          title: "Maturity takes cycles",
          text: "Most teams improve over several months of real use. Start with a version that covers the essentials and extend it.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "If your cycle already works well in a packaged tool, there may be no reason to build. Custom software is worth considering when your structure is unusual, when you want the planning data connected to systems you already own, or when you need the cycle embedded in a wider platform.",
        "A good first step is to bring your current meeting pack and describe where preparation time goes. We can then suggest a version that automates the most painful part first, for example the consensus demand plan or the decision log. [Talk to us](/contact) about your current cycle.",
      ],
    },
  ],

  faqHeading: "S&OP software questions",
  faqs: [
    {
      question: "What does S&OP stand for and what does it do?",
      answer:
        "S&OP stands for sales and operations planning. It is a recurring process, usually monthly, in which sales, operations, finance and leadership agree one plan for what to sell, make and buy, based on a consensus view of demand and the capacity to supply it.",
    },
    {
      question: "How does S&OP differ from integrated business planning?",
      answer:
        "Terminology varies. Integrated business planning is often used to describe a broader version of the process that ties financial and strategic planning more tightly to the cycle. We build to the structure your organisation actually uses.",
    },
    {
      question: "Who normally takes part?",
      answer:
        "Typically sales, marketing, product planning, supply and capacity planners, finance and senior leadership, with leaders attending the final executive session to resolve open trade-offs.",
    },
    {
      question: "Why not keep running S&OP in spreadsheets?",
      answer:
        "Spreadsheets work at small scale. They become fragile when many people edit them, when versions multiply, and when you need an audit trail or scenario comparisons. Software addresses those specific weaknesses.",
    },
    {
      question: "Can it use our existing forecasts?",
      answer:
        "Yes. It can import a forecast from your current tool or spreadsheet, and we can add a statistical baseline if you do not have one.",
    },
    {
      question: "Is this an off-the-shelf S&OP product?",
      answer:
        "No. It is custom software built around your process, and we do not claim to have delivered one for a named customer.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which S&OP software is one planning application.",
  },
  relatedLinks: [
    {
      label: "Demand Forecasting Software",
      href: "/services/software-development/demand-forecasting-software",
      description: "Supply the statistical baseline for your demand review.",
    },
    {
      label: "Supply Chain Planning Software",
      href: "/services/software-development/supply-chain-planning-software",
      description: "The wider planning layer around the monthly cycle.",
    },
    {
      label: "Business Analytics & Reporting Software",
      href: "/services/software-development/business-analytics-reporting-software",
      description: "Dashboards for plan versus actual and forecast accuracy.",
    },
  ],
  closingCta: {
    headline: "Want your S&OP meeting spent on decisions?",
    subtext:
      "Tell us how your monthly cycle runs today and where the time goes. We will suggest what to automate first.",
  },
};
