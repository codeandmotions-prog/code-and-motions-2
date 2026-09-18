export type SocialNetwork = "instagram" | "linkedin" | "x" | "dribbble" | "whatsapp";

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
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12 3.5a8 8 0 0 0-6.9 12l-1.1 4 4.2-1.1A8 8 0 1 0 12 3.5Z" />
          <path
            d="M8.8 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.4c-.1.1-.3.3-.1.6.2.4.8 1.2 1.6 2 .9.8 1.7 1.1 2 1.2.3.1.4 0 .6-.1l.4-.5c.2-.2.3-.2.5-.1l1.5.7c.2.1.3.2.4.3.1.2.1 1-.3 1.4-.4.5-1.4.9-2.4.6-1.6-.4-3.5-1.6-4.8-3-1.1-1.2-2-2.6-2.2-3.6-.2-.7 0-1.3.3-1.8Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    default:
      return null;
  }
}
