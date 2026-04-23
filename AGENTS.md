# AGENTS.md

## Repo Reality
- Root `README.md` is still the default `create-next-app` stub. For repo-specific behavior, trust `package.json`, `netlify.toml`, and the source under `app/`, `lib/`, and `content/`.
- Single Next.js 14 App Router app at the repo root. Use `npm`; `package-lock.json` is the committed lockfile.
- Public routes and SEO copy are Vietnamese (`/khoa-hoc`, `/gioi-thieu`, `vi_VN` metadata). Preserve that unless the user asks to change it.

## Commands
- Dev server: `npm run dev`
- Quick verification: `npm run lint`
- Full verification: `npm run build`
- There is no separate `test` or `typecheck` script. `npm run build` already runs linting and TypeScript validation.
- No CI workflows, formatter config, or pre-commit hooks are checked in. Do not assume extra gates beyond the scripts above.

## App Wiring
- Main entrypoints are in `app/`; shared UI is in `components/`; content loading lives in `lib/mdx.ts`; SEO/canonical helpers live in `lib/seo.ts`.
- Course and blog pages are statically generated from filesystem content via `generateStaticParams`, not from an external CMS or API.
- `NEXT_PUBLIC_SITE_URL` is the preferred canonical URL env var; `lib/seo.ts` falls back to `SITE_URL` and then Netlify `URL`.
- Netlify deploy uses `npm run build` plus `@netlify/plugin-nextjs` from `netlify.toml`.

## Content Contracts
- Course lessons live in `content/courses/<course>/*.mdx`. Sorting and prev/next navigation use numeric frontmatter `order`, not filename order.
- Blog posts live in `content/blog/*.mdx`. Lists are sorted newest-first by `publishedAt`; `readingTime` is auto-generated unless frontmatter overrides it.
- Course frontmatter used by the app: `title`, `description`, `slug`, `course`, `order`, `duration`, `difficulty`, `keywords`, `publishedAt`.
- Blog frontmatter used by the app: `title`, `description`, `slug`, `category`, `tags`, `keywords`, `publishedAt`; `readingTime` and `coverImage` are optional.
- These `.mdx` files are not rendered as real MDX. `lib/mdx.ts` only reads frontmatter/body, and `lib/markdown.ts` converts the body with a custom regex-based markdown renderer. JSX, imports, and advanced MDX syntax will not work.

## Hardcoded Maps To Remember
- Adding a new course is not data-only. Besides `content/courses/<slug>`, update hardcoded course references in `lib/mdx.ts`, `components/course/CourseCard.tsx`, `components/layout/Footer.tsx`, and add both route files under `app/khoa-hoc/<slug>/`.
- Adding a new blog category is not data-only. Update `components/blog/BlogCard.tsx`, `components/blog/BlogFilter.tsx`, `lib/blog.ts`, the category label map in `app/blog/[slug]/page.tsx`, and add `app/blog/<category>/page.tsx`.

## Gotchas
- Heading IDs are duplicated in `lib/markdown.ts` and `lib/toc.ts`. Keep both in sync or table-of-contents links will break.
- `npm run build` currently prints `Using edge runtime on a page currently disables static generation for that page` because `app/opengraph-image.tsx` and `app/twitter-image.tsx` export `runtime = 'edge'`. Treat that warning as expected unless you are changing those image routes.
