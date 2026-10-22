"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { parseNumber } from "@/lib/calculators/parse";
import { qFromString, qPow, qToFraction } from "@/lib/calculators/rational";
import { fmt, groupDigits } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "Solve for",
    default: "result",
    wide: true,
    options: [
      { value: "result", label: "The result: base ^ exponent = ?" },
      { value: "base", label: "The base: ? ^ exponent = result" },
      { value: "exp", label: "The exponent: base ^ ? = result" },
    ],
  },
  { id: "base", kind: "text", label: "Base", default: "2", showIf: (v) => v.mode !== "base", hint: "Type e for Euler's number (2.71828…)." },
  { id: "exp", kind: "number", label: "Exponent", default: "-3", showIf: (v) => v.mode !== "exp", hint: "Negative and decimal exponents are fine." },
  { id: "res", kind: "number", label: "Result", default: "8", showIf: (v) => v.mode !== "result" },
];

function readBase(raw: string): number | null {
  const t = raw.trim().toLowerCase();
  if (t === "e") return Math.E;
  return parseNumber(raw);
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  if (v.mode === "result") {
    const b = readBase(v.base ?? "");
    if (b === null) e.base = "Enter a number or the letter e.";
    const x = readNum(v, "exp", { label: "Exponent" }, e);
    if (hasErrors(e) || b === null || x === null) return fail(e);
    if (b === 0 && x < 0) return fail({ exp: "Zero cannot be raised to a negative power (division by zero)." });
    if (b < 0 && !Number.isInteger(x)) return fail({ exp: "A negative base with a non-whole exponent gives a complex number, which this calculator does not handle." });
    const r = Math.pow(b, x);
    if (!Number.isFinite(r)) return fail({ exp: "The result is too large to represent." });
    const steps: string[] = [];
    let exact: string | undefined;
    const bq = (v.base ?? "").trim().toLowerCase() === "e" ? null : qFromString(v.base ?? "");
    if (bq && Number.isInteger(x) && Math.abs(x) <= 2000 && bq.n !== 0n) {
      const digits = (BigInt(bq.n < 0n ? -bq.n : bq.n).toString().length + bq.d.toString().length) * Math.abs(x);
      if (digits <= 3000) {
        const ex = qPow(bq, x);
        exact = ex.d === 1n ? groupDigits(ex.n.toString()) : qToFraction(ex);
        if (x < 0) steps.push(`A negative exponent means the reciprocal: ${fmt(b)}^${fmt(x)} = 1 ÷ ${fmt(b)}^${fmt(-x)}.`);
      }
    }
    steps.push(`${fmt(b, 10)}^${fmt(x, 10)} = ${fmt(r, 12)}`);
    return {
      ok: true,
      headline: { label: `${fmt(b, 10)} ^ ${fmt(x, 10)}`, value: fmt(r, 12) },
      stats: [
        ...(exact ? [{ label: "Exact value", value: exact.length > 200 ? `${exact.slice(0, 200)}…` : exact }] : []),
        { label: "Scientific notation", value: r === 0 ? "0" : Number(r.toPrecision(10)).toExponential() },
      ],
      steps,
    };
  }
  if (v.mode === "base") {
    const x = readNum(v, "exp", { label: "Exponent" }, e);
    const z = readNum(v, "res", { label: "Result" }, e);
    if (x === 0) e.exp = "With an exponent of 0 every base gives 1, so the base cannot be recovered.";
    if (hasErrors(e) || x === null || z === null) return fail(e);
    if (z < 0 && !(Number.isInteger(x) && Math.abs(x) % 2 === 1)) return fail({ res: "A negative result only has a real base when the exponent is an odd whole number." });
    const b = z < 0 ? -Math.pow(-z, 1 / x) : Math.pow(z, 1 / x);
    return { ok: true, headline: { label: `? ^ ${fmt(x)} = ${fmt(z)}`, value: fmt(b, 12) }, steps: [`base = result^(1 ÷ exponent) = ${fmt(z)}^(1 ÷ ${fmt(x)}) = ${fmt(b, 12)}`], notes: ["Only the real, principal base is shown. Even exponents also have a negative base (for example both 3 and −3 square to 9)."] };
  }
  const b = readBase(v.base ?? "");
  if (b === null) e.base = "Enter a number or the letter e.";
  const z = readNum(v, "res", { label: "Result" }, e);
  if (hasErrors(e) || b === null || z === null) return fail(e);
  if (!(b > 0) || b === 1) return fail({ base: "The base must be positive and not equal to 1." });
  if (!(z > 0)) return fail({ res: "The result must be positive to solve for an exponent." });
  const x = Math.log(z) / Math.log(b);
  return { ok: true, headline: { label: `${fmt(b, 10)} ^ ? = ${fmt(z)}`, value: fmt(x, 12) }, steps: [`exponent = ln(result) ÷ ln(base) = ln(${fmt(z)}) ÷ ln(${fmt(b, 10)}) = ${fmt(x, 12)}`] };
}

export default function ExponentWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
