import React from "react";
import Link from "next/link";

const services = [
  ["01", "Software Development", "/services/software-development"],
  ["02", "Website Development", "/services/website-development"],
  ["03", "Shopify Development", "/services/shopify-development"],
  ["04", "Video & Animation", "/services/video-animation"],
  ["05", "Graphic Design", "/services/graphic-design"],
  ["06", "SEO", "/services/seo"],
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="bg-slate-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Services</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Digital solutions for every stage of growth.
            </h2>
            <p className="mt-5 leading-7 text-white/60">
              One team covering strategy, design, development, creative and growth.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map(([num, title, href]) => (
              <Link key={href} href={href} className="group flex items-center justify-between py-6">
                <div className="flex items-center gap-6">
                  <span className="text-sm text-cyan-400">{num}</span>
                  <span className="text-xl font-medium md:text-2xl">{title}</span>
                </div>
                <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-cyan-400">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
