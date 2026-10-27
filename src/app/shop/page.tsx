import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopLandingHero from "@/components/shop/ShopLandingHero";
import ShopCategories, { type ShopCategoryView } from "@/components/shop/ShopCategories";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { shopPreviewImage } from "@/data/shop";
import { categoryHref, designsInCategory, previewDesigns, shopCategories } from "@/data/shopCategories";

const siteUrl = "https://codeandmotions.com";

const pageTitle = "Shop — Browse 3D Flex Wallpaper by Category";
const pageDescription =
  "Shop Code & Motions by category. Start with Home Décor to browse every 3D flex wallpaper design for ceilings and feature walls, view each one full size and share your favorites.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/shop",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${pageTitle} | Code & Motions`,
    description: pageDescription,
    url: "/shop",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [
      {
        url: shopPreviewImage.src,
        width: shopPreviewImage.width,
        height: shopPreviewImage.height,
        alt: shopPreviewImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Code & Motions`,
    description: pageDescription,
    images: [shopPreviewImage.src],
  },
};

export default function ShopPage() {
  const categories: ShopCategoryView[] = shopCategories.map((category) => ({
    id: category.id,
    name: category.name,
    tagline: category.tagline,
    href: categoryHref(category),
    designs: designsInCategory(category),
    previews: previewDesigns(category),
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
    ],
  };

  // Describes only what the page contains: a list of shop categories.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/shop`,
    isPartOf: { "@type": "WebSite", name: "Code & Motions", url: siteUrl },
    publisher: { "@type": "Organization", name: "Code & Motions", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: category.name,
        url: `${siteUrl}${category.href}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <ShopLandingHero />
        <ShopCategories categories={categories} />
        <ClosingCTA
          headline="Talk to Us About Your Space"
          subtext="Tell us which design caught your eye and what you have in mind, and we will get back to you."
          primaryLabel="Contact Code & Motions"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
