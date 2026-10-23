/**
 * 3D Flex Wallpaper shop data.
 *
 * Every entry is a real design supplied by the business. Each design has
 * three pre-optimised WebP files under /public/shop (static assets only):
 *   thumbs-sm/  480px wide  (small cards)
 *   thumbs/     900px wide  (cards, social preview)
 *   full/       up to 1600px wide (lightbox and design page)
 * File names are descriptive: 3d-flex-wallpaper-<collection>-<code>.webp
 *
 * No prices, stock levels, ratings or reviews exist for these designs, so
 * none are modelled here.
 */

export type ShopCollectionId =
  | "collection-2025"
  | "royal-designs"
  | "polite-designs"
  | "more-designs";

export type ShopCollection = {
  id: ShopCollectionId;
  name: string;
  blurb: string;
};

export type ShopImage = {
  src: string;
  width: number;
  height: number;
};

export type ShopDesign = {
  slug: string;
  collection: ShopCollectionId;
  collectionName: string;
  /** Code printed on the design preview, e.g. "R-12" or "ROOM-07". */
  code: string;
  title: string;
  alt: string;
  thumb: ShopImage;
  full: ShopImage;
};

export const shopCollections: ShopCollection[] = [
  {
    id: "collection-2025",
    name: "Collection 2025",
    blurb:
      "A wide mix of looks, from soft florals and roses to marble, gold and slatted panels, each pairing a ceiling design with matching wall panels.",
  },
  {
    id: "royal-designs",
    name: "Royal Designs",
    blurb:
      "Ornate, classic looks with gold detailing and statement ceilings, shown with dark furniture for a rich, formal feel.",
  },
  {
    id: "polite-designs",
    name: "Polite Designs",
    blurb:
      "Marble, gold-accent, timber-slat and black-and-white schemes, all shown in the same warm-toned bedroom so the wall and ceiling designs are easy to compare.",
  },
  {
    id: "more-designs",
    name: "More Designs",
    blurb:
      "Additional 3D flex wallpaper room designs, shown here without a collection label.",
  },
];

