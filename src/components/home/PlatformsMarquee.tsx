const platforms = [
  "Shopify",
  "WordPress",
  "WooCommerce",
  "Elementor",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
];

// Duplicated once so the track can loop seamlessly at -50%.
const track = [...platforms, ...platforms];

export default function PlatformsMarquee() {
  return (
    <section className="border-y border-(--color-line) bg-(--color-surface) py-12 lg:py-14">
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

        <div className="platforms-track flex w-max items-center gap-14 px-7">
          {track.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-[22px] font-bold tracking-[-0.01em] text-(--color-ink-soft)/60 sm:text-[26px]"
            >
              {name}
            </span>
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
