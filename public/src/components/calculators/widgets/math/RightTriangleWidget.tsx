"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import TriangleFigure from "../../TriangleFigure";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { solveRight, type RightKey } from "@/lib/calculators/geometry";
import { g } from "./geoShared";

const KEYS: { value: RightKey; label: string }[] = [
  { value: "a", label: "Leg a" },
  { value: "b", label: "Leg b" },
  { value: "c", label: "Hypotenuse c" },
  { value: "alpha", label: "Angle α (opposite leg a), degrees" },
  { value: "beta", label: "Angle β (opposite leg b), degrees" },
  { value: "h", label: "Altitude to the hypotenuse (h)" },
  { value: "area", label: "Area" },
  { value: "perimeter", label: "Perimeter" },
];

const fields: FieldDef[] = [
  { id: "k1", kind: "select", label: "First known value", default: "a", options: KEYS },
  { id: "v1", kind: "number", label: "Its value", default: "3" },
  { id: "k2", kind: "select", label: "Second known value", default: "b", options: KEYS },
  { id: "v2", kind: "number", label: "Its value", default: "4" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const v1 = readNum(v, "v1", { label: "First value", gt: 0 }, e);
  const v2 = readNum(v, "v2", { label: "Second value", gt: 0 }, e);
  if (hasErrors(e) || v1 === null || v2 === null) return fail(e);
  const r = solveRight(v.k1 as RightKey, v1, v.k2 as RightKey, v2);
  if (!r.sol) return fail({ k2: r.error ?? "These values do not describe a right triangle." });
  const s = r.sol;
  return {
    ok: true,
    figure: <TriangleFigure a={s.a} b={s.b} c={s.c} A={s.alpha} B={s.beta} C={90} right />,
    headline: { label: "Hypotenuse c", value: g(s.c), sub: `Legs ${g(s.a)} and ${g(s.b)} · area ${g(s.area)}` },
    stats: [
      { label: "Leg a", value: g(s.a) },
      { label: "Leg b", value: g(s.b) },
      { label: "Hypotenuse c", value: g(s.c) },
      { label: "Angle α (opposite a)", value: `${g(s.alpha, 8)}°` },
      { label: "Angle β (opposite b)", value: `${g(s.beta, 8)}°` },
      { label: "Area", value: g(s.area) },
      { label: "Perimeter", value: g(s.perimeter) },
      { label: "Altitude to the hypotenuse", value: g(s.h) },
      { label: "Inradius", value: g(s.inradius) },
      { label: "Circumradius", value: g(s.circumradius), hint: "Half the hypotenuse" },
    ],
    steps: ["Right angle at C, so a² + b² = c².", "Angles: α + β = 90°, tan α = a ÷ b.", "Area = a × b ÷ 2; altitude to the hypotenuse = a × b ÷ c."],
  };
}

export default function RightTriangleWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
