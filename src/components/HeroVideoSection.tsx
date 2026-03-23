'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

const FRAME_COUNT = 192
const FRAME_COUNT_MOBILE = 48   // 1 de cada 4 frames en móvil — misma duración, menos MB
const FPS = 24

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
) {
  const imgAR = img.naturalWidth / img.naturalHeight
  const canvasAR = canvasW / canvasH

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

  if (canvasAR > imgAR) {
    // Canvas más ancho: ajustar por anchura, recortar altura
    sh = img.naturalWidth / canvasAR
    sy = (img.naturalHeight - sh) / 2
  } else {
    // Canvas más alto: ajustar por altura, recortar anchura
    sw = img.naturalHeight * canvasAR
    sx = (img.naturalWidth - sw) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH)
}

export function HeroVideoSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const totalFrames = isMobile ? FRAME_COUNT_MOBILE : FRAME_COUNT
  // Stride: en móvil cargamos 1 de cada 4 frames del vídeo (0001, 0005, 0009...)
  const frameStride = isMobile ? 4 : 1

  const sectionRef        = useRef<HTMLDivElement>(null)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const framesRef         = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null))
  const currentFrameRef   = useRef(0)
  const isScrollingRef    = useRef(false)
  const scrollTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef            = useRef<number | null>(null)
  const firstFrameLoaded  = useRef(false)

  // ── Dibujar frame en canvas ────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    const frame  = framesRef.current[index]
    if (!canvas || !ctx || !frame) return

    drawCover(ctx, frame, canvas.width, canvas.height)
    currentFrameRef.current = index
  }, [])

  // ── Loop de autoplay (requestAnimationFrame) ───────────────────────────────
  const startAutoplay = useCallback(() => {
    const interval = 1000 / FPS
    let lastTime   = 0

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      if (isScrollingRef.current) return          // el scroll tiene prioridad
      if (now - lastTime < interval) return
      lastTime = now
      const next = (currentFrameRef.current + 1) % FRAME_COUNT
      // Avanzar solo si el frame siguiente ya está cargado
      if (framesRef.current[next]) drawFrame(next)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [drawFrame])

  // ── Scroll handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const scrollable = section.offsetHeight - window.innerHeight
      const progress   = Math.max(0, Math.min(1, window.scrollY / scrollable))
      const frameIndex = Math.round(progress * (totalFrames - 1)) * frameStride

      isScrollingRef.current = true
      drawFrame(frameIndex)

      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 400)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [drawFrame])

  // ── Precargar frames + resize canvas ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      // Redibujar frame actual al cambiar tamaño
      const frame = framesRef.current[currentFrameRef.current]
      if (frame) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawCover(ctx, frame, canvas.width, canvas.height)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Carga progresiva: primeros frames inmediatos, resto en background
    // En móvil: stride=4, solo cargamos 1 de cada 4 frames (indices 0,4,8,12...)
    const loadFrame = (realIndex: number) => {
      if (framesRef.current[realIndex]) return
      const img = new window.Image()
      img.onload = () => {
        framesRef.current[realIndex] = img
        if (!firstFrameLoaded.current) {
          firstFrameLoaded.current = true
          drawFrame(0)
          startAutoplay()
        }
      }
      img.src = `/frames/frame-${String(realIndex + 1).padStart(4, '0')}.jpg`
    }

    // Construir lista de índices a cargar según dispositivo
    const indicesToLoad: number[] = []
    for (let i = 0; i < FRAME_COUNT; i += frameStride) indicesToLoad.push(i)

    // Primer bloque: primeros 10 índices (carga inmediata)
    for (let i = 0; i < Math.min(10, indicesToLoad.length); i++) loadFrame(indicesToLoad[i])

    // Resto: en batches con pequeño delay
    let batchStart = 10
    const loadBatch = () => {
      const batch = indicesToLoad.slice(batchStart, batchStart + 20)
      batch.forEach(loadFrame)
      batchStart += 20
      if (batchStart < indicesToLoad.length) setTimeout(loadBatch, 50)
    }
    setTimeout(loadBatch, 80)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current)    cancelAnimationFrame(rafRef.current)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [drawFrame, startAutoplay])

  return (
    <div ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas — frames pintados aquí */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Overlay izquierda→derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d26]/95 via-[#0f3d26]/70 to-[#0f3d26]/20" />
        {/* Fade inferior hacia la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f3d26] to-transparent" />

        {/* Contenido */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
                🔧 Guías gratuitas de bricolaje
              </span>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Repara tu hogar<br />
                <span className="text-amber-400">sin llamar al técnico</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                Guías paso a paso con fotos reales para fontanería, electricidad, herramientas y reformas.
                Ahorra cientos de euros al año haciéndolo tú mismo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/reparaciones"
                  className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-amber-900/30 transition-colors hover:bg-amber-600"
                >
                  Ver guías →
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Quiénes somos
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
                {[
                  { n: '25+', label: 'Guías gratuitas' },
                  { n: '300€', label: 'Ahorro medio/reparación' },
                  { n: '0€', label: 'Sin registro' },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-amber-400">{n}</p>
                    <p className="text-sm text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">Scroll</span>
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
