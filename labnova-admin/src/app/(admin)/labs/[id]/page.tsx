import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { getLab, listAudit, listDeviceModeStatus, listDeviceSyncStatus, listOfflineAudit, listOfflineKeys, settle, sweepExpiredKeys } from '@/lib/data';
import { formatDate, formatDateTime } from '@/lib/format';
import { labMode, planLabel } from '@/lib/types';
import { AuditCompact } from '@/components/audit-list';
import { IconArrowRight, IconHistory } from '@/components/icons';
import { KeyManager } from '@/components/key-manager';
import { LabManagement, SmsControl } from '@/components/lab-management';
import { ModeCard } from '@/components/mode-card';
import { AccountBadge, Avatar, Card, EmptyState, LoadProblem, ModeBadge, PageTransition, SubscriptionBadge } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Lab details' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-medium text-ink">{children}</dd>
    </div>
  );
}

export default async function LabDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const lab = await getLab(id);
  if (!lab) notFound();

  // Keys that passed their expiry date get their "Key expired" history entry the first time anyone looks.
  await sweepExpiredKeys(id);

  const [keysRes, historyRes, changesRes, syncRes, modeRes] = await Promise.all([
    settle(listOfflineKeys(id)),
    settle(listOfflineAudit(id)),
    settle(listAudit({ ownerId: id, limit: 8 })),
    settle(listDeviceSyncStatus(id)),
    settle(listDeviceModeStatus(id)),
  ]);

  const offline = labMode(lab.plan) === 'offline';
  const blockedReason =
    lab.account_status !== 'active'
      ? 'This lab’s account is suspended, so new keys cannot be created. Set the account to Active in “Plan & status” first.'
      : !offline
        ? `This lab is on “${planLabel(lab.plan)}”. Set the plan to Basic Offline in “Plan & status” above to create activation keys.`
        : null;

  // Remount the form whenever the saved values change, so it always starts from what the database holds.
  const formKey = [lab.account_status, lab.subscription_status, lab.plan, lab.subscription_ends_at, lab.last_payment_reference].join('|');

  return (
    <PageTransition>
      <header className="mb-7 sm:mb-9">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
          <Link href="/labs" className="font-medium transition-colors hover:text-ink">Labs</Link>
          <span className="mx-2 text-faint" aria-hidden="true">/</span>
          <span className="font-medium text-ink">{lab.lab_name}</span>
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name={lab.lab_name} size={56} />
            <div className="min-w-0">
              <h1 className="truncate text-[1.75rem] font-normal leading-tight tracking-[-0.035em] text-ink sm:text-4xl">{lab.lab_name}</h1>
              <p className="mt-1 truncate text-base font-normal text-muted">{lab.owner_name} · {lab.email}</p>
            </div>
          </div>
          <Link href={`/audit?lab=${lab.owner_id}`} prefetch={false} className="btn-secondary">
            <IconHistory size={16} /> Audit history
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <AccountBadge status={lab.account_status} labeled />
          <SubscriptionBadge status={lab.subscription_status} labeled />
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line">{planLabel(lab.plan)}</span>
          <ModeBadge plan={lab.plan} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Card title="Plan & status" description="Change what this lab can use. Every change is confirmed first and recorded in the audit log.">
            <LabManagement key={formKey} lab={lab} />
          </Card>

          <Card
            title="Working mode: Offline or Online"
            description="Set by the plan above. A lab can be moved from Offline to Online without losing or duplicating any data."
          >
            <ModeCard lab={lab} modes={modeRes.data} error={modeRes.error} />
          </Card>

          <Card
            title="Offline activation keys & devices"
            description="Each key switches on Basic Offline for one PC. Once used, a key stays tied to that PC unless you reset it. A key can have an expiry date, which you can extend at any time."
          >
            <KeyManager
              ownerId={lab.owner_id}
              labName={lab.lab_name}
              keys={keysRes.data}
              loadError={keysRes.error}
              audit={historyRes.data ?? []}
              blockedReason={blockedReason}
              sync={syncRes.data}
              syncError={syncRes.error}
              modes={modeRes.data}
              modeError={modeRes.error}
            />
          </Card>
        </div>

        <div className="min-w-0 space-y-6">
          <Card title="Lab profile">
            <dl className="grid gap-4">
              <Info label="Owner">{lab.owner_name || '—'}</Info>
              <Info label="Email">{lab.email}</Info>
              <Info label="Phone">{lab.mobile_number || '—'}</Info>
              <Info label="Joined">{formatDateTime(lab.created_at)}</Info>
              <Info label="Trial ends">{formatDate(lab.trial_ends_at)}</Info>
              <Info label="Subscription ends">{formatDate(lab.subscription_ends_at)}</Info>
              <Info label="Last payment reference">{lab.last_payment_reference || '—'}</Info>
            </dl>
          </Card>

          <Card title="Messaging">
            <SmsControl lab={lab} />
          </Card>

          <Card
            title="Recent changes"
            flush
            action={
              <Link href={`/audit?lab=${lab.owner_id}`} className="link inline-flex items-center gap-1.5 text-sm">
                All <IconArrowRight size={14} />
              </Link>
            }
          >
            {changesRes.data ? (
              changesRes.data.length === 0 ? (
                <EmptyState title="No changes yet">Plan, status and key changes for this lab will show here.</EmptyState>
              ) : (
                <AuditCompact entries={changesRes.data} showLab={false} />
              )
            ) : (
              <div className="p-5"><LoadProblem kind={changesRes.error} what="Recent changes" /></div>
            )}
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
