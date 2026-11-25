'use client';

import { useActionState } from 'react';
import { FormMessage } from '@/components/auth-shell';
import { updatePasswordAction, type ResetState } from './actions';

export function ResetForm() {
  const [state, formAction, pending] = useActionState<ResetState, FormData>(updatePasswordAction, {});

  return (
    <form action={formAction} className="space-y-5">
      {state.error && <FormMessage tone="error">{state.error}</FormMessage>}
      <div>
        <label htmlFor="password" className="label">New password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={10} maxLength={72} className="input" />
        <p className="hint">At least 10 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="label">Repeat the new password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={10} maxLength={72} className="input" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? 'Saving…' : 'Change password'}
      </button>
    </form>
  );
}
