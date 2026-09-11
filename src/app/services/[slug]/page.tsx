import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetailHero from "@/components/services/detail/ServiceDetailHero";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import ServiceUseCases from "@/components/services/detail/ServiceUseCases";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import RelatedServices from "@/components/services/detail/RelatedServices";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { serviceCategories } from "@/data/serviceCategories";
import { getServiceDetail, serviceDetails } from "@/data/serviceDetails";

const siteUrl = "https://codeandmotions.com";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title: detail.seoTitle,
    description: detail.metaDescription,
    alternates: {
      canonical: `/services/${detail.slug}`,
    },
    openGraph: {
      title: `${detail.seoTitle} | Code & Motions`,
      description: detail.metaDescription,
      url: `/services/${detail.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${detail.seoTitle} | Code & Motions`,
      description: detail.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  const category = serviceCategories.find((item) => item.id === slug);

  if (!detail || !category) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: detail.h1,
    description: detail.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
    areaServed: ["Pakistan", "United States", "United Kingdom", "Europe"],
    url: `${siteUrl}/services/${detail.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ServiceDetailHero slug={detail.slug} title={detail.h1} intro={detail.intro} />
        <ServiceOverview
          title={category.title}
          offerings={category.subServices}
          benefits={detail.benefits}
        />
        <ServiceUseCases useCases={detail.useCases} />
        <ServiceFAQSection faqs={detail.faqs} />
        <RelatedServices relatedSlugs={detail.relatedSlugs} />
        <ClosingCTA
          headline={`Ready to start your ${category.title.toLowerCase()} project?`}
          subtext="Tell us what you're building and we'll put together the right plan and team for it."
        />
      </main>

      <Footer />
    </>
  );
}
