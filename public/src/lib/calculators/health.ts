/** Fitness & health calculation engines (informational only). */

export const LB_PER_KG = 2.2046226218487757;
export const KG_PER_LB = 0.45359237;
export const KG_PER_STONE = 6.35029318;
export const CM_PER_IN = 2.54;

export type UnitSystem = "metric" | "us" | "uk";

export type BmiCategory = { label: string; range: string };

export function bmiValue(weightKg: number, heightM: number): number {
  return weightKg / (heightM * heightM);
}

export function bmiCategory(bmi: number): string {
  if (bmi < 16) return "Severe thinness";
  if (bmi < 17) return "Moderate thinness";
  if (bmi < 18.5) return "Mild thinness";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese (Class I)";
  if (bmi < 40) return "Obese (Class II)";
  return "Obese (Class III)";
}

export function bmiFull(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  const bmi = bmiValue(weightKg, h);
  return {
    bmi,
    category: bmiCategory(bmi),
    prime: bmi / 25,
    ponderal: weightKg / (h * h * h),
    healthyMinKg: 18.5 * h * h,
    healthyMaxKg: 25 * h * h,
  };
}

export type BmrFormula = "mifflin" | "harris" | "katch";

export function bmr(
  formula: BmrFormula,
  sex: "male" | "female",
  ageYears: number,
  heightCm: number,
  weightKg: number,
  bodyFatPct?: number,
): number {
  if (formula === "mifflin") {
    return 10 * weightKg + 6.25 * heightCm - 5 * ageYears + (sex === "male" ? 5 : -161);
  }
  if (formula === "harris") {
    return sex === "male"
      ? 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears + 88.362
      : 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears + 447.593;
  }
  const lean = weightKg * (1 - (bodyFatPct ?? 0) / 100);
  return 370 + 21.6 * lean;
}

export const ACTIVITY_LEVELS: { id: string; label: string; factor: number }[] = [
  { id: "sedentary", label: "Sedentary: little or no exercise", factor: 1.2 },
  { id: "light", label: "Light: exercise 1–3 days a week", factor: 1.375 },
  { id: "moderate", label: "Moderate: exercise 3–5 days a week", factor: 1.465 },
  { id: "active", label: "Active: exercise 6–7 days a week", factor: 1.55 },
  { id: "very", label: "Very active: hard exercise most days", factor: 1.725 },
  { id: "extra", label: "Extra active: very hard exercise and a physical job", factor: 1.9 },
];

export const KCAL_PER_KG_BODY_WEIGHT = 7700;
export const KJ_PER_KCAL = 4.184;

export function bodyFatNavy(
  sex: "male" | "female",
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm?: number,
): number | null {
  if (sex === "male") {
    const d = waistCm - neckCm;
    if (d <= 0) return null;
    return 495 / (1.0324 - 0.19077 * Math.log10(d) + 0.15456 * Math.log10(heightCm)) - 450;
  }
  const d = waistCm + (hipCm ?? 0) - neckCm;
  if (d <= 0) return null;
  return 495 / (1.29579 - 0.35004 * Math.log10(d) + 0.221 * Math.log10(heightCm)) - 450;
}

export function bodyFatBmiMethod(sex: "male" | "female", bmi: number, age: number): number {
  return 1.2 * bmi + 0.23 * age - (sex === "male" ? 16.2 : 5.4);
}

export function bodyFatCategory(sex: "male" | "female", bf: number): string {
  const t =
    sex === "male"
      ? [
          [6, "Essential fat"],
          [14, "Athletes"],
          [18, "Fitness"],
          [25, "Average"],
        ]
      : [
          [14, "Essential fat"],
          [21, "Athletes"],
          [25, "Fitness"],
          [32, "Average"],
        ];
  for (const [limit, label] of t as [number, string][]) {
    if (bf < limit) return label;
  }
  return "Above average (obese range)";
}

export type HrFormula = "haskell" | "tanaka" | "nes";

export function maxHeartRate(formula: HrFormula, age: number): number {
  if (formula === "haskell") return 220 - age;
  if (formula === "tanaka") return 208 - 0.7 * age;
  return 211 - 0.64 * age;
}

export const HR_ZONES: { zone: number; name: string; lo: number; hi: number }[] = [
  { zone: 1, name: "Very light (warm-up, recovery)", lo: 50, hi: 60 },
  { zone: 2, name: "Light (easy endurance)", lo: 60, hi: 70 },
  { zone: 3, name: "Moderate (aerobic)", lo: 70, hi: 80 },
  { zone: 4, name: "Hard (threshold)", lo: 80, hi: 90 },
  { zone: 5, name: "Maximum effort", lo: 90, hi: 100 },
];

export function heartRateZones(maxHr: number, restingHr: number | null) {
  return HR_ZONES.map((z) => {
    if (restingHr === null) {
      return { ...z, loBpm: (z.lo / 100) * maxHr, hiBpm: (z.hi / 100) * maxHr };
    }
    const reserve = maxHr - restingHr;
    return {
      ...z,
      loBpm: restingHr + (z.lo / 100) * reserve,
      hiBpm: restingHr + (z.hi / 100) * reserve,
    };
  });
}
