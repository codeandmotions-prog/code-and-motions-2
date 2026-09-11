import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/serviceCategories";
import { softwareProducts } from "@/data/softwareProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://codeandmotions.com";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/software`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceCategories.map((service) => ({
    url: `${siteUrl}/services/${service.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const softwareRoutes: MetadataRoute.Sitemap = softwareProducts.map((product) => ({
    url: `${siteUrl}/software/${product.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...softwareRoutes];
}
