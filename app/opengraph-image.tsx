import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

export const runtime = 'edge'
export const alt = 'DevStart - Học lập trình miễn phí'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0ea5e9 100%)',
          color: '#f8fafc',
          padding: '64px',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '30px',
            fontWeight: 700,
          }}
        >
          <span>DevStart</span>
          <span style={{ opacity: 0.75, fontSize: '24px' }}>Hoc lap trinh mien phi</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '66px', fontWeight: 800, lineHeight: 1.1, maxWidth: '980px' }}>
            Hoc lap trinh cho nguoi moi bat dau
          </div>
          <div style={{ fontSize: '30px', opacity: 0.85, maxWidth: '920px' }}>
            Python, C++, HTML/CSS voi lo trinh ro rang va bai hoc de hieu
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '24px',
            opacity: 0.9,
          }}
        >
          <span>{SITE_NAME}</span>
          <span>hoclaptrinhuit.netlify.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}