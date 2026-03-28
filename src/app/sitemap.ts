import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { CATEGORIES, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Página inicial
  const routes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 2. Páginas de Categorías
  const categoryRoutes = Object.keys(CATEGORIES).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Páginas de Artículos (Guías)
  const articles = getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes, ...articleRoutes];
}
