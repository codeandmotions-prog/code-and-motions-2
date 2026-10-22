"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { compoundInterest, COMPOUNDING } from "@/lib/calculators/finance";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  { id: "principal", kind: "number", label: "Starting amount", default: "10000" },
  { id: "contrib", kind: "number", label: "Monthly contribution", default: "200", hint: "Optional. Enter 0 for a one-off lump sum." },
  {
    id: "timing",
    kind: "segmented",
    label: "Contributions are made",
    default: "end",
    options: [
      { value: "end", label: "At the end of each month" },
      { value: "start", label: "At the start of each month" },
    ],
    showIf: (v) => (v.contrib ?? "").trim() !== "" && (v.contrib ?? "") !== "0",
  },
  { id: "rate", kind: "number", label: "Annual interest rate", default: "5", unit: "%" },
  { id: "years", kind: "number", label: "Time", default: "10", unit: "years", hint: "Whole or part years, for example 7.5." },
  {
    id: "comp",
    kind: "select",
    label: "Compounding frequency",
    default: "monthly",
    options: Object.entries(COMPOUNDING).map(([value, c]) => ({ value, label: c.label })),
  },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const principal = readNum(v, "principal", { label: "Starting amount", min: 0, max: 1e12 }, errors);
  const contrib = readNum(v, "contrib", { label: "Monthly contribution", min: 0, optional: true, max: 1e12 }, errors) ?? 0;
  const rate = readNum(v, "rate", { label: "Interest rate", min: 0, max: 100 }, errors);
  const years = readNum(v, "years", { label: "Time", gt: 0, max: 100 }, errors);
  if (principal !== null && principal === 0 && contrib === 0) errors.principal = "Enter a starting amount or a monthly contribution.";
  if (hasErrors(errors) || principal === null || rate === null || years === null) return fail(errors);
  const c = COMPOUNDING[v.comp] ?? COMPOUNDING.monthly;
  const r = compoundInterest({ principal, monthlyContribution: contrib, annualRatePct: rate, years, periodsPerYear: c.n, contributeAtStart: v.timing === "start" });
  const f = (n: number) => money(n, cur);
  const notes = ["Growth is shown before tax, fees and inflation. Real returns are rarely constant, so treat this as an illustration of the maths, not a forecast."];
  if (contrib > 0 && c.n !== 12) {
    notes.push("With regular contributions, growth between compounding dates is applied as the monthly equivalent of the chosen frequency, a small approximation. With no contributions the result is exact.");
  }
  return {
    ok: true,
    headline: { label: "Future value", value: f(r.futureValue), sub: `After ${years} years at ${fixed(rate, 3)}%, compounded ${c.label.toLowerCase()}` },
    stats: [
      { label: "Total paid in", value: f(r.totalContributed), hint: "Starting amount plus all contributions" },
      { label: "Interest earned", value: f(r.interestEarned) },
      { label: "Effective annual rate", value: `${fixed(r.effectiveAnnualPct, 4)}%`, hint: "The yearly growth that equals the stated rate and frequency" },
      { label: "Growth multiple", value: `${fixed(r.futureValue / Math.max(r.totalContributed, 1e-9), 2)}×`, hint: "Future value divided by the total paid in" },
    ],
    tables: [
      {
        title: "Year by year",
        columns: ["Year", "Paid in so far", "Interest this year", "Balance"],
        rows: r.yearly.map((y) => [String(y.year), f(y.contributed), f(y.interest), f(y.balance)]),
      },
    ],
    notes,
  };
}

export default function CompoundInterestWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
