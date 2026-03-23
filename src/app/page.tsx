import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, type ArticleMeta } from '@/lib/mdx'
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { NewsletterForm } from '@/components/NewsletterForm'
import { HeroVideoSection } from '@/components/HeroVideoSection'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Bricolaje y Reparaciones del Hogar`,
  description: SITE_DESCRIPTION,
}

const CATEGORY_COLORS: Record<string, string> = {
  reparaciones:      'border-blue-500 bg-blue-50',
  herramientas:      'border-amber-500 bg-amber-50',
  reformas:          'border-orange-500 bg-orange-50',
  jardin:            'border-green-500 bg-green-50',
  'ahorro-energetico': 'border-teal-500 bg-teal-50',
}

const CATEGORY_TEXT: Record<string, string> = {
  reparaciones:      'text-blue-700',
  herramientas:      'text-amber-700',
  reformas:          'text-orange-700',
  jardin:            'text-green-700',
  'ahorro-energetico': 'text-teal-700',
}

export default function HomePage() {
  const allArticles = getAllArticles()
  const rest = allArticles.slice(0, 7)

  return (
    <>
      {/* ── HERO — vídeo scroll-driven ── */}
      <HeroVideoSection />

      {/* ── TRUST STRIP ── */}
      <section className="border-b border-warm-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4">
            {[
              { icon: '📸', text: 'Fotos del proceso real' },
              { icon: '⏱', text: 'Tiempo estimado en cada guía' },
              { icon: '💶', text: 'Coste de materiales incluido' },
              { icon: '⚠️', text: 'Te avisamos si es mejor un técnico' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-amber-800">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">Explora por tema</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0f3d26]">¿Qué necesitas reparar hoy?</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.entries(CATEGORIES).map(([slug, { label, description, emoji }]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className={`card-hover group flex flex-col gap-3 rounded-2xl border-l-4 bg-white p-5 shadow-sm ${CATEGORY_COLORS[slug] ?? 'border-gray-400 bg-gray-50'}`}
            >
              <span className="text-3xl">{emoji}</span>
              <div>
                <p className={`font-extrabold ${CATEGORY_TEXT[slug] ?? 'text-gray-700'}`}>{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{description}</p>
              </div>
              <p className={`mt-auto text-xs font-semibold ${CATEGORY_TEXT[slug] ?? 'text-gray-600'}`}>
                Ver guías →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST ARTICLES ── */}
      {rest.length > 0 && (
        <section className="border-t border-warm-200 bg-warm-100 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">Últimas guías</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#0f3d26]">Recién publicado</h2>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <section id="newsletter" className="bg-[#0f3d26] py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
            🔧 Gratis · Sin spam
          </span>
          <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">
            La próxima reparación que evites<br />
            <span className="text-amber-400">empieza aquí</span>
          </h2>
          <p className="mb-2 text-white/60">
            Cada semana, una guía práctica de bricolaje directamente en tu bandeja de entrada.
            El tipo de contenido que te ahorra 60-300€ por reparación.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-white/40">
            <span>✓ Sin tecnicismos</span>
            <span>✓ Materiales con precio</span>
            <span>✓ Tiempo estimado real</span>
          </div>
          <NewsletterForm />
          <p className="mt-4 text-xs text-white/30">
            Al suscribirte aceptas nuestra{' '}
            <a href="/politica-privacidad" className="underline hover:text-white/50">política de privacidad</a>.
            Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* ── WHY HOGARDIY ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-[#0f3d26] px-8 py-12 text-white md:px-14 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">Por qué HogarDIY.es</p>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight">
                El vecino que sabe de todo,<br />
                <span className="text-amber-400">disponible 24h</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                Cada guía está escrita por alguien que ha hecho esa reparación de verdad, en un hogar de verdad.
                Sin tecnicismos innecesarios. Con los materiales exactos que necesitas y el tiempo real que lleva.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛠', title: 'Probado en casa', desc: 'Cada guía viene de experiencia real' },
                { icon: '💰', title: 'Cuánto ahorras', desc: 'Te decimos el coste de llamar al técnico' },
                { icon: '📏', title: 'Nivel de dificultad', desc: 'Sabrás si puedes hacerlo antes de empezar' },
                { icon: '🆓', title: 'Siempre gratis', desc: 'Sin suscripción ni registro requerido' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-2xl bg-white/10 p-4">
                  <p className="mb-1 text-2xl">{icon}</p>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-white/60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  const category = CATEGORIES[article.category]
  const colorClass = CATEGORY_COLORS[article.category] ?? 'border-gray-400'
  const textClass = CATEGORY_TEXT[article.category] ?? 'text-gray-600'

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm"
    >
      {/* Image */}
      {article.image ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className={`flex h-48 items-center justify-center border-l-4 ${colorClass} text-5xl`}>
          {category?.emoji ?? '🏠'}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className={`mb-2 text-xs font-bold uppercase tracking-wide ${textClass}`}>
          {category?.emoji} {category?.label}
        </span>
        <h3 className="mb-2 line-clamp-2 font-extrabold leading-snug text-gray-900 group-hover:text-[#1a6640]">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-500">{article.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="rounded-full bg-warm-100 px-2.5 py-1 text-xs font-medium text-warm-700">
            ⏱ {article.readingTime} min
          </span>
          <span className="text-xs font-semibold text-amber-600 group-hover:text-amber-700">
            Leer →
          </span>
        </div>
      </div>
    </Link>
  )
}
