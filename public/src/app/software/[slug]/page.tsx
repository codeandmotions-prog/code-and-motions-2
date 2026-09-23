import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductHero from "@/components/software/ProductHero";
import AboutProduct from "@/components/software/AboutProduct";
import FeatureGrid from "@/components/software/FeatureGrid";
import HowItWorks from "@/components/software/HowItWorks";
import TechStack from "@/components/software/TechStack";
import ProductFinalCTA from "@/components/software/ProductFinalCTA";
import { softwareProducts, getSoftwareProduct } from "@/data/softwareProducts";

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
    title: `${product.name} — Software`,
    description: `${product.name} is ${product.description}`,
    alternates: {
      canonical: `/software/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.shortDescription,
      url: `/software/${product.slug}`,
      images: [
        {
          url: product.logoFull,
          width: 1305,
          height: 732,
          alt: `${product.name} — ${product.tagline}`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getSoftwareProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <ProductHero slug={product.slug} />
        <AboutProduct slug={product.slug} />
        <FeatureGrid slug={product.slug} />
        <HowItWorks slug={product.slug} />
        <TechStack slug={product.slug} />
        <ProductFinalCTA slug={product.slug} />
      </main>

      <Footer />
    </>
  );
}
