'use client';

import { useEffect, useRef } from 'react';
import { IconClose } from '@/components/icons';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Modal({
  title,
  onClose,
  children,
  closable = true,
  size = 'md',
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  closable?: boolean;
  size?: 'md' | 'lg';
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Keep the latest onClose without re-running effects on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus the dialog once when it opens, give focus back when it closes, stop the page scrolling behind it.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (previous && previous.isConnected) previous.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable) {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      // Focus can fall out of the dialog (e.g. the focused button became disabled): pull it back in.
      if (!active || !ref.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && (active === first || active === ref.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closable]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/45 p-0 backdrop-blur-[2px] animate-fade-in sm:items-center sm:p-4"
      onMouseDown={closable ? onClose : undefined}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        className={`w-full ${size === 'lg' ? 'sm:max-w-xl' : 'sm:max-w-md'} animate-pop-in rounded-t-[28px] bg-panel p-6 shadow-pop outline-none sm:rounded-[28px] sm:p-7`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-normal tracking-[-0.02em] text-ink">{title}</h3>
          {closable && (
            <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 -mt-1 rounded-full p-2 text-muted transition-colors hover:bg-canvas hover:text-ink">
              <IconClose size={18} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
