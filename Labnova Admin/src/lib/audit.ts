import { auditActionLabel, entityLabel, SOURCE_LABELS, toneForAction } from '@/lib/audit-catalog';
import { actionLabel, formatDate, formatDateTime } from '@/lib/format';
import { ACCOUNT_LABELS, PLAN_LABELS, SUBSCRIPTION_LABELS, type AuditEntry, type AuditRow } from '@/lib/types';

export type AuditView = {
  /** Short headline, e.g. "Plan changed". */
  title: string;
  /** What kind of thing changed, e.g. "Plan", "Account status". */
  field: string | null;
  /** Previous / new value as readable text. `null` = not recorded for this event. */
  from: string | null;
  to: string | null;
  /** Free-text context (reason, PC name, note…). */
  note: string | null;
  tone: 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'teal';
};

function accountValue(field: string | null, value: string | null): string {
  if (value === null || value === '') {
    return field === 'plan' ? 'No plan' : field === 'last_payment_reference' ? 'None' : field === 'subscription_ends_at' ? 'Not set' : '—';
  }
  switch (field) {
    case 'plan':
      return PLAN_LABELS[value] ?? value;
    case 'account_status':
      return ACCOUNT_LABELS[value] ?? value;
    case 'subscription_status':
      return SUBSCRIPTION_LABELS[value] ?? value;
    case 'subscription_ends_at':
      return formatDate(value);
    case 'sms_enabled':
      return value === 'on' ? 'On' : 'Off';
    default:
      return value;
  }
}

const FIELD_LABELS: Record<string, string> = {
  plan: 'Plan',
  account_status: 'Account status',
  subscription_status: 'Subscription',
  subscription_ends_at: 'Subscription ends',
  last_payment_reference: 'Payment reference',
  sms_enabled: 'SMS',
};

export function describeAudit(entry: AuditEntry): AuditView {
  const title = actionLabel(entry.action);

  if (entry.source === 'account') {
    const field = entry.field_name;
    const toneByField: Record<string, AuditView['tone']> = {
      plan: 'blue',
      account_status: entry.new_value === 'suspended' ? 'red' : 'green',
      subscription_status: entry.new_value === 'expired' ? 'red' : entry.new_value === 'active' ? 'green' : 'amber',
      subscription_ends_at: 'slate',
      last_payment_reference: 'slate',
      sms_enabled: 'teal',
    };
    return {
      title,
      field: field ? (FIELD_LABELS[field] ?? field) : null,
      from: accountValue(field, entry.old_value),
      to: accountValue(field, entry.new_value),
      note: entry.reason,
      tone: (field && toneByField[field]) || 'slate',
    };
  }

  // Offline licence events. The log stores the action and free text, not the old/new
  // status, so previous values are shown only where they can be told for certain.
  const pc = entry.device_name ? `PC: ${entry.device_name}` : null;
  const join = (...parts: (string | null | undefined)[]) => parts.filter(Boolean).join(' · ') || null;
  switch (entry.action) {
    case 'key_generated':
      return { title, field: 'Key status', from: null, to: 'Unused', note: join(entry.details), tone: 'blue' };
    case 'key_expiry_changed': {
      const change = parseExpiryChange(entry.details);
      return { title, field: 'Key expiry', from: change.from, to: change.to, note: join(pc, change.note), tone: 'amber' };
    }
    case 'key_expired':
      return { title, field: 'Key status', from: 'Valid', to: 'Expired', note: join(pc, entry.details), tone: 'red' };
    case 'migration_started':
      return { title, field: 'Mode', from: 'Offline', to: 'Switching to Online…', note: join(pc, entry.details), tone: 'amber' };
    case 'migration_verified':
      return { title, field: 'Mode', from: 'Offline', to: 'Online (data verified)', note: join(pc, entry.details), tone: 'green' };
    case 'migration_failed':
      return { title, field: 'Mode', from: 'Offline', to: 'Switch not completed', note: join(pc, entry.details), tone: 'red' };
    case 'key_revoked':
      return { title, field: 'Key status', from: entry.device_name ? 'Activated' : 'Unused', to: 'Revoked', note: join(pc, entry.details), tone: 'red' };
    case 'key_reset':
      return { title, field: 'Key status', from: 'Activated or revoked', to: 'Unused (PC detached)', note: join(entry.device_name ? `Was on PC: ${entry.device_name}` : null, entry.details), tone: 'amber' };
    case 'key_deleted':
      return { title, field: 'Key status', from: 'Unused', to: 'Deleted', note: null, tone: 'slate' };
    case 'device_activated':
      return { title, field: 'Key status', from: 'Unused', to: 'Activated', note: join(pc, entry.details), tone: 'green' };
    case 'device_reactivated':
      return { title, field: 'Key status', from: 'Activated', to: 'Activated (same PC)', note: join(pc), tone: 'green' };
    case 'activation_failed':
      return { title, field: null, from: null, to: null, note: join(pc, entry.details), tone: 'red' };
    default:
      return { title, field: null, from: null, to: null, note: join(pc, entry.details), tone: 'slate' };
  }
}

