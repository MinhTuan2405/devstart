import { getAllBlogPosts, getBlogPostsByCategory, type BlogPost } from './mdx'

export const blogCategories = [
  { slug: 'huong-dan', name: 'Hướng dẫn' },
  { slug: 'truyen', name: 'Truyện' },
  { slug: 'gioi-thieu', name: 'Giới thiệu' },
]

export function getBlogPostsPaginated(page = 1, perPage = 9): {
  posts: BlogPost[]
  totalPages: number
  currentPage: number
} {
  const allPosts = getAllBlogPosts()
  const totalPages = Math.ceil(allPosts.length / perPage)
  const start = (page - 1) * perPage
  const posts = allPosts.slice(start, start + perPage)

  return { posts, totalPages, currentPage: page }
}

export function getBlogPostsByCategoryPaginated(
  category: string,
  page = 1,
  perPage = 9
) {
  const allPosts = getBlogPostsByCategory(category)
  const totalPages = Math.ceil(allPosts.length / perPage)
  const start = (page - 1) * perPage
  const posts = allPosts.slice(start, start + perPage)

  return { posts, totalPages, currentPage: page }
}
