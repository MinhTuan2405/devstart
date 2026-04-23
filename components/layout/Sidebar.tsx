'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Lesson } from '@/lib/mdx'

interface SidebarProps {
  lessons: Lesson[]
  courseName: string
  courseSlug: string
}

export default function Sidebar({ lessons, courseName, courseSlug }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-24 hidden h-fit w-80 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <h3 className="text-sm font-bold text-slate-900">
          📚 {courseName}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{lessons.length} bài học</p>
      </div>
      <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto p-2">
        {lessons.map((lesson, index) => {
          const href = `/khoa-hoc/${courseSlug}/${lesson.slug}`
          const isActive = pathname === href

          return (
            <Link
              key={lesson.slug}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                isActive
                  ? 'bg-blue-50 shadow-sm'
                  : 'hover:bg-slate-50'
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
              }`}>
                {index + 1}
              </span>
              <span className={`line-clamp-2 text-sm ${
                isActive
                  ? 'font-semibold text-blue-700'
                  : 'text-slate-600 group-hover:text-slate-900'
              }`}>
                {lesson.frontmatter.title}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
