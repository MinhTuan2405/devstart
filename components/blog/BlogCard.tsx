import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/mdx'

interface BlogCardProps {
  post: BlogPost
}

const categoryLabels: Record<string, string> = {
  'huong-dan': 'Hướng dẫn',
  truyen: 'Truyện',
  'gioi-thieu': 'Giới thiệu',
}

const categoryColors: Record<string, string> = {
  'huong-dan': 'bg-blue-100 text-blue-700',
  truyen: 'bg-purple-100 text-purple-700',
  'gioi-thieu': 'bg-emerald-100 text-emerald-700',
}

const categoryIcons: Record<string, string> = {
  'huong-dan': '📖',
  truyen: '📝',
  'gioi-thieu': '🔍',
}

export default function BlogCard({ post }: BlogCardProps) {
  const { frontmatter, readingTime } = post
  const catColor = categoryColors[frontmatter.category] || 'bg-slate-100 text-slate-700'

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-glow group overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      {frontmatter.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-5xl">
          {categoryIcons[frontmatter.category] || '📄'}
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${catColor}`}>
            {categoryLabels[frontmatter.category] || frontmatter.category}
          </span>
          <span className="text-xs text-slate-400">· {readingTime}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {frontmatter.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <time className="text-xs text-slate-400">
            {new Date(frontmatter.publishedAt).toLocaleDateString('vi-VN')}
          </time>
          <span className="text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
            Đọc tiếp →
          </span>
        </div>
      </div>
    </Link>
  )
}
