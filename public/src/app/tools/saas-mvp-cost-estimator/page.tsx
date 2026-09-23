import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MvpEstimatorSection from "@/components/tools/mvp-estimator/MvpEstimatorSection";
import MvpContentSections from "@/components/tools/mvp-estimator/MvpContentSections";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "SaaS MVP Cost Calculator — Free Cost & Timeline Estimator",
  description:
    "Free SaaS MVP cost calculator. Estimate your SaaS or software MVP development cost and timeline from your actual features — instant, no signup required.",
  keywords: [
    "SaaS MVP cost calculator",
    "SaaS MVP cost estimator",
    "MVP development cost calculator",
    "SaaS development cost estimator",
    "SaaS MVP development cost",
    "how much does it cost to build a SaaS",
    "SaaS development timeline",
    "MVP development timeline",
    "software development cost calculator",
    "SaaS project cost estimate",
  ],
  alternates: {
    canonical: "/tools/saas-mvp-cost-estimator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free SaaS MVP Cost & Timeline Estimator | Code & Motions",
    description:
      "Answer a few questions about your project and get a real SaaS MVP cost and timeline range — major cost drivers, considerations, and priorities. Free, instant, no signup.",
    url: "/tools/saas-mvp-cost-estimator",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1262,
        height: 696,
        alt: "Code & Motions — SaaS MVP Cost & Timeline Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SaaS MVP Cost & Timeline Estimator | Code & Motions",
    description:
      "Answer a few questions about your project and get a real SaaS MVP cost and timeline range — major cost drivers, considerations, and priorities. Free, instant, no signup.",
    images: ["/images/logo-full.png"],
  },
};

const faqs = [
  {
    question: "Is the SaaS MVP cost calculator free?",
    answer:
      "Yes. The SaaS MVP Cost & Timeline Estimator is completely free to use, with no signup, trial limits, or hidden costs.",
  },
  {
    question: "How is my SaaS MVP cost estimate calculated?",
    answer:
      "Your estimate is calculated instantly from the 16 questions you answer — project type, authentication, user roles, features, integrations, data complexity, and more. Each answer has a fixed, disclosed point value, and your total points feed a transparent formula. Nothing is random or fabricated.",
  },
  {
    question: "How much does it cost to build a SaaS MVP?",
    answer:
      "It depends entirely on scope. A lean, single-feature MVP can cost a few thousand dollars, while a complex, multi-tenant platform with AI features and advanced permissions can run into six figures. Use the estimator above for a range based on your actual project.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "Most MVPs take between four and twelve weeks, depending on feature count, integrations, and design complexity. Larger or AI-heavy builds can take considerably longer. Your personalized timeline range is shown alongside your cost estimate.",
  },
  {
    question: "Is this estimate a guaranteed quote?",
    answer:
      "No — this is an estimated range based on a self-reported assessment, not a guaranteed price. Your final cost depends on a detailed project scope, which our team can help you define.",
  },
  {
    question: "What's the difference between an MVP and a full product?",
    answer:
      "An MVP includes only the features needed to validate your core value proposition with real users. A full product adds the remaining features and scale-focused work once you have real usage data. Estimating them separately helps control cost and risk.",
  },
];

export default function MvpEstimatorPage() {
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
        name: "SaaS MVP Cost & Timeline Estimator",
        item: `${siteUrl}/tools/saas-mvp-cost-estimator`,
      },
    ],
  };

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SaaS MVP Cost & Timeline Estimator",
    url: `${siteUrl}/tools/saas-mvp-cost-estimator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web-based)",
    description:
      "A free SaaS MVP cost and timeline estimator that calculates an estimated cost range, timeline range, and cost drivers from a 16-question self-assessment.",
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
        <MvpEstimatorSection />
        <MvpContentSections />
        <ServiceFAQSection faqs={faqs} heading="MVP Cost Estimator FAQ" />
        <ClosingCTA
          headline="Want a Detailed Quote for Your MVP?"
          subtext="If your estimate points to a bigger build than expected, our software development team can scope a leaner MVP or plan your full build in phases."
          primaryLabel="Get a Detailed Quote"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
