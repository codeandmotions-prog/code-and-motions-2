import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetailHero from "@/components/services/detail/ServiceDetailHero";
import ServiceDefinition from "@/components/services/detail/ServiceDefinition";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import ServiceUseCases from "@/components/services/detail/ServiceUseCases";
import ServiceProcessSteps from "@/components/services/detail/ServiceProcessSteps";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import RelatedServices from "@/components/services/detail/RelatedServices";
import {
  ChoiceSection,
  CostTimelineSection,
  ServiceCardGroup,
  TechSection,
  WorkSection,
} from "@/components/services/detail/ServiceRichSections";
import ClosingCTA from "@/components/shared/ClosingCTA";
import SubServicesGrid from "@/components/services/subservice/SubServicesGrid";
import { serviceCategories } from "@/data/serviceCategories";
import { getServiceDetail, serviceDetails } from "@/data/serviceDetails";
import { getSubServicesForMainService } from "@/data/subServices";

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
      title: `${detail.seoTitle} | Code & Motions`,
      description: detail.metaDescription,
      images: ["/images/logo-full.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  const category = serviceCategories.find((item) => item.id === slug);
  const subServices = getSubServicesForMainService(slug);
  const rich = detail?.richSections;

  if (!detail || !category) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: detail.h1,
    serviceType: category.title,
    description: detail.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
    areaServed: detail.areaServed ?? ["United States", "United Kingdom", "Europe"],
    url: `${siteUrl}/services/${detail.slug}`,
    ...(subServices.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${category.title} Sub-Services`,
        itemListElement: subServices.map((sub) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: sub.name,
          },
        })),
      },
    }),
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
        name: detail.h1,
        item: `${siteUrl}/services/${detail.slug}`,
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ServiceDetailHero slug={detail.slug} title={detail.h1} intro={detail.intro} />
        {detail.whatIsQuestion && detail.whatIsAnswer && (
          <ServiceDefinition question={detail.whatIsQuestion} answer={detail.whatIsAnswer} />
        )}
        {detail.pageSections ? (
          detail.pageSections.map((section, index) => {
            switch (section.type) {
              case "cards":
                return (
                  <ServiceCardGroup
                    key={`cards-${index}`}
                    group={section.group}
                    tone={section.tone}
                    columns={section.columns}
                  />
                );
              case "overview":
                return (
                  <ServiceOverview
                    key="overview"
                    title={category.title}
                    offerings={category.subServices}
                    benefits={detail.benefits}
                    heading={detail.overviewHeading}
                    benefitsOnly
                  />
                );
              case "usecases":
                return (
                  <ServiceUseCases
                    key="usecases"
                    useCases={detail.useCases}
                    heading={detail.useCasesHeading}
                  />
                );
              case "process":
                return detail.process && detail.process.length > 0 ? (
                  <ServiceProcessSteps
                    key="process"
                    steps={detail.process}
                    heading={detail.processHeading}
                  />
                ) : null;
              case "subgrid":
                return (
                  <SubServicesGrid
                    key={`subgrid-${index}`}
                    mainSlug={slug}
                    heading={section.heading}
                    subheading={section.subheading}
                    slugs={section.slugs}
                    sectionId={section.id}
                    raised={section.raised}
                  />
                );
              case "cost":
                return <CostTimelineSection key="cost" block={section.block} tone={section.tone} />;
              case "tech":
                return <TechSection key="tech" block={section.block} tone={section.tone} />;
            }
          })
        ) : rich ? (
          <>
            <ServiceCardGroup group={rich.services} tone="raised" />
            <ChoiceSection block={rich.choice} tone="surface" />
            <ServiceOverview
              title={category.title}
              offerings={category.subServices}
              benefits={detail.benefits}
              heading={detail.overviewHeading}
              benefitsOnly
            />
            <ServiceUseCases useCases={detail.useCases} heading={detail.useCasesHeading} />
            <SubServicesGrid
              mainSlug={slug}
              heading={rich.industryGroup.heading}
              subheading={rich.industryGroup.subheading}
              slugs={rich.industryGroup.slugs}
              sectionId="industry-software"
              raised
            />
            <SubServicesGrid
              mainSlug={slug}
              heading={rich.planningGroup.heading}
              subheading={rich.planningGroup.subheading}
              slugs={rich.planningGroup.slugs}
              sectionId="planning-software"
            />
            {detail.process && detail.process.length > 0 && (
              <ServiceProcessSteps steps={detail.process} heading={detail.processHeading} />
            )}
            <ServiceCardGroup group={rich.engagement} tone="raised" />
            <CostTimelineSection block={rich.cost} tone="surface" />
            <TechSection block={rich.tech} tone="raised" />
            <ServiceCardGroup group={rich.assurance} tone="surface" />
            <WorkSection block={rich.work} tone="raised" />
          </>
        ) : (
          <>
            <ServiceOverview
              title={category.title}
              offerings={category.subServices}
              benefits={detail.benefits}
              heading={detail.overviewHeading}
              exampleWork={detail.exampleWork}
              relatedTool={detail.relatedTool}
            />
            <ServiceUseCases useCases={detail.useCases} heading={detail.useCasesHeading} />
            {subServices.length > 0 && (
              <SubServicesGrid
                mainSlug={slug}
                heading={detail.subServicesHeading ?? `${category.title} Sub-Services`}
                subheading={
                  detail.subServicesSubheading ??
                  `Specific ${category.title.toLowerCase()} work we do most often — each with its own dedicated page.`
                }
              />
            )}
            {detail.extraGroups?.map((group, index) => (
              <ServiceCardGroup
                key={group.id ?? `extra-${index}`}
                group={group}
                tone={index % 2 === 0 ? "raised" : "surface"}
              />
            ))}
            {detail.process && detail.process.length > 0 && (
              <ServiceProcessSteps steps={detail.process} heading={detail.processHeading} />
            )}
          </>
        )}
        <ServiceFAQSection faqs={detail.faqs} heading={detail.faqHeading} />
        <RelatedServices relatedSlugs={detail.relatedSlugs} />
        <ClosingCTA
          headline={`Ready to start your ${category.title.toLowerCase()} project?`}
          subtext={
            detail.closingSubtext ??
            "Tell us what you're building and we'll put together the right plan and team for it."
          }
        />
      </main>

      <Footer />
    </>
  );
}
