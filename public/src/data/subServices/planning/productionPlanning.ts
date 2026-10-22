import { Factory } from "lucide-react";
import type { SubService } from "../../subServiceTypes";
import { planningHeroCtas } from "./shared";

export const productionPlanningSoftware: SubService = {
  slug: "production-planning-software",
  name: "Production Planning Software",
  shortDescription:
    "Planning and scheduling tools that link demand to materials and to the machines that actually have capacity, shift by shift.",
  tags: ["production planning software", "finite capacity scheduling", "MRP and scheduling"],
  icon: Factory,
  gradient: "linear-gradient(155deg, #0A0E1A 0%, #1B2440 55%, #384057 100%)",

  seoTitle: "Production Planning & Scheduling Software",
  metaDescription:
    "Custom production planning software that connects demand, materials and finite-capacity scheduling, built around your routings, machines and shifts.",
  h1: "Production Planning Software Development",
  primaryKeyword: "production planning software",
  secondaryKeywords: [
    "production scheduling software",
    "finite capacity scheduling",
    "MRP and scheduling software",
    "manufacturing planning software",
  ],
  heroCtas: planningHeroCtas,
  intro:
    "A production plan that looks fine on paper can still overload the one machine everything has to pass through. We build production planning software that starts from the demand you have to meet, works out the materials you need, and then checks the result against the real capacity of your machines, people and shifts, so the schedule the floor receives is one it can actually run.",

  whatIsQuestion: "What is production planning software?",
  whatIsAnswer:
    "Production planning software decides what to make, in what quantity and when, and checks that the materials and capacity exist to do it. At its simplest it works out material requirements from demand. More advanced scheduling also sequences work on specific machines using shift calendars, changeover times and alternative routings, so planned dates reflect real constraints.",

  sections: [
    {
      heading: "Why production plans fail on the shop floor",
      paragraphs: [
        "Most plans fail not because the arithmetic is wrong but because the assumptions behind it are unrealistic.",
      ],
      bullets: [
        {
          title: "Capacity is treated as unlimited",
          text: "Material requirements planning works backwards from due dates using lead times and does not check whether the machines are free. The plan looks achievable and then queues build up at the bottleneck.",
        },
        {
          title: "Lead times are padded",
          text: "To protect against surprises, planners add buffer to lead times. Every job then waits longer, and work-in-progress grows.",
        },
        {
          title: "Changeovers are invisible",
          text: "Time spent switching a machine between products rarely appears in a simple plan, though it can consume a large share of a shift.",
        },
        {
          title: "Shortages appear at the last moment",
          text: "Without a materials check tied to the schedule, a missing component is discovered when the job is about to start.",
        },
        {
          title: "The schedule lives in someone's head",
          text: "A spreadsheet or whiteboard maintained by one experienced scheduler is a single point of failure.",
        },
      ],
    },
    {
      heading: "How production planning software is layered",
      paragraphs: [
        "Manufacturing planning works at several levels, and it helps to build the software to match them rather than blur them together.",
      ],
      subsections: [
        {
          heading: "From demand to a master production schedule",
          paragraphs: [
            "The demand plan, often agreed through [sales and operations planning](/services/software-development/sales-operations-planning-software), is translated into what each plant or line will produce over the coming weeks, with a rough check that overall capacity is not exceeded.",
          ],
        },
        {
          heading: "Material requirements",
          paragraphs: [
            "The bill of materials is exploded to calculate what components and raw materials are needed and when, producing purchase and production proposals. This is the part ERP systems usually already do, and the software can use it rather than duplicate it.",
          ],
        },
        {
          heading: "Finite-capacity scheduling",
          paragraphs: [
            "This is where the plan meets reality. Operations are assigned to specific machines or work centres in a sequence that respects shift calendars, planned downtime, changeover times between products, tooling, operator skills and alternative routings. Scheduling is a constraint-based problem, not just an extension of material planning.",
          ],
        },
        {
          heading: "Promising dates and re-planning",
          paragraphs: [
            "When a customer asks for a date, the software can check it against capacity instead of copying a lead time. When a machine breaks or material arrives late, planners can re-sequence the affected jobs and see the consequences before committing.",
          ],
        },
        {
          heading: "Feedback from the floor",
          paragraphs: [
            "Actual start times, completions and cycle times flow back, so the schedule adapts and the master data, such as standard times, improves rather than going stale.",
          ],
        },
      ],
    },
    {
      heading: "A hypothetical example",
      paragraphs: [
        "A made-to-order components workshop has three machining centres feeding a single finishing line. Its spreadsheet schedule ignores the finishing bottleneck, so promised dates slip every week. A planning tool would model the finishing line as the constrained resource, sequence work to reduce changeovers, and check any new order date against it before quoting. This describes the intended behaviour and is not a delivered engagement.",
      ],
    },
  ],

  capabilitiesHeading: "What a production planning build can include",
  capabilities: [
    "A master production schedule driven by the agreed demand plan",
    "Bill-of-materials requirement calculations and purchase proposals",
    "Finite-capacity scheduling by machine, work centre and shift calendar",
    "Changeover-aware sequencing and alternative routings",
    "Available-to-promise checks for customer delivery dates",
    "A visual schedule board for planners and supervisors",
    "Feedback of actual times to keep standard data current",
    "What-if rescheduling for breakdowns and shortages",
  ],

  benefitsHeading: "What a realistic schedule gives you",
  benefits: [
    {
      title: "Dates you can keep",
      description: "Promises are checked against real capacity rather than copied from a standard lead time.",
    },
    {
      title: "Bottlenecks made visible",
      description: "Overloaded resources are shown before they cause delays, so you can act on them.",
    },
    {
      title: "Less work-in-progress padding",
      description: "More realistic scheduling reduces the need to buffer every job against uncertainty.",
    },
    {
      title: "Scheduling knowledge captured",
      description: "Rules and constraints are held in the software, so the schedule no longer depends on one person.",
    },
  ],

  useCasesHeading: "Who this is for",
  useCases: [
    "Make-to-order manufacturers with variable routings and tight delivery dates",
    "Plants where a bottleneck machine sets the pace for everything else",
    "Manufacturers with significant changeover time between products",
    "Food and consumer goods producers balancing batch sizes and shelf life",
    "Companies running production schedules in spreadsheets alongside an ERP",
  ],

  processHeading: "How we build it",
  process: [
    {
      title: "Study the floor",
      description: "We map routings, resources, shift patterns, changeovers and how schedules are actually produced today.",
    },
    {
      title: "Fix the master data",
      description: "We check cycle times, routings and calendars against reality, because a schedule is only as good as its inputs.",
    },
    {
      title: "Build in layers",
      description: "We start with material requirements and a schedule board, then add constraints one at a time.",
    },
    {
      title: "Pilot on one area",
      description: "We run the new schedule on one line or cell, compare it with the old method, then extend.",
    },
  ],

  laterSections: [
    {
      heading: "Technology and integration considerations",
      paragraphs: [
        "Production planning needs product structures, routings and work orders from the ERP, and ideally status feedback from the shop floor. The integration with the ERP is often the longest single task, especially where the ERP has been heavily customised, and our [ERP integration services](/services/software-development/erp-integration-services) are aimed at exactly that work.",
        "If you already run a manufacturing execution system, the scheduling tool should exchange data with it, not compete with it. We build scheduling software and integrations, and we do not claim to supply machine-level data capture hardware. Where the wider supply picture matters, this connects with [supply chain planning](/services/software-development/supply-chain-planning-software).",
      ],
    },
    {
      heading: "Limitations to understand before you start",
      bullets: [
        {
          title: "Stale master data undermines everything",
          text: "If routings and cycle times have not been updated in years, the schedule is only nominally constrained. Cleaning them is part of the project.",
        },
        {
          title: "The real bottleneck must be modelled",
          text: "If the actual constrained resource is missed, the schedule behaves like an infinite-capacity plan.",
        },
        {
          title: "More constraints mean slower planning",
          text: "Over-constrained models can become slow to solve and hard to re-plan. Start with the constraints that matter most.",
        },
        {
          title: "Plans that the floor cannot see get ignored",
          text: "If supervisors cannot see the schedule in their normal workflow, they revert to their own methods.",
        },
        {
          title: "A separate scheduling tool is not always needed",
          text: "A stable plant with simple routings may do well with a well-run ERP plan and good execution tracking. We would tell you if that applies to you.",
        },
      ],
    },
    {
      heading: "How to evaluate and get started",
      paragraphs: [
        "Start with one area where schedule misses are costly, for example a bottleneck line. Gather its routings, standard times, shift calendars and a few weeks of actual start and finish data. Comparing that with the plan will show where the gap comes from and whether finite scheduling is the right remedy.",
        "From there we can propose a first release that covers the essential constraints and nothing more, since trying to model every edge case at once is a common reason projects stall. [Talk to us](/contact) about the area you would pilot.",
      ],
    },
  ],

  faqHeading: "Production planning software questions",
  faqs: [
    {
      question: "What is the difference between MRP and finite capacity scheduling?",
      answer:
        "MRP works out what materials are needed and when, assuming resources are available. Finite capacity scheduling sequences operations on specific machines only when capacity exists, using calendars, setups and routings. The two are complementary.",
    },
    {
      question: "Do we need finite scheduling at all?",
      answer:
        "Not always. If your routings are simple and your plant is stable, an ERP plan with good execution tracking may be enough. Scheduling pays off where bottlenecks, changeovers and tight dates cause regular misses.",
    },
    {
      question: "What data does a scheduling tool need?",
      answer:
        "Routings with realistic cycle times, resources and their shift calendars, setup or changeover times, bills of materials and live work orders. The accuracy of these determines the usefulness of the schedule.",
    },
    {
      question: "Can it work with our ERP or MES?",
      answer:
        "Usually yes. It reads orders, structures and status through the interfaces your systems provide and returns schedules to them. We confirm the available interfaces during discovery.",
    },
    {
      question: "Does the software produce an optimal schedule?",
      answer:
        "It produces a feasible, constraint-aware schedule using defined rules, which planners can review and adjust. We do not claim mathematical optimality, because real plants have constraints that are hard to model fully.",
    },
    {
      question: "Is this a packaged scheduling product?",
      answer:
        "No. It is custom software built around your plant, and we do not claim to have delivered it for a named manufacturer.",
    },
  ],

  relatedLink: {
    label: "Software Development",
    href: "/services/software-development",
    description: "Our core engineering service, within which production planning is one industrial application.",
  },
  relatedLinks: [
    {
      label: "Sales & Operations Planning Software",
      href: "/services/software-development/sales-operations-planning-software",
      description: "Agree the demand and capacity plan that production works to.",
    },
    {
      label: "Supply Chain Planning Software",
      href: "/services/software-development/supply-chain-planning-software",
      description: "Coordinate production with purchasing and distribution.",
    },
    {
      label: "ERP Integration Services",
      href: "/services/software-development/erp-integration-services",
      description: "Connect scheduling to your ERP work orders and structures.",
    },
  ],
  closingCta: {
    headline: "Want a schedule your floor can actually run?",
    subtext:
      "Describe your plant, your bottleneck and how schedules are produced today. We will suggest a focused first release.",
  },
};
