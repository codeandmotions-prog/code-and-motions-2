import type { ComplexityLevel } from "@/lib/mvp-estimator/estimation";

type ComplexityMeterProps = {
  complexity: ComplexityLevel;
  totalPoints: number;
  maxPoints: number;
};

const TIERS: { level: ComplexityLevel; color: string }[] = [
  { level: "Low", color: "#22C55E" },
  { level: "Medium", color: "#F59E0B" },
  { level: "High", color: "#F97316" },
  { level: "Very High", color: "#EF4444" },
];

export default function ComplexityMeter({ complexity, totalPoints, maxPoints }: ComplexityMeterProps) {
  const activeIndex = TIERS.findIndex((t) => t.level === complexity);
  const activeColor = TIERS[activeIndex]?.color ?? TIERS[0].color;
  const fillPercent = maxPoints > 0 ? Math.min(100, Math.round((totalPoints / maxPoints) * 100)) : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border-8" style={{ borderColor: `${activeColor}33` }}>
        <span className="text-[13px] font-bold uppercase tracking-[0.06em]" style={{ color: activeColor }}>
          Complexity
        </span>
        <span className="mt-1 text-[19px] font-extrabold leading-tight text-(--color-ink)">{complexity}</span>
      </div>

      <div className="mt-4 flex w-full max-w-[220px] gap-1.5">
        {TIERS.map((tier, i) => (
          <span
            key={tier.level}
            className="h-2 flex-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: i <= activeIndex ? tier.color : "#E3E6F0" }}
          />
        ))}
      </div>
      <p className="mt-2.5 text-[11.5px] font-medium text-(--color-ink-soft)">
        {fillPercent}% scope intensity ({totalPoints}/{maxPoints} pts)
      </p>
    </div>
  );
}
