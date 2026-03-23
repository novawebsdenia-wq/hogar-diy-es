import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Sobre Nosotros | ${SITE_NAME}`,
  description: 'Conoce quiénes somos y por qué creamos HogarDIY.es — tu guía de referencia para reparaciones y bricolaje en España.',
}

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">Sobre HogarDIY.es</h1>

      <div className="prose prose-lg prose-gray">
        <p>
          <strong>HogarDIY.es</strong> nació de una pregunta sencilla: ¿por qué pagar a un técnico 80€
          por algo que puedes aprender a hacer en 20 minutos?
        </p>

        <p>
          Somos una web de referencia para propietarios e inquilinos en España que quieren aprender
          a resolver las reparaciones más comunes del hogar por sí mismos. Desde cambiar un grifo
          hasta pintar una habitación entera, cubrimos todo el espectro del bricolaje doméstico con
          guías visuales paso a paso.
        </p>

        <h2>Nuestra filosofía</h2>
        <ul>
          <li><strong>Honestidad ante todo</strong>: Si algo requiere un profesional, te lo decimos.</li>
          <li><strong>Fotos reales</strong>: Nuestras guías incluyen fotografías del proceso real, no ilustraciones genéricas.</li>
          <li><strong>Sin fluff</strong>: Vamos al grano. Cada artículo tiene exactamente lo que necesitas saber.</li>
          <li><strong>Actualizado</strong>: Los materiales cambian. Revisamos nuestras guías regularmente.</li>
        </ul>

        <h2>¿Quién escribe en HogarDIY.es?</h2>
        <p>
          Nuestro equipo combina experiencia práctica en reformas y bricolaje con conocimiento técnico
          en fontanería, electricidad doméstica y carpintería. Antes de publicar cualquier guía,
          la probamos nosotros mismos.
        </p>

        <h2>Transparencia sobre enlaces de afiliado</h2>
        <p>
          Algunos artículos incluyen enlaces de afiliado a Amazon. Esto significa que, si compras
          a través de ellos, recibimos una pequeña comisión sin que tú pagues más. Solo recomendamos
          productos que usaríamos nosotros mismos.
        </p>
        <p>
          Somos participantes del <strong>Programa de Afiliados de Amazon EU</strong>, diseñado
          para ofrecer un medio para que sitios web obtengan comisiones mediante publicidad y
          enlazando a amazon.es.
        </p>

        <h2>Contacto</h2>
        <p>
          ¿Tienes alguna pregunta, sugerencia o quieres proponernos un tema?
          Escríbenos a través de nuestra <a href="/contacto">página de contacto</a>.
        </p>
      </div>
    </div>
  )
}
