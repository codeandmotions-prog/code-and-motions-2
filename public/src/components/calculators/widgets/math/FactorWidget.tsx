"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, type Values } from "@/lib/calculators/validate";
import { factorize, factorsFromPrimes, primeFactorExpanded, primeFactorText, FACTOR_LIMIT } from "@/lib/calculators/numtheory";
import { groupDigits } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "n", kind: "number", label: "Positive whole number", default: "360", hint: "Up to 1,000,000,000,000,000 (10¹⁵)." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const n = readNum(v, "n", { label: "Number", integer: true, min: 1, max: FACTOR_LIMIT }, e);
  if (n === null) return fail(e);
  const pf = factorize(n);
  const isPrime = n > 1 && pf.length === 1 && pf[0][1] === 1;
  const factors = factorsFromPrimes(pf);
  const sum = factors.reduce((s, x) => s + x, 0);
  const pairs: string[][] = [];
  for (let i = 0; i < factors.length && factors[i] * factors[i] <= n; i++) {
    pairs.push([String(factors[i]), groupDigits(String(n / factors[i]))]);
  }
  const text = factors.map((x) => groupDigits(String(x))).join(", ");
  return {
    ok: true,
    headline: { label: `Prime factorisation of ${groupDigits(String(n))}`, value: n === 1 ? "1 (neither prime nor composite)" : isPrime ? `${groupDigits(String(n))} is prime` : primeFactorText(pf), sub: n > 1 && !isPrime ? `= ${primeFactorExpanded(pf)}` : undefined },
    stats: [
      { label: "Number of factors", value: String(factors.length) },
      { label: "Sum of factors", value: groupDigits(String(sum)) },
      { label: "Type", value: n === 1 ? "Unit" : isPrime ? "Prime" : "Composite", hint: sum === 2 * n ? "A perfect number" : Number.isInteger(Math.sqrt(n)) ? "A perfect square" : undefined },
    ],
    tables: pairs.length > 0 ? [{ title: "Factor pairs", columns: ["Factor", "Multiplied by"], rows: pairs.slice(0, 200), caption: pairs.length > 200 ? "Showing the first 200 pairs." : undefined }] : undefined,
    block: { label: `All ${factors.length} factors`, text: factors.length > 2000 ? `${factors.slice(0, 2000).map(String).join(", ")}, …` : text },
  };
}

export default function FactorWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
