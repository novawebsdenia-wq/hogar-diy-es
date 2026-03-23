import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { AUTHORS } from "@/lib/authors";

export const metadata: Metadata = {
  title: `Sobre Nosotros | ${SITE_NAME}`,
  description:
    "Conoce a Carlos Martín y el equipo detrás de HogarDIY.es — guías de bricolaje escritas por alguien que ha hecho esas reparaciones de verdad.",
};

const carlos = AUTHORS["carlos-martin"];

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero personal */}
      <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Link href={`/autor/${carlos.slug}`} className="shrink-0 group">
          {carlos.image ? (
            <Image
              src={carlos.image}
              alt={carlos.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover shadow-lg transition-opacity group-hover:opacity-80"
            />
          ) : (
            <span
              className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-lg transition-opacity group-hover:opacity-80"
              style={{ backgroundColor: carlos.color }}
            >
              {carlos.initials}
            </span>
          )}
        </Link>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">
            Fundador
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {carlos.name}
          </h1>
          <p className="text-lg text-[#1a6640]">{carlos.title}</p>
          <p className="mt-2 text-gray-600 leading-relaxed">{carlos.bio}</p>
        </div>
      </div>

      <div className="prose prose-lg prose-gray">
        <h2>¿Por qué existe HogarDIY.es?</h2>
        <p>
          Todo empezó con una factura de fontanero de 120€ por cambiar un grifo
          que tarda 30 minutos en cambiarse. Pensé:{" "}
          <em>"esto no puede ser tan difícil"</em>. No lo era. Y tampoco lo son
          la mayoría de las reparaciones del hogar que hacemos pagar a otros sin
          necesidad.
        </p>
        <p>
          HogarDIY.es nació para ser la respuesta a esa pregunta que buscas a
          las 11 de la noche cuando algo se rompe en casa y no sabes si llamar
          al técnico o intentarlo tú mismo.
        </p>

        <h2>Nuestra promesa</h2>
        <ul>
          <li>
            <strong>Honestidad ante todo:</strong> Si algo requiere un
            profesional por seguridad o complejidad, te lo decimos sin rodeos.
            No queremos que te electrocutes siguiendo nuestras guías.
          </li>
          <li>
            <strong>Probado antes de publicar:</strong> Cada guía la hemos hecho
            nosotros mismos, en una casa real, con las herramientas que
            cualquiera puede comprar en el ferretería.
          </li>
          <li>
            <strong>Sin fluff:</strong> Cada artículo va al grano. El tiempo
            estimado, los materiales exactos con precio orientativo, y los pasos
            en orden. Sin relleno.
          </li>
          <li>
            <strong>Actualizado:</strong> Los materiales y técnicas cambian.
            Revisamos nuestras guías cuando algo queda desactualizado.
          </li>
        </ul>

        <h2>Formación y credenciales</h2>
        <ul>
          {carlos.credentials.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <h2>Transparencia sobre afiliados</h2>
        <p>
          Algunos artículos incluyen enlaces de afiliado a Amazon. Esto
          significa que si compras a través de ellos, recibimos una pequeña
          comisión — sin que tú pagues más. Solo recomendamos productos que
          usaríamos (o usamos) nosotros mismos.
        </p>
        <p>
          Somos participantes del{" "}
          <strong>Programa de Afiliados de Amazon EU</strong>.
        </p>

        <h2>Contacto</h2>
        <p>
          ¿Tienes una duda, una sugerencia o quieres proponernos que cubramos
          una reparación? Escríbenos desde nuestra{" "}
          <a href="/contacto">página de contacto</a>. Leemos todos los mensajes.
        </p>
      </div>

      {/* CTA a la página del autor */}
      <div className="mt-10 rounded-2xl bg-[#0f3d26] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
          El autor
        </p>
        <p className="mt-1 text-xl font-extrabold">{carlos.name}</p>
        <p className="mt-1 text-white/70 text-sm">
          {carlos.bio.substring(0, 120)}...
        </p>
        <Link
          href={`/autor/${carlos.slug}`}
          className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-600"
        >
          Ver todas sus guías →
        </Link>
      </div>
    </div>
  );
}
