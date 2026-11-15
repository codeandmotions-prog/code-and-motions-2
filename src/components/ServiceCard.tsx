import type { Service } from "@/data/services";
import ServiceCardShell from "@/components/services/card/ServiceCardShell";
import { illustrationKeyFor } from "@/components/services/card/ServiceIllustration";

type ServiceCardProps = {
  service: Service;
  index: number;
};

/**
 * Home-page carousel card. Fixed width so it sits in the horizontal scroller;
 * the shared card stacks at this width.
 */
export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div className="w-[300px] shrink-0 snap-center-item sm:w-[320px]">
      <ServiceCardShell
      name={service.title}
      description={service.description}
      icon={service.icon}
      illustration={illustrationKeyFor(service.id, service.id)}
      href={`/services/${service.id}`}
      cta={{ label: "Learn more" }}
      number={String(index + 1).padStart(2, "0")}
      />
    </div>
  );
}
