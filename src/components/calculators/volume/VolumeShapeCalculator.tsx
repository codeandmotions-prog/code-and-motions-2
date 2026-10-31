"use client";

import { useId, useRef, useState } from "react";
import { Calculator as CalcIcon, RotateCcw } from "lucide-react";
import VolumeDiagram from "./VolumeDiagram";
import { computeVolume, AUTO_UNIT, type VolumeOutcome } from "./volumeCompute";
import { LENGTH_UNITS, VOLUME_UNITS, shapeAnchor, shapeGuideAnchor, type ShapeConfig } from "./volumeData";

const control =
  "h-11 min-w-0 rounded-lg sm:h-10 border border-(--color-line) bg-white px-3 text-[16px] text-(--color-ink) sm:text-[15px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-blue) aria-[invalid=true]:border-red-500";

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

  // Inline label + control rows from md up (label column, then input and unit); stacked on phones.
  const row = "md:grid md:grid-cols-[8.5rem_minmax(0,1fr)] md:items-center md:gap-x-3 lg:grid-cols-[9.5rem_minmax(0,1fr)]";
  const labelCls = "block text-[13px] font-semibold leading-snug text-(--color-ink)";

  return (
    <section
      id={shapeAnchor(shape.id)}
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-2xl border border-(--color-line) bg-white p-3 shadow-[0_20px_50px_-40px_rgba(11,28,77,0.35)] sm:rounded-3xl sm:p-4 lg:p-5"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 id={headingId} className="text-[18px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[20px]">
          {shape.title.charAt(0).toUpperCase() + shape.title.slice(1)}
        </h3>
        <p className="font-mono text-[12.5px] font-semibold text-(--color-blue) sm:text-[13px]">{shape.formula}</p>
        <a
          href={`#${shapeGuideAnchor(shape.id)}`}
          className="inline-flex min-h-8 items-center text-[13px] font-semibold text-(--color-blue) underline-offset-4 hover:underline sm:ml-auto"
        >
          Formula, example and tips
        </a>
      </div>

      {/* DOM order is inputs then result (the natural reading order); from md up the result sits above the inputs, as on the reference layout. */}
      <div className="mt-2 flex flex-col gap-3">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,14rem)] md:items-center md:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
            className="order-2 min-w-0 md:order-1"
          >
            {errorList.length > 0 && (
              <div ref={errorRef} tabIndex={-1} role="alert" className="mb-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[13px] text-red-900 outline-none">
                <p className="font-semibold">Please check your entries:</p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-5">
                  {errorList.map(([k, msg]) => (
                    <li key={k}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2.5">
              {shape.fields.map((f) => {
                const inputId = `${uid}-f-${f.id}`;
                const unitId = `${inputId}-unit`;
                const hintId = f.hint ? `${inputId}-hint` : undefined;
                const errId = errors[f.id] ? `${inputId}-err` : undefined;
                return (
                  <div key={f.id} className={row}>
                    <label htmlFor={inputId} className={labelCls}>
                      {f.label} <span className="font-mono font-bold text-(--color-blue)">({f.symbol})</span>
                    </label>
                    <div className="min-w-0">
                      <div className="mt-1 grid grid-cols-[minmax(0,1fr)_minmax(0,6.5rem)] gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,8rem)] md:mt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,6.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,8rem)]">
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
                        <p id={hintId} className="mt-1 text-[12px] leading-snug text-(--color-ink-soft)">
                          {f.hint}
                        </p>
                      )}
                      {errors[f.id] && (
                        <p id={errId} className="mt-1 text-[12px] font-medium text-red-700">
                          {errors[f.id]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className={row}>
                <label htmlFor={`${uid}-show-in`} className={labelCls}>
                  Show volume in
                </label>
                <select id={`${uid}-show-in`} value={out} onChange={(e) => changeOut(e.target.value)} className={`${control} mt-1 w-full md:mt-0`}>
                  <option value={AUTO_UNIT}>Cubic of the first length unit</option>
                  {VOLUME_UNITS.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label} ({u.abbr})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 md:pl-[9.5rem] lg:pl-[10.5rem]">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-(--color-blue) px-5 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-navy-deep) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:min-h-10"
              >
                <CalcIcon size={16} aria-hidden="true" />
                Calculate
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line) bg-white px-4 text-[15px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/50 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue) sm:min-h-10"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Reset
              </button>
            </div>
          </form>
          <figure className="order-1 flex items-center gap-3 rounded-xl bg-(--color-surface) p-2 md:order-2 md:block md:p-2.5">
            <VolumeDiagram shape={shape.id} className="h-auto w-28 shrink-0 min-[420px]:w-32 md:mx-auto md:w-full md:max-h-40" />
            <figcaption className="min-w-0 text-[12px] leading-snug text-(--color-ink-soft) md:mt-1 md:text-center md:text-[11.5px]">{shape.variables}</figcaption>
          </figure>
        </div>

        <div className="min-w-0 md:order-first" aria-live="polite" aria-label={`${shape.short} volume result`}>
          {outcome.ok ? (
            <div className="overflow-hidden rounded-xl border border-(--color-line)">
              <p className="flex items-baseline justify-between gap-3 bg-(--color-navy-deep) px-3 py-1 text-[13px] font-bold text-white">
                <span>Result</span>
                {isExample && <span className="text-right text-[11.5px] font-medium leading-tight text-white/65">Example values shown. Change them and press Calculate.</span>}
              </p>
              <div className="space-y-2 bg-white px-3 py-2.5 sm:px-4">
                <div className="gap-x-4 sm:flex sm:items-center sm:justify-between">
                  <div className="min-w-0 font-mono text-[12.5px] leading-snug text-(--color-ink-soft)">
                    <p className="break-words">
                      <span className="font-semibold text-(--color-ink)">Volume</span> = {shape.formula.replace(/^V = /, "")}
                    </p>
                    <p className="break-words">= {outcome.working.substituted}</p>
                  </div>
                  <p className="mt-1 break-words text-[22px] font-extrabold leading-tight tracking-[-0.01em] text-(--color-ink) sm:mt-0 sm:text-right sm:text-[26px]">
                    <span aria-hidden="true" className="font-mono text-[16px] font-bold text-(--color-blue)">= </span>
                    {outcome.headline.value}
                  </p>
                </div>
                {out !== AUTO_UNIT && (
                  <p className="text-[12.5px] text-(--color-ink-soft)">Same volume in the working unit: {outcome.working.result}</p>
                )}
                {outcome.working.unitNote && <p className="text-[12px] leading-snug text-(--color-ink-soft)">{outcome.working.unitNote}</p>}
                <dl className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
                  {outcome.stats.map((s) => (
                    <div key={s.label} className="min-w-0 rounded-lg border border-(--color-line) bg-(--color-surface) px-2.5 py-1.5">
                      <dt className="text-[11.5px] font-medium leading-tight text-(--color-ink-soft)">{s.label}</dt>
                      <dd className="mt-0.5 break-words text-[13px] font-bold leading-snug text-(--color-ink)">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-(--color-line) bg-(--color-surface) px-3 py-3 text-center text-[13.5px] text-(--color-ink-soft)">
              Fix the highlighted entries, then press Calculate.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
