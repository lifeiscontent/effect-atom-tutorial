import { Link, NavLink } from "react-router"

import { MODULES } from "../module-manifest"

type ModuleLink = {
  label: string
  slug?: string
}

const HERO_STATS = [
  {
    label: "Tutorials",
    value: MODULES.length.toString(),
    description: "Free walkthroughs covering atoms, effects, streams, and integrations.",
  },
  {
    label: "Reading time",
    value: "10–25 min",
    description: "Concise modules you can complete between coding sessions.",
  },
] as const

const HOME_TRACKS: ReadonlyArray<{
  title: string
  description: string
  icon: string
  modules: ReadonlyArray<ModuleLink>
}> = [
  {
    title: "Start with the basics",
    description: "Create atoms, update values, and derive state without extra setup.",
    icon: "🧭",
    modules: [
      { label: "Overview" },
      { label: "Counter", slug: "counter" },
      { label: "Derived State", slug: "derived-state" },
    ],
  },
  {
    title: "Handle async work",
    description:
      "Trigger effects, call APIs, and manage scoped resources with minimal boilerplate.",
    icon: "⚙️",
    modules: [
      { label: "Effects", slug: "effects" },
      { label: "Scoped Effects", slug: "scoped-effects" },
      { label: "HTTP API Integration", slug: "http-api-integration" },
    ],
  },
  {
    title: "Grow the data layer",
    description: "Organise services, streams, and keyed stores for richer UIs.",
    icon: "🧱",
    modules: [
      { label: "Services & Layers", slug: "services-and-layers" },
      { label: "Streams", slug: "streams" },
      { label: "Atom Sets", slug: "atom-sets" },
    ],
  },
]

const HOME_RESOURCES = [
  {
    title: "LLM-friendly summary",
    description:
      "Read the llms.txt guide that curates the tutorial for language models and agents.",
    cta: "Open llms.txt",
    href: "/llms.txt",
    icon: "🤖",
  },
  {
    title: "Effect docs overview",
    description: "Jump to the official Effect documentation for deeper background.",
    cta: "Open docs",
    href: "https://effect.website/docs",
    icon: "📘",
  },
  {
    title: "Effect playground",
    description: "Experiment with Effect snippets directly in the browser.",
    cta: "Launch playground",
    href: "https://effect.website/play",
    icon: "🧪",
  },
  {
    title: "GitHub examples",
    description: "Browse community-maintained recipes and sample projects.",
    cta: "View repository",
    href: "http://github.com/lifeiscontent/effect-atom-tutorial",
    icon: "🗂️",
  },
] as const

const HOME_HIGHLIGHTS: ReadonlyArray<{
  title: string
  description: string
  modules: ReadonlyArray<ModuleLink>
}> = [
  {
    title: "Counter + Effects",
    description: "See how atoms, derived data, and effects combine in a minimal React example.",
    modules: [
      { label: "Counter", slug: "counter" },
      { label: "Effects", slug: "effects" },
    ],
  },
  {
    title: "Services & Layers",
    description: "Reuse service layers to share clients and configuration across components.",
    modules: [
      { label: "Services & Layers", slug: "services-and-layers" },
      { label: "Functions", slug: "functions" },
    ],
  },
  {
    title: "Streams",
    description:
      "Stream updates, debounce inputs, and keep your UI responsive with a few operators.",
    modules: [
      { label: "Streams", slug: "streams" },
      { label: "Reactivity", slug: "reactivity" },
    ],
  },
]

const HOME_QUICK_LINKS = [
  {
    label: "Read the Effect Atom guide",
    description: "Step-by-step concepts straight from the official docs.",
    href: "https://effect.website/docs/guides/effect-atom",
    external: true,
  },
  {
    label: "Download code snippets",
    description: "Grab the example sources to tweak in your editor.",
    href: "http://github.com/lifeiscontent/effect-atom-tutorial",
    external: true,
  },
  {
    label: "Report an issue",
    description: "Let us know if a tutorial needs clarification or fixes.",
    href: "http://github.com/lifeiscontent/effect-atom-tutorial/issues",
    external: true,
  },
] as const

function modulePath(slug?: string) {
  return slug ? `/modules/${slug}` : "/"
}

