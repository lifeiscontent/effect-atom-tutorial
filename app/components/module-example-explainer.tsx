import type { ReactNode } from "react"
import type { ModuleDescriptor } from "../module-manifest"
import { DEFAULT_MODULE_DETAIL, getModuleBySlug } from "../module-manifest"

type ModuleExampleExplainerProps = {
  slug: ModuleDescriptor["slug"]
  title?: string
  eyebrow?: string
  children?: ReactNode
}

export function ModuleExampleExplainer({
  slug,
  title,
  eyebrow,
  children,
}: ModuleExampleExplainerProps) {
  const module = getModuleBySlug(slug)
  const detail = module?.detail ?? DEFAULT_MODULE_DETAIL

  return (
    <article className="module-guide">
      <div className="module-stack">
        <span className="module-eyebrow">{eyebrow ?? module?.meta ?? "Tutorial module"}</span>
        <h3>{title ?? `Why this ${module?.name ?? "module"} example exists`}</h3>
        <p>{detail.description}</p>
      </div>
      <ul className="module-list">
        {detail.outcomes.map((outcome) => (
          <li key={`${slug}-${outcome}`}>{outcome}</li>
        ))}
      </ul>
      {children}
    </article>
  )
}
