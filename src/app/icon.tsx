import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0f3d26 0%, #061c10 100%)", // Verde oscuro corporativo
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "120px", // Cuadrado redondeado (App Icon)
        border: "12px solid #0f3d26",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "320px",
          height: "320px",
          background: "#f59e0b", // Ámbar puro / Oro (Color de fiabilidad/herramientas)
          borderRadius: "50%", // Círculo principal
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* SVG super limpio y simétrico de un Martillo (Hammer) estilo Material Design */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0f3d26"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Clásico martillo girado a 45 grados */}
          <path d="m15 12-8.373 8.373a1 1 0 1 1-1.414-1.414L13.586 10.586" />
          <path d="m18 13.586-9.043-9.043a1.5 1.5 0 0 0-2.121 2.121l1.414 1.414" />
          <path d="M12.586 6.586 15 4a2 2 0 0 1 2.828 0l2.172 2.172a2 2 0 0 1 0 2.828l-2.586 2.586" />
          <path d="m18 9 3 3" />
          <path d="m14 5 3 3" />
        </svg>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
