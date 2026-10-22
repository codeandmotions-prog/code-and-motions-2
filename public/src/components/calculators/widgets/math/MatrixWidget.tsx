"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome, type ResultTable } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { qFromString, qSub, qAdd, qMul, qDiv, qIsZero, qToFraction, Q0, type Q } from "@/lib/calculators/rational";
import { mAdd, mSub, mMul, mScale, transpose, determinant, inverse, mPow, cellText, rows, cols, type Matrix } from "@/lib/calculators/matrix";

const MAX = 8;

const OPS = [
  { value: "add", label: "A + B", two: true },
  { value: "sub", label: "A − B", two: true },
  { value: "mul", label: "A × B", two: true },
  { value: "scale", label: "k × A (scalar multiple)", two: false },
  { value: "det", label: "Determinant of A", two: false },
  { value: "inv", label: "Inverse of A", two: false },
  { value: "trans", label: "Transpose of A", two: false },
  { value: "pow", label: "Power Aⁿ", two: false },
  { value: "rank", label: "Rank and trace of A", two: false },
];

const fields: FieldDef[] = [
  { id: "op", kind: "select", label: "Operation", default: "mul", options: OPS.map((o) => ({ value: o.value, label: o.label })), wide: true },
  { id: "A", kind: "textarea", rows: 4, label: "Matrix A", default: "1 2\n3 4", hint: "One row per line, entries separated by spaces or commas. Fractions such as 1/2 are fine. Up to 8 × 8." },
  { id: "B", kind: "textarea", rows: 4, label: "Matrix B", default: "5 6\n7 8", showIf: (v) => ["add", "sub", "mul"].includes(v.op) },
  { id: "k", kind: "number", label: "Scalar k", default: "2.5", showIf: (v) => v.op === "scale" },
  { id: "n", kind: "number", label: "Exponent n", default: "3", showIf: (v) => v.op === "pow", hint: "Whole number from −20 to 20. Negative powers use the inverse." },
  {
    id: "show",
    kind: "segmented",
    label: "Show entries as",
    default: "frac",
    options: [
      { value: "frac", label: "Exact fractions" },
      { value: "dec", label: "Decimals" },
    ],
  },
];

function parseMatrix(raw: string, id: string, e: Record<string, string>): Matrix | null {
  const lines = raw
    .split(/\n|;/)
    .map((l) => l.trim())
    .filter((l) => l !== "");
  if (lines.length === 0) {
    e[id] = `Enter matrix ${id}.`;
    return null;
  }
  if (lines.length > MAX) {
    e[id] = `Matrix ${id} can have at most ${MAX} rows.`;
    return null;
  }
  const m: Matrix = [];
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(/[\s,]+/).filter(Boolean);
    const row: Q[] = [];
    for (const p of parts) {
      const x = qFromString(p);
      if (!x) {
        e[id] = `“${p}” in row ${i + 1} of matrix ${id} is not a number.`;
        return null;
      }
      row.push(x);
    }
    if (m.length > 0 && row.length !== m[0].length) {
      e[id] = `Row ${i + 1} of matrix ${id} has ${row.length} entries but row 1 has ${m[0].length}. Every row needs the same number of entries.`;
      return null;
    }
    if (row.length > MAX) {
      e[id] = `Matrix ${id} can have at most ${MAX} columns.`;
      return null;
    }
    m.push(row);
  }
  return m;
}

function rankOf(a: Matrix): number {
  const m = a.map((r) => [...r]);
  let rank = 0;
  for (let c = 0; c < cols(m) && rank < rows(m); c++) {
    let p = rank;
    while (p < rows(m) && qIsZero(m[p][c])) p++;
    if (p === rows(m)) continue;
    [m[p], m[rank]] = [m[rank], m[p]];
    for (let r = rank + 1; r < rows(m); r++) {
      if (qIsZero(m[r][c])) continue;
      const f = qDiv(m[r][c], m[rank][c]);
      m[r] = m[r].map((v, k) => qSub(v, qMul(f, m[rank][k])));
    }
    rank++;
  }
  return rank;
}

