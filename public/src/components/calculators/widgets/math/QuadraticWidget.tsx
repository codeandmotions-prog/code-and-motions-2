"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { solveQuadratic } from "@/lib/calculators/mathmisc";
import { fmt } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "a", kind: "text", label: "a (coefficient of x²)", default: "1", hint: "Decimals or fractions such as 3/4 are fine. Cannot be 0." },
  { id: "b", kind: "text", label: "b (coefficient of x)", default: "-3" },
  { id: "c", kind: "text", label: "c (constant)", default: "2" },
];

const sgn = (n: number) => (n < 0 ? `− ${fmt(-n)}` : `+ ${fmt(n)}`);

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const a = readNum(v, "a", { label: "a" }, e);
  const b = readNum(v, "b", { label: "b" }, e);
  const c = readNum(v, "c", { label: "c" }, e);
  if (a === 0) e.a = "a cannot be 0, because then the equation is linear (bx + c = 0), not quadratic.";
  if (hasErrors(e) || a === null || b === null || c === null) return fail(e);
  const s = solveQuadratic(a, b, c);
  const eq = `${fmt(a)}x² ${sgn(b)}x ${sgn(c)} = 0`;
  const common = [
    { label: "Discriminant (b² − 4ac)", value: fmt(s.disc, 10), hint: s.disc > 0 ? "Positive: two real roots" : s.disc === 0 ? "Zero: one repeated root" : "Negative: two complex roots" },
    { label: "Vertex", value: `(${fmt(s.vertexX, 8)}, ${fmt(s.vertexY, 8)})`, hint: a > 0 ? "Parabola opens upward (minimum)" : "Parabola opens downward (maximum)" },
    { label: "Axis of symmetry", value: `x = ${fmt(s.vertexX, 8)}` },
    { label: "y-intercept", value: `(0, ${fmt(c)})` },
  ];
  const steps = [`Equation: ${eq}`, `Discriminant = b² − 4ac = ${fmt(b)}² − 4 × ${fmt(a)} × ${fmt(c)} = ${fmt(s.disc, 10)}`];
  if (s.kind === "two real roots") {
    steps.push(`x = (−b ± √discriminant) ÷ 2a = (${fmt(-b)} ± √${fmt(s.disc, 10)}) ÷ ${fmt(2 * a)}`);
    return {
      ok: true,
      headline: { label: "Roots", value: `x₁ = ${fmt(s.roots![0], 12)},  x₂ = ${fmt(s.roots![1], 12)}`, sub: "Two distinct real solutions" },
      stats: [...common, { label: "Factored form", value: `${fmt(a)}(x ${sgn(-s.roots![0])})(x ${sgn(-s.roots![1])})` }],
      steps,
    };
  }
  if (s.kind === "one repeated real root") {
    steps.push(`x = −b ÷ 2a = ${fmt(-b)} ÷ ${fmt(2 * a)} = ${fmt(s.roots![0], 12)}`);
    return { ok: true, headline: { label: "Root (repeated)", value: `x = ${fmt(s.roots![0], 12)}`, sub: "The parabola just touches the x-axis" }, stats: common, steps };
  }
  const { re, im } = s.complex!;
  steps.push(`The discriminant is negative, so x = (−b ± i√|discriminant|) ÷ 2a = ${fmt(re, 10)} ± ${fmt(im, 10)}i.`);
  return {
    ok: true,
    headline: { label: "Complex roots", value: `x = ${fmt(re, 10)} ± ${fmt(im, 10)}i`, sub: "There are no real solutions: the parabola does not cross the x-axis" },
    stats: common,
    steps,
  };
}

export default function QuadraticWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
