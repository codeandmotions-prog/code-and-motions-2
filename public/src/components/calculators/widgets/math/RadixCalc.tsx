"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { hasErrors, type Values } from "@/lib/calculators/validate";
import { parseBigInt } from "@/lib/calculators/parse";
import { fractionDigits, groupBinary, parseRadix, toRadix, type Radix } from "@/lib/calculators/radix";
import { groupDigits } from "@/lib/calculators/format";

function build(radix: Radix): { fields: FieldDef[]; compute: (v: Values) => CalcOutcome } {
  const name = radix === 2 ? "binary" : "hexadecimal";
  const sample = radix === 2 ? ["1101", "101"] : ["1F4", "A3"];
  const hint = radix === 2 ? "Digits 0 and 1 only." : "Digits 0-9 and A-F (upper or lower case); an 0x prefix is accepted.";
  const isArith = (v: Values) => ["add", "sub", "mul", "div"].includes(v.op);
  const fields: FieldDef[] = [
    {
      id: "op",
      kind: "select",
      label: "Operation",
      default: "add",
      wide: true,
      options: [
        { value: "add", label: "Add (+)" },
        { value: "sub", label: "Subtract (−)" },
        { value: "mul", label: "Multiply (×)" },
        { value: "div", label: "Divide (÷)" },
        { value: "toDec", label: `Convert ${name} to decimal` },
        { value: "fromDec", label: `Convert decimal to ${name}` },
      ],
    },
    { id: "a", kind: "text", label: `First ${name} number`, default: sample[0], hint, showIf: (v) => isArith(v) || v.op === "toDec" },
    { id: "b", kind: "text", label: `Second ${name} number`, default: sample[1], hint, showIf: isArith },
    { id: "dec", kind: "text", label: "Decimal number (whole)", default: "500", showIf: (v) => v.op === "fromDec", hint: "Whole numbers only, positive or negative." },
  ];
  const fmtR = (x: bigint) => (radix === 2 ? groupBinary(toRadix(x, 2)) : toRadix(x, 16));
  const compute = (v: Values): CalcOutcome => {
    const e: Record<string, string> = {};
    if (v.op === "fromDec") {
      const d = parseBigInt(v.dec ?? "");
      if (d === null) return fail({ dec: "Enter a whole number, such as 500." });
      return { ok: true, headline: { label: `${groupDigits(d.toString())} in ${name}`, value: toRadix(d, radix) }, stats: radix === 2 ? [{ label: "Grouped in fours", value: groupBinary(toRadix(d, 2)) }] : [{ label: "With 0x prefix", value: `0x${toRadix(d, 16)}` }] };
    }
    const a = parseRadix(v.a ?? "", radix);
    if (a === null) e.a = `Enter a valid ${name} number. ${hint}`;
    if (v.op === "toDec") {
      if (hasErrors(e) || a === null) return fail(e);
      return { ok: true, headline: { label: `${toRadix(a, radix)} in decimal`, value: groupDigits(a.toString()) } };
    }
    const b = parseRadix(v.b ?? "", radix);
    if (b === null) e.b = `Enter a valid ${name} number. ${hint}`;
    if (hasErrors(e) || a === null || b === null) return fail(e);
    const sym = v.op === "add" ? "+" : v.op === "sub" ? "−" : v.op === "mul" ? "×" : "÷";
    if (v.op === "div") {
      if (b === 0n) return fail({ b: "You cannot divide by zero." });
      const quo = a / b;
      const rem = a % b;
      return {
        ok: true,
        headline: { label: `${toRadix(a, radix)} ${sym} ${toRadix(b, radix)}`, value: `${toRadix(quo, radix)} remainder ${toRadix(rem, radix)}` },
        stats: [
          { label: `Exact quotient (${name}, up to 32 digits)`, value: `${(a < 0n) !== (b < 0n) && a !== 0n ? "-" : ""}${toRadix(quo < 0n ? -quo : quo, radix)}${rem === 0n ? "" : "." + fractionDigits(rem, b, radix, 32)}` },
          { label: "In decimal", value: `${groupDigits(a.toString())} ÷ ${groupDigits(b.toString())} = ${groupDigits(quo.toString())} remainder ${rem.toString()}` },
        ],
        notes: ["Integer division truncates towards zero; the remainder takes the sign of the first number."],
      };
    }
    const r = v.op === "add" ? a + b : v.op === "sub" ? a - b : a * b;
    return {
      ok: true,
      headline: { label: `${toRadix(a, radix)} ${sym} ${toRadix(b, radix)} =`, value: fmtR(r) },
      stats: [{ label: "In decimal", value: `${groupDigits(a.toString())} ${sym} ${groupDigits(b.toString())} = ${groupDigits(r.toString())}` }],
      notes: ["Negative numbers are written with a minus sign (for example −101), not in two's complement."],
    };
  };
  return { fields, compute };
}

export default function RadixCalc({ radix }: { radix: Radix }) {
  const { fields, compute } = build(radix);
  return <CalculatorForm fields={fields} compute={compute} />;
}
