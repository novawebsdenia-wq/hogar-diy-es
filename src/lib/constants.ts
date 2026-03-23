export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hogardiy.es'
export const SITE_NAME = 'HogarDIY.es'
export const SITE_DESCRIPTION =
  'Ahorra cientos de euros arreglando tu casa tú mismo. Descubre guías paso a paso de bricolaje, tutoriales fáciles y herramientas imprescindibles. ¡Empieza hoy!'
export const SITE_AUTHOR = 'HogarDIY.es'
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? ''
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? 'hogardiyes-21'

export const CATEGORIES: Record<string, { label: string; description: string; emoji: string }> = {
  reparaciones: {
    label: 'Reparaciones',
    description: 'Fontanería, electricidad, puertas, ventanas y más reparaciones del hogar.',
    emoji: '🔧',
  },
  herramientas: {
    label: 'Herramientas',
    description: 'Reviews, comparativas y guías de compra de herramientas para el hogar.',
    emoji: '🪛',
  },
  reformas: {
    label: 'Reformas',
    description: 'Pintura, suelos, muebles y reformas low-cost para transformar tu hogar.',
    emoji: '🏠',
  },
  jardin: {
    label: 'Jardín',
    description: 'Mantenimiento de jardín, herramientas de jardinería y sistemas de riego.',
    emoji: '🌱',
  },
  'ahorro-energetico': {
    label: 'Ahorro Energético',
    description: 'Aislamiento, termostatos y mejoras para reducir tu factura de la luz.',
    emoji: '💡',
  },
}
