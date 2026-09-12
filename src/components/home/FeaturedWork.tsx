import React from "react";
import Link from "next/link";

const work = [
  ["01", "Web & E-commerce", "High-converting websites and online stores."],
  ["02", "Software & SaaS", "Custom digital products built around real workflows."],
  ["03", "Brand & Design", "Visual identities and digital experiences."],
  ["04", "Motion & Video", "Animation and promotional content that gets attention."],
];

export default function FeaturedWork() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
              Selected Work
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Built with purpose.
            </h2>
          </div>
          <Link href="/contact" className="font-semibold text-slate-950 underline underline-offset-4">
            Start a project →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {work.map(([num, title, text]) => (
            <div key={title} className="min-h-64 rounded-[30px] bg-white p-8 shadow-sm transition hover:-translate-y-1">
              <span className="text-sm text-cyan-500">{num}</span>
              <h3 className="mt-20 text-2xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
