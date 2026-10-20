import { BrainCircuit } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const aiBusinessPlanningSoftware: SubService = {
  slug: "ai-business-planning-software",
  name: "AI-Powered Business Planning",
  shortDescription:
    "Planning software that adds machine learning, plain-language explanations and a data-grounded assistant, with a person approving every decision.",
  tags: ["AI business planning", "AI-assisted planning", "scenario planning"],
  icon: BrainCircuit,
  gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",

  seoTitle: "AI-Powered Business Planning Software",
  metaDescription:
    "AI-assisted business planning software: machine-learning forecasts, explained recommendations and a data-grounded assistant with human approval. Custom built for your data.",
  h1: "AI-Powered Business Planning Software",
  primaryKeyword: "AI business planning software",
  secondaryKeywords: [
    "AI-assisted planning software",
    "AI scenario planning",
    "machine learning planning tools",
    "AI planning assistant for operations",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Adding AI to planning is easy to promise and hard to do well. The useful version is modest: models that find patterns planners cannot see across hundreds of drivers, explanations a person can read, and an assistant that answers questions from your own numbers instead of inventing them. We build AI-assisted planning software where each of those pieces earns its place and a human still makes the call.",

  whatIsQuestion: "What is AI-powered business planning?",
  whatIsAnswer:
    "AI-powered business planning uses machine learning and language models inside the planning process: to forecast demand from many signals, to rank which exceptions matter, to explain why a number changed, and to let planners ask questions of their data in plain language. It supports human decisions rather than replacing them, and it works only as well as the data behind it.",

  sections: [
    {
      heading: "What AI does well in planning, and where it does not help",
      paragraphs: [
        "The honest starting point is that many planning problems do not need machine learning. A well-chosen statistical method is often as accurate and far easier to explain. AI becomes worthwhile in a few specific places:",
      ],
      bullets: [
        {
          title: "Many drivers at once",
          text: "Promotions, prices, weather, events and channel mix can all influence demand. Machine learning models can weigh many of these together where a simple trend-and-season model cannot.",
        },
        {
          title: "Items with no history",
          text: "New products and new locations can borrow from comparable items or from the wider category, which gives a more defensible starting point than a guess.",
        },
        {
          title: "Prioritising attention",
          text: "Ranking thousands of exceptions by likely impact helps planners start with the ones that matter.",
        },
        {
          title: "Explaining and summarising",
          text: "Language models can turn a change in a forecast or a month of plan movements into a readable summary for a review meeting.",
        },
      ],
    },
    {
      heading: "How AI fits into a planning workflow",
      subsections: [
        {
          heading: "A predictive layer, compared against a baseline",
          paragraphs: [
            "Machine-learning forecasts run alongside a simple statistical baseline, and accuracy is measured for both at the same horizon. If the model does not beat the baseline for a group of products, the baseline stays. This keeps the extra complexity honest.",
          ],
        },
        {
          heading: "An explanation layer",
          paragraphs: [
            "Planners often override forecasts they do not understand, and those overrides can cancel out the accuracy a model delivers. Each forecast therefore comes with the main factors that moved it, shown in plain terms, so that trust is earned rather than requested.",
          ],
        },
        {
          heading: "A data-grounded assistant",
          paragraphs: [
            "A planner can ask, in ordinary language, which products are likely to run short in the next three weeks and why. The assistant answers by querying your actual planning data, shows the figures and their source, and is read-only by default. It is designed to say it does not know rather than produce a plausible-sounding number.",
          ],
        },
        {
          heading: "Human approval and a record of decisions",
          paragraphs: [
            "Recommendations are proposals. Anything that changes an order, a parameter or a plan needs a person to approve it, and the change is logged with who approved it and when. Low-risk, rule-bound actions can later be automated, but that is a decision to make deliberately.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "A planning manager asks the assistant for the twenty products most likely to stock out within three weeks. It runs the query against the planning database, lists the items with current stock, projected demand and the main drivers, and flags two where a supplier delay is the cause rather than demand. The manager reviews the list and approves purchase actions through the normal workflow. This illustrates the intended behaviour and is not a description of a delivered system.",
      ],
    },
  ],

  capabilitiesHeading: "What an AI-assisted planning build can include",
  capabilities: [
    "Machine-learning forecasts shown beside a statistical baseline",
    "Plain-language explanations of the factors behind each forecast",
    "Exception ranking by likely business impact",
    "Similar-item matching for new products and locations",
    "A read-only, data-grounded assistant for planning questions",
    "Draft summaries for review meetings, subject to human edit",
    "Model monitoring and scheduled retraining",
    "Approval workflow and audit log for every change",
  ],

  benefitsHeading: "What a careful AI approach gives you",
  benefits: [
    {
      title: "AI only where it proves itself",
      description: "Because models are compared with a baseline, you keep the complexity only where it improves results.",
    },
    {
      title: "Recommendations you can interrogate",
      description: "Drivers and sources are visible, so a planner can challenge a number instead of simply accepting or ignoring it.",
    },
    {
      title: "Faster routine analysis",
      description: "Questions that once needed an analyst and a spreadsheet can be answered in seconds, with the figures available to check.",
    },
    {
      title: "Control stays with your team",
      description: "Nothing changes in your systems without approval, and every change is recorded.",
    },
  ],

  useCasesHeading: "Where AI-assisted planning fits",
  useCases: [
    "Businesses with rich data such as promotions, prices and multiple channels",
    "Retailers and brands launching products frequently and needing a defensible starting forecast",
    "Planning teams overwhelmed by exception volume",
    "Companies that want faster answers from their planning data without an analyst for every question",
    "Teams already forecasting statistically that want to test whether machine learning adds accuracy",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Baseline and data readiness",
      description: "We measure how you plan today and check whether your data is strong enough to support machine learning at all.",
    },
    {
      title: "Targeted pilot",
      description: "We apply AI to one product group or decision and compare it with the baseline on held-back data.",
    },
    {
      title: "Guardrails and approvals",
      description: "We design permissions, grounding rules, logging and review steps before any assistant touches live data.",
    },
    {
      title: "Monitor and retrain",
      description: "We track model accuracy over time and retrain on a schedule, because demand patterns drift.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "Forecasts create value only when they flow into the systems that act on them, so integration with your ERP and planning data matters as much as the model. Our [ERP integration services](/services/software-development/erp-integration-services) cover that route, and the forecasting itself builds on the approach described under [demand forecasting software](/services/software-development/demand-forecasting-software).",
        "For language-model features we design for grounding and control: the assistant retrieves from your own data through defined queries, permissions follow your user roles, and outputs are logged. Where your data may be sent to an external model provider, and whether a model should instead run in your own environment, is a decision we make with you, taking account of your data protection obligations such as GDPR for European and UK data. Our broader [AI software development](/services/ai-development/ai-software-development) service covers AI features in other kinds of products.",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Data quality limits accuracy",
          text: "Untagged promotions, stockouts recorded as zero sales and shifting product hierarchies teach a model the wrong lessons. Cleaning them is often the biggest part of the work.",
        },
        {
          title: "New products remain uncertain",
          text: "Similarity-based forecasts are a better starting point than guessing, but they are still estimates and need review.",
        },
        {
          title: "Language models can be wrong",
          text: "Grounding, source display and read-only access reduce the risk, but they do not remove it. Important decisions should be verified against the underlying figures.",
        },
        {
          title: "Models drift",
          text: "Demand patterns change, so a model that was accurate last year needs monitoring and retraining.",
        },
        {
          title: "Return on investment needs a baseline",
          text: "Without a measured starting point, it is difficult to say whether the AI added anything. We establish that baseline first.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Start by asking what decision you want to improve and how you will know it improved. If you already forecast statistically, a pilot that tests machine learning against that baseline on a single product group is a modest, measurable first step. If you do not, we would usually recommend getting a solid statistical forecast in place first.",
        "Bring a sample of your sales and promotion data and a description of where planning takes most time. We will give you a straight view of whether AI is likely to help, and if the answer is no, we will say so. [Book a call](/contact) to talk it through.",
      ],
    },
  ],

  faqHeading: "AI-powered business planning questions",
  faqs: [
    {
      question: "Is AI forecasting more accurate than statistical forecasting?",
      answer:
        "Sometimes, but not always. Machine learning tends to help when there are many informative drivers and plenty of data. For stable, well-behaved products a statistical method can match it. That is why we compare both on your data before choosing.",
    },
    {
      question: "Can an AI assistant invent numbers?",
      answer:
        "Language models can produce wrong answers, which is why our assistants are designed to query your actual data, show the figures and sources, and decline when they cannot answer. Verification of important decisions is still wise.",
    },
    {
      question: "Where does our data go?",
      answer:
        "That depends on the design. Options range from sending limited, controlled data to an external model provider to running models in your own environment. We agree the approach with you according to your data protection requirements.",
    },
    {
      question: "Will the AI make purchasing decisions automatically?",
      answer:
        "By default, no. Recommendations need human approval. Low-risk, rule-bound actions can be automated later if you choose, with limits and logging.",
    },
    {
      question: "What data do we need for machine learning to work?",
      answer:
        "Typically a few years of sales history by product and location, plus records of promotions, prices and stock availability. If those are patchy, improving them comes first.",
    },
    {
      question: "How is this different from your AI software development service?",
      answer:
        "AI software development covers AI features across many kinds of products. This page is specifically about AI inside planning: forecasting, exception handling and planning assistants.",
    },
  ],

  relatedLink: {
    label: "AI Software Development",
    href: "/services/ai-development/ai-software-development",
    description: "Our broader service for building AI features into custom software.",
  },
  relatedLinks: [
    {
      label: "Demand Forecasting Software",
      href: "/services/software-development/demand-forecasting-software",
      description: "The forecasting foundation that AI methods build on.",
    },
    {
      label: "Sales & Operations Planning Software",
      href: "/services/software-development/sales-operations-planning-software",
      description: "Use AI-assisted scenarios and summaries in the monthly planning cycle.",
    },
    {
      label: "Business Analytics & Reporting Software",
      href: "/services/software-development/business-analytics-reporting-software",
      description: "Dashboards and reports that sit alongside AI-assisted planning.",
    },
  ],
  closingCta: {
    headline: "Want an honest view on where AI would help?",
    subtext:
      "Share a sample of your data and your planning pain points. We will tell you where AI is likely to add value and where it is not worth the complexity.",
  },
};
