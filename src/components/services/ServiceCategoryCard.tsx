import type { ServiceCategory } from "@/data/serviceCategories";
import ServiceCardShell from "@/components/services/card/ServiceCardShell";
import { illustrationKeyFor } from "@/components/services/card/ServiceIllustration";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export default function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  return (
    <ServiceCardShell
      name={category.title}
      description={category.description}
      icon={category.icon}
      illustration={illustrationKeyFor(category.id, category.id)}
      chips={category.subServices}
      chipsLabel={`${category.title} includes`}
      href={`/services/${category.id}`}
      titleLink
      cta={{ label: "View Service" }}
    />
  );
}
