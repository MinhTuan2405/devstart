import Link from 'next/link'
import Badge, { getDifficultyVariant } from '@/components/ui/Badge'
import type { Lesson } from '@/lib/mdx'

interface LessonCardProps {
  lesson: Lesson
  courseSlug: string
  index: number
}

export default function LessonCard({ lesson, courseSlug, index }: LessonCardProps) {
  const { frontmatter } = lesson

  return (
    <Link
      href={`/khoa-hoc/${courseSlug}/${lesson.slug}`}
      className="card-glow group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
        {index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
          {frontmatter.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {frontmatter.description}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {frontmatter.duration}
          </div>
          <Badge text={frontmatter.difficulty} variant={getDifficultyVariant(frontmatter.difficulty)} />
        </div>
      </div>
      <svg className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </Link>
  )
}
