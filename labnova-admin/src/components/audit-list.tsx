import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';
import { actorLabel, describeAudit, type AuditView } from '@/lib/audit';
import { formatDateTime } from '@/lib/format';
import type { AuditEntry } from '@/lib/types';

export const TO_CHIP: Record<AuditView['tone'], string> = {
  blue: 'bg-lime-soft text-ink',
  green: 'bg-ok-soft text-ok',
  amber: 'bg-warn-soft text-warn',
  red: 'bg-bad-soft text-bad',
  teal: 'bg-teal-soft text-teal',
  slate: 'bg-black/[0.06] text-ink',
};

export function Change({ view }: { view: Pick<AuditView, 'from' | 'to' | 'tone'> }) {
  if (view.from === null && view.to === null) return <span className="text-faint">—</span>;
  return (
    <span className="flex flex-wrap items-center gap-1.5 text-sm">
      {view.from !== null && (
        <>
          <span className="rounded-full bg-black/[0.06] px-2.5 py-0.5 font-medium text-muted">{view.from}</span>
          <IconArrowRight size={13} className="text-faint" />
        </>
      )}
      {view.to !== null && <span className={`rounded-full px-2.5 py-0.5 font-semibold ${TO_CHIP[view.tone]}`}>{view.to}</span>}
    </span>
  );
}

function LabLink({ entry }: { entry: AuditEntry }) {
  if (!entry.owner_id) return <span className="text-faint">—</span>;
  return (
    <Link href={`/labs/${entry.owner_id}`} prefetch={false} className="font-semibold text-ink underline-offset-4 transition-colors hover:underline">
      {entry.lab_name ?? 'Unknown lab'}
    </Link>
  );
}

function When({ value }: { value: string }) {
  const full = formatDateTime(value);
  // "12 Mar 2026, 14:05 PKT" → date on one line, time on the next.
  const [date, time] = full.split(', ');
  return (
    <span className="block leading-snug">
      <span className="block text-sm font-semibold text-ink">{date}</span>
      <span className="block text-xs font-normal text-muted">{time ?? ''}</span>
    </span>
  );
}

/** Full audit table (desktop) that turns into cards on phones. */
export function AuditTable({ entries, showLab = true }: { entries: AuditEntry[]; showLab?: boolean }) {
  return (
    <>
      <div className="relative hidden overflow-x-auto md:block">
        <table className="w-full min-w-[860px] text-left">
          <thead className="border-b border-line bg-black/[0.03]">
            <tr>
              <th className="th w-36">When</th>
              <th className="th">Who</th>
              {showLab && <th className="th">Lab</th>}
              <th className="th">What happened</th>
              <th className="th">Previous → new</th>
              <th className="th">Reason / details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {entries.map((entry) => {
              const view = describeAudit(entry);
              return (
                <tr key={entry.id} className="align-top transition-colors hover:bg-white/60">
                  <td className="td"><When value={entry.created_at} /></td>
                  <td className="td min-w-[11rem] text-sm">
                    <span className="block font-medium text-ink [overflow-wrap:anywhere]">{actorLabel(entry)}</span>
                    <span className="text-xs font-normal text-muted">{entry.actor_type === 'admin' ? 'Admin' : entry.actor_type === 'device' ? 'Windows app' : entry.actor_type === 'lab' ? 'Lab owner' : 'Automatic'}</span>
                  </td>
                  {showLab && <td className="td text-sm"><LabLink entry={entry} /></td>}
                  <td className="td">
                    <span className="block text-sm font-semibold text-ink">{view.title}</span>
                    {entry.key_hint && <span className="text-xs font-normal text-muted">Key …<span className="font-mono">{entry.key_hint}</span></span>}
                    {!entry.key_hint && view.field && <span className="text-xs font-normal text-muted">{view.field}</span>}
                  </td>
                  <td className="td"><Change view={view} /></td>
                  <td className="td max-w-[16rem] text-sm font-normal text-muted">{view.note ?? <span className="text-faint">—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line md:hidden">
        {entries.map((entry) => {
          const view = describeAudit(entry);
          return (
            <li key={entry.id} className="space-y-2 px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-ink">{view.title}</p>
                <p className="shrink-0 text-xs font-normal text-muted">{formatDateTime(entry.created_at)}</p>
              </div>
              <Change view={view} />
              {view.note && <p className="text-sm font-normal text-muted">{view.note}</p>}
              <p className="text-xs font-normal text-muted">
                {showLab && entry.owner_id ? <><LabLink entry={entry} /> · </> : null}
                {actorLabel(entry)}
                {entry.key_hint ? <> · key …<span className="font-mono">{entry.key_hint}</span></> : null}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Short list for the Dashboard and the Lab page. */
export function AuditCompact({ entries, showLab = true }: { entries: AuditEntry[]; showLab?: boolean }) {
  return (
    <ul className="divide-y divide-line">
      {entries.map((entry) => {
        const view = describeAudit(entry);
        return (
          <li key={entry.id} className="flex gap-3 px-5 py-3.5 sm:px-6">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${view.tone === 'red' ? 'bg-bad' : view.tone === 'green' ? 'bg-ok' : view.tone === 'amber' ? 'bg-[#D9941A]' : view.tone === 'teal' ? 'bg-teal' : view.tone === 'blue' ? 'bg-brand' : 'bg-faint'}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm font-semibold text-ink">
                  {view.title}
                  {showLab && entry.owner_id && (
                    <> <span className="font-normal text-muted">·</span> <Link href={`/labs/${entry.owner_id}`} prefetch={false} className="font-semibold text-ink underline-offset-4 transition-colors hover:underline">{entry.lab_name ?? 'Unknown lab'}</Link></>
                  )}
                </p>
                <p className="text-xs font-normal text-muted">{formatDateTime(entry.created_at)}</p>
              </div>
              {(view.from !== null || view.to !== null) && <div className="mt-1.5"><Change view={view} /></div>}
              <p className="mt-1 text-xs font-normal text-muted">
                {[actorLabel(entry), view.note].filter(Boolean).join(' · ')}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
