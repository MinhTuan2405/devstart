import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                D
              </div>
              <span className="text-lg font-bold text-white">
                Dev<span className="text-blue-400">Start</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Nền tảng học lập trình miễn phí cho người mới bắt đầu. Nội dung tiếng Việt dễ hiểu.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Khóa học
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/khoa-hoc/python', label: '🐍 Học Python', },
                { href: '/khoa-hoc/cpp', label: '⚡ Học C++' },
                { href: '/khoa-hoc/html-css', label: '🌐 Học HTML/CSS' },
                { href: '/khoa-hoc/machine-learning', label: '🤖 Học Machine Learning' },
                { href: '/khoa-hoc/claude-code', label: '🧠 Học Claude Code' },
                { href: '/khoa-hoc/sql', label: '🗄️ Học SQL' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Blog
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/blog/huong-dan', label: 'Hướng dẫn' },
                { href: '/blog/truyen', label: 'Truyện lập trình' },
                { href: '/blog/gioi-thieu', label: 'Giới thiệu công nghệ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Liên kết
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/gioi-thieu" className="text-sm transition-colors hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm transition-colors hover:text-white">
                  Tất cả bài viết
                </Link>
              </li>
              <li>
                <Link href="/interview" className="text-sm transition-colors hover:text-white">
                  Interview
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} DevStart. Tất cả nội dung miễn phí cho cộng đồng.
          </p>
          <p className="text-xs text-slate-500">
            Xây dựng bằng Next.js · Deploy trên Netlify
          </p>
        </div>
      </div>
    </footer>
  )
}
