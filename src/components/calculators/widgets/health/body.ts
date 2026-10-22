import type { FieldDef } from "../../CalculatorForm";
import { readNum, type Values } from "@/lib/calculators/validate";
import { CM_PER_IN, KG_PER_LB, KG_PER_STONE } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";
import { unitSystemField } from "../shared";

export { unitSystemField };

const isMetric = (v: Values) => v.units === "metric" || !v.units;
const isUk = (v: Values) => v.units === "uk";

export const sexField = (): FieldDef => ({
  id: "sex",
  kind: "segmented",
  label: "Sex used in the formula",
  default: "female",
  options: [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ],
  hint: "These equations were fitted separately for males and females, so one of the two must be chosen.",
});

export const ageField = (def = "30", hint?: string): FieldDef => ({
  id: "age",
  kind: "number",
  label: "Age",
  default: def,
  unit: "years",
  hint,
});

/** Height + weight fields that follow the chosen unit system. */
export function heightWeightFields(defaults: { cm: string; kg: string; ft: string; inch: string; lb: string; st: string; lbOfSt: string }): FieldDef[] {
  return [
    { id: "cm", kind: "number", label: "Height", default: defaults.cm, unit: "cm", showIf: isMetric },
    { id: "ft", kind: "number", label: "Height: feet", default: defaults.ft, unit: "ft", showIf: (v) => !isMetric(v) },
    { id: "inch", kind: "number", label: "Height: inches", default: defaults.inch, unit: "in", showIf: (v) => !isMetric(v) },
    { id: "kg", kind: "number", label: "Weight", default: defaults.kg, unit: "kg", showIf: isMetric },
    { id: "lb", kind: "number", label: "Weight: pounds", default: defaults.lb, unit: "lb", showIf: (v) => v.units === "us" },
    { id: "st", kind: "number", label: "Weight: stone", default: defaults.st, unit: "st", showIf: isUk },
    { id: "lbOfSt", kind: "number", label: "Weight: extra pounds", default: defaults.lbOfSt, unit: "lb", showIf: isUk },
  ];
}

export function readHeightCm(v: Values, errors: Record<string, string>): number | null {
  if (isMetric(v)) return readNum(v, "cm", { label: "Height", min: 90, max: 250 }, errors);
  const ft = readNum(v, "ft", { label: "Height (feet)", min: 0, max: 8, integer: true }, errors);
  const inch = readNum(v, "inch", { label: "Height (inches)", min: 0, max: 11.99 }, errors);
  if (ft === null || inch === null) return null;
  const cm = (ft * 12 + inch) * CM_PER_IN;
  if (cm < 90 || cm > 250) {
    errors.ft = "Enter a height between about 3 ft and 8 ft 2 in.";
    return null;
  }
  return cm;
}

export function readWeightKg(v: Values, errors: Record<string, string>): number | null {
  let kg: number | null;
  if (isMetric(v)) kg = readNum(v, "kg", { label: "Weight", gt: 0 }, errors);
  else if (v.units === "us") {
    const lb = readNum(v, "lb", { label: "Weight", gt: 0 }, errors);
    kg = lb === null ? null : lb * KG_PER_LB;
  } else {
    const st = readNum(v, "st", { label: "Weight (stone)", min: 0, integer: true }, errors);
    const lb = readNum(v, "lbOfSt", { label: "Weight (pounds)", min: 0, max: 13.99, optional: true }, errors) ?? 0;
    kg = st === null ? null : st * KG_PER_STONE + lb * KG_PER_LB;
    if (kg !== null && kg <= 0) {
      errors.st = "Enter a weight above zero.";
      kg = null;
    }
  }
  if (kg !== null && (kg < 20 || kg > 400)) {
    const key = isMetric(v) ? "kg" : v.units === "us" ? "lb" : "st";
    errors[key] = "Enter a weight between 20 kg (44 lb) and 400 kg (882 lb).";
    return null;
  }
  return kg;
}

/** Circumference measurements (neck, waist, hip): cm or inches. */
export function lengthField(id: string, label: string, def: { cm: string; inch: string }, showIf?: (v: Values) => boolean): FieldDef[] {
  return [
    { id: `${id}Cm`, kind: "number", label, default: def.cm, unit: "cm", showIf: (v) => isMetric(v) && (!showIf || showIf(v)) },
    { id: `${id}In`, kind: "number", label, default: def.inch, unit: "in", showIf: (v) => !isMetric(v) && (!showIf || showIf(v)) },
  ];
}

export function readLengthCm(v: Values, id: string, label: string, errors: Record<string, string>): number | null {
  if (isMetric(v)) return readNum(v, `${id}Cm`, { label, gt: 5, max: 250 }, errors);
  const inch = readNum(v, `${id}In`, { label, gt: 2, max: 100 }, errors);
  return inch === null ? null : inch * CM_PER_IN;
}

export function formatWeight(v: Values, kg: number): string {
  if (isMetric(v)) return `${fixed(kg, 1)} kg`;
  if (v.units === "us") return `${fixed(kg / KG_PER_LB, 1)} lb`;
  const totalLb = kg / KG_PER_LB;
  const st = Math.floor(totalLb / 14);
  return `${st} st ${fixed(totalLb - st * 14, 1)} lb`;
}

export function formatHeight(v: Values, cm: number): string {
  if (isMetric(v)) return `${fixed(cm, 1)} cm`;
  const totalIn = cm / CM_PER_IN;
  const ft = Math.floor(totalIn / 12);
  return `${ft} ft ${fixed(totalIn - ft * 12, 1)} in`;
}
