import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconAlert, IconCheckCircle, IconFlaskLogo, IconSparkle } from '@/components/icons';
import { TitlePill } from '@/components/ui';

/** A page that is not part of the admin shell (sign-in, password reset, error pages): the sage background and one rounded panel. */
export function PublicFrame({ children, width = 'max-w-[1080px]' }: { children: ReactNode; width?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sage p-3 sm:p-6">
      <div className={`w-full ${width} rounded-shell bg-panel`}>{children}</div>
    </div>
  );
}

/** The decorative capsule bars on the dark side of the sign-in page (pure CSS, hidden from screen readers). */
function HeroCapsules() {
  const bars = [
    { h: 'h-28', lime: 'h-14' },
    { h: 'h-20', lime: 'h-9' },
    { h: 'h-36', lime: 'h-20' },
    { h: 'h-16', lime: null },
    { h: 'h-32', lime: 'h-16' },
    { h: 'h-24', lime: 'h-10' },
  ];
  return (
    <div className="flex items-end gap-3" aria-hidden="true">
      {bars.map((bar, i) =>
        bar.lime ? (
          <span key={i} className={`relative w-9 overflow-hidden rounded-full bg-white/10 ${bar.h}`}>
            <span className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
            <span className={`absolute inset-x-0 bottom-0 rounded-full bg-lime ${bar.lime}`}>
              <span className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-ink" />
            </span>
          </span>
        ) : (
          <span key={i} className={`w-9 rounded-full border border-dashed border-white/35 ${bar.h}`} />
        ),
      )}
    </div>
  );
}

/**
 * Sign-in, forgot-password and reset-password all share this layout: a dark panel with the product message on the
 * left (desktop only) and the form on the right.
 */
export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <PublicFrame>
      <main id="main" className="grid lg:grid-cols-[1.05fr_1fr]">
        <section className="relative m-3 hidden flex-col justify-between overflow-hidden rounded-[26px] bg-ink p-10 lg:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25">
              <IconFlaskLogo size={22} />
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">LabNova</span>
          </div>
          <div className="my-10">
            <h2 className="max-w-md text-[2.5rem] font-normal leading-[1.08] tracking-[-0.035em] text-white">
              Every lab, plan <TitlePill icon={<IconFlaskLogo size={18} />} />
              and key <TitlePill tone="lime" icon={<IconSparkle size={18} />} /> in one place.
            </h2>
            <p className="mt-5 max-w-sm text-base font-normal text-ink-300">
              Change plans, suspend or restore accounts and manage activation keys. Every change is confirmed and logged.
            </p>
            <div className="mt-10"><HeroCapsules /></div>
          </div>
          <p className="text-sm font-normal text-ink-400">Code &amp; Motions · Admin access only</p>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/15 blur-3xl" aria-hidden="true" />
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-12 sm:py-14">
          <div className="w-full max-w-sm animate-pop-in">
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white lg:hidden">
              <IconFlaskLogo size={22} />
            </span>
            <h1 className="text-[2rem] font-normal leading-tight tracking-[-0.035em] text-ink">{title}</h1>
            {subtitle && <p className="mt-2 text-base font-normal text-muted">{subtitle}</p>}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-sm font-normal text-muted">{footer}</div>}
          </div>
        </section>
      </main>
    </PublicFrame>
  );
}

/** A message at the top of an auth form. */
export function FormMessage({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex gap-2.5 rounded-ctl border px-3.5 py-3 text-sm font-medium ${
        tone === 'error' ? 'border-bad-line bg-bad-soft text-bad' : 'border-ok-line bg-ok-soft text-ok'
      }`}
    >
      {tone === 'error' ? <IconAlert size={17} className="mt-0.5 shrink-0" /> : <IconCheckCircle size={17} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

export function BackToSignIn() {
  return (
    <Link href="/login" className="link">
      Back to sign in
    </Link>
  );
}
