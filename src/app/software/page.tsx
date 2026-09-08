import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftwareHero from "@/components/software/SoftwareHero";
import AboutLabNova from "@/components/software/AboutLabNova";
import FeatureGrid from "@/components/software/FeatureGrid";
import HowItWorks from "@/components/software/HowItWorks";
import TechStack from "@/components/software/TechStack";
import SoftwareFinalCTA from "@/components/software/SoftwareFinalCTA";

export const metadata: Metadata = {
  title: "LabNova — Software",
  description:
    "LabNova is a Windows desktop laboratory management system by Code & Motions: patient management, test & result entry, report generation and more.",
  alternates: {
    canonical: "/software",
  },
  openGraph: {
    title: "LabNova — Smart Laboratory Management System",
    description:
      "A Windows desktop laboratory management solution built to simplify and automate laboratory operations.",
    url: "/software",
    images: [
      {
        url: "/images/labnova-full.png",
        width: 1305,
        height: 732,
        alt: "LabNova — Smart Laboratory Management System",
      },
    ],
  },
};

export default function SoftwarePage() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <SoftwareHero />
        <AboutLabNova />
        <FeatureGrid />
        <HowItWorks />
        <TechStack />
        <SoftwareFinalCTA />
      </main>

      <Footer />
    </>
  );
}
