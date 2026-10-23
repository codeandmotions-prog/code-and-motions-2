"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ChevronRight, Images, MessageCircle } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import type { ShopDesign } from "@/data/shop";
import { thumbLoader } from "./loaders";

type ShopHeroProps = {
  designCount: number;
  collectionCount: number;
  /** Three real designs shown as a visual stack on large screens. */
  featured: ShopDesign[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const tilt = [
  "left-0 top-6 w-[62%] -rotate-3",
  "right-0 top-0 w-[58%] rotate-2",
  "left-[18%] bottom-0 w-[60%] -rotate-1",
];

export default function ShopHero({ designCount, collectionCount, featured }: ShopHeroProps) {
  return (
    <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-16 lg:pb-24 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <MotionStreaks className="pointer-events-none absolute -right-16 top-8 h-72 w-72 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[13px] font-medium text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-white/80" aria-current="page">
              Shop
            </span>
          </motion.nav>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-3xl text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[58px]"
          >
            3D Flex Wallpaper for Home Décor
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]"
          >
            Browse {designCount} 3D flex wallpaper designs that turn a plain
            ceiling or feature wall into the centerpiece of a room. Open any
            design full size, compare looks across {collectionCount}{" "}
            collections, and share your favorites with family or your designer.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-white"
          >
            <li>
              <span className="block text-[28px] font-extrabold leading-none">{designCount}</span>
              <span className="mt-1 block text-[13px] font-medium text-white/60">designs</span>
            </li>
            <li>
              <span className="block text-[28px] font-extrabold leading-none">{collectionCount}</span>
              <span className="mt-1 block text-[13px] font-medium text-white/60">collections</span>
            </li>
            <li>
              <span className="block text-[28px] font-extrabold leading-none">Full size</span>
              <span className="mt-1 block text-[13px] font-medium text-white/60">previews</span>
            </li>
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#designs"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-(--color-cyan) px-7 py-3.5 text-[15px] font-semibold text-(--color-ink) transition-colors hover:bg-white"
            >
              <Images size={17} aria-hidden="true" />
              Browse designs
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Ask about a design
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
          className="relative hidden aspect-[5/4] w-full lg:block"
        >
          {featured.slice(0, 3).map((design, i) => (
            <div
              key={design.slug}
              className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] ${tilt[i]}`}
            >
              <Image
                loader={thumbLoader}
                src={design.thumb.src}
                alt=""
                width={design.thumb.width}
                height={design.thumb.height}
                sizes="(min-width: 1024px) 320px, 0px"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
