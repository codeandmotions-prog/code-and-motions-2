import { AudioLines } from "lucide-react";
import type { AiServiceContent } from "./types";

export const aiVoiceAgents: AiServiceContent = {
  slug: "ai-voice-agent-development",
  name: "AI Voice Agents",
  kind: "voice",
  icon: AudioLines,
  gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 45%, #22D3EE 130%)",

  cardDescription:
    "Voice agents that answer calls, book appointments and handle routine enquiries in natural speech, then transfer to your team when needed.",
  cardTags: ["Inbound calls", "Booking", "Warm transfer"],

  seoTitle: "AI Voice Agent Development Services",
  metaDescription:
    "AI voice agent development for inbound and outbound calls. Voice agents that answer, book and qualify, connect to your systems and transfer to your team when needed.",
  primaryKeyword: "AI voice agent development",
  secondaryKeywords: [
    "AI phone agent",
    "AI receptionist for business",
    "conversational voice AI",
    "AI call answering",
  ],

  h1: "AI Voice Agent Development for Inbound and Outbound Calls",
  intro:
    "For many businesses the phone is still where customers go first, and a missed call is a missed opportunity. We build AI voice agents that answer calls in natural speech, handle routine requests such as bookings and order status, record clean notes in your systems and transfer to a person when the call needs one.",

  definition: {
    question: "What is an AI voice agent?",
    answer:
      "An AI voice agent is software that holds a spoken conversation over a phone call or inside an app. It converts the caller's speech to text, uses a language model and your business rules to decide what to say and which actions to take, such as checking availability or looking up an order, then replies with synthetic speech. Each turn needs to happen quickly enough to feel like a conversation. It connects to your phone system and business software and can transfer the call to a person with a summary.",
  },

  howItWorks: {
    heading: "How an AI voice agent handles a call",
    intro:
      "Voice adds demands that text does not: speed, interruptions, accents and the telephone network itself.",
    steps: [
      {
        title: "The call connects",
        description:
          "Calls reach the agent through a telephony provider, via your existing number, a forwarded line or a new one. The same engine can also run inside a web or mobile app.",
      },
      {
        title: "Speech is recognised",
        description:
          "Speech recognition streams the caller's words as they speak. Names, numbers, accents and background noise are the hardest part, so we test with recordings like your real calls.",
      },
      {
        title: "The agent decides and acts",
        description:
          "A language model follows your call flow and rules, asks for missing details and uses tools to check a calendar, find an order or create a record.",
      },
      {
        title: "It replies in a natural voice",
        description:
          "Text-to-speech speaks the reply in a voice you choose, and the agent stops talking when the caller interrupts, as a person would.",
      },
      {
        title: "Handover and records",
        description:
          "When needed, the call transfers to a person with a short summary. Every call produces a transcript, outcome and structured data in your CRM or helpdesk, within your consent and retention rules.",
      },
    ],
  },

  useCases: {
    heading: "Where voice agents fit",
    intro:
      "The best candidates are calls that repeat, follow a recognisable pattern and end in a simple action.",
    items: [
      {
        title: "Appointment booking and reminders",
        scenario:
          "Clinics, dental practices, salons, garages and home-service firms answer calls, offer open slots, confirm bookings and send reminders. In healthcare settings the agent handles scheduling only, not clinical advice.",
        stays: "Staff handle clinical questions, special requests and anything urgent.",
      },
      {
        title: "After-hours and overflow call answering",
        scenario:
          "Calls that would reach voicemail, or queue while the team is busy, are answered, the reason for the call captured and a next step arranged.",
        stays: "Your team picks up urgent or high-value calls through a transfer or callback.",
      },
      {
        title: "Order status and delivery updates",
        scenario:
          "Customers ask where an order is. The agent looks up the status and, where your policy allows, rebooks a delivery slot.",
        stays: "Complaints and exceptions move to customer service.",
      },
      {
        title: "Inbound lead qualification",
        scenario:
          "When a prospect calls or requests a call-back from your website, the agent asks your qualifying questions and books time with the right person.",
        stays: "A salesperson runs the real conversation.",
      },
      {
        title: "Reservations in hospitality",
        scenario:
          "Restaurants and venues take bookings, check capacity and answer questions on opening hours, menus and directions.",
        stays: "Staff handle large events, dietary edge cases and complaints.",
      },
      {
        title: "Internal IT or HR phone line",
        scenario:
          "Staff call a number to log a fault or ask a routine HR question. The agent captures the details, creates the ticket and gives a reference.",
        stays: "IT and HR resolve the issue and handle anything personal.",
      },
    ],
  },

  features: [
    {
      title: "Natural turn-taking",
      description:
        "Low-latency responses and the ability for callers to interrupt, so the conversation does not feel like a menu.",
    },
    {
      title: "Connected to your systems",
      description:
        "Calendars, CRMs, helpdesks and order systems, so calls end in an action rather than a message.",
    },
    {
      title: "Warm transfer to people",
      description:
        "Hand off to a team member or department with a summary, so callers never repeat themselves.",
    },
    {
      title: "Multiple languages and accents",
      description:
        "Support for the languages your callers use, tested against real speech such as regional English, Hindi, Urdu and European languages before go-live.",
    },
    {
      title: "Transcripts and call summaries",
      description:
        "Searchable records and structured outcomes for every call, subject to your consent and retention settings.",
    },
    {
      title: "Call analytics",
      description:
        "See why people call, when volume peaks and how many calls are resolved without a person.",
    },
    {
      title: "Fallback paths",
      description:
        "Voicemail, SMS follow-up or a callback request when the agent cannot help or a system is unavailable.",
    },
    {
      title: "Compliance controls",
      description:
        "Configurable AI disclosure, recording notices and opt-out handling, set up with your legal advisers' requirements in mind.",
    },
  ],
  benefits: [
    {
      title: "Fewer missed calls",
      description:
        "Calls are answered at any hour and during busy periods, so enquiries and bookings are not lost.",
    },
    {
      title: "Shorter waits for callers",
      description:
        "Routine requests are handled immediately instead of queuing behind each other.",
    },
    {
      title: "Staff free for complex calls",
      description:
        "Your team spends its phone time on conversations where a person makes the difference.",
    },
    {
      title: "Consistent information",
      description:
        "Opening hours, policies and prices are stated the same way every time.",
    },
    {
      title: "Usable data from every call",
      description:
        "Reasons for calling and outcomes are captured in a structured form you can analyse.",
    },
  ],

  whoShouldConsider: {
    heading: "Who should consider an AI voice agent",
    items: [
      "Businesses that receive a high volume of routine inbound calls and cannot always answer them.",
      "Appointment-driven businesses losing bookings to missed calls or busy lines.",
      "Companies needing after-hours or overflow cover without staffing a night shift.",
      "Teams where callers repeatedly ask the same handful of questions.",
      "Businesses where the phone remains a main channel, which is common in many markets including India and Pakistan.",
    ],
  },

  notYet: {
    heading: "Who may not need a voice agent yet",
    intro:
      "Voice is the most demanding channel to automate. Often a simpler tool solves the same problem for less.",
    items: [
      {
        title: "You receive only a few calls a day",
        description:
          "At low volume, a voice agent's build and running costs are hard to justify.",
        alternative:
          "A clear voicemail greeting, a call-back request form and an online booking link usually cover it.",
      },
      {
        title: "Most calls need empathy, negotiation or judgement",
        description:
          "Complaints, sensitive health or financial conversations and complex sales calls need people.",
        alternative:
          "Keep these with trained staff, and use AI only for call summaries and follow-up notes.",
      },
      {
        title: "Customers could self-serve online",
        description:
          "If people would happily book or check an order on your website or WhatsApp, voice is the expensive route.",
        alternative:
          "Online booking, a self-service page or a text-based chatbot is cheaper to build and easier to maintain. See",
        alternativeLink: { label: "AI chatbots and customer support", href: "/services/ai-development/ai-chatbot-development" },
      },
      {
        title: "Your call flows are not defined",
        description:
          "An agent needs to know what to do in each situation. If different staff handle the same call differently, the flow is not ready.",
        alternative:
          "Agree and write down the standard call scripts and decision rules first.",
      },
      {
        title: "Calls are high-stakes or urgent",
        description:
          "Emergency or safety-related calls must reach a person immediately.",
        alternative:
          "Route those calls straight to staff or a human answering service, and keep any AI to non-urgent lines.",
      },
    ],
  },

  challenges: [
    {
      challenge: "Missed calls turn into lost customers",
      approach:
        "Every call is answered, the need is captured and the next step is booked or flagged.",
    },
    {
      challenge: "Callers wait on hold at peak times",
      approach:
        "The agent can take many calls at once, so routine requests do not queue behind each other.",
    },
    {
      challenge: "No one is available out of hours",
      approach:
        "Evening, weekend and holiday calls are answered, with urgent ones transferred or escalated.",
    },
    {
      challenge: "Staff are tied up by repetitive calls",
      approach:
        "Routine calls are handled end to end, leaving your team the calls that need them.",
    },
    {
      challenge: "You do not know why people call",
      approach:
        "Transcripts and categorised outcomes show call reasons and trends you can act on.",
    },
    {
      challenge: "Seasonal spikes overwhelm the team",
      approach:
        "Capacity flexes with demand without hiring temporary staff for short peaks.",
    },
  ],

  considerations: [
    {
      title: "Latency decides whether it feels natural",
      description:
        "Long pauses make callers talk over the agent or hang up. We design for responsiveness and test on real phone connections, not only in a demo environment.",
    },
    {
      title: "Recognition is imperfect",
      description:
        "Accents, noisy lines, names and long numbers cause errors. The agent should confirm critical details, such as a phone number or date, and offer a human when it struggles.",
    },
    {
      title: "Consent, disclosure and local rules",
      description:
        "Call recording and automated-call rules differ by country and, in the US, by state. In the US, outbound calls using AI-generated voices can fall under consent rules such as the TCPA; the UK and EU have their own data-protection and marketing-call requirements. We recommend telling callers they are speaking with an AI and taking legal advice for outbound use.",
    },
    {
      title: "Telephony availability and regulation",
      description:
        "Number availability, carrier rules and call-routing options differ between countries, including India and Pakistan. We check these early because they affect the design and the cost.",
    },
    {
      title: "Payments and sensitive data",
      description:
        "We avoid collecting card numbers by voice. A secure payment link sent by SMS or email is safer and simpler to keep compliant.",
    },
    {
      title: "Running costs",
      description:
        "Each minute involves telephony, speech and model charges in addition to the build. We estimate cost per call and compare it with your current cost of handling the same calls.",
    },
  ],
  limitations: [
    "A voice agent will not understand every caller, so a path to a person is a design requirement, not an extra.",
    "Open-ended or emotional calls remain better handled by people.",
    "Voice cloning of a real person should only be done with their explicit consent, and we do not recommend it for most business uses.",
  ],

  faqs: [
    {
      question: "Will callers know they are talking to an AI?",
      answer:
        "We recommend an upfront disclosure and design the agent to be open about it if asked. Transparency builds trust, and in some places it is becoming a legal expectation. Many callers are comfortable with an AI that resolves their request quickly.",
    },
    {
      question: "How natural does it sound?",
      answer:
        "Current speech technology can sound quite natural, but quality depends on the voice, the languages involved, the phone line and response speed. We build a working prototype early so you can hear it and judge for yourself before committing further.",
    },
    {
      question: "Can it transfer the call to a person?",
      answer:
        "Yes. It can transfer to a specific person or department, during business hours or to a callback or voicemail otherwise, passing along a short summary of what the caller has said.",
    },
    {
      question: "Which languages does it support?",
      answer:
        "English in its regional variants, Hindi, Urdu and a range of European languages are commonly possible, but quality varies. We test each language and accent with realistic samples and agree which ones to launch.",
    },
    {
      question: "Does it work with our existing phone system?",
      answer:
        "Usually, yes. It can sit behind your current number through forwarding or integration with your telephony provider. We check your setup during discovery.",
    },
    {
      question: "Can it make outbound calls as well as answer them?",
      answer:
        "Technically yes, for uses such as appointment reminders or call-backs to people who requested one. Outbound calling carries stricter consent and disclosure rules, so we scope it carefully and recommend you take legal advice first.",
    },
    {
      question: "Can it take payments?",
      answer:
        "We do not recommend collecting card details by voice. The agent can send a secure payment link by SMS or email instead, which is safer and easier to keep compliant.",
    },
    {
      question: "How much does a voice agent cost?",
      answer:
        "There is a one-off build cost, which depends on integrations, languages and call flows, plus running costs per minute for telephony, speech and the language model. We scope both and compare the total with what handling the same calls costs you today.",
    },
  ],
  related: [
    {
      label: "AI chatbots and customer support",
      href: "/services/ai-development/ai-chatbot-development",
      description: "The text-based option for customers who would rather type or message.",
    },
    {
      label: "AI agent development",
      href: "/services/ai-development/ai-agent-development",
      description: "For the back-office tasks that follow a call.",
    },
    {
      label: "AI workflow automation",
      href: "/services/ai-development/ai-workflow-automation",
      description: "To pass call outcomes into your CRM, calendar and reporting.",
    },
    {
      label: "Custom software development",
      href: "/services/software-development",
      description: "For bespoke booking or order systems the agent connects to.",
    },
  ],

  ctaHeadline: "Missing calls you should be answering?",
  ctaSubtext:
    "Tell us how many calls you get, what they are about and what a good outcome looks like. We will assess whether a voice agent suits you and what a pilot could involve.",
};
