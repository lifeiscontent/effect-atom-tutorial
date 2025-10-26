import { useCallback, useEffect, useMemo, useState } from "react"
import { Highlight, themes, type Language } from "prism-react-renderer"

type ModuleCodeBlockProps = {
  code: string
  language?: Language
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

const FALLBACK_LANGUAGE: Language = "plain"

function inferLanguage(filename?: string): Language {
  if (!filename) {
    return FALLBACK_LANGUAGE
  }

  const extension = filename.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "ts":
    case "tsx":
      return "tsx"
    case "js":
      return "javascript"
    case "jsx":
      return "jsx"
    case "json":
      return "json"
    case "css":
      return "css"
    case "html":
    case "htm":
      return "markup"
    default:
      return FALLBACK_LANGUAGE
  }
}

export function ModuleCodeBlock({
  code,
  language,
  filename,
  showLineNumbers = true,
  className,
}: ModuleCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const normalisedCode = useMemo(() => code.replace(/\r\n/g, "\n").trimEnd(), [code])

  const activeLanguage = useMemo(() => language ?? inferLanguage(filename), [language, filename])

  const lineDigits = useMemo(() => {
    const lineCount = normalisedCode.split("\n").length
    return String(lineCount).length
  }, [normalisedCode])

  const handleCopy = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }

    navigator.clipboard
      .writeText(code)
      .then(() => setCopied(true))
      .catch(() => {
        // Browsers may block clipboard access without explicit permission.
      })
  }, [code])

  useEffect(() => {
    if (!copied || typeof window === "undefined") {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copied])

  const hasClipboardSupport = typeof navigator !== "undefined" && Boolean(navigator.clipboard)

  return (
    <div className={`module-code-block${className ? ` ${className}` : ""}`}>
      {(filename || hasClipboardSupport) && (
        <header className="module-code-block__header">
          {filename && <span className="module-code-block__filename">{filename}</span>}
          {hasClipboardSupport && (
            <button
              type="button"
              className={`module-code-block__copy${
                copied ? " module-code-block__copy--copied" : ""
              }`}
              onClick={handleCopy}
              aria-live="polite"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </header>
      )}

      <Highlight code={normalisedCode} language={activeLanguage} theme={themes.nightOwl}>
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`module-code-block__pre ${preClassName}`}
            style={{ ...style, backgroundColor: "transparent" }}
          >
            <code className="module-code-block__code">
              {tokens.map((line, lineIndex) => {
                const lineProps = getLineProps({ line })
                const { key: _lineKey, className: lineClassName, ...lineRestProps } = lineProps

                return (
                  <div
                    key={`module-code-block-line-${lineIndex}`}
                    {...lineRestProps}
                    className={`module-code-block__line ${lineClassName ?? ""}`}
                  >
                    {showLineNumbers && (
                      <span
                        className="module-code-block__line-number"
                        style={{ minWidth: `${lineDigits}ch` }}
                      >
                        {String(lineIndex + 1).padStart(lineDigits, " ")}
                      </span>
                    )}
                    <span className="module-code-block__tokens">
                      {line.map((token, tokenIndex) => {
                        const tokenProps = getTokenProps({ token })
                        const {
                          key: _tokenKey,
                          className: tokenClassName,
                          ...tokenRestProps
                        } = tokenProps

                        return (
                          <span
                            key={`module-code-block-token-${lineIndex}-${tokenIndex}`}
                            {...tokenRestProps}
                            className={`module-code-block__token ${tokenClassName ?? ""}`}
                          />
                        )
                      })}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
