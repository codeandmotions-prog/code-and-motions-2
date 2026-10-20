import Link from "next/link";
import type { ReactNode } from "react";

const LINK_SOURCE = "\\[([^\\]]+)\\]\\((\\/[^)\\s]*)\\)";

/**
 * Renders a plain string, turning internal links written as
 * [label](/path) into next/link anchors. Only root-relative paths are
 * accepted, so content files cannot introduce external links by accident.
 */
export default function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const LINK_PATTERN = new RegExp(LINK_SOURCE, "g");

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="font-semibold text-(--color-blue) underline decoration-(--color-blue)/30 underline-offset-4 transition-colors hover:decoration-(--color-blue)"
      >
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
