import type { AuditRow, AuditSource } from '@/lib/types';

/**
 * Everything the Audit logs page needs to describe the events in words: readable names for every action the
 * Windows app, the Web Admin and the licensing server write, how they are grouped in the filter, and which
 * kind of record they are about. An action that is not listed here is still shown (its code is turned into
 * words), so a newer app version can never make an entry disappear from the page.
 */

/* ---------------- Sources ---------------- */

export const SOURCE_LABELS: Record<AuditSource, string> = {
  account: 'Admin change',
  license: 'Key & device',
  lab_online: 'Lab (Online)',
  lab_offline: 'Lab (Offline PC)',
};

/** Filter choices for "Where from". `sources` is what is sent to the database (null = everything). */
export const SOURCE_FILTERS: { value: string; label: string; sources: AuditSource[] | null }[] = [
  { value: '', label: 'Everything', sources: null },
  { value: 'lab', label: 'Lab activity (Online + Offline)', sources: ['lab_online', 'lab_offline'] },
  { value: 'lab_offline', label: 'Offline PCs only', sources: ['lab_offline'] },
  { value: 'lab_online', label: 'Online mode only', sources: ['lab_online'] },
  { value: 'account', label: 'Admin changes (plan, status, SMS)', sources: ['account'] },
  { value: 'license', label: 'Activation keys & devices', sources: ['license'] },
];

export function sourcesForFilter(value: string): AuditSource[] | null {
  return SOURCE_FILTERS.find((f) => f.value === value)?.sources ?? null;
}

/* ---------------- Actions ---------------- */

/** Actions the Windows app writes (same codes in Online and Offline mode). */
const LAB_ACTIONS: Record<string, string> = {
  'auth.login': 'Signed in',
  'auth.logout': 'Signed out',

  'patient.created': 'Patient added',
  'patient.updated': 'Patient edited',
  'patient.deleted': 'Patient deleted',

  'report.results_saved': 'Report results saved',
  'report.pdf_generated': 'Report PDF generated',
  'report.pdf_downloaded': 'Report PDF saved or printed',
  'report.printed': 'Report printed',
  'report.sent_whatsapp': 'Report sent on WhatsApp',
  'sms.sent': 'SMS sent',

  'test.created': 'Test added',
  'test.updated': 'Test edited',
  'test.deleted': 'Test deleted',
  'doctor.created': 'Doctor added',
  'doctor.updated': 'Doctor edited',
  'doctor.deleted': 'Doctor deleted',
  'technician.created': 'Technician added',
  'technician.updated': 'Technician edited',
  'technician.deleted': 'Technician deleted',
  'report_template.created': 'Report template added',
  'report_template.updated': 'Report template edited',
  'report_template.deleted': 'Report template deleted',
  'report_template.activated': 'Report template activated',
  'full_body_template.created': 'Full-body template added',
  'full_body_template.updated': 'Full-body template edited',
  'full_body_template.deleted': 'Full-body template deleted',

  'stock_item.created': 'Stock item added',
  'stock_item.updated': 'Stock item edited',
  'stock_item.deleted': 'Stock item deleted',
  'invoice.created': 'Invoice created',
  'invoice.deleted': 'Invoice deleted',
  'payment.recorded': 'Payment recorded',
  'expense.created': 'Expense added',
  'expense.updated': 'Expense edited',
  'expense.deleted': 'Expense deleted',

  'lab_profile.updated': 'Lab profile changed',
  'branding.updated': 'Branding changed',
  'sync.setting_changed': 'Cloud-sync setting changed',

  'backup.created': 'Backup created',
  'backup.restored': 'Backup restored',

  'license.activated': 'Offline Mode activated on a PC',
  'license.renewed': 'License renewed on a PC',
  'mode.switch_started': 'Switch to Online Mode started',
  'mode.switch_completed': 'Switched to Online Mode',
  'mode.switch_failed': 'Switch to Online Mode failed',
};

