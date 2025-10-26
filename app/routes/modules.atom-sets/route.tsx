import { AtomSetsExample } from "./example"
import exampleSource from "./example.tsx?raw"
import { createModuleHandle } from "../../module-manifest"
import { ModuleCodeBlock } from "../../components/module-code-block"
import { ModulePreviewBlock } from "../../components/module-preview-block"

export const handle = createModuleHandle("atom-sets")

export default function Component() {
  return (
    <section className="module-section" aria-labelledby="atom-sets-module-heading">
      <header className="module-intro">
        <span className="module-eyebrow">Collections & caches</span>
        <h2 id="atom-sets-module-heading">
          Atom families keep local registries coherent across keys
        </h2>
        <p>
          Imagine your app ships with a library of operational playbooks stored locally or behind a
          feature flag. Before diving into the reference, jot down how you would use{" "}
          <code>Atom.family</code>
          to hand those playbooks to any screen that supplies an id.
        </p>
        <ol className="module-intro__steps">
          <li>Sketch a service that hands out read-only playbooks from a shared registry.</li>
          <li>
            Decide how <code>Atom.family</code> should memoise atoms so repeated ids reuse cached
            reads.
          </li>
          <li>Predict what happens when the roster reorders, duplicates, or drops keys.</li>
        </ol>
      </header>

      <article className="module-guide">
        <h3>Why this family stays node-local</h3>
        <p>
          Imagine <code>Atom.family</code> wrapping static or rarely changing reference data such as
          brand palettes, operational procedures, consent copy, or onboarding checklists. Members are
          keyed, deterministic, and fetched from local registries or configuration layers instead of
          the network.
        </p>
        <p>
          Because families keep results in memory for the lifetime of the process (and offer no
          built-in eviction), they are a poor match for fast-changing feeds or per-request cache
          busting. Reach for derived atoms, subscription refs, or explicit loaders when freshness is
          critical.
        </p>
        <p>
          Decide whether to wrap the family in <code>Atom.keepAlive</code> based on ownership:
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="open book">
              📖
            </span>{" "}
            Shared UI chrome wants instant access to static copy? Keep the family alive so every tab
            renders synchronously.
          </li>
          <li>
            <span role="img" aria-label="sparkles">
              ✨
            </span>{" "}
            Feature-specific components only touch a few ids? Let family members dispose normally so
            you avoid keeping unused atoms around.
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Warm-up challenge</h3>
        <p>
          Capture your current intuition in a notebook or scratch file. The comparison with the
          reference implementation is where the real learning happens.
        </p>
        <ul className="module-emoji-guide">
          <li>
            <span role="img" aria-label="ladder">
              🪜
            </span>{" "}
            Design a service that exposes playbooks by id without hitting the network. Which
            dependencies stay shared across keys?
          </li>
          <li>
            <span role="img" aria-label="compass">
              🧭
            </span>{" "}
            Outline how <code>Atom.family</code> should behave when keys repeat, disappear, or
            shuffle. Where will cached state live?
          </li>
          <li>
            <span role="img" aria-label="brain">
              🧠
            </span>{" "}
            Predict the rendering flow: which components re-render when a playbook hydrates, and how
            will you surface loading or error states?
          </li>
        </ul>
      </article>

      <article className="module-guide">
        <h3>Reference implementation</h3>
        <p>
          Compare your notes with the finished example. Look for how the runtime layers the playbook
          service, how <code>Atom.family</code> returns a canonical atom per id, and how{" "}
          <code>Result.match</code>
          presents loading, error, and success states.
        </p>
        <p>
          Use the interactive controls to rotate the roster, toggle a duplicate id, or reset the
          list. Watch your browser console: only the keys that actually need data will call the{" "}
          <code>Playbooks.load</code> service, confirming your predictions from the warm-up prompts.
        </p>
        <div className="module-stack">
          <ModulePreviewBlock description="Interactive surface rendered from the reference implementation">
            <AtomSetsExample />
          </ModulePreviewBlock>
          <ModuleCodeBlock code={exampleSource} filename="example.tsx" />
        </div>
        <p>
          Where did your plan align with the code? Where did it diverge? Record those differences so
          they become fast recall cues during spaced practice.
        </p>
      </article>

      <article className="module-guide">
        <h3>Interleaving reflection</h3>
        <p>
          Link atom families back to previous lessons. How do counters, derived state, or services
          interact with per-key atoms? How might RPC or HTTP modules plug into the same pattern?
          Speaking these connections aloud strengthens the memory.
        </p>
      </article>

      <section className="module-guide">
        <h3>Elaboration + feedback</h3>
        <p>
          Add a short reflection to your learning journal or team knowledge base. Prompts: What
          advantages do families give you over array-based state? How do runtimes keep dependencies
          aligned? Which incorrect assumption from the warm-up taught you the most?
        </p>
        <p className="module-inline-note">
          Schedule a reminder to reread this reflection during your next spaced session because the
          retrieval mission depends on it.
        </p>
      </section>

      <section className="module-guide">
        <h3>Retrieval mission</h3>
        <ul>
          <li>
            Same day: rebuild a smaller family (two keys) from memory, ensuring cached state
            persists across reorders.
          </li>
          <li>
            In three days: refactor an existing list in your project to use <code>Atom.family</code>
            , capturing what manual bookkeeping disappears.
          </li>
          <li>
            One week later: combine atom families with a remote data source or mutation workflow,
            documenting the experience in your journal.
          </li>
        </ul>
      </section>
    </section>
  )
}
