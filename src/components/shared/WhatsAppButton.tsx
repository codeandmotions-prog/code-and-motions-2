import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import { contactInfo } from "@/data/contactInfo";

export default function WhatsAppButton() {
  return (
    <Link
      href={contactInfo.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Code & Motions on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-blue) text-white shadow-[0_16px_32px_-12px_rgba(11,28,77,0.55)] transition-transform duration-300 hover:scale-105 hover:bg-(--color-ink) sm:bottom-6 sm:right-6"
    >
      <SocialIcon network="whatsapp" size={26} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-(--color-ink) px-3 py-1.5 text-[12.5px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </Link>
  );
}
