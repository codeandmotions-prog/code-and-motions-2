'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, Suspense, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Navigation feedback for the admin shell. It never navigates anything itself —
 * Next.js <Link> and <Form> do that, client-side — it only reports it:
 *
 *  - a thin progress bar at the top while the next section is loading, and
 *  - the path being opened, so the sidebar can highlight it straight away
 *    instead of waiting for the new page's data to arrive.
 */

const SHOW_AFTER_MS = 120; // a navigation that finishes faster than this shows no bar at all
const GIVE_UP_MS = 10_000; // never leave the bar or highlight stuck if a navigation is cancelled

const PendingPathContext = createContext<string | null>(null);

/** The path a click has just asked for, until the page actually changes. */
export function usePendingPath(): string | null {
  return useContext(PendingPathContext);
}

/** Calls `onRoute` whenever the URL (path or query) changes. Needs a Suspense boundary above it. */
function RouteWatcher({ onRoute }: { onRoute: () => void }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    onRoute();
  }, [pathname, search, onRoute]);
  return null;
}

type Bar = { visible: boolean; progress: number };

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [bar, setBar] = useState<Bar>({ visible: false, progress: 0 });

  const navigating = useRef(false);
  const showTimer = useRef<number | undefined>(undefined);
  const giveUpTimer = useRef<number | undefined>(undefined);
  const hideTimer = useRef<number | undefined>(undefined);
  const trickle = useRef<number | undefined>(undefined);

  const clearTimers = useCallback(() => {
    window.clearTimeout(showTimer.current);
    window.clearTimeout(giveUpTimer.current);
    window.clearTimeout(hideTimer.current);
    window.clearInterval(trickle.current);
  }, []);

  const finish = useCallback(() => {
    if (!navigating.current) return;
    navigating.current = false;
    window.clearTimeout(showTimer.current);
    window.clearTimeout(giveUpTimer.current);
    window.clearInterval(trickle.current);
    setPendingPath(null);
    // Fill the bar, then fade it out. If it was never shown, this changes nothing.
    setBar((current) => (current.visible ? { visible: true, progress: 100 } : current));
    hideTimer.current = window.setTimeout(() => setBar((current) => ({ ...current, visible: false })), 220);
  }, []);

  const start = useCallback(
    (path: string) => {
      clearTimers();
      navigating.current = true;
      setPendingPath(path);
      setBar({ visible: false, progress: 0 });
      showTimer.current = window.setTimeout(() => {
        setBar({ visible: true, progress: 12 });
        trickle.current = window.setInterval(() => {
          setBar((current) => ({ ...current, progress: current.progress + (90 - current.progress) * 0.12 }));
        }, 200);
      }, SHOW_AFTER_MS);
      giveUpTimer.current = window.setTimeout(finish, GIVE_UP_MS);
    },
    [clearTimers, finish],
  );

  // Notice navigations the moment they are requested.
  useEffect(() => {
    const here = () => window.location.pathname + window.location.search;

    const onClick = (event: MouseEvent) => {
      // <Link> has already taken over a normal click (preventDefault). Anything else — a
      // new-tab click, a modified click, a hash-only jump — is not an in-app navigation.
      if (!event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname + url.search === here()) return;
      start(url.pathname);
    };

    // Filter forms are <Form data-nav-form>: next/form turns the GET submit into a client-side navigation.
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!event.defaultPrevented || !form?.hasAttribute('data-nav-form')) return;
      const url = new URL(form.getAttribute('action') ?? '', window.location.href);
      const params = new URLSearchParams();
      for (const [name, value] of new FormData(form)) if (typeof value === 'string') params.append(name, value);
      url.search = params.toString();
      if (url.origin !== window.location.origin || url.pathname + url.search === here()) return;
      start(url.pathname);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
      clearTimers();
    };
  }, [start, clearTimers]);

  return (
    <PendingPathContext.Provider value={pendingPath}>
      <Suspense fallback={null}>
        <RouteWatcher onRoute={finish} />
      </Suspense>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] transition-opacity duration-200 ${bar.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="h-full origin-left bg-ink shadow-[0_0_8px_rgba(15,18,16,0.35)] transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${bar.progress / 100})` }}
        />
      </div>
      {children}
    </PendingPathContext.Provider>
  );
}
