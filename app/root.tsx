import { useEffect, useMemo, type ReactNode } from "react"
import type { LinksFunction, MetaFunction } from "react-router"
import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from "react-router"
import { Atom, useAtom } from "@effect-atom/atom-react"
import "./styles/App.css"
import "./styles/index.css"
import { MODULES, getModuleFromMatches } from "./module-manifest"

const navDrawerAtom = Atom.make(false)

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { title: "Effect Atom Tutorial" },
]

export const links: LinksFunction = () => [
  { rel: "icon", href: "/vite.svg", type: "image/svg+xml" },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Component() {
  const location = useLocation()
  const [isNavOpen, setNavOpen] = useAtom(navDrawerAtom)

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname, setNavOpen])

  const matches = useMatches()
  const activeModule = useMemo(() => getModuleFromMatches(matches), [matches])
  const isHome = matches[matches.length - 1]?.id === "routes/_index"

  const headerStatusLabel = isHome ? "Learning journey" : "Now viewing"
  const headerStatusValue = isHome
    ? "Choose a module below"
    : (activeModule?.name ?? "Effect Atom Module")

  const navItems = useMemo(
    () => [
      { to: "/", name: "Overview", meta: "Start here" },
      ...MODULES.map((module) => ({
        to: `/modules/${module.slug}`,
        name: module.name,
        meta: module.meta,
      })),
    ],
    []
  )

  return (
    <div className="App">
      <div
        className={`app-sidebar-backdrop ${isNavOpen ? "is-visible" : ""}`}
        aria-hidden={!isNavOpen}
        onClick={() => setNavOpen(false)}
      />
      <div className="app-shell">
        <aside
          className={`app-sidebar ${isNavOpen ? "is-open" : ""}`}
          aria-label="Tutorial navigation"
        >
          <div className="app-sidebar__brand">
            <Link to="/" className="app-sidebar__logo">
              <span>Effect</span>
              <span>Atom Workshop</span>
            </Link>
            <button
              type="button"
              className="app-sidebar__dismiss"
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
            >
              <span />
              <span />
            </button>
          </div>

          <p className="app-sidebar__tagline">
            Browse every free tutorial, open the live examples, and learn effect-atom at your own
            pace.
          </p>

          <nav className="app-nav" id="tutorial-navigation">
            <p className="app-nav__eyebrow">Guided modules</p>
            <ul className="app-nav__list">
              {navItems.map((item, index) => (
                <li className="app-nav__item" key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }: { isActive: boolean }) =>
                      `app-nav__link ${isActive ? "is-active" : ""}`
                    }
                  >
                    <span className="app-nav__progress" aria-hidden="true">
                      <span className="app-nav__progress-indicator">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="app-nav__content">
                      <span className="app-nav__name">{item.name}</span>
                      <span className="app-nav__meta">{item.meta}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="app-sidebar__summary">
            <h3>Support resources</h3>
            <p>Jump to the docs, playground, or community chat whenever you need deeper context.</p>
            <a href="https://effect.website/docs" target="_blank" rel="noreferrer">
              Explore Effect docs
            </a>
            <a href="https://discord.gg/effect-ts" target="_blank" rel="noreferrer">
              Join the Effect community
            </a>
          </div>
        </aside>

        <div className="app-content">
          <header className="site-header">
            <div className="site-header__inner">
              <button
                type="button"
                className="app-nav-toggle"
                aria-expanded={isNavOpen}
                aria-controls="tutorial-navigation"
                onClick={() => setNavOpen((state) => !state)}
              >
                <span className="app-nav-toggle__icon" aria-hidden="true" />
                <span className="app-nav-toggle__label">Browse modules</span>
              </button>

              <Link to="/" className="site-header__brand">
                <span className="badge badge--subtle">Effect</span>
                Atom Workshop
              </Link>

              <nav className="site-header__nav" aria-label="Primary">
                <a href="https://effect.website/docs" target="_blank" rel="noreferrer">
                  Documentation
                </a>
                <a href="https://effect.website/play" target="_blank" rel="noreferrer">
                  Playground
                </a>
                <a href="https://discord.gg/effect-ts" target="_blank" rel="noreferrer">
                  Community
                </a>
              </nav>

              <div className="site-header__status" role="status" aria-live="off">
                <span className="site-header__status-label">{headerStatusLabel}</span>
                <span className="site-header__status-value">{headerStatusValue}</span>
              </div>
            </div>
          </header>

          <main className="page-main" aria-live="polite">
            <Outlet />
          </main>

          <footer className="site-footer">
            <div className="site-footer__inner">
              <div className="site-footer__about">
                <p className="site-footer__brand">Effect Atom Tutorial</p>
                <p className="site-footer__copy">
                  Free, self-paced tutorials that teach effect-atom with concise explanations and
                  runnable samples.
                </p>
              </div>
              <div className="site-footer__links" aria-label="Footer">
                <a href="https://effect.website/docs" target="_blank" rel="noreferrer">
                  Effect docs
                </a>
                <a
                  href="http://github.com/lifeiscontent/effect-atom-tutorial"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a href="https://discord.gg/effect-ts" target="_blank" rel="noreferrer">
                  Join chat
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
