import Link from 'next/link';
import { PublicFrame } from '@/components/auth-shell';

export default function NotFound() {
  return (
    <PublicFrame width="max-w-md">
      <main className="p-8 text-center sm:p-10">
        <h1 className="text-2xl font-normal tracking-[-0.02em] text-ink">Page not found</h1>
        <p className="mt-2 text-base font-normal text-muted">This page or lab does not exist.</p>
        <Link href="/" className="btn-primary mt-6">Back to Dashboard</Link>
      </main>
    </PublicFrame>
  );
}
