import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolsHero from "@/components/tools/ToolsHero";
import CalculatorDirectory from "@/components/tools/CalculatorDirectory";
import ToolsGrid from "@/components/tools/ToolsGrid";
import WhyUseTools from "@/components/tools/WhyUseTools";
import HowToolsWork from "@/components/tools/HowToolsWork";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { freeTools } from "@/data/tools";
import { calculators } from "@/data/calculators/registry";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Free Online Calculators & Digital Business Tools",
  description:
    "Free online calculators for money, health, maths and everyday questions, plus Code & Motions tools for Shopify speed, WooCommerce migration and SaaS MVP planning. No signup required.",
  alternates: {
    canonical: "/tools",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free Online Calculators & Digital Business Tools | Code & Motions",
    description:
      "Free calculators for money, health, maths and everyday questions, plus tools for Shopify, WooCommerce and SaaS planning. No signup required.",
    url: "/tools",
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
    title: "Free Online Calculators & Digital Business Tools | Code & Motions",
    description:
      "Free calculators for money, health, maths and everyday questions, plus tools for Shopify, WooCommerce and SaaS planning. No signup required.",
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "What kinds of calculators are included?",
    answer:
      `The collection has ${calculators.length} calculators in four groups: financial (mortgage, loan, compound interest, ROI and VAT), fitness and health (BMI, BMR, calories, body fat and heart-rate zones), maths (arithmetic, algebra, statistics and geometry) and everyday tools (age, dates, tips, fuel cost and unit conversion).`,
  },
  {
    question: "Do the calculators send my numbers anywhere?",
    answer:
      "No. Every calculator runs in your browser, so the values you enter are not sent to our servers.",
  },
  {
    question: "Can I rely on the health calculators for medical decisions?",
    answer:
      "No. They give general estimates for information only and are not a diagnosis or medical advice. Speak to a doctor or registered dietitian before changing your diet, training or medication.",
  },
  {
    question: "Are these tools free?",
    answer:
      "Yes. All Code & Motions tools are completely free to use, with no hidden costs or trial limits.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. You don't need to sign up or create an account — just enter the relevant information and get your result.",
  },
  {
    question: "Are the results estimates?",
    answer:
      "Yes. Each tool gives you a practical, well-informed estimate based on the details you provide, not a guaranteed or exact figure. They're designed to help you plan and make decisions with confidence.",
  },
  {
    question: "Can Code & Motions help with the recommendations?",
    answer:
      "Absolutely. If a tool's result points to an opportunity or a project worth pursuing, our team can help you plan and execute it — just reach out and tell us what you're working on.",
  },
];

export default function ToolsPage() {
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Tools",
        item: `${siteUrl}/tools`,
      },
    ],
  };

  // Anchor-only cards (such as All Calculators) are not separate pages, so they stay out of the ItemList.
  const availableTools = freeTools.filter((tool) => tool.href && !tool.href.includes("#"));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: availableTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${siteUrl}${tool.href}`,
    })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ToolsHero />
        <CalculatorDirectory />
        <ToolsGrid />
        <WhyUseTools />
        <HowToolsWork />
        <ServiceFAQSection faqs={faqs} heading="Frequently Asked Questions" />
        <ClosingCTA
          headline="Need Help With Your Project?"
          subtext="If a tool's result points to something worth building, our team can help you plan it and bring it to life."
          primaryLabel="Talk to Code & Motions"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
