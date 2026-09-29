import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import { serviceCategories } from "@/data/serviceCategories";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Digital Services — Software, Web, Shopify, AI, Design & SEO",
  description:
    "Explore Code & Motions' full range of digital services: software development, website development, Shopify development, AI development, video & animation, graphic design and SEO — for businesses in the USA, UK and Europe.",
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Digital Services | Code & Motions",
    description:
      "Complete digital solutions for businesses and brands — software, websites, Shopify, AI, video, design and SEO, all under one team.",
    url: "/services",
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
    title: "Digital Services | Code & Motions",
    description:
      "Complete digital solutions for businesses and brands — software, websites, Shopify, AI, video, design and SEO, all under one team.",
    images: ["/images/logo-full.png"],
  },
};

export default function ServicesPage() {
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
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceCategories.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteUrl}/services/${service.id}`,
    })),
  };

  return (
    <>
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
        <ServicesHero />

        <section className="bg-(--color-surface-raised) px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                What We Offer
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                Six Services, One Team
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
                From first line of code to final launch, explore the digital
                services Code &amp; Motions delivers for businesses across
                the USA, UK and Europe.
              </p>
            </div>

            <div className="mt-12">
              <ServicesGrid />
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  );
}
