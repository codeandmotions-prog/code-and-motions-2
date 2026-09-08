"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-[380px] w-[270px] shrink-0 snap-center-item flex-col justify-between overflow-hidden rounded-[28px] p-7 shadow-[0_30px_60px_-40px_rgba(11,28,77,0.5)] sm:h-[400px] sm:w-[290px]"
      style={{
        background: service.gradient,
        color: service.ink,
      }}
    >
      {/* faint brand streak lines, echoing the logo's motion motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 280 380"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-[0.18] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <rect x="0" y="120" width="180" height="14" rx="7" transform="rotate(-28 0 120)" fill="currentColor" />
        <rect x="20" y="90" width="140" height="14" rx="7" transform="rotate(-28 20 90)" fill="currentColor" />
        <rect x="40" y="60" width="90" height="12" rx="6" transform="rotate(-28 40 60)" fill="currentColor" />
      </svg>

      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(255,255,255,0.16)" }}
        >
          <Icon size={22} color={service.ink} strokeWidth={1.75} />
        </div>
        <span
          className="text-[13px] font-bold tracking-[0.05em]"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3 className="text-[21px] font-bold leading-snug">{service.title}</h3>
        <p
          className="mt-2.5 text-[14px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          {service.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold">
          Learn more
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.article>
  );
}
