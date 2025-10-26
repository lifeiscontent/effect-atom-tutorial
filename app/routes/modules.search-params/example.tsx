import { Atom, useAtom } from "@effect-atom/atom-react"
import { Option, Schema } from "effect"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Mirror a text parameter directly into the URL.
// Picture a support agent sharing a filtered dashboard link. This atom keeps the breadcrumb in sync so teammates land on the same view.
const simpleParamAtom = Atom.searchParam("simple")

// Validate the query value so the UI always sees either a number or Option.none().
// Treat this like a “results per page” or “threshold” toggle: consumers get a safe number or an explicit none, never malformed state.
const numberParamAtom = Atom.searchParam("number", {
  schema: Schema.NumberFromString,
})

export function SearchParamsExample() {
  const [simpleParam, setSimpleParam] = useAtom(simpleParamAtom)
  const [numberParam, setNumberParam] = useAtom(numberParamAtom)

  const numberParamDisplay = Option.match(numberParam, {
    onNone: () => "none",
    onSome: (value) => value.toString(),
  })

  const numberInputValue = Option.match(numberParam, {
    onNone: () => "",
    onSome: (value) => value.toString(),
  })

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="search-params"
        eyebrow="URL synchronisation"
        title="Map URL synchronisation outcomes onto the reference panels"
      >
        <p className="module-inline-note">
          The simple text field mirrors atoms into the URL while the number field showcases schema
          validation and Option-based branching, matching the module outcomes for shareable,
          resilient deep links.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>String parameter</h3>
        <p>
          Type into the field and confirm the query string updates exactly as you predicted during
          the warm-up. Share the resulting URL with a teammate to see the same state appear for
          them.
        </p>
        <div className="module-stack">
          <label className="module-control">
            <span className="module-control__label">Simple value</span>
            <input
              className="module-control__input"
              type="text"
              value={simpleParam}
              onChange={(event) => setSimpleParam(event.target.value)}
              placeholder="Type something…"
            />
          </label>
          <p className="module-inline-note">
            Current URL query:{" "}
            <code>
              ?simple=
              {simpleParam === "" ? "(empty)" : encodeURIComponent(simpleParam)}
            </code>
          </p>
        </div>
      </article>

      <article className="module-guide">
        <h3>Number parameter with schema validation</h3>
        <p>
          Experiment with valid and invalid values. Notice how the Option-based result keeps
          consumers honest: they either receive a number or a clear “none” state to branch on.
        </p>
        <div className="module-stack">
          <label className="module-control">
            <span className="module-control__label">Numeric value</span>
            <input
              className="module-control__input"
              type="number"
              value={numberInputValue}
              onChange={(event) => {
                const { value } = event.target
                if (value === "") {
                  setNumberParam(Option.none())
                  return
                }
                const parsed = Number.parseInt(value, 10)
                if (!Number.isNaN(parsed)) {
                  setNumberParam(Option.some(parsed))
                }
              }}
              placeholder="42"
            />
          </label>
          <button
            className="module-action module-action--ghost"
            onClick={() => setNumberParam(Option.none())}
          >
            Clear parameter
          </button>
          <p className="module-inline-note">Current value: {numberParamDisplay}</p>
        </div>
      </article>

      <p className="module-inline-note">
        After exercising both panels, capture how navigation, clear actions, and shared links
        behaved relative to your warm-up expectations so the retrieval mission locks in the mental
        model.
      </p>
    </div>
  )
}
