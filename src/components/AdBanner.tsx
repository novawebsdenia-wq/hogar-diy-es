'use client'

import { useEffect } from 'react'
import { ADSENSE_PUBLISHER_ID } from '@/lib/constants'

interface Props {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdBanner({ slot, format = 'auto', className }: Props) {
  useEffect(() => {
    if (!ADSENSE_PUBLISHER_ID) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      // AdSense not loaded yet
    }
  }, [])

  if (!ADSENSE_PUBLISHER_ID) {
    return (
      <div className={`my-6 flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-xs text-gray-400 ${className ?? ''}`}>
        Espacio publicitario (AdSense pendiente de aprobación)
      </div>
    )
  }

  return (
    <div className={`my-6 overflow-hidden ${className ?? ''}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
