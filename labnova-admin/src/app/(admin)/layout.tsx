import { requireAdmin } from '@/lib/auth';
import { signOutAction } from '@/app/login/actions';
import { NavigationProvider } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';
import { ToastProvider } from '@/components/toast';

export const dynamic = 'force-dynamic';

/**
 * The admin shell: a big rounded panel on a sage background, a slim black icon rail on the left (a top bar and menu on
 * phones and tablets) and the section's content on the right. Every section — Dashboard, Labs, Lab details (with its
 * keys and devices), Audit logs — renders inside <main> below. This layout is not re-rendered when you move between
 * sections, so the rail, branding and session stay put and only the content area changes.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <NavigationProvider>
      <ToastProvider>
        <div className="min-h-screen bg-sage sm:p-3 lg:p-5">
          <div className="mx-auto flex min-h-screen max-w-[1720px] flex-col bg-panel sm:min-h-[calc(100vh-1.5rem)] sm:rounded-shell lg:min-h-[calc(100vh-2.5rem)] lg:flex-row">
            <Sidebar email={admin.email} signOut={signOutAction} />
            <main id="main" className="min-w-0 flex-1 px-4 pb-12 pt-4 sm:px-7 sm:pt-6 lg:px-9 lg:pb-14 lg:pt-10 xl:px-12">
              <div className="mx-auto max-w-[1320px]">{children}</div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </NavigationProvider>
  );
}
