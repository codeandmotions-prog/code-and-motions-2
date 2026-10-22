/** Assorted maths engines: percent, ratio, exponent, log, root, half-life, quadratic, rounding, sequences. */
import { Q, q, qFromString, qMul, qDiv, qSub, qAdd, qToDecimal, absB, gcdB } from "./rational";

/* ---------- Percentages ---------- */

export const percentOf = (pct: number, of: number) => (pct / 100) * of;
export const whatPercent = (part: number, whole: number) => (part / whole) * 100;
export const wholeFromPercent = (part: number, pct: number) => (part * 100) / pct;
export const percentChange = (from: number, to: number) => ((to - from) / Math.abs(from)) * 100;
export const percentDifference = (a: number, b: number) => (Math.abs(a - b) / ((Math.abs(a) + Math.abs(b)) / 2)) * 100;

/* ---------- Percent error ---------- */

export function percentError(observed: number, trueValue: number) {
  const signed = ((observed - trueValue) / trueValue) * 100;
  return { absoluteError: Math.abs(observed - trueValue), signedPct: signed, pct: Math.abs(signed) };
}

/* ---------- Roots ---------- */

/** Simplify sqrt(n) for a positive integer as k√m (k outside, m inside). */
export function simplifySqrt(n: number): { outside: number; inside: number } {
  let outside = 1;
  let inside = n;
  for (let p = 2; p * p <= inside; p++) {
    while (inside % (p * p) === 0) {
      inside /= p * p;
      outside *= p;
    }
  }
  return { outside, inside };
}

export function isPerfectPower(n: number, k: number): boolean {
  if (!Number.isInteger(n) || n < 0) return false;
  const r = Math.round(Math.pow(n, 1 / k));
  return Math.pow(r, k) === n;
}

export function realRoot(x: number, n: number): { value?: number; complexImag?: number; error?: string } {
  if (n === 0) return { error: "The root degree cannot be zero." };
  if (x >= 0) return { value: Math.pow(x, 1 / n) };
  if (Number.isInteger(n) && Math.abs(n) % 2 === 1) return { value: -Math.pow(-x, 1 / n) };
  if (n === 2) return { complexImag: Math.sqrt(-x) };
  return { error: "An even root of a negative number is not a real number." };
}

/* ---------- Quadratic ---------- */

export function solveQuadratic(a: number, b: number, c: number) {
  const disc = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  if (disc > 0) {
    // Numerically stable roots (avoid cancellation).
    const sq = Math.sqrt(disc);
    const t = -0.5 * (b + Math.sign(b || 1) * sq);
    const r1 = t / a;
    const r2 = c / t;
    const [lo, hi] = r1 < r2 ? [r1, r2] : [r2, r1];
    return { disc, kind: "two real roots" as const, roots: [lo, hi], vertexX, vertexY };
  }
  if (disc === 0) return { disc, kind: "one repeated real root" as const, roots: [vertexX], vertexX, vertexY };
  const re = -b / (2 * a);
  const im = Math.sqrt(-disc) / (2 * Math.abs(a));
  return { disc, kind: "two complex roots" as const, complex: { re, im }, vertexX, vertexY };
}

/* ---------- Half-life ---------- */

export const LN2 = Math.LN2;

export function remainingAfter(n0: number, t: number, halfLife: number) {
  return n0 * Math.pow(0.5, t / halfLife);
}
export function timeToReach(n0: number, nt: number, halfLife: number) {
  return (halfLife * Math.log(n0 / nt)) / LN2;
}
export function halfLifeFrom(n0: number, nt: number, t: number) {
  return (t * LN2) / Math.log(n0 / nt);
}
export function initialFrom(nt: number, t: number, halfLife: number) {
  return nt * Math.pow(2, t / halfLife);
}
export const meanLifetimeFromHalfLife = (h: number) => h / LN2;
export const decayConstantFromHalfLife = (h: number) => LN2 / h;

