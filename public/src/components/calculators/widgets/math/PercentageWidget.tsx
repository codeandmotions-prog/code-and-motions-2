"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { percentOf, whatPercent, wholeFromPercent, percentChange, percentDifference } from "@/lib/calculators/mathmisc";
import { fmt } from "@/lib/calculators/format";

const m = (id: string) => (v: Values) => v.mode === id;

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to find?",
    default: "of",
    wide: true,
    options: [
      { value: "of", label: "X% of Y (what is 15% of 80?)" },
      { value: "what", label: "X is what percent of Y? (12 is what % of 60?)" },
      { value: "whole", label: "X is Y% of what number? (30 is 20% of what?)" },
      { value: "change", label: "Percentage increase or decrease from A to B" },
      { value: "apply", label: "Increase or decrease a number by a percentage" },
      { value: "diff", label: "Percentage difference between two values" },
    ],
  },
  { id: "p1", kind: "number", label: "Percentage (X)", default: "15", unit: "%", showIf: m("of") },
  { id: "v1", kind: "number", label: "Number (Y)", default: "80", showIf: m("of") },
  { id: "x2", kind: "number", label: "Part (X)", default: "12", showIf: m("what") },
  { id: "y2", kind: "number", label: "Whole (Y)", default: "60", showIf: m("what") },
  { id: "x3", kind: "number", label: "Part (X)", default: "30", showIf: m("whole") },
  { id: "p3", kind: "number", label: "Percentage (Y)", default: "20", unit: "%", showIf: m("whole") },
  { id: "a4", kind: "number", label: "From (old value A)", default: "250", showIf: m("change") },
  { id: "b4", kind: "number", label: "To (new value B)", default: "300", showIf: m("change") },
  { id: "v5", kind: "number", label: "Starting number", default: "500", showIf: m("apply") },
  { id: "p5", kind: "number", label: "Percentage", default: "10", unit: "%", showIf: m("apply") },
  {
    id: "dir5",
    kind: "segmented",
    label: "Direction",
    default: "up",
    options: [
      { value: "up", label: "Increase" },
      { value: "down", label: "Decrease" },
    ],
    showIf: m("apply"),
  },
  { id: "a6", kind: "number", label: "First value", default: "40", showIf: m("diff") },
  { id: "b6", kind: "number", label: "Second value", default: "50", showIf: m("diff") },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  switch (v.mode) {
    case "of": {
      const p = readNum(v, "p1", { label: "Percentage" }, e);
      const y = readNum(v, "v1", { label: "Number" }, e);
      if (hasErrors(e) || p === null || y === null) return fail(e);
      const r = percentOf(p, y);
      return { ok: true, headline: { label: `${fmt(p)}% of ${fmt(y)}`, value: fmt(r) }, steps: [`${fmt(p)} ÷ 100 = ${fmt(p / 100)}`, `${fmt(p / 100)} × ${fmt(y)} = ${fmt(r)}`] };
    }
    case "what": {
      const x = readNum(v, "x2", { label: "Part" }, e);
      const y = readNum(v, "y2", { label: "Whole" }, e);
      if (y === 0) e.y2 = "The whole cannot be zero.";
      if (hasErrors(e) || x === null || y === null) return fail(e);
      const r = whatPercent(x, y);
      return { ok: true, headline: { label: `${fmt(x)} is what percent of ${fmt(y)}`, value: `${fmt(r)}%` }, steps: [`${fmt(x)} ÷ ${fmt(y)} = ${fmt(x / y)}`, `${fmt(x / y)} × 100 = ${fmt(r)}%`] };
    }
    case "whole": {
      const x = readNum(v, "x3", { label: "Part" }, e);
      const p = readNum(v, "p3", { label: "Percentage" }, e);
      if (p === 0) e.p3 = "The percentage cannot be zero.";
      if (hasErrors(e) || x === null || p === null) return fail(e);
      const r = wholeFromPercent(x, p);
      return { ok: true, headline: { label: `${fmt(x)} is ${fmt(p)}% of`, value: fmt(r) }, steps: [`${fmt(x)} × 100 = ${fmt(x * 100)}`, `${fmt(x * 100)} ÷ ${fmt(p)} = ${fmt(r)}`] };
    }
    case "change": {
      const a = readNum(v, "a4", { label: "Old value" }, e);
      const b = readNum(v, "b4", { label: "New value" }, e);
      if (a === 0) e.a4 = "The old value cannot be zero; a percentage change from zero is undefined.";
      if (hasErrors(e) || a === null || b === null) return fail(e);
      const r = percentChange(a, b);
      return {
        ok: true,
        headline: { label: r >= 0 ? "Percentage increase" : "Percentage decrease", value: `${fmt(Math.abs(r))}%`, sub: `From ${fmt(a)} to ${fmt(b)}` },
        stats: [{ label: "Absolute change", value: fmt(b - a) }, { label: "Ratio B ÷ A", value: fmt(b / a) }],
        steps: [`(${fmt(b)} − ${fmt(a)}) ÷ |${fmt(a)}| × 100 = ${fmt(r)}%`],
      };
    }
    case "apply": {
      const n = readNum(v, "v5", { label: "Starting number" }, e);
      const p = readNum(v, "p5", { label: "Percentage" }, e);
      if (hasErrors(e) || n === null || p === null) return fail(e);
      const up = v.dir5 !== "down";
      const r = n * (1 + (up ? 1 : -1) * (p / 100));
      return { ok: true, headline: { label: `${fmt(n)} ${up ? "increased" : "decreased"} by ${fmt(p)}%`, value: fmt(r) }, stats: [{ label: "Amount of the change", value: fmt(Math.abs(r - n)) }], steps: [`${fmt(n)} × (1 ${up ? "+" : "−"} ${fmt(p / 100)}) = ${fmt(r)}`] };
    }
    default: {
      const a = readNum(v, "a6", { label: "First value" }, e);
      const b = readNum(v, "b6", { label: "Second value" }, e);
      if (hasErrors(e) || a === null || b === null) return fail(e);
      if (a === 0 && b === 0) return fail({ a6: "At least one value must be non-zero." });
      const r = percentDifference(a, b);
      return { ok: true, headline: { label: "Percentage difference", value: `${fmt(r)}%`, sub: "Relative to the average of the two values" }, steps: [`|${fmt(a)} − ${fmt(b)}| ÷ ((|${fmt(a)}| + |${fmt(b)}|) ÷ 2) × 100 = ${fmt(r)}%`], notes: ["Percentage difference is symmetric: swapping the values gives the same answer. Use percentage change when one value is the starting point."] };
    }
  }
}

export default function PercentageWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
