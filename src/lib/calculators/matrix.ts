import { Q, Q0, Q1, q, qAdd, qSub, qMul, qDiv, qIsZero, qNeg, qToFraction, qToNumber } from "./rational";

export type Matrix = Q[][];

export const rows = (m: Matrix) => m.length;
export const cols = (m: Matrix) => (m.length ? m[0].length : 0);

export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? Q1 : Q0)));
}

export function mAdd(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((v, j) => qAdd(v, b[i][j])));
}

export function mSub(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((v, j) => qSub(v, b[i][j])));
}

export function mScale(a: Matrix, k: Q): Matrix {
  return a.map((row) => row.map((v) => qMul(v, k)));
}

export function mMul(a: Matrix, b: Matrix): Matrix {
  const n = rows(a);
  const m = cols(b);
  const k = cols(a);
  const out: Matrix = Array.from({ length: n }, () => Array.from({ length: m }, () => Q0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let s = Q0;
      for (let t = 0; t < k; t++) s = qAdd(s, qMul(a[i][t], b[t][j]));
      out[i][j] = s;
    }
  }
  return out;
}

export function transpose(a: Matrix): Matrix {
  return Array.from({ length: cols(a) }, (_, j) => a.map((row) => row[j]));
}

/** Determinant by fraction Gaussian elimination (exact). */
export function determinant(a: Matrix): Q {
  const n = rows(a);
  const m = a.map((r) => [...r]);
  let det = Q1;
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && qIsZero(m[p][c])) p++;
    if (p === n) return Q0;
    if (p !== c) {
      [m[p], m[c]] = [m[c], m[p]];
      det = qNeg(det);
    }
    det = qMul(det, m[c][c]);
    for (let r = c + 1; r < n; r++) {
      if (qIsZero(m[r][c])) continue;
      const f = qDiv(m[r][c], m[c][c]);
      for (let k = c; k < n; k++) m[r][k] = qSub(m[r][k], qMul(f, m[c][k]));
    }
  }
  return det;
}

/** Inverse by Gauss-Jordan elimination (exact); null when singular. */
export function inverse(a: Matrix): Matrix | null {
  const n = rows(a);
  const m = a.map((r, i) => [...r, ...identity(n)[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && qIsZero(m[p][c])) p++;
    if (p === n) return null;
    [m[p], m[c]] = [m[c], m[p]];
    const pivot = m[c][c];
    m[c] = m[c].map((v) => qDiv(v, pivot));
    for (let r = 0; r < n; r++) {
      if (r === c || qIsZero(m[r][c])) continue;
      const f = m[r][c];
      m[r] = m[r].map((v, k) => qSub(v, qMul(f, m[c][k])));
    }
  }
  return m.map((r) => r.slice(n));
}

/** Integer power; negative exponents use the inverse. null when singular. */
export function mPow(a: Matrix, e: number): Matrix | null {
  let base: Matrix | null = e < 0 ? inverse(a) : a;
  if (base === null) return null;
  let n = Math.abs(e);
  let result = identity(rows(a));
  while (n > 0) {
    if (n & 1) result = mMul(result, base);
    n >>= 1;
    if (n > 0) base = mMul(base, base);
  }
  return result;
}

export function cellText(v: Q, asDecimal: boolean, dp = 6): string {
  if (!asDecimal) return qToFraction(v);
  if (v.d === 1n) return v.n.toString();
  const x = qToNumber(v);
  return String(Number(x.toFixed(dp)));
}

export { q };
