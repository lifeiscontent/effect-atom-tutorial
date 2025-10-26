import { ServicesLayersExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("services-and-layers")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="services-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Dependency injection</span>
        <h2 id="services-module-heading">
          Services & layers: draft the wiring before inspecting the code
        </h2>
        <p>
          Pause here and design how you would inject a typed service into atoms. The time you spend
          mapping the pieces now will make the actual implementation stick.
        </p>
        <ol className="module-intro__steps">
          <li>
            Sketch a service definition: what methods should the UI call, and what data do they
            return?
          </li>
          <li>
            Draft how <code>Atom.runtime</code> should supply that service to every atom built from
            the runtime.
          </li>
          <li>
            Decide how consumers will render loading, success, and failure states without peeking at
            the reference yet.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Grab a notebook or scratch file and answer the prompts below before reading further.
          Capture your assumptions; they become comparison points during the debrief.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Model a service using <code>Effect.Service</code>. Which methods do you expose, and what
            environment or dependencies will they need?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Outline how to create a runtime with <code>Atom.runtime</code> so every atom shares the
            same layer. How will you swap implementations?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict how the UI should respond to loading or failure states emitted by a{" "}
            <code>Result</code>. What does the component tree look like?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Now compare your notes with the canonical implementation. Pay attention to how the service
          is defined, how the runtime injects it, and how
          <code>Result.match</code> drives rendering.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <ServicesLayersExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Highlight where your plan matched the code and where it diverged. Did you account for
          swapping layers? Did you remember to render failure states with <code>Result.match</code>?
          Record these insights so they become quick wins when you revisit the topic.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect layers back to earlier modules. How might the counter or local-storage examples
          benefit from swap-friendly services? How will RPC or HTTP integrations plug into this
          runtime model? Say the connections aloud to prime your memory.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Write a short reflection in your learning journal or team knowledge base. Prompts: What
          guarantees do layers offer over manual wiring? How does
          <code>Result</code> keep dependency failures explicit? Which assumption from your warm-up
          attempt changed after the debrief?
        </p>
        <p className="module-inline-note">
          Set a reminder to reread this reflection during your next spaced session because the
          upcoming retrieval mission relies on it.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild a minimal service + runtime from memory, ensuring atoms render loading
            and failure states correctly.
          </li>
          <li>
            In three days: refactor an existing feature to use <code>Atom.runtime</code> with
            layered services, documenting how the swap impacts tests or mocks.
          </li>
          <li>
            One week later: extend this pattern to a network-backed service, logging how quickly you
            can swap between live and mock layers.
          </li>
        </ul>
      </section>
    </section>
  )
}
