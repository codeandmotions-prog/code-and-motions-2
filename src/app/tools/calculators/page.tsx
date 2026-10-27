import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorDirectory from "@/components/tools/CalculatorDirectory";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { calculators } from "@/data/calculators/registry";

const siteUrl = "https://codeandmotions.com";

const DIR_TITLE = "Free Online Calculators: Finance, Health, Math";
const DIR_DESCRIPTION =
  "Browse 53 free online calculators: mortgage, loan, BMI, percentage, fraction, unit conversion, date and more. Each shows its formula and a worked example.";

export const metadata: Metadata = {
  title: DIR_TITLE,
  description: DIR_DESCRIPTION,
  alternates: {
    canonical: "/tools/calculators",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${DIR_TITLE} | Code & Motions`,
    description: DIR_DESCRIPTION,
    url: "/tools/calculators",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
    images: [{ url: "/images/logo-full.png", width: 1262, height: 696, alt: "Code & Motions logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DIR_TITLE} | Code & Motions`,
    description: DIR_DESCRIPTION,
    images: ["/images/logo-full.png"],
  },
};

// Moved here from the Tools landing page, which now only lists the four tool cards.
const faqs = [
  {
    question: "What kinds of calculators are included?",
    answer: `The collection has ${calculators.length} calculators in four groups: financial (mortgage, loan, compound interest, ROI and VAT), fitness and health (BMI, BMR, calories, body fat and heart-rate zones), maths (arithmetic, algebra, statistics and geometry) and everyday tools (age, dates, tips, fuel cost and unit conversion).`,
  },
  {
    question: "Do the calculators work with different currencies and units?",
    answer:
      "The money calculators work with any currency because they calculate on the numbers you enter; the USD, GBP and EUR selector only changes the symbol shown. The BMI, fuel cost and unit conversion calculators accept metric, US and UK units. Rates, tax rules and mortgage conventions differ by country, so each page lists notes where they matter.",
  },
  {
    question: "Do the calculators send my numbers anywhere?",
    answer: "No. Every calculator runs in your browser, so the values you enter are not sent to our servers.",
  },
  {
    question: "Can I rely on the health calculators for medical decisions?",
    answer:
      "No. They give general estimates for information only and are not a diagnosis or medical advice. Speak to a doctor or registered dietitian before changing your diet, training or medication.",
  },
];

export default function CalculatorsDirectoryPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "All Calculators", item: `${siteUrl}/tools/calculators` },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: DIR_TITLE,
    url: `${siteUrl}/tools/calculators`,
    description: DIR_DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Code & Motions", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: calculators.length,
      itemListElement: calculators.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: `${siteUrl}/tools/${c.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <CalculatorDirectory />
        <section className="bg-(--color-surface-raised) py-16 lg:py-20" aria-labelledby="about-calculators">
          <div className="mx-auto max-w-3xl px-6 wrap-anywhere lg:px-10">
            <h2 id="about-calculators" className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
              How these free online calculators work
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-(--color-ink-soft)">
              Every calculator has its own page with the inputs explained, the formula written out, a worked example and the assumptions behind the answer, so you can check the result instead of just trusting a number. They are grouped into financial, fitness and health, maths and everyday tools.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-(--color-ink-soft)">
              The calculations run in your browser. Where conventions differ between countries, such as VAT versus sales tax, EMI versus mortgage payment, litres per 100 km versus miles per gallon, or stone versus kilograms, the page says what it assumes. Results are estimates for planning and learning, not professional financial, medical or legal advice.
            </p>
          </div>
        </section>
        <ServiceFAQSection faqs={faqs} heading="Calculator questions" />
        <ClosingCTA
          headline="Need Help With Your Project?"
          subtext="If a result points to something worth building, our team can help you plan it and bring it to life."
          primaryLabel="Talk to Code & Motions"
          primaryHref="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
