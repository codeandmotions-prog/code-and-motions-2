import { Info } from "lucide-react";
import type { ReactNode } from "react";

type LegalNoticeProps = {
  children: ReactNode;
};

/**
 * Neutral, clearly-labeled callout used at the top of policy pages whose
 * content is a general starting template. Keeps us from stating legal
 * facts (jurisdiction, exact retention periods, etc.) we can't confirm.
 */
export default function LegalNotice({ children }: LegalNoticeProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-(--color-line) bg-(--color-surface-raised) p-5">
      <Info size={18} className="mt-0.5 shrink-0 text-(--color-blue)" />
      <p className="text-[13.5px] leading-relaxed text-(--color-ink-soft)">{children}</p>
    </div>
  );
}
