'use client'

import { useState } from 'react'

interface CodeBlockProps {
  children: string
  language?: string
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-slate-700 bg-[#1E293B]">
      {language && (
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
          <span className="text-xs font-medium text-slate-400">{language}</span>
          <button
            onClick={handleCopy}
            className="rounded px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            {copied ? '✓ Đã copy' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className={`text-sm text-slate-300 ${language ? `language-${language}` : ''}`}>
          {children}
        </code>
      </pre>
    </div>
  )
}
