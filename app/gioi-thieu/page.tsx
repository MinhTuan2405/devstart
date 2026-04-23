import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'DevStart là nền tảng học lập trình miễn phí cho người mới bắt đầu. Tìm hiểu về sứ mệnh và đội ngũ.',
  openGraph: {
    title: 'Giới thiệu | DevStart',
    description: 'DevStart là nền tảng học lập trình miễn phí cho người mới bắt đầu.',
    url: '/gioi-thieu',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới thiệu | DevStart',
    description: 'DevStart là nền tảng học lập trình miễn phí cho người mới bắt đầu.',
  },
  alternates: { canonical: '/gioi-thieu' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 xl:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Giới thiệu về DevStart</h1>

      <div className="prose prose-slate max-w-none">
        <p>
          <strong>DevStart</strong> là nền tảng học lập trình miễn phí, được xây dựng dành riêng
          cho người mới bắt đầu tại Việt Nam. Chúng tôi tin rằng ai cũng có thể học lập trình,
          bất kể xuất phát điểm.
        </p>

        <h2>Sứ mệnh</h2>
        <p>
          Mang đến nội dung học lập trình chất lượng bằng tiếng Việt, hoàn toàn miễn phí.
          Giúp người mới tiếp cận lập trình một cách dễ dàng và thú vị nhất.
        </p>

        <h2>Chúng tôi cung cấp gì?</h2>
        <ul>
          <li><strong>Khóa học có hệ thống</strong> — Python, C++, HTML/CSS từ cơ bản đến nâng cao</li>
          <li><strong>Blog chia sẻ kiến thức</strong> — Hướng dẫn, câu chuyện, giới thiệu công nghệ</li>
          <li><strong>Nội dung tiếng Việt</strong> — Dễ hiểu, có ví dụ thực tế</li>
          <li><strong>Hoàn toàn miễn phí</strong> — Không quảng cáo, không phí ẩn</li>
        </ul>

        <h2>Liên hệ</h2>
        <p>
          Nếu bạn có góp ý, câu hỏi, hoặc muốn đóng góp nội dung, hãy liên hệ
          qua email: <a href="mailto:contact@devstart.vn">contact@devstart.vn</a>
        </p>
      </div>
    </div>
  )
}
