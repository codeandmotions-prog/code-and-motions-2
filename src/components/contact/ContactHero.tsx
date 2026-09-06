"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const contactPoints = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "Remote — worldwide",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (000) 000-0000",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "codeandmotions@gmail.com",
    href: "mailto:codeandmotions@gmail.com",
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-28 pt-20 lg:pb-36 lg:pt-24">
      {/* brand gradient wash, same palette as the rest of the site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 15% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />
      <MotionStreaks className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl px-6 text-center lg:px-10"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
        >
          Get in touch
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-[38px] font-extrabold leading-[1.12] tracking-[-0.01em] text-white sm:text-[48px] lg:text-[58px]"
        >
          Let&apos;s Build Something
          <span className="block bg-gradient-to-r from-(--color-cyan) to-(--color-blue-bright) bg-clip-text text-transparent">
            Together.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70 lg:text-[17px]"
        >
          Have a project in mind, need a quote, or just want to say hello?
          Tell us where you&apos;re headed and we&apos;ll help you get there.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-11 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {contactPoints.map(({ icon: Icon, label, value, href }) => {
            const Wrapper = href ? "a" : "div";
            return (
              <Wrapper
                key={label}
                {...(href ? { href } : {})}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)">
                  <Icon size={18} className="text-white" strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-medium text-white/55">
                    {label}
                  </span>
                  <span className="block truncate text-[14px] font-semibold text-white">
                    {value}
                  </span>
                </span>
              </Wrapper>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
