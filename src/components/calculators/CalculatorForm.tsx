"use client";

import { useId, useRef, useState } from "react";
import { Calculator as CalcIcon, RotateCcw } from "lucide-react";
import type { CalcOutcome } from "@/lib/calculators/types";
import type { Values } from "@/lib/calculators/validate";
import ResultView from "./ResultView";

type Option = { value: string; label: string };

type FieldBase = {
  id: string;
  label: string;
  default: string;
  hint?: string;
  /** Hide the field unless this returns true for the current values. */
  showIf?: (v: Values) => boolean;
  /** Span both columns on wide screens. */
  wide?: boolean;
};

export type FieldDef =
  | (FieldBase & { kind: "number"; unit?: string; prefix?: string; placeholder?: string })
  | (FieldBase & { kind: "text"; placeholder?: string })
  | (FieldBase & { kind: "textarea"; rows?: number; placeholder?: string })
  | (FieldBase & { kind: "select"; options: Option[] })
  | (FieldBase & { kind: "segmented"; options: Option[] })
  | (FieldBase & { kind: "date" });

type Props = {
  fields: FieldDef[];
  compute: (values: Values) => CalcOutcome;
  /** Show a result computed from the default values on first render. */
  initialRun?: boolean;
  submitLabel?: string;
  resetLabel?: string;
};

const inputClass =
  "h-12 w-full rounded-xl border border-(--color-line) bg-white px-4 text-[16px] text-(--color-ink) placeholder:text-(--color-ink-soft)/60 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-blue) aria-[invalid=true]:border-red-500";

function defaults(fields: FieldDef[]): Values {
  const out: Values = {};
  for (const f of fields) out[f.id] = f.default;
  return out;
}

