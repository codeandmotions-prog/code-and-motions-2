import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Users,
  Stethoscope,
  FlaskConical,
  FileText,
  Printer,
  History,
  AlertTriangle,
  MessageCircle,
  Palette,
  ShieldCheck,
  BarChart3,
  Monitor,
  Database,
  Settings2,
  TrendingUp,
  Microscope,
  Building2,
  Sparkles,
} from "lucide-react";

export type ProductFeature = {
  id: string;
  title: string;
  /** Optional short, genuine one-line description shown under the feature title. */
  description?: string;
  icon: LucideIcon;
};

export type ProductAudience = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type ProductWorkflowStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProductTech = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type SoftwareProduct = {
  /** URL slug — the product's detail page lives at /software/{slug} */
  slug: string;
  name: string;
  /** Short product tagline, e.g. "Smart Laboratory Management System" */
  tagline: string;
  /** Secondary hero line, e.g. "Complete. Secure. Simple." */
  heroTagline: string;
  /** One or two sentences used in hero / cards / homepage feature spot */
  shortDescription: string;
  /** Longer paragraph used in the "About" section of the detail page */
  description: string;
  logoIcon: string;
  logoMark: string;
  logoFull: string;
  /** Brand accent color for this product, as a hex string */
  accentColor: string;
  features: ProductFeature[];
  featuresHeading: string;
  featuresIntro: string;
  workflow: ProductWorkflowStep[];
  tech: ProductTech[];
  /** "Who this product is for" cards shown on the detail page. */
  audiences: ProductAudience[];
  audiencesHeading: string;
  audiencesIntro: string;
  /** Genuine, visible FAQs — also used to generate FAQPage structured data. */
  faqs: ProductFAQ[];
  closingHeadline: string;
  closingSubtext: string;
  /** SEO: <title> tag content (the global "%s | Code & Motions" template appends the suffix). */
  seoTitle: string;
  /** SEO: meta description, kept accurate to the real product — no invented claims. */
  metaDescription: string;
  /** SEO: natural-use keyword list for this product's detail page. */
  keywords: string[];
  /** schema.org SoftwareApplication applicationCategory value. */
  applicationCategory: string;
  /** schema.org SoftwareApplication operatingSystem value. */
  operatingSystem: string;
};

