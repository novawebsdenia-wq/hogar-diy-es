import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política de Cookies | ${SITE_NAME}`,
  description:
    "Información sobre las cookies que utiliza HogarDIY.es y cómo gestionarlas.",
  robots: { index: true, follow: false },
};

export default function PoliticaCookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        Política de Cookies
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
        <p>
          En cumplimiento del artículo 22.2 de la Ley 34/2002 de Servicios de la
          Sociedad de la Información (LSSI) y el Reglamento General de
          Protección de Datos (RGPD), te informamos sobre las cookies que
          utiliza este sitio web.
        </p>

        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web
          almacenan en tu dispositivo. Permiten que el sitio recuerde tus
          preferencias y analice cómo interactúas con el contenido.
        </p>

        <h2>Cookies que utilizamos</h2>

        <h3>Cookies técnicas (necesarias)</h3>
        <p>
          Imprescindibles para el funcionamiento básico del sitio. No requieren
          consentimiento.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cookie_consent</td>
              <td>Guarda tu decisión sobre el uso de cookies</td>
              <td>1 año</td>
            </tr>
          </tbody>
        </table>

        <h3>Cookies analíticas (Google Analytics 4)</h3>
        <p>
          Nos permiten entender cómo los usuarios navegan por el sitio, qué
          artículos se leen más y desde qué dispositivos acceden. Los datos son
          anónimos y agregados.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Identifica sesiones únicas de usuario (anónimo)</td>
              <td>2 años</td>
            </tr>
            <tr>
              <td>_ga_*</td>
              <td>Persiste el estado de sesión de GA4</td>
              <td>2 años</td>
            </tr>
          </tbody>
        </table>

        <h3>Cookies publicitarias (Google AdSense)</h3>
        <p>
          Permiten mostrar anuncios relevantes según tus intereses. Son
          gestionadas por Google.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IDE</td>
              <td>Anuncios personalizados de Google DoubleClick</td>
              <td>1 año</td>
            </tr>
            <tr>
              <td>DSID</td>
              <td>Identificación de usuario para publicidad de Google</td>
              <td>2 semanas</td>
            </tr>
          </tbody>
        </table>

        <h3>Cookies de afiliados (Amazon)</h3>
        <p>
          Cuando haces clic en un enlace de Amazon, Amazon puede establecer
          cookies para rastrear la referencia y atribuir posibles comisiones.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>session-id</td>
              <td>Sesión de Amazon para seguimiento de afiliado</td>
              <td>Sesión</td>
            </tr>
          </tbody>
        </table>

        <h2>Cómo gestionar o eliminar las cookies</h2>
        <p>
          Puedes gestionar las cookies desde el banner de consentimiento que
          aparece en tu primera visita, o configurar tu navegador:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
        </ul>
        <p>
          También puedes optar por no recibir publicidad personalizada de Google
          visitando{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configuración de anuncios de Google
          </a>
          .
        </p>

        <h2>Más información</h2>
        <p>
          Consulta nuestra{" "}
          <a href="/politica-privacidad">Política de Privacidad</a> para más
          detalle sobre el tratamiento de datos personales, o{" "}
          <a href="/contacto">contáctanos</a> si tienes alguna pregunta.
        </p>
      </div>
    </div>
  );
}
