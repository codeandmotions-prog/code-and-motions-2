import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsGrid from "@/components/tools/ToolsGrid";
import WhyUseTools from "@/components/tools/WhyUseTools";
import HowToolsWork from "@/components/tools/HowToolsWork";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { freeTools } from "@/data/tools";

const siteUrl = "https://codeandmotions.com";

const TOOLS_TITLE = "Free Digital Business Tools & Calculators";
const TOOLS_DESCRIPTION =
  "Check Shopify store speed, plan a WooCommerce to Shopify migration, estimate a SaaS MVP cost, or browse 53 free online calculators. No signup required.";

export const metadata: Metadata = {
  title: TOOLS_TITLE,
  description: TOOLS_DESCRIPTION,
  alternates: {
    canonical: "/tools",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${TOOLS_TITLE} | Code & Motions`,
    description: TOOLS_DESCRIPTION,
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
    title: `${TOOLS_TITLE} | Code & Motions`,
    description: TOOLS_DESCRIPTION,
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "Are these tools free?",
    answer:
      "Yes. All Code & Motions tools are completely free to use, with no hidden costs or trial limits.",
  },
  {
    question: "Which tool should I start with?",
    answer:
      "Use the Shopify Speed Checker to look at a live store's performance, the WooCommerce to Shopify Migration Checker to scope a platform move, and the SaaS MVP Cost Estimator to plan a first software release. For money, health, maths and everyday questions, open the free online calculators directory.",
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

  const availableTools = freeTools.filter((tool) => tool.href);

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

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TOOLS_TITLE,
    url: `${siteUrl}/tools`,
    description: TOOLS_DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Code & Motions", url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
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
