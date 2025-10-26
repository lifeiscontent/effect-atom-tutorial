import { Atom, useAtom } from "@effect-atom/atom-react"
import { BrowserKeyValueStore } from "@effect/platform-browser"
import { Schema } from "effect"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Expose a typed localStorage layer once so every atom below shares it.
// Imagine a settings drawer that multiple routes share. This runtime lets every panel read and write the same persisted preferences.
const kvsRuntime = Atom.runtime(BrowserKeyValueStore.layerLocalStorage)

// Persist a boolean toggle with validation baked in; it's perfect for feature flags or “show beta UI” switches that survive reloads.
export const flagAtom = Atom.kvs({
  runtime: kvsRuntime,
  key: "flag",
  schema: Schema.Boolean,
  defaultValue: () => false,
})

// Persist a string preference that normalises empty storage back to an empty string. Think personalisation like “last-used client name.”
export const nameAtom = Atom.kvs({
  runtime: kvsRuntime,
  key: "userName",
  schema: Schema.String,
  defaultValue: () => "",
})

// Persist a numeric counter that survives reloads. It's ideal for tracking onboarding progress or unfinished form steps between sessions.
export const persistentCounterAtom = Atom.kvs({
  runtime: kvsRuntime,
  key: "counter",
  schema: Schema.Number,
  defaultValue: () => 0,
})

export function LocalStorageExample() {
  // Use useAtom to stay inside the kvs schema contract while reading and writing.
  const [flag, setFlag] = useAtom(flagAtom)
  // Hydrate the text input from storage and write any edits back immediately.
  const [name, setName] = useAtom(nameAtom)
  // Keep the counter in sync with storage and centralise numeric coercion.
  const [counter, setCounter] = useAtom(persistentCounterAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="local-storage"
        eyebrow="Browser persistence"
        title="Connect persistence strategies to the guided panels"
      >
        <p className="module-inline-note">
          The three panels align with the module outcomes: schema-backed atoms validate storage,
          hydration keeps UI state trustworthy, and persistence survives reloads without extra
          boilerplate.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Boolean feature toggle</h3>
        <p>
          Compare the persisted behaviour here with the flow you sketched. Toggle the flag, reload
          the page, and verify whether your earlier expectations about hydration held true.
        </p>
        <label className="module-control module-control--checkbox">
          <input
            type="checkbox"
            checked={flag}
            onChange={(event) => setFlag(event.target.checked)}
          />
          <span>Enable feature</span>
        </label>
        <p className="module-inline-note">Stored value: {flag ? "true" : "false"}</p>
      </article>

      <article className="module-guide">
        <h3>String preference</h3>
        <p>
          Keep this panel side-by-side with your notes. How does the actual behaviour of freeform
          text persistence line up with the schema validation strategy you planned?
        </p>
        <label className="module-control">
          <span className="module-control__label">User name</span>
          <input
            className="module-control__input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ada Lovelace"
          />
        </label>
        <p className="module-inline-note">Stored value: “{name}”</p>
      </article>

      <article className="module-guide">
        <h3>Numeric counter</h3>
        <p>
          The counter survives reloads exactly as you predicted (or not). Increment it, close the tab,
          reopen, and reconcile any mismatches with the data flow you drafted earlier.
        </p>
        <div className="module-metrics">
          <div>
            <span className="module-metric-label">Count</span>
            <span className="module-metric-value">{counter}</span>
          </div>
        </div>
        <div className="module-action-row">
          <button className="module-action" onClick={() => setCounter((previous) => previous + 1)}>
            Increment
          </button>
          <button className="module-action module-action--ghost" onClick={() => setCounter(0)}>
            Reset
          </button>
        </div>
        <p className="module-inline-note">Value persists across page reloads.</p>
      </article>

      <p className="module-inline-note">
        After each interaction, reload and document how persisted values behave versus your warm-up
        expectations so the retrieval mission has concrete evidence to revisit.
      </p>
    </div>
  )
}
