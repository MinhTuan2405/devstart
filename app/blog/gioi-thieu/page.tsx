import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilter from '@/components/blog/BlogFilter'
import { getBlogPostsByCategory } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Giới thiệu công nghệ',
  description: 'Giới thiệu các công nghệ, framework, và công cụ lập trình mới nhất.',
  keywords: ['giới thiệu công nghệ', 'framework mới', 'công cụ lập trình'],
  openGraph: {
    title: 'Giới thiệu công nghệ | DevStart',
    description: 'Giới thiệu các công nghệ, framework, và công cụ lập trình mới nhất.',
    url: '/blog/gioi-thieu',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới thiệu công nghệ | DevStart',
    description: 'Giới thiệu các công nghệ, framework, và công cụ lập trình mới nhất.',
  },
  alternates: { canonical: '/blog/gioi-thieu' },
}

export default function GioiThieuPage() {
  const posts = getBlogPostsByCategory('gioi-thieu')

  return (
    <div className="site-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Giới thiệu công nghệ</h1>
        <p className="mt-2 text-slate-500">Khám phá các công nghệ và công cụ mới nhất.</p>
      </div>

      <BlogFilter />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-slate-400">Chưa có bài viết nào trong danh mục này.</p>
      )}
    </div>
  )
}
