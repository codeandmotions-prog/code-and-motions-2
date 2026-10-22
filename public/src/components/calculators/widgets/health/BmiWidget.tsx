"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { bmiFull } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";
import { ageField, formatWeight, heightWeightFields, readHeightCm, readWeightKg, unitSystemField } from "./body";

const fields: FieldDef[] = [
  unitSystemField(),
  ageField("30", "Adult categories apply from age 18."),
  ...heightWeightFields({ cm: "175", kg: "70", ft: "5", inch: "9", lb: "154", st: "11", lbOfSt: "0" }),
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const age = readNum(v, "age", { label: "Age", min: 2, max: 120 }, errors);
  const cm = readHeightCm(v, errors);
  const kg = readWeightKg(v, errors);
  if (hasErrors(errors) || age === null || cm === null || kg === null) return fail(errors);
  if (age < 18) {
    return fail({ age: "BMI for under-18s must be compared with age- and sex-specific growth charts (percentiles). This calculator only reports adult categories." });
  }
  const r = bmiFull(kg, cm);
  const warnings: string[] = [];
  if (age >= 65) warnings.push("Standard BMI ranges may be less suitable for older adults, who often carry more body fat at the same BMI and lose height with age.");
  return {
    ok: true,
    headline: { label: "Your BMI", value: `${fixed(r.bmi, 1)} kg/m²`, sub: r.category },
    stats: [
      { label: "Healthy weight range for your height", value: `${formatWeight(v, r.healthyMinKg)} to ${formatWeight(v, r.healthyMaxKg)}`, hint: "BMI 18.5 to 25" },
      { label: "BMI Prime", value: fixed(r.prime, 2), hint: "BMI divided by 25; 1.0 is the top of the normal range" },
      { label: "Ponderal Index", value: `${fixed(r.ponderal, 1)} kg/m³`, hint: "Weight divided by height cubed" },
    ],
    warnings,
    notes: [
      "BMI is a screening number based on height and weight only. It cannot tell fat from muscle or show where fat is carried, and ranges can mislead for athletes, older people and some ethnic groups. It is not a diagnosis; talk to a doctor or dietitian about your health.",
    ],
  };
}

export default function BmiWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
