import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f3d26 0%, #061c10 100%)', // Oscuro corporativo
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '120px', // Cuadrado con bordes redondeados (estilo app)
          boxShadow: 'inset 0 0 0 10px rgba(245, 158, 11, 0.2)', // Borde sutil ámbar
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '280px',
            height: '280px',
            background: '#f59e0b', // Ámbar puro
            borderRadius: '50%',
            position: 'relative',
          }}
        >
          {/* Un gran emoji o texto representativo */}
          <span style={{ fontSize: 160, display: 'flex' }}>🏠</span>
          <span style={{ fontSize: 80, position: 'absolute', bottom: -10, right: -10, display: 'flex', transform: 'rotate(-45deg)', background: '#fff', borderRadius: '50%', padding: '10px' }}>🔧</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
