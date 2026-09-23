type LabNovaVisualProps = {
  className?: string;
};

/**
 * An abstract, illustrative representation of the LabNova dashboard —
 * built from shapes, not a fabricated screenshot of a real UI. Reused
 * across the homepage "Featured Software" section and the /software
 * hero/about sections so the product has one consistent visual identity.
 */
export default function LabNovaVisual({ className }: LabNovaVisualProps) {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="labnovaPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0070FE" />
          <stop offset="100%" stopColor="#0B1C4D" />
        </linearGradient>
        <linearGradient id="labnovaAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0070FE" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* base card */}
      <rect x="20" y="20" width="440" height="360" rx="28" fill="white" stroke="#E3E6F0" strokeWidth="2" />

      {/* top bar */}
      <rect x="20" y="20" width="440" height="56" rx="28" fill="url(#labnovaPanel)" />
      <rect x="20" y="48" width="440" height="28" fill="url(#labnovaPanel)" />
      <circle cx="50" cy="48" r="6" fill="white" opacity="0.9" />
      <rect x="70" y="42" width="90" height="12" rx="6" fill="white" opacity="0.55" />
      <rect x="380" y="42" width="56" height="12" rx="6" fill="white" opacity="0.35" />

      {/* stat cards row */}
      <rect x="40" y="100" width="120" height="72" rx="16" fill="#F5F6FA" />
      <rect x="56" y="116" width="40" height="10" rx="5" fill="#0070FE" opacity="0.8" />
      <rect x="56" y="136" width="70" height="16" rx="6" fill="#0B1C4D" opacity="0.85" />

      <rect x="172" y="100" width="120" height="72" rx="16" fill="#F5F6FA" />
      <rect x="188" y="116" width="40" height="10" rx="5" fill="#22D3EE" opacity="0.9" />
      <rect x="188" y="136" width="70" height="16" rx="6" fill="#0B1C4D" opacity="0.85" />

      <rect x="304" y="100" width="136" height="72" rx="16" fill="#F5F6FA" />
      <rect x="320" y="116" width="40" height="10" rx="5" fill="#0070FE" opacity="0.8" />
      <rect x="320" y="136" width="88" height="16" rx="6" fill="#0B1C4D" opacity="0.85" />

      {/* bar chart */}
      <rect x="40" y="196" width="216" height="164" rx="16" fill="#F5F6FA" />
      <rect x="60" y="300" width="20" height="40" rx="6" fill="url(#labnovaAccent)" opacity="0.55" />
      <rect x="90" y="270" width="20" height="70" rx="6" fill="url(#labnovaAccent)" opacity="0.7" />
      <rect x="120" y="240" width="20" height="100" rx="6" fill="url(#labnovaAccent)" opacity="0.85" />
      <rect x="150" y="260" width="20" height="80" rx="6" fill="url(#labnovaAccent)" opacity="0.7" />
      <rect x="180" y="220" width="20" height="120" rx="6" fill="url(#labnovaAccent)" />
      <rect x="210" y="250" width="20" height="90" rx="6" fill="url(#labnovaAccent)" opacity="0.8" />

      {/* list rows */}
      <rect x="272" y="196" width="168" height="164" rx="16" fill="#F5F6FA" />
      <rect x="288" y="214" width="136" height="28" rx="10" fill="white" />
      <circle cx="304" cy="228" r="6" fill="#0070FE" />
      <rect x="320" y="223" width="80" height="10" rx="5" fill="#384057" opacity="0.6" />

      <rect x="288" y="250" width="136" height="28" rx="10" fill="white" />
      <circle cx="304" cy="264" r="6" fill="#22D3EE" />
      <rect x="320" y="259" width="80" height="10" rx="5" fill="#384057" opacity="0.6" />

      <rect x="288" y="286" width="136" height="28" rx="10" fill="white" />
      <circle cx="304" cy="300" r="6" fill="#0070FE" />
      <rect x="320" y="295" width="60" height="10" rx="5" fill="#384057" opacity="0.6" />

      <rect x="288" y="322" width="136" height="24" rx="10" fill="white" />
      <circle cx="304" cy="334" r="6" fill="#22D3EE" />
      <rect x="320" y="330" width="70" height="10" rx="5" fill="#384057" opacity="0.6" />
    </svg>
  );
}
