"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Code2,
  Cog,
  Database,
  FileCheck2,
  Globe,
  Headset,
  Layers,
  Plug,
  ShieldCheck,
  Timer,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import type {
  RichChoiceBlock,
  RichCostBlock,
  RichIconKey,
  RichServiceGroup,
  RichTechBlock,
  RichWorkBlock,
} from "@/data/serviceRichSections";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const ICONS: Record<RichIconKey, LucideIcon> = {
  custom: Code2,
  saas: Layers,
  web: Globe,
  crm: Database,
  ai: Brain,
  api: Plug,
  automation: Cog,
  fixed: Wallet,
  hourly: Timer,
  support: Headset,
  ownership: FileCheck2,
  security: ShieldCheck,
};

type Tone = "surface" | "raised";

function toneClass(tone: Tone) {
  return tone === "raised" ? "bg-(--color-surface-raised)" : "bg-(--color-surface)";
}

function SectionHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
        {heading}
      </h2>
      {intro && <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">{intro}</p>}
    </div>
  );
}

/** Card grid used for the services list, engagement models and ownership/support blocks. */
export function ServiceCardGroup({
  group,
  tone = "surface",
  columns = 3,
}: {
  group: RichServiceGroup;
  tone?: Tone;
  columns?: 3 | 4;
}) {
  return (
    <section className={`${toneClass(tone)} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow={group.eyebrow} heading={group.heading} intro={group.intro} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className={`mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
            columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {group.items.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <motion.article
                key={card.title}
                variants={item}
                className="flex h-full flex-col rounded-3xl border border-(--color-line) bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-navy-deep) text-white">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">{card.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-(--color-ink-soft)">
                  {card.description}
                </p>
                {card.link && (
                  <Link
                    href={card.link.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--color-blue) hover:underline"
                  >
                    {card.link.label}
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export function ChoiceSection({ block, tone = "surface" }: { block: RichChoiceBlock; tone?: Tone }) {
  return (
    <section className={`${toneClass(tone)} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-(--color-line) bg-white p-6 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-(--color-blue)">
              {block.rightHeading}
            </p>
            <ul className="mt-5 space-y-3.5">
              {block.rightItems.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-(--color-ink)">
                  <Check size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-(--color-blue)" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-(--color-line) bg-white p-6 sm:p-8">
            <h3 className="text-[19px] font-bold text-(--color-ink)">{block.notRightHeading}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{block.notRightIntro}</p>
            <ul className="mt-5 space-y-3.5">
              {block.notRightItems.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-(--color-ink)">
                  <X size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-(--color-ink-soft)" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {block.closing && (
          <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-(--color-ink-soft)">{block.closing}</p>
        )}
      </div>
    </section>
  );
}

export function CostTimelineSection({ block, tone = "raised" }: { block: RichCostBlock; tone?: Tone }) {
  return (
    <section className={`${toneClass(tone)} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="text-[19px] font-bold text-(--color-ink)">{block.factorsHeading}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3.5">
              {block.factors.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
                  <Check size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-(--color-blue)" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[19px] font-bold text-(--color-ink)">{block.timelineHeading}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{block.timeline}</p>
            <div className="mt-6 space-y-3">
              {block.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-3 rounded-2xl border border-(--color-line) bg-white p-5 transition-colors hover:border-(--color-blue)/40"
                >
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-(--color-blue) transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="text-[14px] leading-relaxed text-(--color-ink-soft)">
                    <span className="font-semibold text-(--color-ink)">{link.label}.</span> {link.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechSection({ block, tone = "surface" }: { block: RichTechBlock; tone?: Tone }) {
  return (
    <section className={`${toneClass(tone)} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <motion.dl
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {block.groups.map((group) => (
            <motion.div
              key={group.label}
              variants={item}
              className="rounded-3xl border border-(--color-line) bg-white p-6"
            >
              <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-(--color-ink-soft)">
                {group.label}
              </dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-(--color-surface) px-3.5 py-1.5 text-[13.5px] font-medium text-(--color-ink)"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-(--color-ink-soft)">{block.note}</p>
      </div>
    </section>
  );
}

export function WorkSection({ block, tone = "raised" }: { block: RichWorkBlock; tone?: Tone }) {
  return (
    <section className={`${toneClass(tone)} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <div className="mt-10 rounded-3xl border border-(--color-line) bg-white p-6 sm:p-8">
          <h3 className="text-[19px] font-bold text-(--color-ink)">{block.featuresHeading}</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {block.features.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-[14.5px] text-(--color-ink)">
                <Check size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-(--color-blue)" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          {block.note && <p className="mt-5 text-[13.5px] text-(--color-ink-soft)">{block.note}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {block.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line) bg-white px-5 py-2.5 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
              >
                {link.label}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
