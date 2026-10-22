import type { CalcContent } from "../types";
import { financialContent } from "./financial";
import { healthContent } from "./health";
import { otherContent } from "./other";
import { mathGeneralAContent } from "./mathGeneralA";
import { mathGeneralBContent } from "./mathGeneralB";
import { mathStatsContent } from "./mathStats";
import { mathGeometryContent } from "./mathGeometry";

export const calculatorContent: Record<string, CalcContent> = {
  ...financialContent,
  ...healthContent,
  ...otherContent,
  ...mathGeneralAContent,
  ...mathGeneralBContent,
  ...mathStatsContent,
  ...mathGeometryContent,
};

export function getContent(slug: string): CalcContent | undefined {
  return calculatorContent[slug];
}
