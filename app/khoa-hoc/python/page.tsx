import type { Metadata } from 'next'
import LessonCard from '@/components/course/LessonCard'
import { getCourseWithLessons } from '@/lib/courses'
import Link from 'next/link'
import { toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Học Python cơ bản cho người mới bắt đầu',
  description:
    'Khóa học Python miễn phí từ cơ bản đến nâng cao. Phù hợp người chưa có kinh nghiệm lập trình.',
  keywords: ['học python', 'python cơ bản', 'lập trình python miễn phí', 'python cho người mới'],
  openGraph: {
    title: 'Học Python cơ bản cho người mới bắt đầu | DevStart',
    description:
      'Khóa học Python miễn phí từ cơ bản đến nâng cao. Phù hợp người chưa có kinh nghiệm lập trình.',
    url: '/khoa-hoc/python',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Học Python cơ bản cho người mới bắt đầu | DevStart',
    description:
      'Khóa học Python miễn phí từ cơ bản đến nâng cao. Phù hợp người chưa có kinh nghiệm lập trình.',
  },
  alternates: {
    canonical: '/khoa-hoc/python',
  },
}

export default function PythonCoursePage() {
  const course = getCourseWithLessons('python')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Học Python cơ bản cho người mới bắt đầu',
    description: 'Khóa học Python miễn phí từ cơ bản đến nâng cao.',
    provider: { '@type': 'Organization', name: 'DevStart' },
    url: toAbsoluteUrl('/khoa-hoc/python'),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero-gradient px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-8 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc" className="hover:text-blue-600">
              Khóa học
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">Python</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden
            >
              🐍
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Khóa học
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Khóa học Python
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Ngôn ngữ lập trình phổ biến nhất, dễ học, phù hợp người mới bắt đầu.
              </p>
              <p className="mt-4 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80">
                {course?.totalLessons || 0} bài học
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-3">
          {course?.lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.slug}
              lesson={lesson}
              courseSlug="python"
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
