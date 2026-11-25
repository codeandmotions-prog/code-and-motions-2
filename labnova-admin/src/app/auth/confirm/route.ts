import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const TOKEN = /^[A-Za-z0-9_.-]{8,512}$/;

/**
 * Where the link in the password-reset e-mail lands. It turns the one-time code in the link into a session, checks that
 * the person really is an administrator (public.admins) and sends them to /reset-password. Anything else — an expired or
 * reused link, a different browser than the one that asked for the e-mail, a lab owner's account — ends at the sign-in
 * page with one generic message.
 *
 * Supported links: ?code=... (the default Supabase "PKCE" link; must be opened in the browser that requested the reset)
 * and ?token_hash=...&type=recovery (works on any device, if the Supabase recovery e-mail template is changed to use it).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = params.get('code') ?? '';
  const tokenHash = params.get('token_hash') ?? '';

  if (!isSupabaseConfigured() || (!TOKEN.test(code) && !(TOKEN.test(tokenHash) && params.get('type') === 'recovery'))) {
    redirect('/login?error=reset-link');
  }

  const supabase = await createClient();
  const { error } = TOKEN.test(code)
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash });
  if (error) redirect('/login?error=reset-link');

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
  if (adminError || isAdmin !== true) {
    // Local scope: a lab owner's other sessions stay as they are.
    await supabase.auth.signOut({ scope: 'local' });
    redirect('/login?error=reset-link');
  }

  redirect('/reset-password');
}
