import { ReactivityExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("reactivity")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="reactivity-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Reactivity</span>
        <h2 id="reactivity-module-heading">Reactivity keys teach the runtime what to refresh</h2>
        <p>
          Effect Atom caches query results. Reactivity keys let you describe the domain surfaces
          behind those caches so targeted invalidation happens automatically. Use this module to
          practice pairing a tagged query with a mutation that calls out the same keys.
        </p>
        <ol className="module-intro__steps">
          <li>
            Name the data surfaces that must stay fresh and decide on a key scheme (e.g.&nbsp;
            <code>"dashboard:active-tickets"</code>).
          </li>
          <li>
            Decide which mutations change each surface and map them to the corresponding key list.
          </li>
          <li>
            Only after you have a hypothesis should you inspect the reference implementation and
            verify that the runtime refreshes exactly what you expected.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Take a few minutes to draft your own reactivity plan before you read the reference
          solution. Capture it in a notebook or scratch file&mdash;you will contrast it with the
          example shortly.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Outline a query atom that exposes a dashboard metric and annotate it with a reactivity
            key. What domain event does the key represent?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Sketch the mutation that changes that metric. Which keys should it list so only the
            intended subscribers recompute?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict what re-renders when the mutation runs. Which components should update and which
            ones should stay put?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          The interactive example renders two dashboard cards. The first card reads a query tagged
          with
          <code>Atom.withReactivity</code>. The second card is a cached view with no matching key.
          Run the mutation to see how the keyed card updates while the unrelated one stays
          untouched.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <ReactivityExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Compare your draft with the code. Did you choose a similar key scheme? Did you account for
          the unaffected card remaining stable? Note any mismatches&mdash;they are the concepts you
          should reinforce.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Relate this module to earlier lessons. How would a counter, derived state, or stream
          benefit from tagging queries with reactivity keys? Say the connections aloud so the
          relationship sticks when you revisit the concept later.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Summarise the mechanism in your own words. Use the prompts below in your notes or team
          knowledge base:
        </p>
        <ul>
          <li>What makes a good reactivity key in your domain: resource IDs, filters, or roles?</li>
          <li>How does declaring keys on mutations differ from manually resetting caches?</li>
          <li>
            Which part of your warm-up plan changed after you inspected the reference
            implementation?
          </li>
        </ul>
        <p className="module-inline-note">
          Schedule a quick follow-up to revisit these notes during your next retrieval session so
          the mental model stays sharp.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild the tagged query and mutation from memory, confirming that only the
            keyed card re-renders.
          </li>
          <li>
            In three days: add a second key (e.g.&nbsp;
            <code>"dashboard:stale-count"</code>) to a real cache in your codebase and retire a
            manual reset.
          </li>
          <li>
            One week later: apply this pattern in combination with the HTTP or streams module so
            derived data refreshes alongside remote updates.
          </li>
        </ul>
      </section>
    </section>
  )
}
