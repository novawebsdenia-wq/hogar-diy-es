export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hogardiy.es";
export const SITE_NAME = "HogarDIY.es";
export const SITE_DESCRIPTION =
  "Arregla tu casa sin fontanero ni electricista. Guías paso a paso probadas por Carlos Martín, técnico con 15 años de experiencia. Ahorra 60-300€ por reparación.";
export const SITE_AUTHOR = "HogarDIY.es";
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-BNL1M6YHE9";
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "hogardiyes-21";

export const CATEGORIES: Record<
  string,
  { label: string; description: string; emoji: string }
> = {
  reparaciones: {
    label: "Reparaciones",
    description:
      "Arregla grifos, cisternas, persianas, enchufes e interruptores sin llamar al técnico. Guías con fotos reales y ahorro garantizado en cada reparación.",
    emoji: "🔧",
  },
  herramientas: {
    label: "Herramientas",
    description:
      "¿Qué taladro comprar? ¿Vale la pena la sierra caladora? Comparativas honestas y guías de compra para no malgastar dinero en herramientas que no usarás.",
    emoji: "🪛",
  },
  reformas: {
    label: "Reformas",
    description:
      "Pinta tu casa, instala suelo vinílico o alisa el gotelé este fin de semana. Reformas low-cost con resultado profesional y sin albañil.",
    emoji: "🏠",
  },
  jardin: {
    label: "Jardín",
    description:
      "Monta tu riego automático, construye una jardinera o aprende a cortar el césped bien. Guías prácticas para un jardín cuidado sin jardinero.",
    emoji: "🌱",
  },
  "ahorro-energetico": {
    label: "Ahorro Energético",
    description:
      "Sella ventanas, instala válvulas termoestáticas o aísla la caja de la persiana. Pequeñas mejoras que pueden bajar tu factura del gas un 15-30%.",
    emoji: "💡",
  },
};
