import Link from "next/link";
import type { AppEntry } from "@/data/apps";
import ApkDownloadButton from "./ApkDownloadButton";

export default function AppDownloadBand({ app }: { app: AppEntry }) {
  return (
    <section className="border-t border-(--color-line) bg-(--color-surface) py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[32px]">
          Get {app.name}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15.5px] leading-relaxed text-(--color-ink-soft)">
          Download the APK from this page only, so you know it is the official file.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <ApkDownloadButton app={app} tone="light" align="center" />
          <Link
            href="/apps"
            className="inline-flex min-h-11 items-center text-[14.5px] font-semibold text-(--color-blue) underline-offset-4 hover:underline"
          >
            Back to all apps
          </Link>
        </div>
      </div>
    </section>
  );
}
