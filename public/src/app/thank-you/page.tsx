import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionStreaks from "@/components/MotionStreaks";
import { CheckCircle2, ArrowRight, Mail, Search, PhoneCall } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

// Post-conversion confirmation page — intended as a redirect target after a
// successful contact form submission or Google Ads conversion. Kept out of
// the sitemap and main navigation, and marked noindex so it doesn't appear
// as a search result in its own right.
export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Code & Motions. We've received your message and will be in touch soon.",
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const nextSteps = [
  {
    icon: Mail,
    title: "We Review Your Message",
    description: "Your enquiry lands directly in our inbox and gets a first look from our team.",
  },
  {
    icon: PhoneCall,
    title: "We Get Back to You",
    description: "We usually reply within 24 hours to discuss your project and next steps.",
  },
  {
    icon: Search,
    title: "We Scope Your Project",
    description: "If it's a good fit, we'll walk through timeline, scope, and budget together.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <section className="relative overflow-hidden bg-(--color-navy-deep) pb-20 pt-20 lg:pb-24 lg:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(120% 100% at 50% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
            }}
          />
          <MotionStreaks className="pointer-events-none absolute -right-20 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />
          <MotionStreaks className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 -scale-x-100 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

          <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--color-cyan)/15">
              <CheckCircle2 size={32} className="text-(--color-cyan)" strokeWidth={1.75} />
            </span>

            <h1 className="mt-7 text-[34px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[44px]">
              Thank You!
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-relaxed text-white/70">
              Your message has been received. We appreciate you reaching out to Code &amp; Motions — we&apos;ll be
              in touch soon.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
              >
                Back to Homepage
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white"
              >
                Browse Our Services
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-(--color-surface) px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-xl text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                What Happens Next
              </span>
              <h2 className="mt-4 text-[26px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[30px]">
                Here&apos;s what to expect
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {nextSteps.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-(--color-line) bg-white p-6 text-center sm:text-left"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-blue)/10 sm:mx-0">
                    <Icon size={19} className="text-(--color-blue)" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-bold text-(--color-ink)">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-(--color-line) bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-[14px] text-(--color-ink-soft)">
                Need to reach us sooner? Message us directly on WhatsApp.
              </p>
              <Link
                href={contactInfo.whatsappConsultationHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--color-ink) px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-(--color-blue)"
              >
                <Image src="/images/whatsapp-icon.png" alt="" width={299} height={299} className="h-[16px] w-[16px]" />
                WhatsApp Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/*
        Google Ads / GA4 conversion tracking:
        Add your Google Ads conversion tracking snippet (gtag 'conversion' event)
        or GA4 conversion event here once you have your Conversion ID / label.
        None is included by default since we don't have a real ID to add.
      */}
    </>
  );
}
