import { Atom, Result, useAtom, useAtomValue } from "@effect-atom/atom-react"
import { Cause, Schedule, Stream } from "effect"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

const tickerAtom = Atom.make(
  // Imagine a live SLA dashboard that ticks every second to refresh job counts or queue depths.
  // Emits the next integer every second so readers can observe continuous pushes.
  Stream.fromSchedule(Schedule.spaced(1000))
)

const chunkLoaderAtom = Atom.pull(
  // Treat this like a “Load more results” control for paginated search. Each pull hydrates the next slice on demand.
  // Creates a pull-driven stream where each manual pull fetches the next chunk.
  Stream.fromSchedule(Schedule.spaced(1000))
)

export function StreamsExample() {
  const tickerResult = useAtomValue(tickerAtom)
  const [pullResult, pullNext] = useAtom(chunkLoaderAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="streams"
        eyebrow="Reactive pipelines"
        title="Compare continuous and pull-based pipelines"
      >
        <p className="module-inline-note">
          The ticker highlights continuous streams that pause when unsubscribed, while the
          pull-based loader demonstrates backpressure. Together they reinforce the module outcomes
          about modelling time-based workflows and composing pipelines that stay reactive.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Continuous stream (ticker)</h3>
        <p>
          Follow the live ticker to verify your understanding of continuous streams. Watch how the
          component re-renders once per tick and how the stream pauses when you navigate away from
          the page.
        </p>
        {Result.match(tickerResult, {
          onInitial: () => <div role="status">Waiting for first emission…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="module-metrics">
              <div>
                <span className="module-metric-label">Latest value</span>
                <span className="module-metric-value">{success.value}</span>
              </div>
            </div>
          ),
        })}
      </article>

      <article className="module-guide">
        <h3>Pull-based stream (chunk loader)</h3>
        <p>
          Trigger pulls manually to observe backpressure. Compare the waiting state in this panel
          with the expectations you wrote down during the warm-up.
        </p>
        {Result.match(pullResult, {
          onInitial: () => <div role="status">Initialising pull stream…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="module-stack">
              <ul className="module-list">
                {success.value.items.map((item) => (
                  <li key={item}>Chunk value: {item}</li>
                ))}
              </ul>
              <button className="module-action" onClick={() => pullNext()}>
                {success.waiting ? "Fetching…" : "Load next chunk"}
              </button>
            </div>
          ),
        })}
      </article>

      <p className="module-inline-note">
        After each experiment, note when values emit, when streams pause, and how backpressure feels
        so your spaced retrieval session recalls the cadence instantly.
      </p>
    </div>
  )
}
