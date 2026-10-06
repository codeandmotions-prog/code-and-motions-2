import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetailHero from "@/components/services/detail/ServiceDetailHero";
import ServiceDefinition from "@/components/services/detail/ServiceDefinition";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import AiSubServicesGrid from "@/components/services/ai-development/AiSubServicesGrid";
import AiProcessSteps from "@/components/services/ai-development/AiProcessSteps";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import RelatedServices from "@/components/services/detail/RelatedServices";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { aiDevelopment } from "@/data/aiDevelopment";

const siteUrl = "https://codeandmotions.com";
const pageUrl = `${siteUrl}/services/ai-development`;

export const metadata: Metadata = {
  title: aiDevelopment.seoTitle,
  description: aiDevelopment.metaDescription,
  alternates: {
    canonical: "/services/ai-development",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${aiDevelopment.seoTitle} | Code & Motions`,
    description: aiDevelopment.metaDescription,
    url: pageUrl,
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
    title: `${aiDevelopment.seoTitle} | Code & Motions`,
    description: aiDevelopment.metaDescription,
    images: ["/images/logo-full.png"],
  },
};

export default function AiDevelopmentPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: aiDevelopment.h1,
    serviceType: "AI Development",
    description: aiDevelopment.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
    areaServed: ["United States", "United Kingdom", "Europe"],
    url: pageUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Development Sub-Services",
      itemListElement: [
        "AI Video Development",
        "AI Website Development",
        "AI Image Creation",
        "AI Software Development",
        "AI Design",
        "AI Agents for Healthcare, Laboratories & Schools",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
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
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: aiDevelopment.h1,
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aiDevelopment.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ServiceDetailHero slug="ai-development" title={aiDevelopment.h1} intro={aiDevelopment.intro} />

        {aiDevelopment.whatIsQuestion && aiDevelopment.whatIsAnswer && (
          <ServiceDefinition
            question={aiDevelopment.whatIsQuestion}
            answer={aiDevelopment.whatIsAnswer}
          />
        )}

        <ServiceOverview
          title="AI Development"
          offerings={aiDevelopment.capabilities}
          offeringsHeading={aiDevelopment.capabilitiesHeading}
          benefits={aiDevelopment.benefits}
          heading={aiDevelopment.benefitsHeading}
        />

        <AiSubServicesGrid />

        <AiProcessSteps heading="Our AI Development Process" />

        <ServiceFAQSection faqs={aiDevelopment.faqs} heading={aiDevelopment.faqHeading} />

        <RelatedServices relatedSlugs={aiDevelopment.relatedSlugs} />

        <ClosingCTA
          headline="Ready to build with AI?"
          subtext="Tell us what you're building and we'll help you find the most practical way to put AI to work in it."
        />
      </main>

      <Footer />
    </>
  );
}
