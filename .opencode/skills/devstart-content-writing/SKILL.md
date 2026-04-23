---
name: devstart-content-writing
description: Use when the user wants to create or expand Vietnamese programming course lessons or blog posts for this repo. Produces file-ready `.mdx` for `content/courses/*` and `content/blog/*`, using this project's exact frontmatter, markdown limitations, keyword rules, and AI/Google-friendly structure.
metadata:
  version: 1.0.0
---

# DevStart Content Writing

You write educational Vietnamese MDX content for this repository.

This skill is template-driven. It should inherit this repo's real content structure, but it should not copy full sample articles unless the user explicitly asks for a finished draft.

This skill should treat `product-marketing-context` as upstream context when it exists.

## Read First

- `.agents/product-marketing-context.md` if it exists
- `.claude/product-marketing-context.md` if it exists and `.agents/...` does not
- `AGENTS.md`
- `lib/mdx.ts`
- `lib/markdown.ts`
- One sibling example in the target folder before drafting

## Product Marketing Context Rules

If a product marketing context file exists, read it before making topic, angle, audience, or positioning decisions.

Use it to infer:

- target audience and skill level
- core pains and desired outcomes
- product or brand positioning
- preferred terminology and tone
- priority use cases and differentiators

Do not ask the user to repeat information that is already captured there.

If the context file does not exist:

- continue with the repo constraints and the user's request
- avoid inventing detailed brand claims, proprietary proof points, or positioning
- prefer neutral, factual educational framing

## Use This Skill For

- New or updated course lessons in `content/courses/<course>/`
- New or updated blog posts in `content/blog/`
- Keyword-list driven content planning where the input is a raw list of keywords and the skill must choose the primary keyword and supporting keywords

## Hard Repo Constraints

- Files are parsed as frontmatter plus raw markdown body. Do not use JSX, imports, components, MDX expressions, callouts, footnotes, or HTML-only layout tricks.
- Prefer `##` and `###` headings. Avoid body `#` because page titles already come from frontmatter.
- Markdown images are not transformed by `lib/markdown.ts`. For blog hero visuals, use `coverImage` frontmatter instead of body images.
- Prefer unordered lists with `- `. The custom renderer wraps unordered lists correctly, but ordered lists are not fully rendered as semantic `<ol>`.
- Keep heading text plain and stable. Table-of-contents IDs are derived from heading text in both `lib/markdown.ts` and `lib/toc.ts`.
- Course routing uses frontmatter `slug`. Course ordering and lesson navigation use numeric frontmatter `order`, not filename order.
- Current supported course slugs are `python`, `cpp`, and `html-css` unless the repo is updated in multiple hardcoded places.
- Current supported blog categories are `huong-dan`, `truyen`, and `gioi-thieu` unless the repo is updated in multiple hardcoded places.

## Default Output Targets

- Body length: 800-1200 words unless the user asks for a different length
- Language: Vietnamese, beginner-friendly, concrete, direct
- One primary keyword and 4-8 secondary or long-tail keywords
- `keywords` frontmatter must include the primary keyword plus long-tail variants
- Title should match search intent clearly, not try to be clever
- Description should state the answer plainly and usually fit within 140-160 characters

## Keyword Input Rules

If the user gives a keyword list, do not ask them to label main vs sub keywords unless the list is too ambiguous to use.

Your job is to classify the list into:

- `primary keyword`: the clearest, highest-intent phrase that best matches one article or lesson topic
- `supporting keywords`: close variants, beginner questions, and long-tail phrases that naturally belong in the same page
- `discarded keywords`: phrases that are off-topic, belong to a different search intent, or deserve a separate article

### Pick the primary keyword using this order

1. Best match to a single article's main promise
2. Clearest beginner search intent
3. Most natural fit for title, slug, first paragraph, and one H2
4. Broad enough to support 800-1200 words, but not so broad that the page becomes vague
5. Best fit with the audience and positioning in `product-marketing-context`

### Treat as supporting keywords when they are

- Long-tail expansions of the same topic
- Beginner variants like `là gì`, `cách dùng`, `cách học`, `ví dụ`, `cho người mới`
- Close synonyms or phrasings that can fit naturally in H2/H3/FAQ

### Discard or split out keywords when they are

- A different topic entirely
- A different buyer intent or audience
- Too advanced for the page's level
- Better suited as another lesson or blog post

## Required Output Modes

Choose the lightest output that satisfies the request.

### Mode 1: Template Only

Use this when the user wants a structure, template, or framework rather than a finished article.

Return:

1. Primary keyword
2. Supporting keywords
3. Optional discarded keywords
4. File-ready frontmatter template
5. Section-by-section body template with placeholders and writing instructions

### Mode 2: Template Plus Outline

Use this when the user wants stronger direction but not full copy.

Return:

1. Primary keyword
2. Supporting keywords
3. Draft title options
4. Draft description
5. File-ready frontmatter template
6. H2/H3 outline with notes on what each section should cover

### Mode 3: Full Draft

