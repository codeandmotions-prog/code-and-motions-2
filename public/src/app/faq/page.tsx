import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about Code & Motions' software, web, Shopify, design, video and SEO services — process, response times, pricing, and more.",
  alternates: {
    canonical: "/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FAQ — Frequently Asked Questions | Code & Motions",
    description: "Answers to common questions about working with Code & Motions.",
    url: "/faq",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1262,
        height: 696,
        alt: "Code & Motions logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Frequently Asked Questions | Code & Motions",
    description: "Answers to common questions about working with Code & Motions.",
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "What services does Code & Motions offer?",
    answer:
      "We offer software development, website development, Shopify development, video & animation, graphic design, and SEO — all under one team. You can browse each service in detail on our services page.",
  },
  {
    question: "How quickly does Code & Motions respond to enquiries?",
    answer:
      "We usually reply within 24 hours. You can reach us through our contact page, by email, or by WhatsApp.",
  },
  {
    question: "Who does Code & Motions work with?",
    answer:
      "We work with businesses across the USA, UK, Europe, and beyond — from startups launching a first product to established companies modernizing their software, websites, or Shopify stores.",
  },
  {
    question: "How do I start a project with Code & Motions?",
    answer:
      "Reach out through our contact page with a short description of what you need. We'll follow up to discuss scope, timeline, and next steps.",
  },
  {
    question: "Does Code & Motions offer any free tools?",
    answer:
      "Yes. Our free tools include a Shopify Speed & App Bloat Checker, a WooCommerce → Shopify Migration Readiness Checker, and a SaaS MVP Cost & Timeline Estimator — all available on our tools page with no signup required.",
  },
  {
    question: "What is LabNova?",
    answer:
      "LabNova is our laboratory management software — a Windows desktop application built to simplify and automate laboratory operations. You can learn more on our software page.",
  },
  {
    question: "Do you offer website maintenance and support after launch?",
    answer:
      "Website redesign and maintenance is one of our website development offerings. Get in touch to discuss ongoing support for an existing site.",
  },
  {
    question: "What is your refund and cancellation policy?",
    answer:
      "Our general approach to cancellations and refunds is outlined on our Refund & Cancellation Policy page. The specific terms of your project agreement take precedence.",
  },
  {
    question: "How does Code & Motions handle my personal information?",
    answer:
      "Details on what information we collect and how we use it are available on our Privacy Policy page.",
  },
];

export default function FaqPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <LegalHero
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Answers to the questions we hear most about our services, process, and how we work with clients."
          breadcrumbLabel="FAQ"
        />

        <ServiceFAQSection faqs={faqs} heading="Common Questions" />

        <ClosingCTA
          headline="Still have questions?"
          subtext="We're happy to talk through your project, timeline, and budget — no obligation."
          primaryLabel="Contact Us"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
