import { Workflow } from "lucide-react";
import type { AiServiceContent } from "./types";

export const aiWorkflowAutomation: AiServiceContent = {
  slug: "ai-workflow-automation",
  name: "AI Workflow Automation",
  kind: "workflow",
  icon: Workflow,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)",

  cardDescription:
    "Connect your apps and automate repetitive processes, with AI handling the messy parts such as reading documents and sorting requests.",
  cardTags: ["Integrations", "Document AI", "Monitoring"],

  seoTitle: "AI Workflow Automation Services",
  metaDescription:
    "AI workflow automation services for businesses. Connect your tools, automate repetitive processes and use AI for documents, emails and requests, with checks and monitoring.",
  primaryKeyword: "AI workflow automation services",
  secondaryKeywords: [
    "business process automation with AI",
    "automate repetitive business processes",
    "AI document processing",
    "n8n and Make automation",
  ],

  h1: "AI Workflow Automation Services for Repetitive Business Processes",
  intro:
    "A lot of working time goes on moving information between inboxes, spreadsheets and systems. We connect your tools into reliable automated workflows and use AI only where it earns its place: reading documents, sorting incoming requests, extracting data and drafting responses, with checks around every AI step.",

  definition: {
    question: "What is AI workflow automation?",
    answer:
      "AI workflow automation links the apps and steps in a business process so they run without manual hand-offs, and uses AI for the parts that fixed rules cannot handle: reading unstructured text, extracting data from documents, classifying requests and drafting replies. Rule-based automation moves data predictably; AI adds judgement for messy inputs. A good workflow uses each where it fits, validates every AI output and leaves people to deal with the exceptions.",
  },

  howItWorks: {
    heading: "How we approach an automation project",
    intro:
      "The most valuable work happens before any tool is connected: understanding what the process really is.",
    steps: [
      {
        title: "Map the process as it actually runs",
        description:
          "We trace who does what, in which systems, how often, and where exceptions occur. This shows where time is genuinely lost, which is often not where people assume.",
      },
      {
        title: "Separate rules from judgement",
        description:
          "Predictable steps become plain logic. AI is used only where the input is unstructured, such as free-text emails or scanned documents, and its output is constrained to a defined format.",
      },
      {
        title: "Build and connect",
        description:
          "Triggers, integrations, queues and data validation are assembled, using a workflow platform or custom code depending on volume, security and cost. Small, low-volume flows often suit a platform such as n8n or Make; higher volume or stricter data control may call for code.",
      },
      {
        title: "Add checks and exception routes",
        description:
          "Confidence thresholds, approvals, retries and alerts ensure that unusual cases reach a person and failures are visible instead of silent.",
      },
      {
        title: "Monitor and tune",
        description:
          "Dashboards track runs, failures, time saved and cost. As your process or connected apps change, the workflow is adjusted rather than left to decay.",
      },
    ],
  },

  useCases: {
    heading: "Workflows that commonly pay off",
    intro:
      "The strongest candidates are processes that repeat often, follow a recognisable pattern and currently involve a person re-keying or sorting information.",
    items: [
      {
        title: "Invoice and document processing",
        scenario:
          "Invoices, receipts or forms arrive by email. AI extracts the supplier, dates, line items and totals, the workflow validates them against purchase orders and posts approved items to your accounting system.",
        stays: "Finance reviews flagged items and approves payment.",
      },
      {
        title: "Lead routing and enrichment",
        scenario:
          "A form submission is cleaned, checked for duplicates, enriched from sources you allow, scored and assigned to the right rep with a summary in your CRM.",
        stays: "Reps decide how to follow up.",
      },
      {
        title: "Inbox triage",
        scenario:
          "Shared inbox emails are categorised by topic and urgency, tagged in your helpdesk and routed to the right team, with a suggested reply drafted for common cases.",
        stays: "A team member checks and sends the reply.",
      },
      {
        title: "Employee onboarding",
        scenario:
          "When a hire is confirmed, accounts are requested, documents sent, equipment ordered and reminders scheduled across HR, IT and the manager.",
        stays: "People handle every conversation with the new starter.",
      },
      {
        title: "Order exception handling",
        scenario:
          "For an online store, orders with address mismatches, stock issues or fraud signals are flagged, the relevant data gathered in one place and the right person notified.",
        stays: "Staff decide whether to ship, hold or cancel.",
      },
      {
        title: "Recurring reporting",
        scenario:
          "Figures are pulled from several systems each week, combined into a consistent report, with an AI-written summary of notable changes and the numbers it is based on.",
        stays: "An analyst reviews the narrative before it is circulated.",
      },
    ],
  },

  features: [
    {
      title: "Integrations across your stack",
      description:
        "Connections to CRM, accounting, helpdesk, email, spreadsheets, databases and messaging, using native APIs where available.",
    },
    {
      title: "Document and text understanding",
      description:
        "AI extraction and classification that return structured, validated data rather than free-form text.",
    },
    {
      title: "Human-in-the-loop approvals",
      description:
        "Steps that pause for sign-off, with the relevant context presented to the approver.",
    },
    {
      title: "Error handling and alerts",
      description:
        "Retries, fallbacks and notifications so a failed step is noticed and fixed, not lost.",
    },
    {
      title: "Run history and audit trail",
      description:
        "A record of what ran, with which inputs and outcomes, for troubleshooting and accountability.",
    },
    {
      title: "Access and credential control",
      description:
        "Role-based access and secure handling of keys, with the option of self-hosted tooling where data control matters.",
    },
    {
      title: "Platform choice without lock-in bias",
      description:
        "We recommend a no-code platform or custom code based on your volume, budget and security needs, not on habit.",
    },
    {
      title: "Documentation and handover",
      description:
        "Clear descriptions of each workflow so your team can understand, maintain or extend it.",
    },
  ],
  benefits: [
    {
      title: "Fewer manual hand-offs",
      description:
        "Work moves from step to step without someone copying, pasting or forwarding it.",
    },
    {
      title: "Shorter cycle times",
      description:
        "Items are processed as they arrive instead of waiting in an inbox or a queue.",
    },
    {
      title: "Fewer data-entry errors",
      description:
        "Validation catches mismatches that manual re-keying lets through.",
    },
    {
      title: "A consistent process",
      description:
        "The same steps happen in the same order every time, which makes the process easier to improve.",
    },
    {
      title: "Better use of skilled people",
      description:
        "Staff spend more time on exceptions, customers and decisions, and less on routine admin.",
    },
  ],

  whoShouldConsider: {
    heading: "Who should consider AI workflow automation",
    items: [
      "Operations, finance or admin teams repeating the same process daily or weekly.",
      "Businesses processing a steady flow of emails, forms, invoices or documents.",
      "Small and medium-sized companies whose tools do not talk to each other and rely on spreadsheets to bridge the gap.",
      "Growing teams whose manual processes are starting to break under volume.",
      "Organisations with a reasonably stable process and someone who owns it.",
    ],
  },

  notYet: {
    heading: "Who may not need workflow automation yet",
    intro:
      "Automation magnifies whatever process it is given. In these situations, a lighter step is usually wiser.",
    items: [
      {
        title: "The process is unclear or constantly changing",
        description:
          "Automating a process nobody agrees on only makes it fail faster.",
        alternative:
          "Agree and document the process first. Revisit automation when it has been stable for a few cycles. If the work genuinely needs judgement across steps, compare",
        alternativeLink: { label: "AI agent development", href: "/services/ai-development/ai-agent-development" },
      },
      {
        title: "The task happens rarely",
        description:
          "If something is done a few times a month, building and maintaining a workflow may cost more than doing it by hand.",
        alternative:
          "Keep it manual, with a checklist or template.",
      },
      {
        title: "Your existing tools already do it",
        description:
          "Many platforms include automation: HubSpot workflows, Shopify Flow, Google Workspace and Microsoft 365 rules, among others.",
        alternative:
          "Use the built-in feature first. Bring in custom work when it hits a clear limit.",
      },
      {
        title: "You need to connect only two apps",
        description:
          "A simple trigger-and-action link between two popular apps rarely needs a bespoke build.",
        alternative:
          "A ready-made recipe on a standard automation platform, which you or a team member can set up directly.",
      },
      {
        title: "The real problem is a poorly set-up system",
        description:
          "If your CRM or helpdesk is configured badly, automation on top of it entrenches the problem.",
        alternative:
          "Fix the configuration and data quality in the system first.",
      },
    ],
  },

  challenges: [
    {
      challenge: "People copy and paste between systems all day",
      approach:
        "Integrations pass data directly between tools, with validation to catch errors on the way.",
    },
    {
      challenge: "Critical work lives in a shared inbox",
      approach:
        "Incoming messages are classified, tagged and routed automatically, so nothing waits for someone to notice it.",
    },
    {
      challenge: "Data-entry mistakes cause downstream problems",
      approach:
        "Extraction and validation rules flag anything that does not add up before it reaches your records.",
    },
    {
      challenge: "Hand-offs between teams stall",
      approach:
        "Each step triggers the next and notifies the owner, with reminders if something is not acted on.",
    },
    {
      challenge: "No one can see where the bottleneck is",
      approach:
        "Run data shows how long each stage takes and where cases pile up.",
    },
    {
      challenge: "Key processes depend on one person's spreadsheet",
      approach:
        "The logic is moved into a documented, monitored workflow that does not depend on a single individual.",
    },
  ],

  considerations: [
    {
      title: "Process before technology",
      description:
        "Time spent understanding and simplifying the process usually delivers more than the automation itself. We treat that as part of the project.",
    },
    {
      title: "Plan for exceptions",
      description:
        "Real data is messy. Decide early what happens to the cases the workflow cannot handle, who sees them and how quickly.",
    },
    {
      title: "AI extraction accuracy varies",
      description:
        "Results depend on document quality, layout variety and language. We test on your real samples and set thresholds for when a human checks the output.",
    },
    {
      title: "API limits and access",
      description:
        "Some systems restrict API access, rate-limit requests or charge for it. We check what is possible and what it costs before committing to a design.",
    },
    {
      title: "Security and data handling",
      description:
        "Workflows touch credentials and often personal or financial data. We apply least-privilege access and discuss where data is processed, including self-hosted options and the data-protection rules that apply to you, such as GDPR, UK GDPR or India's Digital Personal Data Protection Act.",
    },
    {
      title: "Platform costs and maintenance",
      description:
        "Many platforms charge per task or per run, so volume affects cost. Connected apps also change their APIs, so workflows need periodic maintenance.",
    },
  ],
  limitations: [
    "Automation handles the common path well. Unusual cases still need people, and the workflow should make that easy.",
    "AI steps are probabilistic, so they are paired with validation and, where the stakes justify it, human review.",
    "Savings depend on volume. Low-volume processes may not repay the effort of automating them.",
  ],

  faqs: [
    {
      question: "How is AI workflow automation different from Zapier-style automation or RPA?",
      answer:
        "Rule-based tools move data between apps by fixed rules, and robotic process automation mimics clicks in a screen. AI workflow automation adds a layer that can interpret unstructured input such as emails and documents. In practice we combine them: rules and integrations for the predictable steps, AI where interpretation is needed.",
    },
    {
      question: "Do we need AI at all for our workflow?",
      answer:
        "Not always. If your inputs are structured and your rules are clear, plain automation is cheaper and more predictable. We will tell you if AI would add cost without adding value.",
    },
    {
      question: "Which tools and platforms do you use?",
      answer:
        "We work with workflow platforms such as n8n and Make where they fit, and with custom code where volume, reliability or data control demand it. The choice depends on your requirements and budget, and we explain the trade-offs.",
    },
    {
      question: "How long does it take to automate a process?",
      answer:
        "A single, well-understood workflow can often be built and tested within a few weeks. Processes with many systems, approvals or exceptions take longer. We give a timeline after mapping the process.",
    },
    {
      question: "What happens if a workflow breaks?",
      answer:
        "We build in alerts, retries and a place for failed items to wait, so problems are visible and nothing is silently dropped. After launch, support options cover fixes when connected apps change.",
    },
    {
      question: "Can our team keep using the tools they already know?",
      answer:
        "Yes. Workflows are designed to fit around your existing tools, so staff keep working where they do now and the automation operates in the background.",
    },
    {
      question: "How do we measure the return?",
      answer:
        "We record a baseline first, such as minutes per task, volume, error rate and turnaround. After launch we compare against it and include running costs, so you can see the net benefit.",
    },
  ],
  related: [
    {
      label: "AI agent development",
      href: "/services/ai-development/ai-agent-development",
      description: "When a process needs judgement across several steps, not just fixed rules.",
    },
    {
      label: "AI chatbots and customer support",
      href: "/services/ai-development/ai-chatbot-development",
      description: "To automate first-line answers on your site and messaging channels.",
    },
    {
      label: "AI software development",
      href: "/services/ai-development/ai-software-development",
      description: "For larger internal tools built around an AI-driven process.",
    },
    {
      label: "Custom software development",
      href: "/services/software-development",
      description: "When the real fix is a purpose-built system.",
    },
  ],

  ctaHeadline: "Which process is costing your team the most time?",
  ctaSubtext:
    "Walk us through how it runs today. We will map the steps, point out what is worth automating and what is not, and propose a first workflow that is realistic to build.",
};
