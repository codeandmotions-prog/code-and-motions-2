import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import SocialIcon, { type SocialNetwork } from "./SocialIcon";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Softwares", href: "/softwares" },
  { label: "Contact Us", href: "/contact" },
];

const social: { label: string; href: string; network: SocialNetwork }[] = [
  { label: "Instagram", href: "https://instagram.com", network: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", network: "linkedin" },
  { label: "X (Twitter)", href: "https://x.com", network: "x" },
  { label: "Dribbble", href: "https://dribbble.com", network: "dribbble" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-line) bg-(--color-surface)">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
          <div className="max-w-xs">
            <Image
              src="/images/logo-full.png"
              alt="Code & Motions — Design, Develop, Grow."
              width={1262}
              height={696}
              className="h-16 w-auto"
            />
            <p className="mt-5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
              A digital agency building websites, software and growth
              solutions for ambitious brands.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-(--color-ink)">Company</h3>
            <ul className="mt-4 space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[14.5px] text-(--color-ink-soft) transition-colors hover:text-(--color-ink)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-(--color-ink)">Services</h3>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href="#services"
                    className="text-[14.5px] text-(--color-ink-soft) transition-colors hover:text-(--color-ink)"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-(--color-ink)">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-[14.5px] text-(--color-ink-soft)">
              <li>
                <Link href="mailto:hello@codeandmotions.com" className="hover:text-(--color-ink)">
                  hello@codeandmotions.com
                </Link>
              </li>
              <li>
                <Link href="tel:+10000000000" className="hover:text-(--color-ink)">
                  +1 (000) 000-0000
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {social.map(({ label, href, network }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink-soft) transition-colors hover:border-(--color-ink) hover:text-(--color-ink)"
                >
                  <SocialIcon network={network} size={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-(--color-line) pt-8 text-[13.5px] text-(--color-ink-soft) sm:flex-row">
          <p>© {year} Code & Motions. All rights reserved.</p>
          <p>Design, Develop, Grow.</p>
        </div>
      </div>
    </footer>
  );
}
