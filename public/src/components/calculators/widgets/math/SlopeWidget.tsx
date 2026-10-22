"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { slopeInfo } from "@/lib/calculators/geometry";
import { g } from "./geoShared";

const fields: FieldDef[] = [
  { id: "x1", kind: "number", label: "x₁", default: "1" },
  { id: "y1", kind: "number", label: "y₁", default: "2" },
  { id: "x2", kind: "number", label: "x₂", default: "5" },
  { id: "y2", kind: "number", label: "y₂", default: "10" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const x1 = readNum(v, "x1", { label: "x₁" }, e);
  const y1 = readNum(v, "y1", { label: "y₁" }, e);
  const x2 = readNum(v, "x2", { label: "x₂" }, e);
  const y2 = readNum(v, "y2", { label: "y₂" }, e);
  if (hasErrors(e) || x1 === null || y1 === null || x2 === null || y2 === null) return fail(e);
  if (x1 === x2 && y1 === y2) return fail({ x2: "The two points are identical, so no line is defined. Enter two different points." });
  const s = slopeInfo(x1, y1, x2, y2);
  if (s.vertical) {
    return {
      ok: true,
      headline: { label: "Slope", value: "Undefined", sub: `Vertical line x = ${g(x1)}` },
      stats: [{ label: "Rise (Δy)", value: g(s.dy) }, { label: "Run (Δx)", value: "0" }, { label: "Distance between points", value: g(s.distance) }, { label: "Midpoint", value: `(${g(s.midpoint[0])}, ${g(s.midpoint[1])})` }, { label: "Angle with the x-axis", value: "90°" }, { label: "x-intercept", value: g(x1) }, { label: "y-intercept", value: "None" }],
      steps: ["The run (x₂ − x₁) is zero, so dividing the rise by the run is not possible."],
    };
  }
  const m = s.slope!;
  const b = s.intercept!;
  const sign = b < 0 ? "−" : "+";
  const eq = m === 0 ? `y = ${g(b)}` : `y = ${g(m)}x ${sign} ${g(Math.abs(b))}`;
  return {
    ok: true,
    headline: { label: "Slope (m)", value: g(m, 12), sub: eq },
    stats: [
      { label: "Rise (Δy)", value: g(s.dy) },
      { label: "Run (Δx)", value: g(s.dx) },
      { label: "Angle of inclination", value: `${g(s.inclineDeg, 8)}°`, hint: "Steepness measured from the horizontal, ignoring direction" },
      { label: "Grade (percent)", value: `${g(m * 100, 8)}%` },
      { label: "Distance between points", value: g(s.distance) },
      { label: "Midpoint", value: `(${g(s.midpoint[0])}, ${g(s.midpoint[1])})` },
      { label: "y-intercept", value: g(b) },
      { label: "x-intercept", value: s.xIntercept === null ? "None (horizontal line)" : g(s.xIntercept) },
      { label: "Direction", value: m > 0 ? "Rising (positive slope)" : m < 0 ? "Falling (negative slope)" : "Flat (zero slope)" },
    ],
    steps: [`m = (y₂ − y₁) ÷ (x₂ − x₁) = (${g(y2)} − ${g(y1)}) ÷ (${g(x2)} − ${g(x1)}) = ${g(m, 12)}.`, `b = y₁ − m × x₁ = ${g(b)}.`, `Line: ${eq}.`],
  };
}

export default function SlopeWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
