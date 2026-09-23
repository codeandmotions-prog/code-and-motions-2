import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { contactInfo } from "@/data/contactInfo";

export default function ResultsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 overflow-hidden rounded-[24px] bg-(--color-navy-deep) p-7 text-center sm:p-9"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(110% 140% at 50% 0%, #14245c 0%, #0b1c4d 50%, #060d24 100%)",
        }}
      />
      <div className="relative">
        <h3 className="text-[22px] font-extrabold leading-snug text-white sm:text-[26px]">
          Want to Improve Your Shopify Store?
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">
          If this report flagged app bloat, render-blocking scripts, or a slow server response, our
          Shopify development team can fix it — removing unnecessary app and script bloat and
          optimizing your store for real-world speed.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/services/shopify-development"
            className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
          >
            Talk to Our Shopify Team
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href={contactInfo.whatsappConsultationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:border-white"
          >
            <Image src="/images/whatsapp-icon.png" alt="" width={299} height={299} className="h-[18px] w-[18px]" />
            WhatsApp Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
