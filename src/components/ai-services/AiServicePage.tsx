import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDefinition from "@/components/services/detail/ServiceDefinition";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { aiServiceHref, getAiService } from "@/data/aiServices";
import AiServiceHero from "./AiServiceHero";
import {
  ChallengesSection,
  ConsiderationsSection,
  FeaturesBenefitsSection,
  FitSection,
  HowItWorksSection,
  RelatedLinksSection,
  UseCasesSection,
} from "./AiServiceSections";

const siteUrl = "https://codeandmotions.com";

/** Metadata for one of the five AI service pages. */
export function aiServiceMetadata(slug: string): Metadata {
  const service = getAiService(slug);
  if (!service) return {};
  const path = aiServiceHref(service.slug);
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${service.seoTitle} | Code & Motions`,
      description: service.metaDescription,
      url: `${siteUrl}${path}`,
      type: "website",
      siteName: "Code & Motions",
      locale: "en_US",
      images: [{ url: "/images/logo-full.png", width: 1262, height: 696, alt: "Code & Motions logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.seoTitle} | Code & Motions`,
      description: service.metaDescription,
      images: ["/images/logo-full.png"],
    },
  };
}

/** Shared template for the five AI service pages. */
export default function AiServicePage({ slug }: { slug: string }) {
  const service = getAiService(slug);
  if (!service) notFound();

  const pageUrl = `${siteUrl}${aiServiceHref(service.slug)}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    serviceType: service.name,
    description: service.metaDescription,
    provider: { "@type": "Organization", name: "Code & Motions", url: siteUrl },
    areaServed: ["United States", "United Kingdom", "Europe", "India", "Pakistan"],
    url: pageUrl,
    isPartOf: { "@type": "Service", name: "AI Development Services", url: `${siteUrl}/services/ai-development` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: "AI Development", item: `${siteUrl}/services/ai-development` },
      { "@type": "ListItem", position: 4, name: service.name, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <AiServiceHero
          name={service.name}
          kind={service.kind}
          gradient={service.gradient}
          h1={service.h1}
          intro={service.intro}
        />
        <ServiceDefinition question={service.definition.question} answer={service.definition.answer} />
        <HowItWorksSection service={service} />
        <UseCasesSection service={service} />
        <FeaturesBenefitsSection service={service} />
        <FitSection service={service} />
        <ChallengesSection service={service} />
        <ConsiderationsSection service={service} />
        <ServiceFAQSection faqs={service.faqs} heading={`${service.name}: common questions`} />
        <RelatedLinksSection service={service} />
        <ClosingCTA
          headline={service.ctaHeadline}
          subtext={service.ctaSubtext}
          primaryLabel="Discuss Your Project"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
