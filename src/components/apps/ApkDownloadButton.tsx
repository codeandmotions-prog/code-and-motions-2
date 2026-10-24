import { Download } from "lucide-react";
import { getApkUrl, type AppEntry } from "@/data/apps";

type ApkDownloadButtonProps = {
  app: AppEntry;
  /** "dark" sits on the navy hero, "light" on white or light-grey sections. */
  tone?: "dark" | "light";
  /** "start" left-aligns on wide screens; "center" always centers. */
  align?: "start" | "center";
  className?: string;
};

/**
 * Prominent Download APK button. It is only a link when the app entry has a
 * verified download URL; otherwise it renders as a disabled "Coming Soon"
 * button and never points anywhere.
 */
export default function ApkDownloadButton({ app, tone = "dark", align = "start", className = "" }: ApkDownloadButtonProps) {
  const url = getApkUrl(app);
  const base =
    "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[16px] font-bold transition-colors";
  const alignment = align === "center" ? "items-center" : "items-center sm:items-start";
  const meta = [app.apk?.version, app.apk?.size].filter(Boolean).join(" · ");

  if (url) {
    return (
      <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
        <a
          href={url}
          download
          rel="noopener noreferrer"
          className={`${base} bg-(--color-cyan) text-(--color-ink) hover:bg-white ${
            tone === "light" ? "hover:bg-(--color-ink) hover:text-white" : ""
          }`}
        >
          <Download size={19} aria-hidden="true" />
          Download APK
        </a>
        {meta && (
          <p className={`text-[13px] ${tone === "dark" ? "text-white/60" : "text-(--color-ink-soft)"}`}>
            {meta}
          </p>
        )}
      </div>
    );
  }

  const noteId = `apk-note-${app.slug}-${tone}`;
  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      <button
        type="button"
        disabled
        aria-describedby={noteId}
        data-apk-state="coming-soon"
        className={`${base} cursor-not-allowed ${
          tone === "dark"
            ? "border border-white/20 bg-white/10 text-white/70"
            : "border border-(--color-line) bg-(--color-surface) text-(--color-ink-soft)"
        }`}
      >
        <Download size={19} aria-hidden="true" />
        Download APK
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-bold uppercase tracking-[0.08em] ${
            tone === "dark" ? "bg-(--color-cyan) text-(--color-ink)" : "bg-(--color-blue) text-white"
          }`}
        >
          Coming Soon
        </span>
      </button>
      <p
        id={noteId}
        className={`text-[13px] ${tone === "dark" ? "text-white/60" : "text-(--color-ink-soft)"}`}
      >
        The download will be available here once the APK is verified.
      </p>
    </div>
  );
}
