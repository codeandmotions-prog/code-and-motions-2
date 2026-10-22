import { PackageCheck } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const replenishmentPlanningSoftware: SubService = {
  slug: "replenishment-planning-software",
  name: "Replenishment Planning Software",
  shortDescription:
    "Daily purchase and transfer recommendations that respect supplier minimums, lead times and what is already on order.",
  tags: ["replenishment planning software", "purchase order recommendations", "reorder automation"],
  icon: PackageCheck,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",

  seoTitle: "Replenishment Planning Software Development",
  metaDescription:
    "Custom replenishment planning software that recommends what to order or transfer and when, respecting supplier minimums, lead times and open orders.",
  h1: "Replenishment Planning Software Development",
  primaryKeyword: "replenishment planning software",
  secondaryKeywords: [
    "automated replenishment software",
    "purchase order recommendation software",
    "min max replenishment",
    "reorder planning system",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "Setting the right stock targets is one job. Turning them into the correct purchase order on the correct day, for the correct supplier, is another, and it is the one a buyer faces every morning. We build replenishment planning software that handles that daily arithmetic, applies your supplier rules and leaves buyers to deal with the exceptions that need a human.",

  whatIsQuestion: "What is replenishment planning software?",
  whatIsAnswer:
    "Replenishment planning software decides when to reorder each item and how much to order or transfer. It compares stock on hand and on order with expected demand and a stock policy, adjusts the result for supplier minimums and order multiples, and proposes purchase orders or transfers for approval, flagging cases that need attention.",

  sections: [
    {
      heading: "Where daily ordering goes wrong",
      paragraphs: [
        "Replenishment looks routine until you count the factors involved. It tends to fail in quiet, predictable ways.",
      ],
      bullets: [
        {
          title: "Ordering depends on one person's memory",
          text: "An experienced buyer knows which suppliers are slow and which items spike in spring. When that person is away, or leaves, the knowledge goes with them.",
        },
        {
          title: "Suggestions ignore supplier constraints",
          text: "A system that recommends 37 units when the supplier sells in cartons of 50 creates work, and then guesses about the rounding.",
        },
        {
          title: "On-order and committed stock are overlooked",
          text: "Ordering against stock on hand alone double-buys items that are already on the way, or under-buys items promised to customers.",
        },
        {
          title: "Inaccurate stock records mislead",
          text: "When the system says stock exists that is not on the shelf, the reorder point is never reached and the item simply runs out.",
        },
        {
          title: "Overreaction to a single spike",
          text: "A temporary jump in demand triggers a large order, and weeks later the stock is still sitting there.",
        },
      ],
    },
    {
      heading: "How replenishment planning software works",
      subsections: [
        {
          heading: "Netting the stock position",
          paragraphs: [
            "For each item and location the software works out the real position: stock on hand, plus stock on order, minus stock already committed to customers or transfers. Everything else builds on that number.",
          ],
        },
        {
          heading: "Applying the stock policy",
          paragraphs: [
            "Depending on the item, the policy may be a reorder point, a min and max band or a periodic order-up-to level. In the periodic case, the target is expected demand over the lead time and review period plus safety stock, and the order is the gap between that target and the current position. The targets themselves can come from [inventory optimization software](/services/software-development/inventory-optimization-software).",
          ],
        },
        {
          heading: "Respecting supplier realities",
          paragraphs: [
            "Order quantities are rounded to minimums and multiples, grouped where a supplier requires a combined order value or a full container, and timed against the supplier's delivery days and quoted lead time.",
          ],
        },
        {
          heading: "Recommending, then approving",
          paragraphs: [
            "The output is a set of proposed purchase orders and transfers, with the reasoning shown. Buyers review, adjust and approve them, and approved orders are released to the ERP through an integration, rather than being retyped.",
          ],
        },
        {
          heading: "Surfacing exceptions",
          paragraphs: [
            "Instead of reading a thousand lines, buyers see the items that need judgement: a projected stockout before the next delivery, a purchase order that is late, a stock record that looks implausible, or demand that has shifted sharply.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "A buyer is responsible for around twelve hundred products across forty suppliers. Each morning, a replenishment tool would produce draft orders grouped by supplier, already rounded to cartons, with the few risky items listed first. The buyer would approve most of them in minutes and spend the rest of the morning on the supplier who is running late. This is an illustration of the intended workflow and not a record of a delivered project.",
      ],
    },
  ],

  capabilitiesHeading: "What a replenishment build can include",
  capabilities: [
    "Netting of on-hand, on-order and committed stock by item and location",
    "Reorder point, min and max, and periodic order-up-to policies",
    "Minimum order quantity, order multiple and container-fill handling",
    "Supplier calendars, lead times and combined-order thresholds",
    "Inter-location transfer recommendations",
    "Exception alerts for stockouts, late orders and unusual stock records",
    "Approval workflow with release of orders to the ERP",
    "A log of overrides, with the reason recorded",
  ],

  benefitsHeading: "What dependable replenishment gives you",
  benefits: [
    {
      title: "Orders the supplier will accept",
      description: "Quantities already reflect minimums, multiples and delivery calendars, so less time goes on corrections.",
    },
    {
      title: "Knowledge that does not leave with a person",
      description: "Supplier rules and policies live in the system, not in one buyer's head.",
    },
    {
      title: "Buyers spend time on exceptions",
      description: "Routine orders flow through quickly and the risky items are put in front of a human.",
    },
    {
      title: "Fewer duplicate and missed orders",
      description: "Working from the full stock position avoids buying what is already on its way.",
    },
  ],

  useCasesHeading: "Where replenishment planning is used",
  useCases: [
    "Wholesale distributors ordering from many suppliers with minimums and multiples",
    "Retail chains replenishing stores from distribution centres",
    "E-commerce businesses reordering from overseas suppliers with long lead times",
    "Manufacturers purchasing raw materials and packaging",
    "Businesses that currently reorder from ERP suggestions edited in spreadsheets",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Understand your ordering rules",
      description: "We record how items are ordered today: policies, supplier terms, calendars and the exceptions your buyers handle.",
    },
    {
      title: "Model positions and policies",
      description: "We build the stock-position calculation and the policies per item group, and check them against past orders.",
    },
    {
      title: "Build the buyer workflow",
      description: "We build proposal screens, exception lists and approval steps with the buyers who will use them.",
    },
    {
      title: "Connect and pilot",
      description: "We integrate with your ERP and run a pilot with one supplier group or location before extending.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "Replenishment sits on live operational data, so the integration is the heart of the build. The software needs reliable reads of stock, open purchase orders and supplier terms, and it needs a safe way to write approved orders back. Systems offer different routes, from APIs to file exchange, and handling duplicates and failed messages properly matters here, because a retry must never create a second purchase order. Our [ERP integration services](/services/software-development/erp-integration-services) cover those concerns.",
        "The quality of the recommendation also depends on the demand estimate behind it, which is where [demand forecasting software](/services/software-development/demand-forecasting-software) fits. For multi-store and multi-channel operations, see how these decisions combine in [retail and wholesale planning software](/services/software-development/retail-wholesale-planning-software).",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Records have to be trustworthy",
          text: "If stock accuracy is poor, replenishment will react to figures that are wrong. Cycle counting and record accuracy work often runs alongside this project.",
        },
        {
          title: "Supplier minimums can force excess",
          text: "A required carton or container size may push you to buy more than you need. The software makes that cost visible but cannot remove it.",
        },
        {
          title: "Classic order-quantity formulas assume stable demand",
          text: "Economic order quantity calculations rest on simplifying assumptions, and they are a guide for batch sizing, not a rule.",
        },
        {
          title: "Automation needs limits",
          text: "Automatically releasing orders is possible for low-risk, rule-bound items, but we would start with recommendations and approval.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Begin with a single supplier group or one location. Collect your current stock, open orders, supplier terms and a few months of order history, and note where buyers currently override the system. A pilot can compare the proposed orders with what your buyers actually placed, and show where the differences lie.",
        "Because supplier terms and ERP interfaces are specific to you, we would scope the integration before committing to a full build. [Contact us](/contact) with a description of your ordering process and we will suggest a realistic pilot.",
      ],
    },
  ],

  faqHeading: "Replenishment planning software questions",
  faqs: [
    {
      question: "How is replenishment different from inventory optimization?",
      answer:
        "Inventory optimization decides how much stock each item should hold, through safety stock and reorder points. Replenishment uses those targets each day or week to decide what to order or transfer right now, applying supplier constraints.",
    },
    {
      question: "What is the difference between reorder point, min-max and periodic review?",
      answer:
        "A reorder point triggers an order when the stock position falls to a set level. Min-max orders up to the maximum when stock falls to the minimum. Periodic review checks at fixed intervals and orders up to a target level. Different items suit different policies.",
    },
    {
      question: "Can it place orders without anyone approving them?",
      answer:
        "It can, for rule-bound, low-risk items, but we usually begin with recommendations that a buyer approves, and automate only where the results have earned that trust.",
    },
    {
      question: "How does it handle minimum order quantities?",
      answer:
        "Proposed quantities are rounded to supplier minimums and multiples, and orders can be grouped to meet a combined value or a full container, with the extra stock this causes shown clearly.",
    },
    {
      question: "Will it connect to our ERP?",
      answer:
        "That is the normal design. It reads stock and open orders from the ERP and releases approved purchase orders back, subject to the interfaces your system provides.",
    },
    {
      question: "Is this a packaged product?",
      answer:
        "No. It is custom software designed around your suppliers and policies, and we do not claim to have delivered it for a named client.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which replenishment planning is one operational application.",
  },
  relatedLinks: [
    {
      label: "Inventory Optimization Software",
      href: "/services/software-development/inventory-optimization-software",
      description: "Set the stock targets that replenishment works to.",
    },
    {
      label: "Retail & Wholesale Planning Software",
      href: "/services/software-development/retail-wholesale-planning-software",
      description: "Coordinate replenishment across stores, branches and channels.",
    },
    {
      label: "ERP Integration Services",
      href: "/services/software-development/erp-integration-services",
      description: "Connect proposals and approved orders to your ERP.",
    },
  ],
  closingCta: {
    headline: "Want daily ordering to run on your own rules?",
    subtext:
      "Describe your suppliers, policies and ordering routine. We will suggest a pilot that compares proposed orders with what your buyers place today.",
  },
};
