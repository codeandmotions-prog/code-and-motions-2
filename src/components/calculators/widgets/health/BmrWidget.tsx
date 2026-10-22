"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { bmr, ACTIVITY_LEVELS, KJ_PER_KCAL, type BmrFormula } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";
import { ageField, heightWeightFields, readHeightCm, readWeightKg, sexField, unitSystemField } from "./body";
import { bodyFatField, formulaField } from "./bmrFields";

const fields: FieldDef[] = [
  unitSystemField(),
  sexField(),
  ageField("30", "The equations were developed for adults (15 and over)."),
  ...heightWeightFields({ cm: "175", kg: "70", ft: "5", inch: "9", lb: "154", st: "11", lbOfSt: "0" }),
  formulaField(),
  bodyFatField(),
  {
    id: "energy",
    kind: "segmented",
    label: "Show energy in",
    default: "kcal",
    options: [
      { value: "kcal", label: "Calories (kcal)" },
      { value: "kj", label: "Kilojoules (kJ)" },
    ],
  },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const age = readNum(v, "age", { label: "Age", min: 15, max: 100 }, errors);
  const cm = readHeightCm(v, errors);
  const kg = readWeightKg(v, errors);
  const formula = (v.formula as BmrFormula) ?? "mifflin";
  const bf = formula === "katch" ? readNum(v, "bf", { label: "Body fat percentage", min: 2, max: 70 }, errors) : null;
  if (hasErrors(errors) || age === null || cm === null || kg === null) return fail(errors);
  const sex = v.sex === "male" ? "male" : "female";
  const kcal = bmr(formula, sex, age, cm, kg, bf ?? undefined);
  if (!(kcal > 0)) return fail({ age: "These values give an unrealistic result. Check your entries." });
  const inKj = v.energy === "kj";
  const show = (x: number) => (inKj ? `${fixed(x * KJ_PER_KCAL, 0)} kJ` : `${fixed(x, 0)} kcal`);
  return {
    ok: true,
    headline: { label: "Basal metabolic rate (BMR)", value: `${show(kcal)} / day`, sub: "Energy your body uses at complete rest" },
    tables: [
      {
        title: "Estimated daily energy to maintain weight",
        columns: ["Activity level", "Multiplier", "Per day"],
        rows: ACTIVITY_LEVELS.map((a) => [a.label, a.factor.toFixed(3), show(kcal * a.factor)]),
        caption: "Maintenance estimate = BMR × activity multiplier. Multipliers are common conventions, not measurements.",
      },
    ],
    notes: [
      "BMR equations are statistical estimates fitted to groups of people. Individual results can differ noticeably, and muscle mass, genetics, medical conditions and medicines all play a part. This is general information, not medical advice.",
    ],
  };
}

export default function BmrWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
