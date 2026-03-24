import type { MetadataRoute } from 'next'
import { getAllBlogPosts, getAllLessons } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()
  const lessons = getAllLessons()

  const blogUrls = posts.map((post) => ({
    url: `https://devstart.vn/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const lessonUrls = lessons.map((lesson) => ({
    url: `https://devstart.vn/khoa-hoc/${lesson.frontmatter.course}/${lesson.slug}`,
    lastModified: new Date(lesson.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://devstart.vn',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://devstart.vn/khoa-hoc',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://devstart.vn/khoa-hoc/python',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://devstart.vn/khoa-hoc/cpp',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://devstart.vn/khoa-hoc/html-css',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://devstart.vn/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://devstart.vn/gioi-thieu',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...lessonUrls,
    ...blogUrls,
  ]
}
