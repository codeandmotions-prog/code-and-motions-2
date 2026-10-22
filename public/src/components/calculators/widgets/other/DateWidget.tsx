"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { parseISODate } from "@/lib/calculators/parse";
import {
  addBusinessDays, addDays, addMonths, businessDaysBetween, cmp, diffDays, elapsed, iso, longDate, weekday, WEEKDAYS, type YMD,
} from "@/lib/calculators/dates";
import { groupDigits } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "segmented",
    label: "What do you want to do?",
    default: "between",
    options: [
      { value: "between", label: "Days between two dates" },
      { value: "add", label: "Add or subtract time" },
    ],
  },
  { id: "start", kind: "date", label: "Start date", default: "2025-01-15" },
  { id: "end", kind: "date", label: "End date", default: "2025-03-01", showIf: (v) => v.mode !== "add" },
  {
    id: "incl",
    kind: "segmented",
    label: "Count the end date too?",
    default: "no",
    options: [
      { value: "no", label: "No (standard)" },
      { value: "yes", label: "Yes (+1 day)" },
    ],
    showIf: (v) => v.mode !== "add",
  },
  {
    id: "op",
    kind: "segmented",
    label: "Operation",
    default: "add",
    options: [
      { value: "add", label: "Add" },
      { value: "sub", label: "Subtract" },
    ],
    showIf: (v) => v.mode === "add",
  },
  { id: "years", kind: "number", label: "Years", default: "0", showIf: (v) => v.mode === "add" },
  { id: "months", kind: "number", label: "Months", default: "0", showIf: (v) => v.mode === "add" },
  { id: "weeks", kind: "number", label: "Weeks", default: "0", showIf: (v) => v.mode === "add" },
  { id: "days", kind: "number", label: "Days", default: "45", showIf: (v) => v.mode === "add" },
  {
    id: "dayType",
    kind: "segmented",
    label: "Count days as",
    default: "calendar",
    options: [
      { value: "calendar", label: "Calendar days" },
      { value: "business", label: "Business days (Mon–Fri)" },
    ],
    showIf: (v) => v.mode === "add",
    hint: "In business-day mode, years and months move by calendar, then each week counts as 5 business days and days are skipped over weekends and listed holidays.",
  },
  {
    id: "holidays",
    kind: "textarea",
    label: "Holidays to skip (optional)",
    default: "",
    placeholder: "2025-12-25, 2025-12-26",
    hint: "Dates as YYYY-MM-DD, separated by commas, spaces or new lines. Used for business-day counts. Weekends are always excluded from business days.",
  },
];

function parseHolidays(raw: string, errors: Record<string, string>): Set<string> {
  const set = new Set<string>();
  for (const t of raw.split(/[\s,;]+/).filter(Boolean)) {
    const d = parseISODate(t);
    if (!d) {
      errors.holidays = `“${t}” is not a valid date. Use YYYY-MM-DD.`;
      continue;
    }
    set.add(iso(d));
  }
  return set;
}

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const start = parseISODate(v.start ?? "");
  if (!start) errors.start = "Choose a valid start date.";
  const holidays = parseHolidays(v.holidays ?? "", errors);

  if (v.mode === "add") {
    const years = readNum(v, "years", { label: "Years", integer: true, min: 0, max: 10000 }, errors) ?? 0;
    const months = readNum(v, "months", { label: "Months", integer: true, min: 0, max: 120000 }, errors) ?? 0;
    const weeks = readNum(v, "weeks", { label: "Weeks", integer: true, min: 0, max: 5_000_000 }, errors) ?? 0;
    const days = readNum(v, "days", { label: "Days", integer: true, min: 0, max: 36_500_000 }, errors) ?? 0;
    if (hasErrors(errors) || !start) return fail(errors);
    const sign = v.op === "sub" ? -1 : 1;
    let out: YMD = addMonths(start, sign * (years * 12 + months));
    if (v.dayType === "business") {
      out = addBusinessDays(out, sign * (weeks * 5 + days), holidays);
    } else {
      out = addDays(out, sign * (weeks * 7 + days));
    }
    if (out.y < 1 || out.y > 9999) return fail({ days: "The result is outside the supported range (years 1 to 9999)." });
    const moved = Math.abs(diffDays(start, out));
    return {
      ok: true,
      headline: { label: `${sign === 1 ? "Date after adding" : "Date after subtracting"}`, value: longDate(out), sub: iso(out) },
      stats: [
        { label: "Starting date", value: longDate(start) },
        { label: "Calendar days between", value: `${groupDigits(String(moved))} days` },
      ],
      notes: [v.dayType === "business" ? "Business days exclude Saturdays, Sundays and any holidays you listed." : "Month arithmetic keeps the day of the month where possible; if it does not exist (such as 31 February) the last day of that month is used."],
    };
  }

  const end = parseISODate(v.end ?? "");
  if (!end) errors.end = "Choose a valid end date.";
  if (hasErrors(errors) || !start || !end) return fail(errors);
  const flip = cmp(start, end) > 0;
  const [a, b] = flip ? [end, start] : [start, end];
  const incl = v.incl === "yes";
  const rawDays = diffDays(a, b);
  const total = rawDays + (incl ? 1 : 0);
  const e = elapsed(a, b);
  const weeks = Math.floor(total / 7);
  const biz = businessDaysBetween(a, b, holidays, incl);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
  return {
    ok: true,
    headline: { label: "Time between the dates", value: plural(total, "day"), sub: flip ? "The end date is before the start date; the span is shown as a positive number." : undefined },
    stats: [
      { label: "In years, months and days", value: `${plural(e.years, "year")}, ${plural(e.months, "month")}, ${plural(e.days + (incl ? 1 : 0), "day")}` },
      { label: "In weeks and days", value: `${plural(weeks, "week")} and ${plural(total - weeks * 7, "day")}` },
      { label: "Business days (Mon–Fri)", value: String(biz), hint: holidays.size ? `Excluding ${plural(holidays.size, "listed holiday")}` : "No holidays excluded" },
      { label: "From", value: `${WEEKDAYS[weekday(a)]}, ${iso(a)}` },
      { label: "To", value: `${WEEKDAYS[weekday(b)]}, ${iso(b)}` },
    ],
    notes: ["Weekends are Saturday and Sunday. Public holidays differ by country and region, so list the ones that apply to you."],
  };
}

export default function DateWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