/** Actions written by this Web Admin and by the licensing server. */
const ADMIN_ACTIONS: Record<string, string> = {
  lab_plan_changed: 'Plan changed',
  lab_account_status_changed: 'Account status changed',
  lab_subscription_status_changed: 'Subscription status changed',
  lab_subscription_end_changed: 'Subscription end date changed',
  lab_payment_reference_changed: 'Payment reference changed',
  lab_sms_changed: 'SMS setting changed',
  key_generated: 'Activation key created',
  key_revoked: 'Key revoked',
  key_reset: 'Key reset for a new PC',
  key_deleted: 'Unused key deleted',
  key_expiry_changed: 'Key expiry changed',
  key_expired: 'Key expired',
  device_activated: 'PC activated',
  device_reactivated: 'Same PC activated again',
  activation_failed: 'Activation attempt failed',
  sync_enrolled: 'PC set up for cloud sync',
  sync_credential_reset: 'Cloud-sync access reset',
  sync_enroll_refused: 'Cloud-sync setup refused',
  migration_started: 'PC started switching to Online',
  migration_verified: 'PC switch to Online verified',
  migration_failed: 'PC switch to Online failed',
};

export const ALL_ACTION_LABELS: Record<string, string> = { ...LAB_ACTIONS, ...ADMIN_ACTIONS };

