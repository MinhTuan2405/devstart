import type { Metadata } from 'next'
import { Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'
import Script from 'next/script'

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
  verification: {
    google: 'VAGmWhZCe6ftSvf9sXD54Q6ks6lRm0hj3tbndUJlyF8',
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
      <body className={`${beVietnam.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/*<!-- Google tag (gtag.js) -->*/}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SY56EQ6GW7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SY56EQ6GW7');
          `}
        </Script>
      </body>
    </html>
  )
}
