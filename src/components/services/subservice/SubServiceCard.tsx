import type { SubService } from "@/data/subServiceTypes";
import ServiceCardShell from "@/components/services/card/ServiceCardShell";
import { illustrationKeyFor } from "@/components/services/card/ServiceIllustration";

type SubServiceCardProps = {
  service: SubService;
  /** Parent main service slug — used to build the card's href. */
  mainSlug: string;
};

export default function SubServiceCard({ service, mainSlug }: SubServiceCardProps) {
  // Most sub-services get their own dedicated page; a few (e.g. AI Software
  // Development) deliberately reuse an existing dedicated page elsewhere on
  // the site via externalHref, rather than generating a near-duplicate.
  const href = service.externalHref ?? `/services/${mainSlug}/${service.slug}`;

  return (
    <ServiceCardShell
      name={service.name}
      description={service.shortDescription}
      icon={service.icon}
      illustration={illustrationKeyFor(service.slug, mainSlug)}
      chips={service.tags}
      href={href}
      titleLink
      cta={{ label: `Explore ${service.name}` }}
    />
  );
}
