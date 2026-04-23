import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLessonBySlug, getLessonsByCourseName, getRelatedBlogPosts } from '@/lib/mdx'
import { renderMarkdownToHtml } from '@/lib/markdown'
import { extractHeadings } from '@/lib/toc'
import { getAdjacentLessons } from '@/lib/courses'
import Sidebar from '@/components/layout/Sidebar'
import LessonNav from '@/components/course/LessonNav'
import BlogCard from '@/components/blog/BlogCard'
import Badge, { getDifficultyVariant } from '@/components/ui/Badge'
import TableOfContents from '@/components/TableOfContents'
import { toAbsoluteUrl, SITE_NAME } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const lessons = getLessonsByCourseName('cpp')
  return lessons.map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lesson = getLessonBySlug('cpp', params.slug)
  if (!lesson) return { title: 'Bài học không tồn tại' }

  return {
    title: lesson.frontmatter.title,
    description: lesson.frontmatter.description,
    keywords: lesson.frontmatter.keywords,
    openGraph: {
      title: `${lesson.frontmatter.title} | ${SITE_NAME}`,
      description: lesson.frontmatter.description,
      url: `/khoa-hoc/cpp/${params.slug}`,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: 'article',
      publishedTime: lesson.frontmatter.publishedAt,
      modifiedTime: lesson.modifiedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.frontmatter.title} | ${SITE_NAME}`,
      description: lesson.frontmatter.description,
    },
    alternates: { canonical: `/khoa-hoc/cpp/${params.slug}` },
  }
}

export default function CppLessonPage({ params }: PageProps) {
  const lesson = getLessonBySlug('cpp', params.slug)
  if (!lesson) notFound()

  const allLessons = getLessonsByCourseName('cpp')
  const { prev, next } = getAdjacentLessons('cpp', params.slug)
  const relatedPosts = getRelatedBlogPosts(params.slug, 3)
  const headings = extractHeadings(lesson.content)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: lesson.frontmatter.title,
      description: lesson.frontmatter.description,
      datePublished: lesson.frontmatter.publishedAt,
      dateModified: lesson.modifiedAt,
      author: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: toAbsoluteUrl(`/khoa-hoc/cpp/${params.slug}`),
      url: toAbsoluteUrl(`/khoa-hoc/cpp/${params.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: toAbsoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Khóa học', item: toAbsoluteUrl('/khoa-hoc') },
        { '@type': 'ListItem', position: 3, name: 'C++', item: toAbsoluteUrl('/khoa-hoc/cpp') },
        {
          '@type': 'ListItem',
          position: 4,
          name: lesson.frontmatter.title,
          item: toAbsoluteUrl(`/khoa-hoc/cpp/${params.slug}`),
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6 xl:px-8">
        <div className="site-frame">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc" className="hover:text-blue-600">Khóa học</Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc/cpp" className="hover:text-blue-600">C++</Link>
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

      <div className="site-container py-10">
        <div className="flex gap-8 xl:gap-10 2xl:gap-12">
          <Sidebar lessons={allLessons} courseName="C++" courseSlug="cpp" />

          <article className="min-w-0 flex-1">
            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-a:text-blue-600 prose-pre:bg-[#1E293B] prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700"
              dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(lesson.content) }}
            />

            <LessonNav prev={prev} next={next} courseSlug="cpp" />

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

          <TableOfContents headings={headings} variant="sidebar" />
        </div>
      </div>
    </>
  )
}
