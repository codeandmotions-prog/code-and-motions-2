import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalNotice from "@/components/legal/LegalNotice";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";
import LegalSection from "@/components/legal/LegalSection";
import { contactInfo } from "@/data/contactInfo";

const siteUrl = "https://codeandmotions.com";
const lastUpdated = "September 29, 2026";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Code & Motions' refund and cancellation policy for custom software, website, Shopify, design, video and SEO projects.",
  alternates: {
    canonical: "/refund-cancellation",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Refund & Cancellation Policy | Code & Motions",
    description: "How cancellations and refund requests are handled for Code & Motions project engagements.",
    url: "/refund-cancellation",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "nature-of-services", label: "Nature of Our Services" },
  { id: "cancelling-a-project", label: "Cancelling an Ongoing Project" },
  { id: "refund-eligibility", label: "Refund Eligibility" },
  { id: "non-refundable-items", label: "Non-Refundable Items" },
  { id: "how-to-request", label: "How to Request a Cancellation or Refund" },
  { id: "contact-us", label: "Contact Us" },
];

export default function RefundCancellationPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Refund & Cancellation Policy", item: `${siteUrl}/refund-cancellation` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1">
        <LegalHero
          eyebrow="Refund & Cancellation"
          title="Refund & Cancellation Policy"
          description="How cancellations and refund requests are handled for project engagements with Code & Motions."
          breadcrumbLabel="Refund & Cancellation"
          lastUpdated={lastUpdated}
        />

        <section className="bg-(--color-surface) px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <LegalNotice>
              This is a general policy template. Exact refund percentages, cancellation windows, and notice periods
              are marked as placeholders below for you to confirm — we haven&apos;t invented specific figures that
              aren&apos;t yet part of your business&apos;s actual policy. In practice, the terms of each project
              agreement or contract take precedence over this general page.
            </LegalNotice>

            <div className="mt-8">
              <LegalTableOfContents items={toc} />
            </div>

            <div className="mt-4">
              <LegalSection id="overview" heading="1. Overview">
                <p>
                  This Refund &amp; Cancellation Policy explains how we approach cancellations and refund requests
                  for services provided by Code &amp; Motions. It applies alongside — not instead of — the specific
                  agreement made for your project.
                </p>
              </LegalSection>

              <LegalSection id="nature-of-services" heading="2. Nature of Our Services">
                <p>
                  Code &amp; Motions provides custom, project-based digital services — software development, website
                  development, Shopify development, video &amp; animation, graphic design, and SEO. Because each
                  project involves work and resources specific to your business, our refund approach differs from a
                  standard retail or e-commerce return policy.
                </p>
              </LegalSection>

              <LegalSection id="cancelling-a-project" heading="3. Cancelling an Ongoing Project">
                <p>
                  If you wish to cancel a project that&apos;s already in progress, please contact us as soon as
                  possible. <em>[Placeholder — to be confirmed]:</em> the specific notice period and any applicable
                  cancellation terms should be defined here (or referenced from your signed project agreement) once
                  finalized.
                </p>
              </LegalSection>

              <LegalSection id="refund-eligibility" heading="4. Refund Eligibility">
                <p>
                  Refund eligibility generally depends on how much work has already been completed at the time of
                  cancellation. <em>[Placeholder — to be confirmed]:</em> specific refund percentages or timeframes
                  (for example, tied to project milestones) should be added here once defined, and will typically be
                  confirmed in your project agreement or invoice.
                </p>
              </LegalSection>

              <LegalSection id="non-refundable-items" heading="5. Non-Refundable Items">
                <p>Some costs are generally not refundable once incurred, such as:</p>
                <ul>
                  <li>Work already completed and delivered;</li>
                  <li>Third-party costs already paid on your behalf (for example, domain names, hosting, or third-party app/plugin licenses); and</li>
                  <li>Custom design, development, or content work already produced specifically for your project.</li>
                </ul>
              </LegalSection>

              <LegalSection id="how-to-request" heading="6. How to Request a Cancellation or Refund">
                <p>
                  To request a cancellation or refund, please contact us with your name, project details, and the
                  reason for your request. We&apos;ll review your request and respond — we usually reply within 24
                  hours.
                </p>
              </LegalSection>

              <LegalSection id="contact-us" heading="7. Contact Us">
                <p>For cancellation or refund requests, reach us at:</p>
                <ul>
                  <li>
                    Email:{" "}
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </li>
                  <li>
                    Phone: <a href={contactInfo.phoneTel}>{contactInfo.phoneDisplay}</a>
                  </li>
                  <li>
                    Or use our <Link href="/contact">contact page</Link>.
                  </li>
                </ul>
              </LegalSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
