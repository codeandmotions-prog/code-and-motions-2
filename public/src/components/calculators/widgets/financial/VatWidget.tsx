"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { vatFromNet, vatFromGross, vatRateFromAmounts, VAT_PRESETS } from "@/lib/calculators/finance";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  {
    id: "mode",
    kind: "segmented",
    label: "What do you want to work out?",
    default: "add",
    options: [
      { value: "add", label: "Add VAT to a net price" },
      { value: "remove", label: "Remove VAT from a gross price" },
      { value: "rate", label: "Find the VAT rate" },
    ],
  },
  {
    id: "preset",
    kind: "select",
    label: "VAT rate",
    default: "gb",
    options: [...VAT_PRESETS.map((p) => ({ value: p.id, label: `${p.label} (${p.rate}%)` })), { value: "custom", label: "Enter my own rate" }],
    showIf: (v) => v.mode !== "rate",
    hint: "Standard rates are listed for convenience and can change. Check the current rate with your tax authority.",
  },
  { id: "rate", kind: "number", label: "VAT rate", default: "20", unit: "%", showIf: (v) => v.mode !== "rate" && v.preset === "custom", hint: "Use this for reduced or zero rates." },
  { id: "net", kind: "number", label: "Net price (excluding VAT)", default: "100", showIf: (v) => v.mode === "add" || v.mode === "rate" },
  { id: "gross", kind: "number", label: "Gross price (including VAT)", default: "120", showIf: (v) => v.mode === "remove" || v.mode === "rate" },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const f = (n: number) => money(n, cur);
  let rate: number | null = null;
  if (v.mode !== "rate") {
    if (v.preset === "custom") rate = readNum(v, "rate", { label: "VAT rate", min: 0, max: 100 }, errors);
    else rate = VAT_PRESETS.find((p) => p.id === v.preset)?.rate ?? 20;
  }
  const net = v.mode !== "remove" ? readNum(v, "net", { label: "Net price", min: 0, max: 1e12 }, errors) : null;
  const gross = v.mode !== "add" ? readNum(v, "gross", { label: "Gross price", min: 0, max: 1e12 }, errors) : null;
  if (v.mode === "rate" && net !== null && gross !== null) {
    if (net === 0) errors.net = "The net price must be above zero to find a rate.";
    else if (gross < net) errors.gross = "The gross price cannot be lower than the net price.";
  }
  if (hasErrors(errors)) return fail(errors);

  const r =
    v.mode === "add" ? vatFromNet(net as number, rate as number)
    : v.mode === "remove" ? vatFromGross(gross as number, rate as number)
    : vatRateFromAmounts(net as number, gross as number);

  const headline =
    v.mode === "add" ? { label: "Gross price (including VAT)", value: f(r.gross) }
    : v.mode === "remove" ? { label: "Net price (excluding VAT)", value: f(r.net) }
    : { label: "VAT rate", value: `${fixed(r.ratePct, 3)}%` };
  return {
    ok: true,
    headline,
    stats: [
      { label: "Net price", value: f(r.net) },
      { label: "VAT amount", value: f(r.vat) },
      { label: "Gross price", value: f(r.gross) },
      { label: "VAT rate", value: `${fixed(r.ratePct, 3)}%` },
    ],
    notes: [
      "Results are not rounded line by line, as an invoice or till may do. VAT rules (exemptions, reduced rates, reverse charge) vary by country and product, so check your own obligations.",
    ],
  };
}

export default function VatWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
