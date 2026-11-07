// Floating WhatsApp contact button, mounted once in the root layout.
// Uses the official WhatsApp glyph (Simple Icons, CC0) on WhatsApp green.
const WHATSAPP_NUMBER = "61494113866"; // +61 494 113 866
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Code & Motions on WhatsApp (opens in a new tab)"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_-10px_rgba(37,211,102,0.6),0_6px_14px_-6px_rgba(6,13,36,0.45)] ring-2 ring-white/90 transition-transform duration-300 hover:scale-105 hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-blue) sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:h-16 sm:w-16"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40 motion-safe:animate-ping [animation-duration:2.8s]"
      />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="relative h-8 w-8 fill-current sm:h-9 sm:w-9"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-(--color-ink) px-3 py-1.5 text-[12.5px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
