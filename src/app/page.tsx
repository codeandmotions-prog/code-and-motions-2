import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import HeroProjectCTA from "@/components/home/HeroProjectCTA";
import PlatformsMarquee from "@/components/home/PlatformsMarquee";
import WhyWorkWithUs from "@/components/home/WhyWorkWithUs";
import ByTheNumbers from "@/components/home/ByTheNumbers";
import BusinessPlanningSolutions from "@/components/home/BusinessPlanningSolutions";
import AiServicesShowcase from "@/components/home/AiServicesShowcase";
import { contactInfo } from "@/data/contactInfo";
import { getServiceSearchItems } from "@/data/serviceSearchIndex";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Digital Solutions Agency for Web & Software | Code & Motions",
  description:
    "Code & Motions is a digital solutions agency and web and software development company: software, websites, Shopify, AI and SEO for the USA, UK and Europe.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Digital Solutions Agency for Web & Software | Code & Motions",
    description:
      "Digital solutions agency and web and software development company: custom software, websites, Shopify, AI and SEO for businesses in the USA, UK and Europe.",
    url: siteUrl,
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
    title: "Digital Solutions Agency for Web & Software | Code & Motions",
    description:
      "Digital solutions agency and web and software development company: custom software, websites, Shopify, AI and SEO for businesses in the USA, UK and Europe.",
    images: ["/images/logo-full.png"],
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Code & Motions",
    url: siteUrl,
    logo: `${siteUrl}/images/logo-full.png`,
    description:
      "Code & Motions is a digital solutions agency and web and software development company offering software development, website development, Shopify development, AI development, video & animation, graphic design and SEO.",
    slogan: "Design, Develop, Grow.",
    sameAs: [contactInfo.instagramUrl],
    areaServed: ["United States", "United Kingdom", "Europe"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Code & Motions",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <Hero serviceSearchItems={getServiceSearchItems()} />
        <HeroProjectCTA />
        <PlatformsMarquee />
        <WhyWorkWithUs />
        <ByTheNumbers />
        <CTA />
        <BusinessPlanningSolutions />
        <AiServicesShowcase />
      </main>

      <Footer />
    </>
  );
}