// [collection, code, slug, thumbW, thumbH, fullW, fullH]
const rows: [ShopCollectionId, string, string, number, number, number, number][] = [
  ["collection-2025", "ROOM-01", "collection-2025-room-01", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-02", "collection-2025-room-02", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-03", "collection-2025-room-03", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-04", "collection-2025-room-04", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-05", "collection-2025-room-05", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-06", "collection-2025-room-06", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-07", "collection-2025-room-07", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-08", "collection-2025-room-08", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-09", "collection-2025-room-09", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-10", "collection-2025-room-10", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-11", "collection-2025-room-11", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-12", "collection-2025-room-12", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-13", "collection-2025-room-13", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-14", "collection-2025-room-14", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-15", "collection-2025-room-15", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-16", "collection-2025-room-16", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-17", "collection-2025-room-17", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-18", "collection-2025-room-18", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-19", "collection-2025-room-19", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-20", "collection-2025-room-20", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-21", "collection-2025-room-21", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-22", "collection-2025-room-22", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-23", "collection-2025-room-23", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-24", "collection-2025-room-24", 900, 615, 1440, 984],
  ["collection-2025", "ROOM-25", "collection-2025-room-25", 900, 615, 1440, 984],
  ["royal-designs", "R-01", "royal-designs-r-01", 900, 699, 1600, 1243],
  ["royal-designs", "R-02", "royal-designs-r-02", 900, 700, 1600, 1244],
  ["royal-designs", "R-03", "royal-designs-r-03", 900, 700, 1600, 1244],
  ["royal-designs", "R-04", "royal-designs-r-04", 900, 700, 1600, 1244],
  ["royal-designs", "R-05", "royal-designs-r-05", 900, 700, 1600, 1244],
  ["royal-designs", "R-06", "royal-designs-r-06", 900, 700, 1600, 1244],
  ["royal-designs", "R-07", "royal-designs-r-07", 900, 700, 1600, 1244],
  ["royal-designs", "R-08", "royal-designs-r-08", 900, 700, 1600, 1244],
  ["royal-designs", "R-09", "royal-designs-r-09", 900, 700, 1600, 1244],
  ["royal-designs", "R-10", "royal-designs-r-10", 900, 700, 1600, 1244],
  ["royal-designs", "R-11", "royal-designs-r-11", 900, 700, 1600, 1244],
  ["royal-designs", "R-12", "royal-designs-r-12", 900, 700, 1600, 1244],
  ["royal-designs", "R-13", "royal-designs-r-13", 900, 700, 1600, 1244],
  ["royal-designs", "R-14", "royal-designs-r-14", 900, 700, 1600, 1244],
  ["royal-designs", "R-15", "royal-designs-r-15", 900, 700, 1600, 1244],
  ["royal-designs", "R-16", "royal-designs-r-16", 900, 700, 1600, 1244],
  ["royal-designs", "R-17", "royal-designs-r-17", 900, 700, 1600, 1244],
  ["royal-designs", "R-18", "royal-designs-r-18", 900, 700, 1600, 1244],
  ["royal-designs", "R-19", "royal-designs-r-19", 900, 700, 1600, 1244],
  ["royal-designs", "R-20", "royal-designs-r-20", 900, 700, 1600, 1244],
  ["royal-designs", "R-21", "royal-designs-r-21", 900, 700, 1600, 1244],
  ["royal-designs", "R-22", "royal-designs-r-22", 900, 700, 1600, 1244],
  ["royal-designs", "R-23", "royal-designs-r-23", 900, 700, 1600, 1244],
  ["royal-designs", "R-24", "royal-designs-r-24", 900, 700, 1600, 1244],
  ["royal-designs", "R-25", "royal-designs-r-25", 900, 700, 1600, 1244],
  ["royal-designs", "R-51", "royal-designs-r-51", 900, 699, 1600, 1242],
  ["royal-designs", "R-52", "royal-designs-r-52", 900, 699, 1600, 1242],
  ["royal-designs", "R-53", "royal-designs-r-53", 900, 699, 1600, 1242],
  ["royal-designs", "R-54", "royal-designs-r-54", 900, 699, 1600, 1242],
  ["royal-designs", "R-55", "royal-designs-r-55", 900, 699, 1600, 1242],
  ["royal-designs", "R-56", "royal-designs-r-56", 900, 699, 1600, 1242],
  ["royal-designs", "R-57", "royal-designs-r-57", 900, 699, 1600, 1242],
  ["royal-designs", "R-58", "royal-designs-r-58", 900, 699, 1600, 1242],
  ["royal-designs", "R-59", "royal-designs-r-59", 900, 699, 1600, 1242],
  ["royal-designs", "R-60", "royal-designs-r-60", 900, 699, 1600, 1242],
  ["royal-designs", "R-61", "royal-designs-r-61", 900, 699, 1600, 1242],
  ["royal-designs", "R-62", "royal-designs-r-62", 900, 699, 1600, 1242],
  ["royal-designs", "R-63", "royal-designs-r-63", 900, 699, 1600, 1242],
  ["royal-designs", "R-64", "royal-designs-r-64", 900, 699, 1600, 1242],
  ["royal-designs", "R-65", "royal-designs-r-65", 900, 699, 1600, 1242],
  ["royal-designs", "R-66", "royal-designs-r-66", 900, 699, 1600, 1242],
  ["royal-designs", "R-67", "royal-designs-r-67", 900, 699, 1600, 1242],
  ["royal-designs", "R-68", "royal-designs-r-68", 900, 699, 1600, 1242],
  ["royal-designs", "R-69", "royal-designs-r-69", 900, 699, 1600, 1242],
  ["royal-designs", "R-70", "royal-designs-r-70", 900, 699, 1600, 1242],
  ["royal-designs", "R-71", "royal-designs-r-71", 900, 699, 1600, 1242],
  ["royal-designs", "R-72", "royal-designs-r-72", 900, 699, 1600, 1242],
  ["royal-designs", "R-73", "royal-designs-r-73", 900, 699, 1600, 1242],
  ["royal-designs", "R-74", "royal-designs-r-74", 900, 699, 1600, 1242],
  ["royal-designs", "R-75", "royal-designs-r-75", 900, 699, 1600, 1242],
  ["polite-designs", "ROOM-51", "polite-designs-room-51", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-52", "polite-designs-room-52", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-53", "polite-designs-room-53", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-54", "polite-designs-room-54", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-55", "polite-designs-room-55", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-56", "polite-designs-room-56", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-57", "polite-designs-room-57", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-58", "polite-designs-room-58", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-59", "polite-designs-room-59", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-60", "polite-designs-room-60", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-61", "polite-designs-room-61", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-62", "polite-designs-room-62", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-63", "polite-designs-room-63", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-64", "polite-designs-room-64", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-65", "polite-designs-room-65", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-66", "polite-designs-room-66", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-67", "polite-designs-room-67", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-68", "polite-designs-room-68", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-69", "polite-designs-room-69", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-70", "polite-designs-room-70", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-71", "polite-designs-room-71", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-72", "polite-designs-room-72", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-73", "polite-designs-room-73", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-74", "polite-designs-room-74", 900, 618, 1600, 1099],
  ["polite-designs", "ROOM-75", "polite-designs-room-75", 900, 618, 1600, 1099],
  ["more-designs", "No. 01", "more-designs-01", 900, 661, 980, 720],
  ["more-designs", "No. 02", "more-designs-02", 900, 661, 980, 720],
  ["more-designs", "No. 03", "more-designs-03", 900, 661, 980, 720],
  ["more-designs", "No. 04", "more-designs-04", 900, 661, 980, 720],
  ["more-designs", "No. 05", "more-designs-05", 900, 661, 980, 720],
  ["more-designs", "No. 06", "more-designs-06", 900, 661, 980, 720],
  ["more-designs", "No. 07", "more-designs-07", 900, 661, 980, 720],
  ["more-designs", "No. 08", "more-designs-08", 900, 661, 980, 720],
  ["more-designs", "No. 09", "more-designs-09", 900, 661, 980, 720],
  ["more-designs", "No. 10", "more-designs-10", 900, 661, 980, 720],
  ["more-designs", "No. 11", "more-designs-11", 900, 661, 980, 720],
  ["more-designs", "No. 12", "more-designs-12", 900, 661, 980, 720],
  ["more-designs", "No. 13", "more-designs-13", 900, 661, 980, 720],
  ["more-designs", "No. 14", "more-designs-14", 900, 661, 980, 720],
  ["more-designs", "No. 15", "more-designs-15", 900, 661, 980, 720],
];

const collectionName = new Map(shopCollections.map((c) => [c.id, c.name]));

export const shopDesigns: ShopDesign[] = rows.map(
  ([collection, code, slug, tw, th, fw, fh]) => {
    const name = collectionName.get(collection) ?? "";
    const file = `3d-flex-wallpaper-${slug}.webp`;
    return {
      slug,
      collection,
      collectionName: name,
      code,
      title: `${name} ${code}`,
      alt: `3D flex wallpaper design ${code} from ${name}, shown as a bedroom visualization with a patterned ceiling and wall panels`,
      thumb: { src: `/shop/thumbs/${file}`, width: tw, height: th },
      full: { src: `/shop/full/${file}`, width: fw, height: fh },
    };
  },
);

export const shopDesignBySlug = new Map(shopDesigns.map((d) => [d.slug, d]));

export function getShopDesign(slug: string): ShopDesign | undefined {
  return shopDesignBySlug.get(slug);
}

/** Thumbnail variants are generated at fixed widths; map a requested width to a file. */
export function shopThumbForWidth(src: string, width: number): string {
  return width <= 480 ? src.replace("/shop/thumbs/", "/shop/thumbs-sm/") : src;
}

export const SHOP_URL_PATH = "/shop";
export const shopPreviewImage = {
  src: "/shop/3d-flex-wallpaper-shop-preview.jpg",
  width: 1200,
  height: 630,
  alt: "A selection of 3D flex wallpaper bedroom designs from the Code & Motions shop",
};

/** 480px-wide card thumbnail with matching dimensions (used by server-rendered related links). */
export function shopSmallThumb(design: ShopDesign): ShopImage {
  return {
    src: design.thumb.src.replace("/shop/thumbs/", "/shop/thumbs-sm/"),
    width: 480,
    height: Math.round((design.thumb.height * 480) / design.thumb.width),
  };
}
