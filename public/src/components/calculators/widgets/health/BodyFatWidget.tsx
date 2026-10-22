"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { bodyFatNavy, bodyFatBmiMethod, bodyFatCategory, bmiValue } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";
import { ageField, formatWeight, heightWeightFields, lengthField, readHeightCm, readLengthCm, readWeightKg, sexField, unitSystemField } from "./body";

const fields: FieldDef[] = [
  unitSystemField(),
  { ...sexField(), default: "male" },
  ageField("30", "Adult formulas (18 and over)."),
  ...heightWeightFields({ cm: "180", kg: "80", ft: "5", inch: "11", lb: "176", st: "12", lbOfSt: "8" }),
  ...lengthField("neck", "Neck circumference", { cm: "38", inch: "15" }),
  ...lengthField("waist", "Waist circumference", { cm: "90", inch: "35.5" }),
  ...lengthField("hip", "Hip circumference (women)", { cm: "98", inch: "38.5" }, (v) => v.sex === "female"),
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const sex = v.sex === "female" ? "female" : "male";
  const age = readNum(v, "age", { label: "Age", min: 18, max: 100 }, errors);
  const cm = readHeightCm(v, errors);
  const kg = readWeightKg(v, errors);
  const neck = readLengthCm(v, "neck", "Neck circumference", errors);
  const waist = readLengthCm(v, "waist", "Waist circumference", errors);
  const hip = sex === "female" ? readLengthCm(v, "hip", "Hip circumference", errors) : null;
  if (hasErrors(errors) || age === null || cm === null || kg === null || neck === null || waist === null) return fail(errors);
  if (sex === "female" && hip === null) return fail(errors);
  const navy = bodyFatNavy(sex, cm, neck, waist, hip ?? undefined);
  if (navy === null || !(navy > 0) || navy > 70) {
    return fail({ [v.units === "metric" || !v.units ? "waistCm" : "waistIn"]: "These measurements do not give a plausible result. For men the waist must exceed the neck; for women waist plus hip must exceed the neck. Re-measure and try again." });
  }
  const bmi = bmiValue(kg, cm / 100);
  const bmiMethod = bodyFatBmiMethod(sex, bmi, age);
  const fatKg = (navy / 100) * kg;
  return {
    ok: true,
    headline: { label: "Body fat (U.S. Navy method)", value: `${fixed(navy, 1)}%`, sub: `${bodyFatCategory(sex, navy)} range` },
    stats: [
      { label: "Fat mass", value: formatWeight(v, fatKg) },
      { label: "Lean mass", value: formatWeight(v, kg - fatKg), hint: "Everything that is not fat: muscle, bone, organs and water" },
      { label: "Body fat by the BMI method", value: `${fixed(bmiMethod, 1)}%`, hint: `Uses BMI ${fixed(bmi, 1)} and age; a rougher cross-check` },
    ],
    notes: [
      "Tape-measure methods are estimates and can be off by several percentage points depending on how carefully you measure. Imaging scans and hydrostatic testing are more accurate. Very low body fat can harm health; discuss targets with a medical professional. Category ranges follow the American Council on Exercise guidance.",
    ],
  };
}

export default function BodyFatWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
