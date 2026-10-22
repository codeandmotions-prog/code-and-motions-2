"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { type Values } from "@/lib/calculators/validate";
import { add, sub, mul, div, sqrtDec, powInt, parseDec, fromBigInt, toPlain, digitCount, type Dec } from "@/lib/calculators/decimal";
import { groupDigits } from "@/lib/calculators/format";
import { gcdMany, lcmMany, factorialBig } from "@/lib/calculators/numtheory";

const fields: FieldDef[] = [
  {
    id: "op",
    kind: "select",
    label: "Operation",
    default: "mul",
    options: [
      { value: "add", label: "Add (x + y)" },
      { value: "sub", label: "Subtract (x − y)" },
      { value: "mul", label: "Multiply (x × y)" },
      { value: "div", label: "Divide (x ÷ y)" },
      { value: "pow", label: "Power (x ^ n)" },
      { value: "sqrt", label: "Square root (√x)" },
      { value: "fact", label: "Factorial (x!)" },
      { value: "mod", label: "Remainder (x mod y)" },
      { value: "gcd", label: "Greatest common divisor (GCD)" },
      { value: "lcm", label: "Least common multiple (LCM)" },
    ],
    wide: true,
  },
  { id: "x", kind: "textarea", rows: 2, label: "Number x", default: "123456789012345678901234567890", hint: "Up to 1,000 digits. Spaces and commas are ignored. Factorial, remainder, GCD and LCM need whole numbers." },
  { id: "y", kind: "textarea", rows: 2, label: "Number y", default: "987654321098765432109876543210", showIf: (v) => NEEDS_Y.includes(v.op) },
  { id: "n", kind: "number", label: "Exponent n", default: "20", showIf: (v) => v.op === "pow", hint: "A whole number from 0 to 5,000. The result may not exceed 20,000 digits." },
  { id: "sig", kind: "number", label: "Significant digits for division / roots", default: "50", showIf: (v) => v.op === "div" || v.op === "sqrt", hint: "Between 5 and 500." },
];

const NEEDS_Y = ["add", "sub", "mul", "div", "mod", "gcd", "lcm"];
const INT_ONLY = ["fact", "mod", "gcd", "lcm"];
const MAX_FACT = 3000;
const MAX_IN = 1000;
const MAX_OUT = 20000;

function clean(raw: string): string {
  return raw.replace(/[\s,_ ]/g, "");
}
function parseBig(raw: string): Dec | null {
  const s = clean(raw);
  if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return parseDec(s);
}
function plain(d: Dec): string {
  const s = toPlain(d);
  const [i, f] = s.split(".");
  return f ? `${groupDigits(i)}.${f}` : groupDigits(i);
}

