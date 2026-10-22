/**
 * Arbitrary-precision decimal arithmetic on BigInt: value = coef × 10^exp.
 * Add, subtract, multiply, integer powers and square roots are exact;
 * division and roots are computed to a requested number of significant
 * digits and rounded half away from zero.
 */

export type Dec = { c: bigint; e: number };

export const MAX_ALIGN = 50_000;

export function normalize(d: Dec): Dec {
  if (d.c === 0n) return { c: 0n, e: 0 };
  let { c, e } = d;
  while (c % 10n === 0n) {
    c /= 10n;
    e += 1;
  }
  return { c, e };
}

/** Parse "123", "-1.5e-8", "3.5x10^-12", "2.3E11". */
export function parseDec(raw: string): Dec | null {
  let s = raw.replace(/[\s ,_]/g, "");
  if (s === "") return null;
  s = s.replace(/[x×*]10\^([+-]?\d+)$/i, "e$1").replace(/[x×]10([+-]?\d+)$/i, "e$1");
  const m = /^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(s);
  if (!m) return null;
  const ip = m[2] ?? "";
  const fp = m[3] ?? "";
  if (ip === "" && fp === "") return null;
  let c = BigInt(ip + fp || "0");
  if (m[1] === "-") c = -c;
  const ex = m[4] ? Number(m[4]) : 0;
  if (!Number.isFinite(ex) || Math.abs(ex) > 1_000_000) return null;
  return normalize({ c, e: ex - fp.length });
}

export function fromBigInt(n: bigint): Dec {
  return normalize({ c: n, e: 0 });
}

export function isZero(a: Dec): boolean {
  return a.c === 0n;
}

export function neg(a: Dec): Dec {
  return { c: -a.c, e: a.e };
}

function align(a: Dec, b: Dec): [bigint, bigint, number] | null {
  const diff = Math.abs(a.e - b.e);
  if (diff > MAX_ALIGN) return null;
  if (a.e === b.e) return [a.c, b.c, a.e];
  if (a.e > b.e) return [a.c * 10n ** BigInt(a.e - b.e), b.c, b.e];
  return [a.c, b.c * 10n ** BigInt(b.e - a.e), a.e];
}

export function add(a: Dec, b: Dec): Dec | null {
  const al = align(a, b);
  if (!al) return null;
  return normalize({ c: al[0] + al[1], e: al[2] });
}

export function sub(a: Dec, b: Dec): Dec | null {
  return add(a, neg(b));
}

export function mul(a: Dec, b: Dec): Dec {
  return normalize({ c: a.c * b.c, e: a.e + b.e });
}

export function digitCount(n: bigint): number {
  return (n < 0n ? -n : n).toString().length;
}

/** Round |c| to `sig` significant digits (half away from zero). */
export function roundSig(a: Dec, sig: number): Dec {
  const nd = digitCount(a.c);
  if (nd <= sig) return a;
  const drop = nd - sig;
  const p = 10n ** BigInt(drop);
  const neg = a.c < 0n;
  let c = neg ? -a.c : a.c;
  const rem = c % p;
  c /= p;
  if (rem * 2n >= p) c += 1n;
  return normalize({ c: neg ? -c : c, e: a.e + drop });
}

/** Round to `dp` digits after the decimal point (half away from zero). */
export function roundDp(a: Dec, dp: number): Dec {
  const target = -dp;
  if (a.e >= target) return a;
  const drop = target - a.e;
  const p = 10n ** BigInt(drop);
  const neg = a.c < 0n;
  let c = neg ? -a.c : a.c;
  const rem = c % p;
  c /= p;
  if (rem * 2n >= p) c += 1n;
  return normalize({ c: neg ? -c : c, e: target });
}

export function div(a: Dec, b: Dec, sig: number): Dec | null {
  if (b.c === 0n) return null;
  // Scale numerator so the integer quotient has at least sig + 2 digits.
  const need = sig + 2 + digitCount(b.c) - digitCount(a.c);
  const k = Math.max(0, need);
  const num = a.c * 10n ** BigInt(k);
  const quo = num / b.c;
  return roundSig(normalize({ c: quo, e: a.e - b.e - k }), sig);
}

export function isqrtBig(n: bigint): bigint {
  if (n < 2n) return n;
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
  while (true) {
    const y = (x + n / x) >> 1n;
    if (y >= x) return x;
    x = y;
  }
}

export function sqrtDec(a: Dec, sig: number): Dec | null {
  if (a.c < 0n) return null;
  if (a.c === 0n) return a;
  let { c, e } = a;
  if (e % 2 !== 0) {
    c *= 10n;
    e -= 1;
  }
  const extra = Math.max(0, 2 * (sig + 2) - digitCount(c));
  const evenExtra = extra + (extra % 2);
  c *= 10n ** BigInt(evenExtra);
  e -= evenExtra;
  const r = isqrtBig(c);
  return roundSig(normalize({ c: r, e: e / 2 }), sig);
}

export function powInt(a: Dec, n: number): Dec {
  return normalize({ c: a.c ** BigInt(n), e: a.e * n });
}

/** Plain decimal string with no exponent. */
export function toPlain(a: Dec): string {
  if (a.c === 0n) return "0";
  const neg = a.c < 0n;
  const digits = (neg ? -a.c : a.c).toString();
  let out: string;
  if (a.e >= 0) out = digits + "0".repeat(a.e);
  else {
    const dp = -a.e;
    if (digits.length > dp) out = digits.slice(0, digits.length - dp) + "." + digits.slice(digits.length - dp);
    else out = "0." + "0".repeat(dp - digits.length) + digits;
  }
  return (neg ? "-" : "") + out;
}

/** Scientific parts: mantissa string (d.ddd) and exponent. */
export function sciParts(a: Dec): { sign: string; mantissa: string; exponent: number } {
  if (a.c === 0n) return { sign: "", mantissa: "0", exponent: 0 };
  const neg = a.c < 0n;
  const digits = (neg ? -a.c : a.c).toString();
  const exponent = a.e + digits.length - 1;
  const mantissa = digits.length === 1 ? digits : digits[0] + "." + digits.slice(1);
  return { sign: neg ? "-" : "", mantissa, exponent };
}

export function toScientific(a: Dec): string {
  const p = sciParts(a);
  return `${p.sign}${p.mantissa} × 10^${p.exponent}`;
}

export function toENotation(a: Dec): string {
  const p = sciParts(a);
  return `${p.sign}${p.mantissa}e${p.exponent}`;
}

export function toEngineering(a: Dec): string {
  if (a.c === 0n) return "0 × 10^0";
  const p = sciParts(a);
  const shift = ((p.exponent % 3) + 3) % 3;
  const exp = p.exponent - shift;
  const digits = (a.c < 0n ? -a.c : a.c).toString();
  const intDigits = digits.slice(0, shift + 1).padEnd(shift + 1, "0");
  const rest = digits.slice(shift + 1);
  const mant = rest ? `${intDigits}.${rest}` : intDigits;
  return `${p.sign}${mant} × 10^${exp}`;
}

export function decToNumber(a: Dec): number {
  return Number(`${a.c}e${a.e}`);
}
