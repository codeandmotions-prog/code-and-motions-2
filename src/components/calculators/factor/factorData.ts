import { factorize, factorsFromPrimes, primeFactorSuperscript } from "@/lib/calculators/numtheory";
import { groupDigits } from "@/lib/calculators/format";

/** Numbers shown in the quick-reference table on the factor calculator page. */
export const COMMON_NUMBERS = [21, 27, 32, 33, 36, 40, 45, 72, 78, 80, 110, 216] as const;

export type CommonRow = { n: number; primeForm: string; count: number; factors: string };

/**
 * Every value is computed with the same functions the calculator uses, so nothing in the table is typed by hand
 * and it cannot disagree with the tool.
 */
export function buildCommonRows(): CommonRow[] {
  return COMMON_NUMBERS.map((n) => {
    const pf = factorize(n);
    const factors = factorsFromPrimes(pf);
    return {
      n,
      primeForm: primeFactorSuperscript(pf),
      count: factors.length,
      factors: factors.map((f) => groupDigits(String(f))).join(", "),
    };
  });
}
