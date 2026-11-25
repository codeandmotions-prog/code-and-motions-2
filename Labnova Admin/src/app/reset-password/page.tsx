import { AuthShell } from '@/components/auth-shell';
import { requireAdmin } from '@/lib/auth';
import { ResetForm } from './reset-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Set a new password' };

export default async function ResetPasswordPage() {
  // No session (or not an administrator) -> back to the sign-in page. The reset link creates the session.
  const admin = await requireAdmin();
  return (
    <AuthShell title="Choose a new password" subtitle={<>For <span className="font-semibold text-ink">{admin.email}</span>. You will be signed out everywhere and asked to sign in again.</>}>
      <ResetForm />
    </AuthShell>
  );
}
