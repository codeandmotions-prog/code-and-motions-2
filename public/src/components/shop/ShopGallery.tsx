"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { ShopCollection, ShopDesign } from "@/data/shop";
import Lightbox from "./Lightbox";
import ShareButton from "./ShareButton";
import { thumbLoader } from "./loaders";

type ShopGalleryProps = {
  collections: ShopCollection[];
  designs: ShopDesign[];
};

export default function ShopGallery({ collections, designs }: ShopGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  const sections = collections
    .map((collection) => ({
      collection,
      items: designs
        .map((design, index) => ({ design, index }))
        .filter(({ design }) => design.collection === collection.id),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <section id="designs" aria-labelledby="designs-heading" className="bg-(--color-surface) pb-20 lg:pb-28">
      <div className="sticky top-20 z-30 border-b border-(--color-line) bg-white/90 backdrop-blur lg:top-24">
        <nav
          aria-label="Wallpaper collections"
          className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 no-scrollbar lg:px-10"
        >
          {sections.map(({ collection, items }) => (
            <a
              key={collection.id}
              href={`#${collection.id}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-(--color-line) bg-white px-4 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
            >
              {collection.name}
              <span className="rounded-full bg-(--color-surface) px-2 py-0.5 text-[12px] font-bold text-(--color-ink-soft)">
                {items.length}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-14 lg:px-10 lg:pt-16">
        <div className="max-w-2xl">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            The designs
          </span>
          <h2
            id="designs-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
          >
            Browse {designs.length} 3D flex wallpaper designs
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
            Tap any design to open it full size, swipe or use the arrows to move
            between designs, and use Share to send one to someone else.
          </p>
        </div>

        {sections.map(({ collection, items }) => (
          <div
            key={collection.id}
            id={collection.id}
            aria-labelledby={`${collection.id}-heading`}
            role="group"
            className="scroll-mt-40 pt-14 lg:scroll-mt-44"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <h3
                id={`${collection.id}-heading`}
                className="text-[24px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[28px]"
              >
                {collection.name}
              </h3>
              <p className="text-[14px] font-semibold text-(--color-ink-soft)">
                {items.length} designs
              </p>
            </div>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-(--color-ink-soft)">
              {collection.blurb}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {items.map(({ design, index }) => (
                <li key={design.slug}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-line) bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgba(11,28,77,0.45)]">
                    <Link
                      href={`/shop/${design.slug}`}
                      prefetch={false}
                      aria-haspopup="dialog"
                      aria-label={`View ${design.title} full size`}
                      onClick={(event) => {
                        if (
                          event.defaultPrevented ||
                          event.button !== 0 ||
                          event.metaKey ||
                          event.ctrlKey ||
                          event.shiftKey ||
                          event.altKey
                        ) {
                          return;
                        }
                        event.preventDefault();
                        setOpenIndex(index);
                      }}
                      className="relative block overflow-hidden bg-(--color-surface)"
                    >
                      <Image
                        loader={thumbLoader}
                        src={design.thumb.src}
                        alt={design.alt}
                        width={design.thumb.width}
                        height={design.thumb.height}
                        sizes="(min-width: 1280px) 290px, (min-width: 1024px) 31vw, (min-width: 520px) 46vw, 100vw"
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-(--color-ink) opacity-100 shadow transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                      >
                        <ZoomIn size={17} />
                      </span>
                    </Link>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-bold leading-snug text-(--color-ink)">
                          {design.title}
                        </h4>
                        <p className="text-[13px] text-(--color-ink-soft)">3D flex wallpaper</p>
                      </div>
                      <ShareButton title={design.title} slug={design.slug} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            key="shop-lightbox"
            designs={designs}
            index={openIndex}
            onClose={close}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
