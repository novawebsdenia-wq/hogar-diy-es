'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        aria-label="Menú"
      >
        {open ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-[#0f3d26] px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {Object.entries(CATEGORIES).map(([slug, { label, emoji }]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">{emoji}</span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-white/10 pt-4">
            <Link
              href="/sobre-nosotros"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white"
            >
              Sobre HogarDIY.es
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
