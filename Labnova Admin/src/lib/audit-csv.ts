import { auditActionLabel, entityLabel, SOURCE_LABELS } from '@/lib/audit-catalog';
import type { AuditRow } from '@/lib/types';

/**
 * CSV export of audit rows. Opens correctly in Excel (UTF-8 byte-order mark, quoted fields) and is safe against
 * "CSV injection": a cell that starts with = + - @ (or a tab / carriage return) is prefixed with an apostrophe so a
 * spreadsheet shows it as text instead of running it as a formula.
 */

const pkt = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Karachi',
});

const HEADER = [
  'Time (UTC)',
  'Time (Pakistan)',
  'Lab',
  'Where from',
  'Who',
  'Action',
  'Action code',
  'Record type',
  'Record id',
  'Summary',
  'Field',
  'Previous value',
  'New value',
  'Reason',
  'PC',
  'Key (last 4)',
  'Before (JSON)',
  'After (JSON)',
  'Details (JSON)',
];

export function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function auditCsv(rows: AuditRow[]): string {
  const lines = [HEADER.map(csvCell).join(',')];
  for (const row of rows) {
    const when = new Date(row.created_at);
    const valid = !Number.isNaN(when.getTime());
    lines.push(
      [
        valid ? when.toISOString() : '',
        valid ? pkt.format(when) : '',
        row.lab_name ?? '',
        SOURCE_LABELS[row.source] ?? row.source,
        row.actor_email ?? (row.actor_type === 'device' ? "The lab's PC" : row.actor_type === 'system' ? 'System' : ''),
        auditActionLabel(row.action),
        row.action,
        row.entity_type ? entityLabel(row.entity_type) : '',
        row.entity_id ?? '',
        row.summary ?? '',
        row.field_name ?? '',
        row.old_value ?? '',
        row.new_value ?? '',
        row.reason ?? '',
        row.device_name ?? '',
        row.key_hint ?? '',
        row.before_json,
        row.after_json,
        row.metadata,
      ]
        .map(csvCell)
        .join(','),
    );
  }
  // CRLF line ends and a BOM: what Excel expects.
  return `﻿${lines.join('\r\n')}\r\n`;
}
