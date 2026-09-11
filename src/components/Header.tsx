"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Software", href: "/software" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_1px_0_0_rgba(15,20,40,0.06),0_8px_24px_-16px_rgba(15,20,40,0.25)]" : ""
      }`}
    >
      <div
        className={`border-b border-(--color-line) transition-colors duration-300 ${
          isScrolled ? "border-transparent" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-300 lg:px-10 h-20 lg:h-24">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Code & Motions home">
            <Image
              src="/images/logo-header.png"
              alt="Code & Motions"
              width={1262}
              height={610}
              priority
              className="h-9 w-auto lg:h-11"
            />
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-9" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-(--color-ink-soft) transition-colors hover:text-(--color-ink)"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="#start-a-project"
              className="inline-flex items-center rounded-full bg-(--color-ink) px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-blue)"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-full p-2 text-(--color-ink) lg:hidden"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-(--color-line) bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-[17px] font-medium text-(--color-ink-soft) transition-colors hover:bg-(--color-surface) hover:text-(--color-ink)"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#start-a-project"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-(--color-ink) px-6 py-3.5 text-[16px] font-semibold text-white"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
