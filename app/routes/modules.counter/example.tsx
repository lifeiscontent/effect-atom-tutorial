import {
  Atom,
  useAtom,
  // useAtomSet,
  // useAtomValue,
} from "@effect-atom/atom-react"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Keep the counter alive so rerenders and remounts carry forward the latest value.
export const countAtom = Atom.make(0).pipe(Atom.keepAlive)

export function CounterExample() {
  // const count = useAtomValue(countAtom) // Reads the stable counter value without exposing the setter.
  // const setCount = useAtomSet(countAtom) // Produces a setter that always receives the latest state.
  // Grab the current value and setter in one hook call.
  const [count, setCount] = useAtom(countAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="counter"
        eyebrow="Atoms & synchronous state"
        title="Connect the warm-up to the finished counter"
      >
        <p className="module-inline-note">
          Map each warm-up outcome to this panel: a single atom models the UI concern, the setters
          stream safe updates, and the keep-alive flag shows why state transitions stay predictable
          between renders.
        </p>
      </ModuleExampleExplainer>

      <div className="module-metrics">
        <span className="module-metric-label">Current count</span>
        <h3 className="module-metric-value">{count}</h3>
      </div>

      <div className="module-action-row">
        <button className="module-action" onClick={() => setCount((previous) => previous + 1)}>
          Increment
        </button>
        <button className="module-action module-action--ghost" onClick={() => setCount(() => 0)}>
          Reset
        </button>
      </div>

      <p className="module-inline-note">
        Re-run your scratch solution and annotate how each button interacts with the atom so you can
        recall the pattern during spaced retrieval.
      </p>
    </div>
  )
}
