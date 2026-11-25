'use client';

import { useEffect, useRef } from 'react';
import { IconClose } from '@/components/icons';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * A panel that slides in from the right (full width on a phone) for "show me the details" — it keeps the list behind
 * it in place. Same behaviour as Modal: focus moves into it and comes back when it closes, Tab stays inside,
 * Escape and a click on the dimmed area close it, and the page behind does not scroll.
 */
export function Drawer({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
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
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/45 backdrop-blur-[2px] animate-fade-in" onMouseDown={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        className="flex h-full w-full animate-drawer-in-right flex-col bg-panel shadow-pop outline-none sm:max-w-xl sm:rounded-l-[28px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h3 className="text-2xl font-normal tracking-[-0.02em] text-ink [overflow-wrap:anywhere]">{title}</h3>
            {subtitle && <div className="mt-1 text-sm font-normal text-muted">{subtitle}</div>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close details" className="-mr-2 -mt-1 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-white hover:text-ink">
            <IconClose size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="border-t border-line bg-surface px-5 py-3 sm:rounded-bl-[28px] sm:px-6">{footer}</div>}
      </div>
    </div>
  );
}
