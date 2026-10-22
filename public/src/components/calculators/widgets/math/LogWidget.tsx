"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { fmt } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "Solve for",
    default: "y",
    wide: true,
    options: [
      { value: "y", label: "The logarithm: log_b(x) = ?" },
      { value: "x", label: "The number: log_b(?) = y" },
      { value: "b", label: "The base: log_?(x) = y" },
    ],
  },
  {
    id: "preset",
    kind: "select",
    label: "Base (b)",
    default: "10",
    options: [
      { value: "10", label: "10 (common logarithm)" },
      { value: "e", label: "e ≈ 2.71828 (natural logarithm)" },
      { value: "2", label: "2 (binary logarithm)" },
      { value: "custom", label: "Another base" },
    ],
    showIf: (v) => v.mode !== "b",
  },
  { id: "base", kind: "number", label: "Custom base", default: "5", showIf: (v) => v.mode !== "b" && v.preset === "custom" },
  { id: "x", kind: "number", label: "Number (x)", default: "1000", showIf: (v) => v.mode !== "x" },
  { id: "y", kind: "number", label: "Logarithm (y)", default: "3", showIf: (v) => v.mode !== "y" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  let base: number | null = null;
  if (v.mode !== "b") {
    if (v.preset === "custom") base = readNum(v, "base", { label: "Base", gt: 0 }, e);
    else base = v.preset === "e" ? Math.E : Number(v.preset);
    if (base !== null && base === 1) e.base = "The base cannot be 1.";
  }
  const x = v.mode !== "x" ? readNum(v, "x", { label: "Number", gt: 0 }, e) : null;
  const y = v.mode !== "y" ? readNum(v, "y", { label: "Logarithm" }, e) : null;
  if (v.mode === "b" && y === 0) e.y = "A logarithm of 0 has no unique base (any base gives log(1) = 0).";
  if (hasErrors(e)) return fail(e);
  const bl = base === Math.E ? "e" : base !== null ? fmt(base) : "b";
  if (v.mode === "y") {
    const r = Math.log(x as number) / Math.log(base as number);
    return {
      ok: true,
      headline: { label: `log_${bl}(${fmt(x as number)})`, value: fmt(r, 12) },
      stats: [
        { label: "ln(x), base e", value: fmt(Math.log(x as number), 12) },
        { label: "log₁₀(x)", value: fmt(Math.log10(x as number), 12) },
        { label: "log₂(x)", value: fmt(Math.log2(x as number), 12) },
      ],
      steps: [`Change of base: log_${bl}(x) = ln(x) ÷ ln(${bl}) = ${fmt(Math.log(x as number), 10)} ÷ ${fmt(Math.log(base as number), 10)} = ${fmt(r, 12)}`],
    };
  }
  if (v.mode === "x") {
    const r = Math.pow(base as number, y as number);
    if (!Number.isFinite(r)) return fail({ y: "The result is too large to represent." });
    return { ok: true, headline: { label: `x where log_${bl}(x) = ${fmt(y as number)}`, value: fmt(r, 12) }, steps: [`x = b^y = ${bl}^${fmt(y as number)} = ${fmt(r, 12)}`] };
  }
  const bb = Math.pow(x as number, 1 / (y as number));
  if (!(bb > 0) || bb === 1 || !Number.isFinite(bb)) return fail({ y: "No valid base exists for these values (a base must be positive and not 1)." });
  return { ok: true, headline: { label: `Base where log_?(${fmt(x as number)}) = ${fmt(y as number)}`, value: fmt(bb, 12) }, steps: [`b = x^(1 ÷ y) = ${fmt(x as number)}^(1 ÷ ${fmt(y as number)}) = ${fmt(bb, 12)}`] };
}

export default function LogWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
