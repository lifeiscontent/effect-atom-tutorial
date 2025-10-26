import { HttpApiIntegrationExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("http-api-integration")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="http-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">HTTP clients</span>
        <h2 id="http-module-heading">
          HTTP API integration: blueprint the pipeline before reading the answer
        </h2>
        <p>
          Instead of diving straight into the reference implementation, sketch how you would fetch,
          validate, and render remote data with Effect. The struggle will make the real pipeline
          stick.
        </p>
        <ol className="module-intro__steps">
          <li>
            Draft an HTTP workflow that fetches JSON, validates it, and exposes the result to React
            without leaking promises.
          </li>
          <li>
            Outline how you will model loading, success, and failure before opening the solution.
          </li>
          <li>
            Use the emoji hints only after you have a concrete (even if flawed) plan written down.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          You need a query atom that uses Effect’s HttpClient, validates the payload with schemas,
          and hands React a Result. Grab a notebook or scratch file and answer these prompts before
          looking below:
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            How will you provide the HttpClient layer to the atom runtime? Diagram the dependency
            wiring.
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Where does schema validation occur, and how will you represent validation failures back
            in React?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how multiple queries should behave when one fails. Does the failure of one atom
            impact the others?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Walk through the canonical implementation line by line. Check how the pipeline uses
          layers, schemas, and <code>Result.match</code> to confirm or challenge your assumptions.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <HttpApiIntegrationExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Highlight where your draft differed: Did you forget to filter non-2xx statuses? Did you
          plan to parse JSON manually? Capture those deltas so you can revisit them when spaced
          repetition kicks in.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect this lesson to previous modules. How does the counter example help you reason
          about loading state? How will derived atoms consume this remote data? Saying the
          connections out loud reinforces the mental model before you move on.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short debrief in a personal knowledge base or team doc. Use prompts like: What
          guarantees do schemas add to your React code? How does
          <code>Result.match</code> keep rendering declarative? What still feels fuzzy? These
          written reflections become your map during later retrieval sessions.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild a minimal fetch/validate/render atom without the reference code. Log
            any steps that felt shaky.
          </li>
          <li>
            In three days: refactor an existing network call in your project to use Effect’s
            HttpClient + schemas, recording before/after notes.
          </li>
          <li>
            One week later: extend this workshop example with error-specific messaging or retry
            logic, describing the new flow in your learning journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
