import Link from "next/link";

export function HeroVideoSection() {
  return (
    <div className="relative h-[90svh] min-h-[600px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full">
        {/* Video Nativo HTML5: Rendimiento máximo a 60 FPS independientemente del dispositivo */}
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        {/* Overlay izquierda→derecha para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d26]/95 via-[#0f3d26]/70 to-[#0f3d26]/20" />

        {/* Fade inferior hacia la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f3d26] to-transparent" />

        {/* Contenido Textual */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
                🔧 Probado por un técnico con 15 años de experiencia
              </span>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Repara tu hogar
                <br />
                <span className="text-amber-400">sin llamar al técnico</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                ¿Grifo que gotea? ¿Cisterna que no para? ¿Enchufe que no
                funciona? Guías probadas por un técnico para que lo arregles tú
                mismo en menos de 1 hora — y ahorres 60-300€ por visita.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/reparaciones"
                  className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-amber-900/30 transition-transform hover:scale-105 active:scale-95"
                >
                  Ver las guías →
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                >
                  Quién es Carlos →
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
                {[
                  { n: "50+", label: "Guías gratuitas" },
                  { n: "300€", label: "Ahorro medio/reparación" },
                  { n: "15 años", label: "Experiencia del autor" },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-amber-400">
                      {n}
                    </p>
                    <p className="text-sm text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
