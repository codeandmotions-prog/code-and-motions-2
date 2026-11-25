import { auditActionLabel } from '@/lib/audit-catalog';

const dateTime = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Karachi',
});

const dateOnly = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'Asia/Karachi',
});

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : `${dateTime.format(date)} PKT`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateOnly.format(date);
}

export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.ceil((date.getTime() - Date.now()) / 86_400_000);
}

/** Readable name of an audit action (see audit-catalog.ts for the full list). */
export function actionLabel(action: string): string {
  return auditActionLabel(action);
}

/** Calendar date (yyyy-mm-dd) in Pakistan time, for <input type="date"> and comparisons. */
const isoDay = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Karachi' });
export function pktDay(value: string | null | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : isoDay.format(date);
}

export const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** A real calendar date (rejects 2026-02-31, month 13, absurd years). */
export function isRealDay(day: string | undefined | null): day is string {
  if (!day || !DAY_RE.test(day)) return false;
  const year = Number(day.slice(0, 4));
  if (year < 2000 || year > 2100) return false;
  const date = new Date(`${day}T12:00:00+05:00`);
  if (Number.isNaN(date.getTime())) return false;
  return isoDay.format(date) === day;
}

/** Start of a Pakistan-time day, as an ISO instant (or null if the text is not a valid date). */
export function pktDayStart(day: string | undefined): string | null {
  if (!isRealDay(day)) return null;
  return new Date(`${day}T00:00:00+05:00`).toISOString();
}

/** Start of the day AFTER the given Pakistan-time day (an exclusive upper bound). */
export function pktNextDayStart(day: string | undefined): string | null {
  const start = pktDayStart(day);
  if (!start) return null;
  return new Date(new Date(start).getTime() + 86_400_000).toISOString();
}

export function relativeDay(value: string | null | undefined): string {
  const d = daysUntil(value);
  if (d === null) return '';
  if (d < 0) return `${-d} day${d === -1 ? '' : 's'} ago`;
  if (d === 0) return 'today';
  return `in ${d} day${d === 1 ? '' : 's'}`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return ((parts[0][0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '')).toUpperCase();
}
