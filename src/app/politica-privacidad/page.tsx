import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política de Privacidad | ${SITE_NAME}`,
  description: "Política de privacidad y cookies de HogarDIY.es.",
  robots: { index: true, follow: false },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        Política de Privacidad
      </h1>
      <div className="prose prose-gray">
        <p className="text-sm text-gray-400">
          Última actualización:{" "}
          {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          {SITE_NAME} — {SITE_URL}
        </p>

        <h2>2. Datos que recopilamos</h2>
        <p>Este sitio web puede recopilar:</p>
        <ul>
          <li>Datos de navegación anónimos a través de Google Analytics 4</li>
          <li>Datos de contacto cuando nos envías un formulario</li>
          <li>Cookies técnicas necesarias para el funcionamiento del sitio</li>
        </ul>

        <h2>3. Google Analytics</h2>
        <p>
          Utilizamos Google Analytics 4 para analizar el tráfico web de forma
          anónima. Google puede usar estos datos según su propia política de
          privacidad. Puedes desactivar el seguimiento instalando el{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            complemento de inhabilitación de Google Analytics
          </a>
          .
        </p>

        <h2>4. Google AdSense</h2>
        <p>
          Utilizamos Google AdSense para mostrar publicidad. Google puede usar
          cookies para mostrar anuncios basados en tus visitas anteriores a este
          y otros sitios web. Puedes optar por no recibir publicidad
          personalizada visitando{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configuración de anuncios de Google
          </a>
          .
        </p>

        <h2>5. Programa de Afiliados de Amazon</h2>
        <p>
          Somos participantes del Programa de Afiliados de Amazon EU. Como
          afiliado de Amazon, obtenemos ingresos por las compras adscritas que
          cumplen los requisitos aplicables. Amazon puede usar cookies cuando
          sigues nuestros enlaces de afiliado.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Este sitio utiliza cookies técnicas (necesarias para el
          funcionamiento) y cookies analíticas (Google Analytics). Puedes
          configurar tu navegador para rechazar las cookies, aunque esto puede
          afectar la funcionalidad del sitio.
        </p>

        <h2>7. Tus derechos (RGPD)</h2>
        <p>
          Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento
          y portar tus datos personales. Para ejercer estos derechos, contacta
          con nosotros a través de la <a href="/contacto">página de contacto</a>
          .
        </p>

        <h2>8. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política de privacidad. Te notificaremos
          cualquier cambio publicando la nueva versión en esta página con la
          fecha de actualización.
        </p>
      </div>
    </div>
  );
}
