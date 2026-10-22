import { ShieldAlert } from "lucide-react";
import type { CalcContent } from "@/data/calculators/types";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
      {children}
    </h2>
  );
}

const P = "mt-4 text-[15.5px] leading-[1.75] text-(--color-ink-soft)";
const LI = "text-[15.5px] leading-[1.7] text-(--color-ink-soft)";

/** Server-rendered explanatory article for a calculator. */
export default function CalcArticle({ name, content }: { name: string; content: CalcContent }) {
  const c = content;
  return (
    <section className="bg-(--color-surface-raised) py-16 lg:py-24">
      <article className="mx-auto max-w-3xl px-6 wrap-anywhere lg:px-10">
        <H2 id="about">About the {name.toLowerCase()}</H2>
        {c.intro.map((p, i) => (
          <p key={i} className={P}>{p}</p>
        ))}

        <div className="mt-12">
          <H2 id="who-for">Who it is for</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {c.whoFor.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="inputs">What each input means</H2>
          <dl className="mt-4 divide-y divide-(--color-line) rounded-2xl border border-(--color-line)">
            {c.inputs.map((x) => (
              <div key={x.name} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[14.5px] font-semibold text-(--color-ink)">{x.name}</dt>
                <dd className="text-[14.5px] leading-relaxed text-(--color-ink-soft)">{x.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <H2 id="how-it-works">How it is calculated</H2>
          {c.how.map((p, i) => <p key={i} className={P}>{p}</p>)}
          {c.formulas && c.formulas.length > 0 && (
            <dl className="mt-5 space-y-3">
              {c.formulas.map((f) => (
                <div key={f.label} className="rounded-2xl bg-(--color-surface) px-5 py-4">
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">{f.label}</dt>
                  <dd className="mt-1.5 overflow-x-auto font-mono text-[14.5px] leading-relaxed text-(--color-ink)">{f.expr}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-12">
          <H2 id="reading-results">How to read the result</H2>
          {c.interpret.map((p, i) => <p key={i} className={P}>{p}</p>)}
        </div>

        <div className="mt-12">
          <H2 id="example">Worked example</H2>
          <p className={P}>{c.example.setup}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-(--color-blue)">
            {c.example.steps.map((s, i) => <li key={i} className={LI}>{s}</li>)}
          </ol>
          <p className="mt-5 rounded-2xl border border-(--color-blue)/20 bg-(--color-blue)/5 px-5 py-4 text-[15px] font-semibold leading-relaxed text-(--color-ink)">
            {c.example.result}
          </p>
        </div>

        <div className="mt-12">
          <H2 id="uses">Practical uses</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {c.useCases.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="limitations">Assumptions and limitations</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {c.limitations.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
          {c.disclaimer && (
            <p className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[14px] leading-relaxed text-amber-950">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{c.disclaimer}</span>
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
