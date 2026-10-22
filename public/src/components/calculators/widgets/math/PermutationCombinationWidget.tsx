"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { permutations, combinations, factorialBig } from "@/lib/calculators/numtheory";
import { groupDigits } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "n", kind: "number", label: "Total items (n)", default: "10", hint: "Whole number from 0 to 1,000." },
  { id: "r", kind: "number", label: "Items chosen (r)", default: "3", hint: "Whole number from 0 to n (or up to 1,000 when repeats are allowed)." },
];

const big = (b: bigint) => groupDigits(b.toString());
const short = (b: bigint) => {
  const s = b.toString();
  if (s.length <= 24) return groupDigits(s);
  return `${s[0]}.${s.slice(1, 6)} × 10^${s.length - 1}`;
};

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const n = readNum(v, "n", { label: "Total items", integer: true, min: 0, max: 1000 }, e);
  const r = readNum(v, "r", { label: "Items chosen", integer: true, min: 0, max: 1000 }, e);
  if (hasErrors(e) || n === null || r === null) return fail(e);
  const withRepeat = {
    perm: BigInt(n) ** BigInt(r),
    comb: n + r - 1 >= 0 && !(n === 0 && r > 0) ? (n === 0 ? 1n : combinations(n + r - 1, r)) : 0n,
  };
  if (r > n) {
    return {
      ok: true,
      headline: { label: "Without repeats", value: "0", sub: `You cannot choose ${r} different items from ${n}.` },
      stats: [
        { label: "Permutations with repetition (nʳ)", value: short(withRepeat.perm) },
        { label: "Combinations with repetition", value: short(withRepeat.comb) },
      ],
      notes: ["With repetition allowed, you can choose more items than there are in the set."],
    };
  }
  const nPr = permutations(n, r);
  const nCr = combinations(n, r);
  return {
    ok: true,
    headline: { label: `Combinations C(${n}, ${r}): order does not matter`, value: short(nCr), sub: `Permutations P(${n}, ${r}): order matters = ${short(nPr)}` },
    stats: [
      { label: `Permutations nPr = P(${n}, ${r})`, value: short(nPr), hint: "n! ÷ (n − r)!" },
      { label: `Combinations nCr = C(${n}, ${r})`, value: short(nCr), hint: "n! ÷ (r! × (n − r)!)" },
      { label: "Permutations with repetition (nʳ)", value: short(withRepeat.perm) },
      { label: "Combinations with repetition", value: short(withRepeat.comb), hint: "(n + r − 1)! ÷ (r! × (n − 1)!)" },
      { label: `${n}! (all arrangements of n items)`, value: n <= 40 ? big(factorialBig(n)) : short(factorialBig(n)) },
    ],
    block: nPr.toString().length > 24 ? { label: "Exact permutations", text: big(nPr) } : undefined,
    steps: ["Permutations count ordered selections, so ABC and CBA are different.", "Combinations count unordered selections, so ABC and CBA are the same.", `C(n, r) = P(n, r) ÷ r!`],
  };
}

export default function PermutationCombinationWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
