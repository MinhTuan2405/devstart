'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { href: '/blog', label: 'Tất cả', icon: '📋' },
  { href: '/blog/huong-dan', label: 'Hướng dẫn', icon: '📖' },
  { href: '/blog/truyen', label: 'Truyện', icon: '📝' },
  { href: '/blog/gioi-thieu', label: 'Giới thiệu', icon: '🔍' },
]

export default function BlogFilter() {
  const pathname = usePathname()

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = pathname === cat.href

        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Link>
        )
      })}
    </div>
  )
}
