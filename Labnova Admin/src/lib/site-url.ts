import 'server-only';
import { headers } from 'next/headers';

/**
 * The address this admin panel is reached at (for example https://admin.codeandmotions.com), used for the link inside
 * the password-reset e-mail.
 *
 * Set SITE_URL on the server (Railway: Variables) so the link never depends on request headers. Without it the address
 * is taken from the request, which is fine for local use. Either way Supabase only follows the link if it is listed
 * under Authentication -> URL Configuration -> Redirect URLs.
 */
export async function siteUrl(): Promise<string> {
  const configured = process.env.SITE_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(url.hostname)) return url.origin;
    } catch {
      /* fall through to the request's own address */
    }
  }
  const h = await headers();
  const host = (h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000').split(',')[0].trim();
  const local = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const proto = (h.get('x-forwarded-proto') ?? (local ? 'http' : 'https')).split(',')[0].trim();
  return `${proto}://${host}`;
}
