'use server';

import { redirect } from 'next/navigation';
import { ENV_HELP, isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';

export type LoginState = { error?: string };

/**
 * Email + password sign-in. A person who signs in successfully but is NOT
 * listed in public.admins is signed straight back out and told they have
 * no access. There is no sign-up anywhere in this app.
 */
export async function signInAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password || email.length > 254 || password.length > 256) {
    return { error: 'Enter your email and password.' };
  }

  if (!isSupabaseConfigured()) {
    return { error: `This server is not configured yet (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY missing). ${ENV_HELP}` };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // One generic message — never reveal whether the email exists.
    return { error: 'Incorrect email or password.' };
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
  if (adminError) {
    await supabase.auth.signOut({ scope: 'local' });
    return { error: 'Could not verify admin access right now. Please try again.' };
  }
  if (isAdmin !== true) {
    // Local scope: a lab owner's sessions on other devices must stay signed in.
    await supabase.auth.signOut({ scope: 'local' });
    return { error: 'This account does not have admin access.' };
  }

  redirect('/');
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: 'local' });
  redirect('/login');
}
