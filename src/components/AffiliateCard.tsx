import Image from "next/image";
import { AMAZON_TAG } from "@/lib/constants";

interface Props {
  name: string;
  image?: string;
  price?: string;
  link: string;
  description?: string;
  badge?: string;
}

export function AffiliateCard({
  name,
  image,
  price,
  link,
  description,
  badge,
}: Props) {
  // Ensure Amazon tag is appended
  const url =
    link.includes("amazon.es") && !link.includes("tag=")
      ? `${link}${link.includes("?") ? "&" : "?"}tag=${AMAZON_TAG}`
      : link;

  return (
    <div className="not-prose my-10 flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-amber-500/20 bg-gradient-to-br from-white to-amber-50/50 p-6 md:p-8 shadow-sm sm:flex-row sm:items-center relative group hover:shadow-lg transition-shadow">
      {/* Etiqueta superior opcional (Recomendado) */}
      <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] md:text-xs uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-br-2xl shadow-sm z-10">
        Recomendado por Carlos Martín
      </div>

      {image ? (
        <div className="relative mt-8 sm:mt-0 h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-white border border-amber-100 p-2 group-hover:scale-105 transition-transform shadow-sm">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="128px"
          />
        </div>
      ) : (
        <div className="relative mt-8 sm:mt-0 h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-amber-100 border border-amber-200 p-2 flex items-center justify-center">
          <span className="text-4xl">🔧</span>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center gap-1.5 mt-2 sm:mt-0">
        {badge && (
          <span className="w-fit mb-1 flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
            ⭐ {badge}
          </span>
        )}
        <p className="text-lg md:text-xl font-extrabold text-[#0f3d26] leading-tight group-hover:text-amber-600 transition-colors pr-4">
          {name}
        </p>
        {description && (
          <p className="text-sm md:text-base leading-relaxed text-gray-600 line-clamp-3 md:line-clamp-2">
            {description}
          </p>
        )}
        {price && (
          <p className="text-2xl font-black text-green-700 mt-2 tracking-tight">
            {price}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto mt-4 sm:mt-0 items-center justify-center">
        <a
          href={url}
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-amber-500 px-8 py-4 text-sm md:text-base font-black text-[#0f3d26] shadow-md shadow-amber-500/20 transition-all hover:bg-amber-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/30 ring-2 ring-white"
        >
          Ver en Amazon
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <p className="text-center text-[10px] font-bold text-gray-400 tracking-wider">
          * Enlace de Afiliado Seguro
        </p>
      </div>
    </div>
  );
}
