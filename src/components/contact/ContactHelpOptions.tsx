"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarCheck, Code2, Users } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const options = [
  {
    icon: CalendarCheck,
    title: "Free consultation",
    description:
      "We listen to your requirements and give you an initial response and guidance.",
    cta: "Book a free consultation",
    href: contactInfo.whatsappConsultationHref,
    external: true,
  },
  {
    icon: Code2,
    title: "Paid web development consultation",
    description:
      "Our web development consulting gives you detailed strategies, expert recommendations, proper planning and implementation guidance.",
    cta: "Explore website development",
    href: "/services/website-development",
    external: false,
  },
  {
    icon: Users,
    title: "Dedicated developers and teams",
    description:
      "We offer dedicated developers and teams as well as project-based work, so you can hire a software development team or hand us a project from start to finish.",
    cta: "Explore software development",
    href: "/services/software-development",
    external: false,
  },
];

export default function ContactHelpOptions() {
  return (
    <section
      aria-labelledby="contact-help-heading"
      className="border-b border-(--color-line) bg-(--color-surface-raised) px-6 py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="contact-help-heading"
            className="text-[26px] font-extrabold leading-tight text-(--color-ink) sm:text-[30px]"
          >
            How can we help?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
            Start with a free conversation, book a paid web development
            consultation, or talk to us about dedicated developers and
            project-based work.
          </p>
        </div>

        <ul className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {options.map(({ icon: Icon, title, description, cta, href, external }, index) => (
            <motion.li
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col rounded-[28px] border border-(--color-line) bg-white p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
                <Icon size={21} className="text-(--color-blue)" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">{title}</h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                {description}
              </p>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-(--color-blue) transition-colors hover:text-(--color-ink)"
              >
                {cta}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
