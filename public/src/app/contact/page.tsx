import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import ContactTrustBadges from "@/components/contact/ContactTrustBadges";
import { contactInfo } from "@/data/contactInfo";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Code & Motions for software development, website development, Shopify development, 2D animation, explainer videos and SEO services. We reply within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Code & Motions",
    description:
      "Get in touch with Code & Motions — a digital agency for software, website, Shopify, animation and SEO projects.",
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
    title: "Contact Us | Code & Motions",
    description:
      "Get in touch with Code & Motions — a digital agency for software, website, Shopify, animation and SEO projects.",
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

  // ContactPage schema with a real, verified contactPoint — email and
  // phone come from contactInfo.ts, the same source the page itself
  // renders. No address/LocalBusiness: no address exists in this
  // project, and inventing one is explicitly out of scope.
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Code & Motions",
    url: `${siteUrl}/contact`,
    about: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: contactInfo.email,
        telephone: contactInfo.phoneDisplay,
        areaServed: ["US", "GB", "EU"],
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

        <section
          id="contact-form"
          className="bg-(--color-surface-raised) px-6 py-16 lg:px-10 lg:py-20"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
            <ContactForm />
            <ContactInfoSidebar />
          </div>
        </section>

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
