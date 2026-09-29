import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalNotice from "@/components/legal/LegalNotice";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";
import LegalSection from "@/components/legal/LegalSection";
import { contactInfo } from "@/data/contactInfo";
import { serviceCategories } from "@/data/serviceCategories";

const siteUrl = "https://codeandmotions.com";
const lastUpdated = "September 29, 2026";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions governing your use of the Code & Motions website and our software, web, Shopify, design, video and SEO services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms and Conditions | Code & Motions",
    description:
      "The terms and conditions governing your use of the Code & Motions website and services.",
    url: "/terms-and-conditions",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
  },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "services-provided", label: "Services Provided" },
  { id: "use-of-website", label: "Use of This Website" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "project-engagements", label: "Project Engagements" },
  { id: "payments", label: "Payments" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes-to-terms", label: "Changes to These Terms" },
  { id: "contact-us", label: "Contact Us" },
];

export default function TermsAndConditionsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Terms and Conditions", item: `${siteUrl}/terms-and-conditions` },
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
          eyebrow="Terms and Conditions"
          title="Terms and Conditions"
          description="The terms that govern your use of this website and any services you engage Code & Motions for."
          breadcrumbLabel="Terms and Conditions"
          lastUpdated={lastUpdated}
        />

        <section className="bg-(--color-surface) px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <LegalNotice>
              These Terms and Conditions are a general template covering our website and services at a high level.
              Please review them with a qualified legal professional and adapt them (particularly the Governing Law
              section) to your specific business registration and jurisdiction before treating them as final.
            </LegalNotice>

            <div className="mt-8">
              <LegalTableOfContents items={toc} />
            </div>

            <div className="mt-4">
              <LegalSection id="introduction" heading="1. Introduction">
                <p>
                  These Terms and Conditions (&quot;Terms&quot;) govern your use of the website{" "}
                  <strong>codeandmotions.com</strong> and any services provided by Code &amp; Motions
                  (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By using this website or engaging our
                  services, you agree to these Terms.
                </p>
              </LegalSection>

              <LegalSection id="services-provided" heading="2. Services Provided">
                <p>Code &amp; Motions is a digital agency offering the following categories of services:</p>
                <ul>
                  {serviceCategories.map((service) => (
                    <li key={service.id}>
                      <Link href={`/services/${service.id}`}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
                <p>
                  The specific scope, deliverables, timeline and cost of any project are agreed separately with each
                  client before work begins.
                </p>
              </LegalSection>

              <LegalSection id="use-of-website" heading="3. Use of This Website">
                <p>
                  You agree to use this website only for lawful purposes and in a way that does not infringe the
                  rights of, or restrict or inhibit the use and enjoyment of, this site by anyone else. You must not
                  attempt to gain unauthorized access to any part of this website, our systems, or our free tools.
                </p>
              </LegalSection>

              <LegalSection id="intellectual-property" heading="4. Intellectual Property">
                <p>
                  Unless otherwise stated, the content on this website — including text, graphics, logos, and the
                  free tools available under <Link href="/tools">/tools</Link> — is the property of Code &amp;
                  Motions or its licensors and is protected by applicable intellectual property laws. Ownership of
                  deliverables produced as part of a paid client project is addressed separately in that project&apos;s
                  agreement.
                </p>
              </LegalSection>

              <LegalSection id="project-engagements" heading="5. Project Engagements">
                <p>
                  When you engage Code &amp; Motions for a project, the specific scope of work, timeline, revisions,
                  and cost will be agreed with you directly (for example, via a proposal, quote, or contract) before
                  work begins. These Terms apply alongside — not instead of — any such project-specific agreement.
                </p>
                <p>
                  Clients are responsible for providing timely feedback, content, and access needed for us to
                  deliver a project on schedule.
                </p>
              </LegalSection>

              <LegalSection id="payments" heading="6. Payments">
                <p>
                  Payment terms (including amounts, milestones, and due dates) are agreed on a per-project basis and
                  will be communicated to you before work begins. For details on cancellations and refunds, see our{" "}
                  <Link href="/refund-cancellation">Refund &amp; Cancellation Policy</Link>.
                </p>
              </LegalSection>

              <LegalSection id="liability" heading="7. Limitation of Liability">
                <p>
                  This website and its free tools (including the Shopify Speed Checker, Migration Checker, and MVP
                  Cost Estimator) are provided for general informational purposes. While we aim for accuracy, we
                  make no guarantee that results, estimates, or content on this website are complete, error-free, or
                  suitable for every purpose. To the fullest extent permitted by law, Code &amp; Motions is not
                  liable for any indirect or consequential loss arising from your use of this website.
                </p>
              </LegalSection>

              <LegalSection id="third-party-links" heading="8. Third-Party Links">
                <p>
                  This website may link to third-party websites (including WhatsApp and social media platforms) for
                  your convenience. We do not control and are not responsible for the content or practices of
                  third-party websites.
                </p>
              </LegalSection>

              <LegalSection id="termination" heading="9. Termination">
                <p>
                  We reserve the right to suspend or restrict access to this website for anyone who violates these
                  Terms. Termination of an ongoing project engagement is addressed by that project&apos;s specific
                  agreement and our{" "}
                  <Link href="/refund-cancellation">Refund &amp; Cancellation Policy</Link>.
                </p>
              </LegalSection>

              <LegalSection id="governing-law" heading="10. Governing Law">
                <p>
                  <em>
                    [Placeholder — to be confirmed]:</em> the governing law and jurisdiction for these Terms should
                  be specified here based on where Code &amp; Motions is legally registered, and reviewed by a
                  qualified legal professional.
                </p>
              </LegalSection>

              <LegalSection id="changes-to-terms" heading="11. Changes to These Terms">
                <p>
                  We may update these Terms from time to time. Continued use of this website after changes are
                  posted constitutes acceptance of the updated Terms. We&apos;ll update the &quot;Last updated&quot;
                  date at the top of this page when we do.
                </p>
              </LegalSection>

              <LegalSection id="contact-us" heading="12. Contact Us">
                <p>Questions about these Terms? Contact us:</p>
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
