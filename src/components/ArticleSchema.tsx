import type { ArticleMeta } from '@/lib/mdx'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

interface Props {
  article: ArticleMeta
  isHowTo?: boolean
  faqs?: Array<{ question: string; answer: string }>
}

export function ArticleSchema({ article, isHowTo, faqs }: Props) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `${SITE_URL}${article.image}` : `${SITE_URL}/og/default.jpg`,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.category}/${article.slug}`,
    },
  }

  const howToSchema = isHowTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: article.title,
        description: article.description,
        image: article.image ? `${SITE_URL}${article.image}` : undefined,
      }
    : null

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null

  const schemas = [articleSchema, howToSchema, faqSchema].filter(Boolean)

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
