"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    window.dispatchEvent(
      new CustomEvent("cookie_consent_change", { detail: "accepted" }),
    );
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[#0f3d26] text-white shadow-2xl border border-white/10 p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold mb-1">🍪 Este sitio usa cookies</p>
            <p className="text-xs text-white/70 leading-relaxed">
              Usamos cookies propias y de terceros (Google Analytics, AdSense y
              Amazon Afiliados) para analizar el tráfico y mostrar publicidad
              relevante.{" "}
              <Link
                href="/politica-cookies"
                className="underline hover:text-amber-400 transition-colors"
              >
                Más información
              </Link>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 border border-white/20 hover:border-white/40 hover:text-white transition-all"
            >
              Solo necesarias
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-400 transition-colors shadow-md"
            >
              Aceptar todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
