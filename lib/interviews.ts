import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const interviewsDirectory = path.join(process.cwd(), 'content', 'interview')

export const interviewCategoryInfo = {
  basics: {
    name: 'Kiến thức nền tảng',
    description: 'Ôn hệ điều hành, mạng máy tính, thuật toán, cấu trúc dữ liệu và các nền tảng cốt lõi trước khi vào phỏng vấn kỹ thuật.',
    icon: '🧠',
    slug: 'basics',
  },
  frontend: {
    name: 'Frontend',
    description: 'Tổng hợp câu hỏi phỏng vấn HTML, CSS, JavaScript, React, TypeScript và Web API dành cho frontend developer.',
    icon: '🎨',
    slug: 'frontend',
  },
  backend: {
    name: 'Backend',
    description: 'Ôn Node.js, Django, WebSocket, Nginx, Python, PHP, C# và các chủ đề backend thường gặp trong phỏng vấn.',
    icon: '⚙️',
    slug: 'backend',
  },
  database: {
    name: 'Cơ sở dữ liệu',
    description: 'Tập trung vào SQL, MySQL, PostgreSQL, MongoDB và các câu hỏi thiết kế dữ liệu hay xuất hiện khi phỏng vấn.',
    icon: '🗄️',
    slug: 'database',
  },
  devops: {
    name: 'DevOps',
    description: 'Ôn DevOps, Docker, Kubernetes, Golang và các kiến thức CI/CD, vận hành, hạ tầng thường gặp.',
    icon: '🚀',
    slug: 'devops',
  },
  mobile: {
    name: 'Mobile',
    description: 'Chuẩn bị phỏng vấn Android, iOS, React Native và Java với bộ câu hỏi tổng hợp bằng tiếng Việt.',
    icon: '📱',
    slug: 'mobile',
  },
} as const

export type InterviewCategorySlug = keyof typeof interviewCategoryInfo

export interface InterviewFrontmatter {
  title: string
  description: string
  slug: string
  category: InterviewCategorySlug
  topic: string
  order: number
  questionCount: number
  difficulty: string
  keywords: string[]
  publishedAt: string
}

export interface InterviewArticle {
  frontmatter: InterviewFrontmatter
  content: string
  slug: string
  readingTime: string
  modifiedAt: string
}

export interface InterviewFaqItem {
  question: string
  answer: string
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function isInterviewFrontmatterCategory(value: string): value is InterviewCategorySlug {
  return value in interviewCategoryInfo
}

export function isInterviewCategory(value: string): value is InterviewCategorySlug {
  return value in interviewCategoryInfo
}

export function getInterviewCategories(): InterviewCategorySlug[] {
  return Object.keys(interviewCategoryInfo) as InterviewCategorySlug[]
}

export function getInterviewCategory(category: string) {
  if (!isInterviewCategory(category)) return null
  return interviewCategoryInfo[category]
}

export function getInterviewsByCategory(category: string): InterviewArticle[] {
  if (!isInterviewCategory(category)) return []

  const dir = path.join(interviewsDirectory, category)
  const files = getMDXFiles(dir)

  const interviews = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileStats = fs.statSync(filePath)
    const { data, content } = matter(fileContent)
    const rt = readingTime(content)
    const frontmatter = data as InterviewFrontmatter

    return {
      frontmatter: {
        ...frontmatter,
        category: isInterviewFrontmatterCategory(frontmatter.category)
          ? frontmatter.category
          : category,
      },
      content,
      slug: frontmatter.slug || filename.replace('.mdx', ''),
      readingTime: `${Math.ceil(rt.minutes)} phút`,
      modifiedAt: fileStats.mtime.toISOString(),
    }
  })

  return interviews.sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getInterviewBySlug(category: string, slug: string): InterviewArticle | null {
  const interviews = getInterviewsByCategory(category)
  return interviews.find((interview) => interview.slug === slug) || null
}

export function getAllInterviews(): InterviewArticle[] {
  return getInterviewCategories().flatMap((category) => getInterviewsByCategory(category))
}

export function getAllInterviewCategorySummaries() {
  return getInterviewCategories().map((category) => {
    const interviews = getInterviewsByCategory(category)
    const info = interviewCategoryInfo[category]

    return {
      ...info,
      totalTopics: interviews.length,
      totalQuestions: interviews.reduce((sum, interview) => sum + interview.frontmatter.questionCount, 0),
    }
  })
}

export function getInterviewCategoryWithArticles(category: string) {
  if (!isInterviewCategory(category)) return null

  const interviews = getInterviewsByCategory(category)
  const info = interviewCategoryInfo[category]

  return {
    ...info,
    interviews,
    totalTopics: interviews.length,
    totalQuestions: interviews.reduce((sum, interview) => sum + interview.frontmatter.questionCount, 0),
  }
}

export function getAdjacentInterviews(
  category: string,
  currentSlug: string
): { prev: InterviewArticle | null; next: InterviewArticle | null } {
  const interviews = getInterviewsByCategory(category)
  const currentIndex = interviews.findIndex((interview) => interview.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? interviews[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < interviews.length - 1 ? interviews[currentIndex + 1] : null,
  }
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^#+\s+/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractInterviewFaqItems(content: string, limit = 10): InterviewFaqItem[] {
  const lines = content.split('\n')
  const items: InterviewFaqItem[] = []

  let currentQuestion: string | null = null
  let currentAnswer: string[] = []

  const flushCurrentItem = () => {
    if (!currentQuestion) return

    const answer = stripMarkdown(currentAnswer.join('\n')).slice(0, 500)
    if (answer) {
      items.push({
        question: currentQuestion,
        answer,
      })
    }

    currentQuestion = null
    currentAnswer = []
  }

  for (const line of lines) {
    const questionMatch = line.match(/^###\s+(.+)$/)
    if (questionMatch) {
      flushCurrentItem()
      currentQuestion = questionMatch[1].trim()
      continue
    }

    if (/^##\s+/.test(line)) {
      flushCurrentItem()
      continue
    }

    if (currentQuestion) {
      currentAnswer.push(line)
    }
  }

  flushCurrentItem()

  return items
    .filter((item) => item.question.includes('?'))
    .slice(0, limit)
}
