'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getLab, isMissingFunction, listOfflineKeys } from '@/lib/data';
import { isRealDay, pktDay } from '@/lib/format';
import { createClient } from '@/lib/supabase/server';
import { PLAN_LABELS, SELECTABLE_PLANS, type Lab } from '@/lib/types';

export type ActionResult<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SCHEMA_MESSAGE = 'The database update for this feature has not been run yet. Run supabase/web_admin_phase1.sql in the Supabase SQL editor, then try again.';
const EXPIRY_SCHEMA_MESSAGE = 'The key-expiry database update has not been run yet. Run supabase/phase2_features.sql in the Supabase SQL editor, then try again.';
const SYNC_SCHEMA_MESSAGE = 'The cloud-sync database update has not been run yet. Run supabase/sync_foundation.sql in the Supabase SQL editor, then try again.';

// The database raises short, admin-safe messages. Show those; anything
// unexpected becomes a generic message (never raw database errors).
const SAFE_PREFIXES = ['This lab', 'This key', 'Only unused', 'Key not found', 'Lab not found'];

function safeMessage(message: string | undefined, fallback: string): string {
  if (message && SAFE_PREFIXES.some((prefix) => message.startsWith(prefix))) return message;
  return fallback;
}

function cleanText(value: string | undefined, max: number): string | null {
  const trimmed = (value ?? '').trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

function refresh(ownerId: string) {
  revalidatePath(`/labs/${ownerId}`);
  revalidatePath('/labs');
  revalidatePath('/audit');
  revalidatePath('/');
}

/* ------------------------------------------------------------------ */
/* Plan & status                                                       */
/* ------------------------------------------------------------------ */

export type LabFormState = {
  account: string;
  subscription: string;
  plan: string | null;
  /** yyyy-mm-dd (Pakistan time) or '' */
  endsAt: string;
  paymentRef: string;
};

export type LabChangeInput = LabFormState & {
  /** What the admin saw when the form loaded; used to detect that someone else changed the lab meanwhile. */
  baseline: LabFormState;
  reason: string;
};

export type LabChangeResult = { changed: string[] };

function liveState(lab: Lab): LabFormState {
  return {
    account: lab.account_status,
    subscription: lab.subscription_status,
    plan: lab.plan,
    endsAt: pktDay(lab.subscription_ends_at),
    paymentRef: lab.last_payment_reference ?? '',
  };
}

function cleanState(value: unknown): LabFormState | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.account !== 'string' || typeof v.subscription !== 'string') return null;
  if (typeof v.endsAt !== 'string' || typeof v.paymentRef !== 'string') return null;
  if (v.plan !== null && v.plan !== undefined && typeof v.plan !== 'string') return null;
  return {
    account: v.account,
    subscription: v.subscription,
    plan: v.plan === undefined || v.plan === '' ? null : (v.plan as string | null),
    endsAt: v.endsAt,
    paymentRef: v.paymentRef.trim(),
  };
}

const STALE_MESSAGE = 'This lab was changed by someone else while you were editing. Refresh the page to see the latest values, then try again.';

/**
 * Changes a lab's plan / account status / subscription through the EXISTING
 * database logic (admin_update_lab_subscription, reached via the thin
 * admin_set_lab_subscription wrapper that also stores the reason).
 *
 * Only fields the admin actually changed are sent, and only if the lab still
 * has the value the admin saw (otherwise: "changed by someone else, refresh").
 */
