import Link from 'next/link'

interface InterviewCategoryCardProps {
  icon: string
  name: string
  description: string
  slug: string
  totalTopics: number
  totalQuestions: number
}

const categoryColors: Record<string, { bg: string; border: string; iconBg: string; btn: string }> = {
  basics: {
    bg: 'from-sky-50 to-white',
    border: 'border-sky-100 hover:border-sky-300',
    iconBg: 'bg-sky-100',
    btn: 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/25',
  },
  frontend: {
    bg: 'from-pink-50 to-white',
    border: 'border-pink-100 hover:border-pink-300',
    iconBg: 'bg-pink-100',
    btn: 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/25',
  },
  backend: {
    bg: 'from-violet-50 to-white',
    border: 'border-violet-100 hover:border-violet-300',
    iconBg: 'bg-violet-100',
    btn: 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/25',
  },
  database: {
    bg: 'from-emerald-50 to-white',
    border: 'border-emerald-100 hover:border-emerald-300',
    iconBg: 'bg-emerald-100',
    btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25',
  },
  devops: {
    bg: 'from-amber-50 to-white',
    border: 'border-amber-100 hover:border-amber-300',
    iconBg: 'bg-amber-100',
    btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25',
  },
  mobile: {
    bg: 'from-indigo-50 to-white',
    border: 'border-indigo-100 hover:border-indigo-300',
    iconBg: 'bg-indigo-100',
    btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25',
  },
}

export default function InterviewCategoryCard({
  icon,
  name,
  description,
  slug,
  totalTopics,
  totalQuestions,
}: InterviewCategoryCardProps) {
  const colors = categoryColors[slug] || categoryColors.basics

  return (
    <div className={`card-glow group relative overflow-hidden rounded-2xl border bg-gradient-to-b p-8 ${colors.bg} ${colors.border}`}>
      <div className="pointer-events-none absolute -right-6 -top-6 text-[110px] leading-none opacity-[0.06] transition-all group-hover:opacity-[0.1]">
        {icon}
      </div>

      <div className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} text-3xl shadow-sm`}>
        {icon}
      </div>

      <h3 className="relative mb-2 text-xl font-bold text-slate-900">{name}</h3>
      <p className="relative mb-6 text-sm leading-relaxed text-slate-500">{description}</p>

      <div className="relative mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1">
          <span className="text-xs font-medium text-slate-600">{totalTopics} chủ đề</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1">
          <span className="text-xs font-medium text-slate-600">{totalQuestions} câu hỏi</span>
        </div>
      </div>

      <Link
        href={`/interview/${slug}`}
        className={`relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${colors.btn}`}
      >
        Xem chủ đề
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </Link>
    </div>
  )
}
