"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { circleFrom, sectorArea } from "@/lib/calculators/geometry";
import { g, lengthUnitField, unitOf } from "./geoShared";

const fields: FieldDef[] = [
  {
    id: "known",
    kind: "select",
    label: "I know the circle’s…",
    default: "radius",
    options: [
      { value: "radius", label: "Radius" },
      { value: "diameter", label: "Diameter" },
      { value: "circumference", label: "Circumference" },
      { value: "area", label: "Area" },
    ],
  },
  { id: "value", kind: "number", label: "Value", default: "5", hint: "Greater than 0. For area, use the unit squared." },
  lengthUnitField("unit", "cm"),
  { id: "angle", kind: "number", label: "Sector angle (optional)", default: "", unit: "°", hint: "Enter 0–360° to also get the arc length and sector area." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const val = readNum(v, "value", { label: "Value", gt: 0, max: 1e15 }, e);
  const ang = readNum(v, "angle", { label: "Sector angle", gt: 0, max: 360, optional: true }, e);
  if (hasErrors(e) || val === null) return fail(e);
  const u = unitOf(v.unit).abbr;
  const c = circleFrom(v.known as "radius" | "diameter" | "circumference" | "area", val);
  const stats = [
    { label: "Radius (r)", value: `${g(c.r)} ${u}` },
    { label: "Diameter (d = 2r)", value: `${g(c.d)} ${u}` },
    { label: "Circumference (2πr)", value: `${g(c.c)} ${u}` },
    { label: "Area (πr²)", value: `${g(c.a)} ${u}²` },
  ];
  if (ang !== null) {
    stats.push({ label: `Arc length for ${g(ang)}°`, value: `${g((ang / 360) * c.c)} ${u}` }, { label: `Sector area for ${g(ang)}°`, value: `${g(sectorArea(c.r, ang))} ${u}²` });
  }
  return {
    ok: true,
    headline: { label: v.known === "area" ? "Radius" : "Area", value: v.known === "area" ? `${g(c.r)} ${u}` : `${g(c.a)} ${u}²`, sub: `Circumference ${g(c.c)} ${u}` },
    stats,
    steps: ["r = d ÷ 2 = C ÷ 2π = √(A ÷ π).", "C = 2πr and A = πr², with π ≈ 3.14159265358979."],
  };
}

export default function CircleWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
