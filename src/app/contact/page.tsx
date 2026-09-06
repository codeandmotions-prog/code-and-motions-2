import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactTrustBadges from "@/components/contact/ContactTrustBadges";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Code & Motions. Tell us about your web, software, Shopify, SEO, design or video project and we'll get back to you within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Code & Motions",
    description:
      "Have a project in mind? Reach out to Code & Motions and let's build it together.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <ContactHero />

        <section className="relative bg-(--color-surface-raised) px-6 pb-24 lg:px-10">
          <ContactForm />
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
