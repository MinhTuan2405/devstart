import Link from 'next/link'
import type { Lesson } from '@/lib/mdx'

interface LessonNavProps {
  prev: Lesson | null
  next: Lesson | null
  courseSlug: string
}

export default function LessonNav({ prev, next, courseSlug }: LessonNavProps) {
  return (
    <div className="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/khoa-hoc/${courseSlug}/${prev.slug}`}
          className="card-glow group rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Bài trước
          </div>
          <div className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
            {prev.frontmatter.title}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/khoa-hoc/${courseSlug}/${next.slug}`}
          className="card-glow group rounded-xl border border-slate-200 bg-white p-5 text-right"
        >
          <div className="mb-2 flex items-center justify-end gap-1.5 text-xs font-medium text-slate-400">
            Bài sau
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
          <div className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
            {next.frontmatter.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
