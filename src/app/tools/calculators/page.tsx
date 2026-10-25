import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorDirectory from "@/components/tools/CalculatorDirectory";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import ClosingCTA from "@/components/shared/ClosingCTA";
import { calculators } from "@/data/calculators/registry";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  title: "Free Online Calculators",
  description:
    "Search and browse free online calculators for money, health, maths and everyday questions. No signup required.",
  alternates: {
    canonical: "/tools/calculators",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Moved here from the Tools landing page, which now only lists the four tool cards.
const faqs = [
  {
    question: "What kinds of calculators are included?",
    answer: `The collection has ${calculators.length} calculators in four groups: financial (mortgage, loan, compound interest, ROI and VAT), fitness and health (BMI, BMR, calories, body fat and heart-rate zones), maths (arithmetic, algebra, statistics and geometry) and everyday tools (age, dates, tips, fuel cost and unit conversion).`,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Header />

      <main id="main" className="flex-1">
        <CalculatorDirectory />
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