export async function updateLabAction(ownerId: string, input: LabChangeInput): Promise<ActionResult<LabChangeResult>> {
  await requireAdmin();
  if (!UUID.test(ownerId)) return { ok: false, error: 'Invalid lab.' };

  const want = cleanState(input);
  const base = cleanState(input?.baseline);
  if (!want || !base) return { ok: false, error: 'Invalid request.' };
  const reason = cleanText(typeof input.reason === 'string' ? input.reason : '', 200);

  let lab: Lab | null;
  try {
    lab = await getLab(ownerId);
  } catch {
    return { ok: false, error: 'Could not load this lab right now. Nothing was changed.' };
  }
  if (!lab) return { ok: false, error: 'Lab not found.' };
  const live = liveState(lab);

  // ---- validate the values the admin chose (never trust the browser) ----
  if (!['active', 'suspended'].includes(want.account)) return { ok: false, error: 'Choose a valid account status.' };
  if (!['trial', 'active', 'expired'].includes(want.subscription)) return { ok: false, error: 'Choose a valid subscription status.' };
  if (want.plan !== null && !(SELECTABLE_PLANS as readonly string[]).includes(want.plan) && want.plan !== live.plan) {
    return { ok: false, error: 'Choose a valid plan.' };
  }
  if (want.plan !== null && !Object.hasOwn(PLAN_LABELS, want.plan)) return { ok: false, error: 'Choose a valid plan.' };
  if (want.endsAt !== '' && !isRealDay(want.endsAt)) return { ok: false, error: 'Enter the end date as a valid date.' };

  const touched = {
    account: want.account !== base.account,
    subscription: want.subscription !== base.subscription,
    plan: want.plan !== base.plan,
    endsAt: want.endsAt !== '' && want.endsAt !== base.endsAt,
    paymentRef: want.paymentRef !== base.paymentRef,
  };

  // Only validate what is being changed (an old, over-long stored reference must not block other edits).
  if (touched.paymentRef && want.paymentRef.length > 120) {
    return { ok: false, error: 'The payment reference is too long (120 characters at most).' };
  }

  // Someone else changed a field this admin is now changing -> do not overwrite blindly.
  for (const key of Object.keys(touched) as (keyof typeof touched)[]) {
    if (touched[key] && live[key] !== base[key]) return { ok: false, error: STALE_MESSAGE };
  }

  // ---- work out what really changes ----
  const changed: string[] = [];

  const accountParam = touched.account && want.account !== live.account ? want.account : null;
  if (accountParam) changed.push('account status');

  const subscriptionParam = touched.subscription && want.subscription !== live.subscription ? want.subscription : null;
  if (subscriptionParam) changed.push('subscription status');

  // Moving INTO the free trial makes the database clear the plan itself.
  const intoTrial = subscriptionParam === 'trial';
  let planParam: string | null = null;
  if (intoTrial) {
    if (live.plan !== null) changed.push('plan (cleared for the free trial)');
  } else if (touched.plan) {
    if (want.plan === null) {
      if (live.plan !== null) return { ok: false, error: 'A plan can only be removed by moving the lab to "Free trial".' };
    } else if (want.plan !== live.plan) {
      planParam = want.plan;
      changed.push('plan');
    }
  }

  let endsParam: string | null = null;
  if (touched.endsAt && want.endsAt !== live.endsAt) {
    // The whole end day counts: the subscription runs until the end of that day, Pakistan time.
    endsParam = new Date(`${want.endsAt}T23:59:59+05:00`).toISOString();
    changed.push('subscription end date');
  }

  let paymentParam: string | null = null;
  if (touched.paymentRef && want.paymentRef !== live.paymentRef) {
    paymentParam = want.paymentRef;
    changed.push('payment reference');
  }

  if (changed.length === 0) return { ok: false, error: 'Nothing to save — no changes were made.' };

  const supabase = await createClient();
  const { error } = await supabase.rpc('admin_set_lab_subscription', {
    p_owner_id: ownerId,
    p_account_status: accountParam,
    p_subscription_status: subscriptionParam,
    p_plan: planParam,
    p_subscription_ends_at: endsParam,
    p_payment_reference: paymentParam,
    p_reason: reason,
  });
  if (error) {
    if (isMissingFunction(error)) return { ok: false, error: SCHEMA_MESSAGE };
    return { ok: false, error: safeMessage(error.message, 'Could not save these changes. Nothing was changed.') };
  }

  refresh(ownerId);
  return { ok: true, data: { changed } };
}

