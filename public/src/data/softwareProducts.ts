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
} from "lucide-react";

export type ProductFeature = {
  id: string;
  title: string;
  icon: LucideIcon;
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
  workflow: ProductWorkflowStep[];
  tech: ProductTech[];
  closingHeadline: string;
  closingSubtext: string;
};

const labnova: SoftwareProduct = {
  slug: "labnova",
  name: "LabNova",
  tagline: "Smart Laboratory Management System",
  heroTagline: "Complete. Secure. Simple.",
  shortDescription:
    "A Windows desktop laboratory management solution built to simplify and automate laboratory operations.",
  description:
    "LabNova is a powerful Windows desktop software designed to simplify and automate laboratory operations, from patient management to report generation.",
  logoIcon: "/images/labnova-icon.png",
  logoMark: "/images/labnova-mark.png",
  logoFull: "/images/labnova-full.png",
  accentColor: "#0070FE",
  features: [
    { id: "lab-management", title: "Complete Laboratory Management", icon: LayoutGrid },
    { id: "patient-management", title: "Patient Management", icon: Users },
    { id: "doctor-technician", title: "Doctor & Technician Management", icon: Stethoscope },
    { id: "test-result-entry", title: "Test & Result Entry", icon: FlaskConical },
    { id: "report-generation", title: "Professional Report Generation", icon: FileText },
    { id: "report-printing", title: "Direct Report Printing", icon: Printer },
    { id: "patient-history", title: "Patient History", icon: History },
    { id: "critical-alerts", title: "Critical Result Alerts", icon: AlertTriangle },
    { id: "sms-whatsapp", title: "SMS & WhatsApp Notifications", icon: MessageCircle },
    { id: "branding-reports", title: "Lab Branding & Custom Reports", icon: Palette },
    { id: "secure-data", title: "Secure Lab-wise Data", icon: ShieldCheck },
    { id: "dashboard-analytics", title: "Dashboard & Analytics", icon: BarChart3 },
    { id: "windows-desktop", title: "Windows Desktop Software", icon: Monitor },
    { id: "supabase-cloud", title: "Supabase Cloud Database", icon: Database },
  ],
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
  closingHeadline: "Ready to Transform Your Laboratory?",
  closingSubtext:
    "Get LabNova today and experience a smarter way to manage your lab.",
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
