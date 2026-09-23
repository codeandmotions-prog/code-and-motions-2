"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Clock, FileText, ShieldCheck, Users, Mail, Phone, CalendarCheck } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { contactInfo } from "@/data/contactInfo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const expectations = [
  {
    icon: Clock,
    title: "Quick Response",
    description: "We typically reply within 24 hours.",
  },
  {
    icon: FileText,
    title: "A Clear Proposal",
    description: "A straightforward scope and next steps, not just a sales call.",
  },
  {
    icon: ShieldCheck,
    title: "No Pressure",
    description: "Honest advice, with zero obligation to move forward.",
  },
  {
    icon: Users,
    title: "Talk to the Team",
    description: "You'll hear directly from the people who'd actually build it.",
  },
];

const contactPoints = [
  {
    kind: "lucide" as const,
    Icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    kind: "lucide" as const,
    Icon: Phone,
    label: "Phone",
    value: contactInfo.phoneDisplay,
    href: contactInfo.phoneTel,
  },
  {
    kind: "social" as const,
    network: "whatsapp" as const,
    label: "WhatsApp",
    value: contactInfo.phoneDisplay,
    href: contactInfo.whatsappHref,
  },
  {
    kind: "social" as const,
    network: "instagram" as const,
    label: "Instagram",
    value: contactInfo.instagramHandle,
    href: contactInfo.instagramUrl,
  },
];

export default function ContactInfoSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* What to Expect */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden rounded-[28px] bg-(--color-navy-deep) p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 100% 0%, #14245c 0%, #0b1c4d 60%, transparent 100%)",
          }}
        />
        <div className="relative">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)">
            What to Expect
          </span>
          <ul className="mt-5 space-y-4">
            {expectations.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Icon size={16} className="text-(--color-cyan)" strokeWidth={1.9} />
                </span>
                <div className="pt-0.5">
                  <p className="text-[14px] font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/55">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Contact Details */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.08 }}
        className="rounded-[28px] border border-(--color-line) bg-white p-7"
      >
        <h2 className="text-[16px] font-bold text-(--color-ink)">Contact Details</h2>
        <ul className="mt-5 space-y-5">
          {contactPoints.map((point) => (
            <li key={point.label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)/10">
                {point.kind === "social" ? (
                  <SocialIcon network={point.network} size={17} className="text-(--color-blue)" />
                ) : (
                  <point.Icon size={17} className="text-(--color-blue)" strokeWidth={1.9} />
                )}
              </span>
              <div className="min-w-0 pt-1">
                <span className="block text-[12px] font-medium text-(--color-ink-soft)">
                  {point.label}
                </span>
                <Link
                  href={point.href}
                  target={point.href.startsWith("http") ? "_blank" : undefined}
                  rel={point.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block truncate text-[14.5px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-blue)"
                >
                  {point.value}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Book Free Consultation */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.16 }}
        className="rounded-[28px] border border-(--color-line) bg-(--color-surface) p-7 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
          <CalendarCheck size={22} className="text-(--color-blue)" strokeWidth={1.9} />
        </span>
        <h2 className="mt-4 text-[16px] font-bold text-(--color-ink)">
          Prefer to Talk?
        </h2>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          Message us on WhatsApp to set up a free consultation call.
        </p>
        <Link
          href={contactInfo.whatsappConsultationHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-(--color-ink)"
        >
          <CalendarCheck size={16} />
          Book Free Consultation
        </Link>
      </motion.div>
    </div>
  );
}
