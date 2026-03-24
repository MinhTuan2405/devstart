function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderMarkdownToHtml(content: string): string {
  let html = content

  // Code blocks first (before other transforms)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const langLabel = lang ? `<div class="flex items-center justify-between border-b border-slate-700 px-4 py-2"><span class="text-xs font-medium text-slate-400">${lang}</span></div>` : ''
    return `<div class="not-prose my-6 overflow-hidden rounded-xl border border-slate-700 bg-[#1E293B]">${langLabel}<pre class="overflow-x-auto p-4"><code class="text-sm leading-relaxed text-slate-300">${escapeHtml(code.trim())}</code></pre></div>`
  })

  // Inline code (after code blocks)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headings
  html = html.replace(/^### (.*$)/gim, (_: string, text: string) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return `<h3 id="${id}">${text}</h3>`
  })
  html = html.replace(/^## (.*$)/gim, (_: string, text: string) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return `<h2 id="${id}">${text}</h2>`
  })
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold & italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Unordered list items
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, (match) => {
    if (!match.includes('<li>')) return match
    return `<ul>${match}</ul>`
  })

  // Ordered list items
  html = html.replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>')

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
        trimmed.startsWith('<li')) {
      return trimmed
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
  }).join('\n')

  return html
}
