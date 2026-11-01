import { groupDigits } from "@/lib/calculators/format";
import { primeFactorList } from "@/lib/calculators/numtheory";

/** A factor tree is drawn as a ladder of at most this many prime factors (counting repeats). */
export const FACTOR_TREE_MAX_PRIMES = 12;

const composite = "rounded-lg border border-(--color-line) bg-white px-2.5 py-1 font-semibold tabular-nums text-(--color-ink)";
const prime = "rounded-full bg-(--color-blue) px-2.5 py-1 font-semibold tabular-nums text-white";

/**
 * Factor tree for a whole number, drawn as a ladder: each step splits off the smallest prime factor.
 * Built as an ordered list so a screen reader hears "360 = 2 × 180", and so it never needs horizontal scrolling.
 * Renders nothing for 1 and for primes, which have no tree.
 */
export default function FactorTree({ n, pf, heading = true }: { n: number; pf: [number, number][]; heading?: boolean }) {
  const primes = primeFactorList(pf);
  if (n < 4 || primes.length < 2) return null;

  const label = groupDigits(String(n));
  if (primes.length > FACTOR_TREE_MAX_PRIMES) {
    return (
      <p className="px-2 py-1 text-[13px] leading-relaxed text-(--color-ink-soft)">
        The factor tree is drawn for numbers with up to {FACTOR_TREE_MAX_PRIMES} prime factors, counting repeats. {label} has {primes.length}, so see the prime factorization above instead.
      </p>
    );
  }

  // remainders[i] = product of primes[i..]; remainders[0] === n.
  const remainders: number[] = new Array(primes.length);
  let r = 1;
  for (let i = primes.length - 1; i >= 0; i--) {
    r *= primes[i];
    remainders[i] = r;
  }

  const steps = primes.length - 1;
  return (
    <figure aria-label={`Factor tree of ${label}`} className="px-1 py-1">
      {heading && <figcaption className="text-[14.5px] font-bold text-(--color-ink)">Factor tree of {label}</figcaption>}
      <ol className={`${heading ? "mt-3" : ""} space-y-2 text-[14px]`}>
        {Array.from({ length: steps }, (_, i) => {
          const last = i === steps - 1;
          return (
            <li
              key={i}
              style={{ marginLeft: `${Math.min(i, 8) * 10}px` }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 border-l-2 border-(--color-line) pl-3"
            >
              <span className={composite}>{groupDigits(String(remainders[i]))}</span>
              <span aria-hidden="true" className="text-(--color-ink-soft)">=</span>
              <span className="sr-only">equals</span>
              <span className={prime}>{primes[i]}</span>
              <span aria-hidden="true" className="text-(--color-ink-soft)">×</span>
              <span className="sr-only">times</span>
              <span className={last ? prime : composite}>{last ? primes[i + 1] : groupDigits(String(remainders[i + 1]))}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] leading-snug text-(--color-ink-soft)">
        Blue circles are prime. Each step splits off the smallest prime until only primes are left.
      </p>
    </figure>
  );
}
