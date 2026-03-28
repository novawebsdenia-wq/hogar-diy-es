import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getArticle, getAllArticles, getRelatedArticles } from "@/lib/mdx";
import { CATEGORIES, SITE_NAME, SITE_URL } from "@/lib/constants";
import { getAuthor } from "@/lib/authors";
import { TableOfContents } from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/headings";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateCard } from "@/components/AffiliateCard";
import { ArticleSchema } from "@/components/ArticleSchema";
import { NewsletterMidCTA } from "@/components/NewsletterMidCTA";
import { FAQSchema } from "@/components/FAQSchema";
import { GuiaRecomendada } from "@/components/GuiaRecomendada";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};

  const ogImage = article.image ?? "/og/default.jpg";

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.description,
    alternates: { canonical: `${SITE_URL}/${category}/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/${category}/${slug}`,
      images: [{ url: ogImage }],
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

const MDX_COMPONENTS = {
  AffiliateCard,
  AdBanner,
  GuiaRecomendada,
};

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const cat = CATEGORIES[category];
  const related = getRelatedArticles(article);
  const headings = extractHeadings(article.content);
  const isHowTo = article.title.toLowerCase().includes("cómo");
  const author = getAuthor(article.author);

  // Extraer FAQs del contenido MDX (sección "## Preguntas frecuentes")
  const faqItems = (() => {
    const faqMatch = article.content.match(
      /##\s*Preguntas frecuentes\n([\s\S]*)$/,
    );
    if (!faqMatch) return [];
    const faqBlock = faqMatch[1];
    const pairs: { q: string; a: string }[] = [];
    const qRegex = /\*\*(.+?)\*\*\n([\s\S]+?)(?=\n\*\*|\n---|\n##|$)/g;
    let m: RegExpExecArray | null;
    while ((m = qRegex.exec(faqBlock)) !== null) {
      pairs.push({ q: m[1].trim(), a: m[2].trim() });
    }
    return pairs;
  })();

  const formattedDate = new Date(article.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: cat?.label ?? category,
        item: `${SITE_URL}/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/${category}/${slug}`,
      },
    ],
  };

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
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${category}`} className="hover:text-white">
              {cat?.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 text-white/70">{article.title}</span>
          </nav>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href={`/${category}`}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white hover:bg-white/25"
            >
              {cat?.emoji} {cat?.label}
            </Link>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            {article.title}
          </h1>
          <p className="mb-5 text-lg text-white/70">{article.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
            {author ? (
              <Link
                href={`/autor/${author.slug}`}
                className="flex items-center gap-2 group"
              >
                {author.image ? (
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 rounded-full object-cover transition-opacity group-hover:opacity-80"
                  />
                ) : (
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white transition-opacity group-hover:opacity-80"
                    style={{ backgroundColor: author.color }}
                  >
                    {author.initials}
                  </span>
                )}
                <strong className="text-white/70 group-hover:text-white transition-colors">
                  {author.name}
                </strong>
              </Link>
            ) : (
              <span>
                Por <strong className="text-white/70">{article.author}</strong>
              </span>
            )}
            <span>·</span>
            <time dateTime={article.date}>{formattedDate}</time>
            {article.updated && article.updated !== article.date && (
              <>
                <span>·</span>
                <span>
                  Act.{" "}
                  {new Date(article.updated).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </>
            )}
            <span>·</span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-amber-300">
              ⏱ {article.readingTime} min
            </span>
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
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
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
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    ],
                  },
                }}
              />
            </div>

            <NewsletterMidCTA />

            <AdBanner slot="in-content-mobile" className="block lg:hidden" />

            <AdBanner slot="bottom-article" />

            {/* Share buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-gray-500">
                ¿Te ha sido útil? Compártelo:
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} — ${SITE_URL}/${category}/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(`${SITE_URL}/${category}/${slug}`)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </a>
            </div>

            {/* Bloque de autor (Premium E-E-A-T) */}
            {author && (
              <div className="mt-12 flex flex-col sm:flex-row items-start gap-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-white p-6 md:p-8 shadow-sm relative overflow-hidden">
                <Link
                  href={`/autor/${author.slug}`}
                  className="shrink-0 relative"
                >
                  {author.image ? (
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-2xl object-cover shadow-xl shadow-[#1a6640]/20 ring-4 ring-white"
                    />
                  ) : (
                    <span
                      className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-xl shadow-[#1a6640]/20 ring-4 ring-white"
                      style={{ backgroundColor: author.color }}
                    >
                      {author.initials}
                    </span>
                  )}
                  <div
                    className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-md border-2 border-white"
                    title="Autor Verificado"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </Link>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0f3d26]">
                      Autor
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <p className="text-xs font-medium text-gray-500">
                      Expertise Verificada
                    </p>
                  </div>
                  <Link
                    href={`/autor/${author.slug}`}
                    className="text-2xl font-extrabold text-gray-900 hover:text-[#1a6640] transition-colors"
                  >
                    {author.name}
                  </Link>
                  <p className="text-sm font-semibold text-[#1a6640] mb-3">
                    {author.title}
                  </p>

                  <p className="mb-4 text-sm leading-relaxed text-gray-700 italic border-l-2 border-amber-300 pl-4 bg-amber-50/30 py-2 rounded-r-lg">
                    &quot;{author.bio}&quot;
                  </p>

                  {/* Mostramos credenciales para generar E-E-A-T puro */}
                  {author.credentials && author.credentials.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-4">
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Credenciales de Confianza:
                      </p>
                      {author.credentials.slice(0, 3).map((cred, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-600 font-medium"
                        >
                          <svg
                            className="h-3.5 w-3.5 text-green-600 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <span className="text-xl">ℹ️</span>
              <p className="text-xs leading-relaxed text-amber-800">
                <strong>Aviso de afiliado:</strong> Este artículo contiene
                enlaces de afiliado a Amazon. Si compras a través de ellos,
                recibimos una pequeña comisión sin coste adicional para ti.
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
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">
              Sigue leyendo
            </p>
            <h2 className="mb-6 text-xl font-extrabold text-[#0f3d26]">
              Guías relacionadas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.category}/${rel.slug}`}
                  className="card-hover group overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm"
                >
                  {rel.image && (
                    <div className="relative h-36 w-full overflow-hidden bg-amber-50">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-bold text-gray-800 group-hover:text-[#1a6640]">
                      {rel.title}
                    </p>
                    <p className="mt-2 text-xs text-amber-600">
                      ⏱ {rel.readingTime} min →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
