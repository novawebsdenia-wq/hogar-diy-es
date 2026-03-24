import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Aviso Legal | ${SITE_NAME}`,
  description:
    "Aviso legal e información del titular de HogarDIY.es, conforme a la Ley de Servicios de la Sociedad de la Información (LSSI).",
  robots: { index: true, follow: false },
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        Aviso Legal
      </h1>
      <div className="prose prose-gray">
        <p className="text-sm text-gray-400">
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se
          informa:
        </p>

        <h2>1. Titular del sitio web</h2>
        <ul>
          <li>
            <strong>Nombre:</strong> Carlos Martín
          </li>
          <li>
            <strong>Sitio web:</strong> {SITE_URL}
          </li>
          <li>
            <strong>Contacto:</strong> A través de la{" "}
            <a href="/contacto">página de contacto</a>
          </li>
        </ul>

        <h2>2. Objeto y ámbito de aplicación</h2>
        <p>
          {SITE_NAME} es un blog de contenido informativo sobre bricolaje,
          reparaciones del hogar, herramientas y ahorro energético dirigido al
          mercado español. El acceso y uso de este sitio web implica la
          aceptación plena de las condiciones de uso aquí recogidas.
        </p>

        <h2>3. Propiedad intelectual</h2>
        <p>
          Todos los contenidos de este sitio web — textos, imágenes, logotipos,
          estructura y diseño — son propiedad de {SITE_NAME} o de terceros que
          han autorizado su uso. Queda prohibida su reproducción, distribución o
          comunicación pública sin autorización previa y por escrito.
        </p>

        <h2>4. Responsabilidad</h2>
        <p>
          Las guías y consejos de {SITE_NAME} tienen carácter puramente
          informativo. El titular no se responsabiliza de los daños o perjuicios
          que pudieran derivarse del uso incorrecto de la información publicada.
          Para reparaciones que impliquen riesgo eléctrico, estructural o de
          gas, se recomienda siempre la supervisión de un profesional
          cualificado.
        </p>

        <h2>5. Enlace a terceros (Amazon Afiliados)</h2>
        <p>
          Este sitio participa en el{" "}
          <strong>Programa de Afiliados de Amazon EU</strong>. Los enlaces a
          Amazon son enlaces de afiliado: si realizas una compra a través de
          ellos, recibimos una comisión sin coste adicional para ti. Amazon
          gestiona sus propios datos conforme a su política de privacidad.
        </p>

        <h2>6. Publicidad (Google AdSense)</h2>
        <p>
          Este sitio web puede mostrar anuncios a través de Google AdSense.
          Google utiliza cookies para mostrar anuncios basados en visitas
          anteriores. Puedes consultar la política de uso de datos de Google en{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>
          .
        </p>

        <h2>7. Ley aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para
          cualquier controversia derivada del uso de este sitio web, las partes
          se someten a la jurisdicción de los Juzgados y Tribunales españoles.
        </p>
      </div>
    </div>
  );
}
