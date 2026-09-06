import type { Metadata } from "next";
import { manrope } from "@/fonts";
import "./globals.css";

const siteUrl = "https://codeandmotions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Code & Motions — Design, Develop, Grow.",
    template: "%s | Code & Motions",
  },
  description:
    "Code & Motions builds websites, software, Shopify stores, SEO and video solutions for ambitious brands. A digital agency that designs, develops and grows modern businesses.",
  keywords: [
    "digital agency",
    "web development",
    "software development",
    "Shopify development",
    "SEO agency",
    "video and animation",
    "graphic design agency",
  ],
  authors: [{ name: "Code & Motions" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Code & Motions — Design, Develop, Grow.",
    description:
      "We build digital experiences that move businesses forward: web, software, Shopify, SEO, design and video.",
    siteName: "Code & Motions",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1262,
        height: 696,
        alt: "Code & Motions logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code & Motions — Design, Develop, Grow.",
    description:
      "We build digital experiences that move businesses forward: web, software, Shopify, SEO, design and video.",
    images: ["/images/logo-full.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-(--color-surface-raised) text-(--color-ink)">
        {children}
      </body>
    </html>
  );
}
