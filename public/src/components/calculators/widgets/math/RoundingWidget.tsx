"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, type Values } from "@/lib/calculators/validate";
import { qFromString, qSub, qToDecimal, qToFraction, qToMixed } from "@/lib/calculators/rational";
import { ROUND_MODES, roundToFraction, roundToPlaces, type RoundMode } from "@/lib/calculators/mathmisc";

const PLACES = [
  ["6", "Millionths (6 decimal places)"],
  ["5", "Hundred-thousandths (5)"],
  ["4", "Ten-thousandths (4)"],
  ["3", "Thousandths (3)"],
  ["2", "Hundredths (2)"],
  ["1", "Tenths (1)"],
  ["0", "Ones (nearest whole number)"],
  ["-1", "Tens"],
  ["-2", "Hundreds"],
  ["-3", "Thousands"],
  ["-4", "Ten thousands"],
  ["-6", "Millions"],
];

const fields: FieldDef[] = [
  { id: "x", kind: "text", label: "Number to round", default: "3.14159", hint: "Any length of digits; the number is rounded exactly, with no floating-point error." },
  {
    id: "type",
    kind: "segmented",
    label: "Round to",
    default: "places",
    options: [
      { value: "places", label: "A decimal place" },
      { value: "fraction", label: "The nearest fraction" },
    ],
  },
  { id: "places", kind: "select", label: "Decimal place", default: "2", options: PLACES.map(([value, label]) => ({ value, label })), showIf: (v) => v.type !== "fraction", wide: true },
  {
    id: "den",
    kind: "select",
    label: "Fraction of a whole",
    default: "8",
    options: ["2", "3", "4", "5", "6", "8", "10", "12", "16", "32", "64"].map((d) => ({ value: d, label: `1/${d}` })),
    showIf: (v) => v.type === "fraction",
  },
  { id: "mode", kind: "select", label: "Rounding rule", default: "half-away", options: ROUND_MODES.map((m) => ({ value: m.id, label: `${m.label}: ${m.hint}` })), wide: true },
];

function compute(v: Values): CalcOutcome {
  const raw = (v.x ?? "").trim();
  const x = qFromString(raw);
  if (!x) return fail({ x: raw === "" ? "Enter a number to round." : `“${raw}” is not a valid number.` });
  const mode = (v.mode as RoundMode) ?? "half-away";
  const rule = ROUND_MODES.find((m) => m.id === mode)!;
  if (v.type === "fraction") {
    const d = Number(v.den);
    const r = roundToFraction(x, d, mode);
    const diff = qSub(r.result, x);
    return {
      ok: true,
      headline: { label: `${raw} rounded to the nearest 1/${d}`, value: qToFraction(r.result), sub: `Mixed number: ${qToMixed(r.result)}` },
      stats: [{ label: "Decimal value", value: qToDecimal(r.result, 30).text }, { label: "Rounding change", value: qToDecimal(diff, 12).text }, { label: "Rule", value: rule.label }],
      steps: [`Multiply by ${d}: ${raw} × ${d}.`, `Round that to a whole number (${rule.label.toLowerCase()}): ${r.k}.`, `Divide by ${d}: ${qToFraction(r.result)}.`],
    };
  }
  const placesNum = readNum(v, "places", { label: "Decimal place", integer: true }, {}) ?? 2;
  const r = roundToPlaces(x, placesNum, mode);
  const diff = qSub(r.q, x);
  return {
    ok: true,
    headline: { label: `${raw} rounded`, value: r.text },
    stats: [{ label: "Rounding change", value: qToDecimal(diff, 20).text, hint: "Rounded value minus the original" }, { label: "Rule", value: rule.label, hint: rule.hint }],
    steps: [placesNum >= 0 ? `Keep ${placesNum} digit${placesNum === 1 ? "" : "s"} after the decimal point and look at the next digit.` : `Round to the nearest ${10 ** -placesNum}.`, `Apply the rule “${rule.label}” to ties and remainders.`],
  };
}

export default function RoundingWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
