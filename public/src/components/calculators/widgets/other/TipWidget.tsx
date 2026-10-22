"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { tipSplit } from "@/lib/calculators/units";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField } from "../shared";

const PRESETS = ["0", "5", "10", "12.5", "15", "18", "20", "25"];

const fields: FieldDef[] = [
  currencyField(),
  { id: "bill", kind: "number", label: "Bill amount", default: "86.40", hint: "Before the tip. Use the pre-tax total if that is how you tip." },
  {
    id: "preset",
    kind: "select",
    label: "Tip percentage",
    default: "15",
    options: [...PRESETS.map((p) => ({ value: p, label: `${p}%` })), { value: "custom", label: "Custom percentage" }],
  },
  { id: "custom", kind: "number", label: "Custom tip percentage", default: "17", unit: "%", showIf: (v) => v.preset === "custom" },
  { id: "people", kind: "number", label: "Number of people sharing", default: "3", hint: "1 if you are paying alone." },
  {
    id: "round",
    kind: "segmented",
    label: "Rounding",
    default: "none",
    options: [
      { value: "none", label: "Exact amounts" },
      { value: "up", label: "Round each share up to a whole unit" },
    ],
    hint: "Rounding up raises the tip slightly so everyone pays a whole amount.",
  },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const bill = readNum(v, "bill", { label: "Bill amount", gt: 0, max: 1e12 }, errors);
  const pct = v.preset === "custom" ? readNum(v, "custom", { label: "Tip percentage", min: 0, max: 100 }, errors) : Number(v.preset);
  const people = readNum(v, "people", { label: "Number of people", min: 1, max: 1000, integer: true }, errors);
  if (hasErrors(errors) || bill === null || pct === null || people === null) return fail(errors);
  const r = tipSplit(bill, pct, people, v.round === "up");
  const f = (n: number) => money(n, cur);
  return {
    ok: true,
    headline: { label: people > 1 ? "Each person pays" : "Total to pay", value: f(r.totalPerPerson), sub: `Bill ${f(bill)} plus tip ${f(r.tip)}` },
    stats: [
      { label: "Tip amount", value: f(r.tip), hint: v.round === "up" ? `Effective tip ${fixed(r.effectiveTipPct, 2)}% after rounding` : `${fixed(pct, 2)}% of the bill` },
      { label: "Total including tip", value: f(r.total) },
      ...(people > 1 ? [{ label: "Tip per person", value: f(r.tipPerPerson) }] : []),
      ...(people > 1 ? [{ label: "Bill per person (before tip)", value: f(bill / people) }] : []),
    ],
    notes: ["Tipping customs differ widely between countries and venues, and some bills already include a service charge. Check the bill before adding a tip."],
  };
}

export default function TipWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