Use this only when the user clearly wants the actual finished content.

## Content Requirements

### Course Lessons

- Open with a direct answer in the first 40-60 words
- Explain the concept simply, then show syntax, then practical examples, then common mistakes, then practice, then recap
- Include at least 2 code blocks and 1 practical exercise
- Use H2/H3 headings that mirror beginner search queries
- End with a short transition to the next lesson
- Default structure should follow `references/course-lesson-reference.mdx`

### Blog Posts

- Open with a direct answer in the first 40-60 words
- Include a clear outline, practical examples, FAQ, and a short conclusion
- Use an existing category unless the task also includes changing UI maps and routes
- Use `coverImage` only if the asset already exists or the user asked for one
- Default structure should follow `references/blog-post-reference.mdx`

## AI And Google Optimization

- Put the primary keyword in the title, description, slug, first paragraph, at least one H2, and the `keywords` array
- Use long-tail keywords naturally in H2/H3s, examples, and FAQ answers
- Write self-contained answer blocks that can be quoted by AI Overviews, ChatGPT, Perplexity, and similar tools
- Prefer short factual paragraphs over filler
- Add 2-4 FAQ questions phrased the way a beginner would actually search
- If you cite facts or statistics, attach a normal markdown link to the source
- Avoid keyword stuffing, vague claims, and generic intros
- Favor explicit phrasing like `Python list là...` or `Vòng lặp while dùng khi...`

## Context-Aware Writing

When `product-marketing-context` exists, adapt the template or draft to match it:

- Use the audience's language, not generic textbook phrasing
- Emphasize use cases that matter to that audience
- Prefer examples aligned with the product or brand context when appropriate
- Keep educational content honest; do not force promotional language into course lessons unless the user asked for branded content
- For blog content, let positioning shape examples, comparisons, FAQs, and CTA direction if relevant

If the context conflicts with the repo's beginner-friendly Vietnamese style, keep the repo style for course content and use the context more lightly.

## Frontmatter Contracts

### Course Lesson

```md
---
title: ""
description: ""
slug: ""
course: "python"
order: 1
duration: "15 phút"
difficulty: "Dễ"
keywords: ["", ""]
publishedAt: "2024-01-15"
---
```

### Blog Post

```md
---
title: ""
description: ""
slug: ""
category: "huong-dan"
tags: ["", ""]
keywords: ["", ""]
publishedAt: "2024-01-25"
readingTime: "8 phút"
coverImage: "/opengraph-image.png"
---
```

`readingTime` is optional for blog posts. The app can compute it automatically, but include it when the user wants explicit editorial control.

## Recommended Writing Workflow

1. Identify the target type: course lesson or blog post.
2. Read `product-marketing-context` first if present.
3. If the user provided a keyword list, classify it into primary, supporting, and discarded keywords.
4. Select the output mode: template only, template plus outline, or full draft.
5. Draft valid frontmatter first.
6. Build an outline with H2/H3s that match real search intent.
7. If writing a full draft, write the intro answer paragraph before expanding the topic.
8. Add examples, code, FAQ, and practice using only syntax supported by `lib/markdown.ts`.
9. Run this final check:
   - 800-1200 words?
   - Vietnamese and beginner-friendly?
   - Frontmatter valid for this repo?
   - No JSX, body images, or unsupported MDX?
   - Primary keyword and long-tail keywords included naturally?
   - FAQ included?
   - Consistent with `product-marketing-context` if one exists?
   - Clear recap and next step?

## Cross-Skill Handoffs

Use or recommend adjacent skills when the task crosses boundaries:

- `devstart-keyword-collector`: if the user has a topic but first needs a main keyword and subkeyword set for this skill
- `product-marketing-context`: if foundational audience, positioning, or product context is missing
- `content-strategy`: if the user needs topic planning, clustering, or editorial prioritization instead of one template or one article
- `ai-seo`: if the user wants stronger AI citation strategy, answer-engine optimization, or competitive AI visibility
- `copywriting`: if the task shifts from educational content into conversion-focused landing-page or product-page copy
- `customer-research`: if keyword choices, FAQs, or angles should be grounded in VOC, transcripts, reviews, or support pain points
- `competitor-alternatives`: if the user wants comparison, versus, or alternatives content rather than general educational content

Default behavior:

- educational MDX template or draft -> stay in this skill
- content system or roadmap problem -> move toward `content-strategy`
- positioning ambiguity -> read or create `product-marketing-context`
- AI visibility problem -> pair with `ai-seo`

## Output Format

If returning a template, keep placeholders explicit, for example:

- `[PRIMARY_KEYWORD]`
- `[LONG_TAIL_KEYWORD_1]`
- `[INSERT 2-3 SENTENCES EXPLAINING THE CONCEPT]`
- `[ADD CODE EXAMPLE HERE]`

If returning a full draft, return file-ready `.mdx`.

## References

- `references/course-lesson-reference.mdx`
- `references/blog-post-reference.mdx`
- `references/content-checklist.md`
