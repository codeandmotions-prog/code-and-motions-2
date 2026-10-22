/** Calendar arithmetic on UTC calendar dates (no time zones, no DST). */

export type YMD = { y: number; m: number; d: number };

export const MS_DAY = 86_400_000;

export const toUTC = (v: YMD): number => Date.UTC(v.y, v.m - 1, v.d);

export function fromUTC(ms: number): YMD {
  const dt = new Date(ms);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function cmp(a: YMD, b: YMD): number {
  return toUTC(a) - toUTC(b);
}

export function diffDays(a: YMD, b: YMD): number {
  return Math.round((toUTC(b) - toUTC(a)) / MS_DAY);
}

/** Add whole months, clamping to the last day of a shorter month. */
export function addMonths(v: YMD, months: number): YMD {
  const total = v.y * 12 + (v.m - 1) + months;
  const y = Math.floor(total / 12);
  const m = (total % 12 + 12) % 12 + 1;
  return { y, m, d: Math.min(v.d, daysInMonth(y, m)) };
}

export function addDays(v: YMD, days: number): YMD {
  return fromUTC(toUTC(v) + days * MS_DAY);
}

/**
 * Elapsed years/months/days from `start` to `end` (start <= end).
 * Rule: a month is complete when the same day-of-month is reached; if the
 * start day does not exist in a month, that month's last day counts.
 */
export function elapsed(start: YMD, end: YMD) {
  let totalMonths = (end.y - start.y) * 12 + (end.m - start.m);
  if (cmp(addMonths(start, totalMonths), end) > 0) totalMonths -= 1;
  const anchor = addMonths(start, totalMonths);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: diffDays(anchor, end),
    totalMonths,
  };
}

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function weekday(v: YMD): number {
  return new Date(toUTC(v)).getUTCDay();
}

export function iso(v: YMD): string {
  return `${String(v.y).padStart(4, "0")}-${String(v.m).padStart(2, "0")}-${String(v.d).padStart(2, "0")}`;
}

export function longDate(v: YMD): string {
  return `${WEEKDAYS[weekday(v)]}, ${v.d} ${MONTHS[v.m - 1]} ${v.y}`;
}

/** Next occurrence (on or after `from`) of a birthday month/day. */
export function nextBirthday(birth: YMD, from: YMD): YMD {
  const make = (y: number): YMD => ({ y, m: birth.m, d: Math.min(birth.d, daysInMonth(y, birth.m)) });
  const thisYear = make(from.y);
  return cmp(thisYear, from) >= 0 ? thisYear : make(from.y + 1);
}

export function isBusinessDay(v: YMD, holidays: Set<string>): boolean {
  const wd = weekday(v);
  return wd !== 0 && wd !== 6 && !holidays.has(iso(v));
}

/** Count business days in [start, end) (end excluded), or inclusive when asked. */
export function businessDaysBetween(start: YMD, end: YMD, holidays: Set<string>, includeEnd: boolean): number {
  let count = 0;
  const total = diffDays(start, end);
  const last = includeEnd ? total : total - 1;
  for (let i = 0; i <= last; i++) {
    if (isBusinessDay(addDays(start, i), holidays)) count++;
  }
  return count;
}

/** Move by N business days (N may be negative). */
export function addBusinessDays(start: YMD, n: number, holidays: Set<string>): YMD {
  let cur = start;
  const step = n >= 0 ? 1 : -1;
  let left = Math.abs(n);
  while (left > 0) {
    cur = addDays(cur, step);
    if (isBusinessDay(cur, holidays)) left--;
  }
  return cur;
}
