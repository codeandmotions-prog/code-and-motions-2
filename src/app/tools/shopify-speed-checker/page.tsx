import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopifyCheckerSection from "@/components/tools/shopify-checker/ShopifyCheckerSection";
import WhatThisChecks from "@/components/tools/shopify-checker/WhatThisChecks";
import WhyStoresSlow from "@/components/tools/shopify-checker/WhyStoresSlow";
import CheckerHowItWorks from "@/components/tools/shopify-checker/CheckerHowItWorks";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Shopify Speed Checker — Free Shopify Store Speed Test",
  description:
    "Free Shopify Speed Checker & App Bloat Checker. Run a real Shopify store speed test, find apps slowing down your store, and get clear fixes — no login required.",
  keywords: [
    "Shopify Speed Checker",
    "Shopify Store Speed Checker",
    "Shopify Speed Test",
    "Shopify Performance Checker",
    "Shopify Website Speed Test",
    "Shopify App Bloat Checker",
    "Shopify App Detector",
    "Shopify Speed Optimization",
    "Shopify Store Performance",
  ],
  alternates: {
    canonical: "/tools/shopify-speed-checker",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free Shopify Speed Checker & App Bloat Checker | Code & Motions",
    description:
      "Run a real Shopify store speed test and find out which apps and scripts are slowing it down. Free, instant, no signup required.",
    url: "/tools/shopify-speed-checker",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1262,
        height: 696,
        alt: "Code & Motions — Shopify Speed & App Bloat Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Shopify Speed Checker & App Bloat Checker | Code & Motions",
    description:
      "Run a real Shopify store speed test and find out which apps and scripts are slowing it down. Free, instant, no signup required.",
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "Is the Shopify speed checker free?",
    answer:
      "Yes. The Shopify Speed & App Bloat Checker is completely free to use, with no signup, trial limits, or hidden costs.",
  },
  {
    question: "Why is my Shopify store slow?",
    answer:
      "The most common causes are too many installed apps each loading their own script, unoptimized or heavily customized theme code, render-blocking scripts and stylesheets in <head>, and heavy unoptimized images. Run the checker above to see which of these actually apply to your store.",
  },
  {
    question: "Do I need Shopify admin access?",
    answer:
      "No. We only analyze what's publicly visible on your storefront's homepage — no login, password, or admin access is required.",
  },
  {
    question: "Does this tool work as a Shopify app detector?",
    answer:
      "Yes, to an extent. We detect apps and third-party services that load a visible script or stylesheet on your public homepage. Apps that only run in the Shopify admin, or that load exclusively on other pages like checkout, won't show up here.",
  },
  {
    question: "How can I improve my Shopify store speed?",
    answer:
      "Start with what the report flags: remove unused apps, defer or move non-critical scripts out of <head>, and compress heavy images. If you want a deeper audit and hands-on Shopify speed optimization, our Shopify development team can help.",
  },
  {
    question: "Can this tool identify scripts affecting performance?",
    answer:
      "Yes. The report lists third-party scripts detected on your homepage and flags which ones are render-blocking, so you can see exactly what's loading and where it sits in the page.",
  },
];

export default function ShopifySpeedCheckerPage() {
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
        name: "Shopify Speed & App Bloat Checker",
        item: `${siteUrl}/tools/shopify-speed-checker`,
      },
    ],
  };

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopify Speed & App Bloat Checker",
    url: `${siteUrl}/tools/shopify-speed-checker`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web-based)",
    description:
      "A free Shopify speed checker that tests a public Shopify storefront's response time, render-blocking resources, and third-party app and script bloat, then gives clear, real recommendations.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ShopifyCheckerSection />
        <WhatThisChecks />
        <WhyStoresSlow />
        <CheckerHowItWorks />
        <ServiceFAQSection faqs={faqs} heading="Shopify Speed Checker FAQ" />
        <ClosingCTA
          headline="Need Help Optimizing Your Shopify Store?"
          subtext="If your report flagged app bloat or slow load times, our Shopify development team can fix it for you."
          primaryLabel="Talk to Our Shopify Team"
          primaryHref="/services/shopify-development"
        />
      </main>

      <Footer />
    </>
  );
}
