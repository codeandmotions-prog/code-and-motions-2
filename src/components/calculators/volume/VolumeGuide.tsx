import Link from "next/link";
import { ChevronDown, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import type { CalcContent } from "@/data/calculators/types";
import type { CalcReference } from "@/data/calculators/seo";
import { getCalculator } from "@/data/calculators/registry";
import { fmt } from "@/lib/calculators/format";
import { SHAPES, shapeAnchor, volumeUnit } from "./volumeData";
import { WORKED_EXAMPLES } from "./volumeExamples";

const P = "mt-4 text-[15.5px] leading-[1.75] text-(--color-ink-soft)";
const LI = "text-[15.5px] leading-[1.7] text-(--color-ink-soft)";
const linkClass = "font-semibold text-(--color-blue) underline-offset-4 hover:underline";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
      {children}
    </h2>
  );
}

/** Link to another calculator on the site; plain text if the slug is ever removed from the registry. */
function CalcLink({ slug, children }: { slug: string; children: ReactNode }) {
  if (!getCalculator(slug)) return <>{children}</>;
  return (
    <Link href={`/tools/${slug}`} className={linkClass}>
      {children}
    </Link>
  );
}

/** Plain numbers for ordinary sizes, "a × 10ᵇ" for very small or very large factors, so every cell is one short token. */
const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
function factor(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e-3 && abs < 1e7) return fmt(n, 5);
  const [mant, exp] = n.toExponential(4).split("e");
  const m = mant.includes(".") ? mant.replace(/0+$/, "").replace(/\.$/, "") : mant;
  const sup = String(Number(exp)).split("").map((c) => SUP[c] ?? c).join("");
  return m === "1" ? `10${sup}` : `${m} × 10${sup}`;
}

const TABLE_ROWS = ["mm3", "cm3", "l", "m3", "in3", "ft3", "yd3", "usgal", "ukgal"];
const TABLE_COLS = ["cm3", "l", "m3", "in3", "ft3", "usgal", "ukgal"];

const CHOOSE: Record<string, { watch: string }> = {
  sphere: { watch: "Measure across the widest point and halve it to get the radius." },
  cone: { watch: "Use the straight, vertical height, not the slanted side. If you only know the slant length, find the height with the Pythagorean theorem." },
  cube: { watch: "All edges must be equal. If they are not, use the rectangular box." },
  cylinder: { watch: "A tank lying on its side still uses the same formula: the length is h. Radius is half the diameter." },
  box: { watch: "Convert thickness given in millimetres to the same unit as the other sides, or pick a unit per side." },
  capsule: { watch: "h is only the straight middle. Overall length = h + 2r." },
  cap: { watch: "Enter any two of R, h and a. The depth of liquid in a spherical tank measured from the bottom is the cap height h." },
  frustum: { watch: "If r₁ = r₂ you have a cylinder; if r₂ = 0 you have a cone." },
  ellipsoid: { watch: "Semi-axes are half of the full dimensions. Two equal semi-axes give a spheroid, such as a rugby ball." },
  pyramid: { watch: "For a base that is not square, V = ⅓ × base area × height, using the area calculator for the base." },
  tube: { watch: "This is the wall material. For the space inside a pipe use the cylinder with the inner radius." },
};

/**
 * Server-rendered guide for the volume calculator page. Replaces the generic article for this slug so that the
 * formulas, worked examples, unit table and shape guide sit in one structured, linkable document.
 */
