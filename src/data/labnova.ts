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

/** Shared LabNova copy, reused by the homepage sections and the /software page
 * so the two never drift out of sync. */
export const labnova = {
  name: "LabNova",
  tagline: "Smart Laboratory Management System",
  shortDescription:
    "A Windows desktop laboratory management solution built to simplify and automate laboratory operations.",
  description:
    "LabNova is a powerful Windows desktop software designed to simplify and automate laboratory operations, from patient management to report generation.",
};

export type LabNovaFeature = {
  id: string;
  title: string;
  icon: LucideIcon;
};

export const labnovaFeatures: LabNovaFeature[] = [
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
];

export type LabNovaWorkflowStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const labnovaWorkflow: LabNovaWorkflowStep[] = [
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
];

export type LabNovaTech = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const labnovaTech: LabNovaTech[] = [
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
];
