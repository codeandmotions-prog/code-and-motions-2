import type { FieldDef } from "../../CalculatorForm";

export const formulaField = (): FieldDef => ({
  id: "formula",
  kind: "select",
  label: "BMR equation",
  default: "mifflin",
  options: [
    { value: "mifflin", label: "Mifflin-St Jeor (commonly recommended)" },
    { value: "harris", label: "Revised Harris-Benedict" },
    { value: "katch", label: "Katch-McArdle (needs body fat %)" },
  ],
});

export const bodyFatField = (): FieldDef => ({
  id: "bf",
  kind: "number",
  label: "Body fat percentage",
  default: "20",
  unit: "%",
  showIf: (v) => v.formula === "katch",
  hint: "Needed for Katch-McArdle, which uses lean body mass.",
});
