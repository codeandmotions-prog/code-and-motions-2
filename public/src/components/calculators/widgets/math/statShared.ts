import { fmt } from "@/lib/calculators/format";
import type { Described } from "@/lib/calculators/stats";

export const num = (n: number | null | undefined, sig = 10): string => (n === null || n === undefined ? "n/a" : fmt(n, sig));

export function dataField(id: string, label: string, def: string, hint?: string) {
  return {
    id,
    kind: "textarea" as const,
    rows: 3,
    label,
    default: def,
    wide: true,
    hint: hint ?? "Separate numbers with commas, spaces or new lines.",
  };
}

export function describeStats(d: Described) {
  return [
    { label: "Count (n)", value: String(d.n) },
    { label: "Sum", value: num(d.sum, 12) },
    { label: "Mean", value: num(d.mean, 12) },
    { label: "Median", value: num(d.median, 12) },
    { label: "Mode", value: d.modes.length ? d.modes.map((m) => num(m)).join(", ") : "No repeated value" },
    { label: "Minimum", value: num(d.min) },
    { label: "Maximum", value: num(d.max) },
    { label: "Range", value: num(d.range, 12) },
  ];
}
