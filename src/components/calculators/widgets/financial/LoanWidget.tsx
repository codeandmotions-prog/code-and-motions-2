"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { amortize, deferredAmount, COMPOUNDING } from "@/lib/calculators/finance";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField, yearsMonths } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  {
    id: "mode",
    kind: "segmented",
    label: "Loan type",
    default: "amortized",
    options: [
      { value: "amortized", label: "Monthly repayments" },
      { value: "deferred", label: "One payment at the end" },
    ],
  },
  { id: "amount", kind: "number", label: "Loan amount", default: "25000" },
  { id: "years", kind: "number", label: "Term: years", default: "5", unit: "years" },
  { id: "months", kind: "number", label: "Term: extra months", default: "0", unit: "months" },
  { id: "rate", kind: "number", label: "Interest rate (annual)", default: "7", unit: "%" },
  {
    id: "comp",
    kind: "select",
    label: "Compounding",
    default: "monthly",
    options: Object.entries(COMPOUNDING).map(([value, c]) => ({ value, label: c.label })),
    showIf: (v) => v.mode === "deferred",
    hint: "How often interest is added to the balance.",
  },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const amount = readNum(v, "amount", { label: "Loan amount", gt: 0, max: 1e12 }, errors);
  const years = readNum(v, "years", { label: "Term (years)", min: 0, max: 100, integer: true }, errors);
  const months = readNum(v, "months", { label: "Term (months)", min: 0, max: 1200, integer: true, optional: true }, errors) ?? 0;
  const rate = readNum(v, "rate", { label: "Interest rate", min: 0, max: 100 }, errors);
  if (years !== null && years * 12 + months <= 0) errors.years = "The term must be at least one month.";
  if (hasErrors(errors) || amount === null || years === null || rate === null) return fail(errors);
  const termMonths = years * 12 + months;
  const f = (n: number) => money(n, cur);

  if (v.mode === "deferred") {
    const c = COMPOUNDING[v.comp] ?? COMPOUNDING.monthly;
    const d = deferredAmount(amount, rate, termMonths / 12, c.n);
    return {
      ok: true,
      headline: { label: "Amount due at the end", value: f(d.amount), sub: `${f(amount)} borrowed for ${yearsMonths(termMonths)} at ${fixed(rate, 3)}%, compounded ${c.label.toLowerCase()}` },
      stats: [
        { label: "Interest charged", value: f(d.interest) },
        { label: "Interest as a share of the loan", value: `${fixed((d.interest / amount) * 100, 2)}%` },
      ],
      notes: ["No payments are made until the end of the term. Interest compounds on the growing balance: amount × (1 + rate ÷ n)^(n × years)."],
    };
  }

  const a = amortize(amount, rate, termMonths);
  return {
    ok: true,
    headline: { label: "Monthly payment", value: f(a.payment), sub: `${f(amount)} over ${yearsMonths(termMonths)} at ${fixed(rate, 3)}% (monthly compounding)` },
    stats: [
      { label: "Total of all payments", value: f(a.totalPaid) },
      { label: "Total interest", value: f(a.totalInterest) },
      { label: "Interest as a share of the loan", value: `${fixed((a.totalInterest / amount) * 100, 2)}%` },
      { label: "Number of payments", value: String(a.months) },
    ],
    tables: [
      {
        title: "Yearly breakdown",
        columns: ["Year", "Interest paid", "Principal paid", "Balance at year end"],
        rows: a.yearly.map((y) => [String(y.year), f(y.interest), f(y.principal), f(y.balance)]),
      },
    ],
    notes: ["Level monthly payments on a fixed rate. Arrangement fees, insurance and early-repayment charges are not included."],
  };
}

export default function LoanWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
