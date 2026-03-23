import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getArticle, getAllArticles, getRelatedArticles } from '@/lib/mdx'
import { CATEGORIES, SITE_NAME, SITE_URL } from '@/lib/constants'
import { getAuthor } from '@/lib/authors'
import { TableOfContents } from '@/components/TableOfContents'
import { extractHeadings } from '@/lib/headings'
import { AdBanner } from '@/components/AdBanner'
import { AffiliateCard } from '@/components/AffiliateCard'
import { ArticleSchema } from '@/components/ArticleSchema'
import { NewsletterMidCTA } from '@/components/NewsletterMidCTA'
import { FAQSchema } from '@/components/FAQSchema'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const article = getArticle(category, slug)
  if (!article) return {}

  const ogImage = article.image ?? '/og/default.jpg'

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.description,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/${category}/${slug}`,
      images: [{ url: ogImage }],
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  }
}

const MDX_COMPONENTS = {
  AffiliateCard,
  AdBanner,
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params
  const article = getArticle(category, slug)
  if (!article) notFound()

  const cat = CATEGORIES[category]
  const related = getRelatedArticles(article)
  const headings = extractHeadings(article.content)
  const isHowTo = article.title.toLowerCase().includes('cómo')
  const author = getAuthor(article.author)

  // Extraer FAQs del contenido MDX (sección "## Preguntas frecuentes")
  const faqItems = (() => {
    const faqMatch = article.content.match(/##\s*Preguntas frecuentes\n([\s\S]*)$/)
    if (!faqMatch) return []
    const faqBlock = faqMatch[1]
    const pairs: { q: string; a: string }[] = []
    const qRegex = /\*\*(.+?)\*\*\n([\s\S]+?)(?=\n\*\*|\n---|\n##|$)/g
    let m: RegExpExecArray | null
    while ((m = qRegex.exec(faqBlock)) !== null) {
      pairs.push({ q: m[1].trim(), a: m[2].trim() })
    }
    return pairs
  })()

  const formattedDate = new Date(article.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: cat?.label ?? category, item: `${SITE_URL}/${category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/${category}/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleSchema article={article} isHowTo={isHowTo} />
      {faqItems.length > 0 && <FAQSchema items={faqItems} />}

      {/* Article hero */}
      <div className="bg-[#0f3d26] py-10 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <nav className="mb-5 text-sm text-white/40">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/${category}`} className="hover:text-white">{cat?.label}</Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 text-white/70">{article.title}</span>
          </nav>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link href={`/${category}`} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white hover:bg-white/25">
              {cat?.emoji} {cat?.label}
            </Link>
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>
            ))}
          </div>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            {article.title}
          </h1>
          <p className="mb-5 text-lg text-white/70">{article.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
            {author ? (
              <Link href={`/autor/${author.slug}`} className="flex items-center gap-2 group">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white transition-opacity group-hover:opacity-80"
                  style={{ backgroundColor: author.color }}
                >
                  {author.initials}
                </span>
                <strong className="text-white/70 group-hover:text-white transition-colors">{author.name}</strong>
              </Link>
            ) : (
              <span>Por <strong className="text-white/70">{article.author}</strong></span>
            )}
            <span>·</span>
            <time dateTime={article.date}>{formattedDate}</time>
            {article.updated && article.updated !== article.date && (
              <><span>·</span><span>Act. {new Date(article.updated).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}</span></>
            )}
            <span>·</span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-amber-300">⏱ {article.readingTime} min</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Article */}
          <article>
            {/* Cover image */}
            {article.image && (
              <div className="relative -mx-4 mb-8 h-64 overflow-hidden sm:mx-0 sm:rounded-2xl md:h-96">
                <Image src={article.image} alt={article.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
              </div>
            )}

            {/* TOC mobile */}
            <div className="mb-8 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            <AdBanner slot="top-article" />

            <NewsletterMidCTA />

            <div className="prose-hogar">
              <MDXRemote
                source={article.content}
                components={MDX_COMPONENTS}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                  },
                }}
              />
            </div>

            <AdBanner slot="bottom-article" />

            {/* Bloque de autor */}
            {author && (
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <Link href={`/autor/${author.slug}`} className="shrink-0">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow"
                    style={{ backgroundColor: author.color }}
                  >
                    {author.initials}
                  </span>
                </Link>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Escrito por</p>
                  <Link href={`/autor/${author.slug}`} className="font-extrabold text-gray-900 hover:text-[#1a6640]">
                    {author.name}
                  </Link>
                  <p className="text-xs text-gray-500">{author.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600 line-clamp-2">{author.bio}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <span className="text-xl">ℹ️</span>
              <p className="text-xs leading-relaxed text-amber-800">
                <strong>Aviso de afiliado:</strong> Este artículo contiene enlaces de afiliado a Amazon. Si compras a través de ellos, recibimos una pequeña comisión sin coste adicional para ti.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <TableOfContents headings={headings} />
              <AdBanner slot="sidebar" format="rectangle" />
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-warm-200 pt-12">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">Sigue leyendo</p>
            <h2 className="mb-6 text-xl font-extrabold text-[#0f3d26]">Guías relacionadas</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.category}/${rel.slug}`}
                  className="card-hover group rounded-2xl border border-warm-200 bg-white p-4 shadow-sm"
                >
                  <p className="line-clamp-2 text-sm font-bold text-gray-800 group-hover:text-[#1a6640]">{rel.title}</p>
                  <p className="mt-2 text-xs text-amber-600">⏱ {rel.readingTime} min →</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
