import Link from 'next/link';
import { AuthShell } from '@/components/auth-shell';
import { ForgotForm } from './forgot-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Forgot password' };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your administrator email and we will send you a link to choose a new one."
      footer={<Link href="/login" className="link">Back to sign in</Link>}
    >
      <ForgotForm />
    </AuthShell>
  );
}
