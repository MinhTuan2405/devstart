import type { Metadata } from 'next'
import InterviewCategoryCard from '@/components/interview/InterviewCategoryCard'
import { getAllInterviewCategorySummaries } from '@/lib/interviews'

export const metadata: Metadata = {
  title: 'Interview: câu hỏi phỏng vấn lập trình phổ biến',
  description:
    'Tổng hợp câu hỏi phỏng vấn frontend, backend, database, DevOps, mobile và kiến thức nền tảng bằng tiếng Việt để ôn tập nhanh.',
  keywords: [
    'fullstack interview',
    'câu hỏi phỏng vấn lập trình',
    'frontend interview',
    'backend interview',
    'câu hỏi phỏng vấn devops',
  ],
  openGraph: {
    title: 'Interview: câu hỏi phỏng vấn lập trình phổ biến | DevStart',
    description:
      'Tổng hợp câu hỏi phỏng vấn frontend, backend, database, DevOps, mobile và kiến thức nền tảng bằng tiếng Việt để ôn tập nhanh.',
    url: '/interview',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview: câu hỏi phỏng vấn lập trình phổ biến | DevStart',
    description:
      'Tổng hợp câu hỏi phỏng vấn frontend, backend, database, DevOps, mobile và kiến thức nền tảng bằng tiếng Việt để ôn tập nhanh.',
  },
  alternates: {
    canonical: '/interview',
  },
}

export default function FullstackInterviewsPage() {
  const categories = getAllInterviewCategorySummaries()
  const totalTopics = categories.reduce((sum, category) => sum + category.totalTopics, 0)
  const totalQuestions = categories.reduce((sum, category) => sum + category.totalQuestions, 0)

  return (
    <section className="py-16">
      <div className="site-container">
        <div className="mb-10 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Interview Prep
          </span>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Bộ câu hỏi interview chất lượng
          </h1>
          <p className="mt-3 text-slate-500">
            Bộ câu hỏi phỏng vấn được chia theo nhóm chủ đề để bạn ôn tập nhanh trước buổi phỏng vấn kỹ thuật.
            Nội dung đã được chuẩn hóa về SEO, dễ đọc và dễ tra cứu lại.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">{categories.length} nhóm chủ đề</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{totalTopics} bài ôn tập</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{totalQuestions} câu hỏi</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <InterviewCategoryCard
              key={category.slug}
              icon={category.icon}
              name={category.name}
              description={category.description}
              slug={category.slug}
              totalTopics={category.totalTopics}
              totalQuestions={category.totalQuestions}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
