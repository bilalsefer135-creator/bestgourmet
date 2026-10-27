import type { MetadataRoute } from "next";
import { wholesaleCategories } from "@/lib/catalog-seo";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/urunler/cafe",
    "/urunler/pastane",
    "/hikayemiz",
    "/referanslar",
    "/etkinlikler",
    "/etkinlikler/dugun",
    "/etkinlikler/dogum-gunu",
    "/etkinlikler/ozel-gun",
    "/etkinlikler/kurumsal",
    ...wholesaleCategories.map((category) => category.href),
    "/rehber",
    ...guides.map((guide) => `/rehber/${guide.slug}`),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}
