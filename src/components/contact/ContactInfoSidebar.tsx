"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const contactPoints = [
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — worldwide",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (000) 000-0000",
    href: "tel:+10000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "codeandmotions@gmail.com",
    href: "mailto:codeandmotions@gmail.com",
  },
];

export default function ContactInfoSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-[28px] border border-(--color-line) bg-white p-7"
      >
        <h2 className="text-[16px] font-bold text-(--color-ink)">Contact Information</h2>
        <ul className="mt-5 space-y-5">
          {contactPoints.map(({ icon: Icon, label, value, href }) => {
            const Wrapper = href ? Link : "div";
            return (
              <li key={label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)/10">
                  <Icon size={17} className="text-(--color-blue)" strokeWidth={1.9} />
                </span>
                <div className="min-w-0 pt-1">
                  <span className="block text-[12px] font-medium text-(--color-ink-soft)">
                    {label}
                  </span>
                  {href ? (
                    <Wrapper
                      href={href}
                      className="block truncate text-[14.5px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-blue)"
                    >
                      {value}
                    </Wrapper>
                  ) : (
                    <span className="block truncate text-[14.5px] font-semibold text-(--color-ink)">
                      {value}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1 }}
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
          <h2 className="text-[19px] font-bold leading-snug text-white">
            Have an idea?
            <span className="block text-(--color-cyan)">Let&apos;s make it happen.</span>
          </h2>
          <Link
            href="#contact-form"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            Get Started
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
