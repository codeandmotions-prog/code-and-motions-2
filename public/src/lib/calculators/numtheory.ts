import { absB, gcdB, lcmB } from "./rational";

export function gcdMany(values: bigint[]): bigint {
  return values.reduce((g, v) => gcdB(g, v), 0n);
}

export function lcmMany(values: bigint[]): bigint {
  return values.reduce((l, v) => lcmB(l, v), 1n);
}

/** Euclid steps for gcd(a, b) as text lines. */
export function euclidSteps(a: bigint, b: bigint): string[] {
  let x = absB(a);
  let y = absB(b);
  if (x < y) [x, y] = [y, x];
  const steps: string[] = [];
  while (y !== 0n) {
    const quo = x / y;
    const rem = x % y;
    steps.push(`${x} = ${y} × ${quo} + ${rem}`);
    x = y;
    y = rem;
  }
  return steps;
}

export const FACTOR_LIMIT = 1e15;

/** Prime factorisation by trial division (n up to FACTOR_LIMIT). */
export function factorize(n: number): [number, number][] {
  const out: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    if (m % p === 0) {
      let e = 0;
      while (m % p === 0) {
        m /= p;
        e++;
      }
      out.push([p, e]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

export function factorsFromPrimes(pf: [number, number][]): number[] {
  let divs = [1];
  for (const [p, e] of pf) {
    const next: number[] = [];
    let pk = 1;
    for (let k = 0; k <= e; k++) {
      for (const d of divs) next.push(d * pk);
      pk *= p;
    }
    divs = next;
  }
  return divs.sort((a, b) => a - b);
}

export function primeFactorText(pf: [number, number][]): string {
  if (pf.length === 0) return "1";
  return pf.map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`)).join(" × ");
}

export function primeFactorExpanded(pf: [number, number][]): string {
  if (pf.length === 0) return "1";
  return pf.flatMap(([p, e]) => Array(e).fill(String(p))).join(" × ");
}

/** nPr and nCr for big n, r (without replacement), exact. */
export function permutations(n: number, r: number): bigint {
  let result = 1n;
  for (let i = 0; i < r; i++) result *= BigInt(n - i);
  return result;
}

export function combinations(n: number, r: number): bigint {
  const k = Math.min(r, n - r);
  let result = 1n;
  for (let i = 1; i <= k; i++) {
    result = (result * BigInt(n - k + i)) / BigInt(i);
  }
  return result;
}

export function factorialBig(n: number): bigint {
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
}
