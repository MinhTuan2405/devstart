export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Tạo heading ID giống hệt logic trong renderMarkdownToHtml (lib/markdown.ts)
 * để đảm bảo anchor links khớp với phần tử trong DOM.
 */
function toHeadingId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Trích xuất các heading h2 và h3 từ nội dung markdown.
 * Trả về danh sách headings theo thứ tự xuất hiện trong bài.
 */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines = normalizedContent.split('\n')
  let inCodeFence = false

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence
      continue
    }

    if (inCodeFence) continue

    // Bỏ qua heading bên trong code block
    if (line.startsWith('    ') || line.startsWith('\t')) continue

    const h3Match = line.match(/^\s*###\s+(.+)$/)
    if (h3Match) {
      const text = h3Match[1].trim()
      headings.push({ id: toHeadingId(text), text, level: 3 })
      continue
    }

    const h2Match = line.match(/^\s*##\s+(.+)$/)
    if (h2Match) {
      const text = h2Match[1].trim()
      headings.push({ id: toHeadingId(text), text, level: 2 })
    }
  }

  return headings
}
