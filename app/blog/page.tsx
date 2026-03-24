import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilter from '@/components/blog/BlogFilter'
import { getAllBlogPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Blog lập trình',
  description:
    'Blog hướng dẫn lập trình, câu chuyện lập trình viên, giới thiệu công nghệ mới. Nội dung tiếng Việt dễ hiểu.',
  keywords: ['blog lập trình', 'hướng dẫn lập trình', 'truyện lập trình', 'công nghệ mới'],
  openGraph: {
    title: 'Blog lập trình | DevStart',
    description: 'Blog hướng dẫn lập trình, câu chuyện lập trình viên, giới thiệu công nghệ mới.',
    url: 'https://devstart.vn/blog',
    siteName: 'DevStart',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: { canonical: 'https://devstart.vn/blog' },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Blog
          </span>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Bài viết & hướng dẫn
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Hướng dẫn lập trình, câu chuyện vui và kiến thức công nghệ dành cho người mới.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <BlogFilter />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <p className="text-lg text-slate-400">Chưa có bài viết nào.</p>
            <p className="mt-1 text-sm text-slate-400">Nội dung đang được cập nhật!</p>
          </div>
        )}
      </div>
    </>
  )
}
