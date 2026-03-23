import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles, type ArticleMeta } from "@/lib/mdx";
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroVideoSection } from "@/components/HeroVideoSection";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Bricolaje y Reparaciones del Hogar`,
  description: SITE_DESCRIPTION,
};

const CATEGORY_COLORS: Record<string, string> = {
  reparaciones: "border-blue-500 bg-blue-50",
  herramientas: "border-amber-500 bg-amber-50",
  reformas: "border-orange-500 bg-orange-50",
  jardin: "border-green-500 bg-green-50",
  "ahorro-energetico": "border-teal-500 bg-teal-50",
};

const CATEGORY_TEXT: Record<string, string> = {
  reparaciones: "text-blue-700",
  herramientas: "text-amber-700",
  reformas: "text-orange-700",
  jardin: "text-green-700",
  "ahorro-energetico": "text-teal-700",
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const rest = allArticles.slice(0, 7);

  return (
    <>
      {/* ── HERO — vídeo scroll-driven ── */}
      <HeroVideoSection />

      {/* ── TRUST STRIP ── */}
      <section className="border-b border-warm-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4">
            {[
              { icon: "📸", text: "Fotos del proceso real" },
              { icon: "⏱", text: "Tiempo estimado en cada guía" },
              { icon: "💶", text: "Coste de materiales incluido" },
              { icon: "⚠️", text: "Te avisamos si es mejor un técnico" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm font-medium text-amber-800"
              >
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES (Bento Grid) ── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">
              Explora por tema
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0f3d26]">
              ¿Qué necesitas reparar hoy?
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {Object.entries(CATEGORIES).map(
            ([slug, { label, description, emoji }], index) => {
              // Bento asimétrico: Las dos primeras categorías ocupan 3 columnas en Desktop (mitad y mitad).
              // Las demás (últimas 3) ocupan 2 columnas cada una (tercios).
              const colSpan =
                index < 2 ? "lg:col-span-3" : "lg:col-span-2 sm:col-span-2";
              // Obtenemos una portada representativa o un fallback
              const coverImage =
                allArticles.find((a) => a.category === slug && a.image)
                  ?.image || "/images/hero-bg.jpg";

              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 min-h-[350px] lg:min-h-[320px] ${colSpan} shadow-sm hover:shadow-2xl transition-shadow`}
                >
                  {/* Background Image Parallax */}
                  <Image
                    src={coverImage}
                    alt={`Fondo de ${label}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Overlays Gradient (Protege el texto) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d26]/90 via-[#0f3d26]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-auto">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-lg backdrop-blur-md border border-white/20 transition-colors duration-300 group-hover:bg-white/20">
                        {emoji}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                        {label}
                      </h3>
                      <p className="mb-5 text-sm font-medium leading-relaxed text-white/70 line-clamp-2 md:text-base">
                        {description}
                      </p>
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-900/30 transition-transform duration-300 ease-out group-hover:translate-x-1 hover:bg-amber-400">
                        Ver guías
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      </section>

      {/* ── LATEST ARTICLES ── */}
      {rest.length > 0 && (
        <section className="border-t border-warm-200 bg-warm-100 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">
                  Últimas guías
                </p>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#0f3d26]">
                  Recién publicado
                </h2>
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
            La próxima reparación que evites
            <br />
            <span className="text-amber-400">empieza aquí</span>
          </h2>
          <p className="mb-2 text-white/60">
            Cada semana, una guía práctica de bricolaje directamente en tu
            bandeja de entrada. El tipo de contenido que te ahorra 60-300€ por
            reparación.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-white/40">
            <span>✓ Sin tecnicismos</span>
            <span>✓ Materiales con precio</span>
            <span>✓ Tiempo estimado real</span>
          </div>
          <NewsletterForm />
          <p className="mt-4 text-xs text-white/30">
            Al suscribirte aceptas nuestra{" "}
            <a
              href="/politica-privacidad"
              className="underline hover:text-white/50"
            >
              política de privacidad
            </a>
            . Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* ── WHY HOGARDIY ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-[#0f3d26] px-8 py-12 text-white md:px-14 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">
                Por qué HogarDIY.es
              </p>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight">
                El vecino que sabe de todo,
                <br />
                <span className="text-amber-400">disponible 24h</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                Cada guía está escrita por alguien que ha hecho esa reparación
                de verdad, en un hogar de verdad. Sin tecnicismos innecesarios.
                Con los materiales exactos que necesitas y el tiempo real que
                lleva.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🛠",
                  title: "Probado en casa",
                  desc: "Cada guía viene de experiencia real",
                },
                {
                  icon: "💰",
                  title: "Cuánto ahorras",
                  desc: "Te decimos el coste de llamar al técnico",
                },
                {
                  icon: "📏",
                  title: "Nivel de dificultad",
                  desc: "Sabrás si puedes hacerlo antes de empezar",
                },
                {
                  icon: "🆓",
                  title: "Siempre gratis",
                  desc: "Sin suscripción ni registro requerido",
                },
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
  );
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  const category = CATEGORIES[article.category];
  const colorClass = CATEGORY_COLORS[article.category] ?? "border-gray-400";
  const textClass = CATEGORY_TEXT[article.category] ?? "text-gray-600";

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
        <div
          className={`relative flex h-48 items-center justify-center overflow-hidden border-l-4 ${colorClass}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-warm-100 to-warm-200 opacity-80" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "12px 12px",
            }}
          />
          <span className="relative z-10 text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
            {category?.emoji ?? "🏠"}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`mb-2 text-xs font-bold uppercase tracking-wide ${textClass}`}
        >
          {category?.emoji} {category?.label}
        </span>
        <h3 className="mb-2 line-clamp-2 font-extrabold leading-snug text-gray-900 group-hover:text-[#1a6640]">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {article.description}
        </p>
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
  );
}
