import Image from "next/image";

/**
 * Each logo is one of the provided files, shown unaltered. Several files come
 * with empty margins around the artwork, so `crop` (in source pixels) tells the
 * wrapper which part to show; that keeps every logo the same optical height
 * without editing the files. `h` / `hd` are the display heights in px on
 * mobile / from the sm breakpoint up.
 */
type Logo = {
  name: string;
  src: string;
  /** Natural size of the source file. */
  w: number;
  h: number;
  /** Artwork bounds inside the source file; defaults to the whole file. */
  crop?: { x: number; y: number; w: number; h: number };
  /** Display height in px: mobile, then sm and up. */
  size: [number, number];
  /** White-background files blend into the section color. */
  blend?: boolean;
  /** Elementor ships on a cream card; this filter keeps only the artwork. */
  filter?: string;
};

const logos: Logo[] = [
  { name: "Shopify", src: "/images/tech/shopify.svg", w: 256, h: 292, size: [38, 46] },
  { name: "WordPress", src: "/images/tech/wordpress.webp", w: 3840, h: 3841, size: [36, 44] },
  {
    name: "WooCommerce",
    src: "/images/tech/woocommerce.png",
    w: 600,
    h: 600,
    crop: { x: 30, y: 245, w: 540, h: 109 },
    size: [26, 32],
    blend: true,
  },
  {
    name: "Elementor",
    src: "/images/tech/elementor.svg",
    w: 632,
    h: 360,
    crop: { x: 85, y: 140, w: 462, h: 80 },
    size: [28, 34],
    filter: "url(#platforms-cream-filter)",
  },
  {
    name: "React",
    src: "/images/tech/react.webp",
    w: 980,
    h: 980,
    crop: { x: 90, y: 90, w: 800, h: 800 },
    size: [40, 48],
  },
  {
    name: "Next.js",
    src: "/images/tech/nextjs.png",
    w: 600,
    h: 600,
    crop: { x: 30, y: 245, w: 540, h: 109 },
    size: [24, 30],
    blend: true,
  },
  { name: "Node.js", src: "/images/tech/nodejs.svg", w: 442.37, h: 270.929, size: [38, 46] },
  {
    name: "Supabase",
    src: "/images/tech/supabase.png",
    w: 599,
    h: 333,
    crop: { x: 12, y: 104, w: 575, h: 125 },
    size: [28, 34],
    blend: true,
  },
  {
    name: "Vercel",
    src: "/images/tech/vercel.png",
    w: 3840,
    h: 2160,
    crop: { x: 50, y: 659, w: 3740, h: 843 },
    size: [24, 30],
  },
];

// Duplicated once so the track can loop seamlessly at -50%.
const track = [...logos, ...logos];

function LogoItem({ logo, hidden }: { logo: Logo; hidden: boolean }) {
  const crop = logo.crop ?? { x: 0, y: 0, w: logo.w, h: logo.h };
  const [hMobile, hDesktop] = logo.size;
  const widthDesktop = Math.ceil((hDesktop * crop.w) / crop.h);
  const imgWidthDesktop = Math.ceil((widthDesktop * logo.w) / crop.w);

  return (
    <span
      aria-hidden={hidden || undefined}
      className="relative block h-(--lh) shrink-0 overflow-hidden sm:h-(--lhd)"
      style={
        {
          "--lh": `${hMobile}px`,
          "--lhd": `${hDesktop}px`,
          aspectRatio: `${crop.w} / ${crop.h}`,
        } as React.CSSProperties
      }
    >
      <Image
        src={logo.src}
        alt={hidden ? "" : `${logo.name} logo`}
        width={logo.w}
        height={logo.h}
        sizes={`${imgWidthDesktop}px`}
        quality={90}
        loading="eager"
        draggable={false}
        className={`absolute max-w-none select-none ${logo.blend ? "mix-blend-multiply" : ""}`}
        style={{
          width: `${(logo.w / crop.w) * 100}%`,
          height: `${(logo.h / crop.h) * 100}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
          filter: logo.filter,
        }}
      />
    </span>
  );
}

export default function PlatformsMarquee() {
  return (
    <section className="border-y border-(--color-line) bg-(--color-surface) py-12 lg:py-14">
      {/* Turns the cream card behind the Elementor file into transparency, keeping its dark artwork. */}
      <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
        <filter id="platforms-cream-filter" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.165  0 0 0 0 0.024  0 0 0 0 0.141  -1.233 0 0 0 1.2036"
          />
        </filter>
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-ink-soft)">
          Platforms &amp; Technologies We Work With
        </h2>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-(--color-surface) to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-(--color-surface) to-transparent sm:w-28"
        />

        {/* The track carries the section color so white-background logos blend into it. */}
        <div className="platforms-track flex h-14 w-max items-center gap-14 bg-(--color-surface) px-7 sm:h-16">
          {track.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} hidden={index >= logos.length} />
          ))}
        </div>
      </div>

      <style>{`
        .platforms-track {
          animation: platforms-scroll 28s linear infinite;
        }
        @keyframes platforms-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
