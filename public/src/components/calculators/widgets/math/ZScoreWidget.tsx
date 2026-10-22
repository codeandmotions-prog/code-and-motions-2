"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { normalCdf, normalInv } from "@/lib/calculators/stats";
import { fmt } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to do?",
    default: "raw",
    wide: true,
    options: [
      { value: "raw", label: "Find the z-score of a value" },
      { value: "prob", label: "Find probabilities from a z-score" },
      { value: "inv", label: "Find the z-score for a probability" },
      { value: "val", label: "Find the value for a z-score" },
    ],
  },
  { id: "x", kind: "number", label: "Value (x)", default: "85", showIf: (v) => v.mode === "raw" },
  { id: "mu", kind: "number", label: "Mean (μ)", default: "70", showIf: (v) => v.mode === "raw" || v.mode === "val" },
  { id: "sd", kind: "number", label: "Standard deviation (σ)", default: "10", showIf: (v) => v.mode === "raw" || v.mode === "val", hint: "Must be greater than 0." },
  { id: "z", kind: "number", label: "z-score", default: "1.5", showIf: (v) => v.mode === "prob" || v.mode === "val" },
  { id: "p", kind: "number", label: "Probability to the left of z", default: "0.975", showIf: (v) => v.mode === "inv", hint: "Strictly between 0 and 1." },
];

const pr = (x: number) => fmt(Math.min(1, Math.max(0, x)), 10);
const pc = (x: number) => `${fmt(Math.min(1, Math.max(0, x)) * 100, 8)}%`;

function probStats(z: number) {
  const left = normalCdf(z);
  const right = normalCdf(-z);
  const between = normalCdf(Math.abs(z)) - normalCdf(-Math.abs(z));
  return {
    left,
    stats: [
      { label: `P(Z < ${fmt(z, 6)}): left tail`, value: pr(left), hint: pc(left) },
      { label: `P(Z > ${fmt(z, 6)}): right tail`, value: pr(right), hint: pc(right) },
      { label: `P(−${fmt(Math.abs(z), 6)} < Z < ${fmt(Math.abs(z), 6)})`, value: pr(between), hint: pc(between) },
      { label: "Two-tailed probability", value: pr(1 - between), hint: pc(1 - between) },
    ],
  };
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  if (v.mode === "raw") {
    const x = readNum(v, "x", { label: "Value" }, e);
    const mu = readNum(v, "mu", { label: "Mean" }, e);
    const sd = readNum(v, "sd", { label: "Standard deviation", gt: 0 }, e);
    if (hasErrors(e) || x === null || mu === null || sd === null) return fail(e);
    const z = (x - mu) / sd;
    const { left, stats } = probStats(z);
    return {
      ok: true,
      headline: { label: "z-score", value: fmt(z, 8), sub: `${fmt(left * 100, 6)}% of the distribution lies below · ${Math.abs(z) < 1e-12 ? "exactly at the mean" : `${fmt(Math.abs(z), 6)} standard deviation${Math.abs(z) === 1 ? "" : "s"} ${z > 0 ? "above" : "below"} the mean`}` },
      stats,
      steps: [`z = (x − μ) ÷ σ = (${fmt(x)} − ${fmt(mu)}) ÷ ${fmt(sd)} = ${fmt(z, 8)}.`],
      notes: ["Probabilities assume the data follow a normal distribution."],
    };
  }
  if (v.mode === "prob") {
    const z = readNum(v, "z", { label: "z-score", min: -40, max: 40 }, e);
    if (hasErrors(e) || z === null) return fail(e);
    const { stats } = probStats(z);
    return { ok: true, headline: { label: `Area to the left of z = ${fmt(z, 6)}`, value: pr(normalCdf(z)), sub: pc(normalCdf(z)) }, stats, notes: ["Probabilities use the standard normal distribution (mean 0, standard deviation 1)."] };
  }
  if (v.mode === "inv") {
    const p = readNum(v, "p", { label: "Probability", gt: 0 }, e);
    if (hasErrors(e) || p === null) return fail(e);
    if (p >= 1) return fail({ p: "Probability must be less than 1." });
    const z = normalInv(p);
    return { ok: true, headline: { label: `z-score with ${fmt(p * 100, 8)}% of the area to its left`, value: fmt(z, 8) }, stats: [{ label: "Area to the right", value: pr(1 - p) }, { label: "Symmetric two-tailed central area", value: pr(Math.abs(1 - 2 * Math.min(p, 1 - p))), hint: "Between −|z| and +|z|" }], notes: ["Uses the inverse of the standard normal distribution."] };
  }
  const z = readNum(v, "z", { label: "z-score" }, e);
  const mu = readNum(v, "mu", { label: "Mean" }, e);
  const sd = readNum(v, "sd", { label: "Standard deviation", gt: 0 }, e);
  if (hasErrors(e) || z === null || mu === null || sd === null) return fail(e);
  return { ok: true, headline: { label: "Value (x)", value: fmt(mu + z * sd, 10) }, steps: [`x = μ + z × σ = ${fmt(mu)} + ${fmt(z)} × ${fmt(sd)} = ${fmt(mu + z * sd, 10)}.`], stats: probStats(z).stats };
}

export default function ZScoreWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
