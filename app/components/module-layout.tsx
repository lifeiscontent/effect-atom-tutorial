import type { ReactNode } from "react"
import { Link } from "react-router"

import type { ModuleDescriptor, ModuleDetail } from "../module-manifest"

type ModuleLayoutProps = {
  module?: ModuleDescriptor
  detail: ModuleDetail
  children: ReactNode
}

export function ModuleLayout({ module, detail, children }: ModuleLayoutProps) {
  return (
    <div className="module-layout">
      {module ? <ModuleIntro module={module} detail={detail} /> : null}
      <section className="canvas module-layout__canvas">{children}</section>
    </div>
  )
}

type ModuleIntroProps = {
  module: ModuleDescriptor
  detail: ModuleDetail
}

function ModuleIntro({ module, detail }: ModuleIntroProps) {
  return (
    <section className="module-intro" aria-labelledby="module-heading">
      <div className="module-intro__meta">
        <span className="badge badge--accent">Module guide</span>
        <span className="module-intro__crumbs">{module.meta}</span>
      </div>
      <h1 id="module-heading">{module.name}</h1>
      <p className="module-intro__description">{detail.description}</p>
      <ul className="module-intro__outcomes">
        {detail.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
      <div className="module-intro__actions">
        <Link to="/" className="btn btn--ghost btn--compact">
          Back to overview
        </Link>
        <a
          className="btn btn--primary btn--compact"
          href="https://effect.website/docs"
          target="_blank"
          rel="noreferrer"
        >
          View Effect docs
        </a>
      </div>
      <p className="module-intro__footnote">
        Tip: Paste the snippet into the Effect playground to tweak the code while you read.
      </p>
    </section>
  )
}
