import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HeroProjectCTA from "@/components/home/HeroProjectCTA";
import PlatformsMarquee from "@/components/home/PlatformsMarquee";
import WhyWorkWithUs from "@/components/home/WhyWorkWithUs";
import ByTheNumbers from "@/components/home/ByTheNumbers";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <HeroProjectCTA />
        <PlatformsMarquee />
        <WhyWorkWithUs />
        <ByTheNumbers />
      </main>

      <Footer />
    </>
  );
}