export default function VolumeGuide({ content, references }: { content: CalcContent; references?: CalcReference[] }) {
  const toc = [
    ["about", "What a volume calculator does"],
    ["how-to-use", "How to use the calculators"],
    ["formulas", "Volume formulas for 11 shapes"],
    ["worked-examples", "Worked examples"],
    ["unit-conversion", "Volume unit conversion table"],
    ["units-explained", "Litres, cubic metres and gallons"],
    ["choose-a-shape", "Which shape should you choose?"],
    ["limitations", "Assumptions and limitations"],
    ["sources", "Sources"],
  ];

  return (
    <section className="bg-(--color-surface-raised) py-16 lg:py-24">
      <article className="mx-auto max-w-4xl px-6 wrap-anywhere lg:px-10">
        <nav aria-label="On this page" className="rounded-2xl border border-(--color-line) bg-(--color-surface) px-5 py-4">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-ink-soft)">On this page</p>
          <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex min-h-8 items-center text-[14.5px] font-medium text-(--color-blue) underline-offset-4 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12">
          <H2 id="about">What a volume calculator does</H2>
          {content.intro.map((p, i) => (
            <p key={i} className={P}>{p}</p>
          ))}
          <p className={P}>
            It sits alongside the <CalcLink slug="surface-area-calculator">surface area calculator</CalcLink> (the outside skin of a solid, useful for paint or coating) and the{" "}
            <CalcLink slug="area-calculator">area calculator</CalcLink> (flat shapes such as floors and bases). Use volume when the question is “how much does it hold?” or “how much material fills it?”.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {content.whoFor.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="how-to-use">How to use the volume calculators</H2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-(--color-blue)">
            <li className={LI}>Find your shape in the list above, or use the “Choose a shape” buttons to jump to it.</li>
            <li className={LI}>Type each dimension and pick its unit. Units can differ from one dimension to the next.</li>
            <li className={LI}>Choose the unit for the answer in “Show volume in”, or leave it on the default.</li>
            <li className={LI}>Press Calculate. The answer appears under the shape together with litres, cubic metres, cubic feet and US and UK gallons.</li>
          </ol>
          <dl className="mt-6 divide-y divide-(--color-line) rounded-2xl border border-(--color-line)">
            {content.inputs.map((x) => (
              <div key={x.name} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[14.5px] font-semibold text-(--color-ink)">{x.name}</dt>
                <dd className="text-[14.5px] leading-relaxed text-(--color-ink-soft)">{x.text}</dd>
              </div>
            ))}
          </dl>
          {content.how.map((p, i) => (
            <p key={i} className={P}>{p}</p>
          ))}
        </div>

        <div className="mt-12">
          <H2 id="formulas">Volume formulas for 11 shapes</H2>
          <p className={P}>
            These are the standard formulas used by every calculator on this page. π is taken at full precision (about 3.14159265). A circle’s radius is half its diameter; the{" "}
            <CalcLink slug="circle-calculator">circle calculator</CalcLink> converts between radius, diameter and circumference.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {SHAPES.map((s) => (
              <li key={s.id} className="min-w-0 rounded-2xl border border-(--color-line) bg-(--color-surface) p-5">
                <h3 className="text-[16.5px] font-bold text-(--color-ink)">
                  <a href={`#${shapeAnchor(s.id)}`} className="hover:text-(--color-blue)">{s.short}</a>
                </h3>
                <p className="mt-2 break-words font-mono text-[14.5px] font-semibold text-(--color-blue)">{s.formula}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-(--color-ink-soft)">{s.variables}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-[18px] font-bold text-(--color-ink)">Handy relationships</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            <li className={LI}>A cone or pyramid holds exactly one third of the cylinder or box with the same base and height.</li>
            <li className={LI}>A sphere holds two thirds of the cylinder that just encloses it (same radius, height equal to the diameter).</li>
            <li className={LI}>Doubling every dimension multiplies the volume by 8, because volume scales with the cube of length.</li>
            <li className={LI}>For any pyramid or cone, V = ⅓ × base area × height, whatever the shape of the base.</li>
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="worked-examples">Volume calculation examples, step by step</H2>
          <p className={P}>
            One worked example for every shape. Open any example to see the working; the numbers are computed with the same formulas as the calculators, so you can type the same values in to check.
          </p>
          <div className="mt-6 space-y-3">
            {WORKED_EXAMPLES.map((ex, i) => (
              <details key={ex.id} open={i === 0} className="group rounded-2xl border border-(--color-line) bg-white open:bg-(--color-surface)">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15.5px] font-bold text-(--color-ink)">{ex.title}</h3>
                  <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-(--color-blue) transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-[15px] leading-relaxed text-(--color-ink-soft)">{ex.setup}</p>
                  <p className="mt-3 font-mono text-[13.5px] font-semibold text-(--color-blue)">{SHAPES.find((s) => s.id === ex.id)?.formula}</p>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-(--color-blue)">
                    {ex.steps.map((s, k) => <li key={k} className={LI}>{s}</li>)}
                  </ol>
                  <p className="mt-4 rounded-xl border border-(--color-blue)/20 bg-(--color-blue)/5 px-4 py-3 text-[14.5px] font-semibold leading-relaxed text-(--color-ink)">{ex.result}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <H2 id="unit-conversion">Volume unit conversion table</H2>
          <p className={P}>
            Read across a row: “1 cubic foot equals …”. Factors come from the exact definitions of the inch (25.4 mm), the US gallon (231 cubic inches) and the Imperial gallon (4.54609 litres). For other kinds of conversion use the{" "}
            <CalcLink slug="unit-conversion-calculator">unit conversion calculator</CalcLink>.
          </p>
          <div role="region" aria-label="Volume unit conversion table, scrolls sideways on small screens" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-(--color-line) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)">
            <table className="w-full min-w-[680px] border-collapse text-left text-[13px]">
              <caption className="sr-only">Conversion factors between common volume units</caption>
              <thead>
                <tr className="border-b border-(--color-line) bg-(--color-surface) text-(--color-ink)">
                  <th scope="col" className="px-2.5 py-2.5 font-semibold">1 unit =</th>
                  {TABLE_COLS.map((c) => (
                    <th key={c} scope="col" className="px-2.5 py-2.5 font-semibold">{volumeUnit(c)!.abbr}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((r) => {
                  const row = volumeUnit(r)!;
                  return (
                    <tr key={r} className="border-b border-(--color-line)/70 last:border-0">
                      <th scope="row" className="whitespace-nowrap px-2.5 py-2 font-semibold text-(--color-ink)">1 {row.abbr}</th>
                      {TABLE_COLS.map((c) => (
                        <td key={c} className="whitespace-nowrap px-2.5 py-2 tabular-nums text-(--color-ink-soft)">{r === c ? "1" : factor(row.m3 / volumeUnit(c)!.m3)}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-(--color-ink-soft)">1 mL equals 1 cm³. Values are shown to five significant figures.</p>
        </div>

        <div className="mt-12">
          <H2 id="units-explained">Litres, cubic metres, gallons and other volume units</H2>
          <dl className="mt-5 space-y-3">
            {[
              ["Litre (L) and millilitre (mL)", `A litre is a thousandth of a cubic metre, so 1 L = 1,000 cm³ and 1 mL = 1 cm³. It is the everyday unit for liquids and for the capacity of tanks, bottles and containers.`],
              ["Cubic metre (m³)", `The SI unit of volume. 1 m³ = 1,000 L. It is the usual unit for concrete, soil, gravel, rooms and large tanks.`],
              ["US gallon (gal)", `Defined as 231 cubic inches, which is exactly 3.785411784 litres. One cubic metre is about ${fmt(1 / volumeUnit("usgal")!.m3, 6)} US gallons.`],
              ["Imperial (UK) gallon (gal)", `Defined as exactly 4.54609 litres, about ${fmt((volumeUnit("ukgal")!.m3 / volumeUnit("usgal")!.m3 - 1) * 100, 2)}% larger than the US gallon. Always check which gallon a figure uses.`],
              ["Cubic foot (ft³) and cubic yard (yd³)", `1 ft³ = ${fmt(volumeUnit("ft3")!.m3 * 1000, 6)} L (about ${fmt(volumeUnit("ft3")!.m3 / volumeUnit("usgal")!.m3, 5)} US gallons). 1 yd³ = 27 ft³ = ${fmt(volumeUnit("yd3")!.m3, 6)} m³; US concrete and soil are often sold by the cubic yard.`],
              ["Cubic inch (in³)", `1 in³ = ${fmt(volumeUnit("in3")!.m3 * 1e6, 8)} cm³ exactly, from 1 in = 2.54 cm.`],
            ].map(([term, text]) => (
              <div key={term} className="rounded-2xl bg-(--color-surface) px-5 py-4">
                <dt className="text-[15px] font-bold text-(--color-ink)">{term}</dt>
                <dd className="mt-1.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{text}</dd>
              </div>
            ))}
          </dl>
          {content.interpret.map((p, i) => (
            <p key={i} className={P}>{p}</p>
          ))}
        </div>

        <div className="mt-12">
          <H2 id="choose-a-shape">Which shape should you choose?</H2>
          <p className={P}>
            Match the real object to the closest solid. For something made of several parts, such as a silo (cylinder plus cone) or a tank with domed ends, calculate each part and add the results. Oddly shaped containers are best treated as an estimate.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {SHAPES.map((s) => (
              <li key={s.id} className="min-w-0 rounded-2xl border border-(--color-line) p-5">
                <h3 className="text-[16px] font-bold text-(--color-ink)">
                  <a href={`#${shapeAnchor(s.id)}`} className={linkClass}>{s.short}</a>
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)"><span className="font-semibold text-(--color-ink)">Good for:</span> {s.fits}.</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)"><span className="font-semibold text-(--color-ink)">Watch out:</span> {CHOOSE[s.id].watch}</p>
              </li>
            ))}
          </ul>
          <p className={P}>
            A cone’s height and slant length are linked by the <CalcLink slug="pythagorean-theorem-calculator">Pythagorean theorem</CalcLink>, so you can recover the height from a measured slant length and the radius.
          </p>
          <h3 className="mt-8 text-[18px] font-bold text-(--color-ink)">Practical uses</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {content.useCases.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="limitations">Assumptions and limitations</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {content.limitations.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
          <p className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[14px] leading-relaxed text-amber-950">
            <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>Results are mathematical volumes of ideal shapes. For purchases, structural work or anything safety-related, measure on site and confirm quantities with your supplier or a qualified professional.</span>
          </p>
        </div>

        {references && references.length > 0 && (
          <div className="mt-12">
            <H2 id="sources">Sources and further reading</H2>
            <p className={P}>Formulas and unit definitions can be checked against these references.</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
              {references.map((r) => (
                <li key={r.url} className={LI}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </section>
  );
}
