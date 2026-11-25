'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IconDashboard, IconFlask, IconFlaskLogo, IconLogout, IconMenu, IconShield, IconClose } from '@/components/icons';
import { usePendingPath } from '@/components/navigation';
import { initials } from '@/lib/format';

const NAV = [
  { href: '/', label: 'Dashboard', exact: true, Icon: IconDashboard },
  { href: '/labs', label: 'Labs', exact: false, Icon: IconFlask },
  { href: '/audit', label: 'Audit logs', exact: false, Icon: IconShield },
];

function useCurrentPath(): string {
  const pathname = usePathname();
  // Highlight the section being opened straight away, not only once its data has arrived.
  return usePendingPath() ?? pathname;
}

function isActive(current: string, href: string, exact: boolean): boolean {
  return exact ? current === href : current === href || current.startsWith(`${href}/`);
}

/** A dark pill that appears beside a rail icon on hover or keyboard focus. */
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-pop ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="LabNova Admin — Dashboard">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${onDark ? 'bg-white/10 text-white ring-1 ring-white/25' : 'bg-ink text-white'}`}>
        <IconFlaskLogo size={20} />
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-semibold tracking-tight ${onDark ? 'text-white' : 'text-ink'}`}>LabNova</span>
        <span className={`block text-xs font-medium ${onDark ? 'text-ink-400' : 'text-muted'}`}>Admin panel</span>
      </span>
    </Link>
  );
}

/** Icon-only navigation of the desktop rail. */
function RailNav() {
  const current = useCurrentPath();
  return (
    <nav aria-label="Main" className="mt-8 flex flex-col items-center gap-2">
      {NAV.map(({ href, label, exact, Icon }) => {
        const active = isActive(current, href, exact);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-150 ${
              active ? 'bg-white/15 text-white' : 'text-ink-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <Tip>{label}</Tip>
          </Link>
        );
      })}
    </nav>
  );
}

/** Labelled navigation of the phone/tablet menu. */
function DrawerNav({ onNavigate }: { onNavigate?: () => void }) {
  const current = useCurrentPath();
  return (
    <nav aria-label="Main" className="mt-8 space-y-1">
      {NAV.map(({ href, label, exact, Icon }) => {
        const active = isActive(current, href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-base font-semibold transition-colors duration-150 ${
              active ? 'bg-white/15 text-white' : 'text-ink-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function emailInitials(email: string): string {
  return initials(email.split('@')[0].replace(/[._-]+/g, ' '));
}

function RailAccount({ email, signOut }: { email: string; signOut: () => void | Promise<void> }) {
  return (
    <div className="mt-auto flex flex-col items-center gap-2">
      <form action={signOut}>
        <button type="submit" aria-label="Sign out" className="group relative flex h-11 w-11 items-center justify-center rounded-2xl text-ink-300 transition-colors hover:bg-white/10 hover:text-white">
          <IconLogout size={20} />
          <Tip>Sign out</Tip>
        </button>
      </form>
      <span
        title={email}
        className="group relative mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink"
        role="img"
        aria-label={`Signed in as ${email}`}
      >
        {emailInitials(email)}
        <Tip>{email}</Tip>
      </span>
    </div>
  );
}

function DrawerAccount({ email, signOut }: { email: string; signOut: () => void | Promise<void> }) {
  return (
    <div className="mt-auto border-t border-white/10 pt-4">
      <div className="flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink" aria-hidden="true">
          {emailInitials(email)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white" title={email}>{email}</p>
          <p className="text-xs font-normal text-ink-400">Administrator</p>
        </div>
      </div>
      <form action={signOut} className="mt-3">
        <button type="submit" className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/10 hover:text-white">
          <IconLogout size={18} />
          Sign out
        </button>
      </form>
    </div>
  );
}

export function Sidebar({ email, signOut }: { email: string; signOut: () => void | Promise<void> }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the drawer after any navigation, and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const button = menuButtonRef.current;
    drawerRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const items = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
      if (items.length === 0) return;
      const active = document.activeElement;
      if (!active || !drawerRef.current.contains(active) || active === drawerRef.current) {
        event.preventDefault();
        (event.shiftKey ? items[items.length - 1] : items[0]).focus();
      } else if (event.shiftKey && active === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && active === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Desktop: slim black rail, icons only (names appear on hover / focus) */}
      <aside className="hidden shrink-0 p-3 lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-4rem)] min-h-[26rem] w-[4.5rem] flex-col items-center rounded-[28px] bg-ink px-2 py-5">
          <Link href="/" aria-label="LabNova Admin — Dashboard" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/15">
            <IconFlaskLogo size={21} />
            <Tip>LabNova Admin</Tip>
          </Link>
          <RailNav />
          <RailAccount email={email} signOut={signOut} />
        </div>
      </aside>

      {/* Phone / tablet: top bar + labelled menu */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-panel/95 px-4 py-3 backdrop-blur-sm sm:rounded-t-shell sm:px-7 lg:hidden">
        <Brand />
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line transition-colors hover:ring-line-strong"
        >
          <IconMenu size={20} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/60" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] animate-drawer-in flex-col rounded-r-[28px] bg-ink px-4 py-6 outline-none"
          >
            <div className="flex items-center justify-between px-1">
              <Brand onDark />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2.5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white">
                <IconClose size={20} />
              </button>
            </div>
            <DrawerNav onNavigate={() => setOpen(false)} />
            <DrawerAccount email={email} signOut={signOut} />
          </aside>
        </div>
      )}
    </>
  );
}
