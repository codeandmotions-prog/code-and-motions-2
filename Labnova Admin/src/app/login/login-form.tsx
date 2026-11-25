'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { FormMessage } from '@/components/auth-shell';
import { signInAction, type LoginState } from './actions';

export function LoginForm({ notice }: { notice?: { tone: 'error' | 'success'; text: string } }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(signInAction, {});
  const message = state.error ? { tone: 'error' as const, text: state.error } : notice;

  return (
    <form action={formAction} className="space-y-5">
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="input" placeholder="you@codeandmotions.com" />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label htmlFor="password" className="text-sm font-medium text-ink">Password</label>
          <Link href="/forgot-password" className="text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink">
            Forgot password?
          </Link>
        </div>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
