import type { Metadata } from 'next';
import Form from 'next/form';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { canDeleteAudit, listLabs, searchAudit, settle, sweepExpiredKeys } from '@/lib/data';
import {
  ACTION_CATEGORIES,
  ALL_ACTION_LABELS,
  ENTITY_LABELS,
  ENTITY_TYPES,
  SINGLE_ACTION_CODES,
  SOURCE_FILTERS,
} from '@/lib/audit-catalog';
import {
  auditHref,
  auditQueryString,
  isFiltering,
  MAX_DELETE_MATCHING,
  MAX_OFFSET,
  PAGE_SIZES,
  parseAuditFilters,
  presetRange,
  toSearch,
} from '@/lib/audit-query';
import { formatDate } from '@/lib/format';
import { AuditExplorer, type DeleteAllScope } from '@/components/audit-explorer';
import { LabPicker } from '@/components/lab-picker';
import { IconArrowRight, IconDownload, IconHistory, IconSearch } from '@/components/icons';
import { AccountBadge, Avatar, Card, EmptyState, LoadProblem, ModeBadge, Notice, PageHeader, PageTransition, PillTabs, SubscriptionBadge, TitlePill } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Audit logs' };

type Search = Record<string, string | string[] | undefined>;

const SOURCE_TAB_LABELS: Record<string, string> = {
  '': 'Everything',
  lab: 'Lab activity',
  lab_online: 'Online mode',
  lab_offline: 'Offline PCs',
  account: 'Admin changes',
  license: 'Keys & devices',
};

