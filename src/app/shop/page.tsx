import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopHero from "@/components/shop/ShopHero";
import ShopGallery from "@/components/shop/ShopGallery";
import ShopContent from "@/components/shop/ShopContent";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { shopCollections, shopDesigns, shopPreviewImage } from "@/data/shop";

const siteUrl = "https://codeandmotions.com";

const pageTitle = "Shop — 3D Flex Wallpaper for Home Décor";
const pageDescription = `Browse ${shopDesigns.length} 3D flex wallpaper designs for home décor. View each ceiling and wall design full size, share your favorites, and get in touch with Code & Motions.`;

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

const faqs = [
  {
    question: "What is 3D flex wallpaper?",
    answer:
      "3D flex wallpaper is a large-format printed wall and ceiling covering with a dimensional-looking design, such as carved florals, marble veining or gold relief, that runs across a whole surface instead of repeating a small pattern.",
  },
  {
    question: "Are the pictures photos of finished rooms?",
    answer:
      "No. They are digital room visualizations that show how a ceiling design and matching wall panels can look together in a bedroom. They are meant to help you choose a style, not to show a finished installation.",
  },
  {
    question: "How do I ask about a design?",
    answer:
      "Note the design code shown on the preview, for example R-12 or ROOM-07, and send it to us through the contact page, on WhatsApp or by email, along with a few words about your space.",
  },
  {
    question: "Are prices shown on this page?",
    answer:
      "No. This page is a design gallery and there is no online ordering or checkout. Get in touch with the design code and we can talk through your project.",
  },
  {
    question: "Can these styles be used outside the bedroom?",
    answer:
      "The previews show bedrooms, but the same styles can inspire feature walls and ceilings in living rooms, dining rooms, hallways and offices. Ask us if you would like a particular design considered for another space.",
  },
  {
    question: "How can I share a design with someone?",
    answer:
      "Use the Share button on any design. On phones it opens your share options, including WhatsApp, and on browsers without sharing support it copies a link to that design to your clipboard instead.",
  },
];

export default function ShopPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  // Describes only what the page really contains: a gallery of images.
  // No Product/Offer data, prices, ratings or availability exist for these designs.
  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/shop`,
    isPartOf: { "@type": "WebSite", name: "Code & Motions", url: siteUrl },
    publisher: { "@type": "Organization", name: "Code & Motions", url: siteUrl },
    mainEntity: {
      "@type": "ImageGallery",
      name: "3D flex wallpaper designs",
      numberOfItems: shopDesigns.length,
      image: shopDesigns.map((design) => ({
        "@type": "ImageObject",
        name: design.title,
        description: design.alt,
        contentUrl: `${siteUrl}${design.full.src}`,
        thumbnailUrl: `${siteUrl}${design.thumb.src}`,
        width: design.full.width,
        height: design.full.height,
        encodingFormat: "image/webp",
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <ShopHero
          designCount={shopDesigns.length}
          collectionCount={shopCollections.length}
          featured={[
            shopDesigns.find((d) => d.slug === "royal-designs-r-01")!,
            shopDesigns.find((d) => d.slug === "collection-2025-room-02")!,
            shopDesigns.find((d) => d.slug === "polite-designs-room-51")!,
          ]}
        />
        <ShopGallery collections={shopCollections} designs={shopDesigns} />
        <ShopContent />
        <ServiceFAQSection faqs={faqs} heading="3D flex wallpaper questions" />
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
