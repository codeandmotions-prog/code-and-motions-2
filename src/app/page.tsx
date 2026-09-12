import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TrustProof from "@/components/home/TrustProof";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import FeaturedLabNova from "@/components/home/FeaturedLabNova";
import WhyCodeAndMotions from "@/components/home/WhyCodeAndMotions";
import ClientSuccess from "@/components/home/ClientSuccess";
import ProcessSection from "@/components/home/ProcessSection";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <TrustProof />
        <FeaturedWork />
        <ServicesShowcase />
        <FeaturedLabNova />
        <WhyCodeAndMotions />
        <ClientSuccess />
        <ProcessSection />
        <HomeFinalCTA />
      </main>

      <Footer />
    </>
  );
}
