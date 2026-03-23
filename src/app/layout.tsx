import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import '@/styles/globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, GA_MEASUREMENT_ID, ADSENSE_PUBLISHER_ID, CATEGORIES } from '@/lib/constants'
import { MobileMenu } from '@/components/MobileMenu'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Bricolaje y Reparaciones del Hogar`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['reparaciones hogar', 'bricolaje España', 'fontanería casera', 'herramientas bricolaje', 'reformas low cost', 'ahorro energético hogar'],
  authors: [{ name: 'HogarDIY.es', url: SITE_URL }],
  creator: 'HogarDIY.es',
  publisher: 'HogarDIY.es',
  category: 'home improvement',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // Añadir verificación GSC: verification: { google: 'XXXXXXXXXX' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}</Script>
          </>
        )}
        {ADSENSE_PUBLISHER_ID && (
          <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`} crossOrigin="anonymous" strategy="lazyOnload" />
        )}

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0f3d26] shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 relative">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-lg shadow-sm">🔧</span>
              <div className="leading-tight">
                <p className="text-base font-extrabold tracking-tight text-white">HogarDIY.es</p>
                <p className="hidden text-[10px] font-medium text-white/50 sm:block">Guías para reparar tu hogar</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {Object.entries(CATEGORIES).map(([slug, { label, emoji }]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="text-base">{emoji}</span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-2">
              <Link
                href="/sobre-nosotros"
                className="hidden rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-600 md:block"
              >
                Sobre nosotros
              </Link>
              <MobileMenu />
            </div>
          </div>

          {/* Category strip — mobile scroll */}
          <div className="border-t border-white/10 md:hidden">
            <div className="flex gap-1 overflow-x-auto px-4 py-2 scrollbar-none">
              {Object.entries(CATEGORIES).map(([slug, { label, emoji }]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70 hover:border-white/40 hover:text-white"
                >
                  {emoji} {label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-64px)]">{children}</main>

        {/* Footer */}
        <footer className="mt-20 bg-[#0f3d26] text-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-10 md:grid-cols-4">

              {/* Brand */}
              <div className="md:col-span-1">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-lg">🔧</span>
                  <p className="text-lg font-extrabold">HogarDIY.es</p>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  Guías paso a paso probadas para que resuelvas las reparaciones del hogar tú mismo, sin llamar al técnico.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['✓ Gratis', '✓ Sin tecnicismos', '✓ Paso a paso'].map((badge) => (
                    <span key={badge} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categorías */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">Categorías</p>
                <ul className="space-y-2.5">
                  {Object.entries(CATEGORIES).map(([slug, { label, emoji }]) => (
                    <li key={slug}>
                      <Link href={`/${slug}`} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                        <span>{emoji}</span> {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">Información</p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li><Link href="/sobre-nosotros" className="transition-colors hover:text-white">Sobre Nosotros</Link></li>
                  <li><Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link></li>
                  <li><Link href="/politica-privacidad" className="transition-colors hover:text-white">Política de Privacidad</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">Afiliados</p>
                <p className="text-xs leading-relaxed text-white/40">
                  Participamos en el Programa de Afiliados de Amazon EU. Las compras realizadas a través de nuestros enlaces pueden generar una comisión sin coste adicional para ti.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
              <p>© {new Date().getFullYear()} HogarDIY.es — Todos los derechos reservados</p>
              <p>Hecho con 🔧 en España</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
