import type { FieldDef } from "../CalculatorForm";
import type { CurrencyCode } from "@/lib/calculators/format";

export const currencyField = (): FieldDef => ({
  id: "cur",
  kind: "segmented",
  label: "Currency symbol (display only)",
  default: "USD",
  options: [
    { value: "USD", label: "$ US dollar" },
    { value: "GBP", label: "£ Pound" },
    { value: "EUR", label: "€ Euro" },
  ],
});

export const asCurrency = (v: string | undefined): CurrencyCode => (v === "GBP" || v === "EUR" ? v : "USD");

export const yearsMonths = (months: number): string => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} year${y === 1 ? "" : "s"}`);
  if (m > 0 || y === 0) parts.push(`${m} month${m === 1 ? "" : "s"}`);
  return parts.join(" ");
};

export const unitSystemField = (): FieldDef => ({
  id: "units",
  kind: "segmented",
  label: "Units",
  default: "metric",
  options: [
    { value: "metric", label: "Metric (cm, kg)" },
    { value: "us", label: "US (ft, in, lb)" },
    { value: "uk", label: "UK (ft, in, st, lb)" },
  ],
});
