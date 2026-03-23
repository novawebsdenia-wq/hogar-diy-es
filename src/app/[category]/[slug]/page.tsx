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
import { TableOfContents } from '@/components/TableOfContents'
import { extractHeadings } from '@/lib/headings'
import { AdBanner } from '@/components/AdBanner'
import { AffiliateCard } from '@/components/AffiliateCard'
import { ArticleSchema } from '@/components/ArticleSchema'

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

  const formattedDate = new Date(article.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <ArticleSchema article={article} isHowTo={isHowTo} />

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
            <span>Por <strong className="text-white/70">{article.author}</strong></span>
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