function compute(v: Values): CalcOutcome {
  const rx = clean(v.x ?? "");
  const x = parseBig(v.x ?? "");
  if (!x) return fail({ x: rx === "" ? "Enter a number." : "Use digits only (with an optional sign and decimal point)." });
  if (digitCount(x.c < 0n ? -x.c : x.c) > MAX_IN) return fail({ x: `Numbers are limited to ${MAX_IN} digits.` });
  const needsY = NEEDS_Y.includes(v.op);
  let y: Dec | null = null;
  if (needsY) {
    y = parseBig(v.y ?? "");
    if (!y) return fail({ y: clean(v.y ?? "") === "" ? "Enter a second number." : "Use digits only (with an optional sign and decimal point)." });
    if (digitCount(y.c < 0n ? -y.c : y.c) > MAX_IN) return fail({ y: `Numbers are limited to ${MAX_IN} digits.` });
  }
  if (INT_ONLY.includes(v.op)) {
    if (x.e < 0) return fail({ x: "This operation needs a whole number (no decimal part)." });
    if (y && y.e < 0) return fail({ y: "This operation needs a whole number (no decimal part)." });
  }
  let result: Dec | null = null;
  const stats: { label: string; value: string }[] = [];
  const notes: string[] = [];
  let label = "";
  if (v.op === "add") { result = add(x, y!); label = "x + y"; }
  else if (v.op === "sub") { result = sub(x, y!); label = "x − y"; }
  else if (v.op === "mul") { result = mul(x, y!); label = "x × y"; }
  else if (v.op === "div") {
    if (y!.c === 0n) return fail({ y: "You cannot divide by zero." });
    const sig = Number(v.sig);
    if (!Number.isInteger(sig) || sig < 5 || sig > 500) return fail({ sig: "Enter a whole number between 5 and 500." });
    result = div(x, y!, sig);
    label = "x ÷ y";
    if (x.e >= 0 && y!.e >= 0) {
      const xi = x.c * 10n ** BigInt(x.e);
      const yi = y!.c * 10n ** BigInt(y!.e);
      const q = xi / yi;
      const r = xi % yi;
      stats.push({ label: "Integer quotient", value: groupDigits(q.toString()) }, { label: "Remainder", value: groupDigits(r.toString()) });
    }
    notes.push(`The quotient is rounded to ${sig} significant digits.`);
  } else if (v.op === "pow") {
    const nRaw = (v.n ?? "").trim();
    const n = Number(nRaw);
    if (nRaw === "" || !Number.isInteger(n) || n < 0 || n > 5000) return fail({ n: "Enter a whole number from 0 to 5,000." });
    if (digitCount(x.c < 0n ? -x.c : x.c) * n > MAX_OUT) return fail({ n: `The result would be longer than ${MAX_OUT.toLocaleString("en-US")} digits.` });
    result = powInt(x, n);
    label = `x ^ ${n}`;
  } else if (v.op === "fact") {
    const xi = x.c * 10n ** BigInt(x.e);
    if (xi < 0n || xi > BigInt(MAX_FACT)) return fail({ x: `Enter a whole number from 0 to ${MAX_FACT.toLocaleString("en-US")}.` });
    result = fromBigInt(factorialBig(Number(xi)));
    label = `${xi}!`;
    notes.push("n! is the product of every whole number from 1 to n, and 0! is defined as 1.");
  } else if (v.op === "mod") {
    const xi = x.c * 10n ** BigInt(x.e);
    const yi = y!.c * 10n ** BigInt(y!.e);
    if (yi === 0n) return fail({ y: "You cannot divide by zero." });
    result = fromBigInt(xi % yi);
    label = "x mod y";
    stats.push({ label: "Integer quotient", value: groupDigits((xi / yi).toString()) });
    notes.push("The remainder takes the sign of x, so x = quotient × y + remainder with the quotient rounded toward zero.");
  } else if (v.op === "gcd" || v.op === "lcm") {
    const xi = x.c * 10n ** BigInt(x.e);
    const yi = y!.c * 10n ** BigInt(y!.e);
    const g = v.op === "gcd" ? gcdMany([xi, yi]) : lcmMany([xi, yi]);
    result = fromBigInt(g < 0n ? -g : g);
    label = v.op === "gcd" ? "GCD(x, y)" : "LCM(x, y)";
    if (v.op === "lcm" && (xi === 0n || yi === 0n)) notes.push("The LCM involving zero is taken as 0.");
    if (v.op === "gcd" && xi === 0n && yi === 0n) notes.push("GCD(0, 0) is taken as 0.");
  } else {
    if (x.c < 0n) return fail({ x: "The square root of a negative number is not a real number." });
    const sig = Number(v.sig);
    if (!Number.isInteger(sig) || sig < 5 || sig > 500) return fail({ sig: "Enter a whole number between 5 and 500." });
    result = sqrtDec(x, sig);
    label = "√x";
    notes.push(`The root is rounded to ${sig} significant digits.`);
  }
  if (!result) return fail({ x: "These numbers differ too much in magnitude to calculate exactly." });
  const text = plain(result);
  const digits = digitCount(result.c < 0n ? -result.c : result.c);
  if (text.length > MAX_OUT * 1.5) return fail({ x: "The result is too long to display." });
  const intDigits = text.replace(/[-,]/g, "").split(".")[0].length;
  stats.push({ label: "Digits in the integer part", value: String(intDigits) }, { label: "Significant digits", value: String(digits) });
  return {
    ok: true,
    headline: { label, value: text.length > 40 ? `${text.slice(0, 34)}… (${intDigits} digits)` : text },
    stats,
    block: { label: "Full result", text },
    notes: ["Add, subtract, multiply, power, factorial, remainder, GCD and LCM are exact (no rounding).", ...notes],
  };
}

export default function BigNumberWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
