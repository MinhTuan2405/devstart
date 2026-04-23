# DevStart Content Checklist

Use this checklist before adding or updating `content/courses/*/*.mdx` or `content/blog/*.mdx`.

## Repo Fit

- Frontmatter matches `lib/mdx.ts`
- Body uses plain markdown only
- No JSX, imports, components, footnotes, or markdown images
- Body avoids `#` headings and mainly uses `##` / `###`
- Unordered lists are preferred over ordered lists

## Context Fit

- `.agents/product-marketing-context.md` was checked first if present
- Audience, pain points, and tone are aligned with the context file when relevant
- No invented brand claims, metrics, or differentiators were added without support
- Course content stays beginner-friendly even if brand context is more advanced

## SEO Fit

- One clear primary keyword
- 4-8 supporting or long-tail keywords
- Primary keyword appears in title, description, slug, first paragraph, one H2, and `keywords`
- Description clearly answers the topic
- Headings mirror real beginner search intent

## Keyword Selection Fit

- Input keyword list has been split into primary, supporting, and discarded keywords
- Primary keyword can support one focused page
- Supporting keywords share the same search intent
- Off-topic keywords are removed or split into future content ideas

## AI Fit

- First paragraph gives a direct answer in 40-60 words
- Sections are self-contained and quotable
- FAQ includes 2-4 natural-language questions
- Explanations are factual and easy to extract
- No keyword stuffing

## Editorial Fit

- 800-1200 words unless the user requested a different target
- Vietnamese tone is simple and beginner-friendly
- Course lessons include code examples and a practical exercise
- Blog posts include practical guidance and a conclusion
- Claims are specific and supported when needed
- If the request is for a template only, placeholders are explicit and reusable instead of full drafted copy
