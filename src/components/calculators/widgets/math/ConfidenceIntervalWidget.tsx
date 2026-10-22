"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { zCritical, tCritical } from "@/lib/calculators/stats";
import { fmt } from "@/lib/calculators/format";

const CONF = ["80", "85", "90", "95", "98", "99", "99.9"];

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "segmented",
    label: "Estimate",
    default: "mean",
    options: [
      { value: "mean", label: "A mean" },
      { value: "prop", label: "A proportion" },
    ],
  },
  { id: "conf", kind: "select", label: "Confidence level", default: "95", options: CONF.map((c) => ({ value: c, label: `${c}%` })) },
  { id: "n", kind: "number", label: "Sample size (n)", default: "40" },
  { id: "mean", kind: "number", label: "Sample mean (x̄)", default: "52", showIf: (v) => v.mode === "mean" },
  { id: "sd", kind: "number", label: "Standard deviation", default: "8", showIf: (v) => v.mode === "mean", hint: "Must be greater than 0." },
  {
    id: "sdtype",
    kind: "select",
    label: "The standard deviation is…",
    default: "sample",
    showIf: (v) => v.mode === "mean",
    options: [
      { value: "sample", label: "From my sample (use Student’s t)" },
      { value: "known", label: "Known for the whole population (use z)" },
    ],
    wide: true,
  },
  { id: "x", kind: "number", label: "Number of successes", default: "56", showIf: (v) => v.mode === "prop", hint: "Whole number from 0 to n." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const conf = Number(v.conf);
  const n = readNum(v, "n", { label: "Sample size", integer: true, min: 2 }, e);
  if (v.mode === "prop") {
    const x = readNum(v, "x", { label: "Successes", integer: true, min: 0 }, e);
    if (hasErrors(e) || n === null || x === null) return fail(e);
    if (x > n) return fail({ x: "Successes cannot exceed the sample size." });
    const p = x / n;
    const z = zCritical(conf);
    const moe = z * Math.sqrt((p * (1 - p)) / n);
    const lo = Math.max(0, p - moe);
    const hi = Math.min(1, p + moe);
    const warnings = x < 10 || n - x < 10 ? ["Fewer than 10 successes or failures: the normal-approximation interval can be unreliable. Consider an exact (Clopper–Pearson) or Wilson interval."] : undefined;
    return {
      ok: true,
      headline: { label: `${conf}% confidence interval for the proportion`, value: `${fmt(lo * 100, 6)}% to ${fmt(hi * 100, 6)}%`, sub: `Sample proportion ${fmt(p * 100, 6)}% ± ${fmt(moe * 100, 6)} points` },
      stats: [{ label: "Sample proportion (p̂)", value: fmt(p, 8) }, { label: "z critical value", value: fmt(z, 6) }, { label: "Margin of error", value: `${fmt(moe * 100, 6)} percentage points` }],
      steps: ["p̂ = successes ÷ n.", "Margin of error = z × √(p̂(1 − p̂) ÷ n).", "Interval = p̂ ± margin of error (limited to 0%–100%)."],
      warnings,
    };
  }
  const mean = readNum(v, "mean", { label: "Sample mean" }, e);
  const sd = readNum(v, "sd", { label: "Standard deviation", gt: 0 }, e);
  if (hasErrors(e) || n === null || mean === null || sd === null) return fail(e);
  const known = v.sdtype === "known";
  const crit = known ? zCritical(conf) : tCritical(conf, n - 1);
  const se = sd / Math.sqrt(n);
  const moe = crit * se;
  return {
    ok: true,
    headline: { label: `${conf}% confidence interval for the mean`, value: `${fmt(mean - moe, 10)} to ${fmt(mean + moe, 10)}`, sub: `${fmt(mean, 10)} ± ${fmt(moe, 8)}` },
    stats: [
      { label: known ? "z critical value" : `t critical value (df = ${n - 1})`, value: fmt(crit, 6) },
      { label: "Standard error", value: fmt(se, 8), hint: "σ ÷ √n" },
      { label: "Margin of error", value: fmt(moe, 8) },
    ],
    steps: [`Standard error = ${fmt(sd)} ÷ √${n} = ${fmt(se, 8)}.`, `Margin of error = ${known ? "z" : "t"} × standard error = ${fmt(crit, 6)} × ${fmt(se, 8)} = ${fmt(moe, 8)}.`, "Interval = mean ± margin of error."],
    notes: ["Assumes a random sample and roughly normal data (or a large sample)."],
  };
}

export default function ConfidenceIntervalWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
