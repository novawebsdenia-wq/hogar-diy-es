import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles } from "@/lib/mdx";
import { SearchClient } from "@/components/SearchClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Buscar Guías | ${SITE_NAME}`,
  description:
    "Busca entre todas las guías de bricolaje, reparaciones del hogar, herramientas y ahorro energético de HogarDIY.es.",
  alternates: { canonical: `${SITE_URL}/buscar` },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const articles = getAllArticles();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0f3d26] py-10 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-extrabold text-white">Buscar guías</h1>
          <p className="mt-1 text-sm text-white/60">
            {articles.length} guías disponibles
          </p>
        </div>
      </div>
      <Suspense>
        <SearchClient articles={articles} />
      </Suspense>
    </div>
  );
}
