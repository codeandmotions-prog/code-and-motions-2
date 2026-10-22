"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { sampleSizeFor, marginOfErrorFor } from "@/lib/calculators/stats";
import { fmt } from "@/lib/calculators/format";

const CONF = ["80", "85", "90", "95", "98", "99", "99.9"];

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "segmented",
    label: "Calculate",
    default: "size",
    options: [
      { value: "size", label: "Sample size needed" },
      { value: "moe", label: "Margin of error" },
    ],
  },
  { id: "conf", kind: "select", label: "Confidence level", default: "95", options: CONF.map((c) => ({ value: c, label: `${c}%` })) },
  { id: "margin", kind: "number", label: "Margin of error", default: "5", unit: "%", showIf: (v) => v.mode !== "moe", hint: "How far the survey result may differ from the true value, in percentage points." },
  { id: "size", kind: "number", label: "Sample size you have", default: "385", showIf: (v) => v.mode === "moe" },
  { id: "p", kind: "number", label: "Expected proportion", default: "50", unit: "%", hint: "Use 50% if unsure: it gives the largest, safest sample size." },
  { id: "pop", kind: "number", label: "Population size (optional)", default: "", hint: "Leave blank for a very large or unknown population." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const conf = Number(v.conf);
  const p = readNum(v, "p", { label: "Expected proportion", gt: 0 , max: 99.99 }, e);
  const pop = readNum(v, "pop", { label: "Population size", integer: true, min: 2, max: 1e12, optional: true }, e);
  if (v.mode === "moe") {
    const n = readNum(v, "size", { label: "Sample size", integer: true, min: 2 }, e);
    if (hasErrors(e) || p === null || n === null) return fail(e);
    if (pop !== null && n > pop) return fail({ size: "The sample cannot be larger than the population." });
    const r = marginOfErrorFor(conf, n, p, pop);
    return {
      ok: true,
      headline: { label: `Margin of error at ${conf}% confidence`, value: `±${fmt(r.marginPct, 4)}%` },
      stats: [{ label: "z-score used", value: fmt(r.z, 6) }, { label: "Sample size", value: n.toLocaleString("en-US") }, { label: "Expected proportion", value: `${fmt(p)}%` }],
      steps: ["Margin of error = z × √(p(1 − p) ÷ n)" + (pop !== null ? " × √((N − n) ÷ (N − 1))" : "") + "."],
      notes: ["Assumes a simple random sample and a large enough sample for the normal approximation to work."],
    };
  }
  const m = readNum(v, "margin", { label: "Margin of error", gt: 0, max: 50 }, e);
  if (hasErrors(e) || p === null || m === null) return fail(e);
  const r = sampleSizeFor(conf, m, p, pop);
  return {
    ok: true,
    headline: { label: "Sample size needed", value: r.required.toLocaleString("en-US"), sub: `${conf}% confidence, ±${fmt(m)}% margin of error` },
    stats: [
      { label: "z-score used", value: fmt(r.z, 6) },
      { label: "Size for a very large population", value: r.unlimitedRequired.toLocaleString("en-US") },
      ...(pop !== null ? [{ label: "Adjusted for population of " + pop.toLocaleString("en-US"), value: r.required.toLocaleString("en-US") }] : []),
    ],
    steps: ["n₀ = z² × p(1 − p) ÷ e²" + (pop !== null ? ", then n = n₀ ÷ (1 + (n₀ − 1) ÷ N)" : "") + ".", "The result is rounded up to the next whole person."],
    notes: ["Assumes a simple random sample. Expect some people not to respond: divide by your expected response rate to see how many to invite."],
  };
}

export default function SampleSizeWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
