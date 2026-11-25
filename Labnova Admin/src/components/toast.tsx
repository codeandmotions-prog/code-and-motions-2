'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IconAlert, IconCheck, IconClose } from '@/components/icons';

type Toast = { id: number; tone: 'success' | 'error'; title: string; body?: string };

type ToastApi = {
  success: (title: string, body?: string) => void;
  error: (title: string, body?: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside <ToastProvider>.');
  return api;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const push = useCallback(
    (tone: Toast['tone'], title: string, body?: string) => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-3), { id, tone, title, body }]);
      timers.current.set(id, setTimeout(() => dismiss(id), tone === 'error' ? 9000 : 5000));
    },
    [dismiss],
  );

  useEffect(() => {
    const current = timers.current;
    return () => current.forEach((timer) => clearTimeout(timer));
  }, []);

  const api = useMemo<ToastApi>(
    () => ({ success: (t, b) => push('success', t, b), error: (t, b) => push('error', t, b) }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-pop"
          >
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${t.tone === 'success' ? 'bg-ok-soft text-ok' : 'bg-bad-soft text-bad'}`}>
              {t.tone === 'success' ? <IconCheck size={14} strokeWidth={2.6} /> : <IconAlert size={14} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{t.title}</p>
              {t.body && <p className="mt-0.5 text-sm font-normal text-muted">{t.body}</p>}
            </div>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="-mr-1 rounded-full p-1 text-faint transition-colors hover:bg-canvas hover:text-ink">
              <IconClose size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
