import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { symptoms } from "@/lib/content/symptoms";
import { conditions } from "@/lib/content/conditions";
import { tests } from "@/lib/content/tests";
import { specialists } from "@/lib/content/specialists";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/care"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/screening"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/symptoms"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/conditions"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/tests"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/specialists"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/for-referrers"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/book"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/accessibility"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...symptoms.map((s) => ({
      url: url(`/symptoms/${s.slug}`),
      lastModified: new Date(s.review.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...conditions.map((c) => ({
      url: url(`/conditions/${c.slug}`),
      lastModified: new Date(c.review.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tests.map((t) => ({
      url: url(`/tests/${t.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...specialists.map((s) => ({
      url: url(`/specialists/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
