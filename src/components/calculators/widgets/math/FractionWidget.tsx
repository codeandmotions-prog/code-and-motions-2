"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { absB, q, qAdd, qSub, qMul, qDiv, qToFraction, qToMixed, qToDecimal, qFromString, gcdB, lcmB, type Q } from "@/lib/calculators/rational";

const opts = [
  { value: "add", label: "Add (+)" },
  { value: "sub", label: "Subtract (−)" },
  { value: "mul", label: "Multiply (×)" },
  { value: "div", label: "Divide (÷)" },
];

const operand = (n: "1" | "2", w: string, nu: string, de: string): FieldDef[] => [
  { id: `w${n}`, kind: "number", label: `Fraction ${n}: whole number`, default: w, hint: n === "1" ? "Leave 0 for a plain fraction." : undefined, showIf: (v) => v.mode === "arith" },
  { id: `n${n}`, kind: "number", label: `Fraction ${n}: numerator`, default: nu, showIf: (v) => v.mode === "arith" },
  { id: `d${n}`, kind: "number", label: `Fraction ${n}: denominator`, default: de, showIf: (v) => v.mode === "arith" },
];

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to do?",
    default: "arith",
    wide: true,
    options: [
      { value: "arith", label: "Add, subtract, multiply or divide two fractions" },
      { value: "simplify", label: "Simplify a fraction" },
      { value: "toDecimal", label: "Convert a fraction to a decimal" },
      { value: "fromDecimal", label: "Convert a decimal to a fraction" },
    ],
  },
  ...operand("1", "0", "1", "2"),
  { id: "op", kind: "select", label: "Operation", default: "add", options: opts, showIf: (v) => v.mode === "arith", wide: true },
  ...operand("2", "0", "1", "3"),
  { id: "sn", kind: "number", label: "Numerator", default: "18", showIf: (v) => v.mode === "simplify" || v.mode === "toDecimal" },
  { id: "sd", kind: "number", label: "Denominator", default: "24", showIf: (v) => v.mode === "simplify" || v.mode === "toDecimal" },
  { id: "dec", kind: "number", label: "Decimal number", default: "0.375", showIf: (v) => v.mode === "fromDecimal", hint: "Terminating decimals only, for example 0.375 or 2.25." },
];

function readFrac(v: Values, n: "1" | "2", errors: Record<string, string>): Q | null {
  const w = readNum(v, `w${n}`, { label: `Fraction ${n} whole number`, integer: true, optional: true }, errors) ?? 0;
  const nu = readNum(v, `n${n}`, { label: `Fraction ${n} numerator`, integer: true, min: 0 }, errors);
  const de = readNum(v, `d${n}`, { label: `Fraction ${n} denominator`, integer: true, gt: 0 }, errors);
  if (nu === null || de === null) return null;
  const frac = q(BigInt(nu), BigInt(de));
  const neg = w < 0;
  const whole = q(BigInt(Math.abs(w)));
  const mag = qAdd(whole, frac);
  return neg ? q(-mag.n, mag.d) : mag;
}

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  if (v.mode === "simplify" || v.mode === "toDecimal") {
    const nu = readNum(v, "sn", { label: "Numerator", integer: true }, errors);
    const dd = readNum(v, "sd", { label: "Denominator", integer: true }, errors);
    if (dd === 0) errors.sd = "The denominator cannot be zero.";
    if (hasErrors(errors) || nu === null || dd === null) return fail(errors);
    const f = q(BigInt(nu), BigInt(dd));
    const g = gcdB(BigInt(nu), BigInt(dd));
    if (v.mode === "simplify") {
      return {
        ok: true,
        headline: { label: "Simplified fraction", value: qToFraction(f), sub: f.d === 1n ? undefined : `Mixed number: ${qToMixed(f)}` },
        stats: [{ label: "Decimal", value: qToDecimal(f, 24).text }, { label: "Greatest common factor used", value: g.toString() }],
        steps: [`GCF of ${absB(BigInt(nu))} and ${absB(BigInt(dd))} is ${g}.`, `Divide the top and bottom by ${g}: ${nu} ÷ ${g} = ${BigInt(nu) / g}, ${dd} ÷ ${g} = ${BigInt(dd) / g}.`],
      };
    }
    const d = qToDecimal(f, 30);
    return {
      ok: true,
      headline: { label: "Decimal value", value: d.text, sub: d.repeating ? "The digits in brackets repeat forever." : undefined },
      stats: [{ label: "Fraction in lowest terms", value: qToFraction(f) }],
      steps: [`Divide ${nu} by ${dd} using long division.`],
    };
  }
  if (v.mode === "fromDecimal") {
    const raw = (v.dec ?? "").trim();
    const val = qFromString(raw);
    if (!val) return fail({ dec: "Enter a valid decimal number such as 0.375." });
    return {
      ok: true,
      headline: { label: "As a fraction", value: qToFraction(val), sub: val.d === 1n ? undefined : `Mixed number: ${qToMixed(val)}` },
      steps: [`Write ${raw} over a power of ten, then divide the top and bottom by their greatest common factor.`],
    };
  }
  const a = readFrac(v, "1", errors);
  const b = readFrac(v, "2", errors);
  if (hasErrors(errors) || !a || !b) return fail(errors);
  const op = v.op ?? "add";
  if (op === "div" && b.n === 0n) return fail({ n2: "You cannot divide by zero." });
  const symbol = op === "add" ? "+" : op === "sub" ? "−" : op === "mul" ? "×" : "÷";
  const r = op === "add" ? qAdd(a, b) : op === "sub" ? qSub(a, b) : op === "mul" ? qMul(a, b) : qDiv(a, b);
  const steps: string[] = [`Write both as improper fractions: ${qToFraction(a)} and ${qToFraction(b)}.`];
  if (op === "add" || op === "sub") {
    const l = lcmB(a.d, b.d);
    steps.push(`Common denominator (least common multiple of ${a.d} and ${b.d}): ${l}.`);
    steps.push(`${qToFraction(a)} = ${a.n * (l / a.d)}/${l}, ${qToFraction(b)} = ${b.n * (l / b.d)}/${l}.`);
    steps.push(`${a.n * (l / a.d)} ${symbol} ${b.n * (l / b.d)} = ${op === "add" ? a.n * (l / a.d) + b.n * (l / b.d) : a.n * (l / a.d) - b.n * (l / b.d)}, so the result over ${l} is ${(op === "add" ? a.n * (l / a.d) + b.n * (l / b.d) : a.n * (l / a.d) - b.n * (l / b.d))}/${l}.`);
  } else if (op === "mul") {
    steps.push(`Multiply the tops and the bottoms: (${a.n} × ${b.n}) / (${a.d} × ${b.d}).`);
  } else {
    steps.push(`Divide by multiplying by the reciprocal: ${qToFraction(a)} × ${b.n < 0n ? `${-b.d}/${-b.n}` : `${b.d}/${b.n}`}.`);
  }
  steps.push(`Simplify by the greatest common factor: ${qToFraction(r)}.`);
  return {
    ok: true,
    headline: { label: `${qToFraction(a)} ${symbol} ${qToFraction(b)} =`, value: qToFraction(r), sub: r.d === 1n ? undefined : `Mixed number: ${qToMixed(r)}` },
    stats: [{ label: "Result as a mixed number", value: qToMixed(r) }, { label: "Result as a decimal", value: qToDecimal(r, 24).text }],
    steps,
    notes: ["Results are exact and always shown in lowest terms."],
  };
}

export default function FractionWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
