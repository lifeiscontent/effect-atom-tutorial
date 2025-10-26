import { Atom, useAtomSet, useAtomValue } from "@effect-atom/atom-react"
import { Effect, Layer } from "effect"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

const runtime = Atom.runtime(Layer.empty)

let ticketCount = 28

const activeTicketsAtom = Atom.make(() => ticketCount).pipe(
  Atom.withReactivity(["dashboard:active-tickets"]),
  Atom.keepAlive
)

const cachedSnapshotAtom = Atom.make(() => ticketCount).pipe(Atom.keepAlive)

const assignTicketAtom = runtime.fn(
  () =>
    Effect.gen(function* () {
      ticketCount += 1
      yield* Effect.log(`dashboard:active-tickets updated to ${ticketCount}`)
    }),
  { reactivityKeys: ["dashboard:active-tickets"] }
)

export function ReactivityExample() {
  const activeTickets = useAtomValue(activeTicketsAtom)
  const cachedTickets = useAtomValue(cachedSnapshotAtom)
  const assignTicket = useAtomSet(assignTicketAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="reactivity"
        eyebrow="Invalidation strategies"
        title="Tag queries with keys to target cache refreshes"
      >
        <p className="module-inline-note">
          The first card reads a query tagged with <code>Atom.withReactivity</code>. The second card
          is a plain cached snapshot. Trigger the mutation to see how only the keyed query
          refreshes.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Reactive dashboard metric</h3>
        <p>
          Because this query advertises the <code>"dashboard:active-tickets"</code> key, the runtime
          invalidates it when matching mutations finish. Each rerender reflects the latest ticket
          count.
        </p>
        <div className="module-metrics">
          <div>
            <span className="module-metric-label">Active tickets (reactive)</span>
            <span className="module-metric-value">{activeTickets}</span>
          </div>
        </div>
        <p className="module-inline-note">
          Watch the value jump after each mutation. The runtime recomputes this atom right away
          because the mutation declared the same key.
        </p>
      </article>

      <article className="module-guide">
        <h3>Untagged snapshot</h3>
        <p>
          This card uses a query without reactivity keys. It renders once and never invalidates, so
          it becomes stale even though the underlying source changed.
        </p>
        <div className="module-metrics">
          <div>
            <span className="module-metric-label">Cached snapshot (no key)</span>
            <span className="module-metric-value">{cachedTickets}</span>
          </div>
        </div>
        <p className="module-inline-note">
          Compare this frozen value with the reactive card above. The gap illustrates why mapping
          mutations to keys matters.
        </p>
      </article>

      <article className="module-guide">
        <h3>Mutation describing affected surfaces</h3>
        <p>
          Press the button to simulate assigning a new ticket. The mutation increments the shared
          counter, logs to the console, and lists the <code>"dashboard:active-tickets"</code> key so
          the runtime knows which queries to refresh.
        </p>
        <button className="module-action" onClick={() => assignTicket()}>
          Assign ticket
        </button>
        <p className="module-inline-note">
          After each click, inspect the console to see the logged lifecycle and confirm that only
          the keyed atom recomputes.
        </p>
      </article>

      <p className="module-inline-note">
        Record what changed, what stayed stale, and how the console logs lined up with your
        prediction. Use those notes for spaced retrieval later.
      </p>
    </div>
  )
}
