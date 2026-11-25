'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

/**
 * A section that fails to load is reported here, inside the shell — the sidebar
 * stays, so you can simply open another section. (The top-level error page only
 * handles failures of the shell itself.)
 */
export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  return (
    <div role="alert" className="card mx-auto mt-6 max-w-md animate-page-in p-8 text-center sm:mt-12">
      <h1 className="text-2xl font-normal tracking-[-0.02em] text-ink">Something went wrong</h1>
      <p className="mt-2 text-base font-normal text-muted">This section could not be loaded. Nothing was changed. Please try again.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            // Re-fetch from the server, then re-render this section.
            startTransition(() => {
              router.refresh();
              reset();
            })
          }
        >
          Try again
        </button>
        <Link href="/" className="btn-secondary">Dashboard</Link>
      </div>
    </div>
  );
}
