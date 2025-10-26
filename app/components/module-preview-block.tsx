import type { ReactNode } from "react"

type ModulePreviewBlockProps = {
  children: ReactNode
  title?: string
  filename?: string
  description?: string
  className?: string
}

export function ModulePreviewBlock({
  children,
  title = "Rendered preview",
  filename = "example.tsx",
  description,
  className,
}: ModulePreviewBlockProps) {
  const ariaLabel = filename ? `${title} · ${filename}` : title

  return (
    <section
      className={`module-preview-block${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      <header className="module-preview-block__header">
        <span className="module-preview-block__label">{title}</span>
        {(description || filename) && (
          <div className="module-preview-block__meta">
            {description && (
              <span className="module-preview-block__description">{description}</span>
            )}
            {filename && <span className="module-preview-block__filename">{filename}</span>}
          </div>
        )}
      </header>
      <div className="module-preview-block__body">{children}</div>
    </section>
  )
}
