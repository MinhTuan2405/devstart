# Course Content Workflow

Dung file nay khi muon tiep tuc san xuat lesson bang skill ma khong de agent tu mo rong pham vi.

## Thu tu dung skill

1. Chot roadmap truoc.
2. Chay `devstart-keyword-collector` cho tung topic.
3. Chay `devstart-content-writing` cho tung file dich cu the.
4. Mỗi lan chi viet 1 lesson vao 1 path cu the.

## Prompt mau cho keyword collector

```text
Collect keywords for one course lesson only.
Topic: [TOPIC]
Audience: beginner Vietnamese learners.
Output file only: .agents/keyword-research/[TIMESTAMP]_[TOPIC-SLUG]_kws.md
Use one main keyword and 5-12 subkeywords for the same lesson intent.
Do not edit any other file.
```

## Prompt mau cho content writing

```text
Write one finished Vietnamese course lesson only.
Target file: content/courses/[COURSE]/[FILE].mdx
Use this keyword brief as upstream input: .agents/keyword-research/[FILE_KWS].md
Match this repo's frontmatter exactly.
Keep the lesson beginner-friendly and markdown-only.
Include: direct intro, syntax, at least 2 code blocks, common mistakes, 1 exercise, 2 FAQ items, recap, next-step transition.
Do not create routes, components, or edit any file outside the target lesson.
```

## Scope guardrails

- Khong them course moi neu chua cap nhat cac map hardcode trong repo.
- Khong doi slug course hien co: `python`, `cpp`, `html-css`.
- Khong doi blog category khi dang lam course.
- Khong them JSX, import, component, hoac HTML body phuc tap vao `.mdx` lesson.
- Neu can viet nhieu bai, lap lai workflow theo tung bai thay vi prompt mot luc cho ca cluster.
