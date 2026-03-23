export interface Author {
  slug: string
  name: string
  title: string
  bio: string
  credentials: string[]
  initials: string
  color: string
}

export const AUTHORS: Record<string, Author> = {
  'carlos-martin': {
    slug: 'carlos-martin',
    name: 'Carlos Martín',
    title: 'Técnico en Instalaciones y Reformas',
    bio: 'Llevo más de 15 años haciendo reformas y reparaciones en casas de toda España. Empecé ayudando a mi padre, que era fontanero en Valencia, y acabé especializándome en electricidad doméstica y reforma integral. Cada guía que publico la he hecho primero con mis propias manos.',
    credentials: [
      'Certificado en Instalaciones Eléctricas de Baja Tensión (REBT)',
      'Formación en Fontanería e Instalaciones Sanitarias',
      '15+ años de experiencia en reformas residenciales',
      'Más de 200 reparaciones documentadas',
    ],
    initials: 'CM',
    color: '#1a6640',
  },
}

export function getAuthor(nameOrSlug: string): Author | undefined {
  // Busca por slug o por nombre
  return (
    AUTHORS[nameOrSlug] ??
    Object.values(AUTHORS).find(
      (a) => a.name === nameOrSlug || a.slug === nameOrSlug
    )
  )
}
