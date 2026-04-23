import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge, { getDifficultyVariant } from '@/components/ui/Badge'
import TableOfContents from '@/components/TableOfContents'
import InterviewNav from '@/components/interview/InterviewNav'
import InterviewSidebar from '@/components/interview/InterviewSidebar'
import {
  extractInterviewFaqItems,
  getAdjacentInterviews,
  getAllInterviews,
  getInterviewBySlug,
  getInterviewCategoryWithArticles,
  isInterviewCategory,
} from '@/lib/interviews'
import { renderMarkdownToHtml } from '@/lib/markdown'
import { toAbsoluteUrl, SITE_NAME } from '@/lib/seo'
import { extractHeadings } from '@/lib/toc'

interface PageProps {
  params: { category: string; slug: string }
}

export async function generateStaticParams() {
  return getAllInterviews().map((interview) => ({
    category: interview.frontmatter.category,
    slug: interview.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isInterviewCategory(params.category)) {
    return { title: 'Bài viết không tồn tại' }
  }

  const interview = getInterviewBySlug(params.category, params.slug)
  if (!interview) {
    return { title: 'Bài viết không tồn tại' }
  }

  return {
    title: interview.frontmatter.title,
    description: interview.frontmatter.description,
    keywords: interview.frontmatter.keywords,
    openGraph: {
      title: `${interview.frontmatter.title} | ${SITE_NAME}`,
      description: interview.frontmatter.description,
      url: `/interview/${params.category}/${params.slug}`,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: 'article',
      publishedTime: interview.frontmatter.publishedAt,
      modifiedTime: interview.modifiedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${interview.frontmatter.title} | ${SITE_NAME}`,
      description: interview.frontmatter.description,
    },
    alternates: {
      canonical: `/interview/${params.category}/${params.slug}`,
    },
  }
}

export default function InterviewDetailPage({ params }: PageProps) {
  if (!isInterviewCategory(params.category)) notFound()

  const interview = getInterviewBySlug(params.category, params.slug)
  const category = getInterviewCategoryWithArticles(params.category)

  if (!interview || !category) notFound()

  const headings = extractHeadings(interview.content)
  const { prev, next } = getAdjacentInterviews(params.category, params.slug)
  const faqItems = extractInterviewFaqItems(interview.content, 12)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: interview.frontmatter.title,
      description: interview.frontmatter.description,
      datePublished: interview.frontmatter.publishedAt,
      dateModified: interview.modifiedAt,
      author: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: toAbsoluteUrl(`/interview/${params.category}/${params.slug}`),
      url: toAbsoluteUrl(`/interview/${params.category}/${params.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: toAbsoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fullstack interview',
          item: toAbsoluteUrl('/interview'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: toAbsoluteUrl(`/interview/${params.category}`),
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: interview.frontmatter.topic,
          item: toAbsoluteUrl(`/interview/${params.category}/${params.slug}`),
        },
      ],
    },
    ...(faqItems.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]
      : []),
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
            <Link href="/interview" className="hover:text-blue-600">Interview</Link>
            <span className="mx-2">/</span>
            <Link href={`/interview/${params.category}`} className="hover:text-blue-600">{category.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{interview.frontmatter.topic}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {interview.frontmatter.title}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            {interview.frontmatter.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden={true}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {interview.readingTime}
            </span>
            <span>{interview.frontmatter.questionCount} câu hỏi</span>
            <Badge
              text={interview.frontmatter.difficulty}
              variant={getDifficultyVariant(interview.frontmatter.difficulty)}
            />
          </div>
        </div>
      </div>

      <div className="site-container py-10">
        <div className="flex gap-8 xl:gap-10 2xl:gap-12">
          <InterviewSidebar
            interviews={category.interviews}
            categoryName={category.name}
            categorySlug={category.slug}
          />

          <article className="min-w-0 flex-1">
            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-a:text-blue-600 prose-pre:bg-[#1E293B] prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700"
              dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(interview.content) }}
            />

            <InterviewNav prev={prev} next={next} categorySlug={category.slug} />
          </article>

          <TableOfContents headings={headings} variant="sidebar" />
        </div>
      </div>
    </>
  )
}
