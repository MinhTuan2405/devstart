import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilter from '@/components/blog/BlogFilter'
import { getBlogPostsByCategory } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Truyện lập trình',
  description: 'Câu chuyện hài hước, trải nghiệm thực tế từ hành trình học lập trình.',
  keywords: ['truyện lập trình', 'câu chuyện lập trình viên', 'kinh nghiệm học code'],
  openGraph: {
    title: 'Truyện lập trình | DevStart',
    description: 'Câu chuyện hài hước, trải nghiệm thực tế từ hành trình học lập trình.',
    url: '/blog/truyen',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truyện lập trình | DevStart',
    description: 'Câu chuyện hài hước, trải nghiệm thực tế từ hành trình học lập trình.',
  },
  alternates: { canonical: '/blog/truyen' },
}

export default function TruyenPage() {
  const posts = getBlogPostsByCategory('truyen')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Truyện lập trình</h1>
        <p className="mt-2 text-slate-500">Câu chuyện từ hành trình học và làm lập trình.</p>
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
