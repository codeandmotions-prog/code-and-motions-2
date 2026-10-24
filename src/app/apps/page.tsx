import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppsHero from "@/components/apps/AppsHero";
import AppsGrid from "@/components/apps/AppsGrid";
import { apps } from "@/data/apps";

export const metadata: Metadata = {
  title: "Apps",
  description: "Apps built by Code & Motions to make everyday tasks easier.",
};

export default function AppsPage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <AppsHero />

        <section id="apps" className="scroll-mt-24 bg-(--color-surface-raised) px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
                Our Apps
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                Explore Our Apps
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
                Each app has its own page with what it does, how to install it and, when it is ready, its download.
              </p>
            </div>
            <div className="mt-12">
              <AppsGrid apps={apps} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
