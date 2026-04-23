---
name: devstart-keyword-collector
description: Use when the user gives a topic and needs relevant keywords collected for `devstart-content-writing`. Produces a markdown file named `datetime_topic_kws.md`, checks `product-marketing-context` first if it exists, and outputs one main keyword plus subkeywords in array format.
metadata:
  version: 1.0.0
---

# DevStart Keyword Collector

You collect topic-relevant keywords for this repository and prepare them as upstream input for `devstart-content-writing`.

## Read First

- `.agents/product-marketing-context.md` if it exists
- `.claude/product-marketing-context.md` if it exists and `.agents/...` does not
- `AGENTS.md`
- `.opencode/skills/devstart-content-writing/SKILL.md`

## Purpose

This skill exists to turn a topic into a compact keyword brief that `devstart-content-writing` can consume.

The user input is:

- one topic, or
- one topic plus optional audience or scope constraints

The output is:

- one markdown file
- filename format: `datetime_topic_kws.md`
- one main keyword
- one array of subkeywords

## Product Marketing Context Rules

If `product-marketing-context` exists, read it before collecting keywords.

Use it to shape:

- audience level
- search intent
- preferred terminology
- use cases
- positioning language

If it does not exist:

- continue without blocking
- use neutral educational search intent
- prefer beginner-friendly keyword variants for this repo unless the user asked for another audience

## File Naming Rules

Create the output file with this pattern:

- `YYYYMMDD_HHMMSS_topic_kws.md`

Where:

- `YYYYMMDD_HHMMSS` is the current local datetime
- `topic` is a lowercase ASCII slug derived from the requested topic
- suffix must be `_kws.md`

Example:

- `20260423_154500_vong-lap-python_kws.md`

## Default Output Location

Store the file in:

- `.agents/keyword-research/`

Create the directory if it does not exist.

## Keyword Collection Rules

Collect keywords that belong to one focused page or lesson, not an entire content cluster.

Split findings into:

- `main keyword`: the single best-fit keyword for the page
- `subkeywords`: close variants, beginner questions, and long-tail phrases that support the same intent
- `discarded keywords`: optional internal working set only; do not put these in the final markdown table unless the user asks

### Pick the main keyword using this order

1. Best fit for one article or lesson title
2. Clearest search intent
3. Most natural fit for slug, description, first paragraph, and one H2
4. Strongest match to `product-marketing-context` if present
5. Broad enough to support 800-1200 words, but still focused

### Pick subkeywords that are

- Long-tail variants of the same topic
- Question-style searches like `là gì`, `cách dùng`, `hướng dẫn`, `cho người mới`
- Closely related beginner intent phrases
- Useful FAQ or H2/H3 candidates for `devstart-content-writing`

### Exclude keywords that are

- A different topic
- Too advanced for the intended audience
- Better suited for another article
- Purely navigational brand queries unless the user asked for them

## Output Format

The final file must be markdown and should use exactly one table with this structure:

```md
| date | topic | main keyword | subkeyword |
|---|---|---|---|
| 2026-04-23 15:45:00 | vòng lặp python | vòng lặp trong python | ["for python", "while python", "vòng lặp python là gì", "cách dùng for trong python"] |
```

Rules:

- `date` is datetime in `YYYY-MM-DD HH:MM:SS`
- `topic` is the original user topic, cleaned for readability
- `main keyword` is a plain string
- `subkeyword` is a JSON-style array on one line

Do not output prose before or after the table unless the user asked for commentary.

## Recommended Workflow

1. Read `product-marketing-context` if present.
2. Normalize the requested topic.
3. Infer audience and search intent.
4. Generate a candidate keyword pool.
5. Select one main keyword.
6. Select 5-12 subkeywords that support the same page intent.
7. Build the markdown table.
8. Save the file as `datetime_topic_kws.md` under `.agents/keyword-research/`.

## Cross-Skill Handoffs

- `product-marketing-context`: use first if the repo needs foundational audience and positioning context
- `devstart-content-writing`: the next step after this skill creates the keyword file
- `content-strategy`: use instead when the user needs clusters, roadmap, or multiple content ideas
- `ai-seo`: pair with this when the user wants stronger AI citation or answer-engine framing
- `customer-research`: use when keyword direction should come from VOC, reviews, transcripts, or support patterns

## References

- `references/keyword-output-template.md`
- `references/keyword-checklist.md`
