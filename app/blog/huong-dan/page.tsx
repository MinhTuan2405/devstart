import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilter from '@/components/blog/BlogFilter'
import { getBlogPostsByCategory } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Hướng dẫn lập trình',
  description: 'Các bài hướng dẫn lập trình chi tiết, dễ hiểu cho người mới bắt đầu.',
  keywords: ['hướng dẫn lập trình', 'tutorial lập trình', 'hướng dẫn code'],
  openGraph: {
    title: 'Hướng dẫn lập trình | DevStart',
    description: 'Các bài hướng dẫn lập trình chi tiết, dễ hiểu cho người mới bắt đầu.',
    url: 'https://devstart.vn/blog/huong-dan',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: { canonical: 'https://devstart.vn/blog/huong-dan' },
}

export default function HuongDanPage() {
  const posts = getBlogPostsByCategory('huong-dan')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Hướng dẫn</h1>
        <p className="mt-2 text-slate-500">Các bài hướng dẫn lập trình chi tiết.</p>
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
