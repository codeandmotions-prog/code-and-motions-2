"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { type Values } from "@/lib/calculators/validate";
import { parseBigIntList } from "@/lib/calculators/parse";
import { absB } from "@/lib/calculators/rational";
import { euclidSteps, factorize, FACTOR_LIMIT, gcdMany, lcmMany, primeFactorText } from "@/lib/calculators/numtheory";
import { groupDigits } from "@/lib/calculators/format";

type Kind = "gcf" | "lcm";

function build(kind: Kind): { fields: FieldDef[]; compute: (v: Values) => CalcOutcome } {
  const fields: FieldDef[] = [
    {
      id: "list",
      kind: "textarea",
      label: "Whole numbers (two or more)",
      default: kind === "gcf" ? "16, 88, 104" : "21, 14, 38",
      rows: 2,
      hint: "Separate with commas, spaces or new lines. Negative numbers are treated by their size.",
    },
  ];
  const compute = (v: Values): CalcOutcome => {
    const { values, invalid } = parseBigIntList(v.list ?? "");
    if (invalid.length) return fail({ list: `“${invalid[0]}” is not a whole number.` });
    if (values.length < 2) return fail({ list: "Enter at least two whole numbers." });
    if (values.length > 100) return fail({ list: "Please enter at most 100 numbers." });
    if (values.some((x) => absB(x).toString().length > 150)) return fail({ list: "Numbers are limited to 150 digits." });
    const nums = values.map(absB);
    if (nums.every((x) => x === 0n)) return fail({ list: "At least one number must be non-zero." });
    const g = gcdMany(nums);
    const l = nums.some((x) => x === 0n) ? 0n : lcmMany(nums);
    const small = nums.every((x) => x > 0n && x <= BigInt(FACTOR_LIMIT));
    const factorRows = small ? nums.map((x) => `${x} = ${primeFactorText(factorize(Number(x)))}`) : [];
    const steps: string[] = [];
    if (kind === "gcf") {
      steps.push(...euclidSteps(nums[0], nums[1]).map((s) => `Euclid (first two numbers): ${s}`));
      if (nums.length > 2) steps.push(`Repeat with the result and each remaining number to reach ${g}.`);
    } else {
      steps.push("LCM(a, b) = a × b ÷ GCF(a, b); repeat for each further number.");
    }
    steps.push(...factorRows.map((r) => `Prime factors: ${r}`));
    return {
      ok: true,
      headline:
        kind === "gcf"
          ? { label: `Greatest common factor of ${nums.length} numbers`, value: groupDigits(g.toString()) }
          : { label: `Least common multiple of ${nums.length} numbers`, value: groupDigits(l.toString()) },
      stats: [
        kind === "gcf" ? { label: "Least common multiple", value: groupDigits(l.toString()) } : { label: "Greatest common factor", value: groupDigits(g.toString()) },
        ...(g === 1n ? [{ label: "Relationship", value: "The numbers are relatively prime (coprime)" }] : []),
      ],
      steps,
      notes: nums.some((x) => x === 0n) ? ["Zero is a multiple of every number, so the least common multiple involving zero is reported as 0."] : undefined,
    };
  };
  return { fields, compute };
}

export default function GcfLcmCalc({ kind }: { kind: Kind }) {
  const { fields, compute } = build(kind);
  return <CalculatorForm fields={fields} compute={compute} />;
}
