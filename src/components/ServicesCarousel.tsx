"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

const SCROLL_STEP = 296; // card width + gap

export default function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const updateArrowState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrowState();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateArrowState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateArrowState]);

  const scrollByStep = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    el.scrollLeft = dragStartScroll.current - delta;
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar snap-x-mandatory flex cursor-grab gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 pt-1 active:cursor-grabbing lg:scroll-px-10 lg:px-10"
        role="region"
        aria-label="Popular services, scrollable"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        {/* spacer so the last card can be centered/fully revealed */}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 px-6 lg:px-10">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll services left"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) transition-colors enabled:hover:border-(--color-ink) disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          disabled={!canScrollRight}
          aria-label="Scroll services right"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) transition-colors enabled:hover:border-(--color-ink) disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
