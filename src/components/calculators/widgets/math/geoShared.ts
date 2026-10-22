import { fmt } from "@/lib/calculators/format";
import { LENGTH_UNITS } from "@/lib/calculators/solids";

export const lengthUnitField = (id = "unit", def = "cm") => ({
  id,
  kind: "select" as const,
  label: "Length unit",
  default: def,
  options: LENGTH_UNITS.map((u) => ({ value: u.id, label: `${u.label} (${u.abbr})` })),
});

export const unitOf = (id: string) => LENGTH_UNITS.find((u) => u.id === id) ?? LENGTH_UNITS[1];

export const g = (n: number, sig = 10) => fmt(n, sig);

export const sup2 = (abbr: string) => `${abbr}²`;
export const sup3 = (abbr: string) => `${abbr}³`;
