"use client";

import { useId, useRef, useState } from "react";
import { Calculator as CalcIcon, RotateCcw } from "lucide-react";
import VolumeDiagram from "./VolumeDiagram";
import { computeVolume, AUTO_UNIT, type VolumeOutcome } from "./volumeCompute";
import { LENGTH_UNITS, VOLUME_UNITS, shapeAnchor, shapeGuideAnchor, type ShapeConfig } from "./volumeData";

const control =
  "h-11 min-w-0 rounded-xl border border-(--color-line) bg-white px-3 text-[16px] text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-blue) aria-[invalid=true]:border-red-500";

function initial(shape: ShapeConfig) {
  const values: Record<string, string> = {};
  const units: Record<string, string> = {};
  for (const f of shape.fields) {
    values[f.id] = f.def;
    units[f.id] = "cm";
  }
  return { values, units };
}

/** One self-contained calculator: heading, diagram beside the inputs, per-dimension unit menus, Calculate button and result. */
export default function VolumeShapeCalculator({ shape }: { shape: ShapeConfig }) {
  const uid = useId();
  const errorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(() => initial(shape));
  const [out, setOut] = useState(AUTO_UNIT);
  const [outcome, setOutcome] = useState<VolumeOutcome>(() => {
    const s = initial(shape);
    return computeVolume(shape, s.values, s.units, AUTO_UNIT);
  });
  const [isExample, setIsExample] = useState(true);

  const errors = outcome.ok ? {} : outcome.errors;
  const errorList = Object.entries(errors);
  const headingId = `${uid}-title`;

  function run() {
    const next = computeVolume(shape, state.values, state.units, out);
    setOutcome(next);
    setIsExample(false);
    if (!next.ok) {
      requestAnimationFrame(() => errorRef.current?.focus({ preventScroll: false }));
    }
  }

  function reset() {
    const s = initial(shape);
    setState(s);
    setOut(AUTO_UNIT);
    setOutcome(computeVolume(shape, s.values, s.units, AUTO_UNIT));
    setIsExample(true);
  }

  // Changing the answer unit re-expresses an existing result straight away.
  function changeOut(v: string) {
    setOut(v);
    if (outcome.ok) setOutcome(computeVolume(shape, state.values, state.units, v));
  }

  return (
    <section
      id={shapeAnchor(shape.id)}
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-3xl border border-(--color-line) bg-white p-4 shadow-[0_20px_50px_-40px_rgba(11,28,77,0.35)] sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={headingId} className="text-[20px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[22px]">
          {shape.title.charAt(0).toUpperCase() + shape.title.slice(1)}
        </h3>
        <a
          href={`#${shapeGuideAnchor(shape.id)}`}
          className="inline-flex min-h-8 items-center text-[13.5px] font-semibold text-(--color-blue) underline-offset-4 hover:underline"
        >
          Formula, example and tips
        </a>
      </div>
      <p className="mt-1 font-mono text-[13.5px] font-semibold text-(--color-blue)">{shape.formula}</p>

      {/* DOM order is inputs then result (the natural reading order); from md up the result sits above the inputs, as on the reference layout. */}
      <div className="mt-4 flex flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:items-start md:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
          className="order-2 min-w-0 md:order-1"
        >
          {errorList.length > 0 && (
            <div ref={errorRef} tabIndex={-1} role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[13.5px] text-red-900 outline-none">
              <p className="font-semibold">Please check your entries:</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {errorList.map(([k, msg]) => (
                  <li key={k}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            {shape.fields.map((f) => {
              const inputId = `${uid}-f-${f.id}`;
              const unitId = `${inputId}-unit`;
              const hintId = f.hint ? `${inputId}-hint` : undefined;
              const errId = errors[f.id] ? `${inputId}-err` : undefined;
              return (
                <div key={f.id}>
                  <label htmlFor={inputId} className="block text-[13.5px] font-semibold text-(--color-ink)">
                    {f.label} <span className="font-mono font-bold text-(--color-blue)">({f.symbol})</span>
                  </label>
                  <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_minmax(0,7.5rem)] gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,9.5rem)]">
                    <input
                      id={inputId}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={state.values[f.id]}
                      onChange={(e) => setState((s) => ({ ...s, values: { ...s.values, [f.id]: e.target.value } }))}
                      aria-describedby={[hintId, errId].filter(Boolean).join(" ") || undefined}
                      aria-invalid={!!errors[f.id]}
                      className={control}
                    />
                    <select
                      id={unitId}
                      aria-label={`Unit for ${f.label.toLowerCase()}`}
                      value={state.units[f.id]}
                      onChange={(e) => setState((s) => ({ ...s, units: { ...s.units, [f.id]: e.target.value } }))}
                      className={control}
                    >
                      {LENGTH_UNITS.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.abbr}
                        </option>
                      ))}
                    </select>
                  </div>
                  {f.hint && (
                    <p id={hintId} className="mt-1 text-[12.5px] leading-snug text-(--color-ink-soft)">
                      {f.hint}
                    </p>
                  )}
                  {errors[f.id] && (
                    <p id={errId} className="mt-1 text-[12.5px] font-medium text-red-700">
                      {errors[f.id]}
                    </p>
                  )}
                </div>
              );
            })}

            <div>
              <label htmlFor={`${uid}-show-in`} className="block text-[13.5px] font-semibold text-(--color-ink)">
                Show volume in
              </label>
              <select id={`${uid}-show-in`} value={out} onChange={(e) => changeOut(e.target.value)} className={`${control} mt-1.5 w-full`}>
                <option value={AUTO_UNIT}>Cubic of the first length unit</option>
                {VOLUME_UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label} ({u.abbr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-(--color-blue) px-6 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-navy-deep) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
            >
              <CalcIcon size={17} aria-hidden="true" />
              Calculate
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line) bg-white px-5 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/50 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>
        <figure className="order-1 mx-auto w-full max-w-[15rem] rounded-2xl bg-(--color-surface) p-3 md:order-2 md:max-w-none">
          <VolumeDiagram shape={shape.id} className="mx-auto h-auto max-h-36 w-full md:max-h-none" />
          <figcaption className="mt-1 text-center text-[12px] leading-snug text-(--color-ink-soft)">{shape.variables}</figcaption>
        </figure>
        </div>

        <div className="min-w-0 md:order-first" aria-live="polite" aria-label={`${shape.short} volume result`}>
          {outcome.ok ? (
            <div className="overflow-hidden rounded-2xl border border-(--color-line)">
              <p className="bg-(--color-navy-deep) px-4 py-2 text-[14px] font-bold text-white">Result</p>
              <div className="space-y-3 bg-white px-4 py-4 sm:px-5">
                <div className="font-mono text-[13.5px] leading-relaxed text-(--color-ink-soft)">
                  <p className="break-words">
                    <span className="font-semibold text-(--color-ink)">Volume</span> = {shape.formula.replace(/^V = /, "")}
                  </p>
                  <p className="break-words">= {outcome.working.substituted}</p>
                </div>
                <p className="break-words text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-(--color-ink) sm:text-[28px]">
                  <span aria-hidden="true" className="font-mono text-[18px] font-bold text-(--color-blue)">= </span>
                  {outcome.headline.value}
                </p>
                {out !== AUTO_UNIT && (
                  <p className="text-[13px] text-(--color-ink-soft)">Same volume in the working unit: {outcome.working.result}</p>
                )}
                {outcome.working.unitNote && <p className="text-[12.5px] leading-snug text-(--color-ink-soft)">{outcome.working.unitNote}</p>}
                {isExample && <p className="text-[12.5px] text-(--color-ink-soft)">Example values shown. Change them and press Calculate.</p>}
                <dl className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-5">
                  {outcome.stats.map((s) => (
                    <div key={s.label} className="min-w-0 rounded-xl border border-(--color-line) bg-(--color-surface) px-3 py-2.5">
                      <dt className="text-[12px] font-medium text-(--color-ink-soft)">{s.label}</dt>
                      <dd className="mt-0.5 break-words text-[14.5px] font-bold text-(--color-ink)">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-(--color-line) bg-(--color-surface) px-4 py-5 text-center text-[14px] text-(--color-ink-soft)">
              Fix the highlighted entries, then press Calculate.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
