"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readList, hasErrors, type Values } from "@/lib/calculators/validate";
import { describe } from "@/lib/calculators/stats";
import { dataField, num } from "./statShared";

const fields: FieldDef[] = [dataField("data", "Numbers", "6, 2, 9, 4, 4, 11, 7")];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const data = readList(v, "data", "Numbers", e, { min: 1 });
  if (hasErrors(e) || !data) return fail(e);
  const d = describe(data);
  const mid = Math.floor(d.n / 2);
  return {
    ok: true,
    headline: { label: "Mean (average)", value: num(d.mean, 12), sub: `Median ${num(d.median, 12)} · Mode ${d.modes.length ? d.modes.map((m) => num(m)).join(", ") : "none"} · Range ${num(d.range, 12)}` },
    stats: [
      { label: "Mean", value: num(d.mean, 12), hint: `${num(d.sum, 12)} ÷ ${d.n}` },
      { label: "Median", value: num(d.median, 12), hint: d.n % 2 ? "Middle value" : "Average of the two middle values" },
      { label: "Mode", value: d.modes.length ? d.modes.map((m) => num(m)).join(", ") : "No repeated value", hint: d.modes.length ? `Appears ${d.modeCount} times` : "Every value appears once" },
      { label: "Range", value: num(d.range, 12), hint: `${num(d.max)} − ${num(d.min)}` },
      { label: "Count", value: String(d.n) },
      { label: "Sum", value: num(d.sum, 12) },
    ],
    steps: [
      `Sorted: ${d.sorted.slice(0, 60).map((x) => num(x)).join(", ")}${d.n > 60 ? ", …" : ""}.`,
      `Mean: ${num(d.sum, 12)} ÷ ${d.n} = ${num(d.mean, 12)}.`,
      d.n % 2 ? `Median: the middle (position ${mid + 1}) value is ${num(d.median, 12)}.` : `Median: average of positions ${mid} and ${mid + 1}: (${num(d.sorted[mid - 1])} + ${num(d.sorted[mid])}) ÷ 2 = ${num(d.median, 12)}.`,
      `Range: largest − smallest = ${num(d.max)} − ${num(d.min)} = ${num(d.range, 12)}.`,
    ],
    notes: d.modes.length > 1 ? ["More than one value shares the highest count, so the data set is multimodal."] : undefined,
  };
}

export default function MeanMedianModeWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
