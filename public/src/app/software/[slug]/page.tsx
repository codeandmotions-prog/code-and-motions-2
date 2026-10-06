import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductHero from "@/components/software/ProductHero";
import AboutProduct from "@/components/software/AboutProduct";
import FeatureGrid from "@/components/software/FeatureGrid";
import HowItWorks from "@/components/software/HowItWorks";
import TechStack from "@/components/software/TechStack";
import WhoItsFor from "@/components/software/WhoItsFor";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ProductFinalCTA from "@/components/software/ProductFinalCTA";
import { softwareProducts, getSoftwareProduct } from "@/data/softwareProducts";

const siteUrl = "https://codeandmotions.com";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return softwareProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getSoftwareProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: {
      canonical: `/software/${product.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${product.seoTitle} | Code & Motions`,
      description: product.metaDescription,
      url: `/software/${product.slug}`,
      type: "website",
      siteName: "Code & Motions",
      locale: "en_US",
      images: [
        {
          url: product.logoFull,
          width: 1305,
          height: 732,
          alt: `${product.name} — ${product.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.seoTitle} | Code & Motions`,
      description: product.metaDescription,
      images: [product.logoFull],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getSoftwareProduct(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Software", item: `${siteUrl}/software` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/software/${product.slug}` },
    ],
  };

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    url: `${siteUrl}/software/${product.slug}`,
    description: product.metaDescription,
    applicationCategory: product.applicationCategory,
    operatingSystem: product.operatingSystem,
    image: `${siteUrl}${product.logoFull}`,
    provider: {
      "@type": "Organization",
      name: "Code & Motions",
      url: siteUrl,
    },
  };

  const faqJsonLd =
    product.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <Header />

      <main id="main" className="flex-1">
        <ProductHero slug={product.slug} />
        <AboutProduct slug={product.slug} />
        <FeatureGrid slug={product.slug} />
        <HowItWorks slug={product.slug} />
        <TechStack slug={product.slug} />
        <WhoItsFor slug={product.slug} />
        {product.relatedServiceLink && (
          <section className="bg-(--color-surface) py-14 lg:py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <Link
                href={product.relatedServiceLink.href}
                className="group flex items-start gap-3 rounded-2xl border border-(--color-line) bg-(--color-surface-raised) p-5 transition-colors hover:border-(--color-blue)/40"
              >
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-(--color-blue) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="text-[14px] leading-relaxed text-(--color-ink-soft)">
                  <span className="font-semibold text-(--color-ink)">
                    Related: {product.relatedServiceLink.label}.
                  </span>{" "}
                  {product.relatedServiceLink.description}
                </span>
              </Link>
            </div>
          </section>
        )}
        {product.faqs.length > 0 && (
          <ServiceFAQSection faqs={product.faqs} heading={`${product.name} FAQ`} />
        )}
        <ProductFinalCTA slug={product.slug} />
      </main>

      <Footer />
    </>
  );
}
