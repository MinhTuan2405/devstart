import type { Metadata } from 'next'
import { Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://devstart.vn'),
  title: {
    default: 'DevStart - Học lập trình miễn phí cho người mới bắt đầu',
    template: '%s | DevStart',
  },
  description:
    'Nền tảng học lập trình miễn phí. Khóa học Python, C++, HTML/CSS từ cơ bản đến nâng cao. Phù hợp người chưa có kinh nghiệm.',
  keywords: [
    'học lập trình',
    'học python',
    'học c++',
    'học html css',
    'lập trình cho người mới',
    'học code miễn phí',
  ],
  openGraph: {
    title: 'DevStart - Học lập trình miễn phí cho người mới bắt đầu',
    description:
      'Nền tảng học lập trình miễn phí. Khóa học Python, C++, HTML/CSS từ cơ bản đến nâng cao.',
    url: 'https://devstart.vn',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://devstart.vn',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnam.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
