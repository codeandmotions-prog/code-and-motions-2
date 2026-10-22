import { createElement } from "react";
import { Calculator } from "lucide-react";
import { ICONS } from "@/data/calculators/icons";

/** Renders the Lucide icon registered under `name` (falls back to a calculator glyph). */
export default function CalcIcon({ name, size = 20, strokeWidth }: { name: string; size?: number; strokeWidth?: number }) {
  return createElement(ICONS[name] ?? Calculator, { size, strokeWidth, "aria-hidden": true });
}
