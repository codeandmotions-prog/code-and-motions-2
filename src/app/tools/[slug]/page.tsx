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
import { widgets } from "@/components/calculators/widgetRegistry";
import { calculators, getCalculator, relatedCalculators } from "@/data/calculators/registry";
import { getContent } from "@/data/calculators/content";

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
  const title = calc.name.toLowerCase().endsWith("calculator") || calc.name.toLowerCase().endsWith("generator") ? `Free ${calc.name}` : `${calc.name} – Free Online Calculator`;
  return {
    title,
    description: calc.short,
    alternates: { canonical: `/tools/${calc.slug}` },
    openGraph: {
      title: `${title} | Code & Motions`,
      description: calc.short,
      url: `/tools/${calc.slug}`,
      type: "website",
      siteName: "Code & Motions",
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  const content = getContent(slug);
  const Widget = widgets[slug];
  if (!calc || !content || !Widget) notFound();

  const related = relatedCalculators(slug, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: calc.name, item: `${siteUrl}/tools/${calc.slug}` },
    ],
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

      <Header />

      <main id="main" className="flex-1">
        <CalcPageHero calc={calc} />

        <section className="bg-(--color-surface) py-10 lg:py-14" aria-label={`${calc.name}`}>
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

        <CalcArticle name={calc.name} content={content} />
        <ServiceFAQSection faqs={content.faqs} heading={`${calc.name} FAQs`} />
        <RelatedCalculators items={related} />
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
