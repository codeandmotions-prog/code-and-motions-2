import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftwareListingHero from "@/components/software/SoftwareListingHero";
import ProductsGrid from "@/components/software/ProductsGrid";
import { softwareProducts } from "@/data/softwareProducts";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Software Solutions — Business & Workflow Automation Software",
  description:
    "Explore Code & Motions' software products, built to simplify operations, automate workflows, and help businesses across the USA, UK and Europe grow. Starting with LabNova.",
  alternates: {
    canonical: "/software",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Software Solutions | Code & Motions",
    description:
      "Powerful software products built to simplify operations, automate workflows, and help businesses grow.",
    url: "/software",
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
    title: "Software Solutions | Code & Motions",
    description:
      "Powerful software products built to simplify operations, automate workflows, and help businesses grow.",
    images: ["/images/logo-full.png"],
  },
};

export default function SoftwareListingPage() {
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
        name: "Software",
        item: `${siteUrl}/software`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: softwareProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}/software/${product.slug}`,
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
        <SoftwareListingHero />

        <section className="bg-(--color-surface-raised) px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                Our Products
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                Software Built for Real Operations
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
                Purpose-built software products designed to replace manual
                workarounds with something that actually fits how your team
                works.
              </p>
            </div>

            <div className="mt-12">
              <ProductsGrid />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
