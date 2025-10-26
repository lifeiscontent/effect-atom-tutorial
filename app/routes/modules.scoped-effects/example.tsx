import { Atom, Result, useAtomValue } from "@effect-atom/atom-react"
import { Cause, Effect } from "effect"
import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Picture this atom managing a connection-scoped websocket or feature tour overlay: the moment the last subscriber unmounts,
// the finaliser tears everything down so cross-tab listeners or timers do not leak.
const scopedResultAtom = Atom.make(
  Effect.gen(function* () {
    // Watch the console to confirm cleanup timing.
    yield* Effect.addFinalizer(() => Effect.log("Scoped atom finaliser invoked"))
    // Sleep briefly so the UI shows a loading state before settling.
    yield* Effect.sleep("150 millis")
    return "Scoped resources active"
  })
)

export function ScopedEffectsExample() {
  const result = useAtomValue(scopedResultAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="scoped-effects"
        eyebrow="Lifecycle finalisers"
        title="Link lifecycle finalisers to the outcomes you drafted"
      >
        <p className="module-inline-note">
          This single panel shows how scoped resources attach cleanup to atom lifetimes, mirroring
          the warm-up focus on cancelling work and confirming finaliser timing.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Scoped atom status</h3>
        {Result.match(result, {
          onInitial: () => <div role="status">Starting scoped effect…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="result-success" role="status">
              {success.value}
            </div>
          ),
        })}
        <p className="module-inline-note">
          Navigate away and return to this module. The console should log when the finaliser runs,
          matching the lifecycle expectations you sketched during the warm-up.
        </p>
      </article>
    </div>
  )
}
