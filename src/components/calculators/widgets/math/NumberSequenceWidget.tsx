"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { num } from "./statShared";
import { ordinal } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "type",
    kind: "segmented",
    label: "Sequence type",
    default: "arith",
    options: [
      { value: "arith", label: "Arithmetic" },
      { value: "geo", label: "Geometric" },
      { value: "fib", label: "Fibonacci-style" },
    ],
  },
  { id: "a1", kind: "number", label: "First term (a₁)", default: "3" },
  { id: "d", kind: "number", label: "Common difference (d)", default: "4", showIf: (v) => v.type === "arith" },
  { id: "r", kind: "number", label: "Common ratio (r)", default: "2", showIf: (v) => v.type === "geo" },
  { id: "a2", kind: "number", label: "Second term (a₂)", default: "1", showIf: (v) => v.type === "fib", hint: "Each later term is the sum of the previous two." },
  { id: "n", kind: "number", label: "Number of terms (n)", default: "10", hint: "Whole number from 1 to 1,000." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const a1 = readNum(v, "a1", { label: "First term" }, e);
  const n = readNum(v, "n", { label: "Number of terms", integer: true, min: 1, max: 1000 }, e);
  const d = v.type === "arith" ? readNum(v, "d", { label: "Common difference" }, e) : 0;
  const r = v.type === "geo" ? readNum(v, "r", { label: "Common ratio" }, e) : 0;
  const a2 = v.type === "fib" ? readNum(v, "a2", { label: "Second term" }, e) : 0;
  if (hasErrors(e) || a1 === null || n === null || d === null || r === null || a2 === null) return fail(e);

  const terms: number[] = [];
  let sum: number;
  let nth: number;
  const stats: { label: string; value: string; hint?: string }[] = [];
  const steps: string[] = [];
  if (v.type === "arith") {
    for (let i = 0; i < n; i++) terms.push(a1 + i * d);
    nth = a1 + (n - 1) * d;
    sum = (n * (a1 + nth)) / 2;
    steps.push(`nth term: aₙ = a₁ + (n − 1)d = ${num(a1)} + ${n - 1} × ${num(d)} = ${num(nth, 12)}.`, `Sum: Sₙ = n(a₁ + aₙ) ÷ 2 = ${n} × (${num(a1)} + ${num(nth, 12)}) ÷ 2 = ${num(sum, 12)}.`);
  } else if (v.type === "geo") {
    for (let i = 0; i < n; i++) terms.push(a1 * Math.pow(r, i));
    nth = a1 * Math.pow(r, n - 1);
    sum = r === 1 ? a1 * n : (a1 * (1 - Math.pow(r, n))) / (1 - r);
    steps.push(`nth term: aₙ = a₁ × r^(n−1) = ${num(a1)} × ${num(r)}^${n - 1} = ${num(nth, 12)}.`, r === 1 ? `Sum: every term equals a₁, so Sₙ = n × a₁ = ${num(sum, 12)}.` : `Sum: Sₙ = a₁(1 − rⁿ) ÷ (1 − r) = ${num(sum, 12)}.`);
    if (Math.abs(r) < 1) stats.push({ label: "Sum to infinity", value: num(a1 / (1 - r), 12), hint: "a₁ ÷ (1 − r), valid because |r| < 1" });
    else stats.push({ label: "Sum to infinity", value: "Does not converge", hint: "Needs |r| < 1" });
  } else {
    terms.push(a1);
    if (n > 1) terms.push(a2);
    for (let i = 2; i < n; i++) terms.push(terms[i - 1] + terms[i - 2]);
    nth = terms[n - 1];
    sum = terms.reduce((s, x) => s + x, 0);
    steps.push("Each term is the sum of the two terms before it: aₙ = aₙ₋₁ + aₙ₋₂.", `With a₁ = ${num(a1)} and a₂ = ${num(a2)}, the ${ordinal(n)} term is ${num(nth, 12)}.`);
  }
  if (!Number.isFinite(nth) || !Number.isFinite(sum) || terms.some((t) => !Number.isFinite(t))) return fail({ n: "The values grow too large to calculate. Use fewer terms or a smaller ratio." });
  const shown = terms.slice(0, 30);
  const warnings = Math.abs(nth) > 2 ** 53 || Math.abs(sum) > 2 ** 53 ? ["Values above about 9 × 10¹⁵ are shown rounded because ordinary decimal arithmetic cannot hold every digit."] : undefined;
  return {
    ok: true,
    headline: { label: `Term ${n} (aₙ)`, value: num(nth, 12), sub: `Sum of the first ${n} term${n === 1 ? "" : "s"}: ${num(sum, 12)}` },
    stats: [{ label: "Sum of the first n terms", value: num(sum, 12) }, ...stats],
    tables: [{ title: `First ${shown.length} term${shown.length === 1 ? "" : "s"}`, columns: ["n", "Term"], rows: shown.map((t, i) => [String(i + 1), num(t, 12)]), caption: terms.length > 30 ? `Showing 30 of ${terms.length} terms.` : undefined }],
    steps,
    warnings,
  };
}

export default function NumberSequenceWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
