import Link from "next/link";
import { Armchair, Layers, Palette, Ruler, Sparkles, Eye } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

const benefits = [
  {
    icon: Sparkles,
    title: "A statement without a rebuild",
    body: "One feature wall or ceiling can change the mood of a whole room, with no structural work and no need to replace your furniture.",
  },
  {
    icon: Layers,
    title: "Designs that work together",
    body: "Every design here pairs a ceiling treatment with matching wall panels, so you can judge the full effect rather than a single pattern in isolation.",
  },
  {
    icon: Palette,
    title: "Plenty of styles to compare",
    body: "From soft florals and roses to marble, gold relief and timber-style slats, the range covers classic, glamorous and more restrained looks.",
  },
  {
    icon: Eye,
    title: "See it before you decide",
    body: "Open any design full size to study the detail, then share it with family or your designer before you choose.",
  },
];

const rooms = [
  {
    title: "Bedrooms",
    body: "The headboard wall and the ceiling above the bed are natural places for a bold design. Every preview on this page shows a bedroom.",
  },
  {
    title: "Living rooms and lounges",
    body: "A feature wall behind the sofa or TV unit gives a lounge a clear focal point without crowding the room.",
  },
  {
    title: "Dining rooms",
    body: "A rich ceiling or a single patterned wall adds atmosphere to a space you only use for part of the day.",
  },
  {
    title: "Entrances and hallways",
    body: "A well-chosen wall makes a strong first impression and works hard in a space with little furniture.",
  },
  {
    title: "Guest and children's rooms",
    body: "Softer florals, light marble looks and gentle slatted panels suit rooms where a calmer mood matters.",
  },
  {
    title: "Home offices and study rooms",
    body: "A darker or more textured wall behind the desk adds depth and can look good on video calls.",
  },
];

const steps = [
  {
    title: "Start with the mood you want",
    body: "Ornate gold and dark tones read as formal and rich; pale marble, florals and light slats feel softer and more open. Pick the feeling first, then narrow down.",
  },
  {
    title: "Match the palette to what is already in the room",
    body: "Look at your flooring, bed linen and furniture finishes. A design that echoes one or two of those colors usually looks more settled than one that competes with them.",
  },
  {
    title: "Decide where the design should be the hero",
    body: "Busy ceiling designs pair well with calmer walls, and a dramatic wall works best with a simpler ceiling. Check how the two are balanced in each preview.",
  },
  {
    title: "Think about light and room size",
    body: "Dark, heavily patterned designs add drama in rooms with plenty of daylight. In a smaller or darker room, lighter tones keep the space feeling open.",
  },
  {
    title: "Note the design code and get in touch",
    body: "Each preview carries a code such as R-12 or ROOM-07. Quote it when you contact us so we know exactly which design you mean.",
  },
];

export default function ShopContent() {
  return (
    <>
      <section
        id="about-3d-flex-wallpaper"
        aria-labelledby="about-heading"
        className="bg-(--color-surface-raised) py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-10">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              About the range
            </span>
            <h2
              id="about-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
            >
              What is 3D flex wallpaper?
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-(--color-ink-soft)">
            <p>
              3D flex wallpaper is a large-format printed wall and ceiling
              covering designed to look dimensional: carved florals, marble
              veining, gold relief, layered panels and slatted timber effects.
              Instead of repeating a small pattern, one scene runs across a
              whole surface, so a single wall or ceiling can define the
              character of a room.
            </p>
            <p>
              The pictures on this page are digital room visualizations. Each
              shows a bedroom with a ceiling design and matching wall panels so
              you can see how the pieces work together. They are previews to
              help you choose a look, not photographs of finished installations.
            </p>
            <p>
              The designs are grouped into the Collection 2025, Royal Designs
              and Polite Designs sets, plus a further group of additional
              designs. You can jump to any group from the bar above the gallery.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="benefits-heading"
        className="border-t border-(--color-line) bg-(--color-surface) py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Benefits
            </span>
            <h2
              id="benefits-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
            >
              Why choose 3D flex wallpaper for home décor
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-(--color-line) bg-white p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-navy) text-(--color-cyan)">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--color-ink-soft)">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="rooms-heading"
        className="bg-(--color-surface-raised) py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Room ideas
            </span>
            <h2
              id="rooms-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
            >
              Where 3D flex wallpaper works in your home
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
              The previews here show bedrooms. The ideas below are suggestions
              for how the same styles can be used elsewhere. If you would like a
              design considered for another space, just ask.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map(({ title, body }) => (
              <li key={title} className="flex gap-4">
                <Armchair
                  size={22}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-(--color-blue)"
                />
                <div>
                  <h3 className="text-[17px] font-bold text-(--color-ink)">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-(--color-ink-soft)">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="choose-heading"
        className="border-t border-(--color-line) bg-(--color-surface) py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
              Choosing a design
            </span>
            <h2
              id="choose-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
            >
              How to choose the right wallpaper design
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
              With over a hundred designs to look at, a few simple questions
              make the decision easier.
            </p>
            <p className="mt-6 flex items-start gap-3 rounded-2xl border border-(--color-line) bg-white p-5 text-[15px] leading-relaxed text-(--color-ink-soft)">
              <Ruler size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
              <span>
                Measuring up your walls? Our free{" "}
                <Link
                  href="/tools/unit-conversion-calculator"
                  className="font-semibold text-(--color-blue) underline-offset-4 hover:underline"
                >
                  unit conversion calculator
                </Link>{" "}
                converts feet, inches and meters, and you can find more in our{" "}
                <Link
                  href="/tools"
                  className="font-semibold text-(--color-blue) underline-offset-4 hover:underline"
                >
                  free tools
                </Link>
                .
              </span>
            </p>
          </div>
          <ol className="space-y-6">
            {steps.map(({ title, body }, i) => (
              <li key={title} className="flex gap-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-ink) text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-(--color-ink)">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-(--color-ink-soft)">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="enquire"
        aria-labelledby="enquire-heading"
        className="bg-(--color-surface-raised) py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <h2
            id="enquire-heading"
            className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[36px]"
          >
            Found a design you like?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-(--color-ink-soft)">
            There is no online checkout on this page. Send us the design code
            (for example R-12 or ROOM-07) and tell us about your space, and we
            will take it from there. You can also learn more{" "}
            <Link
              href="/about"
              className="font-semibold text-(--color-blue) underline-offset-4 hover:underline"
            >
              about Code &amp; Motions
            </Link>{" "}
            or see our other{" "}
            <Link
              href="/services"
              className="font-semibold text-(--color-blue) underline-offset-4 hover:underline"
            >
              services
            </Link>
            .
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[15px] font-semibold">
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-full bg-(--color-ink) px-7 text-white transition-colors hover:bg-(--color-blue)"
              >
                Contact us
              </Link>
            </li>
            <li>
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-full border border-(--color-line) px-7 text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
              >
                WhatsApp {contactInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-12 items-center rounded-full border border-(--color-line) px-7 text-(--color-ink) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
              >
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
