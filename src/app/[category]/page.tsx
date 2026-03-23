import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getArticlesByCategory } from '@/lib/mdx'
import { CATEGORIES, SITE_NAME } from '@/lib/constants'

interface Props {
  params: Promise<{ category: string }>
}

const CATEGORY_BADGE: Record<string, string> = {
  reparaciones:        'bg-blue-100 text-blue-700',
  herramientas:        'bg-amber-100 text-amber-700',
  reformas:            'bg-orange-100 text-orange-700',
  jardin:              'bg-green-100 text-green-700',
  'ahorro-energetico': 'bg-teal-100 text-teal-700',
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES[category]
  if (!cat) return {}
  return {
    title: `${cat.label} | ${SITE_NAME}`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORIES[category]
  if (!cat) notFound()

  const articles = getArticlesByCategory(category)
  const badgeClass = CATEGORY_BADGE[category] ?? 'bg-white/20 text-white'

  return (
    <div>
      {/* Category hero */}
      <div className="bg-[#0f3d26] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="mb-5 text-sm text-white/50">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cat.label}</span>
          </nav>
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-lg backdrop-blur-sm">
              {cat.emoji}
            </span>
            <div>
              <span className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
                {cat.label}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{cat.label}</h1>
              <p className="mt-1 text-white/70">{cat.description}</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/50">
            {articles.length} {articles.length === 1 ? 'guía publicada' : 'guías publicadas'}
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-warm-300 p-16 text-center">
            <p className="text-3xl">🚧</p>
            <p className="mt-3 font-bold text-gray-700">Guías en preparación</p>
            <p className="mt-1 text-sm text-gray-400">Estamos escribiendo las guías de esta categoría. Vuelve pronto.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${category}/${article.slug}`}
                className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm"
              >
                {article.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-[#0f3d26] text-5xl opacity-90">
                    {cat.emoji}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="mb-2 line-clamp-2 font-extrabold leading-snug text-gray-900 group-hover:text-[#1a6640]">
                    {article.title}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">{article.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="rounded-full bg-warm-100 px-2.5 py-1 text-xs font-medium text-warm-700">
                      ⏱ {article.readingTime} min
                    </span>
                    <time className="text-xs text-gray-400">
                      {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
