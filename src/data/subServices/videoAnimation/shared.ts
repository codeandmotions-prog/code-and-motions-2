import type { SubServiceHeroCtas } from "../../subServiceTypes";

/** Hero CTAs shared by the video and animation sub-service pages. */
export const videoHeroCtas: SubServiceHeroCtas = {
  primary: { label: "Book a Free Call", href: "/contact" },
  secondary: { label: "All Video & Animation Services", href: "/services/video-animation" },
};

/**
 * Markets named in the Service structured data of the video pages. These are
 * the markets the business has confirmed it serves.
 */
export const videoAreaServed = [
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "United Arab Emirates",
  "Saudi Arabia",
  "Europe",
  "Middle East",
];

/** Base path of every video and animation sub-service page. */
export const videoBase = "/services/video-animation";
