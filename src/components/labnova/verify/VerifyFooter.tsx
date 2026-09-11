import Image from "next/image";
import Link from "next/link";

export default function VerifyFooter() {
  return (
    <footer className="border-t border-(--color-line) bg-(--color-surface) py-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 text-center">
        <div className="flex items-center gap-2 text-[13px] font-medium text-(--color-ink-soft)">
          <span>Powered by</span>
          <Image
            src="/images/labnova-icon.png"
            alt="LabNova"
            width={420}
            height={414}
            className="h-4 w-4 rounded-[4px]"
          />
          <span className="font-semibold text-(--color-ink)">LabNova</span>
          <span aria-hidden="true">·</span>
          <span>
            Created by{" "}
            <Link
              href="/"
              className="font-semibold text-(--color-ink) transition-colors hover:text-(--color-blue)"
            >
              Code &amp; Motions
            </Link>
          </span>
        </div>
        <p className="max-w-md text-[12px] leading-relaxed text-(--color-ink-soft)/80">
          This page confirms the authenticity of a LabNova-generated report.
          It does not display clinical test results.
        </p>
      </div>
    </footer>
  );
}
