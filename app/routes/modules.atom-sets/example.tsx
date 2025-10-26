import { Atom, Result, useAtomValue } from "@effect-atom/atom-react"
import { Cause, Effect, Schema } from "effect"
import { useState, type ReactElement } from "react"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

type Playbook = {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly steps: ReadonlyArray<string>
}

/**
 * Pretend these playbooks are bundled with the application or shipped via feature flags.
 * They are stable, rarely change at runtime, and every screen needs to reference them by key.
 */
const PLAYBOOK_ENTRIES: ReadonlyArray<readonly [string, Playbook]> = [
  [
    "incident-escalation",
    {
      id: "incident-escalation",
      title: "Incident escalation",
      summary: "Route unresolved alerts to the correct responders without reopening past cases.",
      steps: [
        "Review pager history for duplicate alerts.",
        "Confirm mitigation status with the on-call engineer.",
        "Notify the incident coordinator and post the escalation summary.",
      ],
    } satisfies Playbook,
  ],
  [
    "failover-drill",
    {
      id: "failover-drill",
      title: "Failover drill",
      summary: "Run a scheduled rehearsal for regional failover without disrupting customers.",
      steps: [
        "Announce the drill in the operations channel.",
        "Shift traffic using the prepared routing script.",
        "Validate customer flows, then capture metrics for the retro.",
      ],
    } satisfies Playbook,
  ],
  [
    "postmortem-kit",
    {
      id: "postmortem-kit",
      title: "Postmortem kit",
      summary: "Snapshot the data you need to write a postmortem while context is fresh.",
      steps: [
        "Export dashboards bookmarked for the service owners.",
        "Archive the incident timeline and attach logs.",
        "Schedule the write-up review before the next retro.",
      ],
    } satisfies Playbook,
  ],
  [
    "release-readiness",
    {
      id: "release-readiness",
      title: "Release readiness",
      summary: "Checklist shared across teams before promoting a deployment to production.",
      steps: [
        "Verify every blocking ticket in the release train is resolved.",
        "Confirm documentation updates were merged and published.",
        "Obtain sign-off from QA and the feature owner.",
      ],
    } satisfies Playbook,
  ],
] as const

const INITIAL_PLAYBOOK_ROSTER = [
  "incident-escalation",
  "failover-drill",
  "postmortem-kit",
  "release-readiness",
] as const

/**
 * Families shine when many screens want the same dependency graph but keyed lookups.
 * This service models a local registry instead of a network fetch to emphasise that point.
 *
* Imagine `Atom.family` wrapping static or rarely changing reference material such as playbook
* templates, compliance copy, brand palettes, or onboarding checklists that you reuse across
 * feature surfaces. Because a family keeps members cached in memory for the lifetime of the process,
 * it is a poor fit for fast-changing feeds or per-request cache-busting data. Reach for loaders,
 * subscription refs, or derived atoms when records churn frequently.
 *
 * When a global surface must always display a specific entry, you can keep that member alive:
 *
 * ```ts
 * // Example: hydrate the release readiness playbook for a persistent sidebar.
 * const releaseReadiness = Atom.keepAlive(playbookAtom("release-readiness"));
 * ```
 *
 * Dynamic screens that mount members on demand (like the roster below) should skip `keepAlive`
 * so unused IDs can naturally dispose when nothing references them.
 */
class MissingPlaybookError extends Schema.TaggedError<MissingPlaybookError>()(
  "MissingPlaybookError",
  {
    id: Schema.String,
  }
) {}

class Playbooks extends Effect.Service<Playbooks>()("app/Playbooks", {
  effect: Effect.sync(() => {
    const library = new Map<string, Playbook>(PLAYBOOK_ENTRIES)

    const load = Effect.fnUntraced(function* (id: string) {
      yield* Effect.log("[Playbooks] loading playbook", { id })
      const playbook = library.get(id)
      if (!playbook) {
        return yield* MissingPlaybookError.make({ id })
      }

      return playbook
    })

    return { load } as const
  }),
}) {}

