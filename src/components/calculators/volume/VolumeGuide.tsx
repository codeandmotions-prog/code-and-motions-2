import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import type { CalcContent } from "@/data/calculators/types";
import type { CalcReference } from "@/data/calculators/seo";
import { getCalculator } from "@/data/calculators/registry";
import { fmt } from "@/lib/calculators/format";
import { SHAPES, shapeAnchor, shapeGuideAnchor, volumeUnit } from "./volumeData";
import { WORKED_EXAMPLES } from "./volumeExamples";
import { SHAPE_ARTICLES } from "./volumeShapeContent";

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

/** Real-world objects and the calculator that fits them best. */
const OBJECTS: { object: string; shape: string; note: string }[] = [
  { object: "Round water tank, drum, can, well or column", shape: "cylinder", note: "Use inside dimensions for capacity." },
  { object: "Ball, bubble or spherical tank", shape: "sphere", note: "Halve the diameter to get the radius." },
  { object: "Funnel, traffic cone or conical pile", shape: "cone", note: "Height is vertical, not along the slope." },
  { object: "Cube-shaped box or block", shape: "cube", note: "All edges must be equal." },
  { object: "Room, pool, aquarium, slab or planter bed", shape: "box", note: "For a sloping floor use the average depth." },
  { object: "Pill, or tank with hemispherical ends", shape: "capsule", note: "Enter the straight middle length only." },
  { object: "Dome, bowl or part-filled spherical tank", shape: "cap", note: "Enter any two of R, h and a." },
  { object: "Bucket, flower pot or lampshade", shape: "frustum", note: "Measure both rim and base radius." },
  { object: "Rugby ball or oval tank", shape: "ellipsoid", note: "Enter half of each full dimension." },
  { object: "Pyramid, roof hip or square hopper", shape: "pyramid", note: "Use the vertical height." },
  { object: "Pipe wall, ring or hollow column", shape: "tube", note: "This is the material, not the hollow space." },
];

/**
 * Server-rendered guide for the volume calculator page. Replaces the generic article for this slug so that the
 * formulas, worked examples, unit table and shape guide sit in one structured, linkable document.
 */
