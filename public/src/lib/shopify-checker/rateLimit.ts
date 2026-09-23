/**
 * Very small in-memory rate limit for the public checker API.
 *
 * This is intentionally simple (no Redis/DB): it resets whenever the
 * server process restarts and is per-instance, which is fine for a
 * single-container deployment and just exists to stop obvious abuse of
 * this route as an open URL-fetching proxy — not to be a hardened,
 * distributed rate limiter.
 */
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}
