import Link from 'next/link'
import Badge, { getDifficultyVariant } from '@/components/ui/Badge'

interface CourseCardProps {
  icon: string
  name: string
  description: string
  totalLessons: number
  difficulty: string
  slug: string
}

const courseColors: Record<string, { bg: string; border: string; iconBg: string; btn: string }> = {
  python: {
    bg: 'from-blue-50 to-white',
    border: 'border-blue-100 hover:border-blue-300',
    iconBg: 'bg-blue-100',
    btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25',
  },
  cpp: {
    bg: 'from-amber-50 to-white',
    border: 'border-amber-100 hover:border-amber-300',
    iconBg: 'bg-amber-100',
    btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25',
  },
  'html-css': {
    bg: 'from-emerald-50 to-white',
    border: 'border-emerald-100 hover:border-emerald-300',
    iconBg: 'bg-emerald-100',
    btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25',
  },
  'machine-learning': {
    bg: 'from-violet-50 to-white',
    border: 'border-violet-100 hover:border-violet-300',
    iconBg: 'bg-violet-100',
    btn: 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/25',
  },
}

export default function CourseCard({
  icon,
  name,
  description,
  totalLessons,
  difficulty,
  slug,
}: CourseCardProps) {
  const colors = courseColors[slug] || courseColors.python

  return (
    <div className={`card-glow group relative overflow-hidden rounded-2xl border bg-gradient-to-b p-8 ${colors.bg} ${colors.border}`}>
      <div className="pointer-events-none absolute -right-6 -top-6 text-[120px] leading-none opacity-[0.06] transition-all group-hover:opacity-[0.1]">
        {icon}
      </div>

      <div className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} text-3xl shadow-sm`}>
        {icon}
      </div>
      <h3 className="relative mb-2 text-xl font-bold text-slate-900">{name}</h3>
      <p className="relative mb-6 text-sm leading-relaxed text-slate-500">{description}</p>

      <div className="relative mb-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1">
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span className="text-xs font-medium text-slate-600">{totalLessons} bài học</span>
        </div>
        <Badge text={difficulty} variant={getDifficultyVariant(difficulty)} />
      </div>

      <Link
        href={`/khoa-hoc/${slug}`}
        className={`relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${colors.btn}`}
      >
        Bắt đầu học
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </Link>
    </div>
  )
}
