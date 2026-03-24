import { getLessonsByCourseName, courseInfo, type Lesson } from './mdx'

export function getCourseWithLessons(courseName: string) {
  const lessons = getLessonsByCourseName(courseName)
  const info = courseInfo[courseName]

  if (!info) return null

  return {
    ...info,
    lessons,
    totalLessons: lessons.length,
  }
}

export function getAllCourseSummaries() {
  return Object.keys(courseInfo).map((courseName) => {
    const lessons = getLessonsByCourseName(courseName)
    const info = courseInfo[courseName]
    return {
      ...info,
      totalLessons: lessons.length,
      difficulty: lessons.length > 0 ? lessons[0].frontmatter.difficulty : 'Dễ',
    }
  })
}

export function getAdjacentLessons(
  courseName: string,
  currentSlug: string
): { prev: Lesson | null; next: Lesson | null } {
  const lessons = getLessonsByCourseName(courseName)
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  }
}
