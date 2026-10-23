"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { copyLink, shareDesign, type ShareResult } from "./share";

type ShareButtonProps = {
  title: string;
  slug: string;
  /** "card" is the compact in-grid button; "solid" and "ghost" are for the lightbox and design page. */
  variant?: "card" | "solid" | "ghost";
  /** Render a copy-only button instead of the share button. */
  copyOnly?: boolean;
  className?: string;
};

const styles = {
  card: "min-h-11 gap-2 rounded-full border border-(--color-line) bg-white px-4 text-[14px] font-semibold text-(--color-ink) hover:border-(--color-blue) hover:bg-(--color-blue) hover:text-white",
  solid:
    "min-h-12 gap-2 rounded-full bg-(--color-cyan) px-6 text-[15px] font-semibold text-(--color-ink) hover:bg-white",
  ghost:
    "min-h-12 gap-2 rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white hover:border-white",
} as const;

export default function ShareButton({
  title,
  slug,
  variant = "card",
  copyOnly = false,
  className = "",
}: ShareButtonProps) {
  const [result, setResult] = useState<ShareResult | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function onClick(event: React.MouseEvent) {
    event.stopPropagation();
    const path = `/shop/${slug}`;
    const outcome = copyOnly
      ? await copyLink(path)
      : await shareDesign({
          title,
          text: `${title}: a 3D flex wallpaper design for home décor`,
          path,
        });
    if (outcome === "cancelled" || outcome === "shared") {
      setResult(null);
      return;
    }
    setResult(outcome);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setResult(null), 2400);
  }

  const idleLabel = copyOnly ? "Copy link" : "Share";
  const Icon = copyOnly ? Link2 : Share2;

  let label = idleLabel;
  if (result === "copied") label = "Link copied";
  if (result === "failed") label = "Copy failed";

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={`${idleLabel} ${title}`}
        className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-200 active:scale-[0.97] ${styles[variant]} ${className}`}
      >
        {result === "copied" ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Icon size={17} aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {result === "copied" ? `Link to ${title} copied to clipboard` : ""}
        {result === "failed"
          ? "Could not copy the link. Copy it from the address bar instead."
          : ""}
      </span>
    </>
  );
}