export default async function AuditPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const filters = parseAuditFilters(await searchParams);
  const { page, size } = filters;

  // Keys that have passed their expiry date get their "Key expired" entry written the first time anyone looks
  // (at most once a minute; see sweepExpiredKeys).
  await sweepExpiredKeys();

  const [labsRes, auditRes, canDelete] = await Promise.all([
    settle(listLabs()),
    settle(searchAudit({ ...toSearch(filters), limit: size, offset: (page - 1) * size })),
    canDeleteAudit(),
  ]);

  const labs = [...(labsRes.data ?? [])].sort((a, b) => a.lab_name.localeCompare(b.lab_name));
  const lab = filters.lab ? (labs.find((l) => l.owner_id === filters.lab) ?? null) : null;
  const rows = auditRes.data?.rows ?? [];
  const total = auditRes.data?.total ?? 0;
  const capped = auditRes.data?.capped ?? false;
  const engine = auditRes.data?.engine ?? 'v2';
  const pages = Math.max(1, Math.ceil(total / size));
  const filtering = isFiltering(filters);
  const first = (page - 1) * size + 1;
  const last = (page - 1) * size + rows.length;
  const totalText = `${total.toLocaleString('en-GB')}${capped ? '+' : ''}`;
  const hasOlder = capped ? rows.length === size && page * size < MAX_OFFSET : page < pages;

  const today = presetRange(1);
  const week = presetRange(7);
  const month = presetRange(30);
  const presets = [
    { label: 'Today', range: today },
    { label: 'Last 7 days', range: week },
    { label: 'Last 30 days', range: month },
  ];

  const sourceTabs = SOURCE_FILTERS.map((f) => ({
    label: SOURCE_TAB_LABELS[f.value] ?? f.label,
    href: auditHref(filters, { source: f.value, page: 1 }),
    active: filters.source === f.value,
  }));

  const exportHref = `/audit/export?${auditQueryString(filters, { page: 1, size: 50 })}`;

  // "Delete everything this list shows" needs a lab or a complete date range, and at most MAX_DELETE_MATCHING entries.
  const hasScope = Boolean(filters.lab || (filters.from && filters.to));
  const tooMany = capped || total > MAX_DELETE_MATCHING;
  const deleteAll: DeleteAllScope | null =
    canDelete && auditRes.data && total > 0
      ? {
          filtersQuery: auditQueryString(filters, { page: 1, size: 50 }),
          total,
          enabled: hasScope && !tooMany,
          hint: !hasScope
            ? 'To delete a whole list at once, choose a lab or a from–to date range first.'
            : tooMany
              ? `More than ${MAX_DELETE_MATCHING.toLocaleString('en-GB')} entries match. Narrow the dates to delete them in parts.`
              : null,
          summary: [
            lab ? `Lab: ${lab.lab_name}` : filters.lab ? 'One lab' : 'All labs',
            filters.from || filters.to ? `Dates: ${filters.from ? formatDate(filters.from) : 'the start'} to ${filters.to ? formatDate(filters.to) : 'today'}` : '',
            filters.source ? `Where from: ${SOURCE_TAB_LABELS[filters.source] ?? filters.source}` : '',
            filters.type ? `Action: ${ACTION_CATEGORIES.find((c) => c.value === filters.type)?.label ?? ALL_ACTION_LABELS[filters.type] ?? filters.type}` : '',
            filters.entity ? `Record type: ${ENTITY_LABELS[filters.entity] ?? filters.entity}` : '',
            filters.actor ? `Who: contains “${filters.actor}”` : '',
            filters.q ? `Search: “${filters.q}”` : '',
          ].filter(Boolean),
        }
      : null;

  // The extra filters stay folded away unless one of them is in use.
  const advancedOpen = Boolean(filters.type || filters.entity || filters.actor || filters.from || filters.to || size !== 50);

  return (
    <PageTransition>
      <PageHeader
        title={
          <>
            Every lab’s <TitlePill icon={<IconHistory size={20} />} /> audit history
          </>
        }
        description="What labs do Online and on their Offline PCs, plus plan changes and activation-key events. Times are shown in Pakistan time."
        actions={
          <>
            <Link href="/audit/deletions" prefetch={false} className="btn-secondary">
              <IconHistory size={16} /> Deletion history
            </Link>
            {auditRes.data && total > 0 && (
              <a href={exportHref} download className="btn-secondary">
                <IconDownload size={16} /> Export CSV
              </a>
            )}
          </>
        }
      />

      {engine === 'legacy' && (
        <div className="mb-5">
          <Notice tone="warn" title="One more database update is available">
            Faster searching and deleting audit entries need <span className="font-mono">supabase/audit_admin_phase3.sql</span> to be run once in the
            Supabase SQL editor. Until then this page works as before, without the delete buttons.
          </Notice>
        </div>
      )}

      <PillTabs items={sourceTabs} label="Where the activity comes from" />

      {/* <Form> applies the filters as an in-app navigation (no page reload); keyed so it always shows the URL's current values. */}
      <Form
        key={auditQueryString({ ...filters, page: 1 })}
        action="/audit"
        data-nav-form=""
        className="card mb-5 p-4 sm:p-5"
      >
        <input type="hidden" name="source" value={filters.source} />

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_auto]">
          <div>
            <label htmlFor="q" className="sr-only">Search</label>
            <div className="relative">
              <IconSearch size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={filters.q}
                maxLength={100}
                placeholder="Search what happened, who did it, a patient or report ID, a lab or PC name…"
                className="input pl-10"
              />
            </div>
          </div>
          <LabPicker labs={labs.map((l) => ({ id: l.owner_id, name: l.lab_name, email: l.email }))} value={filters.lab} />
          <button type="submit" className="btn-primary">Apply</button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted">Quick range:</span>
          {presets.map((p) => (
            <Link
              key={p.label}
              href={auditHref(filters, { from: p.range.from, to: p.range.to, page: 1 })}
              className={`inline-flex h-8 items-center rounded-full px-3.5 text-xs font-semibold transition-colors ${
                filters.from === p.range.from && filters.to === p.range.to ? 'bg-lime text-ink' : 'bg-white text-ink ring-1 ring-line hover:ring-line-strong'
              }`}
            >
              {p.label}
            </Link>
          ))}
          {filtering && <Link href="/audit" className="ml-auto text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink">Clear all</Link>}
        </div>

        <details className="group mt-4 border-t border-line pt-3" open={advancedOpen}>
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <IconArrowRight size={14} className="transition-transform group-open:rotate-90" /> More filters
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="type" className="label">Action type</label>
              <select id="type" name="type" defaultValue={filters.type} className="input">
                <option value="">All actions</option>
                <optgroup label="Groups">
                  {ACTION_CATEGORIES.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Single action">
                  {SINGLE_ACTION_CODES.map((a) => (
                    <option key={a} value={a}>{ALL_ACTION_LABELS[a]}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div>
              <label htmlFor="entity" className="label">Record type</label>
              <select id="entity" name="entity" defaultValue={filters.entity} className="input">
                <option value="">All records</option>
                {ENTITY_TYPES.map((e) => (
                  <option key={e} value={e}>{ENTITY_LABELS[e]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="actor" className="label">Who (e-mail)</label>
              <input id="actor" name="actor" defaultValue={filters.actor} maxLength={100} placeholder="Part of an e-mail address" className="input" />
            </div>
            <div>
              <label htmlFor="from" className="label">From</label>
              <input id="from" name="from" type="date" defaultValue={filters.from} className="input" />
            </div>
            <div>
              <label htmlFor="to" className="label">To</label>
              <input id="to" name="to" type="date" defaultValue={filters.to} className="input" />
            </div>
            <div>
              <label htmlFor="size" className="label">Rows per page</label>
              <select id="size" name="size" defaultValue={String(size)} className="input">
                {PAGE_SIZES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </details>
      </Form>

      {lab && (
        <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-card bg-lime p-5 sm:p-6" aria-label={`Selected lab: ${lab.lab_name}`}>
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name={lab.lab_name} size={48} />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/70">Showing one lab</p>
              <h2 className="truncate text-2xl font-normal tracking-[-0.02em] text-ink">{lab.lab_name}</h2>
              <p className="truncate text-sm font-normal text-ink/75">{lab.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AccountBadge status={lab.account_status} labeled />
            <SubscriptionBadge status={lab.subscription_status} labeled />
            <ModeBadge plan={lab.plan} />
            <Link href={`/labs/${lab.owner_id}`} prefetch={false} className="btn-primary btn-sm ml-1">
              Open lab <IconArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      <Notice title="About activity from Offline PCs">
        A Basic Offline PC sends its activity the next time it is online, so it can show up here later than it happened. The date and time
        shown are when it happened on the PC. Patient details and test results are never sent — only who did what, and which record it was about.
      </Notice>

      <div className="mt-5">
        <Card flush className="overflow-hidden">
          {!auditRes.data ? (
            <div className="p-5">
              <LoadProblem kind={auditRes.error} what="The audit log" updateFile="supabase/phase2_features.sql" />
            </div>
          ) : rows.length === 0 ? (
            page > 1 ? (
              <EmptyState
                title="No more results"
                action={<Link href={auditHref(filters, { page: 1 })} className="btn-secondary btn-sm">Back to the first page</Link>}
              >
                This page is past the end of the results.
              </EmptyState>
            ) : (
              <EmptyState
                title={filtering ? 'Nothing matches these filters' : 'No activity recorded yet'}
                action={filtering ? <Link href="/audit" className="btn-secondary btn-sm">Clear filters</Link> : undefined}
              >
                {filtering
                  ? 'Try a wider date range, or a different lab, action or search.'
                  : 'What labs do, plan changes and activation key events will be listed here.'}
              </EmptyState>
            )
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3 text-sm font-normal text-muted">
                <span>
                  <span className="font-semibold tabular-nums text-ink">{totalText}</span> {total === 1 && !capped ? 'event' : 'events'}
                  {filtering ? ' match your filters' : ''}
                  {capped && <span className="text-xs"> · narrow the dates for an exact count</span>}
                </span>
                <span className="text-xs">Newest first · select a row for details</span>
              </div>
              <AuditExplorer rows={rows} canDelete={canDelete} deleteAll={deleteAll} />
              <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 text-sm font-normal text-muted">
                <span>
                  Showing {first.toLocaleString('en-GB')}–{last.toLocaleString('en-GB')} of {totalText}
                  {capped ? ` · Page ${page.toLocaleString('en-GB')}` : ` · Page ${page.toLocaleString('en-GB')} of ${pages.toLocaleString('en-GB')}`}
                </span>
                <span className="flex gap-2">
                  <PageLink href={page > 1 ? auditHref(filters, { page: 1 }) : null}>First</PageLink>
                  <PageLink href={page > 1 ? auditHref(filters, { page: page - 1 }) : null}>Newer</PageLink>
                  <PageLink href={hasOlder ? auditHref(filters, { page: page + 1 }) : null}>Older</PageLink>
                  {!capped && <PageLink href={page < pages ? auditHref(filters, { page: pages }) : null}>Last</PageLink>}
                </span>
              </nav>
            </>
          )}
        </Card>
      </div>

      {engine === 'v2' && !canDelete && (
        <p className="mt-4 text-xs font-normal text-muted">
          Only administrators who were given the delete permission see the delete buttons. Every deletion is recorded under Deletion history.
        </p>
      )}
    </PageTransition>
  );
}

function PageLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <span className="btn-secondary btn-sm pointer-events-none opacity-40" aria-disabled="true">{children}</span>;
  return <Link href={href} className="btn-secondary btn-sm">{children}</Link>;
}
