import { ScopedEffectsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("scoped-effects")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="scoped-effects-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Lifecycle control</span>
        <h2 id="scoped-effects-module-heading">
          Scoped effects: predict the cleanup before seeing it
        </h2>
        <p>
          Before inspecting the implementation, outline how you expect scoped atoms to start,
          settle, and tear down resources. The friction you feel while sketching will make the real
          flow unforgettable.
        </p>
        <ol className="module-intro__steps">
          <li>
            Write down how a scoped atom should acquire a resource, expose loading/success/failure,
            and release it.
          </li>
          <li>
            Decide where <code>Effect.addFinalizer</code> belongs and how React should learn about
            lifecycle changes.
          </li>
          <li>
            Only after drafting your plan should you inspect the panels below. Note every mismatch
            between your idea and the running example.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          In a notebook or scratch file, answer the prompts before looking at the code. Even guesses
          that later prove wrong are valuable when you reconcile them during the debrief.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            How would you structure an atom so it allocates a resource, reports progress through a{" "}
            <code>Result</code>, and guarantees cleanup?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            When should finalisers run? Which events should trigger them, and how will you confirm
            they executed?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how React components should re-render across loading, success, and teardown.
            Which screens or logs will verify that?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Compare the reference implementation to your warm-up sketch. Study where finalisers are
          registered, how <code>Result.match</code> drives the UI, and when cleanup occurs.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <ScopedEffectsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Highlight where your plan matched the code and where it missed. Capture those differences
          in your notes so they become retrieval cues later.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect scoped atoms to previous modules. How does the counter example help you reason
          about lifecycle boundaries? Where might HTTP or stream modules benefit from scoped
          resources? Speak the connections aloud to reinforce them.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short reflection in your own journal or team knowledge base. Prompts: What
          guarantees do scopes provide? How does <code>Result.match</code> keep lifecycle status
          declarative? Which assumption from your warm-up changed after the debrief?
        </p>
        <p className="module-inline-note">
          Set a reminder to reread this reflection in a few days because your retrieval mission
          depends on those notes.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild this scoped atom without reference code, confirming the finaliser
            fires when you expect.
          </li>
          <li>
            In three days: refactor a real component to manage subscriptions or timers via a scoped
            atom, documenting what manual cleanup you eliminated.
          </li>
          <li>
            One week later: combine scoped atoms with streaming or HTTP modules, noting how
            lifecycle control simplifies resource management.
          </li>
        </ul>
      </section>
    </section>
  )
}
