/**
 * extract-amazon-images.mjs
 * Extrae la URL de imagen del primer resultado de Amazon.es para cada producto.
 * Uso: node scripts/extract-amazon-images.mjs
 * Output: scripts/amazon-images-result.json
 */

import { chromium } from "playwright";
import { writeFileSync } from "fs";

const PRODUCTS = [
  // ahorro-energetico
  {
    path: "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-1.jpg",
    url: "https://www.amazon.es/s?k=burlete+adhesivo+epdm+perfil+d+puerta+entrada",
  },
  {
    path: "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-2.jpg",
    url: "https://www.amazon.es/s?k=cepillo+bajo+puerta+aluminio+ajustable",
  },
  {
    path: "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-3.jpg",
    url: "https://www.amazon.es/s?k=burlete+automatico+umbral+puerta+entrada",
  },
  {
    path: "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-1.jpg",
    url: "https://www.amazon.es/s?k=bombilla+led+gu10+6w+4000k+pack+10",
  },
  {
    path: "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-2.jpg",
    url: "https://www.amazon.es/s?k=bombilla+led+e27+9w+2700k+pack",
  },
  {
    path: "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-3.jpg",
    url: "https://www.amazon.es/s?k=bombilla+led+e14+6w+2700k+pack",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-1.jpg",
    url: "https://www.amazon.es/s?k=aislamiento+termico+persiana",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-2.jpg",
    url: "https://www.amazon.es/s?k=cinta+doble+cara+extra+fuerte+tesa+4965",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-3.jpg",
    url: "https://www.amazon.es/s?k=burlete+autoadhesivo+espuma+epdm+persiana+tapa",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-1.jpg",
    url: "https://www.amazon.es/s?k=lana+de+roca+panel+rigido+40mm+buhardilla",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-2.jpg",
    url: "https://www.amazon.es/s?k=plancha+xps+poliestireno+extruido+50mm+aislamiento",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-3.jpg",
    url: "https://www.amazon.es/s?k=cuter+profesional+stanley+fatmax+25mm",
  },
  {
    path: "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-4.jpg",
    url: "https://www.amazon.es/s?k=lamina+barrera+vapor+polietileno+200+micras",
  },
  {
    path: "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-1.jpg",
    url: "https://www.amazon.es/s?k=panel+reflectante+radiador",
  },
  {
    path: "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-2.jpg",
    url: "https://www.amazon.es/s?k=imanes+neodimio+planos+40x20+pack",
  },
  {
    path: "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-3.jpg",
    url: "https://www.amazon.es/s?k=cinta+doble+cara+alta+temperatura+120+grados",
  },
  {
    path: "/images/ahorro-energetico/como-programar-termostato-ahorrar-calefaccion/producto-1.jpg",
    url: "https://www.amazon.es/s?k=honeywell+t6r+termostato+wifi+calefaccion",
  },
  {
    path: "/images/ahorro-energetico/como-programar-termostato-ahorrar-calefaccion/producto-2.jpg",
    url: "https://www.amazon.es/s?k=termostato+programable+semanal+calefaccion+digital",
  },
  {
    path: "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-1.jpg",
    url: "https://www.amazon.es/s?k=llave+purga+radiador+pack",
  },
  {
    path: "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-2.jpg",
    url: "https://www.amazon.es/s?k=termometro+infrarrojos+sin+contacto",
  },
  {
    path: "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-3.jpg",
    url: "https://www.amazon.es/s?k=manometro+presion+caldera+repuesto+0-4+bar",
  },
  {
    path: "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-1.jpg",
    url: "https://www.amazon.es/s?k=danfoss+ra+2990+cabezal+termostatico",
  },
  {
    path: "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-2.jpg",
    url: "https://www.amazon.es/s?k=giacomini+r470+cabezal+termostatico",
  },
  {
    path: "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-3.jpg",
    url: "https://www.amazon.es/s?k=cabezal+termostatico+wifi+zigbee+radiador",
  },
  // herramientas
  {
    path: "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-1.jpg",
    url: "https://www.amazon.es/s?k=esmeriladora+de+banco+150w",
  },
  {
    path: "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-2.jpg",
    url: "https://www.amazon.es/s?k=afilador+de+brocas+guia+angulo",
  },
  {
    path: "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-3.jpg",
    url: "https://www.amazon.es/s?k=juego+brocas+hss+titanio+19+piezas",
  },
  {
    path: "/images/herramientas/nivel-laser-barato-merece-la-pena/producto-1.jpg",
    url: "https://www.amazon.es/s?k=nivel+laser+autonivelante+verde+2+lineas",
  },
  {
    path: "/images/herramientas/nivel-laser-barato-merece-la-pena/producto-2.jpg",
    url: "https://www.amazon.es/s?k=nivel+burbuja+magnetico+stanley+60cm",
  },
  {
    path: "/images/herramientas/sierra-caladora-vs-circular-cual-comprar/producto-1.jpg",
    url: "https://www.amazon.es/s?k=sierra+caladora+dewalt+bateria",
  },
  {
    path: "/images/herramientas/sierra-caladora-vs-circular-cual-comprar/producto-2.jpg",
    url: "https://www.amazon.es/s?k=sierra+circular+bosch+pks+55",
  },
  // jardin
  {
    path: "/images/jardin/como-hacer-compost-casero-sin-olores/producto-1.jpg",
    url: "https://www.amazon.es/s?k=compostador+urbano+bokashi",
  },
  {
    path: "/images/jardin/como-hacer-compost-casero-sin-olores/producto-2.jpg",
    url: "https://www.amazon.es/s?k=acelerador+compost+compo+3kg",
  },
  {
    path: "/images/jardin/como-hacer-compost-casero-sin-olores/producto-3.jpg",
    url: "https://www.amazon.es/s?k=serrin+natural+madera+sin+tratar+compost",
  },
  {
    path: "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-1.jpg",
    url: "https://www.amazon.es/s?k=maceta+lechuza+balconera",
  },
  {
    path: "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-2.jpg",
    url: "https://www.amazon.es/s?k=sustrato+universal+perlita+50+litros",
  },
  {
    path: "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-3.jpg",
    url: "https://www.amazon.es/s?k=fertilizante+liquido+plantas+flor+compo",
  },
  // reformas
  {
    path: "/images/reformas/alisar-pared-gotele-facil/producto-1.jpg",
    url: "https://www.amazon.es/s?k=aguaplast+cubregotele+15l",
  },
  {
    path: "/images/reformas/alisar-pared-gotele-facil/producto-2.jpg",
    url: "https://www.amazon.es/s?k=llana+acero+inoxidable+30cm+alisado",
  },
  {
    path: "/images/reformas/alisar-pared-gotele-facil/producto-3.jpg",
    url: "https://www.amazon.es/s?k=lija+al+agua+pared+120+220",
  },
  {
    path: "/images/reformas/como-instalar-friso-madera-pared/producto-1.jpg",
    url: "https://www.amazon.es/s?k=friso+pino+machihembrado+pared+lamas",
  },
  {
    path: "/images/reformas/como-instalar-friso-madera-pared/producto-2.jpg",
    url: "https://www.amazon.es/s?k=grapadora+electrica+brads+calibre+18+madera",
  },
  {
    path: "/images/reformas/como-instalar-friso-madera-pared/producto-3.jpg",
    url: "https://www.amazon.es/s?k=caja+ingletes+serrucho+costilla+madera",
  },
  {
    path: "/images/reformas/como-pintar-habitacion-paso-a-paso/herramienta-1.jpg",
    url: "https://www.amazon.es/s?k=rodillo+microfibra+pintura+23cm",
  },
  {
    path: "/images/reformas/como-pintar-habitacion-paso-a-paso/herramienta-3.jpg",
    url: "https://www.amazon.es/s?k=cinta+carrocero+3m+pintura",
  },
  {
    path: "/images/reformas/como-purgar-caldera-gas-presion/producto-1.jpg",
    url: "https://www.amazon.es/s?k=manometro+presion+caldera+glicerina",
  },
  {
    path: "/images/reformas/como-purgar-caldera-gas-presion/producto-2.jpg",
    url: "https://www.amazon.es/s?k=limpiador+circuito+calefaccion+desincrustante",
  },
  {
    path: "/images/reformas/como-purgar-caldera-gas-presion/producto-3.jpg",
    url: "https://www.amazon.es/s?k=llave+llenado+caldera+universal",
  },
  {
    path: "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-1.jpg",
    url: "https://www.amazon.es/s?k=imprimacion+azulejos+adherente+ceramica",
  },
  {
    path: "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-2.jpg",
    url: "https://www.amazon.es/s?k=esmalte+titanlux+azulejos+blanco",
  },
  {
    path: "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-3.jpg",
    url: "https://www.amazon.es/s?k=rodillo+espuma+poro+fino+esmalte+10cm",
  },
  // reparaciones
  {
    path: "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-1.jpg",
    url: "https://www.amazon.es/s?k=bisagra+blum+clip+top+110+cierre+suave",
  },
  {
    path: "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-2.jpg",
    url: "https://www.amazon.es/s?k=platina+reparacion+bisagra+cocina+acero",
  },
  {
    path: "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-3.jpg",
    url: "https://www.amazon.es/s?k=pasta+reparadora+madera+aguaplast",
  },
  {
    path: "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-1.jpg",
    url: "https://www.amazon.es/s?k=guias+telescopicas+cajon+45cm+bolas+extension+total",
  },
  {
    path: "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-2.jpg",
    url: "https://www.amazon.es/s?k=cola+blanca+madera+carpintero+D3",
  },
  {
    path: "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-3.jpg",
    url: "https://www.amazon.es/s?k=ruedas+repuesto+guia+cajon+rodillo+nailon",
  },
  {
    path: "/images/reparaciones/como-arreglar-persiana-enrollable/herramienta-1.jpg",
    url: "https://www.amazon.es/s?k=destornillador+multiusos",
  },
  {
    path: "/images/reparaciones/como-arreglar-persiana-enrollable/herramienta-2.jpg",
    url: "https://www.amazon.es/s?k=wd40+spray+lubricante",
  },
  {
    path: "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-1.jpg",
    url: "https://www.amazon.es/s?k=resistencia+termo+electrico+blindada+1500w+brida",
  },
  {
    path: "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-2.jpg",
    url: "https://www.amazon.es/s?k=junta+goma+brida+termo+electrico+torica",
  },
  {
    path: "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-3.jpg",
    url: "https://www.amazon.es/s?k=llave+vaso+tubo+brida+termo+electrico+resistencia",
  },
  {
    path: "/images/reparaciones/como-limpiar-filtro-lavadora-no-desagua/producto-1.jpg",
    url: "https://www.amazon.es/s?k=cubeta+baja+rectangular+10+litros",
  },
  {
    path: "/images/reparaciones/como-limpiar-filtro-lavadora-no-desagua/producto-2.jpg",
    url: "https://www.amazon.es/s?k=limpiador+antical+lavadora+dr+beckmann",
  },
  {
    path: "/images/reparaciones/como-reparar-radiador-no-calienta/producto-2.jpg",
    url: "https://www.amazon.es/s?k=kit+purga+radiador+bandeja",
  },
  {
    path: "/images/reparaciones/como-reparar-radiador-no-calienta/producto-3.jpg",
    url: "https://www.amazon.es/s?k=cabezal+termostatico+digital+radiador",
  },
  {
    path: "/images/reparaciones/fontanero-vs-diy-cuando-llamar/producto-1.jpg",
    url: "https://www.amazon.es/s?k=kit+herramientas+hogar+108+piezas+stanley",
  },
  {
    path: "/images/reparaciones/fontanero-vs-diy-cuando-llamar/producto-2.jpg",
    url: "https://www.amazon.es/s?k=kit+fontaneria+basico+teflon+juntas+llave+inglesa",
  },
  {
    path: "/images/reparaciones/reparaciones-caseras-sin-experiencia/producto-2.jpg",
    url: "https://www.amazon.es/s?k=masilla+multiusos+aguaplast+pared",
  },
  {
    path: "/images/reparaciones/reparaciones-caseras-sin-experiencia/producto-3.jpg",
    url: "https://www.amazon.es/s?k=caja+herramientas+mannesmann+hogar",
  },
  {
    path: "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-1.jpg",
    url: "https://www.amazon.es/s?k=silicona+pattex+antimoho",
  },
  {
    path: "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-2.jpg",
    url: "https://www.amazon.es/s?k=removedor+silicona+quilosa",
  },
  {
    path: "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-3.jpg",
    url: "https://www.amazon.es/s?k=pistola+calafateo+wolfcraft",
  },
  {
    path: "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-4.jpg",
    url: "https://www.amazon.es/s?k=kit+retirada+silicona+espatula+alisador",
  },
  {
    path: "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-5.jpg",
    url: "https://www.amazon.es/s?k=silicona+antimoho+rubson+bano+transparente",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function extractImageFromSearch(page, searchUrl) {
  try {
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    await sleep(2000 + Math.random() * 1500);

    // Esperar a que carguen los resultados
    await page
      .waitForSelector('[data-component-type="s-search-result"]', {
        timeout: 10000,
      })
      .catch(() => {});

    // Extraer la primera imagen de producto (no patrocinado primero, si no el primero disponible)
    const imageUrl = await page.evaluate(() => {
      const results = document.querySelectorAll(
        '[data-component-type="s-search-result"]',
      );
      for (const result of results) {
        // Saltar patrocinados si es posible
        const isSponsored = result.querySelector(
          '.s-sponsored-label-info-icon, [data-component-type="s-sponsored-label"]',
        );
        const img = result.querySelector("img.s-image");
        if (img) {
          const src =
            img.getAttribute("src") || img.getAttribute("data-src") || "";
          if (src.includes("m.media-amazon.com/images/I/")) {
            // Normalizar a SL500
            return src.replace(/\._[A-Z0-9_,]+_\.jpg/, "._AC_SL500_.jpg");
          }
        }
      }
      // Si no encontró no-patrocinado, buscar cualquiera
      const firstImg = document.querySelector(
        '[data-component-type="s-search-result"] img.s-image',
      );
      if (firstImg) {
        const src = firstImg.getAttribute("src") || "";
        if (src.includes("m.media-amazon.com")) {
          return src.replace(/\._[A-Z0-9_,]+_\.jpg/, "._AC_SL500_.jpg");
        }
      }
      return null;
    });

    return imageUrl;
  } catch (e) {
    console.error(`Error en ${searchUrl}: ${e.message}`);
    return null;
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    locale: "es-ES",
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  const page = await context.newPage();

  // Eliminar señales de automatización
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const results = {};
  let done = 0;

  for (const product of PRODUCTS) {
    console.log(
      `[${++done}/${PRODUCTS.length}] ${product.path.split("/").pop()} — ${product.url.split("k=")[1]?.split("&")[0] ?? ""}`,
    );
    const imageUrl = await extractImageFromSearch(page, product.url);
    results[product.path] = imageUrl ?? "NO_IMAGE";
    console.log(`  → ${imageUrl ?? "NO_IMAGE"}`);
    await sleep(1500 + Math.random() * 1000);
  }

  await browser.close();

  writeFileSync(
    "scripts/amazon-images-result.json",
    JSON.stringify(results, null, 2),
  );
  console.log("\n✅ Resultados guardados en scripts/amazon-images-result.json");
  console.log(
    `Total: ${Object.values(results).filter((v) => v !== "NO_IMAGE").length}/${PRODUCTS.length} imágenes encontradas`,
  );
}

main().catch(console.error);
