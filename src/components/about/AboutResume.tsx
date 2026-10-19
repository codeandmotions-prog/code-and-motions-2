"use client";

import { motion, type Variants } from "framer-motion";
import { Download, Eye, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const RESUME_URL = "/resume/Muhammad-Shehroz-Resume.pdf";

const skills = [
  "Custom 2D Animation",
  "Video Editing",
  "AI Development",
  "Software Development",
  "Website Development",
  "Angular Development",
];

const labelClass =
  "text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)";

export default function AboutResume() {
  return (
    <section id="resume" className="scroll-mt-24 bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <span className={labelClass}>Resume</span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              Muhammad Shehroz
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
              Two years of experience across 2D animation, video editing and
              software, web and AI development.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-line) bg-white px-7 py-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
            >
              <Eye size={18} aria-hidden="true" />
              View Resume
            </a>
            <a
              href={RESUME_URL}
              download="Muhammad-Shehroz-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-navy)"
            >
              <Download size={18} aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Profile / contact card */}
          <div
            className="relative overflow-hidden rounded-[28px] p-8 text-white sm:p-10"
            style={{
              background: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-28 w-28 rotate-45 bg-white/10"
            />
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-[22px] font-extrabold backdrop-blur-sm">
                MS
              </div>
              <h3 className="mt-6 text-[22px] font-extrabold">Muhammad Shehroz</h3>
              <p className="mt-1 text-[14px] font-medium text-(--color-cyan-soft)">
                2D Animation, Video &amp; Development
              </p>

              <ul className="mt-8 space-y-4 text-[14.5px]">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-(--color-cyan-soft)" aria-hidden="true" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="break-all underline-offset-4 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-(--color-cyan-soft)" aria-hidden="true" />
                  <a href={contactInfo.phoneTel} className="underline-offset-4 hover:underline">
                    {contactInfo.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-(--color-cyan-soft)" aria-hidden="true" />
                  <span>Bhagtanwala, Sargodha, Pakistan</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Resume content */}
          <div className="rounded-[28px] border border-(--color-line) bg-white p-8 sm:p-10">
            <div>
              <h3 className={labelClass}>Professional Summary</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
                Creative and technical professional with 2 years of experience
                across custom 2D animation, video editing, and software,
                website, Angular and AI development. Combines visual
                storytelling with practical engineering to produce clear,
                well-structured digital work.
              </p>
            </div>

            <div className="mt-9">
              <h3 className={labelClass}>Professional Skills</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-(--color-surface) px-4 py-2 text-[13.5px] font-semibold text-(--color-ink)"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-(--color-surface) p-6">
                <Briefcase size={22} className="text-(--color-blue)" aria-hidden="true" />
                <h3 className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                  Experience
                </h3>
                <p className="mt-3 text-[16px] font-bold text-(--color-ink)">2 years</p>
                <p className="mt-1 text-[14px] leading-relaxed text-(--color-ink-soft)">
                  Animation, video editing and development work.
                </p>
              </div>
              <div className="rounded-2xl bg-(--color-surface) p-6">
                <GraduationCap size={22} className="text-(--color-blue)" aria-hidden="true" />
                <h3 className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                  Education
                </h3>
                <p className="mt-3 text-[16px] font-bold text-(--color-ink)">
                  Intermediate (Class 11–12)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
