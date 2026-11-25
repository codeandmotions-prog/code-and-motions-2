import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconAlert, IconArrowUpRight, IconInfo } from '@/components/icons';
import { initials } from '@/lib/format';
import { labMode, SUBSCRIPTION_LABELS, ACCOUNT_LABELS, type EffectiveKeyStatus, type Lab } from '@/lib/types';

/* ---------- Page structure ---------- */

/** Wraps a section's content so it eases in when it replaces the previous section or its loading placeholder. */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}

/** A small rounded chip with an icon that sits inside a headline ("Managing [icon] your labs"). */
export function TitlePill({ icon, tone = 'white' }: { icon: ReactNode; tone?: 'white' | 'lime' }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-1 inline-flex h-8 w-12 items-center justify-center rounded-full align-[-0.1em] sm:h-10 sm:w-14 ${
        tone === 'lime' ? 'bg-lime text-ink' : 'bg-white text-ink'
      }`}
    >
      {icon}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  back,
  crumb,
}: {
  /** Plain text, or text with <TitlePill/> chips in it. */
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
  /** Breadcrumb text when `title` is not plain text. */
  crumb?: string;
}) {
  return (
    <header className="mb-7 sm:mb-9">
      {back && (
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted">
          <Link href={back.href} className="font-medium transition-colors hover:text-ink">
            {back.label}
          </Link>
          <span className="mx-2 text-faint" aria-hidden="true">/</span>
          <span className="font-medium text-ink">{crumb ?? (typeof title === 'string' ? title : '')}</span>
        </nav>
      )}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <h1 className="text-balance text-[2rem] font-normal leading-[1.08] tracking-[-0.035em] text-ink sm:text-display">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-base font-normal text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function Card({ title, description, action, children, className = '', flush = false }: {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3 px-5 pb-1 pt-5 sm:px-6 sm:pt-6">
          <div className="min-w-0">
            {title && <h2 className="text-xl font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-0.5 text-sm font-normal text-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={flush ? (title || action ? 'mt-3' : '') : 'p-5 sm:p-6'}>{children}</div>
    </section>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-muted">
        <IconInfo size={20} />
      </div>
      <p className="text-base font-semibold text-ink">{title}</p>
      {children && <p className="mt-1 max-w-sm text-sm font-normal text-muted">{children}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** Shown in place of a section whose data could not be loaded (never a blank screen). */
export function LoadProblem({
  kind,
  what,
  updateFile = 'supabase/web_admin_phase1.sql',
}: {
  kind: 'schema' | 'failed';
  what: string;
  /** The SQL file that has to be run once for this section (relative to the admin project). */
  updateFile?: string;
}) {
  return (
    <div role="alert" className="flex gap-3 rounded-ctl border border-warn-line bg-warn-soft px-4 py-3 text-sm text-warn">
      <IconAlert size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold">{kind === 'schema' ? `${what} needs a database update` : `${what} could not be loaded`}</p>
        <p className="mt-0.5 font-normal">
          {kind === 'schema'
            ? `Run ${updateFile} once in the Supabase SQL editor (it is included in this project), then refresh.`
            : 'Please refresh the page. If this keeps happening, check the Supabase project is reachable.'}
        </p>
      </div>
    </div>
  );
}

export function Notice({ tone = 'info', title, children }: { tone?: 'info' | 'warn' | 'bad'; title?: string; children: ReactNode }) {
  const styles = {
    info: 'border-lime-dark/40 bg-lime-soft text-ink',
    warn: 'border-warn-line bg-warn-soft text-warn',
    bad: 'border-bad-line bg-bad-soft text-bad',
  } as const;
  return (
    <div role={tone === 'bad' ? 'alert' : 'note'} className={`flex gap-3 rounded-ctl border px-4 py-3 text-sm ${styles[tone]}`}>
      {tone === 'info' ? <IconInfo size={18} className="mt-0.5 shrink-0" /> : <IconAlert size={18} className="mt-0.5 shrink-0" />}
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className={`font-normal ${title ? 'mt-0.5' : ''}`}>{children}</div>
      </div>
    </div>
  );
}

/* ---------- Pill tabs ---------- */

export type PillTab = { label: string; href: string; active: boolean; count?: number };

/** A row of pill links (a filter that keeps every other filter in the address). Scrolls sideways on a phone. */
export function PillTabs({ items, label }: { items: PillTab[]; label: string }) {
  return (
    <nav
      aria-label={label}
      className="-mx-4 mb-5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              prefetch={false}
              aria-current={item.active ? 'true' : undefined}
              className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-150 ${
                item.active ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-line-strong'
              }`}
            >
              {item.label}
              {item.count !== undefined && (
                <span className={`text-xs font-semibold tabular-nums ${item.active ? 'text-ink-300' : 'text-muted'}`}>{item.count.toLocaleString('en-GB')}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Badges ---------- */

type Tone = 'green' | 'amber' | 'red' | 'blue' | 'slate' | 'teal';

const BADGE: Record<Tone, { box: string; dot: string }> = {
  green: { box: 'bg-ok-soft text-ok', dot: 'bg-ok' },
  amber: { box: 'bg-warn-soft text-warn', dot: 'bg-[#D9941A]' },
  red: { box: 'bg-bad-soft text-bad', dot: 'bg-bad' },
  blue: { box: 'bg-lime-soft text-ink', dot: 'bg-ink' },
  teal: { box: 'bg-teal-soft text-teal', dot: 'bg-teal' },
  slate: { box: 'bg-black/[0.06] text-muted', dot: 'bg-faint' },
};

export function Badge({ tone, children, dot = true }: { tone: Tone; children: ReactNode; dot?: boolean }) {
  const t = BADGE[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${t.box}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden="true" />}
      {children}
    </span>
  );
}

export function AccountBadge({ status, labeled = false }: { status: Lab['account_status']; labeled?: boolean }) {
  return <Badge tone={status === 'active' ? 'green' : 'red'}>{labeled ? 'Account: ' : ''}{ACCOUNT_LABELS[status] ?? status}</Badge>;
}

export function SubscriptionBadge({ status, labeled = false }: { status: Lab['subscription_status']; labeled?: boolean }) {
  const tone: Tone = status === 'active' ? 'green' : status === 'trial' ? 'amber' : 'red';
  return <Badge tone={tone}>{labeled ? 'Subscription: ' : ''}{SUBSCRIPTION_LABELS[status] ?? status}</Badge>;
}

/** Offline (runs on the lab's PC) or Online (premium). Nothing for labs with no plan yet. */
export function ModeBadge({ plan }: { plan: string | null }) {
  const mode = labMode(plan);
  if (!mode) return null;
  return mode === 'offline' ? <Badge tone="teal">Offline</Badge> : <Badge tone="blue">Online</Badge>;
}

export function KeyStatusBadge({ status }: { status: EffectiveKeyStatus }) {
  const map: Record<EffectiveKeyStatus, { tone: Tone; label: string }> = {
    unused: { tone: 'amber', label: 'Unused' },
    activated: { tone: 'green', label: 'Activated' },
    expired: { tone: 'amber', label: 'Expired' },
    revoked: { tone: 'red', label: 'Revoked' },
  };
  return <Badge tone={map[status].tone}>{map[status].label}</Badge>;
}

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-white font-semibold text-ink ring-1 ring-line"
    >
      {initials(name)}
    </span>
  );
}

