import type { Metadata } from 'next';
import Form from 'next/form';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listKeyCounts, listLabs, settle, type KeyCountMap } from '@/lib/data';
import { daysUntil, formatDate } from '@/lib/format';
import { labMode, planLabel, PLAN_LABELS, type Lab } from '@/lib/types';
import { IconFlask, IconSearch } from '@/components/icons';
import { AccountBadge, Avatar, EmptyState, LoadProblem, ModeBadge, PageHeader, PageTransition, PillTabs, SubscriptionBadge, TitlePill } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Labs' };

type Search = Record<string, string | string[] | undefined>;

function endInfo(lab: Lab): string {
  if (lab.subscription_status === 'expired') return 'Subscription ended';
  const date = lab.subscription_status === 'trial' ? lab.trial_ends_at : lab.subscription_ends_at;
  if (!date) return lab.subscription_status === 'trial' ? '' : 'No end date set';
  const days = daysUntil(date);
  const label = lab.subscription_status === 'trial' ? 'Trial ends' : 'Ends';
  return `${label} ${formatDate(date)}${days !== null && days >= 0 && days <= 14 ? ` (${days}d)` : ''}`;
}

function KeysCell({ lab, counts }: { lab: Lab; counts: KeyCountMap | null }) {
  if (labMode(lab.plan) !== 'offline') return <span className="text-sm font-normal text-faint">Not used</span>;
  if (!counts) return <span className="text-sm font-normal text-faint">—</span>;
  const c = counts.get(lab.owner_id);
  if (!c || c.total === 0) return <span className="text-sm font-semibold text-warn">No key yet</span>;
  return (
    <span className="text-sm">
      <span className="font-semibold text-ok">{c.activated}</span>
      <span className="font-normal text-muted"> in use of {c.total}</span>
      {c.expired > 0 && <span className="font-semibold text-warn"> · {c.expired} expired</span>}
    </span>
  );
}

