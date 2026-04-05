import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

export const runtime = 'edge'
export const alt = 'DevStart - Học lập trình miễn phí'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(145deg, #1d4ed8 0%, #0f172a 55%, #06b6d4 100%)',
          color: '#f8fafc',
          padding: '64px',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: '34px', fontWeight: 700 }}>{SITE_NAME}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '62px', fontWeight: 800, lineHeight: 1.1, maxWidth: '980px' }}>
            Khoa hoc lap trinh mien phi
          </div>
          <div style={{ fontSize: '30px', opacity: 0.9, maxWidth: '920px' }}>
            Bat dau voi Python, C++, HTML/CSS bang tieng Viet
          </div>
        </div>
        <div style={{ fontSize: '24px', opacity: 0.9 }}>hoclaptrinhuit.netlify.app</div>
      </div>
    ),
    {
      ...size,
    }
  )
}