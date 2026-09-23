import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MigrationAssessmentSection from "@/components/tools/migration-checker/MigrationAssessmentSection";
import MigrationWhatItChecks from "@/components/tools/migration-checker/MigrationWhatItChecks";
import MigrationHowItWorks from "@/components/tools/migration-checker/MigrationHowItWorks";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "WooCommerce to Shopify Migration Checker — Free Readiness Score",
  description:
    "Free WooCommerce to Shopify migration checker. Get your Shopify migration readiness score, main risks, and a clear migration checklist — no signup required.",
  keywords: [
    "WooCommerce to Shopify migration",
    "WooCommerce to Shopify migration checker",
    "Shopify migration readiness",
    "WooCommerce Shopify migration",
    "WooCommerce to Shopify",
    "Shopify migration checklist",
    "WooCommerce migration to Shopify",
  ],
  alternates: {
    canonical: "/tools/woocommerce-to-shopify-migration-checker",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free WooCommerce to Shopify Migration Checker | Code & Motions",
    description:
      "Answer a few questions and get your Shopify migration readiness score — main risks, data and SEO considerations, and clear next steps. Free, instant, no signup.",
    url: "/tools/woocommerce-to-shopify-migration-checker",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1262,
        height: 696,
        alt: "Code & Motions — WooCommerce to Shopify Migration Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free WooCommerce to Shopify Migration Checker | Code & Motions",
    description:
      "Answer a few questions and get your Shopify migration readiness score — main risks, data and SEO considerations, and clear next steps. Free, instant, no signup.",
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "Is the WooCommerce to Shopify migration checker free?",
    answer:
      "Yes. The Migration Readiness Checker is completely free to use, with no signup, trial limits, or hidden costs.",
  },
  {
    question: "How is my Shopify migration readiness score calculated?",
    answer:
      "Your score is calculated instantly from the 12 questions you answer — product catalog size, orders, subscriptions, plugins, custom code, SEO priorities, and integrations. Each answer has a fixed, disclosed point value; nothing is random or estimated without basis.",
  },
  {
    question: "What makes a WooCommerce to Shopify migration complex?",
    answer:
      "The biggest factors are usually significant custom code, a large number of active plugins, complex subscription logic, and a large historical order volume — each of these needs its own Shopify-side plan rather than a simple export/import.",
  },
  {
    question: "Will I lose my SEO rankings when migrating from WooCommerce to Shopify?",
    answer:
      "Not if you plan for it. The main risk is your URL structure changing — building a full 301 redirect map from your old WooCommerce URLs to their new Shopify equivalents before launch is the key step to protect your rankings.",
  },
  {
    question: "Can my WooCommerce plugins be replaced on Shopify?",
    answer:
      "Most can — the Shopify App Store covers the vast majority of common WooCommerce plugin functionality (reviews, subscriptions, shipping, marketing). Bespoke custom code is the exception and usually needs to be rebuilt by a developer.",
  },
  {
    question: "Is there a WooCommerce migration to Shopify checklist?",
    answer:
      "Your results include a personalized checklist based on your answers — covering data export, redirects, subscriptions, custom functionality, and a checkout test — plus general next steps like backing up your store before you start.",
  },
];

export default function MigrationCheckerPage() {
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteUrl}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "WooCommerce to Shopify Migration Checker",
        item: `${siteUrl}/tools/woocommerce-to-shopify-migration-checker`,
      },
    ],
  };

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WooCommerce to Shopify Migration Readiness Checker",
    url: `${siteUrl}/tools/woocommerce-to-shopify-migration-checker`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web-based)",
    description:
      "A free WooCommerce to Shopify migration checker that calculates a migration readiness score, main risks, and recommended next steps from a 12-question self-assessment.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <MigrationAssessmentSection />
        <MigrationWhatItChecks />
        <MigrationHowItWorks />
        <ServiceFAQSection faqs={faqs} heading="Migration Checker FAQ" />
        <ClosingCTA
          headline="Need Help Migrating Your Store?"
          subtext="If your report flagged risks or complex custom features, our Shopify development team can plan and execute the migration for you."
          primaryLabel="Talk to Our Shopify Team"
          primaryHref="/services/shopify-development"
        />
      </main>

      <Footer />
    </>
  );
}
