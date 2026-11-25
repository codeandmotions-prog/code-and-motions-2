import type { Metadata } from 'next';
import { PublicFrame } from '@/components/auth-shell';
import { IconFlaskLogo } from '@/components/icons';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Report verification', robots: { index: false, follow: false } };

export default function VerifyIndexPage() {
  return (
    <PublicFrame width="max-w-lg">
      <main id="main" className="px-6 py-12 text-center sm:px-10">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
          <IconFlaskLogo size={24} />
        </span>
        <h1 className="text-[1.75rem] font-normal leading-tight tracking-[-0.03em] text-ink">LabNova report verification</h1>
        <p className="mx-auto mt-3 max-w-sm text-base font-normal text-muted">
          To check a report, scan the QR code printed on it with your phone’s camera. It opens this page with the report’s details.
        </p>
      </main>
    </PublicFrame>
  );
}
