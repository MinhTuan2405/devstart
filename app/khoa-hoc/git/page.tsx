import type { Metadata } from 'next'
import LessonCard from '@/components/course/LessonCard'
import { getCourseWithLessons } from '@/lib/courses'
import Link from 'next/link'
import { toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Học Git từ cơ bản đến nâng cao',
  description:
    'Khóa học Git miễn phí: commit, branch, merge, remote, pull request, rebase, undo, bảo mật và workflow doanh nghiệp.',
  keywords: [
    'học git',
    'git là gì',
    'học git cho người mới bắt đầu',
    'git cơ bản',
    'git nâng cao',
    'khóa học git miễn phí',
    'git trong doanh nghiệp',
    'git workflow',
    'pull request là gì',
    'xử lý conflict git',
    'git rebase',
    'git revert',
  ],
  openGraph: {
    title: 'Học Git từ cơ bản đến nâng cao | DevStart',
    description:
      'Khóa học Git miễn phí: commit, branch, merge, remote, pull request, rebase, undo, bảo mật và workflow doanh nghiệp.',
    url: '/khoa-hoc/git',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Học Git từ cơ bản đến nâng cao | DevStart',
    description:
      'Khóa học Git miễn phí: commit, branch, merge, remote, pull request, rebase, undo, bảo mật và workflow doanh nghiệp.',
  },
  alternates: { canonical: '/khoa-hoc/git' },
}

export default function GitCoursePage() {
  const course = getCourseWithLessons('git')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Học Git từ cơ bản đến nâng cao',
    description:
      'Khóa học Git miễn phí giúp người học nắm commit, branch, merge, remote, pull request, rebase, undo, hooks, bảo mật, debug lịch sử và workflow doanh nghiệp.',
    provider: { '@type': 'Organization', name: 'DevStart' },
    url: toAbsoluteUrl('/khoa-hoc/git'),
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
            <span className="font-medium text-slate-900">Git</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden
            >
              🌿
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Khóa học
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Khóa học Git
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Học Git từ khái niệm repository, staging và commit đến branch, merge,
                remote, pull request, rebase, undo, hooks, bảo mật, debug lịch sử và
                workflow thực chiến trong doanh nghiệp.
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
              courseSlug="git"
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
