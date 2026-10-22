"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { type Values } from "@/lib/calculators/validate";
import { add, sub, mul, div, parseDec, toPlain, toScientific, toENotation, toEngineering, digitCount, type Dec, roundSig } from "@/lib/calculators/decimal";

const fields: FieldDef[] = [
  {
    id: "op",
    kind: "select",
    label: "Operation",
    default: "convert",
    options: [
      { value: "convert", label: "Convert a number to scientific notation" },
      { value: "add", label: "Add (x + y)" },
      { value: "sub", label: "Subtract (x − y)" },
      { value: "mul", label: "Multiply (x × y)" },
      { value: "div", label: "Divide (x ÷ y)" },
    ],
    wide: true,
  },
  { id: "x", kind: "text", label: "Number x", default: "0.000345", hint: "Accepts 12345, 0.00012, 3.45e-4, 3.45e-4 or 3.45x10^-4." },
  { id: "y", kind: "text", label: "Number y", default: "2.5e3", showIf: (v) => v.op !== "convert" },
];

const MAX_DIGITS = 500;

function show(r: Dec): { label: string; text: string }[] {
  return [
    { label: "Scientific notation", text: toScientific(r) },
    { label: "E notation", text: toENotation(r) },
    { label: "Engineering notation", text: toEngineering(r) },
    { label: "Decimal", text: Math.abs(r.e) > 400 ? "(too long to display in full)" : toPlain(r) },
  ];
}

function compute(v: Values): CalcOutcome {
  const rx = (v.x ?? "").trim();
  const x = parseDec(rx);
  if (!x) return fail({ x: rx === "" ? "Enter a number." : `“${rx}” is not a valid number or scientific notation.` });
  if (digitCount(x.c < 0n ? -x.c : x.c) > MAX_DIGITS) return fail({ x: `Please use at most ${MAX_DIGITS} significant digits.` });
  let result: Dec;
  let steps: string[] = [];
  if (v.op === "convert") {
    result = x;
    steps = ["Move the decimal point so one non-zero digit sits before it.", "The number of places moved becomes the power of ten (positive when you moved left, negative when you moved right)."];
  } else {
    const ry = (v.y ?? "").trim();
    const y = parseDec(ry);
    if (!y) return fail({ y: ry === "" ? "Enter a second number." : `“${ry}” is not a valid number or scientific notation.` });
    if (digitCount(y.c < 0n ? -y.c : y.c) > MAX_DIGITS) return fail({ y: `Please use at most ${MAX_DIGITS} significant digits.` });
    let r: Dec | null;
    if (v.op === "add") r = add(x, y);
    else if (v.op === "sub") r = sub(x, y);
    else if (v.op === "mul") r = mul(x, y);
    else {
      if (y.c === 0n) return fail({ y: "You cannot divide by zero." });
      r = div(x, y, 30);
    }
    if (!r) return fail({ x: "These exponents are too far apart to add or subtract exactly. Try numbers of similar magnitude." });
    result = r;
    steps =
      v.op === "mul"
        ? ["Multiply the coefficients and add the exponents.", "Renormalise so the coefficient is between 1 and 10."]
        : v.op === "div"
          ? ["Divide the coefficients and subtract the exponents (shown to 30 significant digits).", "Renormalise so the coefficient is between 1 and 10."]
          : ["Rewrite both numbers with the same power of ten.", "Add or subtract the coefficients, then renormalise."];
  }
  if (v.op === "div") result = roundSig(result, 30);
  const rows = show(result);
  return {
    ok: true,
    headline: { label: v.op === "convert" ? "In scientific notation" : "Result in scientific notation", value: rows[0].text },
    stats: rows.slice(1, 3).map((r) => ({ label: r.label, value: r.text })),
    block: { label: "Plain decimal", text: rows[3].text },
    steps,
    notes: ["Addition, subtraction and multiplication are exact. Division is rounded to 30 significant digits."],
  };
}

export default function ScientificNotationWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
