import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { CATEGORIES, SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/politica-privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((category) => ({
    url: `${SITE_URL}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
