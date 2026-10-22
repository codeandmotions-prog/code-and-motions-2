"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { binomialPmf } from "@/lib/calculators/stats";
import { fmt } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to find?",
    default: "two",
    wide: true,
    options: [
      { value: "two", label: "Two independent events (A and B)" },
      { value: "single", label: "One event: odds and repeated trials" },
      { value: "binom", label: "Number of successes in n trials (binomial)" },
    ],
  },
  { id: "pa", kind: "number", label: "Probability of A", default: "0.4", showIf: (v) => v.mode === "two" || v.mode === "single", hint: "A number from 0 to 1 (for example 0.25 for 25%)." },
  { id: "pb", kind: "number", label: "Probability of B", default: "0.3", showIf: (v) => v.mode === "two", hint: "A number from 0 to 1." },
  { id: "trials", kind: "number", label: "Number of repeated trials", default: "5", showIf: (v) => v.mode === "single" },
  { id: "n", kind: "number", label: "Number of trials (n)", default: "10", showIf: (v) => v.mode === "binom", hint: "Whole number from 1 to 1,000." },
  { id: "p", kind: "number", label: "Probability of success each trial (p)", default: "0.5", showIf: (v) => v.mode === "binom", hint: "A number from 0 to 1." },
  { id: "k", kind: "number", label: "Number of successes (k)", default: "4", showIf: (v) => v.mode === "binom" },
];

const r = (x: number) => fmt(Math.min(1, Math.max(0, x)), 10);
const pct = (x: number) => `${fmt(Math.min(1, Math.max(0, x)) * 100, 8)}%`;

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  if (v.mode === "two") {
    const pa = readNum(v, "pa", { label: "P(A)", min: 0, max: 1 }, e);
    const pb = readNum(v, "pb", { label: "P(B)", min: 0, max: 1 }, e);
    if (hasErrors(e) || pa === null || pb === null) return fail(e);
    const both = pa * pb;
    const either = pa + pb - both;
    return {
      ok: true,
      headline: { label: "P(A or B): at least one happens", value: r(either), sub: pct(either) },
      stats: [
        { label: "P(A and B): both happen", value: r(both), hint: pct(both) },
        { label: "P(neither)", value: r((1 - pa) * (1 - pb)), hint: pct((1 - pa) * (1 - pb)) },
        { label: "P(exactly one)", value: r(pa + pb - 2 * both), hint: pct(pa + pb - 2 * both) },
        { label: "P(A but not B)", value: r(pa * (1 - pb)), hint: pct(pa * (1 - pb)) },
        { label: "P(B but not A)", value: r(pb * (1 - pa)), hint: pct(pb * (1 - pa)) },
      ],
      steps: ["Independent events: P(A and B) = P(A) × P(B).", "P(A or B) = P(A) + P(B) − P(A and B).", "P(neither) = (1 − P(A)) × (1 − P(B))."],
      notes: ["These results assume A and B are independent, meaning one does not change the chance of the other."],
    };
  }
  if (v.mode === "single") {
    const pa = readNum(v, "pa", { label: "P(A)", min: 0, max: 1 }, e);
    const t = readNum(v, "trials", { label: "Number of trials", integer: true, min: 1, max: 100000 }, e);
    if (hasErrors(e) || pa === null || t === null) return fail(e);
    const atLeast = 1 - Math.pow(1 - pa, t);
    return {
      ok: true,
      headline: { label: `P(A happens at least once in ${t} trial${t === 1 ? "" : "s"})`, value: r(atLeast), sub: pct(atLeast) },
      stats: [
        { label: "P(A does not happen)", value: r(1 - pa), hint: pct(1 - pa) },
        { label: "P(A happens every time)", value: r(Math.pow(pa, t)), hint: pct(Math.pow(pa, t)) },
        { label: "P(A never happens)", value: r(Math.pow(1 - pa, t)), hint: pct(Math.pow(1 - pa, t)) },
        { label: "Odds in favour", value: pa === 1 ? "Certain" : pa === 0 ? "Impossible" : `${fmt(pa / (1 - pa), 8)} to 1` },
        { label: "Odds against", value: pa === 0 ? "Certain" : pa === 1 ? "Impossible" : `${fmt((1 - pa) / pa, 8)} to 1` },
      ],
      steps: ["P(not A) = 1 − P(A).", "At least once in t independent trials = 1 − (1 − P(A))ᵗ."],
    };
  }
  const n = readNum(v, "n", { label: "Number of trials", integer: true, min: 1, max: 1000 }, e);
  const p = readNum(v, "p", { label: "Probability of success", min: 0, max: 1 }, e);
  const k = readNum(v, "k", { label: "Number of successes", integer: true, min: 0 }, e);
  if (hasErrors(e) || n === null || p === null || k === null) return fail(e);
  if (k > n) return fail({ k: "The number of successes cannot exceed the number of trials." });
  let atMost = 0;
  const rows: string[][] = [];
  const pmf: number[] = [];
  for (let i = 0; i <= n; i++) pmf.push(binomialPmf(n, i, p));
  for (let i = 0; i <= k; i++) atMost += pmf[i];
  const below = k === 0 ? 0 : atMost - pmf[k];
  const atLeast = 1 - below;
  const above = 1 - atMost;
  const lo = Math.max(0, k - 4);
  const hi = Math.min(n, k + 4);
  for (let i = lo; i <= hi; i++) rows.push([String(i), r(pmf[i]), pct(pmf[i])]);
  return {
    ok: true,
    headline: { label: `P(exactly ${k} success${k === 1 ? "" : "es"} in ${n})`, value: r(pmf[k]), sub: pct(pmf[k]) },
    stats: [
      { label: `P(X ≤ ${k})`, value: r(atMost), hint: pct(atMost) },
      { label: `P(X < ${k})`, value: r(below), hint: pct(below) },
      { label: `P(X ≥ ${k})`, value: r(atLeast), hint: pct(atLeast) },
      { label: `P(X > ${k})`, value: r(above), hint: pct(above) },
      { label: "Expected successes (n × p)", value: fmt(n * p, 10) },
      { label: "Standard deviation", value: fmt(Math.sqrt(n * p * (1 - p)), 10) },
    ],
    tables: [{ title: "Probabilities near k", columns: ["Successes", "Probability", "Percent"], rows }],
    steps: ["P(X = k) = C(n, k) × pᵏ × (1 − p)ⁿ⁻ᵏ.", "Cumulative probabilities add the individual terms."],
    notes: ["Assumes each trial is independent with the same probability of success."],
  };
}

export default function ProbabilityWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
