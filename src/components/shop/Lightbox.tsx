"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { ShopDesign } from "@/data/shop";
import ShareButton from "./ShareButton";
import { fullLoader } from "./loaders";

type LightboxProps = {
  designs: ShopDesign[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Lightbox({ designs, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState(0);
  const design = designs[index];
  const total = designs.length;

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      onNavigate((index + step + total) % total);
    },
    [index, total, onNavigate],
  );

  // Scroll lock + focus handling: remember the opener and put focus back on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  // Keyboard: Escape, arrows, and a Tab focus trap.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  // Warm the cache for the neighbouring designs.
  useEffect(() => {
    [1, -1].forEach((step) => {
      const neighbour = designs[(index + step + total) % total];
      const img = new window.Image();
      img.src = neighbour.full.src;
    });
  }, [designs, index, total]);

  function onTouchStart(event: React.TouchEvent) {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${design.title} full-size preview`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="fixed inset-0 z-[70] flex flex-col bg-(--color-navy-deep)/95 backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate text-[14px] font-semibold text-white/80" aria-live="polite">
            <span className="text-white">{index + 1}</span> / {total}
            <span className="ml-3 hidden text-white/60 sm:inline">{design.title}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 px-2 sm:px-16"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={design.slug}
              custom={direction}
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-2 inset-y-0 sm:inset-x-16"
            >
              <Image
                loader={fullLoader}
                src={design.full.src}
                alt={design.alt}
                fill
                sizes="100vw"
                draggable={false}
                className="select-none object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous design"
            className="absolute left-1 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-white hover:text-(--color-ink) sm:left-3"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next design"
            className="absolute right-1 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-white hover:text-(--color-ink) sm:right-3"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-[16px] font-bold text-white">{design.title}</p>
            <p className="text-[13px] text-white/60">3D flex wallpaper design</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShareButton title={design.title} slug={design.slug} variant="solid" />
            <ShareButton title={design.title} slug={design.slug} variant="ghost" copyOnly />
            <Link
              href={`/shop/${design.slug}`}
              prefetch={false}
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-white/80 transition-colors hover:text-white"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Design page
            </Link>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
