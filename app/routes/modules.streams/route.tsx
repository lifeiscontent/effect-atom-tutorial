import { StreamsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("streams")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="streams-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Reactive pipelines</span>
        <h2 id="streams-module-heading">
          Streaming atoms: struggle with cadence and backpressure first
        </h2>
        <p>
          Resist the temptation to jump straight to the working example. Sketch how a continuous
          ticker and a pull-driven paginator would behave, then use that draft to interrogate the
          implementation below.
        </p>
        <ol className="module-intro__steps">
          <li>
            Outline how a continuous stream should pause when unsubscribed and resume when listeners
            return.
          </li>
          <li>
            Design a pull-based stream that accumulates items and exposes a loading indicator
            between pulls.
          </li>
          <li>
            Only after capturing your plan should you inspect the reference solution and compare
            decisions.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          In a notebook or scratch file, answer the prompts before looking at the panels. The more
          concrete your draft, the stickier the concepts will be afterward.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Describe the minimal ticker atom. Which schedule will you use? When should the stream
            start, stop, and resume?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Plan the pull-based stream. How will you represent accumulated items and a waiting state
            after each pull?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how React components should re-render when new chunks arrive. Which components
            remain stable?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Run your prototype first, then compare it with the reference below. Pay close attention to
          how continuous streams pause when unsubscribed and how pull-driven streams expose
          backpressure.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <StreamsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Annotate the differences between this implementation and your warm-up notes. Those deltas
          are the retrieval cues you should revisit during spaced practice.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect streaming atoms to earlier lessons. How does the counter module help you reason
          about ticker updates? Where might derived atoms consume streaming data? Saying the links
          out loud strengthens the retrieval path.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short reflection in your learning journal or team knowledge base. Consider: What
          guarantees do Effect streams provide? How does
          <code>Result.match</code> keep rendering declarative? Which part of your warm-up draft
          changed after examining the solution?
        </p>
        <p className="module-inline-note">
          Set a reminder to reread this reflection in a few days so the insights remain top of mind.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild the ticker and pull-stream atoms from scratch, verifying your
            understanding of pauses and resumes.
          </li>
          <li>
            In three days: refactor an existing polling feature to use Effect streams, noting the
            differences in behaviour and complexity.
          </li>
          <li>
            One week later: combine this streaming pattern with the HTTP module to batch remote
            requests on demand, documenting the flow in your journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
