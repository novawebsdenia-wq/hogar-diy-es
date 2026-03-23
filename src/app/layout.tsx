import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "@/styles/globals.css";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  GA_MEASUREMENT_ID,
  ADSENSE_PUBLISHER_ID,
  CATEGORIES,
} from "@/lib/constants";
import { MobileMenu } from "@/components/MobileMenu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Bricolaje y Reparaciones del Hogar`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "reparaciones hogar",
    "bricolaje España",
    "fontanería casera",
    "herramientas bricolaje",
    "reformas low cost",
    "ahorro energético hogar",
  ],
  authors: [{ name: "HogarDIY.es", url: SITE_URL }],
  creator: "HogarDIY.es",
  publisher: "HogarDIY.es",
  category: "home improvement",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Añadir verificación GSC: verification: { google: 'XXXXXXXXXX' }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden bg-gray-50 text-gray-900 antialiased selection:bg-amber-500/30">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
            >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}</Script>
          </>
        )}
        {ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0f3d26] shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <svg
                viewBox="0 0 36 36"
                width="36"
                height="36"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 rounded-xl"
                aria-hidden="true"
              >
                <rect width="36" height="36" rx="8" fill="#0a2e16" />
                <polygon points="18,6 30,19 6,19" fill="#f59e0b" />
                <rect
                  x="9"
                  y="19"
                  width="18"
                  height="11"
                  rx="1"
                  fill="#f59e0b"
                />
                <rect
                  x="14"
                  y="22"
                  width="8"
                  height="8"
                  rx="1"
                  fill="#0a2e16"
                />
                <circle
                  cx="26"
                  cy="11"
                  r="3"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <line
                  x1="28.1"
                  y1="13.1"
                  x2="31"
                  y2="16"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="leading-tight">
                <p className="text-base font-extrabold tracking-tight text-white">
                  HogarDIY.es
                </p>
                <p className="hidden text-[10px] font-medium text-white/50 sm:block">
                  Guías para reparar tu hogar
                </p>
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
                href="#newsletter"
                className="hidden rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-600 md:block"
              >
                Guías gratis →
              </Link>
              <MobileMenu />
            </div>
          </div>

          {/* Category strip — mobile scroll */}
          <div className="border-t border-white/10 md:hidden bg-[#0A2E16]">
            <div className="flex gap-2.5 overflow-x-auto px-4 py-3 scrollbar-none snap-x snap-mandatory">
              {Object.entries(CATEGORIES).map(([slug, { label, emoji }]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex shrink-0 snap-start items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-white/10 active:scale-95"
                >
                  <span className="text-base">{emoji}</span>
                  {label}
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
                  <svg
                    viewBox="0 0 36 36"
                    width="36"
                    height="36"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 rounded-xl"
                    aria-hidden="true"
                  >
                    <rect width="36" height="36" rx="8" fill="#0a2e16" />
                    <polygon points="18,6 30,19 6,19" fill="#f59e0b" />
                    <rect
                      x="9"
                      y="19"
                      width="18"
                      height="11"
                      rx="1"
                      fill="#f59e0b"
                    />
                    <rect
                      x="14"
                      y="22"
                      width="8"
                      height="8"
                      rx="1"
                      fill="#0a2e16"
                    />
                    <circle
                      cx="26"
                      cy="11"
                      r="3"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <line
                      x1="28.1"
                      y1="13.1"
                      x2="31"
                      y2="16"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-lg font-extrabold">HogarDIY.es</p>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  Guías paso a paso probadas para que resuelvas las reparaciones
                  del hogar tú mismo, sin llamar al técnico.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["✓ Gratis", "✓ Sin tecnicismos", "✓ Paso a paso"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                      >
                        {badge}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Categorías */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">
                  Categorías
                </p>
                <ul className="space-y-2.5">
                  {Object.entries(CATEGORIES).map(
                    ([slug, { label, emoji }]) => (
                      <li key={slug}>
                        <Link
                          href={`/${slug}`}
                          className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                        >
                          <span>{emoji}</span> {label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Info */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">
                  Información
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li>
                    <Link
                      href="/sobre-nosotros"
                      className="transition-colors hover:text-white"
                    >
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacto"
                      className="transition-colors hover:text-white"
                    >
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/politica-privacidad"
                      className="transition-colors hover:text-white"
                    >
                      Política de Privacidad
                    </Link>
                  </li>
                </ul>
                <p className="mt-6 mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">
                  Síguenos
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://pinterest.es/hogardiy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HogarDIY en Pinterest"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@hogardiy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HogarDIY en YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-red-500 hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Legal */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">
                  Afiliados
                </p>
                <p className="text-xs leading-relaxed text-white/40">
                  Participamos en el Programa de Afiliados de Amazon EU. Las
                  compras realizadas a través de nuestros enlaces pueden generar
                  una comisión sin coste adicional para ti.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
              <p>
                © {new Date().getFullYear()} HogarDIY.es — Todos los derechos
                reservados
              </p>
              <p>Hecho con 🔧 en España</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
