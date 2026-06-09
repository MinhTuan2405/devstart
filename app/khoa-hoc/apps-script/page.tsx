import type { Metadata } from 'next'
import LessonCard from '@/components/course/LessonCard'
import { getCourseWithLessons } from '@/lib/courses'
import Link from 'next/link'
import { toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Học Google Apps Script từ cơ bản đến nâng cao',
  description:
    'Khóa học Google Apps Script miễn phí: Sheets, Docs, Gmail, Drive, Forms, trigger, web app, API, OAuth, clasp và dự án thực tế.',
  keywords: [
    'học Google Apps Script',
    'Apps Script là gì',
    'học Apps Script cho người mới',
    'Google Apps Script cơ bản',
    'Google Apps Script nâng cao',
    'tự động hóa Google Sheets bằng Apps Script',
    'SpreadsheetApp Apps Script',
    'trigger Apps Script',
    'web app Apps Script',
    'clasp Apps Script',
    'Google Workspace automation',
  ],
  openGraph: {
    title: 'Học Google Apps Script từ cơ bản đến nâng cao | DevStart',
    description:
      'Khóa học Google Apps Script miễn phí: Sheets, Docs, Gmail, Drive, Forms, trigger, web app, API, OAuth, clasp và dự án thực tế.',
    url: '/khoa-hoc/apps-script',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Học Google Apps Script từ cơ bản đến nâng cao | DevStart',
    description:
      'Khóa học Google Apps Script miễn phí: Sheets, Docs, Gmail, Drive, Forms, trigger, web app, API, OAuth, clasp và dự án thực tế.',
  },
  alternates: { canonical: '/khoa-hoc/apps-script' },
}

export default function AppsScriptCoursePage() {
  const course = getCourseWithLessons('apps-script')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Học Google Apps Script từ cơ bản đến nâng cao',
    description:
      'Khóa học Google Apps Script miễn phí giúp người học tự động hóa Google Workspace với Sheets, Docs, Gmail, Drive, Forms, triggers, web apps, API, OAuth, clasp và dự án lead tracker thực tế.',
    provider: { '@type': 'Organization', name: 'DevStart' },
    url: toAbsoluteUrl('/khoa-hoc/apps-script'),
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
            <span className="font-medium text-slate-900">Apps Script</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-24 sm:w-24 sm:text-6xl"
              aria-hidden
            >
              ⚙️
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Khóa học
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Khóa học Apps Script
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Học Google Apps Script từ editor, JavaScript nền tảng và Google Sheets
                đến Gmail, Drive, Docs, Forms, triggers, HtmlService, web app, API,
                OAuth, clasp, workflow local và dự án lead tracker thực tế.
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
              courseSlug="apps-script"
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