function table(title: string, m: Matrix, dec: boolean): ResultTable {
  return { title, columns: m[0].map((_, j) => `Col ${j + 1}`), rows: m.map((r) => r.map((v) => cellText(v, dec))) };
}

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  const op = v.op;
  const dec = v.show === "dec";
  const A = parseMatrix(v.A ?? "", "A", e);
  const needB = ["add", "sub", "mul"].includes(op);
  const B = needB ? parseMatrix(v.B ?? "", "B", e) : null;
  const k = op === "scale" ? readNum(v, "k", { label: "Scalar k" }, e) : null;
  const n = op === "pow" ? readNum(v, "n", { label: "Exponent", integer: true, min: -20, max: 20 }, e) : null;
  if (hasErrors(e) || !A || (needB && !B)) return fail(e);
  const dims = (m: Matrix) => `${rows(m)} × ${cols(m)}`;
  const square = rows(A) === cols(A);
  const needSquare = ["det", "inv", "pow"].includes(op);
  if (needSquare && !square) return fail({ A: `Matrix A is ${dims(A)}. This operation needs a square matrix (same number of rows and columns).` });

  if (op === "add" || op === "sub") {
    if (rows(A) !== rows(B!) || cols(A) !== cols(B!)) return fail({ B: `A is ${dims(A)} and B is ${dims(B!)}. Addition and subtraction need matrices of the same size.` });
    const r = op === "add" ? mAdd(A, B!) : mSub(A, B!);
    return { ok: true, headline: { label: `${op === "add" ? "A + B" : "A − B"}`, value: `${dims(r)} matrix` }, tables: [table("Result", r, dec)] };
  }
  if (op === "mul") {
    if (cols(A) !== rows(B!)) return fail({ B: `A is ${dims(A)} and B is ${dims(B!)}. For A × B, the number of columns of A (${cols(A)}) must equal the number of rows of B (${rows(B!)}).` });
    const r = mMul(A, B!);
    return { ok: true, headline: { label: `A × B`, value: `${dims(r)} matrix` }, tables: [table("Result", r, dec)], steps: ["Entry (i, j) = sum over t of A(i, t) × B(t, j)."], notes: ["Matrix multiplication is not commutative: B × A is generally different (and may not exist)."] };
  }
  if (op === "scale") {
    const kq = qFromString(String(v.k).trim());
    if (!kq || k === null) return fail({ k: "Enter a valid scalar." });
    const r = mScale(A, kq);
    return { ok: true, headline: { label: `k × A`, value: `${dims(r)} matrix` }, tables: [table("Result", r, dec)] };
  }
  if (op === "trans") {
    const r = transpose(A);
    return { ok: true, headline: { label: `Transpose of A`, value: `${dims(r)} matrix` }, tables: [table("Aᵀ", r, dec)], steps: ["Rows become columns: Aᵀ(i, j) = A(j, i)."] };
  }
  if (op === "det") {
    const d = determinant(A);
    return {
      ok: true,
      headline: { label: "Determinant of A", value: dec ? cellText(d, true, 10) : qToFraction(d), sub: qIsZero(d) ? "The determinant is 0: A is singular and has no inverse." : "Non-zero, so A is invertible." },
      stats: [{ label: "Size", value: dims(A) }, { label: "Decimal value", value: cellText(d, true, 10) }],
      steps: ["Computed exactly by Gaussian elimination with fractions, so there is no rounding error."],
    };
  }
  if (op === "inv") {
    const r = inverse(A);
    if (!r) return fail({ A: "This matrix is singular (determinant 0), so it has no inverse." });
    return { ok: true, headline: { label: `Inverse of A`, value: `${dims(r)} matrix` }, tables: [table("A⁻¹", r, dec)], steps: ["Found exactly by Gauss–Jordan elimination.", "Check: A × A⁻¹ is the identity matrix."], stats: [{ label: "Determinant of A", value: qToFraction(determinant(A)) }] };
  }
  if (op === "pow") {
    const r = mPow(A, n as number);
    if (!r) return fail({ A: "A negative power needs an invertible matrix, but this matrix is singular." });
    return { ok: true, headline: { label: `A^${n}`, value: `${dims(r)} matrix` }, tables: [table(`A^${n}`, r, dec)], notes: n === 0 ? ["Any square matrix to the power 0 is the identity matrix."] : undefined };
  }
  const trace = square ? A.reduce((s, row, i) => qAdd(s, row[i]), Q0) : null;
  return {
    ok: true,
    headline: { label: "Rank of A", value: String(rankOf(A)), sub: `Matrix size ${dims(A)}` },
    stats: [
      { label: "Rank", value: String(rankOf(A)), hint: "Number of linearly independent rows" },
      { label: "Trace", value: trace ? cellText(trace, dec, 10) : "Needs a square matrix" },
      { label: "Full rank?", value: rankOf(A) === Math.min(rows(A), cols(A)) ? "Yes" : "No" },
    ],
  };
}

export default function MatrixWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
