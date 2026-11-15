import Link from "next/link";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import ServiceIllustration from "./ServiceIllustration";

export type ServiceCardShellProps = {
  /** Visible card heading. */
  name: string;
  description: string;
  icon: LucideIcon;
  /** Key into the illustration set (a slug, category id or `svc-*` key). */
  illustration: string;
  /** Optional pill chips (tags / sub-service names). */
  chips?: string[];
  chipsLabel?: string;
  /** Destination used by the heading link and the button. */
  href?: string;
  /** Wrap the heading in a link to `href` (as the original card did). */
  titleLink?: boolean;
  /** The existing button text, unchanged. Omit for cards that never had a link. */
  cta?: { label: string; srSuffix?: string; href?: string };
  /** Make the whole card clickable through the button (stretched link). */
  overlayLink?: boolean;
  /** Small muted index shown beside the icon (home carousel). */
  number?: string;
};

/**
 * The shared service card.
 *
 * Responsive by the card's OWN width (container queries), not the viewport, so
 * the same markup works in a 1-, 2- or 3-column grid and in a scroller:
 *   - under ~520px (phones, 2-3 column grids): compact. The illustration is a
 *     small thumbnail floated top-right and the icon, title and description
 *     wrap around it, so there is no dead space; chips and the button follow.
 *   - 520px and up (single wide cards): text on the left, illustration on the
 *     right, then chips and the button underneath.
 * All text, links and labels come from the caller unchanged; this component
 * only decides how they are laid out.
 */
export default function ServiceCardShell({
  name,
  description,
  icon: Icon,
  illustration,
  chips,
  chipsLabel,
  href,
  titleLink = false,
  cta,
  overlayLink = false,
  number,
}: ServiceCardShellProps) {
  const ctaHref = cta?.href ?? href;

  return (
    <div className="@container h-full">
      <article className="group relative flex h-full flex-col rounded-[18px] border border-(--color-line) bg-white p-4 shadow-[0_1px_2px_rgba(11,28,77,0.04),0_14px_32px_-24px_rgba(11,28,77,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-(--color-blue)/30 hover:shadow-[0_26px_52px_-34px_rgba(11,28,77,0.38)] focus-within:border-(--color-blue)/45 @min-[360px]:rounded-[22px] @min-[360px]:p-5 @min-[520px]:rounded-[24px] @min-[520px]:p-6 @min-[680px]:p-7">
        <div className="flow-root @min-[520px]:grid @min-[520px]:grid-cols-2 @min-[520px]:gap-x-3">
          <div
            aria-hidden="true"
            className="pointer-events-none float-right mb-1 ml-2 w-[112px] @min-[360px]:w-[132px] @min-[440px]:w-[150px] @min-[520px]:float-none @min-[520px]:col-start-2 @min-[520px]:row-start-1 @min-[520px]:mb-0 @min-[520px]:ml-0 @min-[520px]:-mr-3 @min-[520px]:w-full @min-[520px]:max-w-[270px] @min-[520px]:justify-self-end @min-[520px]:self-center"
          >
            <ServiceIllustration illustration={illustration} />
          </div>

          <div className="@min-[520px]:col-start-1 @min-[520px]:row-start-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#eaf0ff] @min-[360px]:h-11 @min-[360px]:w-11 @min-[360px]:rounded-[14px] @min-[520px]:h-12 @min-[520px]:w-12 @min-[520px]:rounded-2xl">
                <Icon size={22} strokeWidth={1.9} className="text-(--color-blue)" aria-hidden="true" />
              </span>
              {number ? (
                <span className="text-[13px] font-bold tracking-[0.05em] text-(--color-ink-soft)/55" aria-hidden="true">
                  {number}
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 text-[18px] font-extrabold leading-[1.15] tracking-[-0.02em] text-(--color-ink) @min-[360px]:text-[20px] @min-[440px]:text-[22px] @min-[520px]:text-[24px] @min-[680px]:text-[27px]">
              {titleLink && href ? (
                <Link href={href} className="transition-colors hover:text-(--color-blue)">
                  {name}
                </Link>
              ) : (
                name
              )}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-(--color-ink-soft) @min-[440px]:text-[14.5px] @min-[520px]:text-[15px] @min-[680px]:text-[15.5px]">
              {description}
            </p>
          </div>
        </div>

        {chips && chips.length > 0 ? (
          <ul className="mt-3.5 flex flex-wrap gap-1.5 @min-[360px]:gap-2 @min-[520px]:mt-4" aria-label={chipsLabel}>
            {chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-(--color-line) bg-white py-[3px] pl-[3px] pr-2.5 text-[12px] font-semibold leading-tight text-(--color-ink) shadow-[0_2px_6px_-2px_rgba(11,28,77,0.08)] @min-[520px]:text-[12.5px]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff]">
                  <Check size={11} strokeWidth={2.8} className="text-(--color-blue)" aria-hidden="true" />
                </span>
                {chip}
              </li>
            ))}
          </ul>
        ) : null}

        {cta && ctaHref ? (
          <div className="mt-auto pt-3.5 @min-[520px]:pt-4">
            <Link
              href={ctaHref}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) px-5 py-[11px] text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_rgba(21,71,224,0.7)] transition-colors hover:bg-(--color-navy) group-hover:bg-(--color-navy) @min-[520px]:w-auto @min-[520px]:px-6 @min-[520px]:text-[14.5px] ${
                overlayLink ? "after:absolute after:inset-0 after:rounded-[24px] after:content-['']" : ""
              }`}
            >
              {cta.label}
              {cta.srSuffix ? <span className="sr-only">{cta.srSuffix}</span> : null}
              <ArrowUpRight
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        ) : null}
      </article>
    </div>
  );
}
