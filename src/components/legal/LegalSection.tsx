import type { ReactNode } from "react";

type LegalSectionProps = {
  id: string;
  heading: string;
  children: ReactNode;
};

export default function LegalSection({ id, heading, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-(--color-line) py-9 first:border-t-0 first:pt-0">
      <h2 className="text-[20px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[22px]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-(--color-ink-soft) [&_a]:font-semibold [&_a]:text-(--color-blue) [&_a]:hover:underline [&_li]:leading-relaxed [&_strong]:text-(--color-ink) [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
