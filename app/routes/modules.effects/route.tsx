import { EffectsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("effects")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="effects-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Async orchestration</span>
        <h2 id="effects-module-heading">
          Effectful atoms: wrestle with async outcomes before the reveal
        </h2>
        <p>
          Your brain will retain more if it struggles first. Before reading the solution panels,
          tackle the warm-up scenario and commit your assumptions about sequencing, error handling,
          and UI states to paper.
        </p>
        <ol className="module-intro__steps">
          <li>
            Sketch an async workflow atom that stages loading, success, and failure without promise
            juggling.
          </li>
          <li>Delay reading the hints until you hit a wall or want to validate a choice.</li>
          <li>
            Bring your notes to the guided debrief so you can compare each decision with the
            canonical Effect implementation.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          You need an atom that kicks off an asynchronous job, exposes Result-based states to React,
          and composes a secondary atom once the first settles. Without peeking below, outline how
          you would stage that workflow.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Draft a minimal Effect atom that reports loading, success, and failure. Mark where the
            Result transitions live in your UI.
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Decide how you would compose a second atom inside the workflow. What clues prove the
            dependency settled before continuing?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how you surface failures. Will you throw errors, return Option.none, or expose a
            Result? Justify the trade-offs.
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Walk through the canonical implementation and annotate the differences. Pay attention to
          where the runtime guarantees ordering, how errors propagate, and why React never touches a
          raw promise.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <EffectsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Annotate the contrast between this solution and your draft. Did you try to juggle promises
          manually? Did you account for how
          <code>Result</code> keeps failure data structured? Capture those reflections because they
          are the hooks your memory will use later.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect this lesson back to the counter and derived-state modules. How would you combine
          deterministic counters with async Result streams? Forecast where these patterns will
          reappear (HTTP fetching, RPC mutations, streams) so retrieval feels natural when you
          encounter them again.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Explain the concept in your own words, then store the notes somewhere you will revisit
          (personal journal, knowledge base, team doc). Use these prompts to guide the reflection:
        </p>
        <ul>
          <li>
            Why does wrapping asynchronous logic in <code>Atom.make</code> simplify React components
            compared to raw promises?
          </li>
          <li>
            How does <code>Atom.Context</code> ensure dependent workflows stay in sync, and what
            surprised you during the warm-up?
          </li>
          <li>
            Which part of your original hypothesis changed after comparing it to the guided
            solution, and why?
          </li>
        </ul>
        <p className="module-inline-note">
          Schedule a reminder to reread this reflection during next week’s retrieval mission so the
          lessons remain vivid.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild the baseline atom without peeking. Add logging to confirm the Result
            transitions you expect.
          </li>
          <li>
            In three days: create a contextual Effect atom that fans out to two dependencies and
            reconciles their Results before returning.
          </li>
          <li>
            One week later: wire this pattern into the HTTP module. Wrap a fetch call, propagate
            failures via <code>Result</code>, and note how React stays declarative.
          </li>
        </ul>
      </section>
    </section>
  )
}
