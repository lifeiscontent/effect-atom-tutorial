import { Atom, useAtomValue } from "@effect-atom/atom-react"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

const LONG_FORM_PARAGRAPHS = [
  "Scroll to watch the atom publish updated scroll positions in real time.",
  "Effect handles cleanup automatically, so reloading or navigating away never leaves dangling listeners.",
  "Pair this pattern with throttling or filtering atoms to build complex viewport-aware experiences.",
  "Because the atom emits values, components can subscribe from anywhere in your tree.",
  "Keep atoms focused: one atom per interaction pattern keeps logic composable.",
] as const

const scrollYAtom = Atom.make((get) => {
  // Guard against SSR by falling back to a neutral value when window is missing.
  if (typeof window === "undefined") {
    return 0
  }

  const handleScroll = () => {
    // Picture piping this into a sticky header that shrinks after 120px or a floating "Back to top" CTA.
    // Every scroll event pushes the latest position into the atom so subscribers redraw.
    get.setSelf(window.scrollY)
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  // Let the finaliser remove the listener the moment the last subscriber unsubscribes.
  get.addFinalizer(() => window.removeEventListener("scroll", handleScroll))

  return window.scrollY
})

export function EventListenerExample() {
  const scrollY = useAtomValue(scrollYAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="event-listener"
        eyebrow="DOM integration"
        title="Bridge DOM events into Effect without leaking listeners"
      >
        <p className="module-inline-note">
          Compare this reference with the prompts from the warm-up: registration, streaming updates,
          and automatic cleanup all surface exactly as you predicted if your notes matched the
          module outcomes.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Live scroll position</h3>
        <p>
          Scroll the page and confirm that the atom updates exactly as your lifecycle notes
          predicted. Pay attention to how the value pauses when you open a different module and
          resumes when you return.
        </p>
        <div className="module-metrics">
          <div>
            <span className="module-metric-label">scrollY (px)</span>
            <span className="module-metric-value">{Math.round(scrollY)}</span>
          </div>
        </div>
      </article>

      <div className="module-scroll-panel" aria-hidden="true">
        {LONG_FORM_PARAGRAPHS.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <p className="module-inline-note">
        Navigate away, then return. The console should log teardown and re-registration, confirming
        the finaliser outcome you wrote down during the warm-up.
      </p>
    </div>
  )
}
