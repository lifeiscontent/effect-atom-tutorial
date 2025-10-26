import { RpcIntegrationExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("rpc-integration")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="rpc-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Typed RPC</span>
        <h2 id="rpc-module-heading">
          RPC integration: predict the contract before you see the code
        </h2>
        <p>
          Before examining the implementation, design how you would declare RPC contracts, set up an
          in-memory protocol, and bridge it into atoms. The anticipation makes the final walkthrough
          far more memorable. While sketching, annotate which pieces should live on the server
          boundary versus the browser client. The demo keeps them co-located for inspection, whereas
          production code hosts the protocol outside the UI bundle.
        </p>
        <ol className="module-intro__steps">
          <li>
            Draft the RPC contract: what queries and mutations exist, and what do their
            payloads/results look like?
          </li>
          <li>
            Plan how <code>AtomRpc.Tag</code> should expose typed atoms for queries and mutations,
            including reactivity keys.
          </li>
          <li>
            Decide how the UI will render loading, success, and failure states using{" "}
            <code>Result</code>. Write it down before you peek at the code.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Spend five focused minutes sketching your approach. Answer the prompts below in a notebook
          or scratch file before reviewing the panels. Captured guesses make the comparison far more
          effective.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Define the RPC surface. Which operations exist, and how will you represent payloads,
            successes, and errors with schemas?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Decide how queries and mutations should share a runtime. How will you model reactivity
            keys to invalidate caches precisely?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict the UI flow: what happens when the query loads, when a mutation fails, or when
            reactivity invalidates the list? Log your guesses.
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Compare your sketch to the canonical implementation. Focus on how RPC schemas translate
          into typed atoms, how reactivity keys keep data fresh, and how
          <code>Result</code> drives rendering.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <RpcIntegrationExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p className="module-inline-note">
          Demo scaffolding callout: <code>TodoHandlersLayer</code> plays the role of the server in
          memory, and <code>RpcTest.makeClient</code> bypasses the network so the example can run in
          the browser. Swap those pieces for your real transport and backend deployment to apply the
          pattern in production.
        </p>
        <p>
          Highlight where reality matched your expectations and where it diverged. Those annotated
          differences become high-yield study material during spaced retrieval.
        </p>
      </article>

      <section className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect this pattern to earlier modules. How do services, reactivity, or HTTP integration
          interact with RPC-driven workflows? Speaking these connections aloud reinforces the mental
          model before you move on.
        </p>
      </section>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Log a reflection in your learning journal or team documentation. Prompts: How do RPC
          schemas improve UI safety? What did reactivity keys buy you? Which part of your warm-up
          draft needed correction?
        </p>
        <p className="module-inline-note">
          Set a reminder to revisit this reflection soon because the retrieval mission relies on
          those notes.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild the query + mutation flow without reference code, ensuring reactivity
            keys invalidate the list.
          </li>
          <li>
            In three days: adapt an existing feature to use <code>AtomRpc</code>, documenting how
            typed contracts and reactivity simplified the flow.
          </li>
          <li>
            One week later: swap the in-memory protocol for a real backend layer, recording the
            changes in your learning journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
