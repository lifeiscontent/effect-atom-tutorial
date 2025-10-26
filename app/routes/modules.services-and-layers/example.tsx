import { Atom, Result, useAtomValue } from "@effect-atom/atom-react"
import { Cause, Effect } from "effect"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

type User = {
  readonly id: string
  readonly name: string
  readonly role: string
}

class Users extends Effect.Service<Users>()("app/Users", {
  effect: Effect.sync(() => {
    // Expose a deterministic dataset so you can focus on the layer pattern.
    const roster: ReadonlyArray<User> = [
      { id: "1", name: "Alice", role: "Platform Engineer" },
      { id: "2", name: "Bob", role: "Operations Lead" },
      { id: "3", name: "Charlie", role: "Product Designer" },
    ]

    const getAll = Effect.fnUntraced(function* () {
      return roster
    })

    return { getAll } as const
  }),
}) {}

// Share the Users service with every atom you build from this runtime.
// Picture this powering an org chart drawer or staffing dashboard. Swap the layer for a staging backend,
// and every consuming atom (from profile popovers to admin tables) switches sources without UI rewrites.
const runtimeAtom = Atom.runtime(Users.Default)

const usersAtom = runtimeAtom.atom(
  Effect.gen(function* () {
    // Pull the service from the layer so you stay fully typed.
    const users = yield* Users
    // Publish the roster as a Result so UI components branch declaratively.
    return yield* users.getAll()
  })
)

export function ServicesLayersExample() {
  const usersResult = useAtomValue(usersAtom)

  const rosterView = Result.match(usersResult, {
    onInitial: () => <div role="status">Loading users…</div>,
    onFailure: (failure) => (
      <div className="result-error" role="alert">
        {Cause.pretty(failure.cause)}
      </div>
    ),
    onSuccess: ({ value }: { value: ReadonlyArray<User> }) => (
      <ul className="module-list" aria-label="Roster">
        {value.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>: {user.role}
          </li>
        ))}
      </ul>
    ),
  })

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="services-and-layers"
        eyebrow="Runtime provisioning"
        title="Visualise how services travel through atom runtimes"
      >
        <p className="module-inline-note">
          The roster proves each module outcome: a shared runtime provides dependencies, swapping
          layers changes implementations without UI edits, and typed APIs stay consistent across the
          tutorial.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Team roster pulled from the service layer</h3>
        {rosterView}
        <p className="module-inline-note">
          Swap the layer passed to <code>Atom.runtime</code> (for example, a mock service or remote
          client) and watch every consuming atom pick up the new implementation without UI changes.
          Compare that behaviour with the strategy you drafted earlier.
        </p>
      </article>
    </div>
  )
}
