import { Boxes } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const inventoryOptimizationSoftware: SubService = {
  slug: "inventory-optimization-software",
  name: "Inventory Optimization Software",
  shortDescription:
    "Software that sets safety stock, reorder points and service-level targets from your real demand and lead-time variability.",
  tags: ["inventory optimization software", "safety stock", "reorder points"],
  icon: Boxes,
  gradient: "linear-gradient(155deg, #142B6B 0%, #0070FE 55%, #22D3EE 100%)",

  seoTitle: "Inventory Optimization Software Development",
  metaDescription:
    "Custom inventory optimization software that calculates safety stock, reorder points and service-level trade-offs from your own demand and lead-time data.",
  h1: "Inventory Optimization Software Development",
  primaryKeyword: "inventory optimization software",
  secondaryKeywords: [
    "safety stock optimization software",
    "reorder point calculation",
    "ABC XYZ inventory analysis",
    "inventory planning software development",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Holding stock is a trade-off between availability and the cash tied up on shelves. Many businesses settle that trade-off with a rule of thumb, such as four weeks of cover for everything, and then wonder why some products are always short while others gather dust. We build inventory optimization software that sets stock targets item by item, from the demand and supplier behaviour you actually observe.",

  whatIsQuestion: "What is inventory optimization software?",
  whatIsAnswer:
    "Inventory optimization software calculates how much stock to hold for each item, and where, to meet a chosen service level at the lowest sensible inventory investment. It does this by measuring demand variability and supplier lead-time variability, then setting safety stock and reorder points that reflect them rather than applying one flat rule to the whole range.",

  sections: [
    {
      heading: "The problem: too much of the wrong stock, too little of the right",
      paragraphs: [
        "Stock problems rarely come from carelessness. They come from parameters that were set once and never revisited, or that were never based on evidence in the first place.",
      ],
      bullets: [
        {
          title: "One rule for every item",
          text: "A flat days-of-cover rule over-protects steady, predictable products and under-protects erratic ones, so the same policy creates both excess and shortage.",
        },
        {
          title: "Stale lead times",
          text: "If the planned lead time in the system is the one agreed with a supplier years ago, reorder points are quietly wrong every time the supplier is slower than promised.",
        },
        {
          title: "Variability is ignored",
          text: "Two products with the same average demand need very different buffers if one sells evenly and the other in bursts.",
        },
        {
          title: "No view across locations",
          text: "A central warehouse and several branches can hold too much in one place and run out in another, because each location is planned in isolation.",
        },
        {
          title: "Excess goes unnoticed",
          text: "Without a clear measure of how many weeks of stock an item really holds, slow-moving lines sit unnoticed until they become write-offs.",
        },
      ],
    },
    {
      heading: "How inventory optimization software works",
      subsections: [
        {
          heading: "Segmenting the range",
          paragraphs: [
            "Items are grouped so that effort goes where it matters. A common approach is ABC classification by sales value combined with XYZ classification by how variable demand is, which separates valuable, steady lines from low-value, erratic ones and lets each group follow its own policy.",
          ],
        },
        {
          heading: "Measuring variability",
          paragraphs: [
            "From order and receipt history, the software estimates how much demand varies from period to period and how much supplier lead times vary around their average. Both matter, because a reliable supplier needs less buffer than an unpredictable one.",
          ],
        },
        {
          heading: "Calculating targets",
          paragraphs: [
            "A widely used safety stock calculation multiplies a service-level factor by the standard deviation of demand during the lead time. When both demand and lead time vary independently, the combined formula is the service factor times the square root of (demand variance times lead time, plus average demand squared times lead-time variance). The reorder point is then average demand over the lead time plus that safety stock. The service factor comes from the target: roughly 1.28 for a 90 percent cycle service level, 1.65 for 95 percent and 2.33 for 99 percent, assuming demand is approximately normally distributed.",
            "Those formulas are a starting point, not an answer in themselves. The software applies them where they are valid and uses other approaches where they are not, such as for slow or intermittent items.",
          ],
        },
        {
          heading: "Showing the trade-off",
          paragraphs: [
            "A higher service target raises the service factor and therefore the safety stock. The software shows what moving a target from 95 to 98 percent would cost in extra inventory, so the decision becomes a business choice made with numbers in front of you rather than a default.",
          ],
        },
        {
          heading: "Keeping parameters fresh",
          paragraphs: [
            "Targets are recalculated on a schedule as demand and lead times change, and meaningful movements are flagged for a planner instead of being applied silently.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "Imagine a parts distributor that holds a flat four weeks of cover on every line. Optimization would likely show that its steady fast movers could be run leaner, that a handful of erratic, long-lead-time items need considerably more protection, and that some slow lines hold far more stock than their demand justifies. This is an illustration of how the method behaves, not a result from a real engagement.",
      ],
    },
  ],

  capabilitiesHeading: "What an inventory optimization build can include",
  capabilities: [
    "ABC and XYZ segmentation of the product range",
    "Demand and lead-time variability estimates per item and location",
    "Safety stock and reorder point calculation against service targets",
    "Service-level versus inventory-investment scenario views",
    "Excess and slow-moving stock identification",
    "Stock balancing views across warehouse and branch locations",
    "Scheduled recalculation with exception flags for planners",
  ],

  benefitsHeading: "What better stock targets give you",
  benefits: [
    {
      title: "Targets with a reason behind them",
      description: "Each safety stock figure traces back to measured variability and a stated service level, so it can be explained and defended.",
    },
    {
      title: "Capital pointed at the right items",
      description: "Protection is concentrated where variability and value justify it, rather than spread evenly over the whole range.",
    },
    {
      title: "Earlier warning on excess",
      description: "Items holding far more stock than demand supports are surfaced before they turn into write-offs.",
    },
    {
      title: "Decisions made with trade-offs visible",
      description: "Leadership can see what a higher service target would cost before approving it.",
    },
  ],

  useCasesHeading: "Where inventory optimization is used",
  useCases: [
    "Wholesale distributors managing large catalogues across several warehouses",
    "Manufacturers holding raw materials and components with variable lead times",
    "E-commerce businesses balancing availability against cash tied up in stock",
    "Retail chains planning stock between distribution centres and stores",
    "Spare-parts and maintenance suppliers with slow, erratic demand",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Parameter and data audit",
      description: "We review how targets are set today and check the quality of stock, receipt and demand data they rely on.",
    },
    {
      title: "Policy design",
      description: "We agree segments, service targets and calculation rules with the people who own availability and cash.",
    },
    {
      title: "Build and back-test",
      description: "We build the calculations and test the recommended levels against past demand before anyone relies on them.",
    },
    {
      title: "Rollout and review",
      description: "We start with one warehouse or category, measure service and stock levels, then extend.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "Optimization needs three kinds of data: stock on hand and on order, a history of demand, and a history of purchase receipts showing both the promised and the actual arrival dates. Most of this lives in the ERP, so reading it reliably, and writing approved parameters back as min and max levels or reorder points, is a core part of the work. Our [ERP integration services](/services/software-development/erp-integration-services) cover that connection.",
        "The calculation logic should be transparent and testable. We write the formulas as documented, unit-tested code so that a planner or auditor can see how any figure was produced. Optimization also depends on a sound demand estimate, which is where [demand forecasting software](/services/software-development/demand-forecasting-software) comes in, and its outputs feed day-to-day ordering through [replenishment planning](/services/software-development/replenishment-planning-software).",
        "If you are looking for point-of-sale or store-level stock handling instead, that sits under [Retail & Shop Software Development](/services/software-development/retail-shop-software-development). This service is about deciding how much stock to hold, not recording each sale.",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "The standard formulas assume roughly normal demand",
          text: "Skewed demand and long-tailed lead times can make them understate the risk, and they handle slow, intermittent items poorly. Other distributions or simulation are used for those.",
        },
        {
          title: "Service level has more than one definition",
          text: "Cycle service level is the chance of no stockout in a replenishment cycle, which is not the same as fill rate. Agree which one you are targeting before calculating anything.",
        },
        {
          title: "Promotions and seasonality distort variability",
          text: "They inflate or mask the standard deviation, so they have to be handled deliberately.",
        },
        {
          title: "Inaccurate stock records undermine everything",
          text: "If the system says you have stock that is not on the shelf, no parameter will fix the resulting shortages.",
        },
        {
          title: "Large buffers can hide supplier problems",
          text: "Optimization should highlight unreliable suppliers so they can be addressed, not simply pad around them.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Begin with a baseline. For one warehouse, gather a stock snapshot, twelve months of demand, and purchase receipts with promised and actual dates. Decide the target you care about, whether that is fill rate on key lines or a maximum investment in stock, and measure where you are today.",
        "From there a pilot on a single category will show whether item-level targets beat your current rule and by how much. We will not promise a particular inventory reduction, because that depends entirely on how your current parameters compare with your real variability. [Talk to us](/contact) about a pilot and we will help define what success would look like before building anything.",
      ],
    },
  ],

  faqHeading: "Inventory optimization software questions",
  faqs: [
    {
      question: "What is safety stock and how is it calculated?",
      answer:
        "Safety stock is the extra inventory held to cover variability in demand and supplier lead times. A common calculation multiplies a service-level factor by the standard deviation of demand over the lead time, and extends it when lead times vary too. The reorder point is average lead-time demand plus safety stock.",
    },
    {
      question: "What is the difference between cycle service level and fill rate?",
      answer:
        "Cycle service level is the probability of avoiding a stockout during a replenishment cycle. Fill rate is the share of demand served directly from stock. They can differ noticeably, so you should decide which one your business actually cares about.",
    },
    {
      question: "How is this different from inventory management software?",
      answer:
        "Inventory management records and moves stock: receipts, picks and counts. Optimization decides how much stock each item should hold and when to reorder. The two work together, and optimization usually reads its data from the management system or ERP.",
    },
    {
      question: "Can it handle several warehouses or branches?",
      answer:
        "Yes. Targets can be calculated per location and compared across them, so imbalances between a central warehouse and branches become visible.",
    },
    {
      question: "Will it reduce our inventory?",
      answer:
        "That depends on your current settings. Some items usually need less stock and others need more. The aim is to match stock to your chosen service level, and we do not promise a specific reduction.",
    },
    {
      question: "What data do we need to begin?",
      answer:
        "Stock levels, a history of demand, and purchase receipts with promised and actual dates are the essentials. Item costs and supplier minimum order quantities make the recommendations more practical.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which inventory optimization is one planning application.",
  },
  relatedLinks: [
    {
      label: "Demand Forecasting Software",
      href: "/services/software-development/demand-forecasting-software",
      description: "Provide the demand estimates that safety stock depends on.",
    },
    {
      label: "Replenishment Planning Software",
      href: "/services/software-development/replenishment-planning-software",
      description: "Convert targets into daily order recommendations.",
    },
    {
      label: "Retail & Wholesale Planning Software",
      href: "/services/software-development/retail-wholesale-planning-software",
      description: "Plan stock across stores, branches and sales channels.",
    },
  ],
  closingCta: {
    headline: "Curious what your stock targets should really be?",
    subtext:
      "Share how you set safety stock today and where it hurts. We will outline a pilot that tests item-level targets against your current rule.",
  },
};
