import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Runs on every request:
 *  1. Sets a strict Content-Security-Policy with a fresh nonce.
 *  2. Refreshes the Supabase session cookie.
 *  3. Sends anyone who is not signed in to /login (the real admin check
 *     happens in requireAdmin(), on the server, for every page/action) —
 *     except /api/health, the public /verify/<token> report-verification page and the three
 *     pages of the password-reset flow that must work without a session (/login,
 *     /forgot-password and /auth/confirm; /reset-password itself needs the session the reset link creates).
 */

/** Pages that may be opened without a session. Everything else sends a visitor to /login. */
const SIGNED_OUT_PATHS = new Set(['/login', '/forgot-password', '/auth/confirm']);
export async function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV !== 'production';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  const path = request.nextUrl.pathname;

  // Health check for the hosting platform: no auth, no data, no Supabase.
  if (path === '/api/health') {
    return NextResponse.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store', 'Content-Security-Policy': csp } });
  }

  // The public report-verification page (the QR code on a printed report opens it on a patient's phone). It is the
  // one page that needs no login: it has no admin session, no admin data, and calls only the public
  // get_offline_report_verification function. Same strict CSP as everywhere else.
  if (path === '/verify' || path.startsWith('/verify/')) {
    response.headers.set('Content-Security-Policy', csp);
    return response;
  }

  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // Let this request's page render see the refreshed session too.
          requestHeaders.set('cookie', request.cookies.toString());
          response = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });

    const { data } = await supabase.auth.getUser();
    if (!data.user && !SIGNED_OUT_PATHS.has(path)) {
      const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
      // Keep any cookie changes (e.g. cleared/refreshed session) on the redirect.
      response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
      redirectResponse.headers.set('Content-Security-Policy', csp);
      return redirectResponse;
    }
  } else if (!SIGNED_OUT_PATHS.has(path)) {
    // Misconfigured server: fail closed.
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
    redirectResponse.headers.set('Content-Security-Policy', csp);
    return redirectResponse;
  }

  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
