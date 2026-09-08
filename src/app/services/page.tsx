import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Code & Motions' full range of services: software development, website development, Shopify development, video & animation, graphic design and SEO.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Code & Motions",
    description:
      "Complete digital solutions for businesses and brands — software, websites, Shopify, video, design and SEO.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <ServicesHero />

        <section className="bg-(--color-surface-raised) px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <ServicesGrid />
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  );
}
