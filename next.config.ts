import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cuota de Image Optimization agotada en la cuenta: un 402 en /_next/image
    // deja la imagen ROTA en produccion, no degradada. Los originales de /public
    // se han reprocesado (168 MB -> 25 MB, ninguno pasa de 270 KB), asi que se
    // sirven directos sin pasar por el optimizador. Cero transformaciones.
    // Para reactivar la optimizacion basta con quitar esta linea.
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Amazon product images (for AffiliateCard)
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
