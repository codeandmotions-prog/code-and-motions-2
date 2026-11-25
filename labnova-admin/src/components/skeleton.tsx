import type { ReactNode } from 'react';

/**
 * Placeholders shown inside the shell while a section's data loads, so a click
 * always gets an immediate response and the layout never jumps.
 */

export function Bone({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-black/[0.07] ${className}`} />;
}

export function SkeletonPage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-busy="true" className="animate-fade-in">
      <span className="sr-only">Loading {label}…</span>
      {children}
    </div>
  );
}

export function HeaderSkeleton({ avatar = false }: { avatar?: boolean }) {
  return (
    <div className="mb-6 sm:mb-8">
      {avatar && <Bone className="mb-4 h-4 w-40" />}
      <div className="flex items-center gap-4">
        {avatar && <Bone className="h-[52px] w-[52px] shrink-0 rounded-full" />}
        <div className="min-w-0 flex-1">
          <Bone className="h-10 w-56 sm:h-12 sm:w-80" />
          <Bone className="mt-3 h-4 w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="card mb-5 grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i}>
          <Bone className="mb-2 h-3.5 w-16" />
          <Bone className="h-11 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function RowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="card divide-y divide-line overflow-hidden">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <Bone className="h-10 w-10 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Bone className="h-4 w-1/3 min-w-[8rem]" />
            <Bone className="mt-2 h-3.5 w-1/2 min-w-[10rem]" />
          </div>
          <Bone className="hidden h-6 w-20 rounded-full sm:block" />
          <Bone className="hidden h-6 w-24 rounded-full md:block" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      <Bone className="h-5 w-40" />
      <Bone className="mt-2 h-3.5 w-3/4 max-w-sm" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <Bone key={i} className={`h-4 ${i % 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}
