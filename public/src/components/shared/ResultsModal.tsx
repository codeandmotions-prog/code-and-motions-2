"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ResultsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidthClassName?: string;
};

/**
 * Shared large premium "results" modal used by every Code & Motions free
 * tool. Presentation-only: it never touches or transforms the data it's
 * given — callers pass their own already-computed results as children.
 *
 * - Escape key and backdrop click both close it.
 * - Body scroll is locked while open.
 * - Sits above the sticky Header (z-50) and the global WhatsApp button (z-40).
 */
export default function ResultsModal({
  open,
  onClose,
  title,
  children,
  maxWidthClassName = "max-w-4xl",
}: ResultsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-(--color-navy-deep)/70 px-4 py-8 backdrop-blur-sm sm:items-center sm:px-6 sm:py-12"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative my-auto w-full ${maxWidthClassName}`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close results"
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--color-ink) shadow-[0_12px_28px_-10px_rgba(11,28,77,0.45)] transition-transform hover:scale-105 sm:-top-4 sm:-right-4"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
