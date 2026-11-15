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
 *   - under ~520px: stacked (text, illustration, chips, button)
 *   - 520px and up: text on the left, illustration on the right, then chips
 *     and the button underneath
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
      <article className="group relative flex h-full flex-col rounded-[24px] border border-(--color-line) bg-white p-[22px] shadow-[0_1px_2px_rgba(11,28,77,0.04),0_18px_40px_-28px_rgba(11,28,77,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-(--color-blue)/30 hover:shadow-[0_30px_60px_-35px_rgba(11,28,77,0.38)] focus-within:border-(--color-blue)/45 @min-[421px]:rounded-[28px] @min-[421px]:p-6 @min-[520px]:p-8 @min-[680px]:p-9">
        <div className="grid grid-cols-1 @min-[520px]:grid-cols-2 @min-[520px]:gap-x-2">
          <div className="@min-[520px]:col-start-1 @min-[520px]:row-start-1">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#eaf0ff] @min-[520px]:h-[60px] @min-[520px]:w-[60px] @min-[520px]:rounded-[20px]">
                <Icon size={26} strokeWidth={1.9} className="text-(--color-blue)" aria-hidden="true" />
              </span>
              {number ? (
                <span className="pt-1 text-[13px] font-bold tracking-[0.05em] text-(--color-ink-soft)/55" aria-hidden="true">
                  {number}
                </span>
              ) : null}
            </div>

            <h3 className="mt-5 text-[24px] font-extrabold leading-[1.12] tracking-[-0.02em] text-(--color-ink) @min-[421px]:text-[26px] @min-[520px]:text-[28px] @min-[680px]:text-[32px]">
              {titleLink && href ? (
                <Link href={href} className="transition-colors hover:text-(--color-blue)">
                  {name}
                </Link>
              ) : (
                name
              )}
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-(--color-ink-soft) @min-[421px]:text-[15px] @min-[520px]:text-[15.5px] @min-[680px]:text-[16.5px]">
              {description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none mx-auto mt-5 w-full max-w-[340px] @min-[520px]:col-start-2 @min-[520px]:row-start-1 @min-[520px]:mx-0 @min-[520px]:-mr-3.5 @min-[520px]:mt-0 @min-[520px]:max-w-none @min-[520px]:self-center"
          >
            <ServiceIllustration illustration={illustration} />
          </div>
        </div>

        {chips && chips.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2.5 @min-[520px]:mt-6" aria-label={chipsLabel}>
            {chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2.5 rounded-full border border-(--color-line) bg-white py-2 pl-2 pr-4 text-[13px] font-semibold text-(--color-ink) shadow-[0_2px_8px_-2px_rgba(11,28,77,0.08)] @min-[421px]:text-[13.5px]"
              >
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eaf0ff]">
                  <Check size={14} strokeWidth={2.6} className="text-(--color-blue)" aria-hidden="true" />
                </span>
                {chip}
              </li>
            ))}
          </ul>
        ) : null}

        {cta && ctaHref ? (
          <div className="mt-auto pt-6">
            <Link
              href={ctaHref}
              className={`inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-(--color-blue) px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(21,71,224,0.7)] transition-colors hover:bg-(--color-navy) group-hover:bg-(--color-navy) @min-[520px]:w-auto @min-[520px]:px-7 ${
                overlayLink ? "after:absolute after:inset-0 after:rounded-[28px] after:content-['']" : ""
              }`}
            >
              {cta.label}
              {cta.srSuffix ? <span className="sr-only">{cta.srSuffix}</span> : null}
              <ArrowUpRight
                size={18}
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
