import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listAuditDeletions, settle } from '@/lib/data';
import { formatDateTime } from '@/lib/format';
import { IconHistory } from '@/components/icons';
import { Card, EmptyState, LoadProblem, Notice, PageHeader, PageTransition, TitlePill } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Deletion history' };

const PAGE_SIZE = 25;

type Search = Record<string, string | string[] | undefined>;

const SOURCE_NAMES: [string, string][] = [
  ['account', 'admin changes'],
  ['license', 'key & device events'],
  ['lab_online', 'Online activity'],
  ['lab_offline', 'Offline PC activity'],
];

export default async function DeletionsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const raw = (await searchParams).page;
  const parsed = Number.parseInt(typeof raw === 'string' ? raw : '1', 10);
  const page = Number.isFinite(parsed) ? Math.max(1, Math.min(10_000, parsed)) : 1;

  const res = await settle(listAuditDeletions(PAGE_SIZE, (page - 1) * PAGE_SIZE));
  const rows = res.data?.rows ?? [];
  const total = res.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <PageTransition>
      <PageHeader
        title={
          <>
            Deletion <TitlePill icon={<IconHistory size={20} />} /> history
          </>
        }
        description="Every time audit entries were deleted: who did it, when, which lab, how many and why. What the entries said is never kept."
        back={{ href: '/audit', label: 'Audit logs' }}
        crumb="Deletion history"
      />

      <Card flush className="overflow-hidden">
        {!res.data ? (
          <div className="p-5">
            <LoadProblem kind={res.error} what="The deletion history" updateFile="supabase/audit_admin_phase3.sql" />
          </div>
        ) : rows.length === 0 ? (
          <EmptyState title="Nothing has been deleted">
            When an administrator deletes audit entries, a short record appears here.
          </EmptyState>
        ) : (
          <>
            <div className="relative hidden overflow-x-auto md:block">
              <table className="w-full min-w-[820px] text-left">
                <thead className="border-b border-line bg-surface/70">
                  <tr>
                    <th className="th w-40">When</th>
                    <th className="th">Who</th>
                    <th className="th">Lab</th>
                    <th className="th">What was deleted</th>
                    <th className="th">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((row) => (
                    <tr key={String(row.id)} className="align-top">
                      <td className="td text-sm font-semibold text-ink">{formatDateTime(row.deleted_at)}</td>
                      <td className="td text-sm font-medium text-ink [overflow-wrap:anywhere]">{row.actor_email ?? '—'}</td>
                      <td className="td text-sm">{labCell(row)}</td>
                      <td className="td text-sm">{whatCell(row)}</td>
                      <td className="td text-sm font-normal text-muted [overflow-wrap:anywhere]">{row.reason ?? <span className="text-faint">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-line md:hidden">
              {rows.map((row) => (
                <li key={String(row.id)} className="space-y-1 px-4 py-4 text-sm">
                  <p className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-ink">{formatDateTime(row.deleted_at)}</span>
                    <span className="text-xs font-normal text-muted">{row.actor_email ?? '—'}</span>
                  </p>
                  <p>{labCell(row)}</p>
                  <p>{whatCell(row)}</p>
                  {row.reason && <p className="font-normal text-muted [overflow-wrap:anywhere]">Reason: {row.reason}</p>}
                </li>
              ))}
            </ul>

            <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 text-sm font-normal text-muted">
              <span>
                {total.toLocaleString('en-GB')} {total === 1 ? 'deletion' : 'deletions'} · Page {page.toLocaleString('en-GB')} of {pages.toLocaleString('en-GB')}
              </span>
              <span className="flex gap-2">
                <PageLink href={page > 1 ? `/audit/deletions${page - 1 > 1 ? `?page=${page - 1}` : ''}` : null}>Newer</PageLink>
                <PageLink href={page < pages ? `/audit/deletions?page=${page + 1}` : null}>Older</PageLink>
              </span>
            </nav>
          </>
        )}
      </Card>

      <div className="mt-5">
        <Notice title="Why this list exists">
          Deleting audit entries is limited to administrators who were given that permission. This list cannot be edited or deleted from the Admin Panel.
        </Notice>
      </div>
    </PageTransition>
  );
}

function labCell(row: { owner_id: string | null; lab_name: string | null; lab_count: number }) {
  if (row.owner_id) {
    return (
      <Link href={`/labs/${row.owner_id}`} prefetch={false} className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
        {row.lab_name ?? 'Unknown lab'}
      </Link>
    );
  }
  return <span className="font-normal text-muted">{row.lab_count > 1 ? `${row.lab_count} labs` : '—'}</span>;
}

function whatCell(row: { row_count: number; mode: 'selected' | 'matching'; filter_summary: string | null; counts: Record<string, number | undefined> | null }) {
  const parts = SOURCE_NAMES.map(([key, label]) => ({ n: Number(row.counts?.[key] ?? 0), label })).filter((p) => p.n > 0);
  const copies = Number(row.counts?.migrated_copies ?? 0);
  return (
    <span className="block">
      <span className="block font-semibold text-ink">
        {Number(row.row_count).toLocaleString('en-GB')} {Number(row.row_count) === 1 ? 'entry' : 'entries'}
        <span className="ml-2 text-xs font-normal text-muted">{row.mode === 'matching' ? 'everything a filter matched' : 'chosen from the list'}</span>
      </span>
      {parts.length > 0 && (
        <span className="mt-0.5 block text-xs font-normal text-muted">
          {parts.map((p) => `${p.n.toLocaleString('en-GB')} ${p.label}`).join(' · ')}
          {copies > 0 ? ` · ${copies.toLocaleString('en-GB')} moved to Online history` : ''}
        </span>
      )}
      {row.filter_summary && row.mode === 'matching' && <span className="mt-0.5 block text-xs font-normal text-muted [overflow-wrap:anywhere]">Filters: {row.filter_summary}</span>}
    </span>
  );
}

function PageLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <span className="btn-secondary btn-sm pointer-events-none opacity-40" aria-disabled="true">{children}</span>;
  return <Link href={href} className="btn-secondary btn-sm">{children}</Link>;
}
