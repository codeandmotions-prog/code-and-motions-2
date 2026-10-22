"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readList, hasErrors, type Values } from "@/lib/calculators/validate";
import { describe } from "@/lib/calculators/stats";
import { dataField, num } from "./statShared";

const fields: FieldDef[] = [dataField("data", "Data values", "3, 7, 7, 9, 12, 15, 15, 15, 21, 30")];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const data = readList(v, "data", "Data values", e, { min: 1 });
  if (hasErrors(e) || !data) return fail(e);
  const d = describe(data);
  const counts = new Map<number, number>();
  for (const x of data) counts.set(x, (counts.get(x) ?? 0) + 1);
  const freq = [...counts.entries()].sort((a, b) => a[0] - b[0]);
  let cum = 0;
  const freqRows = freq.slice(0, 50).map(([val, c]) => {
    cum += c;
    return [num(val), String(c), `${num((c / d.n) * 100, 5)}%`, `${num((cum / d.n) * 100, 5)}%`];
  });
  return {
    ok: true,
    headline: { label: "Mean (average)", value: num(d.mean, 12), sub: `Median ${num(d.median, 12)} · ${d.n} value${d.n === 1 ? "" : "s"}` },
    stats: [
      { label: "Count (n)", value: String(d.n) },
      { label: "Sum", value: num(d.sum, 12) },
      { label: "Median", value: num(d.median, 12) },
      { label: "Mode", value: d.modes.length ? d.modes.map((m) => num(m)).join(", ") : "No repeated value" },
      { label: "Minimum", value: num(d.min) },
      { label: "Maximum", value: num(d.max) },
      { label: "Range", value: num(d.range, 12) },
      { label: "First quartile (Q1)", value: num(d.q1, 12), hint: "Median of the lower half" },
      { label: "Third quartile (Q3)", value: num(d.q3, 12), hint: "Median of the upper half" },
      { label: "Interquartile range", value: num(d.iqr, 12) },
      { label: "Sample standard deviation", value: num(d.sampleSd, 10) },
      { label: "Population standard deviation", value: num(d.popSd, 10) },
      { label: "Sample variance", value: num(d.sampleVar, 10) },
      { label: "Population variance", value: num(d.popVar, 10) },
      { label: "Standard error of the mean", value: num(d.sem, 10) },
      { label: "Geometric mean", value: d.geoMean === null ? "Needs all values > 0" : num(d.geoMean, 10) },
      { label: "Harmonic mean", value: d.harmMean === null ? "Needs all values > 0" : num(d.harmMean, 10) },
      { label: "Sum of squares", value: num(d.sumSq, 12) },
    ],
    tables: [{ title: "Frequency table", columns: ["Value", "Count", "Share", "Cumulative"], rows: freqRows, caption: freq.length > 50 ? "Showing the first 50 distinct values." : undefined }],
    notes: ["Quartiles use the “median of halves” method: for an odd count the middle value is left out of both halves. Other software may use slightly different quartile methods."],
  };
}

export default function StatisticsWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
