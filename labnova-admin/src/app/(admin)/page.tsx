import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listAudit, listKeyCounts, listLabs, settle, sweepExpiredKeys } from '@/lib/data';
import { daysUntil, formatDate, pktDay, relativeDay } from '@/lib/format';
import { labMode, type Lab } from '@/lib/types';
import { AuditCompact } from '@/components/audit-list';
import { IconArrowRight, IconFlask, IconHistory, IconKeyRound, IconSearch, IconShield, IconSparkle, IconUsers } from '@/components/icons';
import {
  CapsuleChart,
  CapsuleMeter,
  Card,
  EmptyState,
  LinkCard,
  LoadProblem,
  MiniTile,
  PageHeader,
  PageTransition,
  RingChip,
  SegmentBar,
  StatCard,
  TitlePill,
  type ChartBar,
} from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Dashboard' };

const COLORS = { teal: '#0B6B73', ink: '#0F1210', grey: '#B8C0B3', green: '#0B6B4E', lime: '#D3E64A', amber: '#C98A1B', red: '#B42318' };

const RANGES = [7, 14, 30] as const;
type Search = Record<string, string | string[] | undefined>;

const dayLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Karachi' });

function percent(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

/** New labs per day (Pakistan time) for the last `days` days; the lime part of each bar is labs now on a paid plan. */
function newLabBars(labs: Lab[], days: number, now: Date): ChartBar[] {
  const perDay = new Map<string, { all: number; paid: number }>();
  for (const lab of labs) {
    const day = pktDay(lab.created_at);
    if (!day) continue;
    const entry = perDay.get(day) ?? { all: 0, paid: 0 };
    entry.all += 1;
    if (lab.subscription_status === 'active') entry.paid += 1;
    perDay.set(day, entry);
  }
  const today = pktDay(now.toISOString());
  const bars: ChartBar[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 86_400_000);
    const key = pktDay(date.toISOString());
    const entry = perDay.get(key) ?? { all: 0, paid: 0 };
    bars.push({ key, label: dayLabel.format(date), value: entry.all, highlight: entry.paid, current: key === today });
  }
  return bars;
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const rangeRaw = Number.parseInt(String((await searchParams).range ?? ''), 10);
  const range = (RANGES as readonly number[]).includes(rangeRaw) ? rangeRaw : 14;

  // Keys that passed their expiry date get their "Key expired" history entry the first time anyone looks
  // (at most once a minute; see sweepExpiredKeys).
  await sweepExpiredKeys();
  const [labsRes, countsRes, activityRes] = await Promise.all([
    settle(listLabs()),
    settle(listKeyCounts()),
    settle(listAudit({ limit: 8 })),
  ]);

  if (!labsRes.data) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <LoadProblem kind={labsRes.error} what="The list of labs" />
      </>
    );
  }

  const labs = labsRes.data;
  const counts = countsRes.data;

  const activeLabs = labs.filter((l) => l.account_status === 'active').length;
  const suspendedLabs = labs.filter((l) => l.account_status === 'suspended').length;
  const trialLabs = labs.filter((l) => l.subscription_status === 'trial').length;
  const paidLabs = labs.filter((l) => l.subscription_status === 'active').length;
  const expiredLabs = labs.filter((l) => l.subscription_status === 'expired').length;
  const offlineLabs = labs.filter((l) => labMode(l.plan) === 'offline');
  const onlineLabs = labs.filter((l) => labMode(l.plan) === 'online');
  const noPlanLabs = labs.filter((l) => labMode(l.plan) === null);

  let keysTotal = 0;
  let keysUnused = 0;
  let keysActivated = 0;
  let keysRevoked = 0;
  let keysExpired = 0;
  for (const c of counts?.values() ?? []) {
    keysTotal += c.total;
    keysUnused += c.unused;
    keysActivated += c.activated;
    keysRevoked += c.revoked;
    keysExpired += c.expired;
  }
  const labsWithExpiredKeys = counts ? labs.filter((l) => l.account_status === 'active' && (counts.get(l.owner_id)?.expired ?? 0) > 0) : [];

  const offlineWithoutKey = counts ? offlineLabs.filter((l) => l.account_status === 'active' && (counts.get(l.owner_id)?.total ?? 0) === 0) : [];

  const expiring: { lab: Lab; days: number; kind: string; date: string | null }[] = [];
  for (const lab of labs) {
    if (lab.account_status !== 'active') continue;
    if (lab.subscription_status === 'active') {
      const d = daysUntil(lab.subscription_ends_at);
      if (d !== null && d <= 14) expiring.push({ lab, days: d, kind: 'Subscription', date: lab.subscription_ends_at });
    } else if (lab.subscription_status === 'trial') {
      const d = daysUntil(lab.trial_ends_at);
      if (d !== null && d <= 7) expiring.push({ lab, days: d, kind: 'Free trial', date: lab.trial_ends_at });
    }
  }
  expiring.sort((a, b) => a.days - b.days);

  const attentionCount = offlineWithoutKey.length + labsWithExpiredKeys.length + expiring.length + suspendedLabs;

  const now = new Date();
  const bars = newLabBars(labs, range, now);
  const newInRange = bars.reduce((sum, b) => sum + b.value, 0);
  const rangeHref = (n: number) => (n === 14 ? '/' : `/?range=${n}`);

  return (
    <PageTransition>
      <PageHeader
        title={
          <>
            Managing <TitlePill icon={<IconUsers size={20} />} /> your labs and <TitlePill tone="lime" icon={<IconSparkle size={20} />} /> plans
          </>
        }
        description="Every lab and Basic Offline activation key at a glance."
        actions={
          <>
            <Link href="/audit" className="btn-secondary">
              <IconHistory size={16} /> Audit logs
            </Link>
            <Link href="/labs" className="btn-primary">
              <IconSearch size={16} /> Find a lab
            </Link>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="min-w-0 space-y-5">
          {/* The three headline cards */}
          <div className="grid gap-5 md:grid-cols-3">
            <StatCard
              tone="soft"
              icon={<IconFlask size={20} />}
              title="Active labs"
              value={activeLabs}
              of={labs.length}
              chip={<RingChip percent={percent(activeLabs, labs.length)} />}
              href="/labs?status=active"
              hrefLabel="Open the list of active labs"
            >
              <CapsuleMeter value={activeLabs} total={labs.length} label={`${activeLabs} of ${labs.length} labs are active`} />
            </StatCard>

            <StatCard
              tone="lime"
              icon={<IconKeyRound size={20} />}
              title="Keys in use"
              value={counts ? keysActivated : '—'}
              of={counts ? keysTotal : undefined}
              chip={counts ? <RingChip tone="lime" percent={percent(keysActivated, keysTotal)} /> : undefined}
              href="/labs?plan=basic_offline"
              hrefLabel="Open the Basic Offline labs"
            >
              {counts ? (
                <CapsuleMeter tone="lime" value={keysActivated} total={keysTotal} label={`${keysActivated} of ${keysTotal} activation keys are in use`} />
              ) : (
                <p className="text-sm font-medium text-ink/70">Key totals could not be loaded.</p>
              )}
            </StatCard>

            <StatCard tone="dark" icon={<IconShield size={20} />} title="Needs attention" value={attentionCount}>
              <p className="text-sm font-normal text-ink-300">
                {attentionCount === 0 ? 'Nothing is waiting on you.' : 'Suspended accounts, endings soon and Basic Offline labs that need a key.'}
              </p>
              <Link href="#attention" className="mt-4 inline-flex h-11 w-full items-center justify-between rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-lime">
                {attentionCount === 0 ? 'See the list' : 'Review now'} <IconArrowRight size={16} />
              </Link>
            </StatCard>
          </div>

          {/* New labs */}
          <section className="card p-5 sm:p-6" aria-labelledby="chart-heading">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink" aria-hidden="true"><IconUsers size={20} /></span>
                <div>
                  <h2 id="chart-heading" className="text-xl font-normal tracking-[-0.02em] text-ink">New labs</h2>
                  <p className="text-sm font-normal text-muted">
                    <span className="font-semibold tabular-nums text-ink">{newInRange}</span> joined in the last {range} days
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <ul className="flex items-center gap-4 text-sm font-normal text-muted" aria-label="Legend">
                  <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ink" aria-hidden="true" />New labs</li>
                  <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-lime ring-1 ring-ink/10" aria-hidden="true" />On a paid plan now</li>
                </ul>
                <nav aria-label="Time range" className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-line">
                  {RANGES.map((n) => (
                    <Link
                      key={n}
                      href={rangeHref(n)}
                      prefetch={false}
                      aria-current={n === range ? 'true' : undefined}
                      className={`inline-flex h-8 items-center rounded-full px-3.5 text-xs font-semibold transition-colors ${n === range ? 'bg-ink text-white' : 'text-ink hover:bg-surface'}`}
                    >
                      {n} days
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-6">
              <CapsuleChart
                bars={bars}
                caption={`New labs per day, last ${range} days`}
                valueLabel="New labs"
                highlightLabel="On a paid plan now"
                labelEvery={range === 7 ? 1 : range === 14 ? 3 : 6}
              />
            </div>
          </section>

          {/* Overview */}
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">Overview</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              <Tile label="Total labs" value={labs.length} hint={`${noPlanLabs.length} without a plan yet`} href="/labs" />
              <Tile label="Paid" value={paidLabs} hint={suspendedLabs > 0 ? `${suspendedLabs} suspended` : 'None suspended'} href="/labs?status=sub_active" />
              <Tile label="Free trial" value={trialLabs} hint={`${expiredLabs} expired`} href="/labs?status=sub_trial" />
              <Tile label="Basic Offline" value={offlineLabs.length} hint="Runs on the lab’s PC" href="/labs?plan=basic_offline" />
              <Tile label="Premium Online" value={onlineLabs.length} hint="Cloud plans" className="col-span-2 sm:col-span-1" />
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card
              title="Offline activation keys"
              description="All labs combined"
              action={<span className="text-3xl font-light tabular-nums tracking-[-0.03em] text-ink">{keysTotal}<span className="ml-1.5 text-sm font-medium text-muted">{keysTotal === 1 ? 'key' : 'keys'}</span></span>}
            >
              {counts ? (
                <SegmentBar
                  emptyLabel="No keys yet"
                  segments={[
                    { label: 'Activated', value: keysActivated, color: COLORS.green },
                    { label: 'Unused', value: keysUnused, color: COLORS.lime },
                    { label: 'Expired', value: keysExpired, color: COLORS.amber },
                    { label: 'Revoked', value: keysRevoked, color: COLORS.red },
                  ]}
                />
              ) : (
                <LoadProblem kind={countsRes.error ?? 'failed'} what="Activation key totals" />
              )}
              <p className="mt-5 text-sm font-normal text-muted">
                <span className="font-semibold text-ink">Activated</span> keys are in use on a lab’s PC. <span className="font-semibold text-ink">Unused</span> keys are created but not entered yet. <span className="font-semibold text-ink">Expired</span> keys need extending.
              </p>
            </Card>

            <Card title="Plan mix" description="How labs are split by plan">
              <SegmentBar
                stacked
                emptyLabel="No labs yet"
                segments={[
                  { label: 'Basic Offline', value: offlineLabs.length, color: COLORS.teal },
                  { label: 'Premium Online', value: onlineLabs.length, color: COLORS.ink },
                  { label: 'No plan yet', value: noPlanLabs.length, color: COLORS.grey },
                ]}
              />
            </Card>
          </div>

          {/* Needs attention */}
          <div id="attention" className="scroll-mt-6">
            <Card
              title="Needs attention"
              description={attentionCount === 0 ? 'Nothing is waiting on you.' : `${attentionCount} item${attentionCount === 1 ? '' : 's'} to look at`}
              flush
            >
              {attentionCount === 0 ? (
                <EmptyState title="All clear">No suspended accounts, endings soon, or Basic Offline labs missing a key.</EmptyState>
              ) : (
                <ul className="divide-y divide-line">
                  {offlineWithoutKey.slice(0, 6).map((lab) => (
                    <AttentionRow key={`k-${lab.owner_id}`} lab={lab} tone="amber" title="No activation key yet" detail="Basic Offline lab — create a key so they can activate their PC." />
                  ))}
                  {labsWithExpiredKeys.slice(0, 6).map((lab) => {
                    const n = counts?.get(lab.owner_id)?.expired ?? 0;
                    return (
                      <AttentionRow
                        key={`x-${lab.owner_id}`}
                        lab={lab}
                        tone="red"
                        title={`${n} activation key${n === 1 ? '' : 's'} expired`}
                        detail="Extend the expiry so the lab’s PC keeps working."
                      />
                    );
                  })}
                  {expiring.slice(0, 8).map(({ lab, days, kind, date }) => (
                    <AttentionRow
                      key={`e-${lab.owner_id}`}
                      lab={lab}
                      tone={days < 0 ? 'red' : 'amber'}
                      title={`${kind} ${days < 0 ? 'ended' : 'ends'} ${relativeDay(date)}`}
                      detail={formatDate(date)}
                    />
                  ))}
                  {labs.filter((l) => l.account_status === 'suspended').slice(0, 4).map((lab) => (
                    <AttentionRow key={`s-${lab.owner_id}`} lab={lab} tone="red" title="Account suspended" detail="This lab has no access to LabNova." />
                  ))}
                </ul>
              )}
            </Card>
          </div>

          {/* Recent activity */}
          <Card
            title="Recent admin activity"
            description="Plan and status changes, and offline key events"
            flush
            action={
              <Link href="/audit" className="link inline-flex items-center gap-1.5 text-sm">
                View all <IconArrowRight size={14} />
              </Link>
            }
          >
            {activityRes.data ? (
              activityRes.data.length === 0 ? (
                <EmptyState title="No activity yet">Changes to labs and activation keys will appear here.</EmptyState>
              ) : (
                <AuditCompact entries={activityRes.data} />
              )
            ) : (
              <div className="p-5"><LoadProblem kind={activityRes.error} what="Recent activity" /></div>
            )}
          </Card>
        </div>

        {/* Shortcuts */}
        <aside aria-label="Shortcuts" className="space-y-3 xl:space-y-4">
          <div className="grid grid-cols-2 gap-3 xl:gap-4">
            <MiniTile href="/labs" icon={<IconFlask size={20} />} label="Labs" />
            <MiniTile href="/audit" icon={<IconHistory size={20} />} label="Audit logs" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 xl:gap-4">
            <LinkCard
              href="/labs?plan=basic_offline"
              icon={<IconKeyRound size={20} />}
              title="Offline keys"
              description={`${offlineLabs.length} Basic Offline ${offlineLabs.length === 1 ? 'lab' : 'labs'}${counts ? ` · ${keysTotal} ${keysTotal === 1 ? 'key' : 'keys'}` : ''}`}
            />
            <LinkCard
              href="/labs?status=sub_trial"
              icon={<IconSparkle size={20} />}
              title="Free trials"
              description={`${trialLabs} ${trialLabs === 1 ? 'lab is' : 'labs are'} on a free trial`}
            />
            <LinkCard
              href="/labs?status=sub_expired"
              icon={<IconHistory size={20} />}
              title="Expired subscriptions"
              description={`${expiredLabs} to follow up`}
            />
            <LinkCard href="/verify" icon={<IconShield size={20} />} title="Verify a report" description="Check a printed report by its QR code." />
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}

function Tile({ label, value, hint, href, className = '' }: { label: string; value: number; hint: string; href?: string; className?: string }) {
  const body = (
    <>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-4xl font-light leading-none tracking-[-0.03em] tabular-nums text-ink">{value}</p>
      <p className="mt-2 min-h-[1.125rem] text-xs font-normal text-muted">{hint}</p>
    </>
  );
  const box = `rounded-card bg-surface p-4 sm:p-5 ${className}`;
  return href ? (
    <Link href={href} prefetch={false} className={`${box} transition-colors hover:bg-surface-strong`}>{body}</Link>
  ) : (
    <div className={box}>{body}</div>
  );
}

function AttentionRow({ lab, tone, title, detail }: { lab: Lab; tone: 'amber' | 'red'; title: string; detail: string }) {
  return (
    <li>
      <Link href={`/labs/${lab.owner_id}`} prefetch={false} className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/60 sm:px-6">
        <span className={`h-2 w-2 shrink-0 rounded-full ${tone === 'red' ? 'bg-bad' : 'bg-[#D9941A]'}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{lab.lab_name}</p>
          <p className="truncate text-sm font-normal text-muted">{title} · {detail}</p>
        </div>
        <IconArrowRight size={16} className="shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
      </Link>
    </li>
  );
}