export default function Component() {
  return (
    <div className="home">
      <Hero />
      <ModuleShowcase />
      <section className="home-section home-section--tracks" aria-labelledby="tracks-heading">
        <div className="section-heading">
          <span className="section-eyebrow">Suggested paths</span>
          <h2 id="tracks-heading">Cover the topics you need right now</h2>
          <p>
            Follow one of these quick paths to focus on fundamentals, async orchestration, or larger
            application data flows.
          </p>
        </div>
        <div className="track-grid">
          {HOME_TRACKS.map((track) => (
            <article key={track.title} className="track-card">
              <span className="track-card__icon" aria-hidden="true">
                {track.icon}
              </span>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <div className="track-card__modules">
                <span className="track-card__modules-label">Modules:</span>
                {track.modules.map((module) => (
                  <Link
                    key={module.label}
                    to={modulePath(module.slug)}
                    className="badge badge--link"
                  >
                    {module.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section--resources" aria-labelledby="resources-heading">
        <div className="section-heading">
          <span className="section-eyebrow">More references</span>
          <h2 id="resources-heading">Helpful links while you learn</h2>
          <p>
            Jump to the official Effect documentation, playground, and repositories whenever you
            want extra context or code samples.
          </p>
        </div>
        <div className="support-grid">
          {HOME_RESOURCES.map((resource) => (
            <article key={resource.title} className="support-card">
              <span className="support-card__icon" aria-hidden="true">
                {resource.icon}
              </span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.href} target="_blank" rel="noreferrer">
                {resource.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section home-section--highlights"
        aria-labelledby="highlights-heading"
      >
        <div className="section-heading">
          <span className="section-eyebrow">Pattern spotlights</span>
          <h2 id="highlights-heading">Quick takeaways from the examples</h2>
          <p>
            Each highlight points to a module pairing that demonstrates a reusable technique you can
            adapt in your own Effect experiments.
          </p>
        </div>
        <div className="highlight-grid">
          {HOME_HIGHLIGHTS.map((highlight) => (
            <article key={highlight.title} className="highlight-card">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
              <div
                className="highlight-card__modules"
                aria-label={`Modules for ${highlight.title}`}
              >
                {highlight.modules.map((module) => (
                  <Link
                    key={module.label}
                    to={modulePath(module.slug)}
                    className="badge badge--link"
                  >
                    {module.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SupportCTA />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__content">
        <span className="badge badge--accent">Free tutorial series</span>
        <h1 id="hero-heading">Learn effect-atom by example</h1>
        <p className="hero__copy">
          Walk through practical snippets that introduce atoms, derived data, effects, and
          integrations. Each tutorial is concise, runnable, and ready to drop into your own
          experiments.
        </p>
        <div className="hero__actions">
          <Link to={modulePath("counter")} className="btn btn--primary">
            Start the guided tour
          </Link>
          <a
            className="btn btn--ghost"
            href="https://effect.website/docs"
            target="_blank"
            rel="noreferrer"
          >
            Read the docs
          </a>
        </div>
        <dl className="hero__stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
              <span>{stat.description}</span>
            </div>
          ))}
        </dl>
      </div>
      <div className="hero__media" aria-hidden="true">
        <div className="hero__card hero__card--primary">
          <span>Open the live demo</span>
          <p>Run each tutorial’s Effect example right in your browser with zero setup.</p>
        </div>
        <div className="hero__card hero__card--secondary">
          <span>Reuse the snippet</span>
          <p>Copy the code into your project or sandbox to see how it fits your workflow.</p>
        </div>
      </div>
    </section>
  )
}

function ModuleShowcase() {
  return (
    <section className="module-showcase" aria-label="Tutorial modules">
      <div className="section-heading module-showcase__heading">
        <span className="section-eyebrow">Choose a tutorial</span>
        <h2>Pick a module and explore the live demos</h2>
        <p>
          Every tutorial includes an overview, inline notes, and Effect code you can copy straight
          into your project.
        </p>
      </div>
      <div className="module-grid">
        {MODULES.map((module, index) => (
          <NavLink
            key={module.slug}
            to={modulePath(module.slug)}
            className={({ isActive }: { isActive: boolean }) =>
              `module-card${isActive ? " is-active" : ""}`
            }
          >
            <span className="module-card__index">{String(index + 1).padStart(2, "0")}</span>
            <div className="module-card__body">
              <span className="module-card__name">{module.name}</span>
              <span className="module-card__meta">{module.meta}</span>
            </div>
            <span className="module-card__cta">Open module</span>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function SupportCTA() {
  return (
    <section className="cta-panel" aria-labelledby="cta-heading">
      <div className="cta-panel__content">
        <span className="section-eyebrow">Keep exploring</span>
        <h2 id="cta-heading">Go further with effect-atom</h2>
        <p>
          Use these links to dig into the official documentation, download runnable sources, or
          share feedback with the Effect team.
        </p>
      </div>
      <div className="cta-panel__links">
        {HOME_QUICK_LINKS.map((item) =>
          item.external ? (
            <a
              key={item.label}
              className="cta-panel__link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>{item.label}</span>
              <p>{item.description}</p>
            </a>
          ) : (
            <Link key={item.label} className="cta-panel__link" to={item.href}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          )
        )}
      </div>
    </section>
  )
}
