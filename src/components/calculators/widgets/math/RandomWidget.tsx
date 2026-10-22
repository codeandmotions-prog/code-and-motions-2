"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { qFromString, qMul, q } from "@/lib/calculators/rational";

const fields: FieldDef[] = [
  { id: "min", kind: "number", label: "Lowest value", default: "1" },
  { id: "max", kind: "number", label: "Highest value", default: "100" },
  { id: "count", kind: "number", label: "How many numbers?", default: "5", hint: "Between 1 and 1,000." },
  {
    id: "type",
    kind: "segmented",
    label: "Type of number",
    default: "int",
    options: [
      { value: "int", label: "Whole numbers" },
      { value: "dec", label: "Decimals" },
    ],
  },
  { id: "places", kind: "number", label: "Decimal places", default: "2", showIf: (v) => v.type === "dec", hint: "0 to 12." },
  {
    id: "unique",
    kind: "segmented",
    label: "Repeats",
    default: "yes",
    options: [
      { value: "yes", label: "Allow repeats" },
      { value: "no", label: "No repeats" },
    ],
  },
  {
    id: "sort",
    kind: "segmented",
    label: "Order",
    default: "none",
    options: [
      { value: "none", label: "As generated" },
      { value: "asc", label: "Lowest first" },
      { value: "desc", label: "Highest first" },
    ],
  },
];

/** Uniform random BigInt in [0, n) using Web Crypto with rejection sampling. */
function randomBelow(n: bigint): bigint {
  if (n <= 1n) return 0n;
  const bits = n.toString(2).length;
  const words = Math.ceil(bits / 32);
  const mask = (1n << BigInt(bits)) - 1n;
  const buf = new Uint32Array(words);
  for (;;) {
    crypto.getRandomValues(buf);
    let x = 0n;
    for (const w of buf) x = (x << 32n) | BigInt(w);
    x &= mask;
    if (x < n) return x;
  }
}

function scaledToString(n: bigint, places: number): string {
  const neg = n < 0n;
  const digits = (neg ? -n : n).toString().padStart(places + 1, "0");
  const body = places > 0 ? `${digits.slice(0, digits.length - places)}.${digits.slice(digits.length - places)}` : digits;
  return (neg ? "-" : "") + body;
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const count = readNum(v, "count", { label: "How many numbers", integer: true, min: 1, max: 1000 }, e);
  const places = v.type === "dec" ? readNum(v, "places", { label: "Decimal places", integer: true, min: 0, max: 12 }, e) ?? 0 : 0;
  const lo = qFromString(v.min ?? "");
  const hi = qFromString(v.max ?? "");
  if (!lo) e.min = "Enter a valid lowest value.";
  if (!hi) e.max = "Enter a valid highest value.";
  if (hasErrors(e) || !lo || !hi || count === null) return fail(e);
  const scale = q(10n ** BigInt(places));
  const sLo = qMul(lo, scale);
  const sHi = qMul(hi, scale);
  // smallest scaled integer >= lo, largest scaled integer <= hi
  const ceil = (x: { n: bigint; d: bigint }) => (x.n >= 0n ? (x.n + x.d - 1n) / x.d : -((-x.n) / x.d));
  const floor = (x: { n: bigint; d: bigint }) => (x.n >= 0n ? x.n / x.d : -((-x.n + x.d - 1n) / x.d));
  const a = ceil(sLo);
  const b = floor(sHi);
  if (b < a) return fail({ max: "There is no allowed value between the lowest and highest numbers. Widen the range." });
  const span = b - a + 1n;
  const unique = v.unique === "no";
  if (unique && BigInt(count) > span) {
    return fail({ count: `Only ${span.toString()} different value${span === 1n ? " is" : "s are"} possible in this range, so ${count} unique numbers cannot be drawn.` });
  }
  const out: bigint[] = [];
  if (unique) {
    const seen = new Set<string>();
    while (out.length < count) {
      const x = a + randomBelow(span);
      const key = x.toString();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(x);
      }
    }
  } else {
    for (let i = 0; i < count; i++) out.push(a + randomBelow(span));
  }
  if (v.sort === "asc") out.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
  if (v.sort === "desc") out.sort((x, y) => (x < y ? 1 : x > y ? -1 : 0));
  const text = out.map((x) => scaledToString(x, places));
  return {
    ok: true,
    headline: count === 1 ? { label: "Your random number", value: text[0] } : { label: `${count} random numbers`, value: text.slice(0, 3).join(", ") + (count > 3 ? ", …" : "") },
    block: count > 1 ? { label: "All numbers", text: text.join(", ") } : undefined,
    notes: [
      "Numbers are drawn uniformly (every allowed value is equally likely) from your browser's Web Crypto random generator. They are suitable for games, raffles and sampling; for passwords or security keys use a dedicated password manager.",
    ],
  };
}

export default function RandomWidget() {
  return <CalculatorForm fields={fields} compute={compute} initialRun={false} submitLabel="Generate" resetLabel="Reset" />;
}
