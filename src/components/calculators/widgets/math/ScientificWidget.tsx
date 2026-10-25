"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator as CalcIcon, Delete, RotateCcw } from "lucide-react";
import { evaluate, displayResult, ExprError, type AngleMode } from "@/lib/calculators/expr";

type Key = { label: string; insert: string; aria?: string; tone?: "fn" | "num" | "op" };

const FN: Key[] = [
  { label: "sin", insert: "sin(" }, { label: "cos", insert: "cos(" }, { label: "tan", insert: "tan(" }, { label: "ln", insert: "ln(", aria: "natural logarithm" }, { label: "log", insert: "log(", aria: "logarithm base 10" },
  { label: "sin⁻¹", insert: "asin(", aria: "arcsine" }, { label: "cos⁻¹", insert: "acos(", aria: "arccosine" }, { label: "tan⁻¹", insert: "atan(", aria: "arctangent" }, { label: "√", insert: "sqrt(", aria: "square root" }, { label: "∛", insert: "cbrt(", aria: "cube root" },
  { label: "π", insert: "π", aria: "pi" }, { label: "e", insert: "e", aria: "Euler's number" }, { label: "xʸ", insert: "^", aria: "power" }, { label: "x²", insert: "^2", aria: "square" }, { label: "n!", insert: "!", aria: "factorial" },
  { label: "(", insert: "(" }, { label: ")", insert: ")" }, { label: "%", insert: "%", aria: "percent" }, { label: "|x|", insert: "abs(", aria: "absolute value" }, { label: "1/x", insert: "1/(", aria: "reciprocal" },
];

const NUM: Key[] = [
  { label: "7", insert: "7" }, { label: "8", insert: "8" }, { label: "9", insert: "9" }, { label: "÷", insert: "÷", aria: "divide" },
  { label: "4", insert: "4" }, { label: "5", insert: "5" }, { label: "6", insert: "6" }, { label: "×", insert: "×", aria: "multiply" },
  { label: "1", insert: "1" }, { label: "2", insert: "2" }, { label: "3", insert: "3" }, { label: "−", insert: "−", aria: "minus" },
  { label: "0", insert: "0" }, { label: ".", insert: ".", aria: "decimal point" }, { label: "×10ⁿ", insert: "×10^", aria: "times ten to the power" }, { label: "+", insert: "+", aria: "plus" },
];

type Entry = { expr: string; result: string; value: number };

const btn = "inline-flex min-h-11 items-center justify-center rounded-xl border border-(--color-line) bg-white px-1 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/50 hover:bg-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) active:scale-[0.98]";

function run(expr: string, mode: AngleMode, ans: number): { ok: true; value: number; text: string } | { ok: false; error: string } {
  try {
    const value = evaluate(expr, mode, ans);
    return { ok: true, value, text: displayResult(value) };
  } catch (e) {
    return { ok: false, error: e instanceof ExprError ? e.message : "Could not evaluate this expression." };
  }
}

const START = "sin(30) + 2^3 × √(16)";

