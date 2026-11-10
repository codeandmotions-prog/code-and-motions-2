import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutApproach from "@/components/about/AboutApproach";
import AboutValues from "@/components/about/AboutValues";
import AboutLeadership from "@/components/about/AboutLeadership";
import AboutTeam from "@/components/about/AboutTeam";
import AboutSupport from "@/components/about/AboutSupport";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { aboutFacts } from "@/data/aboutFacts";
import { contactInfo } from "@/data/contactInfo";

const siteUrl = "https://codeandmotions.com";

const pageTitle = "About Code & Motions – Global Software House in Sargodha";

const pageDescription = `Software house and digital agency in Sargodha, Pakistan. ${aboutFacts.yearsOfExperience} years of experience serving clients in the USA, UK, Australia, Germany, UAE and Saudi Arabia.`;

const socialDescription = `Software house and digital agency in Sargodha, Pakistan. A ${aboutFacts.teamSize}-member team with ${aboutFacts.yearsOfExperience} years of experience, serving clients worldwide.`;

export const metadata: Metadata = {
  // Absolute: the brand is already in the title, so the site-wide
  // "| Code & Motions" template is not appended.
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: pageTitle,
    description: socialDescription,
    url: "/about",
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
    title: pageTitle,
    description: socialDescription,
    images: ["/images/logo-full.png"],
  },
};

export default function AboutPage() {
  // One connected graph. The organization reuses the "#organization" id that
  // the Contact page already declares, so search engines merge the two into a
  // single business record. Every shared value comes from contactInfo.ts, the
  // same source the Contact page uses, so the two cannot disagree. Opening
  // hours and the contact point are deliberately left to the Contact page.
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about#webpage`,
        url: `${siteUrl}/about`,
        name: "About Code & Motions",
        description: pageDescription,
        inLanguage: "en",
        about: { "@id": `${siteUrl}/#organization` },
        breadcrumb: { "@id": `${siteUrl}/about#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/about#breadcrumb`,
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
            name: "About",
            item: `${siteUrl}/about`,
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: "Code & Motions",
        alternateName: "Code and Motions",
        url: siteUrl,
        logo: `${siteUrl}/images/logo-full.png`,
        description: `Code & Motions is a software house and digital agency in Sargodha, Pakistan, with ${aboutFacts.yearsOfExperience} years of experience in software development, web development, Shopify development, AI, video & animation, graphic design and SEO.`,
        slogan: "Design, Develop, Grow.",
        email: contactInfo.email,
        telephone: contactInfo.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: contactInfo.address.locality,
          addressRegion: contactInfo.address.region,
          postalCode: contactInfo.address.postalCode,
          addressCountry: contactInfo.address.countryCode,
        },
        areaServed: [
          "United States",
          "United Kingdom",
          "Australia",
          "Germany",
          "United Arab Emirates",
          "Saudi Arabia",
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: aboutFacts.teamSize,
        },
        founder: { "@id": `${siteUrl}/about#founder` },
        sameAs: [contactInfo.instagramUrl],
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/about#founder`,
        name: aboutFacts.founder.name,
        jobTitle: aboutFacts.founder.title,
        description: aboutFacts.founder.bio,
        worksFor: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main id="main" className="flex-1">
        <AboutHero />
        <AboutIntro />
        <AboutApproach />
        <AboutValues />
        <AboutLeadership />
        <AboutTeam />
        <AboutSupport />
        <ClosingCTA
          headline="Have a project in mind?"
          subtext="Tell us where your business needs to go next and we'll put the right mix of design, engineering and growth behind it."
        />
      </main>

      <Footer />
    </>
  );
}
