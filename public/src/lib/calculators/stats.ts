/** Statistics and probability engines. */

export type Described = {
  n: number;
  sorted: number[];
  sum: number;
  sumSq: number;
  mean: number;
  median: number;
  modes: number[];
  modeCount: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  popVar: number;
  sampleVar: number | null;
  popSd: number;
  sampleSd: number | null;
  sem: number | null;
  geoMean: number | null;
  harmMean: number | null;
};

function medianOf(sorted: number[]): number {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function describe(values: number[]): Described {
  const n = values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((s, v) => s + v, 0);
  const sumSq = values.reduce((s, v) => s + v * v, 0);
  const mean = sum / n;
  // Two-pass sum of squared deviations for numerical stability.
  const ss = values.reduce((s, v) => s + (v - mean) * (v - mean), 0);
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let modeCount = 0;
  for (const c of counts.values()) modeCount = Math.max(modeCount, c);
  const modes =
    modeCount > 1 ? [...counts.entries()].filter(([, c]) => c === modeCount).map(([v]) => v).sort((a, b) => a - b) : [];
  const half = Math.floor(n / 2);
  const lower = sorted.slice(0, half);
  const upper = sorted.slice(n % 2 === 1 ? half + 1 : half);
  const q1 = lower.length ? medianOf(lower) : sorted[0];
  const q3 = upper.length ? medianOf(upper) : sorted[n - 1];
  const popVar = ss / n;
  const sampleVar = n > 1 ? ss / (n - 1) : null;
  const allPositive = sorted[0] > 0;
  return {
    n,
    sorted,
    sum,
    sumSq,
    mean,
    median: medianOf(sorted),
    modes,
    modeCount,
    min: sorted[0],
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0],
    q1,
    q3,
    iqr: q3 - q1,
    popVar,
    sampleVar,
    popSd: Math.sqrt(popVar),
    sampleSd: sampleVar === null ? null : Math.sqrt(sampleVar),
    sem: sampleVar === null ? null : Math.sqrt(sampleVar / n),
    geoMean: allPositive ? Math.exp(values.reduce((s, v) => s + Math.log(v), 0) / n) : null,
    harmMean: allPositive ? n / values.reduce((s, v) => s + 1 / v, 0) : null,
  };
}

/* ---------- Normal distribution ---------- */

const SQRT2 = Math.SQRT2;
const SQRTPI = Math.sqrt(Math.PI);

/** erf via a positive-term series (no cancellation); accurate to ~1e-15 for |x| < 3. */
function erfSeries(x: number): number {
  const x2 = x * x;
  let term = x;
  let sum = x;
  for (let n = 1; n < 200; n++) {
    term *= (2 * x2) / (2 * n + 1);
    sum += term;
    if (Math.abs(term) < 1e-17 * Math.abs(sum)) break;
  }
  return ((2 / SQRTPI) * Math.exp(-x2) * sum);
}

/** erfc for x >= 0. */
export function erfc(x: number): number {
  if (x < 0) return 2 - erfc(-x);
  if (x < 3) return 1 - erfSeries(x);
  let t = x;
  for (let k = 80; k >= 1; k--) t = x + k / 2 / t;
  return Math.exp(-x * x) / SQRTPI / t;
}

export function normalCdf(z: number): number {
  if (z === Infinity) return 1;
  if (z === -Infinity) return 0;
  return z >= 0 ? 1 - 0.5 * erfc(z / SQRT2) : 0.5 * erfc(-z / SQRT2);
}

/** Upper tail P(Z > z) without cancellation. */
export function normalSf(z: number): number {
  return normalCdf(-z);
}

export function normalPdf(z: number): number {
  return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}

/** Inverse of the standard normal CDF (Acklam + one Halley step). */
export function normalInv(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let x: number;
  if (p < pl) {
    const qv = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * qv + c[1]) * qv + c[2]) * qv + c[3]) * qv + c[4]) * qv + c[5]) / ((((d[0] * qv + d[1]) * qv + d[2]) * qv + d[3]) * qv + 1);
  } else if (p <= 1 - pl) {
    const qv = p - 0.5;
    const r = qv * qv;
    x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * qv) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    const qv = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[0] * qv + c[1]) * qv + c[2]) * qv + c[3]) * qv + c[4]) * qv + c[5]) / ((((d[0] * qv + d[1]) * qv + d[2]) * qv + d[3]) * qv + 1);
  }
  for (let i = 0; i < 2; i++) {
    const e = normalCdf(x) - p;
    const u = e * Math.sqrt(2 * Math.PI) * Math.exp((x * x) / 2);
    x = x - u / (1 + (x * u) / 2);
  }
  return x;
}

/** Two-sided critical z for a confidence level in percent. */
export function zCritical(confidencePct: number): number {
  return normalInv(1 - (1 - confidencePct / 100) / 2);
}

/* ---------- Student's t ---------- */

function lgamma(x: number): number {
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function betacf(a: number, b: number, x: number): number {
  const FPMIN = 1e-300;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return h;
}

/** Regularised incomplete beta I_x(a, b). */
export function betaInc(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  if (x < (a + 1) / (a + b + 2)) return (bt * betacf(a, b, x)) / a;
  return 1 - (bt * betacf(b, a, 1 - x)) / b;
}

export function tCdf(t: number, df: number): number {
  const x = df / (df + t * t);
  const tail = 0.5 * betaInc(x, df / 2, 0.5);
  return t >= 0 ? 1 - tail : tail;
}

/** Quantile of Student's t for probability p (0 < p < 1). */
export function tInv(p: number, df: number): number {
  if (p === 0.5) return 0;
  const sign = p < 0.5 ? -1 : 1;
  const target = p < 0.5 ? 1 - p : p;
  let lo = 0;
  let hi = 1;
  while (tCdf(hi, df) < target && hi < 1e12) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (tCdf(mid, df) < target) lo = mid;
    else hi = mid;
  }
  return (sign * (lo + hi)) / 2;
}

export function tCritical(confidencePct: number, df: number): number {
  return tInv(1 - (1 - confidencePct / 100) / 2, df);
}

/* ---------- Sample size ---------- */

export function sampleSizeFor(
  confidencePct: number,
  marginPct: number,
  proportionPct: number,
  population: number | null,
) {
  const z = zCritical(confidencePct);
  const p = proportionPct / 100;
  const e = marginPct / 100;
  const n0 = (z * z * p * (1 - p)) / (e * e);
  const nFinite = population === null ? n0 : n0 / (1 + (n0 - 1) / population);
  return { z, n0, required: Math.ceil(nFinite - 1e-9), unlimitedRequired: Math.ceil(n0 - 1e-9) };
}

export function marginOfErrorFor(
  confidencePct: number,
  sampleSize: number,
  proportionPct: number,
  population: number | null,
) {
  const z = zCritical(confidencePct);
  const p = proportionPct / 100;
  let moe = z * Math.sqrt((p * (1 - p)) / sampleSize);
  if (population !== null && population > 1) {
    moe *= Math.sqrt((population - sampleSize) / (population - 1));
  }
  return { z, marginPct: moe * 100 };
}

/* ---------- Binomial ---------- */

/** P(exactly k successes in n trials). */
export function binomialPmf(n: number, k: number, p: number): number {
  if (k < 0 || k > n) return 0;
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  const lc = lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);
  return Math.exp(lc + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
