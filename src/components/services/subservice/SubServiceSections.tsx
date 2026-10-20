import { Check } from "lucide-react";
import type { SubServiceSection } from "@/data/subServiceTypes";
import RichText from "./RichText";

type Bullets = { title?: string; text: string }[];

function BulletList({ bullets }: { bullets: Bullets }) {
  return (
    <ul className="mt-5 space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet.title ?? bullet.text} className="flex items-start gap-3">
          <Check
            size={16}
            strokeWidth={2.5}
            className="mt-1.5 shrink-0 text-(--color-blue)"
            aria-hidden="true"
          />
          <p className="text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            {bullet.title && (
              <span className="font-semibold text-(--color-ink)">{bullet.title}. </span>
            )}
            <RichText text={bullet.text} />
          </p>
        </li>
      ))}
    </ul>
  );
}

type SubServiceSectionsProps = {
  sections: SubServiceSection[];
  /** "soft" uses the light grey surface, "light" uses white. */
  tone?: "soft" | "light";
};

/**
 * Plain, server-rendered long-form article content. No client JS and no
 * collapsed or tabbed content: every paragraph is present in the HTML
 * for readers and crawlers alike.
 */
export default function SubServiceSections({ sections, tone = "light" }: SubServiceSectionsProps) {
  const bg =
    tone === "soft"
      ? "bg-(--color-surface)"
      : "border-b border-(--color-line) bg-(--color-surface-raised)";

  return (
    <section className={`${bg} py-14 lg:py-20`}>
      <div className="mx-auto max-w-3xl space-y-14 px-6 lg:px-10">
        {sections.map((section) => (
          <article key={section.heading}>
            <h2 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.01em] text-(--color-ink) sm:text-[30px]">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-5 text-[16px] leading-[1.75] text-(--color-ink-soft)"
              >
                <RichText text={paragraph} />
              </p>
            ))}
            {section.bullets && <BulletList bullets={section.bullets} />}
            {section.subsections?.map((sub) => (
              <div key={sub.heading} className="mt-9">
                <h3 className="text-[19px] font-bold text-(--color-ink)">{sub.heading}</h3>
                {sub.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-3 text-[16px] leading-[1.75] text-(--color-ink-soft)"
                  >
                    <RichText text={paragraph} />
                  </p>
                ))}
                {sub.bullets && <BulletList bullets={sub.bullets} />}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
