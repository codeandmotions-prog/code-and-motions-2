import 'server-only';

/**
 * A small in-memory limiter ("at most N hits per window for this key"). It protects the e-mail sending of the
 * password-reset form from being used to flood Supabase's e-mail quota. It lives in this server process only
 * (a restart or a second instance starts counting again); Supabase applies its own limits on top.
 */
const hits = new Map<string, number[]>();

export function tooMany(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return false;
}
