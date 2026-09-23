type MotionStreaksProps = {
  className?: string;
};

/**
 * The diagonal, tapering streaks and play-triangle from the Code & Motions
 * mark, redrawn as a standalone signature graphic. This is the one bold,
 * brand-specific motif we reuse across the page (hero, section dividers)
 * instead of a generic gradient blob.
 */
export default function MotionStreaks({ className }: MotionStreaksProps) {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="streakBlue" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#1547E0" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="streakInk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0B1C4D" />
          <stop offset="100%" stopColor="#1547E0" />
        </linearGradient>
        <radialGradient id="triGrad" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7CE6F7" />
          <stop offset="100%" stopColor="#1547E0" />
        </radialGradient>
      </defs>

      {/* tapering diagonal streaks, longest to shortest */}
      <rect x="230" y="238" width="230" height="20" rx="10" transform="rotate(-28 230 238)" fill="url(#streakInk)" opacity="0.16" />
      <rect x="250" y="196" width="200" height="20" rx="10" transform="rotate(-28 250 196)" fill="url(#streakBlue)" opacity="0.35" />
      <rect x="270" y="154" width="165" height="20" rx="10" transform="rotate(-28 270 154)" fill="url(#streakBlue)" opacity="0.55" />
      <rect x="292" y="112" width="120" height="18" rx="9" transform="rotate(-28 292 112)" fill="url(#streakBlue)" opacity="0.75" />
      <rect x="316" y="72" width="70" height="16" rx="8" transform="rotate(-28 316 72)" fill="#22D3EE" opacity="0.9" />

      {/* play triangle, the brand's core symbol */}
      <circle cx="176" cy="228" r="150" fill="url(#triGrad)" opacity="0.08" />
      <path
        d="M120 130 L268 226 L120 322 Z"
        fill="url(#triGrad)"
      />
    </svg>
  );
}
