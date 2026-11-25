import { actionsForType, ENTITY_TYPES, isKnownActionFilter, sourcesForFilter, SOURCE_FILTERS } from '@/lib/audit-catalog';
import { isRealDay, pktDay, pktDayStart, pktNextDayStart } from '@/lib/format';
import type { AuditSearch } from '@/lib/data';

/**
 * The audit page's filters, as they appear in the address bar. Everything in the URL is untrusted text, so every value
 * is checked here (a lab must be a UUID, a date a real calendar day, a type one we know…) and anything else is
 * dropped — the page and the CSV export both go through this, so they always agree.
 */

export const PAGE_SIZES = [25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 50;
export const MAX_EXPORT_ROWS = 5000;
/** The deepest row the page can reach (the database allows the same). Past it: narrow the dates. */
export const MAX_OFFSET = 200_000;
/** Most entries deleted in one step by "delete everything that matches" (the database enforces the same). */
export const MAX_DELETE_MATCHING = 5000;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AuditFilters = {
  q: string;
  lab: string;
  source: string;
  type: string;
  entity: string;
  actor: string;
  from: string;
  to: string;
  size: number;
  page: number;
};

type Raw = Record<string, string | string[] | undefined> | URLSearchParams;

function pick(raw: Raw, name: string): string {
  const value = raw instanceof URLSearchParams ? raw.get(name) : raw[name];
  return typeof value === 'string' ? value : '';
}

/** Collapses whitespace/control characters and caps the length. */
function cleanText(value: string, max: number): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

export function parseAuditFilters(raw: Raw): AuditFilters {
  const lab = pick(raw, 'lab');
  const source = pick(raw, 'source');
  const type = pick(raw, 'type');
  const entity = pick(raw, 'entity');
  const from = pick(raw, 'from');
  const to = pick(raw, 'to');
  const sizeRaw = Number.parseInt(pick(raw, 'size'), 10);
  const size = (PAGE_SIZES as readonly number[]).includes(sizeRaw) ? sizeRaw : DEFAULT_PAGE_SIZE;
  const pageRaw = Number.parseInt(pick(raw, 'page') || '1', 10);
  const maxPage = Math.floor(MAX_OFFSET / size);

  let fromDay = isRealDay(from) ? from : '';
  let toDay = isRealDay(to) ? to : '';
  // A range entered backwards still means "between these two days".
  if (fromDay && toDay && fromDay > toDay) [fromDay, toDay] = [toDay, fromDay];

  return {
    q: cleanText(pick(raw, 'q'), 100),
    lab: UUID.test(lab) ? lab : '',
    source: SOURCE_FILTERS.some((f) => f.value === source) ? source : '',
    type: isKnownActionFilter(type) ? type : '',
    entity: ENTITY_TYPES.includes(entity) ? entity : '',
    actor: cleanText(pick(raw, 'actor'), 100),
    from: fromDay,
    to: toDay,
    size,
    page: Number.isFinite(pageRaw) ? Math.max(1, Math.min(maxPage, pageRaw)) : 1,
  };
}

/** What is sent to the database for these filters (without paging). */
export function toSearch(filters: AuditFilters): AuditSearch {
  return {
    ownerId: filters.lab || null,
    sources: sourcesForFilter(filters.source),
    actions: actionsForType(filters.type),
    entityTypes: filters.entity ? [filters.entity] : null,
    actor: filters.actor || null,
    query: filters.q || null,
    from: pktDayStart(filters.from),
    to: pktNextDayStart(filters.to),
  };
}

/** True when anything other than paging is filtered. */
export function isFiltering(filters: AuditFilters): boolean {
  return Boolean(
    filters.q || filters.lab || filters.source || filters.type || filters.entity || filters.actor || filters.from || filters.to,
  );
}

/** The query string for these filters. `page` is added only past page 1; `size` only when it is not the default. */
export function auditQueryString(filters: AuditFilters, overrides: Partial<AuditFilters> = {}): string {
  const f = { ...filters, ...overrides };
  const params = new URLSearchParams();
  if (f.q) params.set('q', f.q);
  if (f.lab) params.set('lab', f.lab);
  if (f.source) params.set('source', f.source);
  if (f.type) params.set('type', f.type);
  if (f.entity) params.set('entity', f.entity);
  if (f.actor) params.set('actor', f.actor);
  if (f.from) params.set('from', f.from);
  if (f.to) params.set('to', f.to);
  if (f.size !== DEFAULT_PAGE_SIZE) params.set('size', String(f.size));
  if (f.page > 1) params.set('page', String(f.page));
  return params.toString();
}

export function auditHref(filters: AuditFilters, overrides: Partial<AuditFilters> = {}): string {
  const query = auditQueryString(filters, overrides);
  return query ? `/audit?${query}` : '/audit';
}

/** Date-range shortcuts ("Today", "Last 7 days"…), in Pakistan time like the rest of the page. */
export function presetRange(days: number, now: Date = new Date()): { from: string; to: string } {
  const to = pktDay(now.toISOString());
  const from = pktDay(new Date(now.getTime() - (days - 1) * 86_400_000).toISOString());
  return { from, to };
}
