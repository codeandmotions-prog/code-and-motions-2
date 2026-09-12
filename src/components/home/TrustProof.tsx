import React from "react";

const items = [
  ["01", "One Team", "Design, development and growth working together."],
  ["02", "6 Disciplines", "Software, web, Shopify, motion, design and SEO."],
  ["03", "Modern Stack", "Modern tools and practical engineering for digital products."],
];

export default function TrustProof() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {items.map(([num, title, text]) => (
            <div key={title} className="rounded-[28px] border border-slate-200 p-7">
              <span className="text-sm font-semibold text-cyan-500">{num}</span>
              <h3 className="mt-8 text-2xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