export default function ScientificWidget() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [expr, setExpr] = useState(START);
  const [mode, setMode] = useState<AngleMode>("deg");
  const [ans, setAns] = useState<number>(() => {
    const r = run(START, "deg", 0);
    return r.ok ? r.value : 0;
  });
  const [history, setHistory] = useState<Entry[]>(() => {
    const r = run(START, "deg", 0);
    return r.ok ? [{ expr: START, result: r.text, value: r.value }] : [];
  });
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // The message sits above the keypad, so on a phone it can be off-screen after pressing =.
  useEffect(() => {
    const el = errorRef.current;
    if (!error || !el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    }
  }, [error]);
  const [isExample, setIsExample] = useState(true);

  function insert(text: string) {
    const el = inputRef.current;
    const start = el?.selectionStart ?? expr.length;
    const end = el?.selectionEnd ?? expr.length;
    const next = expr.slice(0, start) + text + expr.slice(end);
    setExpr(next);
    setError(null);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function backspace() {
    const el = inputRef.current;
    const start = el?.selectionStart ?? expr.length;
    const end = el?.selectionEnd ?? expr.length;
    let next: string;
    let pos: number;
    if (start !== end) {
      next = expr.slice(0, start) + expr.slice(end);
      pos = start;
    } else if (start > 0) {
      next = expr.slice(0, start - 1) + expr.slice(start);
      pos = start - 1;
    } else return;
    setExpr(next);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(pos, pos);
    });
  }

  function calculate() {
    if (expr.trim() === "") {
      setError("Type or tap an expression first.");
      return;
    }
    const r = run(expr, mode, ans);
    setIsExample(false);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    setError(null);
    setAns(r.value);
    setHistory((h) => [{ expr, result: r.text, value: r.value }, ...h].slice(0, 12));
  }

  function reset() {
    setExpr(START);
    setMode("deg");
    const r = run(START, "deg", 0);
    setAns(r.ok ? r.value : 0);
    setHistory(r.ok ? [{ expr: START, result: r.text, value: r.value }] : []);
    setError(null);
    setIsExample(true);
  }

  const last = history[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
        className="rounded-3xl border border-(--color-line) bg-white p-5 shadow-[0_24px_60px_-40px_rgba(11,28,77,0.35)] sm:p-8"
      >
        {error && (
          <div ref={errorRef} role="alert" className="mb-4 scroll-mt-28 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-900">
            {error}
          </div>
        )}
        <label htmlFor="sci-expr" className="block text-[13.5px] font-semibold text-(--color-ink)">
          Expression
        </label>
        <input
          id="sci-expr"
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          value={expr}
          onChange={(e) => {
            setExpr(e.target.value);
            setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby="sci-hint"
          className="mt-2 h-14 w-full rounded-xl border border-(--color-line) bg-white px-4 font-mono text-[17px] text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-blue) aria-[invalid=true]:border-red-500"
        />
        <p id="sci-hint" className="mt-1.5 text-[12.5px] leading-snug text-(--color-ink-soft)">
          Type directly or use the keys. Use * or × to multiply, ^ for powers, and root(x, n) for the nth root. Press Enter to calculate.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Angle unit for trigonometry">
          {(["deg", "rad"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) ${mode === m ? "border-(--color-blue) bg-(--color-blue) text-white" : "border-(--color-line) bg-white text-(--color-ink) hover:border-(--color-blue)/50"}`}
            >
              {m === "deg" ? "Degrees" : "Radians"}
            </button>
          ))}
          <button type="button" className={`${btn} px-4`} onClick={() => insert("ans")} aria-label="Insert previous answer">
            Ans
          </button>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2" role="group" aria-label="Functions">
          {FN.map((k) => (
            <button key={k.label} type="button" className={`${btn} bg-(--color-surface)`} aria-label={k.aria ?? k.label} onClick={() => insert(k.insert)}>
              {k.label}
            </button>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-2" role="group" aria-label="Digits and operators">
          {NUM.map((k) => (
            <button key={k.label} type="button" className={`${btn} min-h-12 text-[16px]`} aria-label={k.aria ?? k.label} onClick={() => insert(k.insert)}>
              {k.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-(--color-blue) px-7 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-navy-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)">
            <CalcIcon size={17} aria-hidden="true" />
            Calculate
          </button>
          <button type="button" onClick={backspace} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-(--color-line) bg-white px-5 text-[15px] font-semibold text-(--color-ink) hover:border-(--color-blue)/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)" aria-label="Delete last character">
            <Delete size={16} aria-hidden="true" />
            Delete
          </button>
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-(--color-line) bg-white px-6 text-[15px] font-semibold text-(--color-ink) hover:border-(--color-blue)/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)">
            <RotateCcw size={16} aria-hidden="true" />
            Reset
          </button>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-(--color-ink-soft)">
          Results use standard double-precision arithmetic and are shown to 12 significant digits. Factorials work up to 170!. Nothing you enter leaves your device.
        </p>
      </form>

      <div className="min-w-0 space-y-5" aria-live="polite" aria-label="Calculator results">
        {isExample && (
          <p className="rounded-xl bg-(--color-surface) px-4 py-2.5 text-[13px] text-(--color-ink-soft)">
            Showing an example. Type your own expression and press <strong>Calculate</strong>.
          </p>
        )}
        {last ? (
          <div className="rounded-2xl bg-(--color-navy-deep) px-6 py-6 text-white">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-cyan-soft)">Result ({mode === "deg" ? "degrees" : "radians"})</p>
            <p className="mt-2 break-all text-[32px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[38px]">{last.result}</p>
            <p className="mt-2 break-words font-mono text-[13.5px] text-white/70">{last.expr}</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-(--color-line) bg-(--color-surface) px-6 py-12 text-center text-[14.5px] text-(--color-ink-soft)">Enter an expression and press Calculate.</div>
        )}
        {history.length > 1 && (
          <div className="rounded-2xl border border-(--color-line) bg-white p-5">
            <h3 className="text-[14px] font-bold text-(--color-ink)">History</h3>
            <ul className="mt-3 divide-y divide-(--color-line)">
              {history.slice(1).map((h, i) => (
                <li key={`${h.expr}-${i}`} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[13px] text-(--color-ink-soft)">{h.expr}</p>
                    <p className="font-mono text-[15px] font-semibold text-(--color-ink)">= {h.result}</p>
                  </div>
                  <button type="button" onClick={() => insert(h.result)} className="shrink-0 rounded-full border border-(--color-line) px-3 py-1.5 text-[12.5px] font-semibold text-(--color-blue) hover:border-(--color-blue)/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)" aria-label={`Insert ${h.result} into the expression`}>
                    Use
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-2xl border border-(--color-line) bg-white p-5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          <p className="font-semibold text-(--color-ink)">Supported</p>
          <p className="mt-1">
            + − × ÷ ^ ! %, brackets, sin cos tan (and inverses), sinh cosh tanh, ln, log (base 10), log2, sqrt, cbrt, abs, exp, root(x, n), π, e and ans. Implicit multiplication such as 2π or 3(4+1) works.
          </p>
        </div>
      </div>
    </div>
  );
}
