import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthor } from "@/lib/authors";
import { getAllArticles } from "@/lib/mdx";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.title} | ${SITE_NAME}`,
    description: author.bio,
    openGraph: {
      type: "profile",
      url: `${SITE_URL}/autor/${slug}`,
    },
  };
}

export default async function AutorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const allArticles = getAllArticles();
  const authorArticles = allArticles.filter(
    (a) => a.author === author.name || a.author === author.slug,
  );

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${SITE_URL}/autor/${slug}`,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      {/* Hero */}
      <div className="bg-[#0f3d26] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <nav className="mb-6 text-sm text-white/40">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Autor</span>
          </nav>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {/* Avatar con iniciales */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-lg"
              style={{ backgroundColor: author.color }}
            >
              {author.initials}
            </div>

            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-400">
                Autor
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {author.name}
              </h1>
              <p className="mt-1 text-lg text-amber-300">{author.title}</p>
              <p className="mt-3 max-w-2xl text-white/70 leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Credenciales */}
        <section className="mb-12 rounded-2xl border border-green-100 bg-green-50 p-6">
          <h2 className="mb-4 text-lg font-extrabold text-[#0f3d26]">
            Formación y experiencia
          </h2>
          <ul className="space-y-2">
            {author.credentials.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-0.5 text-green-600">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Artículos del autor */}
        {authorArticles.length > 0 && (
          <section>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">
              Guías escritas por {author.name}
            </p>
            <h2 className="mb-6 text-2xl font-extrabold text-[#0f3d26]">
              {authorArticles.length} guías publicadas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {authorArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.category}/${article.slug}`}
                  className="group flex flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-600">
                    {article.category}
                  </p>
                  <p className="font-extrabold text-gray-900 group-hover:text-[#1a6640] leading-snug">
                    {article.title}
                  </p>
                  <p className="mt-2 text-xs text-amber-600">
                    ⏱ {article.readingTime} min →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
