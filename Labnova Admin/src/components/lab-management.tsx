'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { IconArrowRight } from '@/components/icons';
import { formatDate, pktDay } from '@/lib/format';
import {
  ACCOUNT_LABELS,
  PLAN_LABELS,
  SELECTABLE_PLANS,
  SUBSCRIPTION_LABELS,
  type Lab,
} from '@/lib/types';
import { setSmsAction, updateLabAction } from '@/app/(admin)/labs/[id]/actions';

type FormState = {
  account: 'active' | 'suspended';
  subscription: 'trial' | 'active' | 'expired';
  plan: string | null;
  endsAt: string;
  paymentRef: string;
  reason: string;
};

function initialState(lab: Lab): FormState {
  return {
    account: lab.account_status,
    subscription: lab.subscription_status,
    plan: lab.plan,
    endsAt: pktDay(lab.subscription_ends_at),
    paymentRef: lab.last_payment_reference ?? '',
    reason: '',
  };
}

type Change = { label: string; from: string; to: string };

const PLAN_HELP: Record<string, string> = {
  basic_offline: 'Offline mode: runs on the lab’s own PC without internet. Needs an activation key (below).',
  premium_monthly: 'Online mode: the lab’s cloud account, no activation key. Billed monthly.',
  premium_yearly: 'Older yearly plan. Kept only for labs already on it.',
};