export function auditActionLabel(action: string): string {
  const known = ALL_ACTION_LABELS[action];
  if (known) return known;
  const words = action.replace(/[._]+/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : 'Unknown action';
}

/** A group of actions as one filter choice. */
export type ActionCategory = { value: string; label: string; actions: string[] };

export const ACTION_CATEGORIES: ActionCategory[] = [
  { value: 'cat:auth', label: 'Sign-in & sign-out', actions: ['auth.login', 'auth.logout'] },
  { value: 'cat:patients', label: 'Patients', actions: ['patient.created', 'patient.updated', 'patient.deleted'] },
  { value: 'cat:reports', label: 'Reports & results', actions: ['report.results_saved'] },
  { value: 'cat:documents', label: 'PDF, print & download', actions: ['report.pdf_generated', 'report.pdf_downloaded', 'report.printed'] },
  { value: 'cat:messages', label: 'SMS & WhatsApp', actions: ['sms.sent', 'report.sent_whatsapp'] },
  {
    value: 'cat:catalog',
    label: 'Tests, doctors, technicians & templates',
    actions: [
      'test.created', 'test.updated', 'test.deleted',
      'doctor.created', 'doctor.updated', 'doctor.deleted',
      'technician.created', 'technician.updated', 'technician.deleted',
      'report_template.created', 'report_template.updated', 'report_template.deleted', 'report_template.activated',
      'full_body_template.created', 'full_body_template.updated', 'full_body_template.deleted',
    ],
  },
  {
    value: 'cat:money',
    label: 'Billing, payments, expenses & stock',
    actions: [
      'invoice.created', 'invoice.deleted', 'payment.recorded',
      'expense.created', 'expense.updated', 'expense.deleted',
      'stock_item.created', 'stock_item.updated', 'stock_item.deleted',
    ],
  },
  { value: 'cat:settings', label: 'Profile, branding & settings', actions: ['lab_profile.updated', 'branding.updated', 'sync.setting_changed'] },
  { value: 'cat:backup', label: 'Backup & restore', actions: ['backup.created', 'backup.restored'] },
  {
    value: 'cat:license',
    label: 'Activation & license',
    actions: [
      'license.activated', 'license.renewed',
      'key_generated', 'key_revoked', 'key_reset', 'key_deleted', 'key_expiry_changed', 'key_expired',
      'device_activated', 'device_reactivated', 'activation_failed',
    ],
  },
  {
    value: 'cat:mode',
    label: 'Online / Offline mode switch',
    actions: [
      'mode.switch_started', 'mode.switch_completed', 'mode.switch_failed',
      'migration_started', 'migration_verified', 'migration_failed',
    ],
  },
  {
    value: 'cat:sync',
    label: 'Cloud sync',
    actions: ['sync_enrolled', 'sync_credential_reset', 'sync_enroll_refused', 'sync.setting_changed'],
  },
  {
    value: 'cat:admin',
    label: 'Admin changes (plan, status, SMS)',
    actions: [
      'lab_plan_changed', 'lab_account_status_changed', 'lab_subscription_status_changed',
      'lab_subscription_end_changed', 'lab_payment_reference_changed', 'lab_sms_changed',
    ],
  },
];

/** The "Single action" list in the filter: every known action, by readable name. */
export const SINGLE_ACTION_CODES: string[] = Object.keys(ALL_ACTION_LABELS).sort((a, b) =>
  ALL_ACTION_LABELS[a].localeCompare(ALL_ACTION_LABELS[b]),
);

/** Turns the chosen filter value into the database's list of action codes (null = all actions). */
export function actionsForType(value: string): string[] | null {
  if (!value) return null;
  const category = ACTION_CATEGORIES.find((c) => c.value === value);
  if (category) return category.actions;
  return Object.hasOwn(ALL_ACTION_LABELS, value) ? [value] : null;
}

export function isKnownActionFilter(value: string): boolean {
  return ACTION_CATEGORIES.some((c) => c.value === value) || Object.hasOwn(ALL_ACTION_LABELS, value);
}

/* ---------------- Records ("entity types") ---------------- */

export const ENTITY_LABELS: Record<string, string> = {
  patient: 'Patient',
  test: 'Test',
  report: 'Report',
  doctor: 'Doctor',
  technician: 'Technician',
  stock_item: 'Stock item',
  invoice: 'Invoice',
  payment: 'Payment',
  report_template: 'Report template',
  full_body_template: 'Full-body template',
  expense: 'Expense',
  session: 'Sign-in session',
  message: 'Message',
  lab_profile: 'Lab profile',
  backup: 'Backup',
  license: 'License',
  mode: 'Working mode',
  sync: 'Cloud sync',
  lab: 'Lab account',
  license_key: 'Activation key',
};

export const ENTITY_TYPES = Object.keys(ENTITY_LABELS);

export function entityLabel(entityType: string | null): string {
  if (!entityType) return '—';
  return ENTITY_LABELS[entityType] ?? entityType.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

/* ---------------- How an event looks ---------------- */

export type Tone = 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'teal';

export function toneForAction(action: string): Tone {
  if (action.startsWith('auth.')) return 'slate';
  if (action.startsWith('report.pdf_') || action === 'report.printed' || action === 'report.sent_whatsapp' || action === 'sms.sent') return 'blue';
  const last = action.split(/[._]/).pop() ?? '';
  if (['deleted', 'revoked', 'failed', 'refused', 'expired'].includes(last)) return 'red';
  if (['created', 'activated', 'reactivated', 'renewed', 'verified', 'completed', 'recorded', 'restored', 'generated', 'saved', 'enrolled'].includes(last)) return 'green';
  if (['updated', 'changed', 'reset', 'started'].includes(last)) return 'amber';
  return 'slate';
}

/** Short readable text for a before/after value in the drawer. */
export function showValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value === '' ? '(empty)' : value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  try {
    const text = JSON.stringify(value);
    return text.length > 400 ? `${text.slice(0, 400)}…` : text;
  } catch {
    return '—';
  }
}

export type FieldChange = { field: string; before: string; after: string };

/** The fields that differ between before and after (every key of either side), as readable text. */
export function fieldChanges(before: Record<string, unknown> | null, after: Record<string, unknown> | null): FieldChange[] {
  const keys = new Set<string>([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]);
  const out: FieldChange[] = [];
  for (const field of [...keys].sort()) {
    const a = before && Object.hasOwn(before, field) ? before[field] : undefined;
    const b = after && Object.hasOwn(after, field) ? after[field] : undefined;
    if (JSON.stringify(a) === JSON.stringify(b)) continue;
    out.push({ field, before: showValue(a), after: showValue(b) });
  }
  return out;
}

/** Field names listed by the PC without their values (`metadata.changedFields`). */
export function changedFieldNames(row: Pick<AuditRow, 'metadata'>): string[] {
  const raw = row.metadata?.changedFields;
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is string => typeof v === 'string').slice(0, 40);
}

/** Everything in `metadata` other than the pieces shown separately, as short key/value text. */
export function extraDetails(row: Pick<AuditRow, 'metadata'>): { key: string; value: string }[] {
  const meta = row.metadata;
  if (!meta) return [];
  const out: { key: string; value: string }[] = [];
  for (const [key, value] of Object.entries(meta)) {
    if (key === 'before' || key === 'after' || key === 'changedFields') continue;
    out.push({ key, value: showValue(value) });
    if (out.length >= 30) break;
  }
  return out;
}
