import { Bot } from "lucide-react";
import type { AiServiceContent } from "./types";

export const aiAgentDevelopment: AiServiceContent = {
  slug: "ai-agent-development",
  name: "AI Agents Development",
  kind: "agent",
  icon: Bot,
  gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 60%, #22D3EE 100%)",

  cardDescription:
    "Custom AI agents that read a request, use your tools and data, and finish multi-step tasks, with human approval wherever it matters.",
  cardTags: ["Tool use", "Approvals", "Audit trail"],

  seoTitle: "AI Agent Development Services",
  metaDescription:
    "Custom AI agent development services for businesses. Agents that use your systems to complete multi-step tasks, with guardrails, testing and human approval built in.",
  primaryKeyword: "AI agent development services",
  secondaryKeywords: [
    "custom AI agent development",
    "AI agents for business",
    "build an AI agent",
    "autonomous AI agents",
  ],

  h1: "AI Agent Development Services for Real Business Workflows",
  intro:
    "An AI agent does more than answer questions. It reads a request, decides what to do next, uses your software to do it, and checks the result before handing it back. We design and build custom AI agents around one specific job in your business, with clear limits on what they can touch and who approves what.",

  definition: {
    question: "What is an AI agent?",
    answer:
      "An AI agent is software that uses a language model to work toward a goal across several steps. A chatbot replies to a message; an agent can also call tools such as your CRM, helpdesk, database, calendar or internal APIs, read what comes back and decide what to do next. In a business setting the best agents are narrow: one defined job, a short list of permitted actions, and a person in the loop for anything risky or hard to undo.",
  },

  howItWorks: {
    heading: "How an AI agent works in practice",
    intro:
      "The model is only one part. Most of the engineering is in the tools it can use, the rules around them and the way results are checked.",
    steps: [
      {
        title: "A task arrives",
        description:
          "A trigger starts the agent: an email, a form, a support ticket, a chat message or a schedule. The agent turns it into a structured task with a clear goal.",
      },
      {
        title: "It gathers context",
        description:
          "The agent retrieves only what it is allowed to see: a customer record, order history, a policy document, a previous conversation. Access is scoped per task, not granted wholesale.",
      },
      {
        title: "It plans and uses tools",
        description:
          "From a fixed set of tools, such as look up a record, draft a reply, update a field or request approval, the agent chooses the next step. Each tool validates its inputs and enforces its own permissions.",
      },
      {
        title: "It checks and escalates",
        description:
          "Results are checked against rules you define. If confidence is low or the action is sensitive, the agent stops and passes the case to a person with its reasoning attached.",
      },
      {
        title: "Every step is logged",
        description:
          "Runs are recorded so you can audit decisions, measure outcomes and improve the agent from real cases rather than guesswork.",
      },
    ],
  },

  useCases: {
    heading: "Where AI agents earn their place",
    intro:
      "These are the kinds of jobs where an agent is a sensible fit: several steps, more than one system, and a clear definition of done.",
    items: [
      {
        title: "Lead research and qualification",
        scenario:
          "A new inbound lead arrives. The agent reads the enquiry, checks your CRM for an existing relationship, pulls the public company details you permit, scores the lead against your criteria and drafts a tailored first reply.",
        stays: "A sales rep approves and sends the message, and owns the relationship.",
      },
      {
        title: "Support ticket triage and resolution",
        scenario:
          "The agent reads a ticket, looks up the order, applies your returns policy within limits you set, and either drafts the resolution or routes the ticket to the right team with a summary.",
        stays: "Refunds above a threshold and unusual cases go to a human agent.",
      },
      {
        title: "Invoice intake and reconciliation",
        scenario:
          "Supplier invoices are read, key fields extracted, matched against purchase orders and flagged when amounts, quantities or vendors do not line up.",
        stays: "Your finance team approves payments and resolves every flagged mismatch.",
      },
      {
        title: "Internal operations assistant",
        scenario:
          "Staff ask for equipment, access or policy answers in the channels they already use. The agent answers from approved documents and files routine requests in the right system.",
        stays: "Access and spending decisions remain with the named approver.",
      },
      {
        title: "Recruitment coordination",
        scenario:
          "The agent summarises applications against a written role profile, proposes interview slots from calendars and keeps candidates informed of next steps.",
        stays: "People make every shortlisting and hiring decision.",
      },
      {
        title: "Scheduled research and reporting",
        scenario:
          "Each week the agent gathers figures from several systems, compiles a draft report, cites where each number came from and highlights anything that changed unexpectedly.",
        stays: "An analyst reviews the draft before it is shared.",
      },
    ],
  },

  features: [
    {
      title: "Scoped tool use",
      description:
        "Agents act only through tools we define, each with its own permissions, input validation and rate limits.",
    },
    {
      title: "Retrieval from your own data",
      description:
        "Answers and decisions draw on your documents, records and policies, with the source available for review.",
    },
    {
      title: "Human approval steps",
      description:
        "Sensitive actions pause for sign-off. You decide which ones, and the threshold can change as trust grows.",
    },
    {
      title: "Audit logs and traceability",
      description:
        "Every input, tool call and output is recorded so decisions can be reviewed and disputes resolved.",
    },
    {
      title: "Evaluation before launch",
      description:
        "We build a test set from your real cases and measure the agent against it, so changes are checked rather than assumed.",
    },
    {
      title: "Model-flexible architecture",
      description:
        "The agent is not tied to one provider. We select models per task for quality, cost and data-handling needs.",
    },
    {
      title: "Cost and safety limits",
      description:
        "Spending caps, step limits and timeouts stop runaway loops and keep running costs predictable.",
    },
    {
      title: "Integration with your stack",
      description:
        "Connections to CRMs, helpdesks, accounting tools, databases and team chat, built around the systems you already use.",
    },
  ],
  benefits: [
    {
      title: "Time back on repeatable work",
      description:
        "Skilled people spend less time moving information between systems and more on judgement and relationships.",
    },
    {
      title: "More consistent handling",
      description:
        "The same policy is applied the same way each time, with exceptions escalated rather than improvised.",
    },
    {
      title: "Faster response on queues",
      description:
        "Tickets, leads and invoices are worked on as they arrive, not when someone finds a free hour.",
    },
    {
      title: "Capacity without matching headcount",
      description:
        "Peaks in volume can be absorbed without hiring in step, within the limits of what the agent handles well.",
    },
    {
      title: "Visibility you can act on",
      description:
        "Logged runs show where work stalls, which cases need people and where the process itself needs fixing.",
    },
  ],

  whoShouldConsider: {
    heading: "Who should consider AI agent development",
    items: [
      "Teams whose skilled staff spend a large share of the day on repetitive, multi-step work that spans several tools.",
      "Businesses with a documented process and a clear definition of what a finished task looks like.",
      "Operations, support or finance leads managing a queue that grows with volume: tickets, invoices, leads, requests.",
      "Organisations that can name a measurable outcome, such as turnaround time, backlog size or hours spent per week.",
      "Product teams and founders who want an agent as part of their product rather than only an internal tool.",
    ],
  },

  notYet: {
    heading: "Who may not need an AI agent yet",
    intro:
      "An agent is often more than the problem needs. In these situations something simpler and cheaper usually works better.",
    items: [
      {
        title: "The process is not written down, or changes weekly",
        description:
          "An agent encodes a process. If the process is still being worked out, you will rebuild the agent each time it changes.",
        alternative:
          "Document the steps and agree on the rules first. A checklist or standard operating procedure may deliver most of the benefit on its own.",
      },
      {
        title: "Every step follows a fixed rule",
        description:
          "If the logic is always 'when X happens, do Y', there is no judgement for a model to add, only cost and unpredictability.",
        alternative:
          "Standard workflow automation is cheaper and more predictable, and AI can still be added inside the flow for the steps that need it. Read about",
        alternativeLink: { label: "AI workflow automation", href: "/services/ai-development/ai-workflow-automation" },
      },
      {
        title: "You mainly need to answer common questions",
        description:
          "If customers or staff mostly need information, an agent that takes actions in your systems is unnecessary.",
        alternative:
          "A well-built chatbot grounded in your documentation is usually enough, and easier to govern. See",
        alternativeLink: { label: "AI chatbots and customer support", href: "/services/ai-development/ai-chatbot-development" },
      },
      {
        title: "Volume is very low",
        description:
          "A handful of cases a week rarely justifies a custom build.",
        alternative:
          "Saved templates, or the assistant features already included in tools you pay for, may be sufficient.",
      },
      {
        title: "Your data and systems are not accessible yet",
        description:
          "Agents need clean enough data and a way to connect, such as an API. Without that, most of the project becomes groundwork.",
        alternative:
          "Start with data clean-up and system access, which pays off whether or not you build an agent later.",
      },
      {
        title: "Mistakes would be costly and cannot be reviewed",
        description:
          "For regulated or high-stakes decisions, an unreviewed model decision is the wrong design.",
        alternative:
          "Keep the decision with a person and use AI only to prepare drafts, summaries and evidence.",
      },
    ],
  },

  challenges: [
    {
      challenge: "Staff copy information between systems all day",
      approach:
        "The agent does the lookup, entry and cross-checking across tools, so people review outcomes instead of re-keying data.",
    },
    {
      challenge: "The same request is handled differently by different people",
      approach:
        "Policy is built into the agent's rules and tools, and unusual cases are escalated rather than decided ad hoc.",
    },
    {
      challenge: "Backlogs grow whenever volume rises",
      approach:
        "Routine cases are handled as they arrive, leaving your team to focus on the exceptions that need experience.",
    },
    {
      challenge: "Know-how sits in one or two people's heads",
      approach:
        "Building the agent forces the process to be written down, which benefits the team even where the agent hands work back.",
    },
    {
      challenge: "Concern that AI will act without oversight",
      approach:
        "Permissions, approval steps, spending limits and full logs keep the agent inside boundaries you set and can inspect.",
    },
  ],

  considerations: [
    {
      title: "Reliability is measured, not assumed",
      description:
        "Language models can misread inputs or state things that are not true. We test against your real cases, report accuracy honestly and design checks so errors are caught before they cause harm. Expect a measured error rate, not zero.",
    },
    {
      title: "Start with one job",
      description:
        "A broad 'do everything' agent is hard to test and hard to trust. One well-defined task gives you something you can evaluate and then extend.",
    },
    {
      title: "Integration is often the larger share of the work",
      description:
        "Authentication, permissions, rate limits and edge cases in your existing systems usually take more effort than the AI itself. Discovery should cover this early.",
    },
    {
      title: "Data protection and where data goes",
      description:
        "Decide what is sent to a model provider and what is redacted or kept in-region. Requirements differ across GDPR and UK GDPR, India's Digital Personal Data Protection Act and sector rules such as HIPAA. We help translate your requirements into technical choices; your legal advisers decide what the rules require.",
    },
    {
      title: "Running costs scale with usage",
      description:
        "Each run has a model and infrastructure cost. We estimate cost per task up front and set limits so volume spikes do not surprise you.",
    },
    {
      title: "Ongoing maintenance",
      description:
        "Models, tools and your own processes change. Plan for monitoring and periodic review rather than treating launch as the end.",
    },
  ],
  limitations: [
    "Multi-step runs can take seconds to minutes, so agents suit back-office work better than instant interactions.",
    "Agents are weakest where inputs are ambiguous, rules are unstated or the right answer depends on context they cannot see.",
    "Quality depends on the quality and completeness of the data and documents they can reach.",
  ],

  faqs: [
    {
      question: "What is the difference between an AI agent and a chatbot?",
      answer:
        "A chatbot mainly converses: it answers questions, usually from a body of content. An agent works toward a goal across several steps and can take actions in other systems, such as updating a record or preparing a document for approval. Many projects use both: a chatbot for the conversation and an agent behind it for the tasks.",
    },
    {
      question: "How much does custom AI agent development cost?",
      answer:
        "It depends on the number of systems the agent connects to, how many actions it can take, the approval flow and how much testing your risk level calls for. We scope a focused first version after a discovery conversation and give you a written estimate, rather than quoting a figure before we understand the job.",
    },
    {
      question: "How long does it take to build an AI agent?",
      answer:
        "A narrowly scoped first agent is typically a matter of weeks rather than days, with most of the time going into integrations and testing. We give a timeline once we have seen your systems and processes.",
    },
    {
      question: "Can the agent act without human approval?",
      answer:
        "It can for low-risk, reversible actions you explicitly allow. For anything sensitive, such as payments, customer-facing messages or changes to records, we usually start with approval required and relax it only after the agent has proved reliable on real cases.",
    },
    {
      question: "Which AI models do you use?",
      answer:
        "We choose per project and per task, based on quality, cost, speed and your data-handling requirements. That can mean a hosted model from a major provider or, where policy demands it, a model hosted in your own environment. The agent is built so models can be swapped later.",
    },
    {
      question: "Is our data used to train the model?",
      answer:
        "That depends on the provider and the plan. Business API terms from the major providers commonly exclude customer data from training by default, but terms differ, so we check the specific terms for the model we select and configure it accordingly before any real data is used.",
    },
    {
      question: "How do you know the agent is working well?",
      answer:
        "We agree success measures at the start, for example resolution accuracy on a test set, share of cases handled without escalation, turnaround time and cost per task. After launch we review real runs and report against those measures.",
    },
    {
      question: "Do you build agents for healthcare, laboratories or schools?",
      answer:
        "Yes. That work is covered on our dedicated page for AI agents in healthcare, laboratories and schools, which reflects the extra care those environments need.",
    },
  ],
  related: [
    {
      label: "AI agents for healthcare, laboratories and schools",
      href: "/services/ai-development/ai-agents",
      description: "Domain-specific agents for environments with extra oversight needs.",
    },
    {
      label: "AI workflow automation",
      href: "/services/ai-development/ai-workflow-automation",
      description: "When the steps are fixed and you need reliable automation more than judgement.",
    },
    {
      label: "AI chatbots and customer support",
      href: "/services/ai-development/ai-chatbot-development",
      description: "When the main need is answering questions from your own content.",
    },
    {
      label: "Custom software development",
      href: "/services/software-development",
      description: "For the systems and integrations an agent needs to work with.",
    },
  ],

  ctaHeadline: "Have a task an AI agent could take on?",
  ctaSubtext:
    "Describe the job, the tools involved and what a good result looks like. We will tell you honestly whether an agent is the right fit and what a sensible first version would be.",
};
