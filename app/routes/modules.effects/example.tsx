import { Atom, Result, useAtomValue } from "@effect-atom/atom-react"
import { Cause, Duration, Effect } from "effect"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Baseline Result atom that demonstrates the happy-path transition.
// Picture this feeding a “last successful sync” tile on an operational dashboard.
// The Result state lets a layout-wide status ribbon stay in step with whatever upstream task produced the count.
export const baseEffectAtom = Atom.make(Effect.succeed(0))

// In production you might enrich a cached dataset with fresh metrics before handing them to analytics widgets.
// Sequencing through Atom.Context keeps that aggregation deterministic even when multiple dashboards subscribe simultaneously.
export const contextualEffectAtom = Atom.make(
  Effect.fnUntraced(function* (get: Atom.Context) {
    // Pull the dependency Result so you can see the sequencing end-to-end.
    const current = yield* get.result(baseEffectAtom)
    // Sleep briefly so you can watch the loading transition.
    yield* Effect.sleep("250 millis")
    return current + 1
  })
)

// Think of this as the error branch behind a “retry invoice export” button.
// Surfacing the failure through Result means global toasts, banners, or chat alerts can react without guessing at promise state.
export const failingEffectAtom = Atom.make(
  Effect.gen(function* () {
    // Mirror the delay so the success and failure timelines stay easy to compare.
    yield* Effect.sleep(Duration.millis(250))
    // Push a structured error into the Result channel so the UI keeps its branches predictable.
    yield* Effect.fail("Simulated failure")
  })
)

export function EffectsExample() {
  const baseResult = useAtomValue(baseEffectAtom)
  const contextualResult = useAtomValue(contextualEffectAtom)
  const failureResult = useAtomValue(failingEffectAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="effects"
        eyebrow="Async orchestration"
        title="Decode how Effect orchestrates asynchronous workflows"
      >
        <p className="module-inline-note">
          Each panel pairs a Result-bearing atom with declarative rendering so you can compare
          loading, success, and failure handling against the experiment you ran during the warm-up.
          Track how Effect sequencing, structured errors, and typed channels keep the workflow
          predictable.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Baseline effect atom</h3>
        <p>
          Compare this managed Effect with your warm-up attempt. Notice how branching on the Result
          keeps loading, success, and failure distinct without juggling promises.
        </p>
        {Result.match(baseResult, {
          onInitial: () => <div role="status">Loading…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="result-success" role="status">
              Base value: {success.value}
            </div>
          ),
        })}
      </article>

      <article className="module-guide">
        <h3>Contextual effect atom</h3>
        <p>
          Reads another Result-bearing atom via Atom.Context, pauses, then returns enriched data.
          Track how dependency sequencing matches (or contradicts) the assumptions from your sketch.
        </p>
        {Result.match(contextualResult, {
          onInitial: () => <div role="status">Loading…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="result-success" role="status">
              Contextual value: {success.value}
            </div>
          ),
        })}
      </article>

      <article className="module-guide">
        <h3>Failure state surfaced via Result</h3>
        <p>
          Intentionally fails so you can see how structured causes propagate. Use it to check
          whether your error-handling hypothesis matched the runtime reality.
        </p>
        {Result.match(failureResult, {
          onInitial: () => <div role="status">Loading…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="result-success" role="status">
              Failure demo value: {JSON.stringify(success.value)}
            </div>
          ),
        })}
      </article>

      <p className="module-inline-note">
        After exercising each panel, annotate when a Result transitions and which UI branch renders.
        Those notes become the retrieval cues for coordinating asynchronous workstreams without
        promise juggling.
      </p>
    </div>
  )
}
