import { SearchParamsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("search-params")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="search-params-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Shareable state</span>
        <h2 id="search-params-module-heading">
          Search parameters: plan the sync, then test the pipeline
        </h2>
        <p>
          Before reading the solution, draft how you would mirror query parameters into atoms. The
          struggle to articulate that flow will make the final implementation stick.
        </p>
        <ol className="module-intro__steps">
          <li>
            Sketch how a string parameter should sync with the URL, including how you’ll keep empty
            states clear.
          </li>
          <li>
            Outline how you would parse and validate numeric parameters using schemas and Option
            values.
          </li>
          <li>
            Decide how components should read and update these atoms, then compare your plan to the
            panels below, and record the differences you spotted.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Take a few minutes with a notebook or scratch file and answer the prompts before looking
          at the reference implementation. Capturing your initial assumptions gives you something
          concrete to reconcile.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Describe how you would mirror a text query parameter into an atom, including how to
            handle empty strings versus missing values.
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Decide how to validate numeric parameters with schemas. What should happen when parsing
            fails, and how will the UI display that?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how the back/forward buttons and shared links should behave once state lives in
            the URL. Write down edge cases you expect.
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Now compare your notes with the canonical implementation. Watch how text and numeric
          parameters stay in sync with the browser location bar without extra wiring.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <SearchParamsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Note the exact places where your draft differed: Did you plan to manually update history?
          Forget to handle invalid numbers? Capture those discrepancies so you can revisit them
          during spaced retrieval.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Summarise the lesson in your own words. Add the reflection to your learning journal or
          team knowledge base. Prompts: How does syncing state with the URL change your UX
          assumptions? What guarantees do schemas and Option provide? Which part of your warm-up
          surprised you?
        </p>
        <p className="module-inline-note">
          Schedule a reminder to revisit these notes in a few days because the retrieval mission relies
          on them.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: recreate the string parameter example without reference code, verifying your
            understanding of empty vs missing values.
          </li>
          <li>
            In three days: refactor a real component to sync filters or form state through{" "}
            <code>Atom.searchParam</code>, capturing before/after notes.
          </li>
          <li>
            One week later: extend the pattern with multiple parameters or nested routes,
            documenting how navigation behaves in your journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
