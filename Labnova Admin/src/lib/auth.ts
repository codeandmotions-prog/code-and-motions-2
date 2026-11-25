import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AdminSession = {
  email: string;
  userId: string;
};

/**
 * The one gate every admin page and every server action goes through.
 * Signed in AND listed in `public.admins` (checked by the database's own
 * is_admin() function) — otherwise the person is sent to /login.
 * Memoised per request, so calling it from layout, page and data code is cheap.
 * The database re-checks is_admin() inside every admin function too, so
 * this is a second lock, not the only one.
 */
export const requireAdmin = cache(async (): Promise<AdminSession> => {
  const supabase = await createClient();
  // getUser() asks Supabase to validate the token (getSession() would not).
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
  if (adminError) {
    // A temporary problem checking access is NOT the same as "not an admin":
    // do not sign anyone out for it, just stop and say so.
    redirect('/login?error=unavailable');
  }
  if (isAdmin !== true) {
    // Local sign-out only: never end a lab owner's sessions on their other devices.
    await supabase.auth.signOut({ scope: 'local' });
    redirect('/login?error=noaccess');
  }

  return { email: data.user.email ?? '', userId: data.user.id };
});
