"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { realRoot, simplifySqrt, isPerfectPower } from "@/lib/calculators/mathmisc";
import { fmt, ordinal } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "n", kind: "number", label: "Root degree (n)", default: "2", hint: "2 = square root, 3 = cube root, 4 = fourth root, and so on. Whole numbers." },
  { id: "x", kind: "number", label: "Number (radicand)", default: "72" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const n = readNum(v, "n", { label: "Root degree", integer: true, min: 1, max: 1000 }, e);
  const x = readNum(v, "x", { label: "Number" }, e);
  if (hasErrors(e) || n === null || x === null) return fail(e);
  const r = realRoot(x, n);
  if (r.error) return fail({ x: r.error });
  const stats = [];
  const steps: string[] = [];
  if (r.complexImag !== undefined) {
    stats.push({ label: "Imaginary form", value: `${fmt(r.complexImag, 12)}i` });
    steps.push(`The square root of a negative number is imaginary: √${fmt(x)} = i × √${fmt(-x)}.`);
    return { ok: true, headline: { label: `√${fmt(x)} (principal root)`, value: `${fmt(r.complexImag, 12)} i`, sub: "Not a real number" }, stats, steps };
  }
  const value = r.value as number;
  if (n === 2 && Number.isInteger(x) && x > 0 && x <= 9_007_199_254_740_991) {
    const s = simplifySqrt(x);
    if (s.inside === 1) stats.push({ label: "Perfect square", value: `${x} = ${s.outside}²` });
    else if (s.outside > 1) stats.push({ label: "Simplest radical form", value: `${s.outside}√${s.inside}` });
    else stats.push({ label: "Radical form", value: `√${x} cannot be simplified (no square factor)` });
  } else if (Number.isInteger(x) && x > 0 && isPerfectPower(x, n)) {
    stats.push({ label: "Perfect power", value: `${x} = ${Math.round(value)}^${n}` });
  }
  stats.push({ label: "Check: result ^ n", value: fmt(Math.pow(value, n), 10) });
  steps.push(`The ${n === 2 ? "square" : n === 3 ? "cube" : ordinal(n)} root of ${fmt(x)} is the number that, raised to the power ${n}, gives ${fmt(x)}.`);
  steps.push(`${fmt(x)}^(1/${n}) = ${fmt(value, 12)}`);
  return { ok: true, headline: { label: `${n === 2 ? "√" : n === 3 ? "∛" : `${ordinal(n)} root of `}${fmt(x)}`, value: fmt(value, 12) }, stats, steps, notes: ["Only the principal real root is shown. Even roots of positive numbers also have a negative root of the same size."] };
}

export default function RootWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
