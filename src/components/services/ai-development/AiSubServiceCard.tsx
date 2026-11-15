import type { AiSubService } from "@/data/aiDevelopment";
import ServiceCardShell from "@/components/services/card/ServiceCardShell";
import { illustrationKeyFor } from "@/components/services/card/ServiceIllustration";

type AiSubServiceCardProps = {
  service: AiSubService;
};

export default function AiSubServiceCard({ service }: AiSubServiceCardProps) {
  const href = `/services/ai-development/${service.slug}`;

  return (
    <ServiceCardShell
      name={service.name}
      description={service.shortDescription}
      icon={service.icon}
      illustration={illustrationKeyFor(service.slug, "ai-development")}
      chips={service.tags}
      href={href}
      titleLink
      cta={{ label: `Explore ${service.name}` }}
    />
  );
}
