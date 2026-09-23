import Image from "next/image";
import Link from "next/link";

export default function VerifyHeader() {
  return (
    <header className="border-b border-(--color-line) bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/labnova-icon.png"
            alt=""
            width={420}
            height={414}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-[15px] font-bold text-(--color-ink)">LabNova</span>
        </div>

        <Link
          href="/software/labnova"
          className="text-[13px] font-medium text-(--color-ink-soft) transition-colors hover:text-(--color-ink)"
        >
          What is LabNova?
        </Link>
      </div>
    </header>
  );
}
