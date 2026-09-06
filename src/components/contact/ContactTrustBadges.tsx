import { ShieldCheck, Users, Zap } from "lucide-react";

const badges = [
  {
    icon: Zap,
    title: "Quick Response",
    description: "We usually reply within 24 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Partner",
    description: "Your information is always safe with us.",
  },
  {
    icon: Users,
    title: "Let's Grow Together",
    description: "We're excited to be part of your journey.",
  },
];

export default function ContactTrustBadges() {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
      {badges.map(({ icon: Icon, title, description }) => (
        <div key={title} className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-blue)/10">
            <Icon size={20} className="text-(--color-blue)" strokeWidth={1.9} />
          </span>
          <h3 className="mt-4 text-[16px] font-bold text-(--color-ink)">{title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-(--color-ink-soft)">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
