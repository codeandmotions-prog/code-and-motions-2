type ScoreRingProps = {
  score: number;
  label: string;
};

const CIRCUMFERENCE = 2 * Math.PI * 54;

export default function ScoreRing({ score, label }: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const color = clamped >= 80 ? "#22C55E" : clamped >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[132px] w-[132px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E3E6F0" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[32px] font-extrabold leading-none text-(--color-ink)">
            {clamped}
          </span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-(--color-ink-soft)">
            / 100
          </span>
        </div>
      </div>
      <span
        className="mt-3 rounded-full px-3.5 py-1 text-[12.5px] font-bold uppercase tracking-[0.08em]"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        {label}
      </span>
    </div>
  );
}
