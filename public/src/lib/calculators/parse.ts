/**
 * Input parsing shared by every calculator.
 *
 * Numbers are typed as text so that users in the US, UK, France, Spain and
 * the rest of Europe can use their own conventions. Rules (also stated on
 * the site):
 *  - A point is a decimal point: 1.5
 *  - Commas grouped in threes are thousands separators: 1,250,000
 *  - A single comma followed by anything else is a decimal comma: 1,5
 *  - Spaces, thin spaces and apostrophes are ignored: 1 250 000
 *  - Fractions such as 3/4 are accepted where a calculator says so.
 */

export function normalizeDecimal(raw: string): string | null {
  let s = raw.replace(/[\s  ']/g, "");
  if (s === "") return null;
  let exp = "";
  const eIdx = s.search(/[eE]/);
  if (eIdx >= 0) {
    exp = s.slice(eIdx + 1);
    s = s.slice(0, eIdx);
    if (!/^[+-]?\d+$/.test(exp)) return null;
  }
  let sign = "";
  if (s[0] === "+" || s[0] === "-") {
    sign = s[0] === "-" ? "-" : "";
    s = s.slice(1);
  }
  if (s === "") return null;
  const hasDot = s.includes(".");
  const hasComma = s.includes(",");
  if (hasDot && hasComma) {
    const decimalSep = s.lastIndexOf(".") > s.lastIndexOf(",") ? "." : ",";
    const groupSep = decimalSep === "." ? "," : ".";
    const parts = s.split(decimalSep);
    if (parts.length !== 2) return null;
    const intPart = parts[0];
    if (!new RegExp(`^\\d{1,3}(\\${groupSep}\\d{3})*$`).test(intPart)) return null;
    s = intPart.split(groupSep).join("") + "." + parts[1];
  } else if (hasComma) {
    if (/^\d{1,3}(,\d{3})+$/.test(s)) s = s.replace(/,/g, "");
    else if ((s.match(/,/g) ?? []).length === 1) s = s.replace(",", ".");
    else return null;
  } else if (hasDot) {
    if ((s.match(/\./g) ?? []).length > 1) {
      if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
      else return null;
    }
  }
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return sign + s + (exp ? "e" + exp : "");
}

/** Parse a real number (decimal, e-notation, or a fraction like 3/4). */
export function parseNumber(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  if (t.includes("/")) {
    const parts = t.split("/");
    if (parts.length !== 2) return null;
    const a = parseNumber(parts[0]);
    const b = parseNumber(parts[1]);
    if (a === null || b === null || b === 0) return null;
    return a / b;
  }
  const n = normalizeDecimal(t);
  if (n === null) return null;
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

/** Parse an integer of any size (digits with optional grouping and sign). */
export function parseBigInt(raw: string): bigint | null {
  const s = raw.replace(/[\s  ',_]/g, "");
  if (!/^[+-]?\d+$/.test(s)) return null;
  return BigInt(s);
}

export type ListParse = { values: number[]; invalid: string[] };

/**
 * Parse a list of numbers. Separators: commas, spaces, semicolons or new
 * lines. If the text contains a semicolon or newline, only those split the
 * list, so decimal commas ("1,5; 2,5") can be used.
 */
export function parseList(raw: string): ListParse {
  const strong = /[;\n\r]/.test(raw);
  const tokens = (strong ? raw.split(/[;\n\r]+/) : raw.split(/[\s,]+/))
    .map((t) => t.trim())
    .filter((t) => t !== "");
  const values: number[] = [];
  const invalid: string[] = [];
  for (const t of tokens) {
    const v = parseNumber(t);
    if (v === null) invalid.push(t);
    else values.push(v);
  }
  return { values, invalid };
}

export function parseBigIntList(raw: string): { values: bigint[]; invalid: string[] } {
  const tokens = raw
    .split(/[\s,;]+/)
    .map((t) => t.trim())
    .filter((t) => t !== "");
  const values: bigint[] = [];
  const invalid: string[] = [];
  for (const t of tokens) {
    const v = parseBigInt(t);
    if (v === null) invalid.push(t);
    else values.push(v);
  }
  return { values, invalid };
}

/** "YYYY-MM-DD" -> UTC y/m/d, or null. */
export function parseISODate(s: string): { y: number; m: number; d: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return { y, m: mo, d };
}
