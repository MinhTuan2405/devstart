import Link from 'next/link'
import CourseCard from '@/components/course/CourseCard'
import BlogCard from '@/components/blog/BlogCard'
import { getAllCourseSummaries } from '@/lib/courses'
import { getAllBlogPosts } from '@/lib/mdx'

export default function HomePage() {
  const courses = getAllCourseSummaries()
  const recentPosts = getAllBlogPosts().slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevStart',
    url: 'https://devstart.vn',
    description: 'Nền tảng học lập trình miễn phí cho người mới bắt đầu',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://devstart.vn/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden px-4 py-24 md:py-32">
        {/* Decorative floating elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute left-[10%] top-[20%] rounded-2xl bg-blue-500/10 p-4 text-2xl backdrop-blur-sm">
            🐍
          </div>
          <div className="animate-float-delayed absolute right-[15%] top-[15%] rounded-2xl bg-purple-500/10 p-4 text-2xl backdrop-blur-sm">
            ⚡
          </div>
          <div className="animate-float absolute bottom-[20%] left-[20%] rounded-2xl bg-green-500/10 p-4 text-2xl backdrop-blur-sm">
            🌐
          </div>
          <div className="animate-float-delayed absolute bottom-[25%] right-[10%] rounded-xl border border-slate-200/50 bg-white/60 px-4 py-2 font-mono text-sm text-slate-600 shadow-lg backdrop-blur-sm">
            print(&quot;Hello!&quot;)
          </div>
          <div className="animate-float absolute left-[5%] top-[60%] rounded-xl border border-slate-200/50 bg-white/60 px-4 py-2 font-mono text-sm text-emerald-600 shadow-lg backdrop-blur-sm">
            &lt;h1&gt;Web&lt;/h1&gt;
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            100% miễn phí — Không quảng cáo
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Học lập trình{' '}
            <span className="gradient-text">dễ dàng</span>
            <br />
            cho người mới bắt đầu
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
            Khóa học Python, C++ và HTML/CSS bằng tiếng Việt.
            Giải thích đơn giản, ví dụ thực tế, lộ trình rõ ràng.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Bắt đầu học ngay
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              Đọc blog
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200/60 pt-8">
            {[
              { value: '3', label: 'Khóa học' },
              { value: '7+', label: 'Bài học' },
              { value: '100%', label: 'Miễn phí' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-blue-600 md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Khóa học
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Chọn lộ trình của bạn</h2>
          <p className="mt-3 text-slate-500">Mỗi khóa học được thiết kế cho người mới, đi từ cơ bản đến nâng cao</p>
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
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="relative bg-slate-50/80 px-4 py-20">
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Blog
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Bài viết mới nhất</h2>
              <p className="mt-3 text-slate-500">Hướng dẫn, câu chuyện vui và kiến thức công nghệ</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
              >
                Xem tất cả bài viết
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Us Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
            Lợi ích
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Tại sao chọn DevStart?</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: '🆓',
              title: 'Hoàn toàn miễn phí',
              desc: 'Tất cả khóa học và bài viết đều miễn phí, không có phí ẩn.',
              color: 'from-blue-500/10 to-blue-500/5 border-blue-100',
              iconBg: 'bg-blue-100',
            },
            {
              icon: '🇻🇳',
              title: 'Tiếng Việt dễ hiểu',
              desc: 'Nội dung bằng tiếng Việt, giải thích đơn giản, phù hợp người mới.',
              color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-100',
              iconBg: 'bg-emerald-100',
            },
            {
              icon: '💻',
              title: 'Ví dụ code thực tế',
              desc: 'Mỗi bài học đều có ví dụ code có thể chạy ngay trên máy.',
              color: 'from-purple-500/10 to-purple-500/5 border-purple-100',
              iconBg: 'bg-purple-100',
            },
            {
              icon: '📈',
              title: 'Lộ trình rõ ràng',
              desc: 'Bài học sắp xếp từ cơ bản đến nâng cao, dễ theo dõi tiến độ.',
              color: 'from-amber-500/10 to-amber-500/5 border-amber-100',
              iconBg: 'bg-amber-100',
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border bg-gradient-to-br p-6 ${item.color} transition-all hover:shadow-lg`}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} text-2xl`}>
                {item.icon}
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-4 mb-20 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-16 text-center md:mx-auto md:max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Sẵn sàng bắt đầu chưa?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-blue-100">
          Hãy chọn một khóa học và bắt đầu viết dòng code đầu tiên ngay hôm nay. Không cần đăng ký, không cần thẻ tín dụng.
        </p>
        <Link
          href="/khoa-hoc"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
        >
          Bắt đầu học miễn phí
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </Link>
      </section>
    </>
  )
}
