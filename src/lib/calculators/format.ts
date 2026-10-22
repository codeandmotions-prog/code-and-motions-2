/**
 * Number formatting. Always en-US so server and client render identically
 * (no hydration mismatch); the site states its input and output convention.
 */

export function fmt(n: number, sig = 8): string {
  if (!Number.isFinite(n)) return String(n);
  if (n === 0 || Object.is(n, -0)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e15 || abs < 1e-6) {
    const [m, e] = n.toExponential(Math.max(0, sig - 1)).split("e");
    const mant = m.includes(".") ? m.replace(/0+$/, "").replace(/\.$/, "") : m;
    return `${mant}e${e.replace("+", "")}`;
  }
  const rounded = Number(n.toPrecision(sig));
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 12 });
}

/** Fixed decimals with grouping. */
export function fixed(n: number, dp = 2): string {
  if (!Number.isFinite(n)) return String(n);
  const v = Math.abs(n) < 0.5 * Math.pow(10, -dp) ? 0 : n;
  return v.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

export type CurrencyCode = "USD" | "GBP" | "EUR";

export function money(n: number, currency: CurrencyCode = "USD", dp = 2): string {
  if (!Number.isFinite(n)) return String(n);
  const v = Math.abs(n) < 0.5 * Math.pow(10, -dp) ? 0 : n;
  return v.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

export function pct(n: number, dp = 2): string {
  return `${fixed(n, dp)}%`;
}

/** Group digits of a big integer string with thin commas. */
export function groupDigits(s: string): string {
  const neg = s.startsWith("-");
  const body = neg ? s.slice(1) : s;
  return (neg ? "-" : "") + body.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** English ordinal for a positive integer: 1st, 2nd, 3rd, 4th, 11th, 21st … */
export function ordinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}
