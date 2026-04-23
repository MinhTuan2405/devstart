import type { Heading } from '@/lib/toc'

interface Props {
  headings: Heading[]
  /**
   * sidebar: sticky panel bên phải (dùng cho blog post layout 2 cột)
   * inline: card hiển thị đầu bài, trước nội dung chính (dùng cho lesson)
   */
  variant?: 'sidebar' | 'inline'
}

export default function TableOfContents({ headings, variant = 'sidebar' }: Props) {
  if (headings.length < 2) return null

  const items = (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li
          key={h.id}
          className={h.level === 3 ? 'pl-4' : ''}
        >
          <a
            href={`#${h.id}`}
            className="block rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )

  if (variant === 'inline') {
    return (
      <nav
        aria-label="Mục lục bài học"
        className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Mục lục
        </p>
        {items}
      </nav>
    )
  }

  return (
    <aside aria-label="Mục lục bài viết" className="hidden shrink-0 xl:block">
      <div className="sticky top-24 w-72 2xl:w-80">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.28)] ring-1 ring-slate-950/5 backdrop-blur">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Mục lục
          </p>
          <p className="mb-4 text-sm text-slate-500">
            Nhảy nhanh tới phần bạn cần.
          </p>
          {items}
        </div>
      </div>
    </aside>
  )
}
