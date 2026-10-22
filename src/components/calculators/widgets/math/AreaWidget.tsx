"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { heron, sectorArea, regularPolygonArea, ellipsePerimeter } from "@/lib/calculators/geometry";
import { g, lengthUnitField, unitOf } from "./geoShared";

type Shape = "rect" | "square" | "tri" | "heron" | "circle" | "ellipse" | "sector" | "para" | "trap" | "rhombus" | "poly";

const SHAPES: { value: Shape; label: string; fields: [string, string][] }[] = [
  { value: "rect", label: "Rectangle", fields: [["l", "Length"], ["w", "Width"]] },
  { value: "square", label: "Square", fields: [["s", "Side"]] },
  { value: "tri", label: "Triangle (base and height)", fields: [["b", "Base"], ["h", "Height"]] },
  { value: "heron", label: "Triangle (three sides)", fields: [["a", "Side a"], ["b2", "Side b"], ["c", "Side c"]] },
  { value: "circle", label: "Circle", fields: [["r", "Radius"]] },
  { value: "ellipse", label: "Ellipse", fields: [["ea", "Semi-axis a"], ["eb", "Semi-axis b"]] },
  { value: "sector", label: "Circular sector", fields: [["r", "Radius"], ["ang", "Angle (degrees)"]] },
  { value: "para", label: "Parallelogram", fields: [["b", "Base"], ["h", "Height"]] },
  { value: "trap", label: "Trapezoid (trapezium)", fields: [["p1", "Parallel side 1"], ["p2", "Parallel side 2"], ["h", "Height"]] },
  { value: "rhombus", label: "Rhombus", fields: [["d1", "Diagonal 1"], ["d2", "Diagonal 2"]] },
  { value: "poly", label: "Regular polygon", fields: [["n", "Number of sides (3–100)"], ["s", "Side length"]] },
];

const DEF: Record<string, string> = { l: "8", w: "5", s: "6", b: "10", h: "6", a: "7", b2: "8", c: "9", r: "5", ea: "6", eb: "4", ang: "60", p1: "10", p2: "6", d1: "8", d2: "6", n: "6" };

const fields: FieldDef[] = [
  { id: "shape", kind: "select", label: "Shape", default: "rect", options: SHAPES.map((s) => ({ value: s.value, label: s.label })) },
  lengthUnitField("unit", "m"),
  ...SHAPES.flatMap((s) =>
    s.fields.map(
      ([id, label]): FieldDef => ({
        id: `${s.value}_${id}`,
        kind: "number",
        label,
        default: DEF[id] ?? "1",
        showIf: (v) => v.shape === s.value,
      }),
    ),
  ),
];

function compute(v: Values): CalcOutcome {
  const shape = SHAPES.find((s) => s.value === v.shape) ?? SHAPES[0];
  const e: Record<string, string> = {};
  const val: Record<string, number> = {};
  for (const [id, label] of shape.fields) {
    const n = readNum(v, `${shape.value}_${id}`, id === "ang" ? { label, gt: 0, max: 360 } : id === "n" ? { label, integer: true, min: 3, max: 100 } : { label, gt: 0, max: 1e12 }, e);
    if (n !== null) val[id] = n;
  }
  if (hasErrors(e)) return fail(e);
  const u = unitOf(v.unit);
  let area: number;
  let formula: string;
  let extra: { label: string; value: string }[] = [];
  switch (shape.value) {
    case "rect": area = val.l * val.w; formula = "A = length × width"; extra = [{ label: "Perimeter", value: `${g(2 * (val.l + val.w))} ${u.abbr}` }, { label: "Diagonal", value: `${g(Math.hypot(val.l, val.w))} ${u.abbr}` }]; break;
    case "square": area = val.s * val.s; formula = "A = side²"; extra = [{ label: "Perimeter", value: `${g(4 * val.s)} ${u.abbr}` }, { label: "Diagonal", value: `${g(val.s * Math.SQRT2)} ${u.abbr}` }]; break;
    case "tri": area = (val.b * val.h) / 2; formula = "A = ½ × base × height"; break;
    case "heron": {
      const a = heron(val.a, val.b2, val.c);
      if (a === null) return fail({ c: "These three sides cannot form a triangle: each side must be shorter than the sum of the other two." });
      area = a; formula = "Heron’s formula: A = √(s(s − a)(s − b)(s − c)), s = (a + b + c) ÷ 2"; extra = [{ label: "Perimeter", value: `${g(val.a + val.b2 + val.c)} ${u.abbr}` }]; break;
    }
    case "circle": area = Math.PI * val.r * val.r; formula = "A = π × r²"; extra = [{ label: "Circumference", value: `${g(2 * Math.PI * val.r)} ${u.abbr}` }]; break;
    case "ellipse": area = Math.PI * val.ea * val.eb; formula = "A = π × a × b"; extra = [{ label: "Perimeter (Ramanujan approximation)", value: `${g(ellipsePerimeter(val.ea, val.eb))} ${u.abbr}` }]; break;
    case "sector": area = sectorArea(val.r, val.ang); formula = "A = (angle ÷ 360°) × π × r²"; extra = [{ label: "Arc length", value: `${g((val.ang / 360) * 2 * Math.PI * val.r)} ${u.abbr}` }]; break;
    case "para": area = val.b * val.h; formula = "A = base × height"; break;
    case "trap": area = ((val.p1 + val.p2) / 2) * val.h; formula = "A = ½ × (sum of parallel sides) × height"; break;
    case "rhombus": area = (val.d1 * val.d2) / 2; formula = "A = ½ × d₁ × d₂"; extra = [{ label: "Side length", value: `${g(Math.hypot(val.d1 / 2, val.d2 / 2))} ${u.abbr}` }]; break;
    default: area = regularPolygonArea(val.n, val.s); formula = "A = n × s² ÷ (4 × tan(π ÷ n))"; extra = [{ label: "Perimeter", value: `${g(val.n * val.s)} ${u.abbr}` }];
  }
  const m2 = area * u.m * u.m;
  const conv = (label: string, factor: number, unit: string) => ({ label, value: `${g(m2 / factor)} ${unit}` });
  return {
    ok: true,
    headline: { label: `Area of the ${shape.label.toLowerCase()}`, value: `${g(area)} ${u.abbr}²` },
    stats: [
      ...extra,
      conv("In square metres", 1, "m²"),
      conv("In square feet", 0.3048 ** 2, "ft²"),
      conv("In hectares", 10000, "ha"),
      conv("In acres", 4046.8564224, "ac"),
    ],
    steps: [formula],
    notes: ["Area is expressed in the unit you chose, squared. Foot, inch, yard and mile conversions use the exact international definitions."],
  };
}

export default function AreaWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
