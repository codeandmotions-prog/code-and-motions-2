"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { hasErrors, type Values } from "@/lib/calculators/validate";
import { type Q, qFromString, qMul, qDiv, qToDecimal, qToFraction, lcmB, gcdB } from "@/lib/calculators/rational";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to do?",
    default: "solve",
    wide: true,
    options: [
      { value: "solve", label: "Find the missing value in A : B = C : D" },
      { value: "simplify", label: "Simplify a ratio" },
      { value: "scale", label: "Scale a ratio up or down" },
    ],
  },
  { id: "a", kind: "text", label: "A", default: "3", showIf: (v) => v.mode === "solve" },
  { id: "b", kind: "text", label: "B", default: "4", showIf: (v) => v.mode === "solve" },
  { id: "c", kind: "text", label: "C", default: "12", showIf: (v) => v.mode === "solve" },
  { id: "d", kind: "text", label: "D (leave one box empty to find it)", default: "", showIf: (v) => v.mode === "solve", hint: "Fill in any three boxes and leave one empty; the calculator finds it." },
  { id: "t1", kind: "text", label: "First term", default: "12", showIf: (v) => v.mode !== "solve" },
  { id: "t2", kind: "text", label: "Second term", default: "18", showIf: (v) => v.mode !== "solve" },
  { id: "t3", kind: "text", label: "Third term (optional)", default: "30", showIf: (v) => v.mode !== "solve" },
  { id: "k", kind: "text", label: "Scale factor", default: "2.5", showIf: (v) => v.mode === "scale", hint: "Greater than 1 enlarges the ratio; between 0 and 1 shrinks it." },
];

const dec = (x: Q) => qToDecimal(x, 12).text;

function readQ(v: Values, id: string, label: string, e: Record<string, string>, optional = false): Q | null {
  const raw = (v[id] ?? "").trim();
  if (raw === "") {
    if (!optional) e[id] = `Enter a value for ${label}.`;
    return null;
  }
  const x = qFromString(raw);
  if (!x) e[id] = `“${raw}” is not a valid number.`;
  return x;
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  if (v.mode === "solve") {
    const ids = ["a", "b", "c", "d"] as const;
    const vals = ids.map((id) => readQ(v, id, id.toUpperCase(), e, true));
    if (hasErrors(e)) return fail(e);
    const blanks = ids.filter((_, i) => vals[i] === null);
    if (blanks.length !== 1) return fail({ [blanks[0] ?? "d"]: "Leave exactly one of the four boxes empty." });
    const [A, B, C, D] = vals;
    const zero = (x: Q | null) => x !== null && x.n === 0n;
    let missing: Q;
    let formula: string;
    if (A === null) {
      if (zero(D)) return fail({ d: "D cannot be zero when solving for A." });
      missing = qDiv(qMul(B!, C!), D!);
      formula = "A = B × C ÷ D";
    } else if (B === null) {
      if (zero(C)) return fail({ c: "C cannot be zero when solving for B." });
      missing = qDiv(qMul(A, D!), C!);
      formula = "B = A × D ÷ C";
    } else if (C === null) {
      if (zero(B)) return fail({ b: "B cannot be zero when solving for C." });
      missing = qDiv(qMul(A, D!), B!);
      formula = "C = A × D ÷ B";
    } else {
      if (zero(A)) return fail({ a: "A cannot be zero when solving for D." });
      missing = qDiv(qMul(B, C), A);
      formula = "D = B × C ÷ A";
    }
    return {
      ok: true,
      headline: { label: `Missing value (${blanks[0].toUpperCase()})`, value: dec(missing), sub: missing.d === 1n ? undefined : `As a fraction: ${qToFraction(missing)}` },
      steps: ["Cross-multiply: A × D = B × C.", `Solve for the unknown: ${formula}.`],
    };
  }
  const t1 = readQ(v, "t1", "the first term", e);
  const t2 = readQ(v, "t2", "the second term", e);
  const t3 = readQ(v, "t3", "the third term", e, true);
  if (hasErrors(e) || !t1 || !t2) return fail(e);
  const terms = [t1, t2, ...(t3 ? [t3] : [])];
  if (terms.some((t) => t.n < 0n)) return fail({ t1: "Ratio terms must not be negative." });
  if (terms.every((t) => t.n === 0n)) return fail({ t1: "At least one term must be above zero." });
  if (v.mode === "simplify") {
    const l = terms.reduce((acc, t) => lcmB(acc, t.d), 1n);
    const ints = terms.map((t) => (t.n * l) / t.d);
    const g = ints.reduce((acc, x) => gcdB(acc, x), 0n);
    const out = ints.map((x) => x / g);
    return {
      ok: true,
      headline: { label: "Simplified ratio", value: out.join(" : ") },
      steps: [
        l === 1n ? "All terms are whole numbers." : `Multiply every term by ${l} to clear decimals and fractions: ${ints.join(" : ")}.`,
        `Divide every term by their greatest common factor (${g}): ${out.join(" : ")}.`,
      ],
    };
  }
  const k = readQ(v, "k", "the scale factor", e);
  if (hasErrors(e) || !k) return fail(e);
  if (k.n <= 0n) return fail({ k: "The scale factor must be greater than zero." });
  const scaled = terms.map((t) => qMul(t, k));
  return {
    ok: true,
    headline: { label: `Ratio × ${dec(k)}`, value: scaled.map(dec).join(" : ") },
    stats: [{ label: "Original ratio", value: terms.map(dec).join(" : ") }],
    steps: [`Multiply every term by ${dec(k)}.`],
  };
}

export default function RatioWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
