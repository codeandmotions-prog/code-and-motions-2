import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiSubServiceHero from "@/components/services/ai-development/AiSubServiceHero";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { aiSubServices, getAiSubService } from "@/data/aiDevelopment";

const siteUrl = "https://codeandmotions.com";

type AiSubServicePageProps = {
  params: Promise<{ subSlug: string }>;
};

export function generateStaticParams() {
  return aiSubServices.map((service) => ({ subSlug: service.slug }));
}

export async function generateMetadata({ params }: AiSubServicePageProps): Promise<Metadata> {
  const { subSlug } = await params;
  const service = getAiSubService(subSlug);

  if (!service) {
    return {};
  }

  const pageUrl = `${siteUrl}/services/ai-development/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/ai-development/${service.slug}`,
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

export default async function AiSubServicePage({ params }: AiSubServicePageProps) {
  const { subSlug } = await params;
  const service = getAiSubService(subSlug);

  if (!service) {
    notFound();
  }

  const pageUrl = `${siteUrl}/services/ai-development/${service.slug}`;

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
      name: "AI Development Services",
      url: `${siteUrl}/services/ai-development`,
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
        name: "AI Development",
        item: `${siteUrl}/services/ai-development`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: service.h1,
        item: pageUrl,
      },
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
        <AiSubServiceHero slug={service.slug} title={service.h1} intro={service.intro} />

        <ServiceOverview
          title={service.name}
          offerings={service.capabilities}
          benefits={service.benefits}
          heading={service.benefitsHeading}
          exampleWork={service.relatedLink}
        />

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