export function actorLabel(entry: Pick<AuditEntry, 'actor_type' | 'actor_email'>): string {
  if (entry.actor_type === 'admin') return entry.actor_email ?? 'An admin';
  if (entry.actor_type === 'device') return "The lab's PC";
  if (entry.actor_type === 'lab') return entry.actor_email ? `${entry.actor_email} (lab)` : 'The lab';
  return 'System';
}

/** "2026-10-04T10:00Z" -> "04 Oct 2026"; anything else (for example "no expiry") is shown as it is. */
function readableExpiry(value: string): string {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z$/.test(trimmed)) return formatDate(trimmed);
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** The server writes the change as "<old> → <new> · <reason>". */
function parseExpiryChange(details: string | null): { from: string | null; to: string | null; note: string | null } {
  if (!details) return { from: null, to: null, note: null };
  const [change, ...rest] = details.split(' · ');
  const [from, to] = change.split(' → ');
  if (!to) return { from: null, to: null, note: details };
  return { from: readableExpiry(from), to: readableExpiry(to), note: rest.join(' · ') || null };
}

/** Rows of admin_audit_search() have the same fields as admin_list_audit() rows (the text sits in `summary`). */
export function toEntry(row: AuditRow): AuditEntry {
  return {
    source: row.source,
    id: row.id,
    created_at: row.created_at,
    owner_id: row.owner_id,
    lab_name: row.lab_name,
    action: row.action,
    actor_type: row.actor_type,
    actor_email: row.actor_email,
    field_name: row.field_name,
    old_value: row.old_value,
    new_value: row.new_value,
    reason: row.reason,
    details: row.source === 'license' ? row.summary : null,
    device_name: row.device_name,
    key_hint: row.key_hint,
  };
}

export type RowView = AuditView & {
  sourceLabel: string;
  /** "Patient", "Report"… (empty for events that are not about a record). */
  entity: string;
  who: string;
  /** "Admin", "Offline PC", "Windows app"… */
  whoKind: string;
  /** One line telling what happened (the record's own description). */
  summary: string | null;
};

/** How one audit-search row reads in the table and the details drawer. */
export function describeRow(row: AuditRow): RowView {
  const entry = toEntry(row);
  const base: AuditView =
    row.source === 'account' || row.source === 'license'
      ? describeAudit(entry)
      : {
          title: auditActionLabel(row.action),
          field: null,
          from: null,
          to: null,
          note: null,
          tone: toneForAction(row.action),
        };

  const lab = row.source === 'lab_online' || row.source === 'lab_offline';
  return {
    ...base,
    sourceLabel: SOURCE_LABELS[row.source] ?? row.source,
    entity: lab && row.entity_type ? entityLabel(row.entity_type) : '',
    who: actorLabel(entry),
    whoKind:
      row.source === 'lab_offline'
        ? 'Offline PC'
        : row.source === 'lab_online'
          ? 'Online mode'
          : row.actor_type === 'admin'
            ? 'Admin'
            : row.actor_type === 'device'
              ? 'Windows app'
              : row.actor_type === 'lab'
                ? 'Lab owner'
                : 'Automatic',
    summary: lab ? row.summary : base.note,
  };
}

/** Full date and time in Pakistan time, and the same instant in UTC (for the details drawer). */
export function whenParts(value: string): { pkt: string; utc: string } {
  const date = new Date(value);
  return { pkt: formatDateTime(value), utc: Number.isNaN(date.getTime()) ? '—' : `${date.toISOString().replace('T', ' ').slice(0, 19)} UTC` };
}
