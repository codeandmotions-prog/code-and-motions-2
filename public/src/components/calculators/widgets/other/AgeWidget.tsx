"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { hasErrors, type Values } from "@/lib/calculators/validate";
import { parseISODate } from "@/lib/calculators/parse";
import { cmp, diffDays, elapsed, longDate, nextBirthday, weekday, WEEKDAYS, type YMD } from "@/lib/calculators/dates";
import { groupDigits } from "@/lib/calculators/format";

const fields: FieldDef[] = [
  { id: "dob", kind: "date", label: "Date of birth", default: "", hint: "Choose the day, month and year." },
  { id: "asof", kind: "date", label: "Age at this date", default: "", hint: "Leave blank to use today's date, or pick another date to find age then." },
];

function todayLocal(): YMD {
  const d = new Date();
  return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
}

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const dob = parseISODate(v.dob ?? "");
  if (!dob) errors.dob = "Enter a valid date of birth.";
  let asof: YMD | null = null;
  if ((v.asof ?? "").trim() === "") asof = todayLocal();
  else {
    asof = parseISODate(v.asof);
    if (!asof) errors.asof = "Enter a valid date.";
  }
  if (dob && asof && cmp(dob, asof) > 0) errors.dob = "The date of birth must be on or before the other date.";
  if (hasErrors(errors) || !dob || !asof) return fail(errors);

  const e = elapsed(dob, asof);
  const days = diffDays(dob, asof);
  const next = nextBirthday(dob, asof);
  const untilNext = diffDays(asof, next);
  const turning = next.y - dob.y;
  const weeks = Math.floor(days / 7);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
  return {
    ok: true,
    headline: { label: "Age", value: `${plural(e.years, "year")}, ${plural(e.months, "month")}, ${plural(e.days, "day")}`, sub: `Born ${longDate(dob)}` },
    stats: [
      { label: "In months", value: `${groupDigits(String(e.totalMonths))} months and ${plural(e.days, "day")}` },
      { label: "In weeks", value: `${groupDigits(String(weeks))} weeks and ${plural(days - weeks * 7, "day")}` },
      { label: "In days", value: `${groupDigits(String(days))} days` },
      { label: "In hours (days × 24)", value: groupDigits(String(days * 24)) },
      { label: "Next birthday", value: untilNext === 0 ? "Today. Happy birthday!" : `${longDate(next)}`, hint: untilNext === 0 ? `Turning ${turning}` : `In ${plural(untilNext, "day")}, turning ${turning}` },
      { label: "Born on a", value: WEEKDAYS[weekday(dob)] },
    ],
    notes: [
      "Months are counted from the same day of the month; if that day does not exist (for example 31 in a 30-day month), the last day of that month is used. Someone born on 29 February is treated as having their birthday on 28 February in non-leap years.",
    ],
  };
}

export default function AgeWidget() {
  return <CalculatorForm fields={fields} compute={compute} initialRun={false} />;
}
