import Link from 'next/link'
import type { InterviewArticle } from '@/lib/interviews'

interface InterviewNavProps {
  prev: InterviewArticle | null
  next: InterviewArticle | null
  categorySlug: string
}

export default function InterviewNav({ prev, next, categorySlug }: InterviewNavProps) {
  return (
    <div className="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/interview/${categorySlug}/${prev.slug}`}
          className="card-glow group rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Chủ đề trước
          </div>
          <div className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
            {prev.frontmatter.topic}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/interview/${categorySlug}/${next.slug}`}
          className="card-glow group rounded-xl border border-slate-200 bg-white p-5 text-right"
        >
          <div className="mb-2 flex items-center justify-end gap-1.5 text-xs font-medium text-slate-400">
            Chủ đề tiếp theo
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
          <div className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
            {next.frontmatter.topic}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
