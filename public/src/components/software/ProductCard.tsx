import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SoftwareProduct } from "@/data/softwareProducts";

type ProductCardProps = {
  product: SoftwareProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-(--color-line) bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(15,20,40,0.35)]">
      <div
        className="relative flex h-[180px] items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${product.accentColor} 0%, #0B1C4D 100%)`,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 280 180"
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-[0.16] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <rect x="0" y="90" width="180" height="14" rx="7" transform="rotate(-28 0 90)" fill="#fff" />
          <rect x="20" y="60" width="140" height="14" rx="7" transform="rotate(-28 20 60)" fill="#fff" />
          <rect x="40" y="30" width="90" height="12" rx="6" transform="rotate(-28 40 30)" fill="#fff" />
        </svg>

        <Image
          src={product.logoIcon}
          alt=""
          width={420}
          height={414}
          className="relative h-20 w-20 rounded-3xl shadow-[0_20px_40px_-16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[22px] font-bold text-(--color-ink)">{product.name}</h3>
        <p className="mt-1 text-[14px] font-semibold" style={{ color: product.accentColor }}>
          {product.tagline}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-(--color-ink-soft)">
          {product.shortDescription}
        </p>

        <div className="mt-6 pt-1">
          <Link
            href={`/software/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--color-ink)"
          >
            Explore {product.name}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
