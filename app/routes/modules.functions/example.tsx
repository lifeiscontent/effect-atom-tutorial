import { Atom, useAtomSet, useAtomValue } from "@effect-atom/atom-react"
import { Effect } from "effect"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

export const logAtom = Atom.fn(
  Effect.fnUntraced(function* (value: number) {
    // Fire-and-forget command: nothing returns to the caller, only logs.
    yield* Effect.log("Log atom invoked with", value)
  })
)

class Users extends Effect.Service<Users>()("app/Users", {
  effect: Effect.sync(() => {
    const createdUsers = new Map<string, { readonly id: string; readonly name: string }>()

    const create = Effect.fnUntraced(function* (name: string) {
      const trimmed = name.trim()
      if (trimmed.length === 0) {
        // Surface validation failures through the Effect channel so the caller gets structured feedback.
        return yield* Effect.fail("Name cannot be empty")
      }
      const id = crypto.randomUUID()
      yield* Effect.log(`Created user ${trimmed} (${id})`)
      const user = { id, name: trimmed }
      createdUsers.set(id, user)
      // Return structured data so downstream atoms can render the success path without extra parsing.
      return user
    })

    return { create } as const
  }),
}) {}

const runtimeAtom = Atom.runtime(Users.Default)
// Imagine this runtime powering a global flash banner or toast system that any workflow can publish into.
// Swapping the layer later keeps every caller aligned without UI rewrites.
// Use this companion writable atom to broadcast UI feedback so layout banners, modal warnings, and form-level errors can react in sync.
const messageAtom = Atom.make<string | null>(null)

const createUserAtom = runtimeAtom.fn(
  Effect.fnUntraced(function* (name: string) {
    // Treat this like a mutation handler wiring business logic to shared presentation state:
    //   1. pre-flight status primes the flash UI,
    //   2. the Users service encapsulates async effects,
    //   3. success/failure branches feed back into the same shared channel so any subscribed surface
    //      (toast, banner, inline form hint) renders the outcome consistently.
    // Push immediate UI feedback before the Effect resolves.
    yield* Atom.set(messageAtom, "Creating user…")
    const users = yield* Users
    yield* users.create(name).pipe(
      Effect.matchEffect({
        onFailure: (error) =>
          // Channel failures back into the shared message atom so every subscriber sees the same status.
          Atom.set(messageAtom, `Failed: ${error}`),
        onSuccess: (user) =>
          // Record the success in the shared state so downstream surfaces can celebrate it immediately.
          Atom.set(messageAtom, `Created ${user.name} (id: ${user.id.substring(0, 8)})`),
      })
    )
  })
)

export function FunctionsExample() {
  const logNumber = useAtomSet(logAtom)
  const createUser = useAtomSet(createUserAtom)
  const message = useAtomValue(messageAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="functions"
        eyebrow="Reusable behaviour"
        title="Bridge callable atoms to reusable behaviour"
      >
        <p className="module-inline-note">
          Compare this guided implementation with your warm-up notes. The fire-and-forget flow
          demonstrates how command atoms share behaviour without duplicating orchestration, while
          the callback panel shows how services and layers feed status updates back to React.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Fire-and-forget workflow</h3>
        <p>
          This panel shows the reference solution, but hold off until you have attempted the
          warm-up. Once you compare notes, press these buttons to watch how the runtime owns logging
          without leaking promises into React.
        </p>
        <div className="module-action-row">
          <button className="module-action" onClick={() => logNumber(42)}>
            Log “42”
          </button>
          <button
            className="module-action module-action--ghost"
            onClick={() => logNumber(Math.random() * 100)}
          >
            Log random number
          </button>
        </div>
        <p className="module-inline-note">
          Inspect your console output and match each event with your earlier assumptions about
          cancellation, tracing, and re-entrancy.
        </p>
      </article>

      <article className="module-guide">
        <h3>Callback-driven results</h3>
        <p>
          The warm-up asked you to figure out how feedback should flow from callable atoms back to
          React. Compare this panel with your notes, paying attention to where status messages live
          and how React avoids touching Effect primitives.
        </p>
        <div className="module-stack">
          <button className="module-action" onClick={() => createUser("Taylor")}>
            Create demo user
          </button>
          <p className="module-inline-note">
            {message ??
              "No operations yet. Trigger the mutation above to see whether your expectations match the runtime behaviour."}
          </p>
        </div>
      </article>
    </div>
  )
}
