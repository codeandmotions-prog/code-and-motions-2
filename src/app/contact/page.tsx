import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import ContactTrustBadges from "@/components/contact/ContactTrustBadges";
import ContactHelpOptions from "@/components/contact/ContactHelpOptions";
import ContactLocationsFaq from "@/components/contact/ContactLocationsFaq";
import { contactInfo } from "@/data/contactInfo";

const siteUrl = "https://codeandmotions.com";

const pageTitle = "Contact Code & Motions | Web Development Consultation";
const pageDescription =
  "Book a free or paid web development consultation, hire dedicated developers or start a project with Code & Motions. Based in Sargodha, Pakistan.";
const socialDescription =
  "Book a free or paid web development consultation, hire dedicated developers or start a software project with Code & Motions in Sargodha, Pakistan.";

export const metadata: Metadata = {
  // Absolute so the root "%s | Code & Motions" template is not appended twice.
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: pageTitle,
    description: socialDescription,
    url: "/contact",
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

export default function ContactPage() {
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
        name: "Contact",
        item: `${siteUrl}/contact`,
      },
    ],
  };

  // ContactPage schema describing the business. Every value comes from
  // contactInfo.ts (the same source the page renders). The street line is
  // not available yet, so no streetAddress is published; Sydney and the USA
  // are service areas, not offices, so no extra locations are listed.
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Code & Motions",
    url: `${siteUrl}/contact`,
    description: pageDescription,
    about: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "Code & Motions",
      url: siteUrl,
      logo: `${siteUrl}/images/logo-full.png`,
      email: contactInfo.email,
      telephone: contactInfo.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        addressLocality: contactInfo.address.locality,
        addressRegion: contactInfo.address.region,
        postalCode: contactInfo.address.postalCode,
        addressCountry: contactInfo.address.countryCode,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      areaServed: [
        "United States",
        "United Kingdom",
        "Europe",
        "Middle East",
        "Australia",
      ],
      sameAs: [contactInfo.instagramUrl],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: contactInfo.email,
        telephone: contactInfo.phoneDisplay,
        availableLanguage: ["English"],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ContactHero />

        <ContactHelpOptions />

        <section
          id="contact-form"
          className="bg-(--color-surface-raised) px-6 py-16 lg:px-10 lg:py-20"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
            <ContactForm />
            <ContactInfoSidebar />
          </div>
        </section>

        <ContactLocationsFaq />

        <section className="border-t border-(--color-line) bg-(--color-surface-raised) px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <ContactTrustBadges />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
