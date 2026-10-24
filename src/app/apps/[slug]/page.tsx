import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppDetailHero from "@/components/apps/AppDetailHero";
import AppDetailContent from "@/components/apps/AppDetailContent";
import AppDownloadBand from "@/components/apps/AppDownloadBand";
import ServiceFAQSection from "@/components/services/detail/ServiceFAQSection";
import { apps, getApp } from "@/data/apps";

// Only apps listed in src/data/apps.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return { title: app.name, description: app.shortDescription };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <AppDetailHero app={app} />
        <AppDetailContent app={app} />
        {app.faqs.length > 0 && (
          <ServiceFAQSection faqs={app.faqs} heading={`${app.name} questions`} />
        )}
        <AppDownloadBand app={app} />
      </main>

      <Footer />
    </>
  );
}