const labnova: SoftwareProduct = {
  slug: "labnova",
  name: "LabNova",
  tagline: "Smart Laboratory Management System",
  heroTagline: "Complete. Secure. Simple.",
  shortDescription:
    "LabNova is a Windows desktop laboratory management software built to simplify and automate laboratory operations.",
  description:
    "LabNova is a Windows desktop laboratory management software built to simplify and automate laboratory operations — from patient management and test result entry to report generation and delivery. It gives labs a single lab management system for handling day-to-day operations, so staff spend less time on paperwork and more time on patients.",
  logoIcon: "/images/labnova-icon.png",
  logoMark: "/images/labnova-mark.png",
  logoFull: "/images/labnova-full.png",
  accentColor: "#0070FE",
  features: [
    {
      id: "lab-management",
      title: "Complete Laboratory Management",
      description: "One lab management system for patients, tests, results and reports — instead of juggling spreadsheets.",
      icon: LayoutGrid,
    },
    {
      id: "patient-management",
      title: "Patient Management",
      description: "Register patients and keep their details organized and easy to find.",
      icon: Users,
    },
    {
      id: "doctor-technician",
      title: "Doctor & Technician Management",
      description: "Keep track of referring doctors and the technicians handling each test.",
      icon: Stethoscope,
    },
    {
      id: "test-result-entry",
      title: "Test & Result Entry",
      description: "Enter and update laboratory test results quickly and accurately.",
      icon: FlaskConical,
    },
    {
      id: "report-generation",
      title: "Professional Report Generation",
      description: "Generate clean, professional lab reports straight from your test data.",
      icon: FileText,
    },
    {
      id: "report-printing",
      title: "Direct Report Printing",
      description: "Print reports directly from LabNova — no extra software or exports needed.",
      icon: Printer,
    },
    {
      id: "patient-history",
      title: "Patient History",
      description: "Look up a patient's past visits and test history in seconds.",
      icon: History,
    },
    {
      id: "critical-alerts",
      title: "Critical Result Alerts",
      description: "Get flagged when a result falls outside the normal range, so it isn't missed.",
      icon: AlertTriangle,
    },
    {
      id: "sms-whatsapp",
      title: "SMS & WhatsApp Notifications",
      description: "Notify patients when their reports are ready, by SMS or WhatsApp.",
      icon: MessageCircle,
    },
    {
      id: "branding-reports",
      title: "Lab Branding & Custom Reports",
      description: "Add your lab's branding to reports so every printout looks professional.",
      icon: Palette,
    },
    {
      id: "secure-data",
      title: "Secure Lab-wise Data",
      description: "Each lab's data is kept separate and secure within the system.",
      icon: ShieldCheck,
    },
    {
      id: "dashboard-analytics",
      title: "Dashboard & Analytics",
      description: "See a clear overview of daily activity across your laboratory operations.",
      icon: BarChart3,
    },
    {
      id: "windows-desktop",
      title: "Windows Desktop Software",
      description: "Runs natively on Windows, built for speed on everyday lab hardware.",
      icon: Monitor,
    },
    {
      id: "supabase-cloud",
      title: "Supabase Cloud Database",
      description: "Your lab's records are backed by a secure, cloud-hosted database.",
      icon: Database,
    },
  ],
  featuresHeading: "Key Laboratory Software Features",
  featuresIntro:
    "Everything a modern laboratory needs, built into one lab management system.",
  workflow: [
    {
      id: "setup",
      step: "01",
      title: "Setup",
      description: "Install and configure LabNova for your lab.",
      icon: Settings2,
    },
    {
      id: "manage",
      step: "02",
      title: "Manage",
      description: "Add patients, doctors, tests and manage daily operations.",
      icon: Users,
    },
    {
      id: "process",
      step: "03",
      title: "Process",
      description: "Generate and print professional reports.",
      icon: Printer,
    },
    {
      id: "grow",
      step: "04",
      title: "Grow",
      description: "Save time, reduce errors and deliver better service.",
      icon: TrendingUp,
    },
  ],
  tech: [
    {
      id: "windows-desktop",
      title: "Windows Desktop Software",
      description:
        "A native Windows application built for speed and reliability, so your lab runs smoothly even on modest hardware.",
      icon: Monitor,
    },
    {
      id: "supabase-cloud",
      title: "Supabase Cloud Database",
      description:
        "Patient and test data is backed by a secure, cloud-hosted Supabase database, keeping your records safe and accessible.",
      icon: Database,
    },
  ],
  audiences: [
    {
      id: "diagnostic-labs",
      title: "Diagnostic & Pathology Labs",
      description:
        "Labs that need to manage patients, tests and reports in one place instead of juggling spreadsheets or paper registers.",
      icon: Microscope,
    },
    {
      id: "clinical-labs",
      title: "Clinical & Medical Laboratories",
      description:
        "Laboratories running day-to-day operations who want a single lab management system for test entry, results and report generation.",
      icon: Building2,
    },
    {
      id: "growing-labs",
      title: "Labs Ready to Digitize",
      description:
        "Labs moving on from manual, paper-based or spreadsheet processes to dedicated laboratory management software.",
      icon: Sparkles,
    },
  ],
  audiencesHeading: "Who LabNova Is For",
  audiencesIntro:
    "LabNova is built for labs that want to run their laboratory operations from one system.",
  faqs: [
    {
      question: "What is LabNova?",
      answer:
        "LabNova is a Windows desktop laboratory management software built to simplify and automate laboratory operations — covering patient management, test and result entry, and professional report generation and printing.",
    },
    {
      question: "Who is LabNova for?",
      answer:
        "LabNova is built for diagnostic and pathology labs, clinical laboratories, and any lab looking to move from manual or spreadsheet-based processes to a dedicated lab management system.",
    },
    {
      question: "Is LabNova cloud-based or desktop software?",
      answer:
        "LabNova is a native Windows desktop application, with patient and test data backed by a secure, cloud-hosted Supabase database — so your records stay safe and accessible.",
    },
    {
      question: "What features does LabNova include?",
      answer:
        "LabNova includes patient management, doctor and technician management, test and result entry, report generation and direct printing, patient history, critical result alerts, SMS and WhatsApp notifications, lab branding on reports, and a dashboard with analytics.",
    },
    {
      question: "Can I customize LabNova's reports with my lab's branding?",
      answer:
        "Yes. LabNova supports lab branding and custom report layouts, so reports you print or send carry your laboratory's own identity.",
    },
    {
      question: "How do I get started with LabNova?",
      answer:
        "Contact the Code & Motions team through our contact page to get LabNova set up for your lab. If you need laboratory workflow software customized beyond LabNova's current features, our software development team can also help.",
    },
  ],
  closingHeadline: "Ready to Transform Your Laboratory?",
  closingSubtext:
    "Get LabNova today and experience a smarter way to manage your lab.",
  seoTitle: "LabNova — Laboratory Management Software",
  metaDescription:
    "LabNova is a Windows desktop laboratory management software that simplifies and automates lab operations — patient management, test results and report generation.",
  keywords: [
    "lab management software",
    "laboratory management software",
    "lab software",
    "laboratory software",
    "LabNova software",
    "LabNova laboratory software",
    "lab management system",
    "laboratory workflow software",
    "lab automation software",
  ],
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows",
};

/**
 * All software products shown on /software and /software/{slug}.
 * To add a future product, add another object here — the listing
 * page, product cards, and detail page all render from this array,
 * no other files need to change.
 */
export const softwareProducts: SoftwareProduct[] = [labnova];

export function getSoftwareProduct(slug: string): SoftwareProduct | undefined {
  return softwareProducts.find((product) => product.slug === slug);
}
