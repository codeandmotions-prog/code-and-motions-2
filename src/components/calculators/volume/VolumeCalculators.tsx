"use client";

import VolumeShapeCalculator from "./VolumeShapeCalculator";
import { SHAPES, shapeAnchor } from "./volumeData";

/** The vertical list of per-shape calculators with a jump menu. */
export default function VolumeCalculators() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
      <div className="min-w-0">
      <nav aria-labelledby="volume-shapes-heading" className="rounded-2xl border border-(--color-line) bg-white px-4 py-4 sm:px-5">
        <h2 id="volume-shapes-heading" className="text-[20px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[24px]">
          Volume calculators for every shape
        </h2>
        <p className="mt-1 text-[13.5px] text-(--color-ink-soft)">Choose a shape to jump to it, or scroll: every calculator works on its own.</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SHAPES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${shapeAnchor(s.id)}`}
                className="inline-flex min-h-9 items-center rounded-full border border-(--color-line) bg-(--color-surface) px-3.5 text-[13.5px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue)/50 hover:text-(--color-blue) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-blue)"
              >
                {s.short}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-5 space-y-5">
        {SHAPES.map((s) => (
          <VolumeShapeCalculator key={s.id} shape={s} />
        ))}
      </div>
      </div>

      {/* Right-hand column reserved for future advertising (desktop only). Intentionally empty: no ad code or scripts yet. */}
      <aside aria-hidden="true" data-reserved="ad-column" className="hidden xl:block">
        <div className="sticky top-24 h-[600px] w-[300px]" />
      </aside>
    </div>
  );
}
