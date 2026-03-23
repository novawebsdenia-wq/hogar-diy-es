import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Contacto | ${SITE_NAME}`,
  description: '¿Tienes alguna pregunta o sugerencia? Ponte en contacto con el equipo de HogarDIY.es.',
}

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-extrabold text-gray-900">Contacto</h1>
      <p className="mb-8 text-gray-500">
        ¿Tienes alguna duda, sugerencia o quieres que tratemos un tema concreto? Escríbenos.
      </p>

      <form
        action="https://formsubmit.co/tu@email.com"
        method="POST"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="_subject" value="Mensaje desde HogarDIY.es" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="/contacto?enviado=true" />

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  )
}
