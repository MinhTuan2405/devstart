function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function toHeadingId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function createCodeBlockHtml(lang: string | undefined, code: string): string {
  const safeLang = lang ? escapeHtml(lang) : ''
  const langLabel = safeLang
    ? `<div class="flex items-center justify-between border-b border-slate-700 px-4 py-2"><span class="text-xs font-medium text-slate-400">${safeLang}</span></div>`
    : ''

  return `<div class="not-prose my-6 overflow-hidden rounded-xl border border-slate-700 bg-[#1E293B]">${langLabel}<pre class="overflow-x-auto p-4"><code class="text-sm leading-relaxed text-slate-300">${escapeHtml(code.trim())}</code></pre></div>`
}

function wrapListItems(html: string, listType: 'ul' | 'ol'): string {
  const marker = listType === 'ul' ? 'ul' : 'ol'
  const pattern = new RegExp(`((?:<li data-list="${marker}">.*<\\/li>\\n?)+)`, 'g')

  return html.replace(pattern, (match) => {
    const normalizedItems = match.replace(new RegExp(` data-list="${marker}"`, 'g'), '')
    return `<${listType}>${normalizedItems}</${listType}>`
  })
}

export function renderMarkdownToHtml(content: string): string {
  let html = content.replace(/\r\n/g, '\n')
  const placeholders: string[] = []

  const createPlaceholder = (value: string): string => {
    const token = `@@MD_TOKEN_${placeholders.length}@@`
    placeholders.push(value)
    return token
  }

  const restorePlaceholders = (value: string): string =>
    value.replace(/@@MD_TOKEN_(\d+)@@/g, (_, index: string) => {
      const resolved = placeholders[Number(index)]
      return resolved ?? ''
    })

  // Code blocks first (before other transforms)
  html = html.replace(/```([\w-]+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return createPlaceholder(createCodeBlockHtml(lang, code))
  })

  // Inline code (after code blocks)
  html = html.replace(/`([^`\n]+)`/g, (_, inlineCode: string) => {
    return createPlaceholder(`<code>${escapeHtml(inlineCode)}</code>`)
  })

  // Headings
  html = html.replace(/^### (.*$)/gim, (_: string, text: string) => {
    const id = toHeadingId(text)
    return `<h3 id="${id}">${text}</h3>`
  })
  html = html.replace(/^## (.*$)/gim, (_: string, text: string) => {
    const id = toHeadingId(text)
    return `<h2 id="${id}">${text}</h2>`
  })
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold & italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_: string, alt: string, src: string, title?: string) => {
    const safeAlt = escapeHtml(alt.trim())
    const safeSrc = escapeHtml(src.trim())
    const titleAttr = title ? ` title="${escapeHtml(title.trim())}"` : ''
    return `<img src="${safeSrc}" alt="${safeAlt}"${titleAttr} loading="lazy" decoding="async" />`
  })

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, label: string, href: string) => {
    const safeHref = escapeHtml(href.trim())
    const isExternal = /^(https?:)?\/\//i.test(href)
    const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${safeHref}"${targetAttrs}>${label}</a>`
  })

  // Lists
  html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<li data-list="ul">$1</li>')
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li data-list="ol">$1</li>')
  html = wrapListItems(html, 'ul')
  html = wrapListItems(html, 'ol')

  // Tables (basic)
  html = html.replace(/^\|(.+)\|$/gim, (_, row: string) => {
    const cells = row.split('|').map((c: string) => c.trim()).filter(Boolean)
    if (cells.every((c: string) => /^[-:]+$/.test(c))) return ''
    const cellHtml = cells.map((c: string) => `<td class="border border-slate-200 px-3 py-2 text-sm">${c}</td>`).join('')
    return `<tr>${cellHtml}</tr>`
  })
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, (match) => {
    if (!match.includes('<tr>')) return match
    return `<table class="w-full border-collapse border border-slate-200 my-4">${match}</table>`
  })

  // Horizontal rule
  html = html.replace(/^\s*---\s*$/gim, '<hr />')

  // Restore protected code fragments before paragraph wrapping.
  html = restorePlaceholders(html)

  // Paragraphs
  html = html.split('\n\n').map((block) => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<table') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<img') ||
        trimmed.startsWith('<hr')) {
      return trimmed
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
  }).join('\n')

  return html
}
