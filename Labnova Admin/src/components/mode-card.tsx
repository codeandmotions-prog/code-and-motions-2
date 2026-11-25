import Link from 'next/link';
import { Badge, LoadProblem } from '@/components/ui';
import { formatDateTime } from '@/lib/format';
import { labMode, planLabel, type DeviceModeStatus, type Lab } from '@/lib/types';

/**
 * "Working mode" of a lab: Offline (its own PC + activation key) or Online (cloud account), and — for a lab that has
 * been moved from Offline to Online — where each of its PCs is in the switch. The mode itself is the lab's plan, changed
 * in "Plan & status"; this card only explains it and shows progress. Status only, never any lab data.
 */
export function ModeCard({
  lab,
  modes,
  error,
}: {
  lab: Lab;
  modes: DeviceModeStatus[] | null;
  error: 'schema' | 'failed' | null;
}) {
  const mode = labMode(lab.plan);
  const pcs = modes ?? [];
  const waiting = pcs.filter((pc) => pc.key_status === 'activated' && pc.directive_mode === 'online' && pc.migration_state !== 'verified');
  const done = pcs.filter((pc) => pc.migration_state === 'verified');

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {mode === 'offline' && <Badge tone="teal">Offline</Badge>}
        {mode === 'online' && <Badge tone="blue">Online</Badge>}
        {mode === null && <Badge tone="slate">No plan yet</Badge>}
        <span className="text-sm font-normal text-muted">Plan: {planLabel(lab.plan)}</span>
      </div>

      <p className="mt-3 text-sm font-normal text-muted">
        {mode === 'offline' &&
          'This lab works Offline on its own PC with an activation key. The PC keeps working without internet and sends its data to LabNova whenever it is online.'}
        {mode === 'online' &&
          'This lab works Online with its LabNova account — no activation key is needed. Any Offline PC it still has is offered a safe switch to Online Mode.'}
        {mode === null && 'Choose a plan in “Plan & status” to set how this lab works.'}
      </p>

      <div className="mt-4 rounded-2xl bg-black/[0.05] px-4 py-3 text-sm font-normal text-muted">
        <p className="font-semibold text-ink">How a switch from Offline to Online works</p>
        <ol className="mt-1.5 list-decimal space-y-1 pl-5">
          <li>Change the plan to Premium Online in “Plan &amp; status”. Offline PCs are <span className="font-semibold text-ink">not</span> locked or interrupted.</li>
          <li>The next time a PC is online it learns about the change and offers the switch to the person using it.</li>
          <li>When they confirm, the PC first sends every offline record. LabNova checks the counts and checksums of everything received.</li>
          <li>Only when that check passes does the PC switch to Online Mode. If anything does not match, it stays Offline and nothing is lost or duplicated.</li>
        </ol>
        <p className="mt-2">To move a lab from Online back to Offline, set the plan to Basic Offline and create an activation key for its PC.</p>
      </div>

      {error ? (
        <div className="mt-4"><LoadProblem kind={error} what="The mode status of this lab’s PCs" updateFile="supabase/phase2_features.sql" /></div>
      ) : pcs.length > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-ink">
            PCs {waiting.length > 0 ? `· ${waiting.length} waiting to switch` : done.length > 0 ? `· ${done.length} switched` : ''}
          </p>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {pcs.map((pc) => (
              <li key={pc.key_id} className="flex flex-wrap items-start justify-between gap-2 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{pc.device_name ?? 'Unnamed PC'}</p>
                  <p className="text-xs font-normal text-muted">
                    Key …<span className="font-mono">{pc.key_hint}</span>
                    {pc.last_check_at ? ` · last asked LabNova ${formatDateTime(pc.last_check_at)}` : ' · has not asked LabNova yet'}
                  </p>
                </div>
                <PcState pc={pc} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-sm font-normal text-muted">
          No activated PC yet. Create an activation key under “Offline activation keys &amp; devices” below, or{' '}
          <Link href={`/audit?lab=${lab.owner_id}`} className="link">see this lab’s activity</Link>.
        </p>
      )}
    </div>
  );
}

function PcState({ pc }: { pc: DeviceModeStatus }) {
  if (pc.migration_state === 'verified') {
    const rows = Number(pc.migrated_rows ?? 0);
    return (
      <span className="text-right text-sm">
        <Badge tone="green">Switched to Online</Badge>
        <span className="mt-1 block text-xs font-normal text-muted">
          {Number.isFinite(rows) ? `${rows.toLocaleString('en-GB')} records verified · ` : ''}{formatDateTime(pc.migration_verified_at)}
        </span>
      </span>
    );
  }
  if (pc.migration_state === 'uploading') {
    return (
      <span className="text-right text-sm">
        <Badge tone="amber">{pc.last_error ? 'Check did not match — stays Offline' : 'Uploading…'}</Badge>
        <span className="mt-1 block text-xs font-normal text-muted">Started {formatDateTime(pc.migration_started_at)}</span>
      </span>
    );
  }
  if (pc.directive_mode === 'online') return <Badge tone="amber">Waiting for the PC</Badge>;
  if (pc.directive_mode === 'offline') return <Badge tone="teal">Offline</Badge>;
  return <Badge tone="slate">No plan</Badge>;
}
