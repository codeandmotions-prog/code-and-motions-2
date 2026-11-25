import { redirect } from 'next/navigation';
import { ENV_HELP, isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { AuthShell } from '@/components/auth-shell';
import { LoginForm } from './login-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; reset?: string }> }) {
  const { error, reset } = await searchParams;
  const configured = isSupabaseConfigured();

  // Already signed in as an admin? Go straight to the dashboard.
  try {
    if (!configured) throw new Error('not configured');
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user && !error && !reset) {
      const { data: isAdmin } = await supabase.rpc('is_admin');
      if (isAdmin === true) redirect('/');
    }
  } catch (e) {
    // redirect() throws a control-flow error that must pass through.
    if (e instanceof Error && 'digest' in e) throw e;
  }

  const notice: { tone: 'error' | 'success'; text: string } | undefined =
    reset === 'done'
      ? { tone: 'success', text: 'Your password was changed. Sign in with the new password.' }
      : error === 'noaccess'
        ? { tone: 'error', text: 'This account does not have admin access.' }
        : !configured
          ? { tone: 'error', text: `This server is not configured yet (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY missing). ${ENV_HELP}` }
          : error === 'unavailable'
            ? { tone: 'error', text: 'Could not verify admin access right now. Please try again.' }
            : error === 'reset-link'
              ? { tone: 'error', text: 'That reset link is invalid or has expired. Request a new one.' }
              : undefined;

  return (
    <AuthShell title="Sign in" subtitle="Use your administrator account.">
      <LoginForm notice={notice} />
    </AuthShell>
  );
}
