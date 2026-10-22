"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { bmr, ACTIVITY_LEVELS, KJ_PER_KCAL, KCAL_PER_KG_BODY_WEIGHT, type BmrFormula } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";
import { ageField, heightWeightFields, readHeightCm, readWeightKg, sexField, unitSystemField } from "./body";
import { bodyFatField, formulaField } from "./bmrFields";

const GOALS: { id: string; label: string; kgPerWeek: number }[] = [
  { id: "lose1", label: "Lose 1 kg (2.2 lb) a week", kgPerWeek: -1 },
  { id: "lose075", label: "Lose 0.75 kg (1.65 lb) a week", kgPerWeek: -0.75 },
  { id: "lose05", label: "Lose 0.5 kg (1.1 lb) a week", kgPerWeek: -0.5 },
  { id: "lose025", label: "Lose 0.25 kg (0.55 lb) a week", kgPerWeek: -0.25 },
  { id: "maintain", label: "Maintain my weight", kgPerWeek: 0 },
  { id: "gain025", label: "Gain 0.25 kg (0.55 lb) a week", kgPerWeek: 0.25 },
  { id: "gain05", label: "Gain 0.5 kg (1.1 lb) a week", kgPerWeek: 0.5 },
];

const fields: FieldDef[] = [
  unitSystemField(),
  sexField(),
  ageField("30", "Designed for adults (15 and over)."),
  ...heightWeightFields({ cm: "175", kg: "70", ft: "5", inch: "9", lb: "154", st: "11", lbOfSt: "0" }),
  { id: "activity", kind: "select", label: "Activity level", default: "light", options: ACTIVITY_LEVELS.map((a) => ({ value: a.id, label: a.label })), wide: true },
  formulaField(),
  bodyFatField(),
  { id: "goal", kind: "select", label: "Goal", default: "maintain", options: GOALS.map((g) => ({ value: g.id, label: g.label })), wide: true },
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
  const level = ACTIVITY_LEVELS.find((a) => a.id === v.activity) ?? ACTIVITY_LEVELS[1];
  const goal = GOALS.find((g) => g.id === v.goal) ?? GOALS[4];
  const b = bmr(formula, sex, age, cm, kg, bf ?? undefined);
  if (!(b > 0)) return fail({ age: "These values give an unrealistic result. Check your entries." });
  const maintenance = b * level.factor;
  const dailyChange = (goal.kgPerWeek * KCAL_PER_KG_BODY_WEIGHT) / 7;
  const target = maintenance + dailyChange;
  const inKj = v.energy === "kj";
  const show = (x: number) => (inKj ? `${fixed(x * KJ_PER_KCAL, 0)} kJ` : `${fixed(x, 0)} kcal`);
  const floor = sex === "male" ? 1500 : 1200;
  const warnings: string[] = [];
  if (target < floor) {
    warnings.push(`This target is below ${floor} kcal a day, a level often cited as a minimum for ${sex === "male" ? "men" : "women"} unless a doctor or dietitian is supervising. Consider a gentler goal.`);
  }
  if (goal.kgPerWeek <= -0.75) warnings.push("Losing more than about 0.5 to 1 kg a week is hard to sustain and can mean losing muscle. Speak to a health professional before aiming this high.");
  return {
    ok: true,
    headline: { label: goal.kgPerWeek === 0 ? "Daily calories to maintain weight" : "Daily calorie target for your goal", value: `${show(target)} / day`, sub: goal.kgPerWeek === 0 ? undefined : `${show(Math.abs(dailyChange))} ${dailyChange < 0 ? "below" : "above"} maintenance` },
    stats: [
      { label: "Basal metabolic rate (BMR)", value: `${show(b)} / day` },
      { label: "Maintenance (BMR × activity)", value: `${show(maintenance)} / day`, hint: `Activity multiplier ${level.factor}` },
      { label: "Expected weekly change", value: `${goal.kgPerWeek > 0 ? "+" : goal.kgPerWeek < 0 ? "−" : ""}${fixed(Math.abs(goal.kgPerWeek), 2)} kg`, hint: "Assumes about 7,700 kcal per kg of body weight (≈3,500 kcal per lb)" },
    ],
    warnings,
    notes: [
      "Estimates only. Real weight change varies with water, muscle, metabolism and how accurately food is tracked, and the 7,700 kcal per kg rule is a rough average. Not medical advice; check with a doctor or dietitian before major diet changes, especially if you are pregnant, under 18, or have a medical condition.",
    ],
  };
}

export default function CalorieWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
