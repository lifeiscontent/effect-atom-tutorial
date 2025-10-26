import { LocalStorageExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("local-storage")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="local-storage-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Persistence</span>
        <h2 id="local-storage-module-heading">
          Local storage: draft the persistence plan before the reveal
        </h2>
        <p>
          Before you peek at the implementation, sketch how you would hydrate, persist, and validate
          state with <code>Atom.kvs</code>. The more concrete your draft, the easier it will be to
          encode the real solution into memory.
        </p>
        <ol className="module-intro__steps">
          <li>
            Outline the runtime wiring: which layer provides access to localStorage and how do atoms
            share it?
          </li>
          <li>
            Decide which schemas you will apply to booleans, strings, and numbers, and where default
            values live.
          </li>
          <li>
            Plan the React integration: which hooks read and write data, and how do you verify
            persistence across reloads? Capture your answers before scrolling down.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          In a notebook or scratch file, answer the prompts below. Keep the notes handy because you
          will cross-check them against the reference implementation immediately after.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Describe how to initialise a key/value runtime that multiple atoms can share. What
            guarantees does that runtime provide?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Decide how you will validate stored values and recover from corrupted entries. Which
            schemas cover each use case?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict the UX when the page reloads. Which components should re-render? What happens if
            storage is empty or malformed?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Walk through the canonical code. Pay attention to how the runtime wiring, schemas, and
          default values cooperate to keep React oblivious to localStorage quirks.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <LocalStorageExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Where did your plan align with the code? Where did it diverge? Capture those insights in
          your notes because you will revisit them during spaced retrieval.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Tie persistence back to previous modules. How does the counter example influence your
          approach here? How will derived atoms or effectful workflows benefit from persisted state?
          Saying these connections aloud cements the mental model.
        </p>
      </article>

      <section className="module-guide part-elaboration">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short reflection in your own notes (journal, knowledge base, team wiki). Consider:
          What guarantees do schemas give you? How does <code>Atom.kvs</code> simplify React
          components? Which part of your warm-up draft changed after the comparison?
        </p>
        <p className="module-inline-note">
          Schedule a reminder to reread this reflection within a week because the follow-up
          retrieval mission depends on it.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild one of the persisted atoms from memory, verifying hydration and
            default values.
          </li>
          <li>
            In three days: refactor a small piece of your app (feature flag, preference, draft
            input) to use <code>Atom.kvs</code>, recording before/after notes.
          </li>
          <li>
            One week later: revisit this module and extend it with schema upgrades or migration
            logic, documenting the changes in your learning journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