export function LabManagement({ lab }: { lab: Lab }) {
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>(() => initialState(lab));
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const original = useMemo(() => initialState(lab), [lab]);

  const plans = useMemo(() => {
    const list: string[] = [...SELECTABLE_PLANS];
    if (lab.plan && !list.includes(lab.plan)) list.push(lab.plan);
    return list;
  }, [lab.plan]);

  // Moving INTO the free trial clears the plan (done by the database). A lab that is
  // already on trial keeps whatever plan it picked until it is moved to Active.
  const clearing = form.subscription === 'trial' && original.subscription !== 'trial';

  const changes = useMemo<Change[]>(() => {
    const out: Change[] = [];
    if (form.account !== original.account) {
      out.push({ label: 'Account', from: ACCOUNT_LABELS[original.account], to: ACCOUNT_LABELS[form.account] });
    }
    if (form.subscription !== original.subscription) {
      out.push({ label: 'Subscription', from: SUBSCRIPTION_LABELS[original.subscription], to: SUBSCRIPTION_LABELS[form.subscription] });
    }
    const effectivePlan = clearing ? null : form.plan;
    if (effectivePlan !== original.plan) {
      out.push({
        label: 'Plan',
        from: original.plan ? PLAN_LABELS[original.plan] ?? original.plan : 'No plan',
        to: effectivePlan ? PLAN_LABELS[effectivePlan] ?? effectivePlan : 'No plan',
      });
    }
    if (form.endsAt !== '' && form.endsAt !== original.endsAt) {
      out.push({ label: 'Subscription ends', from: original.endsAt ? formatDate(`${original.endsAt}T12:00:00+05:00`) : 'Not set', to: formatDate(`${form.endsAt}T12:00:00+05:00`) });
    }
    if (form.paymentRef.trim() !== original.paymentRef) {
      out.push({ label: 'Payment reference', from: original.paymentRef || 'None', to: form.paymentRef.trim() || 'None' });
    }
    return out;
  }, [form, original, clearing]);

  const warnings = useMemo(() => {
    const list: string[] = [];
    if (form.account === 'suspended' && original.account === 'active') {
      list.push('Suspending the account switches off this lab’s access to LabNova.');
    }
    if (clearing) {
      list.push('Moving to Free trial starts a new 5-day trial and removes the current plan.');
    }
    if (!clearing && form.plan !== 'basic_offline' && original.plan === 'basic_offline') {
      list.push('Activation keys can only be created or activated while the lab is on Basic Offline.');
    }
    if (!clearing && form.plan === 'basic_offline' && original.plan !== 'basic_offline') {
      list.push('This lab will need an activation key to use Basic Offline on its PC.');
    }
    if (!clearing && form.plan !== null && form.plan !== 'basic_offline' && original.plan === 'basic_offline') {
      list.push(
        'Moving from Offline to Online: the lab’s Offline PCs are not locked. Each one offers the switch the next time it is online; it first uploads all its records, LabNova verifies them, and only then does it switch. Nothing is lost or duplicated. Until a PC has finished its switch, an Online sign-in shows only the data already in the cloud — the records on the Offline PC arrive when it completes.',
      );
    }
    return list;
  }, [form, original, clearing]);

  const dirty = changes.length > 0;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function choosePlan(plan: string) {
    setForm((current) => ({
      ...current,
      plan,
      // Choosing a plan for a lab on trial means it is now subscribing.
      subscription: current.subscription === 'trial' ? 'active' : current.subscription,
    }));
  }

  function chooseSubscription(value: FormState['subscription']) {
    setForm((current) => ({
      ...current,
      subscription: value,
      // Only moving INTO the trial removes the plan; moving back restores what the lab had.
      plan: value === 'trial' && original.subscription !== 'trial' ? null : current.plan ?? original.plan,
    }));
  }

  function save() {
    setError(null);
    startTransition(async () => {
      const result = await updateLabAction(lab.owner_id, {
        account: form.account,
        subscription: form.subscription,
        plan: clearing ? null : form.plan,
        endsAt: form.endsAt,
        paymentRef: form.paymentRef,
        baseline: {
          account: original.account,
          subscription: original.subscription,
          plan: original.plan,
          endsAt: original.endsAt,
          paymentRef: original.paymentRef,
        },
        reason: form.reason,
      });
      if (result.ok) {
        setConfirming(false);
        const count = result.data?.changed.length ?? 0;
        toast.success('Changes saved', `${count} setting${count === 1 ? '' : 's'} updated for ${lab.lab_name}.`);
        router.refresh();
      } else {
        setError(result.error);
        toast.error('Not saved', result.error);
      }
    });
  }

  return (
    <div>
      <div className="grid gap-8">
        {/* Plan */}
        <fieldset>
          <legend className="label">Plan</legend>
          <div className={`grid gap-3 ${plans.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`} role="radiogroup" aria-label="Plan">
            {plans.map((plan) => {
              const selected = !clearing && form.plan === plan;
              return (
                <label
                  key={plan}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border p-4 transition duration-150 ${
                    selected ? 'border-ink bg-lime-soft shadow-[0_0_0_1px_#0F1210]' : 'border-line-strong bg-white hover:border-ink-400'
                  } ${clearing ? 'opacity-60' : ''}`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan}
                    checked={selected}
                    onChange={() => choosePlan(plan)}
                    className="peer sr-only"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl peer-focus-visible:shadow-focus" aria-hidden="true" />
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-ink">{PLAN_LABELS[plan] ?? plan}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition ${selected ? 'border-brand bg-brand' : 'border-line-strong bg-white'}`}
                    >
                      {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </span>
                  <span className="mt-1 text-sm font-normal text-muted">{PLAN_HELP[plan] ?? ''}</span>
                </label>
              );
            })}
          </div>
          {clearing && <p className="hint">A lab on the free trial has no plan. Choose a plan above to move it to a paid subscription.</p>}
          {form.subscription === 'trial' && !clearing && form.plan && (
            <p className="hint">This lab picked a plan during its trial. Set the subscription to Active to start it.</p>
          )}
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Account */}
          <fieldset>
            <legend className="label">Account access</legend>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-white p-1 ring-1 ring-line" role="radiogroup" aria-label="Account access">
              {(['active', 'suspended'] as const).map((value) => {
                const selected = form.account === value;
                return (
                  <label key={value} className={`relative cursor-pointer rounded-full px-3 py-2 text-center text-sm font-semibold transition duration-150 ${
                    selected ? (value === 'active' ? 'bg-ok-soft text-ok' : 'bg-bad-soft text-bad') : 'text-muted hover:text-ink'
                  }`}>
                    <input type="radio" name="account" value={value} checked={selected} onChange={() => set('account', value)} className="peer sr-only" />
                    <span className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:shadow-focus" aria-hidden="true" />
                    {ACCOUNT_LABELS[value]}
                  </label>
                );
              })}
            </div>
            <p className="hint">Suspended labs lose access to LabNova until you set the account back to Active.</p>
          </fieldset>

          {/* Subscription */}
          <div>
            <label htmlFor="subscription" className="label">Subscription status</label>
            <select id="subscription" value={form.subscription} onChange={(e) => chooseSubscription(e.target.value as FormState['subscription'])} className="input">
              <option value="trial">Free trial</option>
              <option value="active">Active (paid)</option>
              <option value="expired">Expired</option>
            </select>
            <p className="hint">
              {lab.subscription_status === 'trial' ? `Trial ends ${formatDate(lab.trial_ends_at)}.` : 'Set to Expired when a subscription has lapsed.'}
            </p>
          </div>

          <div>
            <label htmlFor="endsAt" className="label">Subscription ends on</label>
            <input id="endsAt" type="date" value={form.endsAt} onChange={(e) => set('endsAt', e.target.value)} className="input" />
            <p className="hint">Optional. Used for the “ending soon” list on the Dashboard. A date can be changed but not cleared.</p>
          </div>

          <div>
            <label htmlFor="paymentRef" className="label">Payment reference</label>
            <input id="paymentRef" value={form.paymentRef} onChange={(e) => set('paymentRef', e.target.value)} maxLength={120} placeholder="e.g. bank slip # or JazzCash ID" className="input" />
            <p className="hint">For your records only.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <p className="text-sm font-normal text-muted" aria-live="polite">
          {dirty ? <><span className="font-semibold text-ink">{changes.length}</span> unsaved change{changes.length === 1 ? '' : 's'}</> : 'No unsaved changes.'}
        </p>
        <div className="flex gap-2">
          <button type="button" className="btn-ghost" disabled={!dirty || pending} onClick={() => setForm(initialState(lab))}>Discard</button>
          <button type="button" className="btn-primary" disabled={!dirty || pending} onClick={() => { setError(null); setConfirming(true); }}>
            Review changes
          </button>
        </div>
      </div>

      {confirming && (
        <Modal title="Save these changes?" onClose={() => !pending && setConfirming(false)} size="lg">
          <p className="text-sm font-normal text-muted">
            For <span className="font-semibold text-ink">{lab.lab_name}</span>. This takes effect straight away and is recorded in the audit log.
          </p>

          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {changes.map((change) => (
              <li key={change.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr] sm:items-center">
                <span className="text-sm font-medium text-muted">{change.label}</span>
                <span className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-md bg-black/[0.05] px-2 py-0.5 font-medium text-muted">{change.from}</span>
                  <IconArrowRight size={14} className="text-faint" />
                  <span className="rounded-md bg-lime-soft px-2 py-0.5 font-semibold text-ink">{change.to}</span>
                </span>
              </li>
            ))}
          </ul>

          {warnings.length > 0 && (
            <ul className="mt-3 space-y-1.5 rounded-2xl border border-warn-line bg-warn-soft px-4 py-3 text-sm text-warn">
              {warnings.map((w) => <li key={w}>{w}</li>)}
            </ul>
          )}

          <label htmlFor="change-reason" className="label mt-5">Reason <span className="font-normal text-muted">(optional — saved in the audit log)</span></label>
          <input id="change-reason" value={form.reason} onChange={(e) => set('reason', e.target.value)} maxLength={200} placeholder="e.g. Paid for March via JazzCash" className="input" />

          {error && <p role="alert" className="mt-3 text-sm font-medium text-bad">{error}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setConfirming(false)} disabled={pending}>Go back</button>
            <button type="button" className={form.account === 'suspended' && original.account === 'active' ? 'btn-danger' : 'btn-primary'} onClick={save} disabled={pending}>
              {pending ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/** SMS on/off for one lab — a separate, one-click setting with its own confirmation. */
export function SmsControl({ lab }: { lab: Lab }) {
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const next = !lab.sms_enabled;

  function apply() {
    startTransition(async () => {
      const result = await setSmsAction(lab.owner_id, next);
      if (result.ok) {
        setConfirming(false);
        toast.success(next ? 'SMS turned on' : 'SMS turned off', lab.lab_name);
        router.refresh();
      } else {
        toast.error('Not saved', result.error);
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-ink">SMS notifications</p>
          <p className="text-sm font-normal text-muted">{lab.sms_enabled ? 'On — this lab’s SMS can be sent.' : 'Off — no SMS is sent for this lab.'}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={lab.sms_enabled}
          aria-label="SMS notifications"
          onClick={() => setConfirming(true)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${lab.sms_enabled ? 'bg-ok' : 'bg-line-strong'}`}
        >
          <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${lab.sms_enabled ? 'translate-x-5' : ''}`} />
        </button>
      </div>

      {confirming && (
        <Modal title={next ? 'Turn SMS on?' : 'Turn SMS off?'} onClose={() => !pending && setConfirming(false)}>
          <p className="text-sm font-normal text-muted">
            {next ? 'SMS notifications can be sent for' : 'No SMS notifications will be sent for'} <span className="font-semibold text-ink">{lab.lab_name}</span>. This is recorded in the audit log.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setConfirming(false)} disabled={pending}>Cancel</button>
            <button type="button" className="btn-primary" onClick={apply} disabled={pending}>{pending ? 'Saving…' : next ? 'Turn on' : 'Turn off'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
