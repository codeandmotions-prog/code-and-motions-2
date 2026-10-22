/** Expression evaluator for the scientific calculator (recursive descent). */

export class ExprError extends Error {}

export type AngleMode = "deg" | "rad";

type Tok =
  | { t: "num"; v: number }
  | { t: "id"; v: string }
  | { t: "op"; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  const s = src
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/√\s*(\d+(?:\.\d+)?)/g, "sqrt($1)")
    .replace(/√/g, "sqrt")
    .replace(/\s+/g, "");
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
    if (m && /[\d.]/.test(ch)) {
      // Avoid swallowing the constant "e" that follows a number, e.g. "2e" is handled by id below.
      let txt = m[0];
      if (m[2] && !/^e[+-]?\d+$/i.test(m[2])) txt = m[1];
      out.push({ t: "num", v: Number(txt) });
      i += txt.length;
      continue;
    }
    if (/[a-zA-Zπ]/.test(ch)) {
      const idm = /^[a-zA-Zπ]+/.exec(s.slice(i));
      let name = idm ? idm[0].toLowerCase() : ch;
      if (name === "log" && s.slice(i + 3, i + 5) === "2(") name = "log2";
      out.push({ t: "id", v: name });
      i += name.length;
      continue;
    }
    if ("+-*/^()!%²³,".includes(ch)) {
      out.push({ t: "op", v: ch });
      i++;
      continue;
    }
    throw new ExprError(`Unexpected character "${ch}"`);
  }
  return out;
}

const FUNCS = new Set([
  "sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh",
  "ln", "log", "log2", "sqrt", "cbrt", "abs", "exp", "root",
]);

