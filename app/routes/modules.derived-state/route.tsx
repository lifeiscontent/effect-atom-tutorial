import { DerivedStateExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("derived-state")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="derived-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Computed views</span>
        <h2 id="derived-module-heading">
          Derived state: challenge your mental model before the reveal
        </h2>
        <p>
          Pause here and sketch your own derivations. A few minutes of productive struggle will make
          the differences between contextual and mapped atoms stick once you compare them with the
          reference implementation.
        </p>
        <ol className="module-intro__steps">
          <li>
            Spend three focused minutes outlining double and triple derivations using Effect atoms.
          </li>
          <li>
            Consult the emoji hints only after you hit an impasse or want to validate a hunch.
          </li>
          <li>Bring your notes into the debrief so you can compare assumptions line by line.</li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Starting from your counter atom (reuse the previous lesson), design one derivation that
          needs full context access and another that survives as a pure projection. Keep your
          initial attempt private for now because you will compare it to the reference shortly.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Draft a contextual derivation that doubles the count. Where does the upstream value come
            from and how is it cached?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Identify a scenario where a pure <code>Atom.map</code> suffices. What guarantees
            disappear without <code>get</code> access?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict Effect’s dependency tracking. Which derivations should rerun when the base
            counter increments?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          The contextual derivation uses <code>{"Atom.make((get) => ...)"}</code> so it can
          orchestrate multiple dependencies, branch, or memoise work. The pure projection remains a
          simple <code>{"Atom.map(...)"}</code>. Compare each decision with your notes and highlight
          mismatches because they reveal what to reinforce.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <DerivedStateExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Annotate the contrast between this solution and your draft. Did you try to recompute
          everything manually? Did you remember that <code>Atom.map</code> keeps cached projections?
          Capture those reflections because they are the hooks your memory will use later.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Say aloud how the counter module feeds this lesson. Forecast where these derivations will
          plug into async workflows or stream atoms next. Making those links now keeps the concept
          ready when it resurfaces.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Explain the idea in your own words, then capture it somewhere you will revisit (personal
          knowledge base, team doc, handwritten journal). Use the following prompts to structure
          that reflection:
        </p>
        <ul>
          <li>
            When do you favour <code>Atom.make</code> over <code>Atom.map</code> for derived logic?
          </li>
          <li>How does Effect decide which derivations to recompute after an update?</li>
          <li>
            Which assumption from your warm-up attempt changed after reviewing the guided solution?
          </li>
        </ul>
        <p className="module-inline-note">
          Schedule a reminder to reread your notes during next week’s retrieval mission so the
          insights stay fresh.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>Same day: rebuild both derivations from scratch, then add a squaring projection.</li>
          <li>
            In three days: refactor a component to replace duplicated formatting with{" "}
            <code>Atom.map</code>.
          </li>
          <li>
            One week later: revisit this lesson alongside the HTTP module and derive a summary
            metric from fetched data.
          </li>
        </ul>
      </section>
    </section>
  )
}
