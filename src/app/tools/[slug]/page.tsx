import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import CalcPageHero from "@/components/calculators/page/CalcPageHero";
import CalcArticle from "@/components/calculators/page/CalcArticle";
import RelatedCalculators from "@/components/calculators/page/RelatedCalculators";
import VolumeGuide from "@/components/calculators/volume/VolumeGuide";
import { widgets } from "@/components/calculators/widgetRegistry";
import { calculators, getCalculator, relatedCalculators } from "@/data/calculators/registry";
import { getContent } from "@/data/calculators/content";
import { getCalcSeo } from "@/data/calculators/seo";

const siteUrl = "https://codeandmotions.com";

// Only the calculators in the registry exist; the three older tools keep their own literal routes.
export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  const seo = getCalcSeo(slug);
  const title = seo?.title ?? `${calc.name} – Free Online Calculator`;
  const description = seo?.description ?? calc.short;
  const socialTitle = `${title} | Code & Motions`;
  return {
    title,
    description,
    alternates: { canonical: `/tools/${calc.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url: `/tools/${calc.slug}`,
      type: "website",
      siteName: "Code & Motions",
      locale: "en_US",
      images: [{ url: "/images/logo-full.png", width: 1262, height: 696, alt: "Code & Motions logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/images/logo-full.png"],
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  const content = getContent(slug);
  const Widget = widgets[slug];
  if (!calc || !content || !Widget) notFound();

  const seo = getCalcSeo(slug);
  // Curated related links first (validated against the registry), registry neighbours as the fallback.
  const curated = (seo?.related ?? []).map((s) => getCalculator(s)).filter((c): c is NonNullable<typeof c> => Boolean(c) && c!.slug !== slug);
  const related = curated.length >= 4 ? curated.slice(0, 4) : relatedCalculators(slug, 4);
  const description = seo?.description ?? calc.short;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "All Calculators", item: `${siteUrl}/tools/calculators` },
      { "@type": "ListItem", position: 4, name: calc.name, item: `${siteUrl}/tools/${calc.slug}` },
    ],
  };
  // Describes the page's real function: a free, in-browser calculator. No ratings, reviews or prices are claimed.
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.name,
    url: `${siteUrl}/tools/${calc.slug}`,
    description,
    applicationCategory: calc.category === "health" ? "HealthApplication" : calc.category === "financial" ? "FinanceApplication" : calc.category === "math" ? "EducationalApplication" : "UtilitiesApplication",
    operatingSystem: "Any (runs in a web browser)",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: { "@type": "CollectionPage", name: "Free Online Calculators", url: `${siteUrl}/tools/calculators` },
    publisher: { "@type": "Organization", name: "Code & Motions", url: siteUrl },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <CalcPageHero calc={calc} compact={slug === "volume-calculator"} />

        <section className={`bg-(--color-surface) ${slug === "volume-calculator" ? "py-6 lg:py-8" : "py-10 lg:py-14"}`} aria-label={`${calc.name}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            {calc.category === "health" && (
              <p className="mb-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[13.5px] leading-relaxed text-amber-950">
                <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  For general information only. This calculator gives estimates, not a diagnosis or medical advice. Talk to a doctor or registered dietitian before changing your diet or exercise.
                </span>
              </p>
            )}
            <Widget />
          </div>
        </section>

        {slug === "volume-calculator" ? (
          <VolumeGuide content={content} references={seo?.references} />
        ) : (
          <CalcArticle name={calc.name} content={content} regional={seo?.regional} references={seo?.references} />
        )}
        <ServiceFAQSection faqs={content.faqs} heading={`${calc.name} FAQs`} />
        <RelatedCalculators items={related} tool={seo?.tool} />
        <ClosingCTA
          headline="Need Something Built Around Your Numbers?"
          subtext="Code & Motions designs and builds custom calculators, dashboards and web tools for businesses. Tell us what you have in mind."
          primaryLabel="Talk to Code & Motions"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
