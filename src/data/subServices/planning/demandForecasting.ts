import { TrendingUp } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const demandForecastingSoftware: SubService = {
  slug: "demand-forecasting-software",
  name: "Demand Forecasting Software",
  shortDescription:
    "Forecasting tools built on your own sales history, promotions and ERP data, with accuracy tracking planners can actually trust.",
  tags: ["demand forecasting software", "forecast accuracy", "demand planning"],
  icon: TrendingUp,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)",

  seoTitle: "Demand Forecasting Software Development",
  metaDescription:
    "Custom demand forecasting software built on your sales history, promotions and ERP data, with accuracy tracking planners can trust. For US, UK and European teams.",
  h1: "Custom Demand Forecasting Software",
  primaryKeyword: "demand forecasting software",
  secondaryKeywords: [
    "custom demand forecasting software",
    "demand planning software development",
    "forecast accuracy tracking",
    "statistical forecasting software",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Most forecasting problems are not model problems. They are a mix of messy history, promotions nobody tagged, stockouts recorded as zero demand, and a spreadsheet that only one person understands. We design and build demand forecasting software that starts from those realities: your order history, your product hierarchy and the way your planners actually work.",

  whatIsQuestion: "What is demand forecasting software?",
  whatIsAnswer:
    "Demand forecasting software estimates how much of each product customers will buy over future periods, using past sales, seasonality, promotions and other signals. It presents those estimates in a form planners can review and override, and it measures its own accuracy against actual sales so the forecast can be improved over time.",

  sections: [
    {
      heading: "Why spreadsheet and ERP-default forecasts fall short",
      paragraphs: [
        "A forecast is only as good as the history it learns from, and sales history is rarely a clean record of demand. It is a record of what you managed to sell, which is not the same thing. The gaps show up in familiar ways:",
      ],
      bullets: [
        {
          title: "Stockouts look like low demand",
          text: "When a product is out of stock, recorded sales drop to zero. A model that treats that as real demand learns to under-forecast exactly the items you ran short of.",
        },
        {
          title: "Promotions and price changes are untagged",
          text: "Without a record of when a promotion ran, a one-off spike looks like a trend and the following dip looks like a decline.",
        },
        {
          title: "Product hierarchies keep changing",
          text: "Renamed SKUs, merged variants and re-coded categories break the continuity a forecast needs.",
        },
        {
          title: "Overrides leave no trail",
          text: "Planners adjust numbers in a spreadsheet for good reasons, but without a record of who changed what and why, nobody can tell whether the overrides help or hurt.",
        },
      ],
    },
    {
      heading: "How custom demand forecasting software works",
      paragraphs: [
        "The details depend on your business, but a well-built forecasting system usually moves through the same four stages.",
      ],
      subsections: [
        {
          heading: "1. Bringing the data together",
          paragraphs: [
            "Order lines, returns, e-commerce platform data, point-of-sale exports and the promotion calendar are loaded into one consistent structure. Stockout periods are flagged so they can be treated as constrained demand rather than real demand, and obvious outliers are surfaced for a human decision instead of silently deleted.",
          ],
        },
        {
          heading: "2. Producing a statistical baseline",
          paragraphs: [
            "The baseline captures level, trend and seasonality for each product at the level where the data is stable enough to support it. For items with sparse or intermittent demand, methods designed for that pattern are used rather than forcing everything through one model. Forecasts can then be rolled up and down the hierarchy, from SKU to product family to category.",
          ],
        },
        {
          heading: "3. Adding judgement through a controlled workflow",
          paragraphs: [
            "Sales and marketing know things history does not: a new retail listing, a planned campaign, a lost account. The software lets them adjust the baseline, and it records each adjustment with an owner, a date and a reason, so the effect of judgement can be reviewed later.",
          ],
        },
        {
          heading: "4. Measuring accuracy honestly",
          paragraphs: [
            "Forecasts are compared with actual demand at the same horizon, using the version that existed at the planning cutoff rather than one revised after the fact. Typical measures include WAPE (total absolute error divided by total actual demand, which weights high-volume items appropriately), forecast bias (whether you are consistently over or under forecasting) and mean absolute error in units. MAPE is often avoided for low-volume items because a single small miss can produce a huge percentage and the measure is undefined when actual demand is zero.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "Picture a regional distributor selling several thousand products to trade customers. Its ERP produces a reorder suggestion from a moving average, and the buyers adjust it in spreadsheets. A forecasting tool built for this business would clean the history for stockouts, forecast the fast-moving lines statistically, treat the slow, lumpy lines separately, and give buyers a screen showing the baseline, their own adjustment and the recent accuracy for that product family. This is an illustration of the approach, not a description of a client project.",
      ],
    },
  ],

  capabilitiesHeading: "What a demand forecasting build can include",
  capabilities: [
    "Statistical baseline forecasts by SKU, location and sales channel",
    "Stockout-adjusted history and an outlier review queue",
    "Promotion, price and event flags that inform the forecast",
    "Forecast roll-ups across product family and category",
    "New-product forecasts based on comparable existing items",
    "Planner overrides with owner, reason and date",
    "Accuracy dashboards covering WAPE, bias and unit error",
  ],

  benefitsHeading: "Why teams build their own forecasting tool",
  benefits: [
    {
      title: "Forecasts planners can explain",
      description:
        "Each number can be traced to its baseline, its adjustments and its history, which makes it easier to trust and to challenge.",
    },
    {
      title: "Built around your data, not a template",
      description:
        "Your hierarchy, your calendars and your channel definitions are modelled directly instead of being squeezed into a generic schema.",
    },
    {
      title: "Visible accuracy",
      description:
        "Accuracy and bias are tracked at the horizon you plan at, so you can see whether the forecast is improving and where it is not.",
    },
    {
      title: "Less manual rework",
      description:
        "Data preparation and roll-ups that used to live in spreadsheets are automated, leaving planners time for the exceptions.",
    },
  ],

  useCasesHeading: "Who uses demand forecasting software",
  useCases: [
    "Wholesale distributors forecasting thousands of SKUs against trade customer demand",
    "Retailers and e-commerce businesses planning across stores and online channels",
    "Manufacturers who need a demand plan to drive production and purchasing",
    "Consumer goods brands whose sales swing with promotions and seasons",
    "Spare-parts businesses with slow, intermittent demand",
    "Subscription and replenishment businesses forecasting repeat orders",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Data and definitions review",
      description:
        "We inspect your sales history, product hierarchy and promotion records, and agree what counts as demand before any modelling starts.",
    },
    {
      title: "Baseline and backtest",
      description:
        "We build the first forecasts and test them against history, comparing the results with your current method at the same horizon.",
    },
    {
      title: "Planner workflow",
      description:
        "We build the screens, overrides and accuracy views with your planners, so the tool fits the way decisions are made.",
    },
    {
      title: "Launch and tuning",
      description:
        "We roll out category by category, monitor accuracy against reality and adjust the models as the data teaches us more.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "Forecasts create value only when they reach the systems that act on them. In most businesses the ERP stays the system of record for orders and stock, and the forecasting tool reads from it on a schedule and sends its output back. Whether that exchange runs nightly or closer to real time depends on how often your planners actually revisit the numbers.",
        "The technology choices follow from your environment rather than the other way round. Statistical modelling is commonly done in Python, with a web interface for planners and a relational database underneath, but we would confirm the stack against your hosting, security and team constraints. Where the forecast has to flow into an existing ERP, our [ERP integration services](/services/software-development/erp-integration-services) cover that connection, and the finished forecast usually becomes the input to [inventory optimization](/services/software-development/inventory-optimization-software) and [replenishment planning](/services/software-development/replenishment-planning-software).",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "No forecast removes uncertainty",
          text: "Good software narrows the error and makes it visible. It cannot predict a supplier failure or a competitor's price cut.",
        },
        {
          title: "New products start with little evidence",
          text: "Forecasts by analogy are an informed estimate, and they should be reviewed closely until real sales arrive.",
        },
        {
          title: "Intermittent demand is hard",
          text: "Items that sell a few units a quarter cannot be forecast precisely. The goal is a sensible stocking decision, not a precise number.",
        },
        {
          title: "Data quality sets the ceiling",
          text: "If order history is incomplete or hierarchies are inconsistent, cleaning that up is part of the project and sometimes the largest part.",
        },
        {
          title: "Adoption matters as much as accuracy",
          text: "Planners who do not trust or understand a forecast override it, which can erase any accuracy gain. This is why explanations and override tracking are built in.",
        },
      ],
    },
    {
      heading: "How to evaluate whether a custom build makes sense",
      paragraphs: [
        "A packaged forecasting product may well be the right answer if your data and processes are fairly standard, and we would say so. Custom development tends to make sense when your hierarchy, channels or planning calendar are unusual, when the forecast has to sit inside a larger system you are building, or when you want to own the logic.",
        "A practical first step is small. Export two to three years of sales history by product, date and location, list the promotions and price changes you remember, and write down the decision the forecast is meant to support, such as monthly purchasing or weekly store replenishment. With that, we can run a backtest on one product category and compare it with how you forecast today before anyone commits to a larger build. [Get in touch](/contact) with those three items and we will tell you what we see.",
      ],
    },
  ],

  faqHeading: "Demand forecasting software questions",
  faqs: [
    {
      question: "How much sales history do we need?",
      answer:
        "Two to three years is a comfortable starting point because it lets a model see at least two seasonal cycles. Shorter history still supports a baseline, but seasonal patterns cannot be estimated reliably from a single year.",
    },
    {
      question: "How is forecast accuracy measured?",
      answer:
        "Common measures are WAPE, bias and mean absolute error. WAPE divides total absolute error by total actual demand, bias shows whether forecasts lean high or low, and mean absolute error expresses the miss in units. Each is calculated at the horizon you actually plan at.",
    },
    {
      question: "Why not just use MAPE?",
      answer:
        "MAPE averages percentage errors item by item, so low-volume products can dominate the result, and it is undefined when actual demand is zero. WAPE or unit-based measures usually give a clearer picture for mixed catalogues.",
    },
    {
      question: "Does demand forecasting need machine learning?",
      answer:
        "Not always. Well-chosen statistical methods are often enough, and they are easier to explain. Machine learning can help when you have rich data such as promotions and prices, and our AI-powered business planning page covers where it fits.",
    },
    {
      question: "Can it work with our ERP or e-commerce platform?",
      answer:
        "Usually yes. The forecasting tool can read orders and stock from your ERP or storefront and return its output through the interfaces they provide. We confirm what is available during discovery.",
    },
    {
      question: "Is this a ready-made product?",
      answer:
        "No. It is custom software built to your requirements. We do not present it as an off-the-shelf product or as a service we have already delivered for a named client.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which demand forecasting software is one planning application.",
  },
  relatedLinks: [
    {
      label: "Inventory Optimization Software",
      href: "/services/software-development/inventory-optimization-software",
      description: "Turn the forecast into safety stock and reorder policy.",
    },
    {
      label: "Sales & Operations Planning Software",
      href: "/services/software-development/sales-operations-planning-software",
      description: "Bring the forecast into a shared monthly demand and supply review.",
    },
    {
      label: "ERP Integration Services",
      href: "/services/software-development/erp-integration-services",
      description: "Connect forecasts to the ERP that holds your orders and stock.",
    },
  ],
  closingCta: {
    headline: "Want to see how your data would forecast?",
    subtext:
      "Tell us about your products, channels and planning cycle. We will suggest a sensible first pilot and an honest view of whether a custom build fits.",
  },
};