export default function VolumeGuide({ content, references }: { content: CalcContent; references?: CalcReference[] }) {
  const toc = [
    ["about", "What a volume calculator does"],
    ["how-to-use", "How to use the calculators"],
    ["shape-guide", "Formula, example and tips for every shape"],
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
            Volume is the amount of three-dimensional space a solid occupies, measured in cubic units. It is different from area, which measures a flat surface in square units: the{" "}
            <CalcLink slug="area-calculator">area calculator</CalcLink> handles floors and bases, and the <CalcLink slug="surface-area-calculator">surface area calculator</CalcLink> gives the outer skin of a solid, useful for paint or coating. Use volume when the question is “how much does it hold?” or “how much material fills it?”.
          </p>
          <p className={P}>
            Capacity is the volume of the inside of a container, so for tanks, buckets and boxes measure the inside dimensions. For a solid made of several simple parts, such as a silo (a cylinder topped by a cone), calculate each part and add the results; for a solid with a hole, subtract the hole. Irregular objects can be measured by the water they displace.
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
            <li className={LI}>Press Calculate. The result shows the formula, your numbers put into it and the answer, together with litres, cubic metres, cubic feet and US and UK gallons.</li>
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
          <H2 id="shape-guide">Volume formula, worked example and tips for every shape</H2>
          <p className={P}>
            The sections below follow the same order as the calculators. Each one explains the shape, gives the formula, works through an example you can repeat in the calculator, and lists practical tips and common mistakes. π is used at full precision (about 3.14159265), and a circle’s radius is half its diameter; the{" "}
            <CalcLink slug="circle-calculator">circle calculator</CalcLink> converts between radius, diameter and circumference.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Jump to a shape">
            {SHAPES.map((s) => (
              <li key={s.id}>
                <a href={`#${shapeGuideAnchor(s.id)}`} className="inline-flex min-h-9 items-center rounded-full border border-(--color-line) bg-(--color-surface) px-3.5 text-[13.5px] font-semibold text-(--color-ink) hover:border-(--color-blue)/50 hover:text-(--color-blue) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)">
                  {s.short}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-12">
            {SHAPE_ARTICLES.map((art) => {
              const shape = SHAPES.find((s) => s.id === art.id)!;
              const ex = WORKED_EXAMPLES.find((e) => e.id === art.id)!;
              return (
                <section key={art.id} id={shapeGuideAnchor(art.id)} aria-labelledby={`${shapeGuideAnchor(art.id)}-h`} className="scroll-mt-24 border-t border-(--color-line) pt-8">
                  <h3 id={`${shapeGuideAnchor(art.id)}-h`} className="text-[21px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[24px]">
                    {art.heading}
                  </h3>
                  {art.intro.map((p, i) => <p key={i} className={P}>{p}</p>)}

                  <div className="mt-5 rounded-2xl bg-(--color-surface) px-5 py-4">
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">Formula</p>
                    <p className="mt-1.5 break-words font-mono text-[15.5px] font-semibold text-(--color-ink)">{shape.formula}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-(--color-ink-soft)">{shape.variables}</p>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
                    {art.formulaNotes.map((x, i) => <li key={i} className={LI}>{x}</li>)}
                  </ul>

                  <h4 className="mt-6 text-[16.5px] font-bold text-(--color-ink)">Worked example: {ex.title.replace(/^[^:]+:\s*/, "")}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-(--color-ink-soft)">{ex.setup}</p>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-(--color-blue)">
                    {ex.steps.map((x, k) => <li key={k} className={LI}>{x}</li>)}
                  </ol>
                  <p className="mt-4 rounded-xl border border-(--color-blue)/20 bg-(--color-blue)/5 px-4 py-3 text-[14.5px] font-semibold leading-relaxed text-(--color-ink)">{ex.result}</p>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <h4 className="text-[16.5px] font-bold text-(--color-ink)">Practical details</h4>
                      <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
                        {art.practical.map((x, i) => <li key={i} className={LI}>{x}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[16.5px] font-bold text-(--color-ink)">Common mistakes</h4>
                      <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
                        {art.mistakes.map((x, i) => <li key={i} className={LI}>{x}</li>)}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-5">
                    <a href={`#${shapeAnchor(art.id)}`} className={linkClass}>Back to the {shape.short.toLowerCase()} calculator</a>
                  </p>
                </section>
              );
            })}
          </div>

          <h3 className="mt-12 text-[18px] font-bold text-(--color-ink)">Handy relationships</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            <li className={LI}>A cone or pyramid holds exactly one third of the cylinder or box with the same base and height.</li>
            <li className={LI}>A sphere holds two thirds of the cylinder that just encloses it (same radius, height equal to the diameter).</li>
            <li className={LI}>Doubling every dimension multiplies the volume by 8, because volume scales with the cube of length.</li>
            <li className={LI}>For any pyramid or cone, V = ⅓ × base area × height, whatever the shape of the base.</li>
          </ul>
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
            Match the real object to the closest solid, then use the calculator for that shape. Oddly shaped containers are best treated as an estimate. A cone’s height and slant length are linked by the{" "}
            <CalcLink slug="pythagorean-theorem-calculator">Pythagorean theorem</CalcLink>, so you can recover the height from a measured slant length and the radius.
          </p>
          <ul className="mt-6 divide-y divide-(--color-line) rounded-2xl border border-(--color-line)">
            {OBJECTS.map((o) => {
              const shape = SHAPES.find((s) => s.id === o.shape)!;
              return (
                <li key={o.shape} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)] sm:gap-6">
                  <div>
                    <p className="text-[15px] font-semibold text-(--color-ink)">{o.object}</p>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-(--color-ink-soft)">{o.note}</p>
                  </div>
                  <p className="text-[14.5px] font-semibold sm:text-right">
                    <a href={`#${shapeAnchor(shape.id)}`} className={linkClass}>{shape.short} calculator</a>
                  </p>
                </li>
              );
            })}
          </ul>
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
