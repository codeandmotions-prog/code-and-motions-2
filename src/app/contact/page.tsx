import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import ContactTrustBadges from "@/components/contact/ContactTrustBadges";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Code & Motions for software development, website development, Shopify development, 2D animation, explainer videos and SEO services. We reply within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Code & Motions",
    description:
      "Get in touch with Code & Motions — a digital agency for software, website, Shopify, animation and SEO projects.",
    url: "/contact",
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
        item: "https://codeandmotions.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://codeandmotions.com/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
