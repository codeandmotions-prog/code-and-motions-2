"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readList, hasErrors, type Values } from "@/lib/calculators/validate";
import { describe } from "@/lib/calculators/stats";
import { dataField, num } from "./statShared";

const fields: FieldDef[] = [
  dataField("data", "Data values", "10, 12, 23, 23, 16, 23, 21, 16"),
  {
    id: "kind",
    kind: "segmented",
    label: "Data represents",
    default: "sample",
    options: [
      { value: "sample", label: "A sample (n − 1)" },
      { value: "population", label: "A whole population (n)" },
    ],
  },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const data = readList(v, "data", "Data values", e, { min: 2 });
  if (hasErrors(e) || !data) return fail(e);
  const d = describe(data);
  if (data.some((x) => !Number.isFinite(x))) return fail({ data: "All values must be finite numbers." });
  const sample = v.kind !== "population";
  const sd = sample ? d.sampleSd! : d.popSd;
  const variance = sample ? d.sampleVar! : d.popVar;
  const ssDev = d.popVar * d.n;
  const rows = data.length <= 25 ? data.map((x) => [num(x), num(x - d.mean, 8), num((x - d.mean) ** 2, 8)]) : [];
  return {
    ok: true,
    headline: { label: sample ? "Sample standard deviation (s)" : "Population standard deviation (σ)", value: num(sd, 10), sub: `${sample ? "Variance s²" : "Variance σ²"} = ${num(variance, 10)}` },
    stats: [
      { label: "Mean", value: num(d.mean, 10) },
      { label: "Count (n)", value: String(d.n) },
      { label: "Sum of squared deviations", value: num(ssDev, 10) },
      { label: "Sample SD (n − 1)", value: num(d.sampleSd, 10) },
      { label: "Population SD (n)", value: num(d.popSd, 10) },
      { label: "Standard error of the mean", value: num(d.sem, 10) },
      { label: "Coefficient of variation", value: d.mean === 0 ? "n/a (mean is 0)" : `${num(Math.abs((d.sampleSd ?? 0) / d.mean) * 100, 6)}%`, hint: "Sample SD ÷ |mean|" },
    ],
    tables: rows.length ? [{ title: "Working", columns: ["Value x", "x − mean", "(x − mean)²"], rows }] : undefined,
    steps: [
      `Mean = sum ÷ n = ${num(d.sum, 12)} ÷ ${d.n} = ${num(d.mean, 12)}.`,
      `Add up each squared difference from the mean: ${num(ssDev, 10)}.`,
      `Divide by ${sample ? `n − 1 = ${d.n - 1}` : `n = ${d.n}`} to get the variance, ${num(variance, 10)}.`,
      `Take the square root to get the standard deviation, ${num(sd, 10)}.`,
    ],
  };
}

export default function StandardDeviationWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