/** Switches SMS on/off for one lab (existing admin_set_sms_enabled). */
export async function setSmsAction(ownerId: string, enabled: boolean): Promise<ActionResult> {
  await requireAdmin();
  if (!UUID.test(ownerId)) return { ok: false, error: 'Invalid lab.' };
  if (typeof enabled !== 'boolean') return { ok: false, error: 'Invalid request.' };

  let lab: Lab | null;
  try {
    lab = await getLab(ownerId);
  } catch {
    return { ok: false, error: 'Could not load this lab right now. Nothing was changed.' };
  }
  if (!lab) return { ok: false, error: 'Lab not found.' };

  const supabase = await createClient();
  const { error } = await supabase.rpc('admin_set_sms_enabled', { p_owner_id: ownerId, p_enabled: enabled });
  if (error) return { ok: false, error: 'Could not change the SMS setting. Nothing was changed.' };

  refresh(ownerId);
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Offline activation keys                                             */
/* ------------------------------------------------------------------ */

/**
 * A chosen expiry day (yyyy-mm-dd, Pakistan time) as the instant the key stops being valid: the END of that day.
 * '' means "no expiry". Returns an error text for anything that is not a real day in the future (the database
 * checks the same limits again).
 */
function expiryInstant(day: string): { iso: string | null } | { error: string } {
  if (day === '') return { iso: null };
  if (!isRealDay(day)) return { error: 'Enter the expiry as a valid date.' };
  const instant = new Date(`${day}T23:59:59+05:00`);
  const now = Date.now();
  if (instant.getTime() <= now + 3_600_000) return { error: 'The expiry date must be in the future. To end a key now, revoke it instead.' };
  if (instant.getTime() > now + 10 * 365 * 86_400_000) return { error: 'The expiry date can be at most 10 years from now.' };
  return { iso: instant.toISOString() };
}

export async function generateKeyAction(ownerId: string, note: string, expiresOn: string = ''): Promise<ActionResult<{ keyText: string }>> {
  await requireAdmin();
  if (!UUID.test(ownerId)) return { ok: false, error: 'Invalid lab.' };
  if (typeof expiresOn !== 'string') return { ok: false, error: 'Invalid request.' };

  const expiry = expiryInstant(expiresOn);
  if ('error' in expiry) return { ok: false, error: expiry.error };

  const supabase = await createClient();
  // The expiry argument is only sent when one was chosen, so creating a key without an expiry keeps working
  // even before the key-expiry database update has been run.
  const { data, error } = await supabase.rpc('admin_generate_offline_key', {
    p_owner_id: ownerId,
    p_note: cleanText(note, 80),
    ...(expiry.iso ? { p_expires_at: expiry.iso } : {}),
  });
  if (error) {
    if (expiry.iso && isMissingFunction(error)) return { ok: false, error: EXPIRY_SCHEMA_MESSAGE };
    return { ok: false, error: safeMessage(error.message, 'Could not create a key right now. Please try again.') };
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.key_text) return { ok: false, error: 'Could not create a key right now. Please try again.' };

  refresh(ownerId);
  return { ok: true, data: { keyText: row.key_text as string } };
}

async function keyAction(
  ownerId: string,
  keyId: string,
  fn: string,
  params: Record<string, unknown>,
  fallback: string,
  schemaMessage: string = SCHEMA_MESSAGE,
): Promise<ActionResult> {
  await requireAdmin();
  if (!UUID.test(ownerId) || !UUID.test(keyId)) return { ok: false, error: 'Invalid request.' };

  // The key must really belong to this lab (keeps the page we refresh honest).
  const ownerKeys = await listOfflineKeys(ownerId).catch(() => null);
  if (!ownerKeys) return { ok: false, error: fallback };
  if (!ownerKeys.some((key) => key.id === keyId)) return { ok: false, error: 'Key not found for this lab.' };

  const supabase = await createClient();
  const { error } = await supabase.rpc(fn, params);
  if (error) {
    if (isMissingFunction(error)) return { ok: false, error: schemaMessage };
    return { ok: false, error: safeMessage(error.message, fallback) };
  }

  refresh(ownerId);
  return { ok: true };
}

/**
 * Sets, extends, shortens or removes ('' = no expiry) a key's expiry date. A PC picks the change up the next time it
 * is online (it receives a newly signed license), so extending an expired key brings that PC back.
 */
export async function setKeyExpiryAction(ownerId: string, keyId: string, expiresOn: string, reason: string) {
  if (typeof expiresOn !== 'string') return { ok: false, error: 'Invalid request.' } as const;
  const expiry = expiryInstant(expiresOn);
  if ('error' in expiry) return { ok: false, error: expiry.error } as const;
  return keyAction(ownerId, keyId, 'admin_set_offline_key_expiry', { p_key_id: keyId, p_expires_at: expiry.iso, p_reason: cleanText(reason, 120) },
    'Could not change this key’s expiry right now. Please try again.', EXPIRY_SCHEMA_MESSAGE);
}

export async function revokeKeyAction(ownerId: string, keyId: string, reason: string) {
  return keyAction(ownerId, keyId, 'admin_revoke_offline_key', { p_key_id: keyId, p_reason: cleanText(reason, 120) },
    'Could not revoke this key right now. Please try again.');
}

export async function resetKeyAction(ownerId: string, keyId: string, reason: string) {
  return keyAction(ownerId, keyId, 'admin_reset_offline_key', { p_key_id: keyId, p_reason: cleanText(reason, 120) },
    'Could not reset this key right now. Please try again.');
}

export async function deleteKeyAction(ownerId: string, keyId: string) {
  return keyAction(ownerId, keyId, 'admin_delete_offline_key', { p_key_id: keyId },
    'Could not delete this key right now. Please try again.');
}

/**
 * Lets a PC that lost its cloud-sync access enrol again (admin_reset_device_sync). Touches neither the
 * license nor the key: the PC keeps working exactly as before and enrols the next time it is online.
 */
export async function resetSyncAction(ownerId: string, keyId: string, reason: string) {
  return keyAction(ownerId, keyId, 'admin_reset_device_sync', { p_key_id: keyId, p_reason: cleanText(reason, 120) },
    'Could not reset sync access right now. Please try again.', SYNC_SCHEMA_MESSAGE);
}
