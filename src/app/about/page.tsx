import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutApproach from "@/components/about/AboutApproach";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import ClosingCTA from "@/components/shared/ClosingCTA";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Code & Motions is a digital agency offering software development, web development, Shopify development, video & animation, graphic design and SEO — under one team.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Code & Motions",
    description:
      "A digital agency for ambitious brands — software, web, Shopify, video, design and SEO, under one roof.",
    url: "/about",
  },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Code & Motions",
    url: siteUrl,
    logo: `${siteUrl}/images/logo-full.png`,
    description:
      "Code & Motions is a digital agency offering software development, web development, Shopify development, video & animation, graphic design and SEO.",
    slogan: "Design, Develop, Grow.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <AboutHero />
        <AboutIntro />
        <AboutApproach />
        <AboutValues />
        <AboutTeam />
        <ClosingCTA
          headline="Have a project in mind?"
          subtext="Tell us where your business needs to go next and we'll put the right mix of design, engineering and growth behind it."
        />
      </main>

      <Footer />
    </>
  );
}
