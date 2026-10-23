import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClosingCTA from "@/components/shared/ClosingCTA";
import ShareButton from "@/components/shop/ShareButton";
import {
  getShopDesign,
  shopDesigns,
  shopSmallThumb,
  type ShopDesign,
} from "@/data/shop";

const siteUrl = "https://codeandmotions.com";

// Only the designs in src/data/shop.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return shopDesigns.map((design) => ({ slug: design.slug }));
}

function describe(design: ShopDesign) {
  return `${design.title}: a 3D flex wallpaper design for home décor, shown as a bedroom visualization with a patterned ceiling and matching wall panels. Share it or get in touch with Code & Motions about it.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const design = getShopDesign(slug);
  if (!design) return {};

  const title = `${design.title} — 3D Flex Wallpaper Design`;
  const description = describe(design);
  const path = `/shop/${design.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    // Individual design pages exist so every design has its own shareable link
    // and social preview. They are thin by nature, so keep them out of search
    // results; the /shop gallery is the indexable page for these images.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${title} | Code & Motions`,
      description,
      url: path,
      type: "website",
      siteName: "Code & Motions",
      locale: "en_US",
      images: [
        {
          url: design.thumb.src,
          width: design.thumb.width,
          height: design.thumb.height,
          alt: design.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Code & Motions`,
      description,
      images: [design.thumb.src],
    },
  };
}

export default async function ShopDesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = getShopDesign(slug);
  if (!design) notFound();

  const index = shopDesigns.findIndex((d) => d.slug === design.slug);
  const prev = shopDesigns[(index - 1 + shopDesigns.length) % shopDesigns.length];
  const next = shopDesigns[(index + 1) % shopDesigns.length];
  const related = shopDesigns
    .filter((d) => d.collection === design.collection && d.slug !== design.slug)
    .slice(0, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: design.title,
        item: `${siteUrl}/shop/${design.slug}`,
      },
    ],
  };

  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: design.title,
    description: design.alt,
    contentUrl: `${siteUrl}${design.full.src}`,
    thumbnailUrl: `${siteUrl}${design.thumb.src}`,
    width: design.full.width,
    height: design.full.height,
    encodingFormat: "image/webp",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1 bg-(--color-surface)">
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-(--color-ink-soft)"
          >
            <Link href="/" className="transition-colors hover:text-(--color-ink)">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/shop" className="transition-colors hover:text-(--color-ink)">
              Shop
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-(--color-ink)" aria-current="page">
              {design.title}
            </span>
          </nav>

          <h1 className="mt-6 text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-(--color-ink) sm:text-[40px]">
            {design.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-(--color-ink-soft)">
            A 3D flex wallpaper design for home décor from the{" "}
            {design.collectionName} range, shown as a bedroom visualization
            with a patterned ceiling and matching wall panels.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-(--color-line) bg-white">
            <Image
              src={design.full.src}
              alt={design.alt}
              width={design.full.width}
              height={design.full.height}
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ShareButton title={design.title} slug={design.slug} variant="solid" />
            <ShareButton
              title={design.title}
              slug={design.slug}
              variant="ghost"
              copyOnly
              className="!border-(--color-line) !text-(--color-ink) hover:!border-(--color-blue)"
            />
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full bg-(--color-ink) px-6 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-blue)"
            >
              Ask about this design
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/shop/${prev.slug}`}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-(--color-line) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[12px] font-medium text-(--color-ink-soft)">Previous</span>
                <span className="block truncate">{prev.title}</span>
              </span>
            </Link>
            <Link
              href={`/shop/${next.slug}`}
              className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-(--color-line) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)"
            >
              <span className="min-w-0">
                <span className="block text-[12px] font-medium text-(--color-ink-soft)">Next</span>
                <span className="block truncate">{next.title}</span>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <section aria-labelledby="more-heading" className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2
                id="more-heading"
                className="text-[22px] font-extrabold tracking-[-0.01em] text-(--color-ink)"
              >
                More from {design.collectionName}
              </h2>
              <Link
                href={`/shop#${design.collection}`}
                className="text-[14px] font-semibold text-(--color-blue) underline-offset-4 hover:underline"
              >
                View all designs
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((item) => {
                const thumb = shopSmallThumb(item);
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="group block overflow-hidden rounded-xl border border-(--color-line) bg-white"
                    >
                      <Image
                        src={thumb.src}
                        alt={item.alt}
                        width={thumb.width}
                        height={thumb.height}
                        loading="lazy"
                        unoptimized
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="block px-3 py-2.5 text-[13.5px] font-semibold text-(--color-ink)">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

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
