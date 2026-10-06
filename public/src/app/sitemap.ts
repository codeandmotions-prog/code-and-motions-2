import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/serviceCategories";
import { softwareProducts } from "@/data/softwareProducts";
import { aiSubServices } from "@/data/aiDevelopment";
import { getAllSubServiceParams } from "@/data/subServices";

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
      url: `${siteUrl}/tools`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/shopify-speed-checker`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/tools/woocommerce-to-shopify-migration-checker`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/tools/saas-mvp-cost-estimator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
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
    {
      url: `${siteUrl}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund-cancellation`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // /thank-you is intentionally excluded — it's a noindex, post-conversion
    // redirect target, not a public SEO landing page.
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceCategories.map((service) => ({
    url: `${siteUrl}/services/${service.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const aiSubServiceRoutes: MetadataRoute.Sitemap = aiSubServices.map((service) => ({
    url: `${siteUrl}/services/ai-development/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const softwareRoutes: MetadataRoute.Sitemap = softwareProducts.map((product) => ({
    url: `${siteUrl}/software/${product.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const subServiceRoutes: MetadataRoute.Sitemap = getAllSubServiceParams().map(({ slug, subSlug }) => ({
    url: `${siteUrl}/services/${slug}/${subSlug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...aiSubServiceRoutes, ...softwareRoutes, ...subServiceRoutes];
}
