import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/mdx'
import { renderMarkdownToHtml } from '@/lib/markdown'
import { extractHeadings } from '@/lib/toc'
import BlogCard from '@/components/blog/BlogCard'
import TableOfContents from '@/components/TableOfContents'
import { toAbsoluteUrl, SITE_NAME } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Bài viết không tồn tại' }

  const coverImage = post.frontmatter.coverImage
    ? /^https?:\/\//i.test(post.frontmatter.coverImage)
      ? post.frontmatter.coverImage
      : toAbsoluteUrl(post.frontmatter.coverImage)
    : null

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: `${post.frontmatter.title} | ${SITE_NAME}`,
      description: post.frontmatter.description,
      url: `/blog/${params.slug}`,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.publishedAt,
      ...(coverImage && {
        images: [{ url: coverImage }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.frontmatter.title} | ${SITE_NAME}`,
      description: post.frontmatter.description,
      ...(coverImage && {
        images: [coverImage],
      }),
    },
    alternates: { canonical: `/blog/${params.slug}` },
  }
}

const categoryLabels: Record<string, string> = {
  'huong-dan': 'Hướng dẫn',
  truyen: 'Truyện',
  'gioi-thieu': 'Giới thiệu',
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = getRelatedBlogPosts(params.slug, 3)
  const headings = extractHeadings(post.content)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.publishedAt,
      dateModified: post.frontmatter.publishedAt,
      author: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}`),
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      ...(post.frontmatter.coverImage && {
        image: /^https?:\/\//i.test(post.frontmatter.coverImage)
          ? post.frontmatter.coverImage
          : toAbsoluteUrl(post.frontmatter.coverImage),
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: toAbsoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: toAbsoluteUrl('/blog') },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.frontmatter.title,
          item: toAbsoluteUrl(`/blog/${post.slug}`),
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{post.frontmatter.title}</span>
        </nav>

        <div className="flex gap-12">
          <div className="min-w-0 flex-1">
            <article>
              <header className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                  <Link
                    href={`/blog/${post.frontmatter.category}`}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                  >
                    {categoryLabels[post.frontmatter.category] || post.frontmatter.category}
                  </Link>
                  <span className="text-sm text-slate-400">{post.readingTime}</span>
                </div>

                <h1 className="text-3xl font-bold leading-tight text-slate-900">
                  {post.frontmatter.title}
                </h1>
                <p className="mt-3 text-lg text-slate-500">{post.frontmatter.description}</p>

                <time className="mt-4 block text-sm text-slate-400">
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </header>

              {post.frontmatter.coverImage && (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                    priority
                  />
                </div>
              )}

              <div
                className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-pre:bg-[#1E293B]"
                dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(post.content) }}
              />

              {post.frontmatter.tags && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {relatedPosts.length > 0 && (
              <div className="mt-16 border-t border-slate-200 pt-10">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Bài viết liên quan</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <TableOfContents headings={headings} variant="sidebar" />
        </div>
      </div>
    </>
  )
}
