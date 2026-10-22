/** Exact rational arithmetic on BigInt (used by fraction and matrix tools). */

export type Q = { n: bigint; d: bigint };

export const absB = (a: bigint): bigint => (a < 0n ? -a : a);

export function gcdB(a: bigint, b: bigint): bigint {
  a = absB(a);
  b = absB(b);
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcmB(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  return absB(a / gcdB(a, b) * b);
}

export function q(n: bigint, d: bigint = 1n): Q {
  if (d === 0n) throw new Error("Division by zero");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = gcdB(n, d) || 1n;
  return { n: n / g, d: d / g };
}

export const Q0: Q = { n: 0n, d: 1n };
export const Q1: Q = { n: 1n, d: 1n };

export const qAdd = (a: Q, b: Q): Q => q(a.n * b.d + b.n * a.d, a.d * b.d);
export const qSub = (a: Q, b: Q): Q => q(a.n * b.d - b.n * a.d, a.d * b.d);
export const qMul = (a: Q, b: Q): Q => q(a.n * b.n, a.d * b.d);
export const qDiv = (a: Q, b: Q): Q => {
  if (b.n === 0n) throw new Error("Division by zero");
  return q(a.n * b.d, a.d * b.n);
};
export const qNeg = (a: Q): Q => ({ n: -a.n, d: a.d });
export const qIsZero = (a: Q): boolean => a.n === 0n;
export const qCmp = (a: Q, b: Q): number => {
  const l = a.n * b.d;
  const r = b.n * a.d;
  return l < r ? -1 : l > r ? 1 : 0;
};
export const qPow = (a: Q, e: number): Q => {
  let result = Q1;
  let base = a;
  let n = Math.abs(e);
  while (n > 0) {
    if (n & 1) result = qMul(result, base);
    base = qMul(base, base);
    n >>= 1;
  }
  return e < 0 ? qDiv(Q1, result) : result;
};

/** Parse "12", "-3.75", "1.5e3" or "3/4" into an exact rational. */
export function qFromString(raw: string): Q | null {
  const s = raw.replace(/[\s ]/g, "");
  if (s === "") return null;
  if (s.includes("/")) {
    const parts = s.split("/");
    if (parts.length !== 2) return null;
    const a = qFromString(parts[0]);
    const b = qFromString(parts[1]);
    if (!a || !b || b.n === 0n) return null;
    return qDiv(a, b);
  }
  const m = /^([+-]?)(\d*)(?:[.,](\d*))?(?:[eE]([+-]?\d+))?$/.exec(s);
  if (!m) return null;
  const intPart = m[2] ?? "";
  const frac = m[3] ?? "";
  if (intPart === "" && frac === "") return null;
  let n = BigInt((intPart + frac) || "0");
  if (m[1] === "-") n = -n;
  let scale = BigInt(frac.length);
  if (m[4]) {
    const e = Number(m[4]);
    if (Math.abs(e) > 5000) return null;
    scale -= BigInt(e);
  }
  return scale >= 0n ? q(n, 10n ** scale) : q(n * 10n ** -scale, 1n);
}

export function qToNumber(a: Q): number {
  // Scale to keep precision for huge numerators/denominators.
  const neg = a.n < 0n;
  const n = absB(a.n);
  const ns = n.toString().length;
  const ds = a.d.toString().length;
  const shift = Math.max(0, Math.min(ns, ds) - 300);
  const nn = shift > 0 ? n / 10n ** BigInt(shift) : n;
  const dd = shift > 0 ? a.d / 10n ** BigInt(shift) : a.d;
  const v = Number(nn) / Number(dd);
  return neg ? -v : v;
}

/** Fraction text: "n/d" or an integer. */
export function qToFraction(a: Q): string {
  return a.d === 1n ? a.n.toString() : `${a.n}/${a.d}`;
}

/** Mixed number text: "2 1/3" (or integer / proper fraction). */
export function qToMixed(a: Q): string {
  if (a.d === 1n) return a.n.toString();
  const neg = a.n < 0n;
  const n = absB(a.n);
  const whole = n / a.d;
  const rem = n % a.d;
  const sign = neg ? "-" : "";
  if (whole === 0n) return `${sign}${rem}/${a.d}`;
  return `${sign}${whole} ${rem}/${a.d}`;
}

/**
 * Decimal expansion with repeating part detected by long division.
 * Returns e.g. { text: "0.1(6)", exact: false }.
 */
export function qToDecimal(a: Q, maxDigits = 40): { text: string; repeating: boolean; truncated: boolean } {
  const neg = a.n < 0n;
  const n = absB(a.n);
  const intPart = n / a.d;
  let rem = n % a.d;
  if (rem === 0n) return { text: `${neg ? "-" : ""}${intPart}`, repeating: false, truncated: false };
  const digits: string[] = [];
  const seen = new Map<string, number>();
  let repeatStart = -1;
  while (rem !== 0n && digits.length < maxDigits) {
    const key = rem.toString();
    if (seen.has(key)) {
      repeatStart = seen.get(key)!;
      break;
    }
    seen.set(key, digits.length);
    rem *= 10n;
    digits.push((rem / a.d).toString());
    rem %= a.d;
  }
  const sign = neg ? "-" : "";
  if (repeatStart >= 0) {
    const nonRep = digits.slice(0, repeatStart).join("");
    const rep = digits.slice(repeatStart).join("");
    return { text: `${sign}${intPart}.${nonRep}(${rep})`, repeating: true, truncated: false };
  }
  const truncated = rem !== 0n;
  return { text: `${sign}${intPart}.${digits.join("")}${truncated ? "…" : ""}`, repeating: false, truncated };
}
