'use client';

import { useActionState, useState } from 'react';
import { FormMessage } from '@/components/auth-shell';
import { IconMail } from '@/components/icons';
import { requestPasswordResetAction, type ForgotState } from './actions';

export function ForgotForm() {
  // "try again" remounts the form so it starts from an empty state.
  const [attempt, setAttempt] = useState(0);
  return <ForgotInner key={attempt} onRetry={() => setAttempt((n) => n + 1)} />;
}

function ForgotInner({ onRetry }: { onRetry: () => void }) {
  const [state, formAction, pending] = useActionState<ForgotState, FormData>(requestPasswordResetAction, { status: 'idle' });

  if (state.status === 'sent') {
    return (
      <div className="space-y-5">
        <FormMessage tone="success">
          If an administrator account exists for that email, a reset link is on its way. It can take a minute to arrive.
        </FormMessage>
        <p className="text-sm font-normal text-muted">
          Open the link in <span className="font-semibold text-ink">this same browser</span>. If you do not see the email, check your spam folder or{' '}
          <button type="button" onClick={onRetry} className="link">try again</button>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === 'error' && state.message && <FormMessage tone="error">{state.message}</FormMessage>}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <div className="relative">
          <IconMail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input id="email" name="email" type="email" autoComplete="username" required maxLength={254} className="input pl-10" placeholder="you@codeandmotions.com" />
        </div>
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? 'Sending…' : 'Send reset link'}
      </button>
    </form>
  );
}
