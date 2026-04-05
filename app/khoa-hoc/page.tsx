import type { Metadata } from 'next'
import CourseCard from '@/components/course/CourseCard'
import { getAllCourseSummaries } from '@/lib/courses'

export const metadata: Metadata = {
  title: 'Khóa học lập trình miễn phí',
  description:
    'Danh sách khóa học lập trình miễn phí: Python, C++, HTML/CSS. Phù hợp cho người mới bắt đầu, không cần kinh nghiệm.',
  keywords: ['khóa học lập trình', 'học python miễn phí', 'học c++ miễn phí', 'học html css'],
  openGraph: {
    title: 'Khóa học lập trình miễn phí | DevStart',
    description:
      'Danh sách khóa học lập trình miễn phí: Python, C++, HTML/CSS. Phù hợp cho người mới bắt đầu.',
    url: '/khoa-hoc',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khóa học lập trình miễn phí | DevStart',
    description:
      'Danh sách khóa học lập trình miễn phí: Python, C++, HTML/CSS. Phù hợp cho người mới bắt đầu.',
  },
  alternates: {
    canonical: '/khoa-hoc',
  },
}

export default function CoursesPage() {
  const courses = getAllCourseSummaries()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Khóa học
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Khóa học lập trình</h1>
          <p className="mt-2 text-slate-500">
            Chọn một khóa học và bắt đầu hành trình lập trình của bạn. Tất cả đều miễn phí!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              icon={course.icon}
              name={course.name}
              description={course.description}
              totalLessons={course.totalLessons}
              difficulty={course.difficulty}
              slug={course.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
