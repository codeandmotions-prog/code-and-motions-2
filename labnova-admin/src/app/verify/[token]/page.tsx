import type { Metadata } from 'next';
import { PublicFrame } from '@/components/auth-shell';
import { IconAlert, IconCheck, IconFlaskLogo, IconInfo } from '@/components/icons';
import { formatDate, formatDateTime } from '@/lib/format';
import { verifyReport } from '@/lib/verify';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Report verification',
  description: 'Check a LabNova report by scanning the QR code printed on it.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

const STATUS_TEXT: Record<string, string> = {
  Completed: 'Completed',
  'In Progress': 'In progress',
  Pending: 'Pending',
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-4">
      <dt className="text-sm font-normal text-muted sm:w-40 sm:shrink-0">{label}</dt>
      <dd className="min-w-0 text-base font-semibold text-ink [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <PublicFrame width="max-w-lg">
      <main id="main" className="flex min-h-[calc(100vh-3rem)] flex-col px-4 py-6 sm:min-h-0 sm:px-8 sm:py-10">
        <header className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
            <IconFlaskLogo size={22} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-semibold tracking-tight text-ink">LabNova</span>
            <span className="block text-xs font-medium text-muted">Report verification</span>
          </span>
        </header>
        {children}
        <footer className="mt-auto pt-8 text-center text-xs font-normal text-muted">
          Only report details are shown here. Test results, phone numbers and billing are never part of verification.
        </footer>
      </main>
    </PublicFrame>
  );
}

function Message({ tone, title, children }: { tone: 'bad' | 'warn' | 'info'; title: string; children: React.ReactNode }) {
  const style =
    tone === 'bad'
      ? 'border-bad-line bg-bad-soft text-bad'
      : tone === 'warn'
        ? 'border-warn-line bg-warn-soft text-warn'
        : 'border-lime-dark/40 bg-lime-soft text-ink';
  return (
    <section role={tone === 'bad' ? 'alert' : 'status'} className={`rounded-card border p-5 ${style}`}>
      <div className="flex items-start gap-3">
        {tone === 'info' ? <IconInfo size={22} className="mt-0.5 shrink-0" /> : <IconAlert size={22} className="mt-0.5 shrink-0" />}
        <div className="min-w-0">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="mt-1.5 space-y-2 text-sm font-normal">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default async function VerifyPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await verifyReport(token);

  if (result.kind === 'invalid') {
    return (
      <Shell>
        <Message tone="bad" title="This link is not valid">
          <p>The verification link is incomplete or damaged. Scan the QR code on the report again.</p>
        </Message>
      </Shell>
    );
  }

  if (result.kind === 'unavailable') {
    return (
      <Shell>
        <Message tone="warn" title="Verification is not available right now">
          <p>
            {result.reason === 'schema'
              ? 'The verification service has not been set up yet.'
              : 'We could not reach the verification service.'}{' '}
            This does not mean the report is invalid. Please try again in a few minutes.
          </p>
        </Message>
      </Shell>
    );
  }

  if (result.kind === 'not_found') {
    return (
      <Shell>
        <Message tone="warn" title="We could not verify this report">
          <p>No report matches this QR code (yet). This can happen when:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>the report was created on a lab PC that has not been online since — try again in a little while;</li>
            <li>the QR code is damaged, or the report is not from LabNova.</li>
          </ul>
          <p>If you are unsure, please ask the lab that issued the report.</p>
        </Message>
      </Shell>
    );
  }

  const report = result.report;

  if (report.withdrawn) {
    return (
      <Shell>
        <Message tone="bad" title="This report was withdrawn by the lab">
          <p>Please do not rely on it. Contact {report.lab_name ?? 'the lab'} for the current report.</p>
        </Message>
      </Shell>
    );
  }

  // A report that is still being worked on is genuine but not final: say so instead of a plain "verified".
  const notFinal = Boolean(report.status) && report.status !== 'Completed';
  const statusWord = report.status ? (STATUS_TEXT[report.status] ?? report.status).toLowerCase() : '';

  return (
    <Shell>
      <section role="status" className="card overflow-hidden bg-white">
        <div className="flex items-center gap-3 border-b border-ok-line bg-ok-soft px-5 py-4 text-ok">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ok text-white">
            <IconCheck size={20} />
          </span>
          <div>
            <h1 className="text-xl font-semibold">{notFinal ? 'Report on record' : 'Report verified'}</h1>
            <p className="text-sm font-normal">
              {notFinal
                ? `Registered at ${report.lab_name ?? 'the lab'}. Its results are not final yet (status: ${statusWord}).`
                : `This report is on record at ${report.lab_name ?? 'the lab'}.`}
            </p>
          </div>
        </div>

        <dl className="divide-y divide-line px-5">
          <Row label="Lab">{report.lab_name ?? '—'}</Row>
          <Row label="Patient">{report.patient_name ?? '—'}</Row>
          {report.patient_display_id && <Row label="Patient ID">{report.patient_display_id}</Row>}
          <Row label="Test">{report.test_name ?? '—'}</Row>
          <Row label="Report status">{report.status ? (STATUS_TEXT[report.status] ?? report.status) : '—'}</Row>
          <Row label="Registered on">{formatDate(report.registered_at)}</Row>
          {report.reported_at && <Row label="Reported on">{formatDate(report.reported_at)}</Row>}
          {report.doctor_name && <Row label="Doctor">{report.doctor_name}</Row>}
          {report.technician_name && <Row label="Technician">{report.technician_name}</Row>}
        </dl>

        <div className="border-t border-line bg-surface px-5 py-4 text-sm font-normal text-muted">
          <p className="font-semibold text-ink">Compare these details with your printed report.</p>
          <p className="mt-1">If the name, test or dates differ, do not rely on the report and contact the lab.</p>
          {report.last_confirmed_at && <p className="mt-2 text-xs">Details last confirmed by the lab’s system on {formatDateTime(report.last_confirmed_at)}.</p>}
        </div>
      </section>
    </Shell>
  );
}
