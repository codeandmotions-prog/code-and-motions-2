/** Binary / hexadecimal arithmetic on arbitrary-size signed integers. */

export type Radix = 2 | 16;

const DIGITS = "0123456789abcdef";

export function parseRadix(raw: string, radix: Radix): bigint | null {
  let s = raw.replace(/[\s_]/g, "").toLowerCase();
  if (s === "") return null;
  let neg = false;
  if (s[0] === "-") {
    neg = true;
    s = s.slice(1);
  } else if (s[0] === "+") {
    s = s.slice(1);
  }
  if (radix === 16 && s.startsWith("0x")) s = s.slice(2);
  if (radix === 2 && s.startsWith("0b")) s = s.slice(2);
  if (s === "") return null;
  const pattern = radix === 2 ? /^[01]+$/ : /^[0-9a-f]+$/;
  if (!pattern.test(s)) return null;
  const v = BigInt((radix === 16 ? "0x" : "0b") + s);
  return neg ? -v : v;
}

export function toRadix(v: bigint, radix: Radix): string {
  const neg = v < 0n;
  const s = (neg ? -v : v).toString(radix);
  return (neg ? "-" : "") + (radix === 16 ? s.toUpperCase() : s);
}

/** Fractional expansion of a/b in a radix to `digits` places (truncated). */
export function fractionDigits(rem: bigint, divisor: bigint, radix: Radix, digits: number): string {
  let out = "";
  rem = rem < 0n ? -rem : rem;
  divisor = divisor < 0n ? -divisor : divisor;
  const r = BigInt(radix);
  for (let i = 0; i < digits && rem !== 0n; i++) {
    rem *= r;
    out += DIGITS[Number(rem / divisor)];
    rem %= divisor;
  }
  return (radix === 16 ? out.toUpperCase() : out) + (rem !== 0n ? "…" : "");
}

export function groupBinary(s: string): string {
  const neg = s.startsWith("-");
  const body = neg ? s.slice(1) : s;
  const padded = body.padStart(Math.ceil(body.length / 4) * 4, "0");
  return (neg ? "-" : "") + padded.replace(/(.{4})(?=.)/g, "$1 ");
}