export default function CalculatorForm({
  fields,
  compute,
  initialRun = true,
  submitLabel = "Calculate",
  resetLabel = "Reset",
}: Props) {
  const uid = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(() => defaults(fields));
  const [outcome, setOutcome] = useState<CalcOutcome | null>(() =>
    initialRun ? compute(defaults(fields)) : null,
  );
  const [isExample, setIsExample] = useState<boolean>(initialRun);

  const errors = outcome && !outcome.ok ? outcome.errors : {};
  const errorList = Object.entries(errors);

  function set(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function run() {
    const next = compute(values);
    setOutcome(next);
    setIsExample(false);
    requestAnimationFrame(() => {
      // Invalid entries: bring the error summary into view and announce it, so the
      // message is never hidden above the Calculate button on a phone.
      if (!next.ok) {
        const box = errorRef.current;
        if (box) {
          box.focus({ preventScroll: true });
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          box.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        }
        return;
      }
      const el = resultRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.85 || rect.bottom < 0) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  function reset() {
    const d = defaults(fields);
    setValues(d);
    setOutcome(initialRun ? compute(d) : null);
    setIsExample(initialRun);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="rounded-3xl border border-(--color-line) bg-white p-5 shadow-[0_24px_60px_-40px_rgba(11,28,77,0.35)] sm:p-8"
      >
        {errorList.length > 0 && (
          <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 scroll-mt-28 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[13.5px] text-red-900 outline-none">
            <p className="font-semibold">Please check your entries:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {errorList.map(([id, msg]) => (
                <li key={id}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.map((f) => {
            if (f.showIf && !f.showIf(values)) return null;
            const inputId = `${uid}-${f.id}`;
            const hintId = f.hint ? `${inputId}-hint` : undefined;
            const errId = errors[f.id] ? `${inputId}-err` : undefined;
            const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
            const span = f.wide || f.kind === "textarea" || f.kind === "segmented" ? "sm:col-span-2" : "";

            const msg = errors[f.id] ? (
              <p id={errId} className="mt-1.5 text-[12.5px] font-medium text-red-700">
                {errors[f.id]}
              </p>
            ) : null;
            const hint = f.hint ? (
              <p id={hintId} className="mt-1.5 text-[12.5px] leading-snug text-(--color-ink-soft)">
                {f.hint}
              </p>
            ) : null;

            if (f.kind === "segmented") {
              return (
                <fieldset key={f.id} className={`min-w-0 ${span}`}>
                  <legend className="text-[13.5px] font-semibold text-(--color-ink)">{f.label}</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {f.options.map((o) => (
                      <label key={o.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name={`${uid}-${f.id}`}
                          value={o.value}
                          checked={values[f.id] === o.value}
                          onChange={() => set(f.id, o.value)}
                          className="peer sr-only"
                        />
                        <span className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) bg-white px-4 text-[14px] font-medium text-(--color-ink) transition-colors peer-checked:border-(--color-blue) peer-checked:bg-(--color-blue) peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-blue) hover:border-(--color-blue)/50">
                          {o.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {hint}
                </fieldset>
              );
            }

            return (
              <div key={f.id} className={`min-w-0 ${span}`}>
                <label htmlFor={inputId} className="block text-[13.5px] font-semibold text-(--color-ink)">
                  {f.label}
                </label>
                <div className="mt-2">
                  {f.kind === "select" && (
                    <select
                      id={inputId}
                      value={values[f.id]}
                      onChange={(e) => set(f.id, e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={!!errors[f.id]}
                      className={inputClass}
                    >
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {f.kind === "textarea" && (
                    <textarea
                      id={inputId}
                      value={values[f.id]}
                      rows={f.rows ?? 3}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.id, e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={!!errors[f.id]}
                      className={`${inputClass} h-auto py-3 leading-relaxed`}
                    />
                  )}
                  {f.kind === "date" && (
                    <input
                      id={inputId}
                      type="date"
                      value={values[f.id]}
                      onChange={(e) => set(f.id, e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={!!errors[f.id]}
                      className={inputClass}
                    />
                  )}
                  {f.kind === "text" && (
                    <input
                      id={inputId}
                      type="text"
                      autoComplete="off"
                      value={values[f.id]}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.id, e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={!!errors[f.id]}
                      className={inputClass}
                    />
                  )}
                  {f.kind === "number" && (
                    <div className="relative">
                      {f.prefix && (
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-(--color-ink-soft)">
                          {f.prefix}
                        </span>
                      )}
                      <input
                        id={inputId}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        value={values[f.id]}
                        placeholder={f.placeholder}
                        onChange={(e) => set(f.id, e.target.value)}
                        aria-describedby={describedBy}
                        aria-invalid={!!errors[f.id]}
                        className={`${inputClass} ${f.prefix ? "pl-9" : ""} ${f.unit ? "pr-16" : ""}`}
                      />
                      {f.unit && (
                        <span className="pointer-events-none absolute right-4 top-1/2 max-w-[4.5rem] -translate-y-1/2 truncate text-[13px] font-medium text-(--color-ink-soft)">
                          {f.unit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {hint}
                {msg}
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-(--color-blue) px-7 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-navy-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
          >
            <CalcIcon size={17} aria-hidden="true" />
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-(--color-line) bg-white px-6 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
          >
            <RotateCcw size={16} aria-hidden="true" />
            {resetLabel}
          </button>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-(--color-ink-soft)">
          Number entry: use a point for decimals (1.5). Commas grouped in threes are thousands separators (1,250), and a
          single comma such as 1,5 is read as a decimal comma. Nothing you enter leaves your device.
        </p>
      </form>

      <div ref={resultRef} className="scroll-mt-24 min-w-0" aria-live="polite" aria-label="Calculator results">
        {outcome?.ok ? (
          <ResultView result={outcome} isExample={isExample} />
        ) : (
          <div className="rounded-3xl border border-dashed border-(--color-line) bg-(--color-surface) px-6 py-12 text-center text-[14.5px] text-(--color-ink-soft)">
            {outcome && !outcome.ok
              ? outcome.message ?? "Fix the highlighted entries, then press Calculate."
              : `Enter your values and press ${submitLabel} to see the result.`}
          </div>
        )}
      </div>
    </div>
  );
}
