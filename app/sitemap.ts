import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { blogCategories } from '@/lib/blog'
import { courseInfo, getAllBlogPosts, getAllLessons, getLessonsByCourseName } from '@/lib/mdx'
import { toAbsoluteUrl } from '@/lib/seo'

function toDate(value?: string): Date {
  const date = value ? new Date(value) : new Date()
  return Number.isNaN(date.getTime()) ? new Date() : date
}

function getLatestDate(values: string[]): Date {
  if (values.length === 0) return new Date()

  return values.reduce((latest, value) => {
    const current = toDate(value)
    return current > latest ? current : latest
  }, toDate(values[0]))
}

function getLatestFromDates(values: Date[]): Date {
  if (values.length === 0) return new Date()

  return values.reduce((latest, value) => (value > latest ? value : latest), values[0])
}

function getFileModifiedTime(relativePath: string): Date {
  const absolutePath = path.join(process.cwd(), relativePath)

  if (!fs.existsSync(absolutePath)) return new Date()

  return fs.statSync(absolutePath).mtime
}

function getLatestContentDate(values: { modifiedAt: string }[]): Date {
  return getLatestDate(values.map((value) => value.modifiedAt))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()
  const lessons = getAllLessons()
  const courseSlugs = Object.keys(courseInfo)

  const latestBlogDate = getLatestContentDate(posts)
  const latestLessonDate = getLatestContentDate(lessons)
  const latestSiteContentDate = getLatestFromDates([latestBlogDate, latestLessonDate])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified: getLatestFromDates([getFileModifiedTime('app/page.tsx'), latestSiteContentDate]),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/gioi-thieu'),
      lastModified: getFileModifiedTime('app/gioi-thieu/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified: getLatestFromDates([getFileModifiedTime('app/blog/page.tsx'), latestBlogDate]),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc'),
      lastModified: getLatestFromDates([getFileModifiedTime('app/khoa-hoc/page.tsx'), latestLessonDate]),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: toAbsoluteUrl(`/blog/${category.slug}`),
    lastModified: getLatestFromDates([
      getFileModifiedTime(`app/blog/${category.slug}/page.tsx`),
      getLatestContentDate(posts.filter((post) => post.frontmatter.category === category.slug)),
    ]),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((courseSlug) => {
    const courseLessons = getLessonsByCourseName(courseSlug)

    return {
      url: toAbsoluteUrl(`/khoa-hoc/${courseSlug}`),
      lastModified: getLatestFromDates([
        getFileModifiedTime(`app/khoa-hoc/${courseSlug}/page.tsx`),
        getLatestContentDate(courseLessons),
      ]),
      changeFrequency: 'weekly',
      priority: courseSlug === 'machine-learning' ? 0.95 : 0.85,
    }
  })

  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: toAbsoluteUrl(`/khoa-hoc/${lesson.frontmatter.course}/${lesson.slug}`),
    lastModified: getLatestFromDates([
      getFileModifiedTime(`app/khoa-hoc/${lesson.frontmatter.course}/[slug]/page.tsx`),
      toDate(lesson.modifiedAt),
    ]),
    changeFrequency: 'monthly',
    priority: lesson.frontmatter.course === 'machine-learning' ? 0.85 : 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: getLatestFromDates([getFileModifiedTime('app/blog/[slug]/page.tsx'), toDate(post.modifiedAt)]),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...categoryRoutes, ...courseRoutes, ...lessonRoutes, ...blogRoutes]
}