export default async function LabsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const raw = await searchParams;
  // A repeated parameter (?q=a&q=b) arrives as an array; only accept plain text.
  const text = (value: unknown) => (typeof value === 'string' ? value : '');
  const q = text(raw.q);
  const plan = text(raw.plan);
  const status = text(raw.status);
  const [labsRes, countsRes] = await Promise.all([settle(listLabs()), settle(listKeyCounts())]);

  if (!labsRes.data) {
    return (
      <>
        <PageHeader title="Labs" />
        <LoadProblem kind={labsRes.error} what="The list of labs" />
      </>
    );
  }
  const labs = labsRes.data;
  const counts = countsRes.data;

  const query = q.trim().toLowerCase().slice(0, 100);
  const filtered = labs.filter((lab) => {
    if (plan === 'none' ? lab.plan !== null : plan && lab.plan !== plan) return false;
    if (status && status !== lab.account_status && status !== `sub_${lab.subscription_status}`) return false;
    if (!query) return true;
    return [lab.lab_name, lab.owner_name, lab.email, lab.mobile_number].some((v) => (v ?? '').toLowerCase().includes(query));
  });

  const filtering = Boolean(q || plan || status);

  const labsHref = (nextStatus: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (plan) params.set('plan', plan);
    if (nextStatus) params.set('status', nextStatus);
    const query = params.toString();
    return query ? `/labs?${query}` : '/labs';
  };
  const statusTabs = [
    { label: 'All labs', value: '', count: labs.length },
    { label: 'Active', value: 'active', count: labs.filter((l) => l.account_status === 'active').length },
    { label: 'Suspended', value: 'suspended', count: labs.filter((l) => l.account_status === 'suspended').length },
    { label: 'Free trial', value: 'sub_trial', count: labs.filter((l) => l.subscription_status === 'trial').length },
    { label: 'Subscribed', value: 'sub_active', count: labs.filter((l) => l.subscription_status === 'active').length },
    { label: 'Expired', value: 'sub_expired', count: labs.filter((l) => l.subscription_status === 'expired').length },
  ].map((t) => ({ label: t.label, count: t.count, href: labsHref(t.value), active: status === t.value }));

  return (
    <PageTransition>
      <PageHeader
        title={
          <>
            Your <TitlePill icon={<IconFlask size={20} />} /> labs
          </>
        }
        crumb="Labs"
        description={filtering ? `${filtered.length} of ${labs.length} labs match.` : `${labs.length} lab${labs.length === 1 ? '' : 's'} on LabNova. Open one to change its plan or manage its activation keys.`}
      />

      <PillTabs label="Filter by status" items={statusTabs} />

      {/* <Form> applies the filters as an in-app navigation (no page reload); keyed so it always shows the URL's current values. */}
      <Form
        key={`${q}|${plan}|${status}`}
        action="/labs"
        data-nav-form=""
        className="card mb-5 grid gap-3 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_16rem_auto] lg:items-center"
      >
        <input type="hidden" name="status" value={status} />
        <div>
          <label htmlFor="q" className="sr-only">Search</label>
          <div className="relative">
            <IconSearch size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
            <input id="q" name="q" defaultValue={q} placeholder="Search by lab name, owner, email or phone" className="input pl-10" />
          </div>
        </div>
        <div>
          <label htmlFor="plan" className="sr-only">Plan</label>
          <select id="plan" name="plan" defaultValue={plan} className="input">
            <option value="">All plans</option>
            {Object.entries(PLAN_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
            <option value="none">No plan yet</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn-primary flex-1 lg:flex-none">Apply</button>
          {filtering && <Link href="/labs" className="btn-secondary">Clear</Link>}
        </div>
      </Form>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title={labs.length === 0 ? 'No labs yet' : 'No labs match'}
            action={filtering ? <Link href="/labs" className="btn-secondary btn-sm">Clear filters</Link> : undefined}
          >
            {labs.length === 0 ? 'Labs appear here as soon as they sign up in LabNova.' : 'Try a different search or clear the filters.'}
          </EmptyState>
        ) : (
          <>
            {/* Desktop table */}
            <div className="relative hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-line bg-black/[0.03]">
                  <tr>
                    <th className="th">Lab</th>
                    <th className="th">Plan</th>
                    <th className="th">Account</th>
                    <th className="th">Subscription</th>
                    <th className="th">Offline keys</th>
                    <th className="th">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((lab) => (
                    <tr key={lab.owner_id} className="group transition-colors hover:bg-white/60">
                      <td className="td">
                        <Link href={`/labs/${lab.owner_id}`} prefetch={false} className="flex items-center gap-3">
                          <Avatar name={lab.lab_name} />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-ink underline-offset-4 decoration-ink/25 transition-colors group-hover:underline">{lab.lab_name}</span>
                            <span className="block truncate text-xs font-normal text-muted">{lab.owner_name} · {lab.email}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="td">
                        <span className="block text-sm font-semibold text-ink">{planLabel(lab.plan)}</span>
                        <span className="mt-1 block"><ModeBadge plan={lab.plan} /></span>
                      </td>
                      <td className="td"><AccountBadge status={lab.account_status} /></td>
                      <td className="td">
                        <SubscriptionBadge status={lab.subscription_status} />
                        <span className="mt-1 block text-xs font-normal text-muted">{endInfo(lab)}</span>
                      </td>
                      <td className="td"><KeysCell lab={lab} counts={counts} /></td>
                      <td className="td text-sm font-normal text-muted">{formatDate(lab.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phone cards */}
            <ul className="divide-y divide-line md:hidden">
              {filtered.map((lab) => (
                <li key={lab.owner_id}>
                  <Link href={`/labs/${lab.owner_id}`} prefetch={false} className="block px-4 py-4 transition-colors active:bg-white/60">
                    <div className="flex items-center gap-3">
                      <Avatar name={lab.lab_name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{lab.lab_name}</p>
                        <p className="truncate text-xs font-normal text-muted">{lab.owner_name}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <AccountBadge status={lab.account_status} />
                      <SubscriptionBadge status={lab.subscription_status} />
                      <ModeBadge plan={lab.plan} />
                    </div>
                    <p className="mt-2 text-xs font-normal text-muted">
                      {planLabel(lab.plan)} · {endInfo(lab) || 'No end date'} · Keys: <KeysCell lab={lab} counts={counts} />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </PageTransition>
  );
}
