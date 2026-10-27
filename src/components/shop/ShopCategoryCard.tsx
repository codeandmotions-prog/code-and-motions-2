"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ShopDesign } from "@/data/shop";
import { thumbLoader } from "./loaders";

type ShopCategoryCardProps = {
  name: string;
  tagline: string;
  href: string;
  designCount: number;
  collectionCount: number;
  /** Real designs used as artwork (first one leads). */
  previews: ShopDesign[];
  /** "wide" fills the row (used while there is a single category); "tile" is a grid card. */
  layout: "wide" | "tile";
  index: number;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.08 * i } }),
};

// Resting positions of the stacked artwork; each image drifts slightly on hover.
const stack = [
  "left-[2%] top-[10%] w-[60%] -rotate-3 group-hover:-translate-x-1 group-hover:-rotate-[4deg]",
  "right-[2%] top-[2%] w-[54%] rotate-2 group-hover:translate-x-1 group-hover:rotate-[3deg]",
  "left-[22%] bottom-[2%] w-[56%] -rotate-1 group-hover:translate-y-1 group-hover:rotate-0",
];

export default function ShopCategoryCard({
  name,
  tagline,
  href,
  designCount,
  collectionCount,
  previews,
  layout,
  index,
}: ShopCategoryCardProps) {
  const wide = layout === "wide";
  return (
    <motion.li
      custom={index}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={wide ? "sm:col-span-2 lg:col-span-3" : ""}
    >
      <Link
        href={href}
        aria-label={`${name}: browse ${designCount} designs`}
        className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-(--color-navy-deep) shadow-[0_30px_70px_-40px_rgba(11,28,77,0.8)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-(--color-cyan)/40 hover:shadow-[0_40px_80px_-36px_rgba(34,211,238,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-blue) motion-reduce:transform-none motion-reduce:transition-none lg:flex-row"
      >
        {/* Background glow and grid, matching the site's hero style. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(120% 100% at 85% 0%, #1a2f78 0%, #0b1c4d 50%, #060d24 100%)" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-(--color-cyan)/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 motion-safe:opacity-70"
        />

        <div className={`relative z-10 flex flex-col justify-between p-7 sm:p-9 ${wide ? "lg:w-[46%] lg:p-12" : "flex-1"}`}>
          <div>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan)">
              Category
            </span>
            <h3 className="mt-5 text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[40px]">{name}</h3>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/70">{tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-white">
              <li>
                <span className="block text-[26px] font-extrabold leading-none">{designCount}</span>
                <span className="mt-1 block text-[13px] font-medium text-white/60">designs</span>
              </li>
              <li>
                <span className="block text-[26px] font-extrabold leading-none">{collectionCount}</span>
                <span className="mt-1 block text-[13px] font-medium text-white/60">collections</span>
              </li>
            </ul>
          </div>
          <span className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-(--color-cyan) px-7 text-[15px] font-semibold text-(--color-ink) transition-colors duration-300 group-hover:bg-white">
            Explore {name}
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </span>
        </div>

        {/* Stacked artwork: real designs from the category. */}
        <div
          aria-hidden="true"
          className={`relative z-10 mx-6 mb-7 aspect-[5/4] sm:mx-9 sm:mb-9 ${wide ? "lg:m-0 lg:mr-10 lg:w-[54%] lg:flex-1 lg:self-center lg:aspect-[5/4]" : ""}`}
        >
          {previews.slice(0, 3).map((design, i) => (
            <div
              key={design.slug}
              className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${stack[i]}`}
            >
              <Image
                loader={thumbLoader}
                src={design.thumb.src}
                alt=""
                width={design.thumb.width}
                height={design.thumb.height}
                sizes="(min-width: 1024px) 320px, 60vw"
                loading={i === 0 ? "eager" : "lazy"}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
              />
            </div>
          ))}
        </div>
      </Link>
    </motion.li>
  );
}
