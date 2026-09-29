import Link from "next/link";

type LegalTableOfContentsProps = {
  items: { id: string; label: string }[];
};

export default function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-(--color-line) bg-white p-5 sm:p-6">
      <h2 className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">On This Page</h2>
      <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="flex items-baseline gap-2 text-[13.5px] text-(--color-ink-soft) transition-colors hover:text-(--color-blue)"
            >
              <span className="text-[12px] font-bold text-(--color-blue)">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
