import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contactInfo";

export default function WhatsAppButton() {
  return (
    <Link
      href={contactInfo.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Code & Motions on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-blue) shadow-[0_16px_32px_-12px_rgba(11,28,77,0.55)] transition-transform duration-300 hover:scale-105 hover:bg-(--color-ink) sm:bottom-6 sm:right-6"
    >
      <Image
        src="/images/whatsapp-icon.png"
        alt="WhatsApp"
        width={299}
        height={299}
        priority
        className="h-8 w-8 shrink-0"
      />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-(--color-ink) px-3 py-1.5 text-[12.5px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </Link>
  );
}
