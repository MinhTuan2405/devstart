import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import InterviewTopicCard from '@/components/interview/InterviewTopicCard'
import {
  getInterviewCategories,
  getInterviewCategoryWithArticles,
  isInterviewCategory,
} from '@/lib/interviews'
import { toAbsoluteUrl } from '@/lib/seo'

interface PageProps {
  params: { category: string }
}

export async function generateStaticParams() {
  return getInterviewCategories().map((category) => ({ category }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isInterviewCategory(params.category)) {
    return { title: 'Chủ đề không tồn tại' }
  }

  const category = getInterviewCategoryWithArticles(params.category)
  if (!category) {
    return { title: 'Chủ đề không tồn tại' }
  }

  const title = `${category.name}: câu hỏi phỏng vấn phổ biến`
  const description = `${category.description} Tổng hợp ${category.totalTopics} chủ đề và ${category.totalQuestions} câu hỏi bằng tiếng Việt.`

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} interview`,
      `câu hỏi phỏng vấn ${category.name.toLowerCase()}`,
      `ôn phỏng vấn ${category.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${title} | DevStart`,
      description,
      url: `/interview/${params.category}`,
      siteName: 'DevStart',
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DevStart`,
      description,
    },
    alternates: {
      canonical: `/interview/${params.category}`,
    },
  }
}

export default function InterviewCategoryPage({ params }: PageProps) {
  if (!isInterviewCategory(params.category)) notFound()

  const category = getInterviewCategoryWithArticles(params.category)
  if (!category) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name}: câu hỏi phỏng vấn phổ biến`,
    description: category.description,
    url: toAbsoluteUrl(`/interview/${params.category}`),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-gradient px-4 py-12 sm:px-6 xl:px-8">
        <div className="site-frame">
          <nav className="mb-8 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/interview" className="hover:text-blue-600">Interview</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">{category.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden
            >
              {category.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Interview Prep
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                {category.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-slate-200/80">
                  {category.totalTopics} chủ đề
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-slate-200/80">
                  {category.totalQuestions} câu hỏi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container py-12">
        <div className="space-y-3">
          {category.interviews.map((interview) => (
            <InterviewTopicCard key={interview.slug} interview={interview} />
          ))}
        </div>

        {category.interviews.length === 0 && (
          <p className="text-slate-400">Chưa có chủ đề nào trong nhóm này. Nội dung đang được cập nhật!</p>
        )}
      </div>
    </>
  )
}
