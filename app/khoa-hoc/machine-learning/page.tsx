import type { Metadata } from 'next'
import LessonCard from '@/components/course/LessonCard'
import { getCourseWithLessons } from '@/lib/courses'
import Link from 'next/link'
import { toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Học Machine Learning cho người mới bắt đầu',
  description:
    'Khóa học Machine Learning miễn phí cho người mới: machine learning là gì, quy trình ML, tiền xử lý dữ liệu, linear regression, decision tree và clustering.',
  keywords: [
    'học machine learning',
    'machine learning cơ bản',
    'machine learning là gì',
    'học máy cho người mới',
    'học machine learning bắt đầu từ đâu',
    'khóa học machine learning miễn phí',
    'quy trình machine learning cơ bản',
    'train validation test là gì',
    'tiền xử lý dữ liệu cho machine learning',
    'linear regression là gì',
    'decision tree là gì',
    'random forest là gì',
    'clustering trong machine learning là gì',
  ],
  openGraph: {
    title: 'Học Machine Learning cho người mới bắt đầu | DevStart',
    description:
      'Khóa học Machine Learning miễn phí cho người mới: machine learning là gì, quy trình ML, tiền xử lý dữ liệu, linear regression, decision tree và clustering.',
    url: '/khoa-hoc/machine-learning',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Học Machine Learning cho người mới bắt đầu | DevStart',
    description:
      'Khóa học Machine Learning miễn phí cho người mới: machine learning là gì, quy trình ML, tiền xử lý dữ liệu, linear regression, decision tree và clustering.',
  },
  alternates: { canonical: '/khoa-hoc/machine-learning' },
}

export default function MachineLearningCoursePage() {
  const course = getCourseWithLessons('machine-learning')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Học Machine Learning cho người mới bắt đầu',
    description:
      'Khóa học Machine Learning miễn phí cho người mới, đi từ khái niệm cơ bản, dữ liệu, tiền xử lý đến các mô hình như linear regression, decision tree và clustering.',
    provider: { '@type': 'Organization', name: 'DevStart' },
    url: toAbsoluteUrl('/khoa-hoc/machine-learning'),
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
            <Link href="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc" className="hover:text-blue-600">
              Khóa học
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">Machine Learning</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden
            >
              🤖
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Khóa học
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Khóa học Machine Learning
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Học từ câu hỏi machine learning là gì đến quy trình ML, tiền xử lý dữ liệu,
                linear regression, decision tree, random forest và clustering cho người mới.
              </p>
              <p className="mt-4 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
                {course?.totalLessons || 0} bài học
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container py-12">
        <div className="space-y-3">
          {course?.lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.slug}
              lesson={lesson}
              courseSlug="machine-learning"
              index={index}
            />
          ))}
        </div>

        {(!course || course.lessons.length === 0) && (
          <p className="text-slate-400">Chưa có bài học nào. Nội dung đang được cập nhật!</p>
        )}
      </div>
    </>
  )
}
