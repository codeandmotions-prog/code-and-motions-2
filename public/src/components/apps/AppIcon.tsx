import Image from "next/image";
import { Smartphone } from "lucide-react";
import type { AppEntry } from "@/data/apps";

type AppIconProps = {
  app: Pick<AppEntry, "name" | "icon" | "accentColor">;
  /** Tailwind size + radius classes, e.g. "h-20 w-20 rounded-3xl". */
  className?: string;
  glyphSize?: number;
};

/** The app's icon image, or a neutral phone glyph until an icon is provided. */
export default function AppIcon({ app, className = "h-20 w-20 rounded-3xl", glyphSize = 36 }: AppIconProps) {
  if (app.icon) {
    return (
      <Image
        src={app.icon.src}
        alt={`${app.name} icon`}
        width={app.icon.width}
        height={app.icon.height}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={`${app.name} icon placeholder`}
      className={`inline-flex items-center justify-center bg-white/15 text-white ring-1 ring-white/25 ${className}`}
    >
      <Smartphone size={glyphSize} aria-hidden="true" />
    </span>
  );
}
