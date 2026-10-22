import { AlertTriangle, Info } from "lucide-react";
import type { CalcOk } from "@/lib/calculators/types";

/** Renders a successful calculator outcome. Server- and client-safe. */
export default function ResultView({ result, isExample }: { result: CalcOk; isExample?: boolean }) {
  return (
    <div className="space-y-5">
      {isExample && (
        <p className="rounded-xl bg-(--color-surface) px-4 py-2.5 text-[13px] text-(--color-ink-soft)">
          Showing the example values. Change the inputs and press <strong>Calculate</strong> for your own result.
        </p>
      )}

      {result.warnings?.map((w) => (
        <p
          key={w}
          className="flex items-start gap-2.5 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-[13.5px] leading-relaxed text-amber-900"
        >
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{w}</span>
        </p>
      ))}

      {result.headline && (
        <div className="rounded-2xl bg-(--color-navy-deep) px-6 py-6 text-white">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-cyan-soft)">
            {result.headline.label}
          </p>
          <p className="mt-2 break-words text-[32px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[38px]">
            {result.headline.value}
          </p>
          {result.headline.sub && (
            <p className="mt-2 text-[14px] leading-relaxed text-white/70">{result.headline.sub}</p>
          )}
        </div>
      )}

      {result.figure && <div className="rounded-2xl border border-(--color-line) bg-white p-3">{result.figure}</div>}

      {result.stats && result.stats.length > 0 && (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {result.stats.map((s) => (
            <div key={s.label} className="min-w-0 rounded-xl border border-(--color-line) bg-white px-4 py-3.5">
              <dt className="text-[12.5px] font-medium text-(--color-ink-soft)">{s.label}</dt>
              <dd className="mt-1 break-words text-[18px] font-bold text-(--color-ink)">{s.value}</dd>
              {s.hint && <p className="mt-0.5 text-[12px] leading-snug text-(--color-ink-soft)">{s.hint}</p>}
            </div>
          ))}
        </dl>
      )}

      {result.tables?.map((t, ti) => (
        <div key={ti} className="rounded-xl border border-(--color-line) bg-white">
          {t.title && <h3 className="px-4 pt-4 text-[14.5px] font-bold text-(--color-ink)">{t.title}</h3>}
          <div className="overflow-x-auto px-2 pb-2 pt-2 sm:px-4">
            <table className="w-full min-w-max border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-(--color-line) text-(--color-ink-soft)">
                  {t.columns.map((c) => (
                    <th key={c} scope="col" className="px-2 py-2 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-(--color-line)/60 last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-2 py-1.5 tabular-nums text-(--color-ink)">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.caption && <p className="px-4 pb-3 text-[12px] text-(--color-ink-soft)">{t.caption}</p>}
        </div>
      ))}

      {result.block && (
        <div className="rounded-xl border border-(--color-line) bg-white p-4">
          <p className="text-[12.5px] font-medium text-(--color-ink-soft)">{result.block.label}</p>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-(--color-surface) p-3 font-mono text-[12.5px] leading-relaxed text-(--color-ink)">
            {result.block.text}
          </pre>
        </div>
      )}

      {result.steps && result.steps.length > 0 && (
        <div className="rounded-xl border border-(--color-line) bg-white p-4">
          <h3 className="text-[14.5px] font-bold text-(--color-ink)">Working</h3>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">
            {result.steps.map((s, i) => (
              <li key={i} className="break-words">
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}

      {result.notes?.map((n) => (
        <p key={n} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-(--color-ink-soft)">
          <Info size={15} className="mt-0.5 shrink-0 text-(--color-blue)" aria-hidden="true" />
          <span>{n}</span>
        </p>
      ))}
    </div>
  );
}
