"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { mortgage } from "@/lib/calculators/finance";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField, yearsMonths } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  { id: "price", kind: "number", label: "Home price", default: "400000", hint: "The purchase price of the property." },
  {
    id: "downType",
    kind: "segmented",
    label: "Down payment entered as",
    default: "pct",
    options: [
      { value: "pct", label: "Percentage of price" },
      { value: "amt", label: "Fixed amount" },
    ],
  },
  { id: "down", kind: "number", label: "Down payment", default: "20", hint: "A percentage (such as 20) or an amount, matching your choice above." },
  { id: "term", kind: "number", label: "Loan term", default: "30", unit: "years" },
  { id: "rate", kind: "number", label: "Interest rate (annual)", default: "6.5", unit: "%", hint: "Fixed rate, as a yearly percentage." },
  { id: "tax", kind: "number", label: "Property tax / local taxes per year", default: "4800", hint: "Optional. Added to the monthly total only." },
  { id: "ins", kind: "number", label: "Home insurance per year", default: "1200", hint: "Optional. Added to the monthly total only." },
  { id: "other", kind: "number", label: "Other monthly costs", default: "0", hint: "Optional: service charge, HOA fees, ground rent and similar." },
  { id: "extra", kind: "number", label: "Extra payment each month", default: "0", hint: "Optional. Paid on top of the regular payment to reduce the balance." },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const price = readNum(v, "price", { label: "Home price", gt: 0, max: 1e12 }, errors);
  const isPct = v.downType !== "amt";
  const down = readNum(v, "down", { label: "Down payment", min: 0, max: isPct ? 99.99 : 1e12 }, errors);
  const term = readNum(v, "term", { label: "Loan term", min: 1, max: 50 }, errors);
  const rate = readNum(v, "rate", { label: "Interest rate", min: 0, max: 50 }, errors);
  const tax = readNum(v, "tax", { label: "Property tax", min: 0, optional: true, max: 1e12 }, errors) ?? 0;
  const ins = readNum(v, "ins", { label: "Home insurance", min: 0, optional: true, max: 1e12 }, errors) ?? 0;
  const other = readNum(v, "other", { label: "Other monthly costs", min: 0, optional: true, max: 1e12 }, errors) ?? 0;
  const extra = readNum(v, "extra", { label: "Extra payment", min: 0, optional: true, max: 1e12 }, errors) ?? 0;
  if (!isPct && price !== null && down !== null && down >= price) errors.down = "The down payment must be less than the home price.";
  if (hasErrors(errors) || price === null || down === null || term === null || rate === null) return fail(errors);

  const m = mortgage({ price, down, downIsPercent: isPct, termYears: term, ratePct: rate, propertyTaxYear: tax, insuranceYear: ins, otherMonthly: other, extraMonthly: extra });
  const f = (n: number) => money(n, cur);
  const stats = [
    { label: "Loan amount", value: f(m.loan), hint: `Price ${f(price)} minus down payment ${f(m.downAmount)}` },
    { label: "Total monthly cost", value: f(m.monthlyTotal + extra), hint: "Payment plus taxes, insurance, other costs and any extra payment" },
    { label: "Total interest over the loan", value: f(m.withExtra.totalInterest) },
    { label: "Total of principal and interest", value: f(m.withExtra.totalPaid) },
    { label: "Time to pay off", value: yearsMonths(m.withExtra.months) },
  ];
  if (extra > 0) {
    stats.push({ label: "Interest saved by extra payments", value: f(m.interestSaved), hint: `Pays off ${yearsMonths(m.monthsSaved)} sooner` });
  }
  return {
    ok: true,
    headline: { label: "Monthly payment (principal and interest)", value: f(m.payment), sub: `${fixed(rate, 3)}% over ${term} years on ${f(m.loan)}` },
    stats,
    tables: [
      {
        title: "Yearly breakdown",
        columns: ["Year", "Interest paid", "Principal paid", "Balance at year end"],
        rows: m.withExtra.yearly.map((y) => [String(y.year), f(y.interest), f(y.principal), f(y.balance)]),
        caption: "Payments are not rounded to cents, so totals can differ from a lender's schedule by a few cents.",
      },
    ],
    notes: [
      "Fixed-rate repayment mortgage with monthly payments. Adjustable rates, interest-only periods, fees, early-repayment charges and tax relief are not modelled.",
    ],
  };
}

export default function MortgageWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