/**
 * Build a single runtime so every family member shares the same dependency wiring.
 * In production this might be an SDK, DI container, or layered service bundle.
 */
const runtimeAtom: Atom.AtomRuntime<Playbooks, never> = Atom.runtime(Playbooks.Default)

/**
 * `Atom.family` memoises a canonical atom per playbook identifier.
 * Each call reuses cached reads and keeps per-key lifetimes isolated.
 */
export const playbookAtom = Atom.family((id: string) =>
  runtimeAtom.atom(
    Effect.gen(function* () {
      const library = yield* Playbooks
      return yield* library.load(id)
    })
  )
)

export function AtomSetsExample() {
  /**
   * In a dashboard you might compute this array from user preferences,
   * team configurations, or cross-filtered analytics. IDs can repeat,
   * shuffle, or disappear and Atom.family will map them to the same atoms.
   */
  const [roster, setRoster] = useState(() => [...INITIAL_PLAYBOOK_ROSTER])

  const rotateRoster = () =>
    setRoster((previous) => {
      if (previous.length <= 1) {
        return previous
      }
      const [first, ...rest] = previous
      return [...rest, first]
    })

  const toggleDuplicate = () =>
    setRoster((previous) => {
      const duplicateCount = previous.filter((id) => id === "failover-drill").length
      if (duplicateCount > 1) {
        let removed = false
        return previous.filter((id) => {
          if (id === "failover-drill" && !removed) {
            removed = true
            return false
          }
          return true
        })
      }
      const insertionPoint = previous.indexOf("failover-drill")
      if (insertionPoint === -1) {
        return previous
      }
      return [
        ...previous.slice(0, insertionPoint + 1),
        "failover-drill",
        ...previous.slice(insertionPoint + 1),
      ]
    })

  const resetRoster = () => setRoster(() => [...INITIAL_PLAYBOOK_ROSTER])

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="atom-sets"
        eyebrow="Families & keyed caches"
        title="Coordinate repeated blueprints with atom families"
      >
        <p className="module-inline-note">
          Each card below represents a distinct playbook atom keyed by its id. The data lives
          locally, but the memoisation pattern mirrors what you would use for widgets or forms that
          share a runtime dependency.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Playbook roster driven by Atom.family</h3>
        <p>
          Use the controls to reorder or duplicate ids, then watch the console logs from the{" "}
          <code>Playbooks</code> service to see which members actually execute.
        </p>
        <div className="module-action-row">
          <button className="module-action" onClick={rotateRoster}>
            Rotate roster
          </button>
          <button className="module-action module-action--ghost" onClick={toggleDuplicate}>
            Toggle duplicate “failover-drill”
          </button>
          <button className="module-action module-action--ghost" onClick={resetRoster}>
            Reset to default order
          </button>
        </div>
        <p className="module-inline-note">Current ids: {roster.join(" → ")}</p>
        <div className="module-list">
          {roster.map((id, index) => (
            <PlaybookCard key={`${id}-${index}`} id={id} />
          ))}
        </div>
      </article>

      <p className="module-inline-note">
        Each interaction isolates updates to the affected keys. The roster reuse demonstrates why{" "}
        <code>Atom.family</code> excels at lookup-style state without re-running every card.
      </p>
    </div>
  )
}

function PlaybookCard({ id }: { id: string }): ReactElement {
  const result = useAtomValue(playbookAtom(id))

  return Result.match(result, {
    onInitial: () => (
      <div className="subsection-card" role="status">
        Loading playbook "{id}"…
      </div>
    ),
    onFailure: (failure) => (
      <div className="subsection-card result-error" role="alert">
        {Cause.pretty(failure.cause)}
      </div>
    ),
    onSuccess: (success) => {
      const playbook = success.value
      return (
        <div className="subsection-card">
          <h4>{playbook.title}</h4>
          <p>{playbook.summary}</p>
          <ol className="subsection-list">
            {playbook.steps.map((step) => (
              <li key={`${playbook.id}-${step}`}>{step}</li>
            ))}
          </ol>
        </div>
      )
    },
  })
}
