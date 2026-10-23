import { shopThumbForWidth } from "@/data/shop";

/** next/image loaders for the pre-optimised files in /public/shop (no on-demand optimizer). */
export const thumbLoader = ({ src, width }: { src: string; width: number }) =>
  shopThumbForWidth(src, width);

export const fullLoader = ({ src }: { src: string }) => src;
