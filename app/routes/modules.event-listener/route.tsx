import { EventListenerExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("event-listener")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="event-listener-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">DOM bridges</span>
        <h2 id="event-listener-module-heading">
          Event listeners: sketch the bridge before wiring it in code
        </h2>
        <p>
          Before diving into the reference implementation, draft the lifecycle of a DOM event
          listener hosted inside an atom. The exercise will make the real implementation click.
        </p>
        <ol className="module-intro__steps">
          <li>
            Outline how the atom should register a listener, stream updates, and clean up when
            unused.
          </li>
          <li>
            Decide how React components should read those updates without manual effect hooks.
          </li>
          <li>
            Only after you capture that plan should you inspect the code below. Compare every
            decision to your notes and annotate mismatches.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Grab a notebook or scratch file. Answer the prompts before inspecting the reference
          implementation. Your notes become the comparison point during reconciliation.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Describe how to create an atom that wraps <code>addEventListener</code>. Where will you
            push event data into the atom?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Plan how cleanup should work. When does the atom unregister the listener, and how can
            you verify it happened?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how React components should respond to the event stream. Which components
            re-render? How will you test that?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Scroll the page and compare what you observe with the lifecycle you sketched. Check the
          console to confirm your expectations about listener setup and teardown.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <EventListenerExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Log every difference between your draft and this implementation. Those annotations become
          the retrieval cues you will revisit later.
        </p>
      </article>

      <section className="module-guide">
        <h3>Inside the listener atom</h3>
        <pre>
          {`import { Atom } from "@effect-atom/atom-react"

const scrollYAtom = Atom.make((get) => {
  if (typeof window === "undefined") {
    return 0
  }

  const handleScroll = () => {
    get.setSelf(window.scrollY)
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  get.addFinalizer(() => window.removeEventListener("scroll", handleScroll))

  return window.scrollY
})`}
        </pre>
        <p>
          Compare this code to your warm-up draft. Did you account for SSR? Did you handle cleanup
          the same way? Capture each difference in your notes so you can revisit it during
          retrieval.
        </p>
      </section>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect this pattern to previous modules. How could counters, derived state, or services
          broadcast DOM-derived data? Speaking those links aloud keeps the concept ready when it
          resurfaces.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short reflection in your journal or team knowledge base. Prompts: How does
          wrapping listeners in atoms simplify React components? What guarantees does{" "}
          <code>get.addFinalizer</code> give you? Which assumption from the warm-up changed after
          seeing the reference code?
        </p>
        <p className="module-inline-note">
          Set a reminder to reread this reflection in a few days because your spaced retrieval
          session depends on it.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild the scroll listener atom without reference code, confirming cleanup
            happens when expected.
          </li>
          <li>
            In three days: refactor an existing DOM listener in your project to use an atom, noting
            which manual cleanup code disappears.
          </li>
          <li>
            One week later: extend this pattern with throttling or derived atoms, documenting the
            flow in your learning journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