/* ---------- Dashboard building blocks ---------- */

type StatTone = 'soft' | 'lime' | 'dark';

const STAT_BOX: Record<StatTone, { box: string; tile: string; muted: string; chip: string }> = {
  soft: { box: 'bg-surface text-ink', tile: 'bg-white text-ink', muted: 'text-muted', chip: 'bg-lime text-ink' },
  lime: { box: 'bg-lime text-ink', tile: 'bg-white/70 text-ink', muted: 'text-ink/70', chip: 'bg-white text-ink' },
  dark: { box: 'bg-ink text-white', tile: 'bg-white/10 text-white', muted: 'text-ink-300', chip: 'bg-lime text-ink' },
};

/** "82%" with a small progress ring. */
export function RingChip({ percent, tone = 'soft' }: { percent: number; tone?: StatTone }) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const c = 2 * Math.PI * 6;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${STAT_BOX[tone].chip}`}>
      {p}%
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="-rotate-90">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.2" />
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray={`${(p / 100) * c} ${c}`} />
      </svg>
    </span>
  );
}

/** A row of capsules: filled ones are solid, the rest are dashed outlines. */
export function CapsuleMeter({ value, total, segments = 8, tone = 'soft', label }: { value: number; total: number; segments?: number; tone?: StatTone; label: string }) {
  const ratio = total > 0 ? value / total : 0;
  let filled = Math.round(ratio * segments);
  if (value > 0 && filled === 0) filled = 1;
  filled = Math.min(segments, filled);
  const solid = tone === 'dark' ? 'bg-lime' : 'bg-ink';
  const empty = tone === 'dark' ? 'border border-dashed border-white/35' : 'capsule-empty';
  return (
    <div role="img" aria-label={label} className="flex gap-1.5">
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={`h-11 min-w-0 flex-1 rounded-full sm:h-12 ${i < filled ? solid : empty}`} />
      ))}
    </div>
  );
}

/** A big-number card. Pass `href` to make the whole card a link (the arrow is the real link). */
export function StatCard({
  tone = 'soft',
  icon,
  title,
  value,
  of,
  chip,
  href,
  hrefLabel,
  children,
  className = '',
}: {
  tone?: StatTone;
  icon: ReactNode;
  title: string;
  value: ReactNode;
  of?: ReactNode;
  chip?: ReactNode;
  href?: string;
  hrefLabel?: string;
  children?: ReactNode;
  className?: string;
}) {
  const t = STAT_BOX[tone];
  return (
    <section className={`relative flex flex-col rounded-card p-5 sm:p-6 ${t.box} ${className}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${t.tile}`} aria-hidden="true">{icon}</span>
        <h2 className="min-w-0 truncate text-base font-semibold">{title}</h2>
        {href && (
          <Link
            href={href}
            prefetch={false}
            aria-label={hrefLabel ?? title}
            className={`ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full after:absolute after:inset-0 after:rounded-card ${
              tone === 'dark' ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-white/60'
            }`}
          >
            <IconArrowUpRight size={18} />
          </Link>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="text-[2.75rem] font-light leading-none tracking-[-0.04em] tabular-nums sm:text-stat">{value}</span>
        {of !== undefined && <span className={`text-lg font-normal tabular-nums ${t.muted}`}>/ {of}</span>}
        {chip && <span className="self-center">{chip}</span>}
      </div>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

/** A small square shortcut (icon + label). */
export function MiniTile({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link href={href} prefetch={false} className="group flex min-h-[7.5rem] flex-col items-start justify-between rounded-card bg-surface p-4 transition-colors hover:bg-surface-strong sm:p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink" aria-hidden="true">{icon}</span>
      <span className="text-base font-semibold text-ink">{label}</span>
    </Link>
  );
}

/** A shortcut card with a one-line explanation, like "Help Center ↗". */
export function LinkCard({ href, icon, title, description }: { href: string; icon: ReactNode; title: string; description: ReactNode }) {
  return (
    <Link href={href} prefetch={false} className="group flex flex-col rounded-card bg-surface p-4 transition-colors hover:bg-surface-strong sm:p-5">
      <span className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink" aria-hidden="true">{icon}</span>
        <IconArrowUpRight size={18} className="text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </span>
      <span className="mt-4 text-base font-semibold text-ink">{title}</span>
      <span className="mt-0.5 line-clamp-2 text-sm font-normal text-muted">{description}</span>
    </Link>
  );
}

/* ---------- Charts ---------- */

export type Segment = { label: string; value: number; color: string };

/** A single proportional capsule bar with a legend underneath. */
export function SegmentBar({ segments, emptyLabel, stacked = false }: { segments: Segment[]; emptyLabel: string; stacked?: boolean }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div>
      {total === 0 ? (
        <div className="capsule-empty h-3.5 rounded-full" aria-label={emptyLabel} />
      ) : (
        <div
          className="flex h-3.5 gap-0.5 overflow-hidden rounded-full"
          role="img"
          aria-label={segments.map((s) => `${s.label}: ${s.value}`).join(', ')}
        >
          {segments
            .filter((s) => s.value > 0)
            .map((s) => (
              <div
                key={s.label}
                style={{ width: `${(s.value / total) * 100}%`, backgroundColor: s.color }}
                className="h-full origin-left animate-bar-grow first:rounded-l-full last:rounded-r-full"
              />
            ))}
        </div>
      )}
      <ul className={`mt-4 grid gap-x-6 gap-y-3 ${stacked ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
            <span className="min-w-0 text-sm font-normal text-muted">{s.label}</span>
            <span className="ml-auto text-sm font-semibold tabular-nums text-ink">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type ChartBar = {
  key: string;
  /** "27 Jun" */
  label: string;
  value: number;
  /** The part of `value` shown in lime. */
  highlight: number;
  current?: boolean;
};

function niceTop(max: number): number {
  if (max <= 4) return 4;
  return Math.ceil(max / 4) * 4;
}

/**
 * Capsule bar chart, drawn on the server with plain CSS (no chart library). Each bar is a black capsule; the lime part
 * at its foot is `highlight`. Days without data are dashed outlines. A hidden table repeats the numbers for screen readers.
 */
export function CapsuleChart({
  bars,
  caption,
  valueLabel,
  highlightLabel,
  labelEvery = 1,
}: {
  bars: ChartBar[];
  caption: string;
  valueLabel: string;
  highlightLabel: string;
  labelEvery?: number;
}) {
  const top = niceTop(Math.max(1, ...bars.map((b) => b.value)));
  const ticks = [top, (top * 3) / 4, top / 2, top / 4, 0];
  return (
    <div>
      <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3" aria-hidden="true">
        <div className="flex h-[220px] flex-col justify-between text-right text-xs font-medium tabular-nums text-muted">
          {ticks.map((t) => (
            <span key={t} className="-my-2 leading-4">{Number.isInteger(t) ? t : t.toFixed(1)}</span>
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex flex-col justify-between">
            {ticks.map((t) => (
              <span key={t} className="block h-px w-full bg-ink/10" />
            ))}
          </div>
          <div className="relative flex h-[220px] items-end gap-1 sm:gap-3">
            {bars.map((bar, index) => {
              const empty = bar.value <= 0;
              const height = `max(${(bar.value / top) * 100}%, 3.25rem)`;
              const share = bar.value > 0 ? Math.min(1, bar.highlight / bar.value) : 0;
              return (
                <div key={bar.key} className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <div className="relative w-full max-w-[3rem]" style={{ height: empty ? '3.25rem' : height }}>
                    <span
                      className={`pointer-events-none absolute -top-9 z-10 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 ${
                        // Keep the tip inside the card: the outer bars anchor to their own edge instead of centring.
                        index >= bars.length - 3 ? 'right-0' : index < 2 ? 'left-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      {bar.label}: {bar.value}
                      {bar.highlight > 0 ? ` (${bar.highlight})` : ''}
                    </span>
                    {empty ? (
                      <span className="capsule-empty absolute inset-0 rounded-full">
                        <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink/25" />
                      </span>
                    ) : (
                      <span
                        className="absolute inset-0 origin-bottom animate-capsule-rise overflow-hidden rounded-full bg-ink"
                        style={{ animationDelay: `${Math.min(index, 14) * 30}ms` }}
                      >
                        <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white" />
                        {share > 0 && (
                          <span className="absolute inset-x-0 bottom-0 rounded-full bg-lime" style={{ height: `max(${share * 100}%, 2.75rem)` }}>
                            <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink" />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex gap-1 sm:gap-3">
            {bars.map((bar, index) => {
              // Labels are counted back from the newest day, so "today" is always labelled and none sit side by side.
              const shown = (bars.length - 1 - index) % labelEvery === 0;
              const align = index === bars.length - 1 ? 'justify-end' : index === 0 ? 'justify-start' : 'justify-center';
              return (
                <span
                  key={bar.key}
                  className={`flex min-w-0 flex-1 text-[11px] tabular-nums sm:text-xs ${align} ${bar.current ? 'font-bold text-ink' : 'font-medium text-muted'} ${shown ? '' : 'invisible'}`}
                >
                  <span className="shrink-0 whitespace-nowrap">{bar.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">{valueLabel}</th>
            <th scope="col">{highlightLabel}</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.key}>
              <th scope="row">{bar.label}</th>
              <td>{bar.value}</td>
              <td>{bar.highlight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
