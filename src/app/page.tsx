import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesCarousel from "@/components/ServicesCarousel";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <Hero />

        <section id="services" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-xl">
              <h2 className="text-[30px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[36px]">
                Popular services
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-(--color-ink-soft)">
                Six disciplines, one team. Drag or use the arrows to see how
                we cover a project end to end.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <ServicesCarousel />
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  );
}
