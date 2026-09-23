import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftwareListingHero from "@/components/software/SoftwareListingHero";
import ProductsGrid from "@/components/software/ProductsGrid";

export const metadata: Metadata = {
  title: "Software Solutions",
  description:
    "Explore Code & Motions' software products, built to simplify operations, automate workflows, and help businesses grow. Starting with LabNova.",
  alternates: {
    canonical: "/software",
  },
  openGraph: {
    title: "Software Solutions | Code & Motions",
    description:
      "Powerful software products built to simplify operations, automate workflows, and help businesses grow.",
    url: "/software",
  },
};

export default function SoftwareListingPage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <SoftwareListingHero />

        <section className="bg-(--color-surface-raised) px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <ProductsGrid />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
