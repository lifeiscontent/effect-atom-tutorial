import { Atom, useAtomSet, useAtomValue } from "@effect-atom/atom-react"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

export const countAtom = Atom.make(0).pipe(Atom.keepAlive)
// Read the current counter via context so downstream logic can branch or aggregate.
export const doubleCountAtom = Atom.make((get) => get(countAtom) * 2)
// Map the source atom to reuse cached values without re-running the contextual logic.
export const tripleCountAtom = Atom.map(countAtom, (current) => current * 3)
// Picture finance, ops, and leadership dashboards each caring about a different projection.
// Split atoms let those surfaces subscribe independently so recalculations stay cheap even when the
// base count is hot.
export const metricSummariesAtom = Atom.make((get) => {
  const count = get(countAtom)
  const double = get(doubleCountAtom)
  const triple = get(tripleCountAtom)

  // Treat the summary bundle as the backing store for a metrics banner, PDF export, or Slack digest.
  // Consumers can pull one atom and still receive the memoised projections without duplicating math.
  return [
    { label: "Source count", value: count },
    { label: "Double (contextual)", value: double },
    { label: "Triple (mapped)", value: triple },
  ] as const
})

export function DerivedStateExample() {
  const setCount = useAtomSet(countAtom)
  const metricSummaries = useAtomValue(metricSummariesAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="derived-state"
        eyebrow="Computed dataflows"
        title="See how contextual and mapped derivations differ"
      >
        <p className="module-inline-note">
          The contextual <code>doubleCountAtom</code> demonstrates how to lift base atoms into
          richer flows, while the mapped <code>tripleCountAtom</code> proves that pure projections
          stay memoised. Together they deliver the module outcomes on transforming, memoising, and
          composing derived values.
        </p>
      </ModuleExampleExplainer>

      <div className="module-metrics">
        {metricSummaries.map((summary) => (
          <div key={summary.label}>
            <span className="module-metric-label">{summary.label}</span>
            <span className="module-metric-value">{summary.value}</span>
          </div>
        ))}
      </div>

      <button
        className="module-action"
        onClick={() => setCount((previous) => previous + 1)}
        aria-label="Increment the base counter"
      >
        Increment counter
      </button>

      <p className="module-inline-note">
        After each click, log which derivations actually recomputed so you can recall the difference
        between contextual access and cached projections during spaced retrieval.
      </p>
    </div>
  )
}
