export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hogardiy.es";
export const SITE_NAME = "HogarDIY.es";
// ≤155 chars para que Google no truncque la descripción de la home
export const SITE_DESCRIPTION =
  "Arregla tu casa sin fontanero ni electricista. Guías paso a paso de Carlos Martín, técnico con 15 años de experiencia. Ahorra hasta 300€.";
export const SITE_AUTHOR = "HogarDIY.es";
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-BNL1M6YHE9";
export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-7451904814874802";
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "hogardiyes-21";

export const CATEGORIES: Record<
  string,
  { label: string; titleSeo: string; description: string; emoji: string }
> = {
  reparaciones: {
    label: "Reparaciones",
    titleSeo: "Reparaciones del Hogar Paso a Paso",
    description:
      "Arregla grifos, cisternas, persianas, enchufes e interruptores tú mismo. Guías con fotos reales para cada reparación. Ahorra 60–200€ sin llamar al técnico.",
    emoji: "🔧",
  },
  herramientas: {
    label: "Herramientas",
    titleSeo: "Guías y Comparativas de Herramientas de Bricolaje",
    description:
      "¿Qué taladro comprar? ¿Vale la pena la sierra caladora? Comparativas honestas y guías de compra para no malgastar dinero en herramientas que no usarás.",
    emoji: "🪛",
  },
  reformas: {
    label: "Reformas",
    titleSeo: "Reformas del Hogar Low-Cost Sin Albañil",
    description:
      "Pinta paredes, instala suelo vinílico o elimina el gotelé este fin de semana. Reformas low-cost con resultado profesional sin necesidad de albañil.",
    emoji: "🏠",
  },
  jardin: {
    label: "Jardín",
    titleSeo: "Jardín y Riego DIY: Guías Paso a Paso",
    description:
      "Monta tu riego automático, construye jardineras o aprende a mantener el césped. Guías prácticas para un jardín cuidado sin jardinero y ahorrando dinero.",
    emoji: "🌱",
  },
  "ahorro-energetico": {
    label: "Ahorro Energético",
    titleSeo: "Ahorro Energético en Casa: Mejoras Fáciles y Económicas",
    description:
      "Sella ventanas, instala válvulas termoestáticas o aísla la caja de la persiana. Pequeñas mejoras que pueden bajar tu factura del gas un 15–30%.",
    emoji: "💡",
  },
};
