import type { MetadataRoute } from 'next'
import { blogCategories } from '@/lib/blog'
import { getAllBlogPosts, getAllLessons } from '@/lib/mdx'
import { SITE_URL } from '@/lib/seo'

function toAbsoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}

function toValidDate(input: string | undefined, fallback: Date): Date {
  if (!input) return fallback

  const parsed = new Date(input)
  return Number.isNaN(parsed.getTime()) ? fallback : parsed
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()
  const lessons = getAllLessons()
  const fallbackDate = new Date('2026-01-01T00:00:00.000Z')

  const postDates = posts.map((post) => toValidDate(post.frontmatter.publishedAt, fallbackDate))
  const lessonDates = lessons.map((lesson) => toValidDate(lesson.frontmatter.publishedAt, fallbackDate))
  const allDates = [...postDates, ...lessonDates]

  const latestContentDate = allDates.length
    ? new Date(Math.max(...allDates.map((date) => date.getTime())))
    : fallbackDate

  const blogUrls = posts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: toValidDate(post.frontmatter.publishedAt, latestContentDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const lessonUrls = lessons.map((lesson) => ({
    url: toAbsoluteUrl(`/khoa-hoc/${lesson.frontmatter.course}/${lesson.slug}`),
    lastModified: toValidDate(lesson.frontmatter.publishedAt, latestContentDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogCategoryUrls = blogCategories.map((category) => ({
    url: toAbsoluteUrl(`/blog/${category.slug}`),
    lastModified: latestContentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return [
    {
      url: toAbsoluteUrl(''),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc'),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc/python'),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc/cpp'),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc/html-css'),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl('/gioi-thieu'),
      lastModified: latestContentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogCategoryUrls,
    ...lessonUrls,
    ...blogUrls,
  ]
}
