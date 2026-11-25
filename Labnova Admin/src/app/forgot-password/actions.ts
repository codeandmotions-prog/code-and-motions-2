'use server';

import { headers } from 'next/headers';
import { ENV_HELP, isSupabaseConfigured } from '@/lib/env';
import { tooMany } from '@/lib/rate-limit';
import { siteUrl } from '@/lib/site-url';
import { createClient } from '@/lib/supabase/server';

export type ForgotState = { status: 'idle' | 'sent' | 'error'; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW = 15 * 60_000;

/**
 * Sends a password-reset e-mail. The answer is the same whether or not the address belongs to an account (and to an
 * admin), so this form cannot be used to find out who has an account. The reset page itself only lets a person who is in
 * public.admins set a new password.
 */
export async function requestPasswordResetAction(_previous: ForgotState, formData: FormData): Promise<ForgotState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return { status: 'error', message: 'Enter a valid email address.' };
  }
  if (!isSupabaseConfigured()) {
    return { status: 'error', message: `This server is not configured yet (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY missing). ${ENV_HELP}` };
  }

  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (tooMany(`ip:${ip}`, 8, WINDOW) || tooMany(`email:${email}`, 3, WINDOW)) {
    return { status: 'error', message: 'Too many requests. Please wait a few minutes and try again.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${await siteUrl()}/auth/confirm` });

  if (error) {
    const status = (error as { status?: number }).status ?? 0;
    const code = (error as { code?: string }).code ?? '';
    if (status === 429 || code === 'over_email_send_rate_limit') {
      return { status: 'error', message: 'Too many reset emails were requested. Please wait a few minutes and try again.' };
    }
    if (status >= 500) {
      return { status: 'error', message: 'The email could not be sent right now. Please try again in a few minutes.' };
    }
  }
  return { status: 'sent' };
}
