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
    <ul className="space-y-1 text-sm">
      {headings.map((h) => (
        <li
          key={h.id}
          className={h.level === 3 ? 'pl-4' : ''}
        >
          <a
            href={`#${h.id}`}
            className="block rounded px-2 py-1 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
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
    <aside aria-label="Mục lục bài viết" className="hidden xl:block">
      <div className="sticky top-24 w-56">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Mục lục
        </p>
        {items}
      </div>
    </aside>
  )
}
