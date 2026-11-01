import Link from "next/link";
import type { ReactNode } from "react";
import type { CalcContent } from "@/data/calculators/types";
import type { CalcReference } from "@/data/calculators/seo";
import { getCalculator } from "@/data/calculators/registry";
import { factorize } from "@/lib/calculators/numtheory";
import FactorTree from "./FactorTree";
import { buildCommonRows } from "./factorData";

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

const TOC: [string, string][] = [
  ["what-is-a-factor", "What is a factor?"],
  ["how-to-find-factors", "How to find the factors of a number"],
  ["prime-factorization", "Prime factorization and the factor tree"],
  ["factor-pairs", "Factor pairs and proper factors"],
  ["prime-or-composite", "Is a number prime or composite?"],
  ["common-numbers", "Factors of common numbers"],
  ["how-it-works", "How this factor calculator works"],
  ["limitations", "Limits of this calculator"],
];

/**
 * Server-rendered guide for the factor calculator page. It replaces the generic article for this slug (as the volume
 * calculator does) so each question people ask about factors has its own heading, worked example and answer.
 */
export default function FactorGuide({ content, references }: { content: CalcContent; references?: CalcReference[] }) {
  const rows = buildCommonRows();
  const pf72 = factorize(72);

  return (
    <section className="bg-(--color-surface-raised) py-16 lg:py-24">
      <article className="mx-auto max-w-3xl px-6 wrap-anywhere lg:px-10">
        <nav aria-label="On this page" className="rounded-2xl border border-(--color-line) bg-white px-5 py-4">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">On this page</p>
          <ol className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {TOC.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex min-h-11 items-center text-[14.5px] sm:min-h-9 font-medium text-(--color-ink) underline-offset-4 hover:text-(--color-blue) hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12">
          <H2 id="what-is-a-factor">What is a factor?</H2>
          <p className={P}>
            A factor of a whole number is a whole number that divides it exactly, with nothing left over. Because 3 × 8 = 24, both 3 and 8 are factors of 24, and so are 1, 2, 4, 6, 12 and 24. Every whole number greater than 1 has at least two factors, 1 and itself.
          </p>
          <p className={P}>
            This page uses positive factors only, which is what school work asks for. Negative numbers can divide a number exactly too (−3 divides 24), but they are not listed here. A factor is not the same as a multiple: factors divide into a number, while multiples are what you get by multiplying it, so 3 is a factor of 24 and 24 is a multiple of 3. When you need the factors that two numbers share, use the <CalcLink slug="gcf-calculator">GCF calculator</CalcLink>.
          </p>
        </div>

        <div className="mt-12">
          <H2 id="how-to-find-factors">How to find the factors of a number</H2>
          <p className={P}>
            To find all the factors of a number by hand, divide it by 1, 2, 3 and so on, and note each divisor that leaves no remainder together with its partner. You only need to test divisors up to the square root of the number, because every factor above the square root is paired with one below it.
          </p>
          <p className={`${P} font-semibold text-(--color-ink)`}>Worked example: the factors of 48</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-(--color-blue)">
            <li className={LI}>The square root of 48 is between 6 and 7 (6 × 6 = 36 and 7 × 7 = 49), so test the divisors 1 to 6.</li>
            <li className={LI}>48 ÷ 1 = 48, 48 ÷ 2 = 24, 48 ÷ 3 = 16, 48 ÷ 4 = 12 and 48 ÷ 6 = 8 all divide exactly. 48 ÷ 5 does not, because 5 × 9 = 45 leaves a remainder of 3.</li>
            <li className={LI}>That gives the factor pairs 1 × 48, 2 × 24, 3 × 16, 4 × 12 and 6 × 8.</li>
            <li className={LI}>List every number from the pairs in order: 1, 2, 3, 4, 6, 8, 12, 16, 24 and 48. So 48 has 10 factors.</li>
          </ol>
          <p className={P}>
            To skip the division, type the number into the calculator above and press Calculate. It lists every factor and factor pair, counts the factors and adds them up. For a large number, the quickest route is to find its prime factorization first and then combine the primes, which is what the calculator does.
          </p>
        </div>

        <div className="mt-12">
          <H2 id="prime-factorization">Prime factorization and the factor tree</H2>
          <p className={P}>
            The prime factorization of a number writes it as a product of prime numbers, and every whole number greater than 1 has exactly one such product, apart from the order of the factors. To write the prime factors, keep splitting the number into two smaller factors until every piece is prime, then group the repeated primes with exponents.
          </p>
          <p className={`${P} font-semibold text-(--color-ink)`}>Worked example: the prime factors of 72</p>
          <div className="mt-3 rounded-2xl border border-(--color-line) bg-white p-4">
            <FactorTree n={72} pf={pf72} />
          </div>
          <p className={P}>
            Read the primes from the tree: 72 = 2 × 2 × 2 × 3 × 3, which is written 2³ × 3². Different trees for the same number, such as starting with 8 × 9, end with the same primes.
          </p>
          <p className={P}>
            The exponents also tell you how many factors a number has. Add 1 to each exponent and multiply the results: for 72 that is (3 + 1)(2 + 1) = 12 factors. The same prime factors lead straight to the greatest common factor and the least common multiple of two numbers, so the <CalcLink slug="gcf-calculator">GCF calculator</CalcLink> and the <CalcLink slug="lcm-calculator">LCM calculator</CalcLink> are the natural next steps.
          </p>
          {content.formulas && content.formulas.length > 0 && (
            <dl className="mt-5 space-y-3">
              {content.formulas.map((f) => (
                <div key={f.label} className="rounded-2xl bg-(--color-surface) px-5 py-4">
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">{f.label}</dt>
                  <dd className="mt-1.5 overflow-x-auto font-mono text-[14.5px] leading-relaxed text-(--color-ink)">{f.expr}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-12">
          <H2 id="factor-pairs">Factor pairs and proper factors</H2>
          <p className={P}>
            A factor pair is two whole numbers whose product is the number: 6 × 8 = 48, so 6 and 8 are a factor pair of 48. A number has half as many pairs as factors, rounded up. A perfect square has one pair made of the same number twice, such as 6 × 6 = 36.
          </p>
          <p className={P}>
            The proper factors of a number are all its factors except the number itself. The proper factors of 12 are 1, 2, 3, 4 and 6. When the proper factors add up to the number, it is called a perfect number: 6 = 1 + 2 + 3. Some textbooks also leave out 1, so check which definition your course uses.
          </p>
        </div>

        <div className="mt-12">
          <H2 id="prime-or-composite">Is a number prime or composite?</H2>
          <p className={P}>
            A prime number has exactly two factors, 1 and itself. A composite number has more than two. The number 1 is neither. The calculator shows this in the Type line of the result, and for a prime it says so instead of giving a factorization. For example, 84 = 2² × 3 × 7 is composite, while 83 has no factors other than 1 and 83, so it is prime.
          </p>
          <p className={P}>
            Quick checks by hand: an even number greater than 2 is composite; a number greater than 3 whose digits add up to a multiple of 3 is composite; a number greater than 5 that ends in 0 or 5 is composite. If no prime up to the square root of the number divides it, the number is prime.
          </p>
        </div>

        <div className="mt-12">
          <H2 id="common-numbers">Factors of common numbers</H2>
          <p className={P}>
            A quick reference for twelve numbers. Enter any of them in the calculator to see its factor pairs and factor tree as well.
          </p>
          <div
            role="region"
            aria-label="Factors of common numbers, scrollable table"
            tabIndex={0}
            className="mt-4 overflow-x-auto rounded-2xl border border-(--color-line) bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
          >
            <table className="w-full min-w-[34rem] border-collapse text-left text-[14px]">
              <caption className="sr-only">Prime factorization, number of factors and all factors of twelve common numbers</caption>
              <thead>
                <tr className="border-b border-(--color-line) bg-(--color-surface) text-(--color-ink-soft)">
                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">Number</th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">Prime factorization</th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">How many</th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">All factors</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.n} className="border-b border-(--color-line)/60 align-top last:border-0">
                    <th scope="row" className="whitespace-nowrap px-4 py-2.5 font-bold tabular-nums text-(--color-ink)">{r.n}</th>
                    <td className="whitespace-nowrap px-4 py-2.5 tabular-nums text-(--color-ink)">{r.primeForm}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 tabular-nums text-(--color-ink)">{r.count}</td>
                    <td className="px-4 py-2.5 tabular-nums text-(--color-ink-soft)">{r.factors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12.5px] text-(--color-ink-soft) sm:hidden">Swipe the table sideways to see every factor.</p>
        </div>

        <div className="mt-12">
          <H2 id="how-it-works">How this factor calculator works</H2>
          {content.how.map((p, i) => (
            <p key={i} className={P}>{p}</p>
          ))}
          <p className={`${P} font-semibold text-(--color-ink)`}>What factors are used for</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {content.useCases.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        <div className="mt-12">
          <H2 id="limitations">Limits of this calculator</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
            {content.limitations.map((x, i) => <li key={i} className={LI}>{x}</li>)}
          </ul>
        </div>

        {references && references.length > 0 && (
          <div className="mt-12">
            <H2 id="sources">Sources and further reading</H2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-(--color-blue)">
              {references.map((r) => (
                <li key={r.url} className={LI}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </section>
  );
}
