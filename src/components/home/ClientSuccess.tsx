import React from "react";

export default function ClientSuccess() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">Client Success</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          Real work. Real partnerships.
        </h2>
        <div className="mt-12 rounded-[32px] border border-slate-200 bg-white p-8 md:p-14">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xl text-white">“</div>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-slate-700">
            Verified client testimonials will appear here as real project feedback is added.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
            No fabricated testimonials or ratings
          </p>
        </div>
      </div>
    </section>
  );
}
