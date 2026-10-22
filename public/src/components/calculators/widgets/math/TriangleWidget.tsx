"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import TriangleFigure from "../../TriangleFigure";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { solveTriangle, type TriangleSolution } from "@/lib/calculators/geometry";
import { g } from "./geoShared";

const sideHint = "Fill in exactly three boxes; at least one must be a side.";
const fields: FieldDef[] = [
  { id: "a", kind: "number", label: "Side a", default: "3", hint: sideHint },
  { id: "b", kind: "number", label: "Side b", default: "4" },
  { id: "c", kind: "number", label: "Side c", default: "5" },
  { id: "A", kind: "number", label: "Angle A (opposite side a)", default: "", unit: "°" },
  { id: "B", kind: "number", label: "Angle B (opposite side b)", default: "", unit: "°" },
  { id: "C", kind: "number", label: "Angle C (opposite side c)", default: "", unit: "°" },
];

function rowsFor(s: TriangleSolution): string[][] {
  return [
    ["Side a / b / c", `${g(s.a)} / ${g(s.b)} / ${g(s.c)}`],
    ["Angle A / B / C", `${g(s.A, 8)}° / ${g(s.B, 8)}° / ${g(s.C, 8)}°`],
    ["Heights from a / b / c", `${g(s.ha)} / ${g(s.hb)} / ${g(s.hc)}`],
    ["Medians to a / b / c", `${g(s.ma)} / ${g(s.mb)} / ${g(s.mc)}`],
    ["Inradius / circumradius", `${g(s.inradius)} / ${g(s.circumradius)}`],
  ];
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const read = (id: string, label: string) => readNum(v, id, { label, optional: true }, e);
  const t = { a: read("a", "Side a"), b: read("b", "Side b"), c: read("c", "Side c"), A: read("A", "Angle A"), B: read("B", "Angle B"), C: read("C", "Angle C") };
  if (hasErrors(e)) return fail(e);
  const count = Object.values(t).filter((x) => x !== null).length;
  if (count !== 3) {
    const first = (["a", "b", "c", "A", "B", "C"] as const).find((k) => t[k] === null) ?? "a";
    return fail({ [first]: `You entered ${count} value${count === 1 ? "" : "s"}. Enter exactly three (at least one side) and leave the rest blank.` });
  }
  const r = solveTriangle(t);
  if (r.error || r.solutions.length === 0) return fail({ a: r.error ?? "No triangle fits these values." });
  const first = r.solutions[0];
  const two = r.solutions.length === 2;
  return {
    ok: true,
    figure: <TriangleFigure a={first.a} b={first.b} c={first.c} A={first.A} B={first.B} C={first.C} right={first.type.endsWith("right")} />,
    headline: { label: two ? "Area (first of two solutions)" : "Area", value: g(first.area), sub: `${first.type} triangle · perimeter ${g(first.perimeter)}` },
    stats: [
      { label: "Perimeter", value: g(first.perimeter) },
      { label: "Semi-perimeter", value: g(first.perimeter / 2) },
      { label: "Type", value: first.type },
      { label: "Method", value: first.method },
    ],
    tables: r.solutions.map((s, i) => ({ title: two ? `Solution ${i + 1}` : "All measurements", columns: ["Measurement", "Value"], rows: rowsFor(s) })),
    warnings: two ? ["Two different triangles fit these measurements (the ambiguous side-side-angle case). Both are shown."] : undefined,
    notes: ["Lengths are in whatever unit you entered; area is in that unit squared. Angles are in degrees."],
  };
}

export default function TriangleWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
