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
  title: "Privacy Policy",
  description:
    "Read the Code & Motions privacy policy to understand what information we collect through our website and contact form, how we use it, and your choices.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Code & Motions",
    description:
      "What information Code & Motions collects through this website, how it's used, and your choices.",
    url: "/privacy-policy",
    type: "website",
    siteName: "Code & Motions",
    locale: "en_US",
  },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Your Information" },
  { id: "cookies-analytics", label: "Cookies & Analytics" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-sharing", label: "Data Sharing & Disclosure" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights & Choices" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-policy", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteUrl}/privacy-policy` },
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
          eyebrow="Privacy Policy"
          title="Privacy Policy"
          description="How Code & Motions collects, uses, and protects information when you use this website."
          breadcrumbLabel="Privacy Policy"
          lastUpdated={lastUpdated}
        />

        <section className="bg-(--color-surface) px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <LegalNotice>
              This Privacy Policy is a general template intended to give visitors a clear, honest overview of our
              data practices. It should be reviewed by a qualified legal professional before being relied on as a
              final, binding policy — particularly for anything specific to your jurisdiction or industry
              regulations.
            </LegalNotice>

            <div className="mt-8">
              <LegalTableOfContents items={toc} />
            </div>

            <div className="mt-4">
              <LegalSection id="introduction" heading="1. Introduction">
                <p>
                  Code &amp; Motions (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{" "}
                  <strong>codeandmotions.com</strong>. This Privacy Policy explains what information we collect when
                  you visit our website or contact us, how we use that information, and the choices available to
                  you. By using this website, you agree to the practices described in this policy.
                </p>
              </LegalSection>

              <LegalSection id="information-we-collect" heading="2. Information We Collect">
                <p>We collect information in two general ways:</p>
                <ul>
                  <li>
                    <strong>Information you provide directly</strong> — such as your name, email address, phone
                    number, and project details when you submit our{" "}
                    <Link href="/contact">contact form</Link>, message us on WhatsApp, or email us directly.
                  </li>
                  <li>
                    <strong>Information collected automatically</strong> — general usage data such as pages visited,
                    device and browser type, and approximate location, collected via analytics tools described in
                    the section below.
                  </li>
                </ul>
                <p>
                  We do not knowingly collect sensitive personal information (such as financial account details,
                  health information, or government ID numbers) through this website.
                </p>
              </LegalSection>

              <LegalSection id="how-we-use-information" heading="3. How We Use Your Information">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Respond to your enquiries and discuss potential projects;</li>
                  <li>Communicate with you about a project you&apos;ve engaged us for;</li>
                  <li>Understand how visitors use our website, so we can improve it; and</li>
                  <li>Meet legal or operational obligations where applicable.</li>
                </ul>
                <p>We do not sell your personal information to third parties.</p>
              </LegalSection>

              <LegalSection id="cookies-analytics" heading="4. Cookies &amp; Analytics">
                <p>
                  This website uses <strong>Google Analytics</strong> to understand how visitors use our site (for
                  example, which pages are viewed and roughly how long visitors stay). Google Analytics may use
                  cookies or similar technologies to collect this information. This data is aggregated and used for
                  website improvement purposes; it is not used to individually identify you.
                </p>
                <p>
                  You can control or disable cookies through your browser settings. Disabling cookies may affect
                  some website functionality but will not prevent you from browsing our pages.
                </p>
              </LegalSection>

              <LegalSection id="third-party-services" heading="5. Third-Party Services">
                <p>We use a small number of third-party services to operate this website and communicate with you:</p>
                <ul>
                  <li>
                    <strong>Google Analytics</strong>, for website usage analytics (see above).
                  </li>
                  <li>
                    <strong>WhatsApp</strong>, if you choose to message us via our WhatsApp contact links — subject
                    to WhatsApp&apos;s own privacy policy.
                  </li>
                </ul>
                <p>
                  These third parties have their own privacy policies governing how they handle data. We encourage
                  you to review them.
                </p>
              </LegalSection>

              <LegalSection id="data-sharing" heading="6. Data Sharing &amp; Disclosure">
                <p>
                  We do not share your personal information with third parties except: (a) with your consent; (b)
                  with service providers who help us operate our website or deliver a project you&apos;ve engaged us
                  for, under reasonable confidentiality expectations; or (c) where required by law.
                </p>
              </LegalSection>

              <LegalSection id="data-security" heading="7. Data Security">
                <p>
                  We take reasonable measures to protect the information you share with us. However, no method of
                  transmission over the internet or electronic storage is completely secure, and we cannot
                  guarantee absolute security.
                </p>
              </LegalSection>

              <LegalSection id="your-rights" heading="8. Your Rights &amp; Choices">
                <p>
                  Depending on where you&apos;re located, you may have rights to access, correct, or request
                  deletion of the personal information we hold about you. To make a request, contact us using the
                  details below and we&apos;ll respond as soon as reasonably possible.
                </p>
              </LegalSection>

              <LegalSection id="childrens-privacy" heading="9. Children&apos;s Privacy">
                <p>
                  This website is intended for a general business audience and is not directed at children. We do
                  not knowingly collect personal information from children.
                </p>
              </LegalSection>

              <LegalSection id="changes-to-policy" heading="10. Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes to our practices or for
                  legal reasons. We&apos;ll update the &quot;Last updated&quot; date at the top of this page when we
                  do.
                </p>
              </LegalSection>

              <LegalSection id="contact-us" heading="11. Contact Us">
                <p>If you have questions about this Privacy Policy or how we handle your information, contact us:</p>
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
