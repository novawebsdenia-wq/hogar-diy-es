# hogar-diy-es

Blog estático de bricolaje y reparaciones del hogar para el mercado español.
Monetización: AdSense + Amazon Affiliates. URL: https://hogardiy.es

## Stack

- Next.js 15.3 + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`)
- MDX: next-mdx-remote 6, gray-matter, reading-time
- Plugins MDX: remark-gfm, rehype-slug, rehype-autolink-headings
- **NO hay**: Supabase, auth, backend, AI SDK, Zustand, Framer Motion, Zod

## Estructura

```
proyectos/hogar-diy-es/
  content/                        # Artículos MDX por categoría
    reparaciones/ herramientas/ reformas/ jardin/ ahorro-energetico/
  src/
    app/
      [category]/[slug]/page.tsx  # Artículo individual
      [category]/page.tsx         # Listado por categoría
      page.tsx                    # Home
      sitemap.ts robots.ts
      autor/[slug]/page.tsx
      contacto/ sobre-nosotros/ politica-privacidad/
      api/newsletter/subscribe/   # Único endpoint API
    components/
      AdBanner.tsx AffiliateCard.tsx ArticleSchema.tsx
      FAQSchema.tsx HeroVideoSection.tsx MobileMenu.tsx
      NewsletterForm.tsx TableOfContents.tsx
    lib/
      mdx.ts        # getAllArticles, getArticleBySlug — lee content/ con fs
      constants.ts  # SITE_URL, CATEGORIES, GA_ID, ADSENSE_ID, AMAZON_TAG
      authors.ts    # Info de autores
      headings.ts   # Extracción de headings para TOC
    styles/globals.css
```

## Categorías válidas

`reparaciones` | `herramientas` | `reformas` | `jardin` | `ahorro-energetico`

## Formato frontmatter MDX

```md
---
title: "Título del artículo"
description: "Meta description para SEO (150-160 chars)"
date: "2026-03-23"
tags: ["tag1", "tag2"]
image: "/images/categoria/articulo.webp"
author: "HogarDIY.es"
---
```

## Comandos

```bash
npm install       # Instalar dependencias
npm run dev       # Dev server con Turbopack (puerto 3000)
npm run build     # Build producción
npm run typecheck # tsc --noEmit
npm run lint      # ESLint
```

## Env vars (.env.local)

```
NEXT_PUBLIC_SITE_URL=https://hogardiy.es
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_AMAZON_TAG=hogardiy-21
```

## Reglas de código

- TypeScript strict — nunca `any`, usar `unknown`
- Tailwind v4: `@import "tailwindcss"` en globals.css (NO `@tailwind base/components/utilities`)
- Componentes: `PascalCase`. Archivos: `kebab-case`. Variables: `camelCase`
- UI y copy en español. Variables, funciones y tipos en inglés
- Path alias: `@/*` = `./src/*`
- Máx 500 líneas por archivo, 50 líneas por función

## Patrones clave

- `mdx.ts` lee `content/` con `fs`, parsea frontmatter con `gray-matter`
- Rutas dinámicas: `[category]/[slug]` → `content/{category}/{slug}.mdx`
- `AffiliateCard` genera enlace Amazon con el tag de afiliado
- `ArticleSchema` y `FAQSchema` generan JSON-LD para SEO
- `TableOfContents` extrae headings de `headings.ts`
