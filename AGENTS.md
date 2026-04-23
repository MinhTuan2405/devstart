# AGENTS.md

## Reality
- Root `README.md` is still the default `create-next-app` stub. Trust `package.json`, `netlify.toml`, and the code under `app/`, `lib/`, and `content/` instead.
- User-facing routes and SEO copy are Vietnamese (`/khoa-hoc`, `/gioi-thieu`, `vi_VN` metadata). Preserve that unless asked otherwise.

## Commands
- Use `npm`.
- Dev server: `npm run dev`
- Quick check: `npm run lint`
- Full check: `npm run build`
- There is no `test` or standalone `typecheck` script. `next build` is the only repo-defined full validation path.
- No CI workflows, formatter config, or pre-commit hooks are checked in.
- Netlify deploys with `npm run build` and `@netlify/plugin-nextjs` from `netlify.toml`.

## Content And Routing
- Course and blog content comes straight from the filesystem via `lib/mdx.ts` (`fs` + `gray-matter`), not a CMS or MDX runtime.
- Content files are treated as frontmatter plus raw markdown body only. `lib/markdown.ts` does regex-based HTML rendering, so JSX, imports, and advanced MDX syntax will not work.
- Course lessons live in `content/courses/<course>/*.mdx`; lesson order and prev/next navigation use numeric frontmatter `order`, not filename order.
- Blog posts live in `content/blog/*.mdx`; lists sort newest-first by `publishedAt`, and `readingTime` is auto-generated unless frontmatter overrides it.
- Course frontmatter used by the app: `title`, `description`, `slug`, `course`, `order`, `duration`, `difficulty`, `keywords`, `publishedAt`.
- Blog frontmatter used by the app: `title`, `description`, `slug`, `category`, `tags`, `keywords`, `publishedAt`; `readingTime` and `coverImage` are optional.
- Adding a new course is not content-only: update `lib/mdx.ts` (`courseInfo`, `getAllLessons()`), `components/course/CourseCard.tsx`, `components/layout/Footer.tsx`, and add both `app/khoa-hoc/<course>/page.tsx` and `app/khoa-hoc/<course>/[slug]/page.tsx`.
- Adding a new blog category is not content-only: update `lib/blog.ts`, `components/blog/BlogFilter.tsx`, `components/blog/BlogCard.tsx`, the category label map in `app/blog/[slug]/page.tsx`, and add `app/blog/<category>/page.tsx`.

## SEO And Metadata
- `NEXT_PUBLIC_SITE_URL` is the primary canonical base URL; `lib/seo.ts` falls back to `SITE_URL` and then Netlify `URL`.
- Metadata and JSON-LD are handwritten in route files, not centralized. New routes usually need copied metadata, canonical, and schema blocks.
- `app/layout.tsx` hardcodes GA measurement ID `G-SY56EQ6GW7`; there is no env-backed analytics abstraction.
- `app/robots.ts` advertises `/sitemap.xml`, and `netlify.toml` has a redirect for it, but the repo has no sitemap generator route.

## Gotchas
- Heading ID generation is duplicated in `lib/markdown.ts` and `lib/toc.ts`. Keep both in sync or TOC anchor links break.
- `app/opengraph-image.tsx` and `app/twitter-image.tsx` export `runtime = 'edge'`, so the usual Next.js warning about edge runtime disabling static generation for those image routes is expected.