export function factorialNum(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new ExprError("Factorial needs a non-negative whole number");
  if (n > 170) throw new ExprError("Factorial is too large (maximum 170!)");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function cleanTrig(v: number): number {
  return Math.abs(v) < 1e-15 ? 0 : v;
}

export function evaluate(src: string, mode: AngleMode, ans: number): number {
  const toks = tokenize(src);
  if (toks.length === 0) throw new ExprError("Enter an expression");
  let pos = 0;
  const peek = () => toks[pos];
  const isOp = (v: string) => peek()?.t === "op" && (peek() as { v: string }).v === v;
  const toRad = (x: number) => (mode === "deg" ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (mode === "deg" ? (x * 180) / Math.PI : x);

  function expectClose() {
    if (!isOp(")")) throw new ExprError("Missing closing parenthesis");
    pos++;
  }

  function callFn(name: string, args: number[]): number {
    const a = args[0];
    switch (name) {
      case "sin": return cleanTrig(Math.sin(toRad(a)));
      case "cos": return cleanTrig(Math.cos(toRad(a)));
      case "tan": {
        const rad = toRad(a);
        if (mode === "deg" && Math.abs(((a % 180) + 180) % 180 - 90) < 1e-12) throw new ExprError("tan is undefined at this angle");
        return cleanTrig(Math.tan(rad));
      }
      case "asin":
        if (a < -1 || a > 1) throw new ExprError("asin needs a value between -1 and 1");
        return fromRad(Math.asin(a));
      case "acos":
        if (a < -1 || a > 1) throw new ExprError("acos needs a value between -1 and 1");
        return fromRad(Math.acos(a));
      case "atan": return fromRad(Math.atan(a));
      case "sinh": return Math.sinh(a);
      case "cosh": return Math.cosh(a);
      case "tanh": return Math.tanh(a);
      case "ln":
        if (a <= 0) throw new ExprError("ln needs a positive number");
        return Math.log(a);
      case "log":
        if (a <= 0) throw new ExprError("log needs a positive number");
        return Math.log10(a);
      case "log2":
        if (a <= 0) throw new ExprError("log2 needs a positive number");
        return Math.log2(a);
      case "sqrt":
        if (a < 0) throw new ExprError("Square root of a negative number is not real");
        return Math.sqrt(a);
      case "cbrt": return Math.cbrt(a);
      case "abs": return Math.abs(a);
      case "exp": return Math.exp(a);
      case "root": {
        const n = args[1];
        if (n === undefined) throw new ExprError("root(x, n) needs two arguments");
        if (n === 0) throw new ExprError("Root degree cannot be zero");
        if (a < 0) {
          if (Number.isInteger(n) && Math.abs(n) % 2 === 1) return -Math.pow(-a, 1 / n);
          throw new ExprError("Even root of a negative number is not real");
        }
        return Math.pow(a, 1 / n);
      }
      default: throw new ExprError(`Unknown function "${name}"`);
    }
  }

  function parsePrimary(): number {
    const tk = peek();
    if (!tk) throw new ExprError("Unexpected end of expression");
    if (tk.t === "num") {
      pos++;
      return tk.v;
    }
    if (tk.t === "id") {
      pos++;
      if (tk.v === "pi" || tk.v === "π") return Math.PI;
      if (tk.v === "e") return Math.E;
      if (tk.v === "ans") return ans;
      if (FUNCS.has(tk.v)) {
        if (!isOp("(")) throw new ExprError(`${tk.v} needs parentheses, e.g. ${tk.v}(30)`);
        pos++;
        const args = [parseAdd()];
        while (isOp(",")) {
          pos++;
          args.push(parseAdd());
        }
        expectClose();
        return callFn(tk.v, args);
      }
      throw new ExprError(`Unknown name "${tk.v}"`);
    }
    if (tk.v === "(") {
      pos++;
      const v = parseAdd();
      expectClose();
      return v;
    }
    throw new ExprError(`Unexpected "${tk.v}"`);
  }

  function parsePostfix(): number {
    let v = parsePrimary();
    while (true) {
      if (isOp("!")) { pos++; v = factorialNum(v); }
      else if (isOp("%")) { pos++; v = v / 100; }
      else if (isOp("²")) { pos++; v = v * v; }
      else if (isOp("³")) { pos++; v = v * v * v; }
      else break;
    }
    return v;
  }

  function parsePower(): number {
    const base = parsePostfix();
    if (isOp("^")) {
      pos++;
      const exp = parseUnary(); // right-associative, allows 2^-3
      const r = Math.pow(base, exp);
      if (Number.isNaN(r)) throw new ExprError("Result is not a real number");
      return r;
    }
    return base;
  }

  function parseUnary(): number {
    if (isOp("-")) { pos++; return -parseUnary(); }
    if (isOp("+")) { pos++; return parseUnary(); }
    return parsePower();
  }

  function startsOperand(): boolean {
    const tk = peek();
    if (!tk) return false;
    return tk.t === "num" || tk.t === "id" || (tk.t === "op" && tk.v === "(");
  }

  function parseMul(): number {
    let v = parseUnary();
    while (true) {
      if (isOp("*")) { pos++; v *= parseUnary(); }
      else if (isOp("/")) {
        pos++;
        const d = parseUnary();
        if (d === 0) throw new ExprError("Division by zero");
        v /= d;
      } else if (startsOperand()) {
        v *= parsePower(); // implicit multiplication: 2π, 3(4+5)
      } else break;
    }
    return v;
  }

  function parseAdd(): number {
    let v = parseMul();
    while (true) {
      if (isOp("+")) { pos++; v += parseMul(); }
      else if (isOp("-")) { pos++; v -= parseMul(); }
      else break;
    }
    return v;
  }

  const result = parseAdd();
  if (pos < toks.length) throw new ExprError("Check the expression: unexpected symbol");
  if (!Number.isFinite(result)) throw new ExprError("Result is too large or undefined");
  return result;
}

/** Display with 12 significant digits to hide binary floating-point noise. */
export function displayResult(v: number): string {
  if (v === 0) return "0";
  const abs = Math.abs(v);
  if (abs >= 1e15 || abs < 1e-9) {
    const [m, e] = Number(v.toPrecision(12)).toExponential().split("e");
    return `${m}e${e.replace("+", "")}`;
  }
  return String(Number(v.toPrecision(12)));
}
