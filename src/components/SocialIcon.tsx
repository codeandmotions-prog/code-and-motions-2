export type SocialNetwork = "instagram" | "linkedin" | "x" | "dribbble";

type SocialIconProps = {
  network: SocialNetwork;
  size?: number;
  className?: string;
};

/**
 * Small, self-drawn line icons for the social links in the footer.
 * Kept in-house (instead of a brand-icon package) so the icon set stays
 * consistent with the rest of the interface's stroke weight and style.
 */
export default function SocialIcon({ network, size = 18, className }: SocialIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (network) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
          <circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
          <path d="M11.5 16.5v-3.6a2.4 2.4 0 0 1 4.8 0v3.6" />
          <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M4.5 9.5c4 1.4 9.5 1.6 14 0.3" />
          <path d="M9 4c2.6 3.2 4.2 7.6 4.4 15.8" />
          <path d="M6.2 18.8c2.6-3.6 6-5.4 12.4-4.8" />
        </svg>
      );
    default:
      return null;
  }
}
