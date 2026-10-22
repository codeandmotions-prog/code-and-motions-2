"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { UNIT_CATEGORIES, convertUnits } from "@/lib/calculators/units";
import { fmt } from "@/lib/calculators/format";

const defaultsByCat: Record<string, [string, string]> = {
  length: ["km", "mi"],
  mass: ["kg", "lb"],
  temperature: ["c", "f"],
  area: ["m2", "ft2"],
  volume: ["l", "gal-us"],
  speed: ["kmh", "mph"],
  time: ["h", "min"],
};

const fields: FieldDef[] = [
  { id: "cat", kind: "select", label: "What are you converting?", default: "length", options: UNIT_CATEGORIES.map((c) => ({ value: c.id, label: c.label })), wide: true },
  { id: "value", kind: "number", label: "Value", default: "10", wide: true },
  ...UNIT_CATEGORIES.flatMap((c): FieldDef[] => [
    { id: `from_${c.id}`, kind: "select", label: "From", default: defaultsByCat[c.id][0], options: c.units.map((u) => ({ value: u.id, label: u.label })), showIf: (v) => v.cat === c.id },
    { id: `to_${c.id}`, kind: "select", label: "To", default: defaultsByCat[c.id][1], options: c.units.map((u) => ({ value: u.id, label: u.label })), showIf: (v) => v.cat === c.id },
  ]),
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cat = UNIT_CATEGORIES.find((c) => c.id === v.cat) ?? UNIT_CATEGORIES[0];
  const isTemp = cat.id === "temperature";
  const value = readNum(v, "value", { label: "Value", ...(isTemp ? {} : { min: 0 }) }, errors);
  if (hasErrors(errors) || value === null) return fail(errors);
  const from = v[`from_${cat.id}`];
  const to = v[`to_${cat.id}`];
  if (isTemp) {
    const kelvin = convertUnits("temperature", from, "k", value);
    if (kelvin < 0) return fail({ value: "That temperature is below absolute zero (−273.15 °C), which is not physically possible." });
  }
  const result = convertUnits(cat.id, from, to, value);
  const fromU = cat.units.find((u) => u.id === from)!;
  const toU = cat.units.find((u) => u.id === to)!;
  return {
    ok: true,
    headline: { label: "Result", value: `${fmt(result, 10)}`, sub: `${fmt(value, 10)} ${fromU.label} = ${fmt(result, 10)} ${toU.label}` },
    tables: [
      {
        title: `${fmt(value, 10)} ${fromU.label} in every ${cat.label.toLowerCase()} unit`,
        columns: ["Unit", "Value"],
        rows: cat.units.map((u) => [u.label, fmt(convertUnits(cat.id, from, u.id, value), 10)]),
      },
    ],
    notes: [
      cat.id === "time"
        ? "Months and years use averages (a month is 30.4375 days; a year is 365.25 days). Calendar months and years vary in length."
        : "Conversion factors are the internationally agreed definitions. Results show up to 10 significant digits.",
    ],
  };
}

export default function UnitConversionWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
