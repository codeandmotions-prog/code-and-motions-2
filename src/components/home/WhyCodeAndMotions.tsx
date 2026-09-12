import React from "react";

const points = [
  ["01", "Strategy first", "We start with your business goal, audience and requirements."],
  ["02", "Design that communicates", "Clean interfaces and visuals designed to make the message clear."],
  ["03", "Development that works", "Reliable websites, stores and software built for real use."],
  ["04", "Growth mindset", "SEO and digital improvements that help your product move forward."],
];

export default function WhyCodeAndMotions() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">Why Code & Motions</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              From idea to impact.
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {points.map(([num, title, text]) => (
              <div key={num} className="grid gap-4 py-7 sm:grid-cols-[60px_1fr]">
                <span className="text-sm text-cyan-500">{num}</span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
