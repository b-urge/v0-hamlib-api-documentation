"use client"

import React from "react"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  className?: string
}

const syntaxColors: Record<string, string> = {
  keyword: "text-[#c792ea]",
  string: "text-[#c3e88d]",
  number: "text-[#f78c6c]",
  comment: "text-[#546e7a] italic",
  property: "text-[#82aaff]",
  punctuation: "text-[#89ddff]",
  method: "text-[#82aaff]",
  variable: "text-[#eeffff]",
  type: "text-[#ffcb6b]",
}

function highlightJSON(code: string): React.ReactNode[] {
  const lines = code.split("\n")
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let partIndex = 0

    while (remaining.length > 0) {
      // Match strings (keys and values)
      const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/)
      if (stringMatch) {
        // Check if it's a key (followed by colon)
        const afterString = remaining.slice(stringMatch[0].length)
        const isKey = /^\s*:/.test(afterString)
        parts.push(
          <span key={partIndex++} className={isKey ? syntaxColors.property : syntaxColors.string}>
            {stringMatch[0]}
          </span>
        )
        remaining = afterString
        continue
      }

      // Match numbers
      const numMatch = remaining.match(/^(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/)
      if (numMatch && !/[a-zA-Z_]/.test(remaining[numMatch[0].length] || "")) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.number}>
            {numMatch[0]}
          </span>
        )
        remaining = remaining.slice(numMatch[0].length)
        continue
      }

      // Match keywords
      const kwMatch = remaining.match(/^(true|false|null)\b/)
      if (kwMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.keyword}>
            {kwMatch[0]}
          </span>
        )
        remaining = remaining.slice(kwMatch[0].length)
        continue
      }

      // Match punctuation
      const punctMatch = remaining.match(/^([{}[\]:,])/)
      if (punctMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.punctuation}>
            {punctMatch[0]}
          </span>
        )
        remaining = remaining.slice(punctMatch[0].length)
        continue
      }

      // Whitespace or other characters
      parts.push(remaining[0])
      remaining = remaining.slice(1)
      partIndex++
    }

    return (
      <div key={lineIndex} className="table-row">
        <span className="table-cell pr-4 text-right text-muted-foreground/40 select-none w-8">
          {lineIndex + 1}
        </span>
        <span className="table-cell">{parts}</span>
      </div>
    )
  })
}

function highlightBash(code: string): React.ReactNode[] {
  const lines = code.split("\n")
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let partIndex = 0

    while (remaining.length > 0) {
      // Match comments
      const commentMatch = remaining.match(/^(#.*)/)
      if (commentMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.comment}>
            {commentMatch[0]}
          </span>
        )
        remaining = ""
        continue
      }

      // Match strings
      const stringMatch = remaining.match(/^(["'](?:[^"'\\]|\\.)*["'])/)
      if (stringMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.string}>
            {stringMatch[0]}
          </span>
        )
        remaining = remaining.slice(stringMatch[0].length)
        continue
      }

      // Match curl flags/options
      const flagMatch = remaining.match(/^(-[a-zA-Z]+|--[a-zA-Z-]+)/)
      if (flagMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.keyword}>
            {flagMatch[0]}
          </span>
        )
        remaining = remaining.slice(flagMatch[0].length)
        continue
      }

      // Match URLs
      const urlMatch = remaining.match(/^(https?:\/\/[^\s'"]+)/)
      if (urlMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.string}>
            {urlMatch[0]}
          </span>
        )
        remaining = remaining.slice(urlMatch[0].length)
        continue
      }

      // Match commands
      const cmdMatch = remaining.match(/^(curl|wget|echo|export)\b/)
      if (cmdMatch) {
        parts.push(
          <span key={partIndex++} className={syntaxColors.method}>
            {cmdMatch[0]}
          </span>
        )
        remaining = remaining.slice(cmdMatch[0].length)
        continue
      }

      parts.push(remaining[0])
      remaining = remaining.slice(1)
      partIndex++
    }

    return (
      <div key={lineIndex} className="table-row">
        <span className="table-cell pr-4 text-right text-muted-foreground/40 select-none w-8">
          {lineIndex + 1}
        </span>
        <span className="table-cell">{parts}</span>
      </div>
    )
  })
}

function highlightCode(code: string, language: string): React.ReactNode[] {
  switch (language) {
    case "json":
      return highlightJSON(code)
    case "bash":
    case "shell":
    case "curl":
      return highlightBash(code)
    default:
      return highlightJSON(code)
  }
}

export function CodeBlock({ code, language = "json", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      {!title && (
        <div className="flex justify-end px-4 py-2 bg-secondary/50 border-b border-border">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
      <div className="overflow-x-auto bg-[hsl(222,47%,5%)] p-4">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="table w-full">{highlightCode(code, language)}</code>
        </pre>
      </div>
    </div>
  )
}
