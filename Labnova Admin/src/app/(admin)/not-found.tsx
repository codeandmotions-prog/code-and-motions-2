import Link from 'next/link';

/** A lab or page that does not exist, shown inside the shell with the sidebar still in place. */
export default function AdminNotFound() {
  return (
    <div className="card mx-auto mt-6 max-w-md animate-page-in p-8 text-center sm:mt-12">
      <h1 className="text-2xl font-normal tracking-[-0.02em] text-ink">Page not found</h1>
      <p className="mt-2 text-base font-normal text-muted">This page or lab does not exist.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/labs" className="btn-secondary">All labs</Link>
        <Link href="/" className="btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
}
