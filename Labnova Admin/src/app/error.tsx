'use client';

import { PublicFrame } from '@/components/auth-shell';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PublicFrame width="max-w-md">
      <main className="p-8 text-center sm:p-10">
        <h1 className="text-2xl font-normal tracking-[-0.02em] text-ink">Something went wrong</h1>
        <p className="mt-2 text-base font-normal text-muted">The page could not be loaded. Nothing was changed. Please try again.</p>
        <button type="button" onClick={reset} className="btn-primary mt-6">Try again</button>
      </main>
    </PublicFrame>
  );
}
