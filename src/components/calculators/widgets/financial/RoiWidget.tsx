"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome, type ResultStat } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { roi } from "@/lib/calculators/finance";
import { diffDays } from "@/lib/calculators/dates";
import { parseISODate } from "@/lib/calculators/parse";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  { id: "invested", kind: "number", label: "Amount invested (cost)", default: "10000" },
  { id: "returned", kind: "number", label: "Amount returned (final value)", default: "14000", hint: "What the investment is worth, or what you received, including any income." },
  {
    id: "timeMode",
    kind: "segmented",
    label: "Investment period",
    default: "years",
    options: [
      { value: "years", label: "Length in years" },
      { value: "dates", label: "Start and end dates" },
      { value: "none", label: "Skip (no annualised figure)" },
    ],
  },
  { id: "years", kind: "number", label: "Length of investment", default: "3", unit: "years", showIf: (v) => v.timeMode === "years" },
  { id: "from", kind: "date", label: "Start date", default: "2021-01-01", showIf: (v) => v.timeMode === "dates" },
  { id: "to", kind: "date", label: "End date", default: "2024-01-01", showIf: (v) => v.timeMode === "dates" },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const invested = readNum(v, "invested", { label: "Amount invested", gt: 0, max: 1e12 }, errors);
  const returned = readNum(v, "returned", { label: "Amount returned", min: 0, max: 1e12 }, errors);
  let years: number | null = null;
  if (v.timeMode === "years") {
    years = readNum(v, "years", { label: "Length of investment", gt: 0, max: 200 }, errors);
  } else if (v.timeMode === "dates") {
    const a = parseISODate(v.from ?? "");
    const b = parseISODate(v.to ?? "");
    if (!a) errors.from = "Choose a valid start date.";
    if (!b) errors.to = "Choose a valid end date.";
    if (a && b) {
      const days = diffDays(a, b);
      if (days <= 0) errors.to = "The end date must be after the start date.";
      else years = days / 365.25;
    }
  }
  if (hasErrors(errors) || invested === null || returned === null) return fail(errors);
  const r = roi(invested, returned, years);
  const f = (n: number) => money(n, cur);
  const stats: ResultStat[] = [
    { label: investedLabel(r.gain), value: f(r.gain) },
    { label: "Final value ÷ cost", value: `${fixed(returned / invested, 3)}×` },
  ];
  if (years !== null) stats.push({ label: "Investment length", value: `${fixed(years, 3)} years`, hint: v.timeMode === "dates" ? "Calculated as days ÷ 365.25" : undefined });
  return {
    ok: true,
    headline: { label: "Return on investment (ROI)", value: `${fixed(r.roiPct, 2)}%`, sub: `${f(invested)} became ${f(returned)}` },
    stats: r.annualisedPct !== null ? [{ label: "Annualised ROI", value: `${fixed(r.annualisedPct, 2)}%`, hint: "The constant yearly rate that gives the same overall result" }, ...stats] : stats,
    notes: [
      "ROI ignores risk, taxes, fees and the timing of any interim cash flows. Define “cost” and “return” the same way for every investment you compare.",
    ],
  };
}

function investedLabel(gain: number) {
  return gain >= 0 ? "Net gain" : "Net loss";
}

export default function RoiWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
