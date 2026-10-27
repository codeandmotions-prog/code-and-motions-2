import { MessagesSquare } from "lucide-react";
import type { AiServiceContent } from "./types";

export const aiChatbotDevelopment: AiServiceContent = {
  slug: "ai-chatbot-development",
  name: "AI Chatbots & Customer Support",
  kind: "chatbot",
  icon: MessagesSquare,
  gradient: "linear-gradient(155deg, #060D24 0%, #1547E0 70%, #2F6BFF 100%)",

  cardDescription:
    "Chatbots grounded in your own content that answer customers, qualify leads and hand over to your team the moment a person is needed.",
  cardTags: ["Grounded answers", "Human handover", "Multichannel"],

  seoTitle: "Custom AI Chatbot Development for Customer Support",
  metaDescription:
    "Custom AI chatbot development for customer support and sales. Chatbots that answer from your own content, connect to your systems and hand over to your team when needed.",
  primaryKeyword: "custom AI chatbot development",
  secondaryKeywords: [
    "AI chatbot for customer support",
    "AI customer service chatbot",
    "WhatsApp AI chatbot",
    "chatbot development company",
  ],

  h1: "Custom AI Chatbot Development for Customer Support and Sales",
  intro:
    "Most customer questions are ones you have answered many times before. We build AI chatbots that answer those questions accurately from your own content, take simple actions such as checking an order or booking a slot, and pass the conversation to your team, with context, when a person should take over.",

  definition: {
    question: "What is a custom AI chatbot?",
    answer:
      "A custom AI chatbot is a conversational assistant built around your business. It answers using content you approve, such as your help centre, product catalogue and policies, connects to your systems for things like order status or bookings, and follows your tone and escalation rules. Unlike a generic off-the-shelf bot, its answers are grounded in your own sources and it is designed to recognise when it should not answer and hand over instead.",
  },

  howItWorks: {
    heading: "How a custom AI chatbot works",
    intro:
      "The quality of a chatbot depends far more on its sources, guardrails and handover than on which model sits underneath.",
    steps: [
      {
        title: "Gather and clean your knowledge",
        description:
          "We collect the content the bot should rely on: help articles, product data, policies, past tickets. Gaps, contradictions and outdated pages are surfaced before they become wrong answers.",
      },
      {
        title: "Make it searchable",
        description:
          "Content is indexed so that, for each question, the most relevant passages are retrieved and used to compose the reply. This approach, often called retrieval-augmented generation, keeps answers tied to your material rather than the model's general memory.",
      },
      {
        title: "Connect the actions",
        description:
          "Through authenticated integrations the bot can look up an order, check availability, create a ticket or capture a lead, so a conversation can end in a result and not only in an answer.",
      },
      {
        title: "Set guardrails and handover",
        description:
          "You decide what is out of scope and when to escalate: low confidence, a frustrated customer, a sensitive topic. A handover passes the transcript to your helpdesk or inbox so nobody has to repeat themselves.",
      },
      {
        title: "Launch, review and improve",
        description:
          "We review real conversations, the questions it could not answer and the cases that were escalated, then update content and behaviour. A chatbot improves through this loop, not through launch day alone.",
      },
    ],
  },

  useCases: {
    heading: "Practical places a chatbot helps",
    intro:
      "Each of these starts with questions that arrive repeatedly and have a clear, documentable answer.",
    items: [
      {
        title: "Online store order and returns questions",
        scenario:
          "Where is my order, how do I return this, what are the delivery times to my country? The bot answers from your policies and looks up the live order status, which suits a Shopify or WooCommerce store with seasonal peaks.",
        stays: "Disputes, damaged goods and exceptions go to your support team with the order attached.",
      },
      {
        title: "SaaS product support and onboarding",
        scenario:
          "New users ask how to set something up. The bot answers from your documentation, links the exact article and flags the topics people keep asking about so you can improve the product or the docs.",
        stays: "Bug reports and account-level issues are routed to your support or engineering queue.",
      },
      {
        title: "Lead capture and booking for service businesses",
        scenario:
          "A visitor asks about services or pricing out of hours. The bot answers from approved information, asks the qualifying questions you define and books a call or consultation.",
        stays: "Your team handles pricing negotiation and the sales conversation.",
      },
      {
        title: "Customer support on WhatsApp and social messaging",
        scenario:
          "In many markets, including India and Pakistan, customers expect to reach a business on WhatsApp. The bot handles first-line questions there, in the language the customer writes in.",
        stays: "Complex or sensitive conversations move to a person in the same thread.",
      },
      {
        title: "Internal HR and IT helpdesk",
        scenario:
          "Employees ask about leave policy, expenses or how to connect to the VPN. The bot answers from internal documents and raises a ticket when it cannot resolve the issue.",
        stays: "HR and IT handle anything involving individuals' personal circumstances or access changes.",
      },
      {
        title: "Multilingual first-line support",
        scenario:
          "A business serving customers in several countries uses one bot to answer in English plus languages such as Hindi, Urdu or common European languages, after we test quality in each.",
        stays: "Native-speaking staff review the language quality and handle nuanced cases.",
      },
    ],
  },

  features: [
    {
      title: "Answers grounded in your content",
      description:
        "Replies are drawn from your approved sources, with links back to the article or policy used.",
    },
    {
      title: "Clean handover to people",
      description:
        "Conversations transfer to a human with the full transcript and a short summary, inside the helpdesk you already use.",
    },
    {
      title: "Website, WhatsApp and more",
      description:
        "Deploy on your website, WhatsApp Business, in-app, or team tools, with one knowledge base behind them.",
    },
    {
      title: "Multilingual conversations",
      description:
        "Support for the languages your customers use, tested per language rather than assumed.",
    },
    {
      title: "Live lookups and bookings",
      description:
        "Order status, appointment availability and ticket creation through secure integrations.",
    },
    {
      title: "Tone and guardrails",
      description:
        "A voice that matches your brand, topics it will not discuss and clear behaviour when it does not know.",
    },
    {
      title: "Insight from conversations",
      description:
        "See which questions are asked most, which go unanswered and where your content or product causes confusion.",
    },
    {
      title: "Content you can update yourself",
      description:
        "A simple way for your team to update sources and policies without involving a developer each time.",
    },
  ],
  benefits: [
    {
      title: "Fast first response, around the clock",
      description:
        "Customers get an answer to routine questions at any hour, including across time zones.",
    },
    {
      title: "Less time on repeat questions",
      description:
        "Your team spends its day on the conversations that need judgement, empathy or authority.",
    },
    {
      title: "More consistent answers",
      description:
        "Everyone hears the same policy, expressed the way you would want it expressed.",
    },
    {
      title: "Fewer lost leads",
      description:
        "Enquiries made outside office hours are captured and qualified instead of waiting until morning.",
    },
    {
      title: "A clearer view of customer needs",
      description:
        "The questions people actually ask become a source of product and content decisions.",
    },
  ],

  whoShouldConsider: {
    heading: "Who should consider a custom AI chatbot",
    items: [
      "Support teams that answer the same set of questions many times a day and want to protect time for harder cases.",
      "Online stores with seasonal peaks, where order and delivery questions swamp the inbox.",
      "SaaS and software companies with substantial documentation that customers struggle to search.",
      "Businesses with customers in several time zones, or a sales funnel that loses enquiries outside office hours.",
      "Companies that already have reasonably good help content and want it to be easier to reach.",
    ],
  },

  notYet: {
    heading: "Who may not need a custom chatbot yet",
    intro:
      "A bespoke build is not always the right answer. These are the situations where something lighter is a better start.",
    items: [
      {
        title: "You receive only a few enquiries a day",
        description:
          "At low volume, the cost and upkeep of a chatbot rarely pays back.",
        alternative:
          "A shared inbox with saved replies, plus a clear contact form, is usually enough.",
      },
      {
        title: "Your help content is thin or out of date",
        description:
          "A chatbot can only be as accurate as its sources. Weak content produces weak answers.",
        alternative:
          "Write or refresh the key help articles and FAQ page first. They help customers directly and become the chatbot's foundation later.",
      },
      {
        title: "You already use a helpdesk with a built-in AI assistant",
        description:
          "Many helpdesk and e-commerce platforms now include one. If your needs are standard, it may cover them.",
        alternative:
          "Try the built-in option first. A custom build makes sense when you need deeper integrations, specific behaviour or data-handling control it cannot offer.",
      },
      {
        title: "Most conversations are complex or emotionally charged",
        description:
          "Complaints, medical, legal or financial hardship conversations call for people, not automation.",
        alternative:
          "Invest in training and tooling for your team, and use AI only to prepare summaries and suggested replies they review.",
      },
      {
        title: "You only need a simple menu or form",
        description:
          "If customers choose from a few options such as track order or book a call, you do not need a language model.",
        alternative:
          "A rule-based flow, a form or a self-service page is cheaper and fully predictable. If the task behind the question needs several steps, see",
        alternativeLink: { label: "AI agent development", href: "/services/ai-development/ai-agent-development" },
      },
    ],
  },

  challenges: [
    {
      challenge: "Customers wait hours for an answer you could give in seconds",
      approach:
        "The bot answers routine questions immediately and escalates the rest, so human replies go where they are needed.",
    },
    {
      challenge: "The same tickets arrive again and again",
      approach:
        "Repetitive questions are resolved at the first touch, and the data shows which ones keep returning so they can be fixed at the source.",
    },
    {
      challenge: "Leads arrive when nobody is online",
      approach:
        "The chatbot engages visitors at any hour, asks your qualifying questions and books the next step.",
    },
    {
      challenge: "Different agents give different answers",
      approach:
        "One approved knowledge base and a consistent tone sit behind every reply.",
    },
    {
      challenge: "Knowledge is scattered across documents, chats and people",
      approach:
        "Preparing the chatbot consolidates and cleans it, which tends to improve your human support as well.",
    },
    {
      challenge: "Customers write in more languages than your team speaks",
      approach:
        "Multilingual replies provide first-line coverage, with native speakers reviewing quality and handling escalations.",
    },
  ],

  considerations: [
    {
      title: "Accuracy and the risk of invented answers",
      description:
        "Grounding the bot in your content reduces made-up answers but does not eliminate them. We test with real customer questions, set the bot to decline or escalate when it is unsure, and review conversations after launch.",
    },
    {
      title: "Content quality sets the ceiling",
      description:
        "If policies contradict each other or documentation is stale, the bot will reflect that. Plan time to clean up sources before launch.",
    },
    {
      title: "Tell customers it is an AI",
      description:
        "Transparency is good practice and, in some jurisdictions, increasingly a requirement. We recommend a clear disclosure and an easy route to a person.",
    },
    {
      title: "Privacy of conversations",
      description:
        "Chats often contain personal information. Decide what is stored, for how long and what is sent to a model provider, in line with GDPR and UK GDPR, India's Digital Personal Data Protection Act or other rules that apply to you.",
    },
    {
      title: "Channel rules and costs",
      description:
        "Channels such as WhatsApp Business have their own approval processes, message templates and charges. These affect design and running cost, so we review them early.",
    },
    {
      title: "Running costs and upkeep",
      description:
        "Model usage grows with conversations. Content also needs an owner who keeps it current as products and policies change.",
    },
  ],
  limitations: [
    "A chatbot reduces repetitive workload; it does not replace a support team.",
    "Quality in less widely used languages and dialects varies, which is why we test each language you need.",
    "It cannot resolve what your own systems do not allow, such as refunds your policy does not permit.",
  ],

  faqs: [
    {
      question: "How is an AI chatbot different from a rule-based chatbot?",
      answer:
        "A rule-based bot follows scripted menus and keywords, so it only handles what its designers anticipated. An AI chatbot understands free-form questions and composes answers from your content. The trade-off is that AI answers need more testing and guardrails, which is part of what we build.",
    },
    {
      question: "Can the chatbot be trained on our own documents?",
      answer:
        "It can use your documents as its source of truth. In most cases this means retrieving the relevant passages at the moment of the question rather than retraining the underlying model, which makes content updates quick and keeps your material under your control.",
    },
    {
      question: "How do you stop it making things up?",
      answer:
        "We ground replies in your sources, instruct the bot to say when it does not know, test it on real and tricky questions, and route uncertain or sensitive conversations to a person. These measures reduce the risk considerably but cannot reduce it to zero, so we also review live conversations after launch.",
    },
    {
      question: "Can it work on WhatsApp?",
      answer:
        "Yes. WhatsApp Business has its own approval steps, message-template rules and charges, which we review with you early so the design and running cost are realistic.",
    },
    {
      question: "Does it support languages other than English?",
      answer:
        "It can, including languages such as Hindi, Urdu and many European languages. Quality differs by language, so we test with native speakers and agree which languages go live.",
    },
    {
      question: "How do we measure whether it is working?",
      answer:
        "We set a baseline first, then track measures such as the share of conversations resolved without a human, handover rate, customer satisfaction and response time. We report against them after launch.",
    },
    {
      question: "Will we need a developer to maintain it?",
      answer:
        "Day-to-day content updates are designed to be done by your team. Changes to integrations, behaviour and channels are better handled by a developer, and we can support that after launch.",
    },
    {
      question: "How much does a custom chatbot cost?",
      answer:
        "It depends on how many channels, integrations and languages are involved and how much testing your risk level calls for. After a short discovery conversation we provide a written scope and estimate, including expected running costs.",
    },
  ],
  related: [
    {
      label: "AI website development",
      href: "/services/ai-development/ai-website-development",
      description: "Add AI features to a website as part of a wider build.",
    },
    {
      label: "Shopify development",
      href: "/services/shopify-development",
      description: "For stores where order and returns questions drive most support volume.",
    },
    {
      label: "AI agent development",
      href: "/services/ai-development/ai-agent-development",
      description: "When the assistant needs to complete multi-step tasks, not only answer.",
    },
    {
      label: "AI voice agents",
      href: "/services/ai-development/ai-voice-agent-development",
      description: "For customers who prefer to call.",
    },
  ],

  ctaHeadline: "Want a chatbot your customers can actually rely on?",
  ctaSubtext:
    "Tell us what customers ask most, where your content lives and which channels matter. We will suggest a realistic first version and say plainly if a simpler option would serve you better.",
};
