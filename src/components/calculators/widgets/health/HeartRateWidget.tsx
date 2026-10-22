"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { maxHeartRate, heartRateZones, type HrFormula } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "age", kind: "number", label: "Age", default: "36", unit: "years" },
  {
    id: "mode",
    kind: "segmented",
    label: "Maximum heart rate",
    default: "formula",
    options: [
      { value: "formula", label: "Estimate from my age" },
      { value: "measured", label: "I know my tested maximum" },
    ],
  },
  {
    id: "formula",
    kind: "select",
    label: "Estimation formula",
    default: "haskell",
    options: [
      { value: "haskell", label: "Haskell & Fox: 220 − age" },
      { value: "tanaka", label: "Tanaka: 208 − 0.7 × age" },
      { value: "nes", label: "Nes: 211 − 0.64 × age" },
    ],
    showIf: (v) => v.mode !== "measured",
  },
  { id: "mhr", kind: "number", label: "Tested maximum heart rate", default: "185", unit: "bpm", showIf: (v) => v.mode === "measured" },
  { id: "rhr", kind: "number", label: "Resting heart rate (optional)", default: "70", unit: "bpm", hint: "Measure it on waking, before getting up. With it, the Karvonen method is used; leave empty for simple percentages of maximum." },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const age = readNum(v, "age", { label: "Age", min: 5, max: 110 }, errors);
  let mhr: number | null = null;
  if (v.mode === "measured") mhr = readNum(v, "mhr", { label: "Maximum heart rate", min: 100, max: 230 }, errors);
  else if (age !== null) mhr = maxHeartRate((v.formula as HrFormula) ?? "haskell", age);
  const rhr = readNum(v, "rhr", { label: "Resting heart rate", min: 30, max: 120, optional: true }, errors);
  if (mhr !== null && rhr !== null && rhr >= mhr) errors.rhr = "Resting heart rate must be lower than the maximum.";
  if (hasErrors(errors) || mhr === null) return fail(errors);
  const zones = heartRateZones(mhr, rhr);
  return {
    ok: true,
    headline: { label: "Maximum heart rate", value: `${fixed(mhr, 0)} bpm`, sub: rhr === null ? "Zones are percentages of maximum" : `Heart rate reserve ${fixed(mhr - rhr, 0)} bpm; zones use the Karvonen method` },
    tables: [
      {
        title: "Training zones (beats per minute)",
        columns: ["Zone", "Intensity", "Effort", "Range"],
        rows: zones.map((z) => [`Zone ${z.zone}`, `${z.lo}–${z.hi}%`, z.name, `${fixed(z.loBpm, 0)}–${fixed(z.hiBpm, 0)} bpm`]),
      },
    ],
    notes: [
      "Age-based formulas describe population averages; an individual's true maximum can differ by 10 beats or more, and medications such as beta blockers lower heart rate. A supervised exercise test gives the best measurement. Speak to a doctor before starting vigorous exercise if you have a heart or health condition. This is general information, not medical advice.",
    ],
  };
}

export default function HeartRateWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
