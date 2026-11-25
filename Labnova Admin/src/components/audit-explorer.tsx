'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { deleteAuditEntriesAction, deleteAuditMatchingAction } from '@/app/(admin)/audit/actions';
import { Change } from '@/components/audit-list';
import { Drawer } from '@/components/drawer';
import { IconAlert, IconArrowRight, IconChevronRight, IconMonitor, IconTrash } from '@/components/icons';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { changedFieldNames, extraDetails, fieldChanges, type Tone } from '@/lib/audit-catalog';
import { describeRow, whenParts, type RowView } from '@/lib/audit';
import { formatDateTime } from '@/lib/format';
import type { AuditRow } from '@/lib/types';

const DOT: Record<Tone, string> = {
  red: 'bg-bad',
  green: 'bg-ok',
  amber: 'bg-[#D9941A]',
  teal: 'bg-teal',
  blue: 'bg-ink',
  slate: 'bg-faint',
};

const SOURCE_CHIP: Record<AuditRow['source'], string> = {
  account: 'bg-lime-soft text-ink',
  license: 'bg-warn-soft text-warn',
  lab_online: 'bg-ok-soft text-ok',
  lab_offline: 'bg-teal-soft text-teal',
};

function SourceChip({ row, view }: { row: AuditRow; view: RowView }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${SOURCE_CHIP[row.source]}`}>
      {view.sourceLabel}
    </span>
  );
}

function When({ value }: { value: string }) {
  const [date, time] = formatDateTime(value).split(', ');
  return (
    <span className="block leading-snug">
      <span className="block text-sm font-semibold text-ink">{date}</span>
      <span className="block text-xs font-normal text-muted">{time ?? ''}</span>
    </span>
  );
}

/** What "delete everything that matches" would do, worked out by the page from the filters. */
export type DeleteAllScope = {
  /** The page's own filters as a query string (validated again on the server). */
  filtersQuery: string;
  /** Entries the filters match; only usable when `enabled`. */
  total: number;
  enabled: boolean;
  /** Why it is not available (shown instead of the button). */
  hint: string | null;
  /** Plain-words summary of the filters, e.g. ["Lab: Alpha Lab", "From 01 Nov 2026 to 10 Nov 2026"]. */
  summary: string[];
};

type Dialog = { kind: 'selected' } | { kind: 'all' } | { kind: 'one'; id: string } | null;

function Checkbox({ checked, onChange, label, indeterminate = false }: { checked: boolean; onChange: (checked: boolean) => void; label: string; indeterminate?: boolean }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(el) => {
        if (el) el.indeterminate = indeterminate && !checked;
      }}
      onChange={(event) => onChange(event.target.checked)}
      onClick={(event) => event.stopPropagation()}
      aria-label={label}
      className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded-md border-line-strong accent-ink"
    />
  );
}

/**
 * The audit table (cards on a phone), the details drawer and — for admins who have the delete permission — row
 * selection and the delete dialogs. Every row's details are already in the page (the browser never talks to the
 * database), so opening the drawer is instant and needs no request. Deleting goes through server actions.
 */
export function AuditExplorer({ rows, canDelete = false, deleteAll = null }: { rows: AuditRow[]; canDelete?: boolean; deleteAll?: DeleteAllScope | null }) {
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [openId, setOpenId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [dialog, setDialog] = useState<Dialog>(null);
  const [reason, setReason] = useState('');
  const [typed, setTyped] = useState('');
  const [error, setError] = useState<string | null>(null);

  const views = useMemo(() => new Map(rows.map((row) => [row.id, describeRow(row)])), [rows]);
  const selected = openId ? (rows.find((row) => row.id === openId) ?? null) : null;

  // A new page of results (or one after a delete) drops ticks of rows that are no longer on it.
  useEffect(() => {
    setChecked((current) => {
      const ids = new Set(rows.map((row) => row.id));
      const next = new Set([...current].filter((id) => ids.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [rows]);

  const allChecked = rows.length > 0 && checked.size === rows.length;

  function toggle(id: string, on: boolean) {
    setChecked((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function toggleAll(on: boolean) {
    setChecked(on ? new Set(rows.map((row) => row.id)) : new Set());
  }

  function openDialog(next: Dialog) {
    setReason('');
    setTyped('');
    setError(null);
    setDialog(next);
  }

  function closeDialog() {
    if (pending) return;
    setDialog(null);
  }

  function finish(deleted: number) {
    toast.success(deleted === 1 ? '1 entry deleted' : `${deleted.toLocaleString('en-GB')} entries deleted`, 'A short record of this was added to the deletion history.');
    setDialog(null);
    setOpenId(null);
    setChecked(new Set());
    router.refresh();
  }

  function confirm() {
    if (!dialog) return;
    setError(null);
    startTransition(async () => {
      let result;
      if (dialog.kind === 'all') {
        if (!deleteAll) return;
        result = await deleteAuditMatchingAction(deleteAll.filtersQuery, deleteAll.total, reason, typed);
      } else {
        const ids = dialog.kind === 'one' ? [dialog.id] : [...checked];
        result = await deleteAuditEntriesAction(ids, reason);
      }
      if (result.ok) finish(result.deleted);
      else {
        setError(result.error);
        toast.error('Not deleted', result.error);
      }
    });
  }

  const dialogCount = dialog?.kind === 'all' ? (deleteAll?.total ?? 0) : dialog?.kind === 'one' ? 1 : checked.size;

  return (
    <>
      {canDelete && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-surface/60 px-5 py-2.5">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink">
            <Checkbox checked={allChecked} indeterminate={checked.size > 0} onChange={toggleAll} label="Select every entry on this page" />
            Select this page
          </label>
          {deleteAll?.enabled ? (
            <button type="button" onClick={() => openDialog({ kind: 'all' })} className="btn-danger-outline btn-sm">
              <IconTrash size={15} /> Delete all {deleteAll.total.toLocaleString('en-GB')} matching…
            </button>
          ) : (
            deleteAll?.hint && <span className="text-xs font-normal text-muted">{deleteAll.hint}</span>
          )}
        </div>
      )}

      <div className="relative hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-line bg-surface/70">
            <tr>
              {canDelete && <th className="th w-12"><span className="sr-only">Select</span></th>}
              <th className="th w-36">When</th>
              <th className="th">What happened</th>
              <th className="th">Who</th>
              <th className="th">Lab</th>
              <th className="th w-32">Record</th>
              <th className="th w-24"><span className="sr-only">Details</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => {
              const view = views.get(row.id)!;
              const isChecked = checked.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => setOpenId(row.id)}
                  className={`cursor-pointer align-top transition-colors hover:bg-white/60 ${isChecked ? 'bg-lime-soft/60' : ''}`}
                >
                  {canDelete && (
                    <td className="td w-12 pr-0">
                      <Checkbox checked={isChecked} onChange={(on) => toggle(row.id, on)} label={`Select: ${view.title}, ${formatDateTime(row.created_at)}`} />
                    </td>
                  )}
                  <td className="td"><When value={row.created_at} /></td>
                  <td className="td min-w-[16rem]">
                    <span className="flex items-start gap-2.5">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[view.tone]}`} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{view.title}</span>
                        {view.summary && <span className="mt-0.5 line-clamp-2 block text-sm font-normal text-muted [overflow-wrap:anywhere]">{view.summary}</span>}
                        <span className="mt-1.5 flex flex-wrap items-center gap-2">
                          <SourceChip row={row} view={view} />
                          {(view.from !== null || view.to !== null) && <Change view={view} />}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="td min-w-[10rem] text-sm">
                    <span className="block font-medium text-ink [overflow-wrap:anywhere]">{view.who}</span>
                    <span className="text-xs font-normal text-muted">{view.whoKind}{row.device_name ? ` · ${row.device_name}` : ''}</span>
                  </td>
                  <td className="td text-sm">
                    {row.owner_id ? (
                      <Link
                        href={`/labs/${row.owner_id}`}
                        prefetch={false}
                        onClick={(event) => event.stopPropagation()}
                        className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {row.lab_name ?? 'Unknown lab'}
                      </Link>
                    ) : (
                      <span className="text-faint">—</span>
                    )}
                  </td>
                  <td className="td text-sm font-normal text-muted">{view.entity || <span className="text-faint">—</span>}</td>
                  <td className="td text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenId(row.id);
                      }}
                      aria-haspopup="dialog"
                      aria-label={`Show details: ${view.title}, ${formatDateTime(row.created_at)}`}
                      className="btn-secondary btn-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line md:hidden">
        {rows.map((row) => {
          const view = views.get(row.id)!;
          const isChecked = checked.has(row.id);
          return (
            <li key={row.id} className={`flex items-start ${isChecked ? 'bg-lime-soft/60' : ''}`}>
              {canDelete && (
                <span className="pl-4 pt-[1.15rem]">
                  <Checkbox checked={isChecked} onChange={(on) => toggle(row.id, on)} label={`Select: ${view.title}, ${formatDateTime(row.created_at)}`} />
                </span>
              )}
              <button
                type="button"
                onClick={() => setOpenId(row.id)}
                aria-haspopup="dialog"
                className="flex min-w-0 flex-1 items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-white/60"
              >
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[view.tone]}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">{view.title}</span>
                    <span className="shrink-0 text-xs font-normal text-muted">{formatDateTime(row.created_at)}</span>
                  </span>
                  {view.summary && <span className="mt-0.5 line-clamp-2 block text-sm font-normal text-muted [overflow-wrap:anywhere]">{view.summary}</span>}
                  <span className="mt-1.5 block text-xs font-normal text-muted">
                    {[row.lab_name, view.who, view.entity].filter(Boolean).join(' · ')}
                  </span>
                  <span className="mt-1.5 block"><SourceChip row={row} view={view} /></span>
                </span>
                <IconChevronRight size={16} className="mt-1 shrink-0 text-faint" />
              </button>
            </li>
          );
        })}
      </ul>

      {canDelete && checked.size > 0 && !dialog && (
        <div className="fixed inset-x-3 bottom-4 z-40 mx-auto flex max-w-md animate-pop-in items-center justify-between gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-white shadow-pop sm:bottom-6">
          <span className="text-sm font-semibold tabular-nums" role="status">{checked.size.toLocaleString('en-GB')} selected</span>
          <span className="flex items-center gap-1.5">
            <button type="button" onClick={() => setChecked(new Set())} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-semibold text-ink-300 transition-colors hover:text-white">
              Clear
            </button>
            <button type="button" onClick={() => openDialog({ kind: 'selected' })} className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-bad transition-colors hover:bg-bad-soft">
              <IconTrash size={15} /> Delete
            </button>
          </span>
        </div>
      )}

      {selected && (
        <AuditDetails
          row={selected}
          view={views.get(selected.id)!}
          onClose={() => setOpenId(null)}
          onDelete={
            canDelete
              ? () => {
                  setOpenId(null);
                  openDialog({ kind: 'one', id: selected.id });
                }
              : undefined
          }
        />
      )}

      {dialog && (
        <Modal
          title={
            dialog.kind === 'all'
              ? `Delete all ${dialogCount.toLocaleString('en-GB')} matching entries?`
              : dialogCount === 1
                ? 'Delete this entry?'
                : `Delete ${dialogCount.toLocaleString('en-GB')} entries?`
          }
          onClose={closeDialog}
          closable={!pending}
        >
          <div className="space-y-4">
            <p className="text-sm font-normal text-ink">
              {dialog.kind === 'all'
                ? 'Every entry the current filters match will be removed from the audit log. This cannot be undone.'
                : 'The selected audit entries will be removed from the audit log. This cannot be undone.'}
            </p>

            {dialog.kind === 'all' && deleteAll && deleteAll.summary.length > 0 && (
              <ul className="space-y-1 rounded-2xl bg-surface px-4 py-3 text-sm font-normal text-ink">
                {deleteAll.summary.map((line) => (
                  <li key={line} className="[overflow-wrap:anywhere]">{line}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-2.5 rounded-2xl bg-warn-soft px-4 py-3 text-sm font-medium text-warn">
              <IconAlert size={17} className="mt-0.5 shrink-0" />
              <span>
                Only a short record is kept (who deleted, when, which lab, how many and why) — never what the entries said. If an Offline PC entry was
                already moved to the lab’s Online history, that copy is removed too.
              </span>
            </div>

            <div>
              <label htmlFor="delete-reason" className="label">Reason <span className="font-normal text-muted">(optional)</span></label>
              <input
                id="delete-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                maxLength={200}
                placeholder="For example: test data from setup"
                className="input"
                autoComplete="off"
              />
            </div>

            {dialog.kind === 'all' && (
              <div>
                <label htmlFor="delete-confirm" className="label">Type <span className="font-mono font-semibold">DELETE</span> to confirm</label>
                <input id="delete-confirm" value={typed} onChange={(event) => setTyped(event.target.value)} className="input font-mono" autoComplete="off" spellCheck={false} />
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-2xl border border-bad-line bg-bad-soft px-4 py-3 text-sm font-medium text-bad">{error}</p>
            )}

            <div className="flex flex-wrap justify-end gap-2 pt-1">
              <button type="button" onClick={closeDialog} disabled={pending} className="btn-secondary">Cancel</button>
              <button
                type="button"
                onClick={confirm}
                disabled={pending || (dialog.kind === 'all' && typed !== 'DELETE')}
                className="btn-danger"
              >
                <IconTrash size={16} />
                {pending ? 'Deleting…' : dialogCount === 1 ? 'Delete entry' : `Delete ${dialogCount.toLocaleString('en-GB')} entries`}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-medium text-ink [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border-t border-line pt-5 first:mt-0 first:border-0 first:pt-0">
      <h4 className="mb-3 text-sm font-semibold text-ink">{title}</h4>
      {children}
    </section>
  );
}

function AuditDetails({ row, view, onClose, onDelete }: { row: AuditRow; view: RowView; onClose: () => void; onDelete?: () => void }) {
  const when = whenParts(row.created_at);
  const changes = fieldChanges(row.before_json, row.after_json);
  const names = changedFieldNames(row);
  const extras = extraDetails(row);
  const hasAccountChange = row.source === 'account' || (row.source === 'license' && (view.from !== null || view.to !== null));

  return (
    <Drawer
      title={view.title}
      onClose={onClose}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${SOURCE_CHIP[row.source]}`}>{view.sourceLabel}</span>
          <span>{when.pkt}</span>
        </span>
      }
      footer={
        row.owner_id || onDelete ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            {row.owner_id ? (
              <Link href={`/labs/${row.owner_id}`} prefetch={false} className="link inline-flex items-center gap-1.5 text-sm">
                Open {row.lab_name ?? 'this lab'} <IconArrowRight size={14} />
              </Link>
            ) : (
              <span />
            )}
            {onDelete && (
              <button type="button" onClick={onDelete} className="btn-danger-outline btn-sm">
                <IconTrash size={15} /> Delete entry
              </button>
            )}
          </div>
        ) : undefined
      }
    >
      {view.summary && (
        <Section title="What happened">
          <p className="text-sm font-normal text-ink [overflow-wrap:anywhere]">{view.summary}</p>
        </Section>
      )}

      <Section title="Who and when">
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <Fact label="Who">{view.who}<span className="block text-xs font-normal text-muted">{view.whoKind}</span></Fact>
          <Fact label="Lab">{row.lab_name ?? '—'}</Fact>
          <Fact label="Date and time (Pakistan)">{when.pkt}</Fact>
          <Fact label="Date and time (UTC)">{when.utc}</Fact>
          {row.device_name && (
            <Fact label="PC"><span className="inline-flex items-center gap-1.5"><IconMonitor size={14} className="text-muted" />{row.device_name}</span></Fact>
          )}
          {row.key_hint && <Fact label="Activation key">…<span className="font-mono">{row.key_hint}</span></Fact>}
        </dl>
      </Section>

      <Section title="Record">
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <Fact label="Type">{view.entity || (row.entity_type ?? '—')}</Fact>
          <Fact label="Record id">{row.entity_id ? <span className="font-mono text-xs">{row.entity_id}</span> : '—'}</Fact>
          <Fact label="Action code"><span className="font-mono text-xs">{row.action}</span></Fact>
        </dl>
      </Section>

      {hasAccountChange && (
        <Section title={view.field ?? 'Change'}>
          <Change view={view} />
          {view.note && <p className="mt-3 text-sm font-normal text-muted [overflow-wrap:anywhere]">{view.note}</p>}
        </Section>
      )}

      {changes.length > 0 && (
        <Section title="Before and after">
          <div className="overflow-hidden rounded-ctl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/70">
                <tr>
                  <th className="th">Field</th>
                  <th className="th">Before</th>
                  <th className="th">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {changes.map((change) => (
                  <tr key={change.field} className="align-top">
                    <td className="px-4 py-2.5 font-mono text-xs text-ink [overflow-wrap:anywhere]">{change.field}</td>
                    <td className="px-4 py-2.5 font-normal text-muted [overflow-wrap:anywhere]">{change.before}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink [overflow-wrap:anywhere]">{change.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {names.length > 0 && (
        <Section title="Fields changed">
          <div className="flex flex-wrap gap-1.5">
            {names.map((name) => (
              <span key={name} className="rounded-md bg-black/[0.06] px-2 py-0.5 font-mono text-xs text-ink">{name}</span>
            ))}
          </div>
          <p className="mt-2 text-xs font-normal text-muted">Only the names of the fields are recorded — never the patient details themselves.</p>
        </Section>
      )}

      {row.reason && (
        <Section title="Reason">
          <p className="text-sm font-normal text-ink [overflow-wrap:anywhere]">{row.reason}</p>
        </Section>
      )}

      {extras.length > 0 && (
        <Section title="More details">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {extras.map((item) => (
              <Fact key={item.key} label={item.key}>{item.value}</Fact>
            ))}
          </dl>
        </Section>
      )}
    </Drawer>
  );
}
