'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export type ResetState = { error?: string };

export async function updatePasswordAction(_previous: ResetState, formData: FormData): Promise<ResetState> {
  // Only a signed-in administrator (the session the reset link created) may set a password here.
  await requireAdmin();

  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (password.length < 10) return { error: 'Use at least 10 characters.' };
  if (Buffer.byteLength(password, 'utf8') > 72) return { error: 'That password is too long (72 characters at most).' };
  if (password !== confirm) return { error: 'The two passwords do not match.' };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    const code = (error as { code?: string }).code ?? '';
    if (code === 'same_password') return { error: 'Choose a password you have not used before.' };
    if (code === 'weak_password') return { error: 'That password is too easy to guess. Use a longer one that mixes letters, numbers and symbols.' };
    return { error: 'The password could not be changed right now. Please request a new reset link and try again.' };
  }

  // End every session of this account (including the one the reset link created); sign in again with the new password.
  await supabase.auth.signOut({ scope: 'global' });
  redirect('/login?reset=done');
}
