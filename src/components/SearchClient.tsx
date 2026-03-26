"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import type { ArticleMeta } from "@/lib/mdx";
import { CATEGORIES } from "@/lib/constants";

interface Props {
  articles: ArticleMeta[];
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    '<mark class="bg-amber-200 text-amber-900 rounded px-0.5">$1</mark>',
  );
}

export function SearchClient({ articles }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Sync URL → state on navigation
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update URL when query changes (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      router.replace(`/buscar${query.trim() ? `?${params}` : ""}`, {
        scroll: false,
      });
    }, 300);
    return () => clearTimeout(t);
  }, [query, router]);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.description.toLowerCase().includes(trimmed) ||
          a.tags.some((t) => t.toLowerCase().includes(trimmed)) ||
          CATEGORIES[a.category]?.label.toLowerCase().includes(trimmed),
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Search input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca guías, herramientas, reparaciones…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-base shadow-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Empty state */}
      {!trimmed && (
        <div className="text-center py-12 text-gray-400">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <p className="text-sm">
            Escribe algo para buscar entre {articles.length} guías
          </p>
        </div>
      )}

      {/* No results */}
      {trimmed && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            No encontramos guías para{" "}
            <span className="font-semibold text-gray-700">"{query}"</span>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Prueba con otras palabras: "grifo", "pintura", "taladro"…
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {results.length} resultado{results.length !== 1 ? "s" : ""} para{" "}
            <span className="font-semibold text-gray-700">"{query}"</span>
          </p>
          <ul className="space-y-3">
            {results.map((article) => {
              const cat = CATEGORIES[article.category];
              return (
                <li key={`${article.category}/${article.slug}`}>
                  <Link
                    href={`/${article.category}/${article.slug}`}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                  >
                    {article.image && (
                      <div className="hidden sm:block shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={80}
                          height={60}
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
                          {cat?.emoji} {cat?.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {article.readingTime} min
                        </span>
                      </div>
                      <p
                        className="font-semibold text-gray-800 leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: highlight(article.title, query),
                        }}
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: highlight(article.description, query),
                        }}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
