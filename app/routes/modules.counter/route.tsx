import { CounterExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("counter")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="counter-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Synchronous state</span>
        <h2 id="counter-module-heading">Counter: test your intuition before the walkthrough</h2>
        <p>
          Before you read the solution, tackle the warm-up below. Your brain will latch onto the
          right model faster if it struggles first, then compares its guess with the canonical
          Effect approach.
        </p>
        <ol className="module-intro__steps">
          <li>Attempt the warm-up challenge with no more than three minutes of prep.</li>
          <li>Lean on the emoji hints only after you have written down a hypothesis.</li>
          <li>
            Return for the guided debrief and interleaving reflection once you have a working (or
            failing!) attempt.
          </li>
        </ol>
      </header>

      <div className="module-body">
        <article className="module-guide">
          <h3>Warm-up challenge</h3>
          <p>
            Build a counter that persists between remounts, but keep the exercise scrappy: open a
            scratch file or notebook, outline the moving pieces, and commit to an initial attempt
            before touching the reference code.
          </p>
          <ul className="module-emoji-guide">
            <li>
              <span role="img" aria-label="ladder">
                🪜
              </span>{" "}
              Draft the smallest possible atom: choose an initial value, decide whether it should
              keep alive, and write down the reasoning.
            </li>
            <li>
              <span role="img" aria-label="compass">
                🧭
              </span>{" "}
              Sketch the read/update path. Note which hook you will call in the view layer and how
              the setter receives the previous value.
            </li>
            <li>
              <span role="img" aria-label="brain">
                🧠
              </span>{" "}
              Predict which components should re-render on increment and which should remain stable.
              Record that guess so you can verify it.
            </li>
          </ul>
        </article>

        <article className="module-guide">
          <h3>Reference implementation</h3>
          <p>
            The atom stores the count and stays warm thanks to <code>Atom.keepAlive</code>. To
            witness it, navigate to another module and then return here; the counter should retain
            its value, confirming the keep-alive contract. Reading the value happens through{" "}
            <code>useAtomValue</code>; updates flow through <code>useAtomSet</code>, which always
            supplies the latest state. Because Effect serialises updates, you avoid stale closures
            without extra guards.
          </p>
          <div className="module-stack">
            <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
              <CounterExample />
            </ModulePreviewBlock>
            <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
          </div>
          <p>
            Compare this flow with your attempt. Where did you converge? Where did you diverge?
            Capture the mismatches because those are the concepts that will stick once you reconcile
            them.
          </p>
        </article>

        <article className="module-guide">
          <h3>Interleaving reflection</h3>
          <p>
            As you move on to derived state, keep this mental model handy. The counter atom will
            become the upstream signal for transformations in the upcoming module, so articulate how
            setters and subscribers worked here before you interleave the next exercise.
          </p>
        </article>

        <section className="module-guide">
          <h3>Elaboration + feedback</h3>
          <p>
            Summarise the experience in your own words, then add your notes to a learning journal
            (paper, Notes.app, Notion, or whatever you actually revisit). Treat it as a reflection
            checklist:
          </p>
          <ul>
            <li>
              How did <code>Atom.keepAlive</code> shift your expectations about unmounting
              components?
            </li>
            <li>
              When would you choose <code>useAtomValue</code> over <code>useAtom</code> elsewhere in
              the UI?
            </li>
            <li>
              What surprised you while reconciling your warm-up attempt with the guided solution?
            </li>
          </ul>
          <p className="module-inline-note">
            Capture the answers somewhere you control (journal, team doc, private repo) so you can
            revisit them during spaced retrieval.
          </p>
        </section>

        <section className="module-guide">
          <h3>Retrieval mission</h3>
          <ul>
            <li>
              Same day: rebuild this counter from scratch without referencing the code. Time-box to
              five minutes.
            </li>
            <li>
              One week later: extend the counter with a decrement button and note how Effect handles
              simultaneous updates.
            </li>
            <li>
              Optional stretch: integrate the counter into the derived state lesson and describe the
              new dataflow aloud.
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}
