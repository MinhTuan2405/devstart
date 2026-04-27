const DEFAULT_SITE_URL = 'https://hoclaptrinhuit.netlify.app'

export const SITE_NAME = 'DevStart'
export const DEFAULT_TITLE = 'DevStart - Học lập trình miễn phí cho người mới bắt đầu'
export const DEFAULT_DESCRIPTION =
  'Nền tảng học lập trình miễn phí. Khóa học Python, C++, HTML/CSS, Machine Learning và Claude Code cho người mới.'
export const DEFAULT_KEYWORDS = [
  'học lập trình',
  'học python',
  'học c++',
  'học html css',
  'học machine learning',
  'học claude code',
  'lập trình cho người mới',
  'học code miễn phí',
]

export function normalizeSiteUrl(rawUrl?: string): string {
  const value = (rawUrl || DEFAULT_SITE_URL).trim()
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.URL
)

export function getMetadataBase(): URL {
  return new URL(SITE_URL)
}

export function toAbsoluteUrl(path = ''): string {
  if (!path || path === '/') return SITE_URL
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function canonicalPath(path = '/'): string {
  if (!path || path === '/') return '/'
  return path.startsWith('/') ? path : `/${path}`
}
