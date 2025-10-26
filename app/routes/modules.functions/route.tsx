import { FunctionsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("functions")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="functions-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Callable atoms</span>
        <h2 id="functions-module-heading">
          Function atoms: prototype commands before reading the answer
        </h2>
        <p>
          Callable atoms often become command surfaces for your application. Before diving into the
          implementation, attempt the warm-up so you can confront the trade-offs yourself, especially
          around where status, errors, and dependencies should live.
        </p>
        <ol className="module-intro__steps">
          <li>Sketch a callable atom that logs a value without handing React a promise.</li>
          <li>Extend the sketch so a companion atom streams status updates into the UI.</li>
          <li>
            Only then consult the emoji hints and reference implementation to compare decisions.
          </li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Without peeking at the panels below, outline how you would build a callable atom that (a)
          logs values and (b) triggers a mutation that reports progress back to React. Capture
          answers to these prompts:
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            How will you expose a callable function to React handlers without returning a promise?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Where should status messages live so multiple components can observe them without prop
            drilling?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            What happens if the workflow fails? Decide how the error propagates and which piece of
            UI should react to it.
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Compare your notes with the canonical approach. Pay special attention to how the runtime
          layer injects services and how status messages hop back into React-friendly atoms.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <FunctionsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Where did your design match this implementation? Where did it diverge? Write down the
          mismatches so you know which pieces to reinforce before moving on.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Connect callable atoms back to the counter and effects lessons. How might you pair a
          command atom with the asynchronous Result patterns from the previous module? How could the
          derived-state lesson benefit from callable atoms that emit updates?
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Explain the story in your own words, then capture it in a place you will revisit (personal
          notes, team documentation, voice memo). Consider these prompts:
        </p>
        <ul>
          <li>
            Why would you prefer <code>Atom.fn</code> over custom hooks or context providers for
            command handlers?
          </li>
          <li>
            How does writing to companion atoms keep React decoupled from Effect runtime details?
          </li>
          <li>
            What part of your warm-up design changed after comparing it to the guided
            implementation?
          </li>
        </ul>
        <p className="module-inline-note">
          Set a follow-up reminder so you revisit this reflection during your next retrieval
          session.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild both callable atoms from scratch. Add a third that performs validation
            before logging.
          </li>
          <li>
            In three days: refactor a production command to use <code>Atom.fn</code>, writing status
            updates into companion atoms so UI components stay declarative.
          </li>
          <li>
            One week later: pair callable atoms with the RPC module, routing mutations through a
            shared runtime and comparing the outcome to your notes.
          </li>
        </ul>
      </section>
    </section>
  )
}
