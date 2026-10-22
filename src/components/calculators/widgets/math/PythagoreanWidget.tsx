"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { g } from "./geoShared";

const fields: FieldDef[] = [
  {
    id: "solve",
    kind: "segmented",
    label: "Find",
    default: "c",
    options: [
      { value: "c", label: "Hypotenuse c" },
      { value: "a", label: "Leg a" },
      { value: "b", label: "Leg b" },
    ],
  },
  { id: "a", kind: "number", label: "Leg a", default: "6", showIf: (v) => v.solve !== "a" },
  { id: "b", kind: "number", label: "Leg b", default: "8", showIf: (v) => v.solve !== "b" },
  { id: "c", kind: "number", label: "Hypotenuse c (longest side)", default: "10", showIf: (v) => v.solve !== "c" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const solve = v.solve as "a" | "b" | "c";
  const val: Record<string, number | null> = { a: null, b: null, c: null };
  for (const k of ["a", "b", "c"]) if (k !== solve) val[k] = readNum(v, k, { label: k === "c" ? "Hypotenuse" : `Leg ${k}`, gt: 0 }, e);
  if (hasErrors(e)) return fail(e);
  let result: number;
  let working: string;
  if (solve === "c") {
    const a = val.a!, b = val.b!;
    result = Math.hypot(a, b);
    working = `c = √(a² + b²) = √(${g(a)}² + ${g(b)}²) = √${g(a * a + b * b, 12)} = ${g(result)}`;
  } else {
    const c = val.c!;
    const other = solve === "a" ? val.b! : val.a!;
    if (other >= c) return fail({ [solve === "a" ? "b" : "a"]: "A leg must be shorter than the hypotenuse." });
    result = Math.sqrt((c - other) * (c + other));
    working = `${solve} = √(c² − ${solve === "a" ? "b" : "a"}²) = √(${g(c)}² − ${g(other)}²) = √${g(c * c - other * other, 12)} = ${g(result)}`;
  }
  const sides = { a: val.a ?? result, b: val.b ?? result, c: val.c ?? result };
  const isInt = [sides.a, sides.b, sides.c].every((x) => Math.abs(x - Math.round(x)) < 1e-9);
  return {
    ok: true,
    headline: { label: solve === "c" ? "Hypotenuse c" : `Leg ${solve}`, value: g(result, 12) },
    stats: [
      { label: "Sides (a, b, c)", value: `${g(sides.a)}, ${g(sides.b)}, ${g(sides.c)}` },
      { label: "Check: a² + b²", value: g(sides.a ** 2 + sides.b ** 2, 12) },
      { label: "Check: c²", value: g(sides.c ** 2, 12) },
      { label: "Area", value: g((sides.a * sides.b) / 2) },
      { label: "Perimeter", value: g(sides.a + sides.b + sides.c) },
      ...(isInt ? [{ label: "Pythagorean triple", value: "Yes: all three sides are whole numbers" }] : []),
    ],
    steps: [working],
    notes: ["Valid only for right-angled triangles. Use the same unit for all sides."],
  };
}

export default function PythagoreanWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
