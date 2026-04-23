import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { blogCategories } from '@/lib/blog'
import { getAllInterviews, getInterviewCategories, getInterviewsByCategory } from '@/lib/interviews'
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
  const interviews = getAllInterviews()
  const courseSlugs = Object.keys(courseInfo)
  const interviewCategories = getInterviewCategories()
  const sharedLayoutDate = getLatestFromDates([
    getFileModifiedTime('app/layout.tsx'),
    getFileModifiedTime('app/globals.css'),
    getFileModifiedTime('components/layout/Header.tsx'),
    getFileModifiedTime('components/layout/Footer.tsx'),
  ])
  const withSharedLayoutDate = (...values: Date[]) => getLatestFromDates([sharedLayoutDate, ...values])

  const latestBlogDate = getLatestContentDate(posts)
  const latestLessonDate = getLatestContentDate(lessons)
  const latestInterviewDate = getLatestContentDate(interviews)
  const latestSiteContentDate = getLatestFromDates([latestBlogDate, latestLessonDate, latestInterviewDate])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified: withSharedLayoutDate(getFileModifiedTime('app/page.tsx'), latestSiteContentDate),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/gioi-thieu'),
      lastModified: withSharedLayoutDate(getFileModifiedTime('app/gioi-thieu/page.tsx')),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified: withSharedLayoutDate(getFileModifiedTime('app/blog/page.tsx'), latestBlogDate),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/khoa-hoc'),
      lastModified: withSharedLayoutDate(getFileModifiedTime('app/khoa-hoc/page.tsx'), latestLessonDate),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/interview'),
      lastModified: withSharedLayoutDate(
        getFileModifiedTime('app/interview/page.tsx'),
        latestInterviewDate,
      ),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: toAbsoluteUrl(`/blog/${category.slug}`),
    lastModified: withSharedLayoutDate(
      getFileModifiedTime(`app/blog/${category.slug}/page.tsx`),
      getLatestContentDate(posts.filter((post) => post.frontmatter.category === category.slug)),
    ),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((courseSlug) => {
    const courseLessons = getLessonsByCourseName(courseSlug)

    return {
      url: toAbsoluteUrl(`/khoa-hoc/${courseSlug}`),
      lastModified: withSharedLayoutDate(
        getFileModifiedTime(`app/khoa-hoc/${courseSlug}/page.tsx`),
        getLatestContentDate(courseLessons),
      ),
      changeFrequency: 'weekly',
      priority: courseSlug === 'machine-learning' ? 0.95 : 0.85,
    }
  })

  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: toAbsoluteUrl(`/khoa-hoc/${lesson.frontmatter.course}/${lesson.slug}`),
    lastModified: withSharedLayoutDate(
      getFileModifiedTime(`app/khoa-hoc/${lesson.frontmatter.course}/[slug]/page.tsx`),
      toDate(lesson.modifiedAt),
    ),
    changeFrequency: 'monthly',
    priority: lesson.frontmatter.course === 'machine-learning' ? 0.85 : 0.8,
  }))

  const interviewCategoryRoutes: MetadataRoute.Sitemap = interviewCategories.map((category) => ({
    url: toAbsoluteUrl(`/interview/${category}`),
    lastModified: withSharedLayoutDate(
      getFileModifiedTime('app/interview/[category]/page.tsx'),
      getLatestContentDate(getInterviewsByCategory(category)),
    ),
    changeFrequency: 'weekly',
    priority: 0.82,
  }))

  const interviewRoutes: MetadataRoute.Sitemap = interviews.map((interview) => ({
    url: toAbsoluteUrl(`/interview/${interview.frontmatter.category}/${interview.slug}`),
    lastModified: withSharedLayoutDate(
      getFileModifiedTime('app/interview/[category]/[slug]/page.tsx'),
      toDate(interview.modifiedAt),
    ),
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: withSharedLayoutDate(getFileModifiedTime('app/blog/[slug]/page.tsx'), toDate(post.modifiedAt)),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...courseRoutes,
    ...lessonRoutes,
    ...interviewCategoryRoutes,
    ...interviewRoutes,
    ...blogRoutes,
  ]
}
