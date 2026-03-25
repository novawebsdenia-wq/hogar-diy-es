import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  CATEGORIES,
  ADSENSE_PUBLISHER_ID,
} from "@/lib/constants";
import { MobileMenu } from "@/components/MobileMenu";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";

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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/logo-icon.jpg", type: "image/jpeg" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  other: { "google-adsense-account": ADSENSE_PUBLISHER_ID },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden bg-gray-50 text-gray-900 antialiased selection:bg-amber-500/30">
        {/* Consent Mode v2: defaults before any script loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent','default',{
            analytics_storage:'denied',
            ad_storage:'denied',
            ad_user_data:'denied',
            ad_personalization:'denied',
            wait_for_update:500
          });
        `,
          }}
        />

        <AnalyticsScripts />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo-icon.jpg`,
              sameAs: [
                "https://pin.it/4exMLTIbT",
                "https://youtube.com/@hogardiy",
              ],
            }),
          }}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0f3d26] shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src="/images/logo-icon.jpg"
                alt="HogarDIY.es"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-cover"
              />
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

        <CookieBanner />

        {/* Footer */}
        <footer className="mt-20 bg-[#0f3d26] text-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-10 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="mb-4 flex items-center gap-2.5">
                  <Image
                    src="/images/logo-icon.jpg"
                    alt="HogarDIY.es"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
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
                  <li>
                    <Link
                      href="/politica-cookies"
                      className="transition-colors hover:text-white"
                    >
                      Política de Cookies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/aviso-legal"
                      className="transition-colors hover:text-white"
                    >
                      Aviso Legal
                    </Link>
                  </li>
                </ul>
                <p className="mt-6 mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">
                  Síguenos
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.instagram.com/hogardiy.es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HogarDIY en Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-pink-600 hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@hogardiy.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HogarDIY en TikTok"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-black hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61578801945154"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HogarDIY en Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                  <a
                    href="https://pin.it/4exMLTIbT"
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
