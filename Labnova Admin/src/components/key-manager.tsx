'use client';

import { useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { KeyStatusBadge, LoadProblem } from '@/components/ui';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { IconCheck, IconCopy, IconKey, IconMonitor, IconSearch } from '@/components/icons';
import { actionLabel, formatDate, formatDateTime, isRealDay, pktDay } from '@/lib/format';
import type { DeviceModeStatus, DeviceSyncStatus, EffectiveKeyStatus, OfflineAuditEntry, OfflineKey } from '@/lib/types';
import {
  deleteKeyAction,
  generateKeyAction,
  resetKeyAction,
  resetSyncAction,
  revokeKeyAction,
  setKeyExpiryAction,
  type ActionResult,
} from '@/app/(admin)/labs/[id]/actions';

type Filter = 'all' | EffectiveKeyStatus;

const DAY_MS = 86_400_000;
const WARNING_DAYS = 14; // the PC starts warning this many days before a key's expiry date

/** What a key is right now (a key past its expiry date is "expired"; older databases do not say, so fall back). */
function effective(key: OfflineKey): EffectiveKeyStatus {
  return key.effective_status ?? key.status;
}

/** A date `days` from now as yyyy-mm-dd in Pakistan time. */
function inDays(days: number): string {
  return pktDay(new Date(Date.now() + days * DAY_MS).toISOString());
}

/** How long a key lasts, as the create dialog offers it. */
const EXPIRY_CHOICES = [
  { value: 'none', label: 'No expiry — valid until revoked' },
  { value: '30', label: '30 days' },
  { value: '90', label: '3 months' },
  { value: '180', label: '6 months' },
  { value: '365', label: '1 year' },
  { value: 'custom', label: 'Choose a date…' },
] as const;

/** One short, honest line about a key's expiry for its card. null = nothing to say (revoked keys). */
function expiryInfo(key: OfflineKey): { tone: 'none' | 'ok' | 'soon' | 'grace' | 'expired'; headline: string; detail: string | null } | null {
  if (key.status === 'revoked') return null;
  if (!key.expires_at) return { tone: 'none', headline: 'No expiry', detail: 'Valid until you revoke it.' };
  const end = new Date(key.expires_at).getTime();
  if (Number.isNaN(end)) return null;
  const now = Date.now();
  const graceDays = key.grace_days ?? 7;
  const graceEnd = key.grace_ends_at ? new Date(key.grace_ends_at).getTime() : end + graceDays * DAY_MS;

  if (end > now) {
    const days = Math.ceil((end - now) / DAY_MS);
    const soon = days <= WARNING_DAYS;
    return {
      tone: soon ? 'soon' : 'ok',
      headline: `Expires ${formatDate(key.expires_at)} (in ${days} day${days === 1 ? '' : 's'})`,
      detail: soon ? 'The lab’s PC already shows a renewal warning.' : null,
    };
  }
  if (key.status === 'unused') {
    // An unused key was never activated, so there is no PC to keep working: it simply cannot be activated any more.
    return {
      tone: 'expired',
      headline: `Expired on ${formatDate(key.expires_at)}`,
      detail: 'This key was never used and can no longer be activated. Extend its expiry to use it.',
    };
  }
  if (graceEnd > now) {
    return {
      tone: 'grace',
      headline: `Expired on ${formatDate(key.expires_at)}`,
      detail: `The PC keeps working until ${formatDate(new Date(graceEnd).toISOString())} (${graceDays}-day grace period) and asks for renewal. Extend the expiry to renew it.`,
    };
  }
  return {
    tone: 'expired',
    headline: `Expired on ${formatDate(key.expires_at)}`,
    detail: `The grace period ended ${formatDate(new Date(graceEnd).toISOString())}. The PC shows a renewal screen until you extend the expiry (its data is kept safe, nothing is deleted). It picks up an extension the next time it is online.`,
  };
}

type Dialog =
  | { kind: 'create' }
  | { kind: 'created'; keyText: string }
  | { kind: 'revoke'; key: OfflineKey }
  | { kind: 'reset'; key: OfflineKey }
  | { kind: 'resetSync'; key: OfflineKey }
  | { kind: 'delete'; key: OfflineKey }
  | { kind: 'expiry'; key: OfflineKey }
  | null;

export function KeyManager({
  ownerId,
  labName,
  keys: keysProp,
  loadError,
  audit,
  blockedReason,
  sync,
  syncError,
  modes,
  modeError,
}: {
  ownerId: string;
  labName: string;
  /** null when the list could not be loaded (see loadError). The component stays mounted either way,
   *  so a freshly created key that is on screen can never disappear because of a failed reload. */
  keys: OfflineKey[] | null;
  loadError: 'schema' | 'failed' | null;
  audit: OfflineAuditEntry[];
  blockedReason: string | null;
  /** Cloud-sync status per key; null when it could not be loaded (see syncError). Never blocks the key list. */
  sync: DeviceSyncStatus[] | null;
  syncError: 'schema' | 'failed' | null;
  /** Where each PC stands in a switch to Online Mode; null when it could not be loaded (see modeError). */
  modes: DeviceModeStatus[] | null;
  modeError: 'schema' | 'failed' | null;
}) {
  // Keep showing the last good list if a reload fails.
  const lastKeys = useRef<OfflineKey[]>([]);
  if (keysProp) lastKeys.current = keysProp;
  const keys = keysProp ?? lastKeys.current;
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState<Dialog>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const syncByKey = useMemo(() => new Map((sync ?? []).map((row) => [row.key_id, row])), [sync]);
  const modeByKey = useMemo(() => new Map((modes ?? []).map((row) => [row.key_id, row])), [modes]);
  // Create dialog: how long the new key lasts. "custom" uses `day`; the change-expiry dialog always uses `day`.
  const [preset, setPreset] = useState<(typeof EXPIRY_CHOICES)[number]['value']>('none');
  const [day, setDay] = useState('');

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return keys.filter((key) => {
      if (filter !== 'all' && effective(key) !== filter) return false;
      if (!q) return true;
      return [key.key_hint, key.note, key.device_name, key.device_info].some((v) => (v ?? '').toLowerCase().includes(q));
    });
  }, [keys, filter, search]);

  const counts = useMemo(
    () => ({
      all: keys.length,
      unused: keys.filter((k) => effective(k) === 'unused').length,
      activated: keys.filter((k) => effective(k) === 'activated').length,
      expired: keys.filter((k) => effective(k) === 'expired').length,
      revoked: keys.filter((k) => effective(k) === 'revoked').length,
    }),
    [keys],
  );

  function open(next: Dialog) {
    setDialog(next);
    setText('');
    setError(null);
    setCopied(false);
    setPreset('none');
    // The change-expiry dialog starts from the key's current date.
    setDay(next?.kind === 'expiry' && next.key.expires_at ? pktDay(next.key.expires_at) : '');
  }

  /** The expiry day chosen in the create dialog ('' = none). */
  function chosenDay(): string {
    if (preset === 'none') return '';
    if (preset === 'custom') return day;
    return inDays(Number(preset));
  }

  function close() {
    const wasCreated = dialog?.kind === 'created';
    setDialog(null);
    setError(null);
    // The new key is already in the list from the server; refresh once the one-time dialog is closed.
    if (wasCreated) router.refresh();
  }

  function run(task: () => Promise<ActionResult>, success: { title: string; body?: string }) {
    setError(null);
    startTransition(async () => {
      const result = await task();
      if (result.ok) {
        toast.success(success.title, success.body);
        setDialog(null);
        router.refresh();
      } else {
        setError(result.error);
        toast.error('Not done', result.error);
      }
    });
  }

  function create() {
    setError(null);
    startTransition(async () => {
      const result = await generateKeyAction(ownerId, text, chosenDay());
      if (result.ok && result.data) {
        setDialog({ kind: 'created', keyText: result.data.keyText });
      } else if (!result.ok) {
        setError(result.error);
        toast.error('Key not created', result.error);
      }
    });
  }

  async function copyKey(keyText: string) {
    try {
      await navigator.clipboard.writeText(keyText);
      setCopied(true);
    } catch {
      setCopied(false);
      toast.error('Could not copy automatically', 'Select the key and copy it by hand (Ctrl+C).');
    }
  }

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'unused', label: 'Unused', count: counts.unused },
    { value: 'activated', label: 'Activated', count: counts.activated },
    { value: 'expired', label: 'Expired', count: counts.expired },
    { value: 'revoked', label: 'Revoked', count: counts.revoked },
  ];

  return (
    <div>
      {loadError && (
        <div className="mb-5"><LoadProblem kind={loadError} what="Activation keys" /></div>
      )}
      {blockedReason && (
        <div role="note" className="mb-5 rounded-ctl border border-warn-line bg-warn-soft px-4 py-3 text-sm font-medium text-warn">
          {blockedReason}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-full bg-white p-1 ring-1 ring-line" role="group" aria-label="Filter keys by status">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition duration-150 ${
                filter === f.value ? 'bg-ink text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {f.label} <span className={`tabular-nums ${filter === f.value ? 'text-ink-300' : 'text-faint'}`}>{f.count}</span>
            </button>
          ))}
        </div>
        <button className="btn-primary" disabled={pending || blockedReason !== null || loadError !== null} onClick={() => open({ kind: 'create' })}>
          <IconKey size={16} /> Create activation key
        </button>
      </div>

      <div className="relative mt-3">
        <IconSearch size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by PC name, note or last 4 characters of a key"
          aria-label="Search keys"
          className="input pl-9"
        />
      </div>

      <div className="mt-5 space-y-3">
        {keys.length === 0 && !loadError && (
          <div className="rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center">
            <p className="text-base font-semibold text-ink">No activation keys yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm font-normal text-muted">
              Create a key and give it to the lab. They enter it once in LabNova on their PC to switch on Basic Offline.
            </p>
          </div>
        )}
        {keys.length > 0 && visible.length === 0 && (
          <p className="rounded-2xl bg-black/[0.05] px-4 py-6 text-center text-sm font-normal text-muted">No keys match your search or filter.</p>
        )}

        {visible.map((key) => (
          <article key={key.id} className="rounded-2xl border border-line bg-white p-4 transition-colors duration-150 hover:border-line-strong sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black/[0.05] text-muted">
                  <IconKey size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-ink">
                    Key ending <span className="font-mono tracking-wider">{key.key_hint}</span>
                  </p>
                  <p className="truncate text-sm font-normal text-muted">{key.note || 'No note'} · created {formatDateTime(key.created_at)}</p>
                </div>
              </div>
              <KeyStatusBadge status={effective(key)} />
            </div>

            <ExpiryLine info={expiryInfo(key)} />

            {key.status === 'activated' && (
              <div className="mt-4 rounded-2xl bg-black/[0.05] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <IconMonitor size={16} className="text-muted" /> {key.device_name ?? 'Unnamed PC'}
                </div>
                <dl className="mt-3 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
                  <Row label="Activated on" value={formatDateTime(key.activated_at)} />
                  <Row label="Last seen online" value={key.last_seen_at ? formatDateTime(key.last_seen_at) : 'Never reported'} />
                  <Row label="PC details" value={key.device_info ?? '—'} />
                  <Row label="Times reset" value={String(key.reset_count)} />
                  <Row label="Cloud sync" value={syncSummary(syncByKey.get(key.id), syncError)} />
                  {syncByKey.get(key.id)?.app_version && (
                    <Row label="LabNova version" value={syncByKey.get(key.id)?.app_version ?? '—'} />
                  )}
                  {syncWaiting(syncByKey.get(key.id)) && (
                    <Row label="Waiting on the PC" value={syncWaiting(syncByKey.get(key.id)) ?? '—'} />
                  )}
                  <Row label="Working mode" value={modeSummary(modeByKey.get(key.id), modeError)} />
                </dl>
              </div>
            )}

            {key.status === 'revoked' && (
              <div className="mt-4 rounded-2xl bg-bad-soft/60 p-4">
                <dl className="grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
                  <Row label="Revoked on" value={formatDateTime(key.revoked_at)} />
                  <Row label="Reason" value={key.revoked_reason ?? '—'} />
                  <Row label="Was on PC" value={key.device_name ?? 'Never activated'} />
                  <Row label="Times reset" value={String(key.reset_count)} />
                </dl>
              </div>
            )}

            {key.status === 'unused' && (
              <p className="mt-3 text-sm font-normal text-muted">
                Waiting for the lab to enter this key on their PC.{key.reset_count > 0 ? ` Reset ${key.reset_count} time${key.reset_count === 1 ? '' : 's'} before.` : ''}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {key.status !== 'unused' && (
                <button className="btn-secondary btn-sm" disabled={pending} onClick={() => open({ kind: 'reset', key })}>
                  Reset for a new PC
                </button>
              )}
              {key.status === 'activated' && syncByKey.get(key.id)?.enrolled && (
                <button className="btn-secondary btn-sm" disabled={pending} onClick={() => open({ kind: 'resetSync', key })}>
                  Reset sync access
                </button>
              )}
              {key.status !== 'revoked' && (
                <button className="btn-secondary btn-sm" disabled={pending} onClick={() => open({ kind: 'expiry', key })}>
                  {key.expires_at ? 'Change expiry' : 'Set expiry'}
                </button>
              )}
              {key.status !== 'revoked' && (
                <button className="btn-danger-outline btn-sm" disabled={pending} onClick={() => open({ kind: 'revoke', key })}>
                  Revoke
                </button>
              )}
              {key.status === 'unused' && (
                <button className="btn-secondary btn-sm" disabled={pending} onClick={() => open({ kind: 'delete', key })}>
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <button className="link text-sm" onClick={() => setShowHistory((v) => !v)} aria-expanded={showHistory}>
          {showHistory ? 'Hide key history' : `Show key history (${audit.length})`}
        </button>
        {showHistory && (
          <ol className="mt-4 space-y-4 border-l border-line pl-5">
            {audit.length === 0 && <li className="text-sm font-normal text-muted">Nothing has happened with this lab&apos;s keys yet.</li>}
            {audit.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-line-strong" aria-hidden="true" />
                <p className="text-sm font-semibold text-ink">
                  {actionLabel(entry.action)}
                  {entry.key_hint && <span className="font-normal text-muted"> · key …<span className="font-mono">{entry.key_hint}</span></span>}
                </p>
                <p className="text-sm font-normal text-muted">
                  {[
                    formatDateTime(entry.created_at),
                    entry.actor_type === 'admin' ? `by ${entry.actor_email ?? 'an admin'}` : entry.actor_type === 'system' ? 'automatic' : "from the lab's PC",
                    entry.device_name ? `PC: ${entry.device_name}` : null,
                    entry.details,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {dialog?.kind === 'create' && (
        <Modal title="Create an activation key?" onClose={close}>
          <p className="text-sm font-normal text-muted">
            This creates one new key for <span className="font-semibold text-ink">{labName}</span>. It works on <span className="font-semibold text-ink">one PC only</span>.
            You will see the key once — copy it and give it to the lab.
          </p>
          <label htmlFor="note" className="label mt-5">Note <span className="font-normal text-muted">(optional)</span></label>
          <input id="note" value={text} onChange={(e) => setText(e.target.value)} maxLength={80} placeholder="e.g. Reception PC" className="input" />
          <label htmlFor="expiry-preset" className="label mt-4">Key expiry</label>
          <select id="expiry-preset" value={preset} onChange={(e) => setPreset(e.target.value as typeof preset)} className="input">
            {EXPIRY_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>{choice.label}</option>
            ))}
          </select>
          {preset === 'custom' && (
            <input
              type="date"
              aria-label="Expiry date"
              value={day}
              min={inDays(1)}
              onChange={(e) => setDay(e.target.value)}
              className="input mt-2"
            />
          )}
          <p className="hint">
            {chosenDay() && isRealDay(chosenDay())
              ? `The key stops being valid at the end of ${formatDate(`${chosenDay()}T12:00:00+05:00`)} (Pakistan time). The lab’s PC warns ${WARNING_DAYS} days before and keeps working for a 7-day grace period after. Data is never deleted.`
              : 'The key never expires on its own. You can set an expiry later.'}
          </p>
          {error && <p role="alert" className="mt-3 text-sm font-medium text-bad">{error}</p>}
          <div className="mt-6 flex justify-end gap-2">
            <button className="btn-secondary" onClick={close} disabled={pending}>Cancel</button>
            <button className="btn-primary" onClick={create} disabled={pending || (preset === 'custom' && !isRealDay(day))}>{pending ? 'Creating…' : 'Create key'}</button>
          </div>
        </Modal>
      )}

      {dialog?.kind === 'created' && (
        <Modal title="Activation key created" onClose={close} closable={false}>
          <div className="select-all rounded-2xl border border-ink/10 bg-lime-soft px-4 py-5 text-center font-mono text-lg font-semibold tracking-wider text-ink sm:text-xl">
            {dialog.keyText}
          </div>
          <div className="mt-3 rounded-ctl border border-warn-line bg-warn-soft px-4 py-3 text-sm font-normal text-warn">
            <span className="font-semibold">Copy it now.</span> For security this key is shown only once and cannot be viewed again. If it is lost, delete it (while unused) and create a new one.
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button className="btn-secondary" onClick={() => copyKey(dialog.keyText)}>
              {copied ? <><IconCheck size={16} className="text-ok" /> Copied</> : <><IconCopy size={16} /> Copy key</>}
            </button>
            <button className="btn-primary" onClick={close}>{copied ? 'Done' : 'I have saved it'}</button>
          </div>
        </Modal>
      )}

      {dialog?.kind === 'revoke' && (
        <ReasonDialog
          title="Revoke this key?"
          body={`The key ending ${dialog.key.key_hint} will stop working${
            dialog.key.status === 'activated' ? `, and the PC “${dialog.key.device_name ?? 'unknown'}” is switched off the next time it connects to the internet` : ''
          }. You can still use “Reset for a new PC” later to give the lab a fresh start with this key.`}
          confirmLabel="Revoke key"
          danger
          reason={text}
          setReason={setText}
          error={error}
          pending={pending}
          onCancel={close}
          onConfirm={() => run(() => revokeKeyAction(ownerId, dialog.key.id, text), { title: 'Key revoked', body: `Key ending ${dialog.key.key_hint}` })}
        />
      )}

      {dialog?.kind === 'reset' && (
        <ReasonDialog
          title="Reset this key for a new PC?"
          body={`Use this when the lab changed PC or reinstalled Windows. The key ending ${dialog.key.key_hint} is detached from “${
            dialog.key.device_name ?? 'its PC'
          }” and can be activated once more on one PC. The old PC is switched off the next time it connects to the internet.`}
          confirmLabel="Reset key"
          danger
          reason={text}
          setReason={setText}
          error={error}
          pending={pending}
          onCancel={close}
          onConfirm={() => run(() => resetKeyAction(ownerId, dialog.key.id, text), { title: 'Key reset', body: 'The lab can activate it again on one PC.' })}
        />
      )}

      {dialog?.kind === 'resetSync' && (
        <ReasonDialog
          title="Reset cloud-sync access?"
          body={`Use this only if the PC “${
            dialog.key.device_name ?? 'unknown'
          }” lost its cloud-sync access (for example after a Windows reinstall with a restored backup). The PC keeps working exactly as before and its license is not touched. The next time it is online it sets up cloud sync again by itself.`}
          confirmLabel="Reset sync access"
          reason={text}
          setReason={setText}
          error={error}
          pending={pending}
          onCancel={close}
          onConfirm={() => run(() => resetSyncAction(ownerId, dialog.key.id, text), { title: 'Sync access reset', body: 'The PC sets it up again the next time it is online.' })}
        />
      )}

      {dialog?.kind === 'expiry' && (
        <Modal title={dialog.key.expires_at ? 'Change this key’s expiry?' : 'Set an expiry for this key?'} onClose={close}>
          <p className="text-sm font-normal text-muted">
            Key ending <span className="font-mono font-semibold text-ink">{dialog.key.key_hint}</span>
            {dialog.key.device_name ? <> on PC “{dialog.key.device_name}”</> : null}. Currently:{' '}
            <span className="font-semibold text-ink">{dialog.key.expires_at ? `expires ${formatDate(dialog.key.expires_at)}` : 'no expiry'}</span>.
            The PC picks up the change the next time it is online, so extending an expired key brings that PC back.
          </p>
          <label htmlFor="expiry-day" className="label mt-5">New expiry date</label>
          <input id="expiry-day" type="date" value={day} min={inDays(1)} onChange={(e) => setDay(e.target.value)} className="input" />
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: '+30 days', days: 30 },
              { label: '+3 months', days: 90 },
              { label: '+1 year', days: 365 },
            ].map((quick) => {
              // Extend from the current expiry if it is still in the future, otherwise from today.
              const base = dialog.key.expires_at && new Date(dialog.key.expires_at).getTime() > Date.now() ? new Date(dialog.key.expires_at).getTime() : Date.now();
              const target = pktDay(new Date(base + quick.days * DAY_MS).toISOString());
              return (
                <button key={quick.label} type="button" className="btn-secondary btn-sm" onClick={() => setDay(target)}>
                  {quick.label}
                </button>
              );
            })}
          </div>
          <label htmlFor="expiry-reason" className="label mt-4">Reason <span className="font-normal text-muted">(optional — saved in the history)</span></label>
          <input id="expiry-reason" value={text} onChange={(e) => setText(e.target.value)} maxLength={120} className="input" />
          {error && <p role="alert" className="mt-3 text-sm font-medium text-bad">{error}</p>}
          <div className="mt-6 flex flex-wrap justify-between gap-2">
            {dialog.key.expires_at ? (
              <button
                className="btn-ghost"
                disabled={pending}
                onClick={() => run(() => setKeyExpiryAction(ownerId, dialog.key.id, '', text), { title: 'Expiry removed', body: `Key ending ${dialog.key.key_hint} no longer expires.` })}
              >
                Remove expiry
              </button>
            ) : <span />}
            <span className="flex gap-2">
              <button className="btn-secondary" onClick={close} disabled={pending}>Cancel</button>
              <button
                className="btn-primary"
                disabled={pending || !isRealDay(day)}
                onClick={() => run(() => setKeyExpiryAction(ownerId, dialog.key.id, day, text), { title: 'Expiry saved', body: `Key ending ${dialog.key.key_hint} now expires ${formatDate(`${day}T12:00:00+05:00`)}.` })}
              >
                {pending ? 'Saving…' : 'Save expiry'}
              </button>
            </span>
          </div>
        </Modal>
      )}

      {dialog?.kind === 'delete' && (
        <Modal title="Delete this unused key?" onClose={close}>
          <p className="text-sm font-normal text-muted">
            The key ending <span className="font-mono font-semibold text-ink">{dialog.key.key_hint}</span> has not been used. Deleting it cannot be undone.
          </p>
          {error && <p role="alert" className="mt-3 text-sm font-medium text-bad">{error}</p>}
          <div className="mt-6 flex justify-end gap-2">
            <button className="btn-secondary" onClick={close} disabled={pending}>Cancel</button>
            <button className="btn-danger" disabled={pending} onClick={() => run(() => deleteKeyAction(ownerId, dialog.key.id), { title: 'Key deleted' })}>
              {pending ? 'Deleting…' : 'Delete key'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/** The expiry line on a key's card. */
function ExpiryLine({ info }: { info: ReturnType<typeof expiryInfo> }) {
  if (!info || info.tone === 'none') return info ? <p className="mt-3 text-sm font-normal text-muted">{info.headline} · {info.detail}</p> : null;
  const style =
    info.tone === 'ok'
      ? 'border-line bg-black/[0.05] text-ink'
      : info.tone === 'soon'
        ? 'border-warn-line bg-warn-soft text-warn'
        : info.tone === 'grace'
          ? 'border-warn-line bg-warn-soft text-warn'
          : 'border-bad-line bg-bad-soft text-bad';
  return (
    <div className={`mt-3 rounded-ctl border px-3.5 py-2.5 text-sm ${style}`}>
      <p className="font-semibold">{info.headline}</p>
      {info.detail && <p className="mt-0.5 font-normal">{info.detail}</p>}
    </div>
  );
}

/** Where a PC stands in a switch to Online Mode — a status only, never any lab data. */
function modeSummary(row: DeviceModeStatus | undefined, loadError: 'schema' | 'failed' | null): string {
  if (loadError === 'schema') return 'Not available yet (database update not run)';
  if (loadError) return 'Could not be loaded';
  if (!row) return 'Not available';
  const checked = row.last_check_at ? ` · last asked LabNova ${formatDateTime(row.last_check_at)}` : '';
  if (row.directive_mode === 'online') {
    if (row.migration_state === 'verified') {
      const rows = Number(row.migrated_rows ?? 0);
      return `Switched to Online — ${Number.isFinite(rows) ? rows.toLocaleString('en-GB') : ''} records uploaded and verified ${formatDateTime(row.migration_verified_at)}. This key is no longer needed.`;
    }
    if (row.migration_state === 'uploading') {
      return row.last_error
        ? `Switching to Online — the last check did not match, the PC stays Offline and can try again${checked}`
        : `Switching to Online — upload started ${formatDateTime(row.migration_started_at)}, not finished yet${checked}`;
    }
    return `Lab is set to Online — waiting for the PC to be online and for the user to confirm the switch${checked}`;
  }
  if (row.directive_mode === 'offline') return `Offline (as set for this lab)${checked}`;
  return `Lab has no plan set${checked}`;
}

/** One short line about a PC's optional cloud sync — status only, never any lab data. */
function syncSummary(row: DeviceSyncStatus | undefined, loadError: 'schema' | 'failed' | null): string {
  if (loadError === 'schema') return 'Not available yet (database update not run)';
  if (loadError) return 'Could not be loaded';
  if (!row) return 'Not available';
  if (!row.enrolled) return row.last_ok_at ? 'Access reset — the PC sets it up again when online' : 'Not set up yet';
  return row.last_ok_at ? `Last synced ${formatDateTime(row.last_ok_at)}` : 'Set up — nothing received yet';
}

function syncWaiting(row: DeviceSyncStatus | undefined): string | null {
  if (!row) return null;
  const pending = Number(row.outbox_pending ?? 0);
  const failed = Number(row.outbox_failed ?? 0);
  if (!Number.isFinite(pending) || !Number.isFinite(failed) || (pending <= 0 && failed <= 0)) return null;
  const parts = [];
  if (pending > 0) parts.push(`${pending} item${pending === 1 ? '' : 's'} waiting`);
  if (failed > 0) parts.push(`${failed} refused`);
  return parts.join(', ');
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 font-normal text-muted">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-ink">{value}</dd>
    </div>
  );
}

function ReasonDialog({
  title,
  body,
  confirmLabel,
  danger,
  reason,
  setReason,
  error,
  pending,
  onCancel,
  onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  danger?: boolean;
  reason: string;
  setReason: (value: string) => void;
  error: string | null;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm font-normal text-muted">{body}</p>
      <label htmlFor="reason" className="label mt-5">Reason <span className="font-normal text-muted">(optional — saved in the history)</span></label>
      <input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={120} className="input" />
      {error && <p role="alert" className="mt-3 text-sm font-medium text-bad">{error}</p>}
      <div className="mt-6 flex justify-end gap-2">
        <button className="btn-secondary" onClick={onCancel} disabled={pending}>Cancel</button>
        <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm} disabled={pending}>
          {pending ? 'Working…' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
