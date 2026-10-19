import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubServiceHero from "@/components/services/subservice/SubServiceHero";
import ServiceDefinition from "@/components/services/detail/ServiceDefinition";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import ServiceUseCases from "@/components/services/detail/ServiceUseCases";
import ServiceProcessSteps from "@/components/services/detail/ServiceProcessSteps";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { serviceCategories } from "@/data/serviceCategories";
import { getAllSubServiceParams, getSubService } from "@/data/subServices";

const siteUrl = "https://codeandmotions.com";

type SubServicePageProps = {
  params: Promise<{ slug: string; subSlug: string }>;
};

export function generateStaticParams() {
  return getAllSubServiceParams();
}

// Only the statically generated {slug, subSlug} pairs above are servable.
// This keeps externalHref sub-services (which intentionally have no page
// content) from ever being rendered, even on-demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: SubServicePageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const service = getSubService(slug, subSlug);

  if (!service || service.externalHref !== undefined) {
    return {};
  }

  const pageUrl = `${siteUrl}/services/${slug}/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${slug}/${service.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${service.seoTitle} | Code & Motions`,
      description: service.metaDescription,
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
      title: `${service.seoTitle} | Code & Motions`,
      description: service.metaDescription,
      images: ["/images/logo-full.png"],
    },
  };
}

export default async function SubServicePage({ params }: SubServicePageProps) {
  const { slug, subSlug } = await params;
  const service = getSubService(slug, subSlug);
  const category = serviceCategories.find((item) => item.id === slug);

  if (!service || !category || service.externalHref !== undefined) {
    notFound();
  }

  const pageUrl = `${siteUrl}/services/${slug}/${service.slug}`;
  const parentUrl = `${siteUrl}/services/${slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    serviceType: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
    areaServed: ["United States", "United Kingdom", "Europe"],
    url: pageUrl,
    isPartOf: {
      "@type": "Service",
      name: category.title,
      url: parentUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: category.title, item: parentUrl },
      { "@type": "ListItem", position: 4, name: service.h1, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
        <SubServiceHero
          mainSlug={slug}
          subSlug={subSlug}
          parentHref={`/services/${slug}`}
          parentTitle={category.title}
          title={service.h1}
          intro={service.intro}
        />

        <ServiceDefinition question={service.whatIsQuestion} answer={service.whatIsAnswer} />

        <ServiceOverview
          title={service.name}
          offerings={service.capabilities}
          offeringsHeading={service.capabilitiesHeading}
          benefits={service.benefits}
          heading={service.benefitsHeading}
          seeAlso={service.relatedLink}
          relatedTool={service.relatedTool}
        />

        {service.useCases && service.useCases.length > 0 && (
          <ServiceUseCases useCases={service.useCases} heading={service.useCasesHeading} />
        )}

        {service.process && service.process.length > 0 && (
          <ServiceProcessSteps steps={service.process} heading={service.processHeading} />
        )}

        <ServiceFAQSection faqs={service.faqs} heading={service.faqHeading} />

        <ClosingCTA
          headline={`Ready to start your ${service.name.toLowerCase()} project?`}
          subtext="Tell us what you're building and we'll put together the right plan for it."
        />
      </main>

      <Footer />
    </>
  );
}