/* ---------- Ratios ---------- */

export function simplifyRatio(values: bigint[]): bigint[] {
  const g = values.reduce((acc, v) => gcdB(acc, v), 0n);
  return g === 0n ? values : values.map((v) => v / g);
}

/* ---------- Rounding (exact, on decimal text) ---------- */

export type RoundMode =
  | "half-away"
  | "half-up"
  | "half-down"
  | "half-even"
  | "half-odd"
  | "half-toward-zero"
  | "ceiling"
  | "floor"
  | "away"
  | "toward";

export const ROUND_MODES: { id: RoundMode; label: string; hint: string }[] = [
  { id: "half-away", label: "Round half away from zero (standard)", hint: "2.5 → 3, −2.5 → −3" },
  { id: "half-up", label: "Round half up (towards +∞)", hint: "2.5 → 3, −2.5 → −2" },
  { id: "half-down", label: "Round half down (towards −∞)", hint: "2.5 → 2, −2.5 → −3" },
  { id: "half-even", label: "Round half to even (banker's rounding)", hint: "2.5 → 2, 3.5 → 4" },
  { id: "half-odd", label: "Round half to odd", hint: "2.5 → 3, 3.5 → 3" },
  { id: "half-toward-zero", label: "Round half towards zero", hint: "2.5 → 2, −2.5 → −2" },
  { id: "ceiling", label: "Always round up (ceiling, towards +∞)", hint: "2.1 → 3, −2.9 → −2" },
  { id: "floor", label: "Always round down (floor, towards −∞)", hint: "2.9 → 2, −2.1 → −3" },
  { id: "away", label: "Round away from zero", hint: "2.1 → 3, −2.1 → −3" },
  { id: "toward", label: "Round towards zero (truncate)", hint: "2.9 → 2, −2.9 → −2" },
];

function floorDiv(n: bigint, d: bigint): bigint {
  const qv = n / d;
  return n % d !== 0n && n < 0n !== d < 0n ? qv - 1n : qv;
}

/** Round the rational x to an integer using the given rule. */
export function roundRationalToInt(x: Q, mode: RoundMode): bigint {
  const f = floorDiv(x.n, x.d);
  const rem = q(x.n - f * x.d, x.d); // 0 <= rem < 1
  if (rem.n === 0n) return f;
  const cmpHalf = rem.n * 2n - rem.d; // sign of (rem - 1/2)
  const neg = x.n < 0n;
  switch (mode) {
    case "ceiling": return f + 1n;
    case "floor": return f;
    case "away": return neg ? f : f + 1n;
    case "toward": return neg ? f + 1n : f;
    default: break;
  }
  if (cmpHalf < 0n) return f;
  if (cmpHalf > 0n) return f + 1n;
  switch (mode) {
    case "half-up": return f + 1n;
    case "half-down": return f;
    case "half-even": return f % 2n === 0n ? f : f + 1n;
    case "half-odd": return f % 2n !== 0n ? f : f + 1n;
    case "half-away": return neg ? f : f + 1n;
    case "half-toward-zero": return neg ? f + 1n : f;
    default: return f;
  }
}

/** Round to a number of decimal places (negative = tens, hundreds, ...). Returns exact decimal text. */
export function roundToPlaces(x: Q, places: number, mode: RoundMode): { text: string; q: Q } {
  const scale = places >= 0 ? q(10n ** BigInt(places)) : q(1n, 10n ** BigInt(-places));
  const scaled = qMul(x, scale);
  const k = roundRationalToInt(scaled, mode);
  const result = qDiv(q(k), scale);
  return { text: qToDecimal(result, 60).text, q: result };
}

export function roundToFraction(x: Q, denominator: number, mode: RoundMode): { k: bigint; result: Q } {
  const d = BigInt(denominator);
  const k = roundRationalToInt(qMul(x, q(d)), mode);
  return { k, result: q(k, d) };
}

export { qFromString, qSub, qAdd, absB };
