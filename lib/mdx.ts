import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface LessonFrontmatter {
  title: string
  description: string
  slug: string
  course: string
  order: number
  duration: string
  difficulty: string
  keywords: string[]
  publishedAt: string
}

export interface BlogFrontmatter {
  title: string
  description: string
  slug: string
  category: string
  tags: string[]
  keywords: string[]
  publishedAt: string
  readingTime?: string
  coverImage?: string
}

export interface Lesson {
  frontmatter: LessonFrontmatter
  content: string
  slug: string
  modifiedAt: string
}

export interface BlogPost {
  frontmatter: BlogFrontmatter
  content: string
  slug: string
  readingTime: string
  modifiedAt: string
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

export function getLessonsByCourseName(courseName: string): Lesson[] {
  const dir = path.join(contentDirectory, 'courses', courseName)
  const files = getMDXFiles(dir)

  const lessons = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileStats = fs.statSync(filePath)
    const { data, content } = matter(fileContent)

    return {
      frontmatter: data as LessonFrontmatter,
      content,
      slug: data.slug || filename.replace('.mdx', ''),
      modifiedAt: fileStats.mtime.toISOString(),
    }
  })

  return lessons.sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getLessonBySlug(courseName: string, slug: string): Lesson | null {
  const lessons = getLessonsByCourseName(courseName)
  return lessons.find((lesson) => lesson.slug === slug) || null
}

export function getAllLessons(): Lesson[] {
  const courseNames = ['python', 'cpp', 'html-css', 'machine-learning', 'claude-code']
  return courseNames.flatMap((name) => getLessonsByCourseName(name))
}

export function getAllBlogPosts(): BlogPost[] {
  const dir = path.join(contentDirectory, 'blog')
  const files = getMDXFiles(dir)

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileStats = fs.statSync(filePath)
    const { data, content } = matter(fileContent)
    const rt = readingTime(content)

    return {
      frontmatter: data as BlogFrontmatter,
      content,
      slug: data.slug || filename.replace('.mdx', ''),
      readingTime: data.readingTime || `${Math.ceil(rt.minutes)} phút`,
      modifiedAt: fileStats.mtime.toISOString(),
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter((post) => post.frontmatter.category === category)
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit)
}

export const courseInfo: Record<string, { name: string; description: string; icon: string; slug: string }> = {
  python: {
    name: 'Python',
    description: 'Ngôn ngữ lập trình phổ biến nhất, dễ học, phù hợp người mới bắt đầu.',
    icon: '🐍',
    slug: 'python',
  },
  cpp: {
    name: 'C++',
    description: 'Ngôn ngữ mạnh mẽ cho lập trình hệ thống và thi đấu lập trình.',
    icon: '⚡',
    slug: 'cpp',
  },
  'html-css': {
    name: 'HTML/CSS',
    description: 'Nền tảng để xây dựng giao diện website, bước đầu tiên vào web.',
    icon: '🌐',
    slug: 'html-css',
  },
  'machine-learning': {
    name: 'Machine Learning',
    description: 'Làm quen học máy, dữ liệu và cách xây dựng mô hình dự đoán từ cơ bản.',
    icon: '🤖',
    slug: 'machine-learning',
  },
  'claude-code': {
    name: 'Claude Code',
    description: 'Học Claude Code từ cài đặt, context, workflow sửa code, testing, git, MCP, bảo mật đến thiết lập .claude hoàn chỉnh.',
    icon: '🧠',
    slug: 'claude-code',
  },
}
