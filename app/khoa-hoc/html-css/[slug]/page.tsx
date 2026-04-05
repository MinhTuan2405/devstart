import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLessonBySlug, getLessonsByCourseName, getRelatedBlogPosts } from '@/lib/mdx'
import { renderMarkdownToHtml } from '@/lib/markdown'
import { getAdjacentLessons } from '@/lib/courses'
import Sidebar from '@/components/layout/Sidebar'
import LessonNav from '@/components/course/LessonNav'
import BlogCard from '@/components/blog/BlogCard'
import Badge, { getDifficultyVariant } from '@/components/ui/Badge'
import { toAbsoluteUrl } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const lessons = getLessonsByCourseName('html-css')
  return lessons.map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lesson = getLessonBySlug('html-css', params.slug)
  if (!lesson) return { title: 'Bài học không tồn tại' }

  return {
    title: lesson.frontmatter.title,
    description: lesson.frontmatter.description,
    keywords: lesson.frontmatter.keywords,
    openGraph: {
      title: `${lesson.frontmatter.title} | DevStart`,
      description: lesson.frontmatter.description,
      url: `/khoa-hoc/html-css/${params.slug}`,
      siteName: 'DevStart',
      locale: 'vi_VN',
      type: 'article',
      publishedTime: lesson.frontmatter.publishedAt,
      modifiedTime: lesson.frontmatter.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.frontmatter.title} | DevStart`,
      description: lesson.frontmatter.description,
    },
    alternates: { canonical: `/khoa-hoc/html-css/${params.slug}` },
  }
}

export default function HtmlCssLessonPage({ params }: PageProps) {
  const lesson = getLessonBySlug('html-css', params.slug)
  if (!lesson) notFound()

  const allLessons = getLessonsByCourseName('html-css')
  const { prev, next } = getAdjacentLessons('html-css', params.slug)
  const relatedPosts = getRelatedBlogPosts(params.slug, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lesson.frontmatter.title,
    description: lesson.frontmatter.description,
    datePublished: lesson.frontmatter.publishedAt,
    dateModified: lesson.frontmatter.publishedAt,
    author: { '@type': 'Organization', name: 'DevStart' },
    mainEntityOfPage: toAbsoluteUrl(`/khoa-hoc/html-css/${params.slug}`),
    url: toAbsoluteUrl(`/khoa-hoc/html-css/${params.slug}`),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc" className="hover:text-blue-600">Khóa học</Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc/html-css" className="hover:text-blue-600">HTML/CSS</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{lesson.frontmatter.title}</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">{lesson.frontmatter.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden={true}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lesson.frontmatter.duration}
            </span>
            <Badge text={lesson.frontmatter.difficulty} variant={getDifficultyVariant(lesson.frontmatter.difficulty)} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex gap-10">
          <Sidebar lessons={allLessons} courseName="HTML/CSS" courseSlug="html-css" />

          <article className="min-w-0 flex-1">
            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-a:text-blue-600 prose-pre:bg-[#1E293B] prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700"
              dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(lesson.content) }}
            />

            <LessonNav prev={prev} next={next} courseSlug="html-css" />

            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Bài viết liên quan</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
