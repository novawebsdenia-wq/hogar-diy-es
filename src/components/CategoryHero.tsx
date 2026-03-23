"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

// Tipos para las props
interface CategoryHeroProps {
  categorySlug: string;
  articlesImages: string[];
  articlesCount: number;
}

// Mapa de colores base para cada categoría, usado en el fondo y detalles
const CATEGORY_THEMES: Record<
  string,
  {
    from: string;
    via: string;
    border: string;
    text: string;
    textAccent: string;
  }
> = {
  reparaciones: {
    from: "from-blue-950",
    via: "via-blue-900/80",
    border: "border-blue-500/30",
    text: "text-blue-100",
    textAccent: "text-blue-400",
  },
  herramientas: {
    from: "from-[#2A1A05]", // ámbar muy oscuro
    via: "via-[#4A2F0A]/85",
    border: "border-amber-500/30",
    text: "text-amber-100",
    textAccent: "text-amber-400",
  },
  reformas: {
    from: "from-[#3A1400]", // naranja muy oscuro
    via: "via-[#5C2303]/85",
    border: "border-orange-500/30",
    text: "text-orange-100",
    textAccent: "text-orange-400",
  },
  jardin: {
    from: "from-[#051A0C]", // verde muy oscuro
    via: "via-[#0A2E16]/85",
    border: "border-green-500/30",
    text: "text-green-100",
    textAccent: "text-green-400",
  },
  "ahorro-energetico": {
    from: "from-[#002220]", // teal muy oscuro
    via: "via-[#003B38]/85",
    border: "border-teal-500/30",
    text: "text-teal-100",
    textAccent: "text-teal-400",
  },
};

export function CategoryHero({
  categorySlug,
  articlesImages,
  articlesCount,
}: CategoryHeroProps) {
  const category = CATEGORIES[categorySlug];
  // Default fallback
  const theme = CATEGORY_THEMES[categorySlug] || {
    from: "from-[#0f3d26]",
    via: "via-[#0f3d26]/80",
    border: "border-white/20",
    text: "text-white",
    textAccent: "text-amber-400",
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Lógica para columnas de imágenes (Marquee vertical infinito)
  // Requerimos suficientes imágenes para que el efecto loop funcione bien.
  // Mezclamos y duplicamos las imágenes si hay pocas.
  const columns = useMemo(() => {
    // Asegurar mínimo 8 imágenes duplicando el array si hace falta
    let pool = [...articlesImages];
    if (pool.length === 0) {
      pool = [
        "/images/posts/reparaciones/como-arreglar-baldosas-sueltas.webp",
        "/images/posts/reparaciones/como-cambiar-grifo-cocina.webp",
        "/images/posts/herramientas/caja-herramientas-basica.webp",
        "/images/posts/reformas/como-pintar-habitacion-paso-a-paso.webp",
      ];
    }
    while (pool.length < 8) {
      pool = [...pool, ...pool];
    }

    // Eliminamos Math.random() para evitar Hydration Mismatch en SSR.
    // Usamos el pool con un orden determinista.
    const shuffled = [...pool];

    // 3 columnas
    const col1 = shuffled.slice(0, Math.ceil(shuffled.length / 3));
    const col2 = shuffled.slice(
      Math.ceil(shuffled.length / 3),
      Math.ceil((shuffled.length * 2) / 3),
    );
    const col3 = shuffled.slice(Math.ceil((shuffled.length * 2) / 3));

    return [
      { images: [...col1, ...col1, ...col1], speed: 45 },
      { images: [...col2, ...col2, ...col2], speed: 65, reverse: true },
      { images: [...col3, ...col3, ...col3], speed: 50 },
    ];
  }, [articlesImages]);

  if (!category) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-black"
    >
      {/* ── BACKGROUND IMAGE WALL (Marquee) ── */}
      <div className="absolute inset-0 flex mx-auto max-w-7xl justify-center gap-4 px-4 opacity-40 rotate-[-4deg] scale-110">
        {columns.map((col, i) => (
          <div
            key={i}
            className="flex h-[200%] w-1/3 flex-col gap-4 overflow-hidden relative"
          >
            <motion.div
              animate={{
                y: col.reverse ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
              }}
              transition={{
                duration: col.speed,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-4"
            >
              {col.images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={src}
                    alt={`Background ${idx}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />{" "}
                  {/* Slight dark filter on each image */}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      {/* ── OVERLAYS (Gradient + Vignette) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${theme.from} ${theme.via} to-transparent z-0`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${theme.from} via-transparent ${theme.from} z-0 opacity-80`}
      />
      <div className="absolute inset-0 backdrop-blur-[2px] z-0" />{" "}
      {/* Subtle blur */}
      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 flex h-full w-full items-center justify-center pt-10 pb-24">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <nav className="mb-8 flex justify-center text-sm font-medium text-white/50 tracking-widen">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="mx-3 opacity-50">/</span>
            <span className={`text-white`}>{category.label}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div
              className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border ${theme.border} bg-white/10 text-5xl shadow-2xl backdrop-blur-md`}
            >
              {category.emoji}
            </div>

            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl flex flex-col items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                {category.label}
              </span>
            </h1>

            <p
              className={`mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl lg:text-2xl ${theme.text} opacity-90`}
            >
              {category.description}
            </p>

            <div
              className={`inline-flex items-center gap-2 rounded-full border ${theme.border} bg-black/30 px-5 py-2 text-sm font-bold backdrop-blur-md`}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.textAccent} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${theme.from.replace("from-", "bg-").split("-")[0] === "bg" ? theme.textAccent.replace("text-", "bg-") : "bg-white"}`}
                ></span>
              </span>
              <span className="text-white">
                {articlesCount}{" "}
                {articlesCount === 1
                  ? "guía publicada"
                  : "guías publicadas y actualizadas"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Fade inferior hacia la siguiente sección */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
