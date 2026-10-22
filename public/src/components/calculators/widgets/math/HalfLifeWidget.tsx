"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { remainingAfter, timeToReach, halfLifeFrom, initialFrom, meanLifetimeFromHalfLife, decayConstantFromHalfLife, LN2 } from "@/lib/calculators/mathmisc";
import { fmt } from "@/lib/calculators/format";

const m = (...ids: string[]) => (v: Values) => ids.includes(v.mode);

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "select",
    label: "What do you want to find?",
    default: "remaining",
    wide: true,
    options: [
      { value: "remaining", label: "Quantity remaining after a time" },
      { value: "time", label: "Time needed to decay to a given quantity" },
      { value: "half", label: "The half-life, from measured decay" },
      { value: "initial", label: "The initial quantity" },
      { value: "const", label: "Convert half-life, mean lifetime and decay constant" },
    ],
  },
  { id: "tunit", kind: "text", label: "Time unit (label)", default: "years", showIf: (v) => v.mode !== "const", hint: "Used only for display; use the same unit for time and half-life." },
  { id: "n0", kind: "number", label: "Initial quantity (N₀)", default: "100", showIf: m("remaining", "time", "half") },
  { id: "nt", kind: "number", label: "Remaining quantity (N)", default: "25", showIf: m("time", "half", "initial") },
  { id: "t", kind: "number", label: "Elapsed time (t)", default: "11460", showIf: m("remaining", "half", "initial") },
  { id: "h", kind: "number", label: "Half-life (t½)", default: "5730", showIf: m("remaining", "time", "initial") },
  {
    id: "from",
    kind: "select",
    label: "I know the",
    default: "half",
    options: [
      { value: "half", label: "Half-life (t½)" },
      { value: "mean", label: "Mean lifetime (τ)" },
      { value: "lambda", label: "Decay constant (λ)" },
    ],
    showIf: m("const"),
  },
  { id: "cv", kind: "number", label: "Value", default: "5730", showIf: m("const"), hint: "Half-life and mean lifetime are times; the decay constant is per unit time." },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const u = (v.tunit ?? "").trim() || "time units";
  switch (v.mode) {
    case "remaining": {
      const n0 = readNum(v, "n0", { label: "Initial quantity", gt: 0 }, e);
      const t = readNum(v, "t", { label: "Elapsed time", min: 0 }, e);
      const h = readNum(v, "h", { label: "Half-life", gt: 0 }, e);
      if (hasErrors(e) || n0 === null || t === null || h === null) return fail(e);
      const nt = remainingAfter(n0, t, h);
      return { ok: true, headline: { label: "Quantity remaining", value: fmt(nt, 10), sub: `${fmt((nt / n0) * 100, 8)}% of the original after ${fmt(t)} ${u}` }, stats: [{ label: "Half-lives elapsed", value: fmt(t / h, 8) }, { label: "Amount decayed", value: fmt(n0 - nt, 10) }], steps: [`N = N₀ × (1/2)^(t ÷ t½) = ${fmt(n0)} × (1/2)^(${fmt(t)} ÷ ${fmt(h)}) = ${fmt(nt, 10)}`] };
    }
    case "time": {
      const n0 = readNum(v, "n0", { label: "Initial quantity", gt: 0 }, e);
      const nt = readNum(v, "nt", { label: "Remaining quantity", gt: 0 }, e);
      const h = readNum(v, "h", { label: "Half-life", gt: 0 }, e);
      if (n0 !== null && nt !== null && nt > n0) e.nt = "The remaining quantity cannot exceed the initial quantity.";
      if (hasErrors(e) || n0 === null || nt === null || h === null) return fail(e);
      const t = timeToReach(n0, nt, h);
      return { ok: true, headline: { label: "Elapsed time", value: `${fmt(t, 10)} ${u}` }, stats: [{ label: "Half-lives", value: fmt(t / h, 8) }], steps: [`t = t½ × log₂(N₀ ÷ N) = ${fmt(h)} × log₂(${fmt(n0)} ÷ ${fmt(nt)}) = ${fmt(t, 10)}`] };
    }
    case "half": {
      const n0 = readNum(v, "n0", { label: "Initial quantity", gt: 0 }, e);
      const nt = readNum(v, "nt", { label: "Remaining quantity", gt: 0 }, e);
      const t = readNum(v, "t", { label: "Elapsed time", gt: 0 }, e);
      if (n0 !== null && nt !== null && nt >= n0) e.nt = "The remaining quantity must be smaller than the initial quantity for decay.";
      if (hasErrors(e) || n0 === null || nt === null || t === null) return fail(e);
      const h = halfLifeFrom(n0, nt, t);
      return { ok: true, headline: { label: "Half-life", value: `${fmt(h, 10)} ${u}` }, stats: [{ label: "Mean lifetime (τ)", value: `${fmt(meanLifetimeFromHalfLife(h), 10)} ${u}` }, { label: "Decay constant (λ)", value: `${fmt(decayConstantFromHalfLife(h), 8)} per ${u.replace(/s$/, "")}` }], steps: [`t½ = t × ln 2 ÷ ln(N₀ ÷ N) = ${fmt(t)} × ${fmt(LN2, 8)} ÷ ln(${fmt(n0)} ÷ ${fmt(nt)}) = ${fmt(h, 10)}`] };
    }
    case "initial": {
      const nt = readNum(v, "nt", { label: "Remaining quantity", gt: 0 }, e);
      const t = readNum(v, "t", { label: "Elapsed time", min: 0 }, e);
      const h = readNum(v, "h", { label: "Half-life", gt: 0 }, e);
      if (hasErrors(e) || nt === null || t === null || h === null) return fail(e);
      const n0 = initialFrom(nt, t, h);
      return { ok: true, headline: { label: "Initial quantity", value: fmt(n0, 10) }, steps: [`N₀ = N × 2^(t ÷ t½) = ${fmt(nt)} × 2^(${fmt(t)} ÷ ${fmt(h)}) = ${fmt(n0, 10)}`] };
    }
    default: {
      const c = readNum(v, "cv", { label: "Value", gt: 0 }, e);
      if (hasErrors(e) || c === null) return fail(e);
      const half = v.from === "half" ? c : v.from === "mean" ? c * LN2 : LN2 / c;
      return {
        ok: true,
        headline: { label: "Half-life (t½)", value: fmt(half, 10) },
        stats: [{ label: "Mean lifetime (τ)", value: fmt(meanLifetimeFromHalfLife(half), 10) }, { label: "Decay constant (λ)", value: fmt(decayConstantFromHalfLife(half), 10) }],
        steps: ["t½ = τ × ln 2 = ln 2 ÷ λ, and τ = 1 ÷ λ."],
        notes: ["Keep time units consistent: if the half-life is in years, the decay constant is per year."],
      };
    }
  }
}

export default function HalfLifeWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
