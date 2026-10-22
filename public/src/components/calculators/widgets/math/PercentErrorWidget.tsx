"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { percentError } from "@/lib/calculators/mathmisc";
import { fmt } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "obs", kind: "number", label: "Observed (measured) value", default: "56.891" },
  { id: "tru", kind: "number", label: "True (accepted) value", default: "62.327" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const obs = readNum(v, "obs", { label: "Observed value" }, e);
  const tru = readNum(v, "tru", { label: "True value" }, e);
  if (tru === 0) e.tru = "The true value cannot be zero; percent error is undefined.";
  if (hasErrors(e) || obs === null || tru === null) return fail(e);
  const r = percentError(obs, tru);
  return {
    ok: true,
    headline: { label: "Percent error", value: `${fmt(r.pct, 6)}%`, sub: obs < tru ? "The measurement is below the true value." : obs > tru ? "The measurement is above the true value." : "The measurement matches the true value." },
    stats: [
      { label: "Absolute error", value: fmt(r.absoluteError, 8) },
      { label: "Signed percent error", value: `${fmt(r.signedPct, 6)}%`, hint: "Negative when the observed value is lower" },
    ],
    steps: [`Absolute error = |${fmt(obs)} − ${fmt(tru)}| = ${fmt(r.absoluteError, 8)}`, `Percent error = ${fmt(r.absoluteError, 8)} ÷ |${fmt(tru)}| × 100 = ${fmt(r.pct, 6)}%`],
  };
}

export default function PercentErrorWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
