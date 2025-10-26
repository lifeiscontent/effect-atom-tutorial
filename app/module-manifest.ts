export type ModuleDetail = {
  description: string
  outcomes: string[]
}

export type ModuleDescriptor = {
  slug: string
  name: string
  meta: string
  detail: ModuleDetail
}

const MODULE_DESCRIPTORS = [
  {
    slug: "counter",
    name: "Counter",
    meta: "Atoms & synchronous state",
    detail: {
      description:
        "Learn how atoms encapsulate synchronous state updates with minimal boilerplate.",
      outcomes: [
        "Model discrete UI concerns as Effect atoms that stay in sync with your components.",
        "Pair setter APIs with interactive controls for confident state updates.",
        "Understand how Effect keeps state transitions predictable across renders.",
      ],
    },
  },
  {
    slug: "derived-state",
    name: "Derived State",
    meta: "Computed dataflows",
    detail: {
      description:
        "Layer derived atoms on top of base state to unlock expressive computed dataflows.",
      outcomes: [
        "Transform foundational atoms into reusable derived values.",
        "Memoise expensive computations with Effect’s dependency tracking.",
        "Compose derivations that remain resilient as your UI scales.",
      ],
    },
  },
  {
    slug: "effects",
    name: "Effects",
    meta: "Async orchestration",
    detail: {
      description:
        "Coordinate asynchronous workstreams without sacrificing clarity or error handling.",
      outcomes: [
        "Trigger Effect effects from React components declaratively.",
        "Handle loading, success, and failure states with predictable flows.",
        "Publish results back to your UI through typed, observable channels.",
      ],
    },
  },
  {
    slug: "scoped-effects",
    name: "Scoped Effects",
    meta: "Lifecycle finalisers",
    detail: {
      description:
        "Bind resources to component lifecycles for automatic cleanup and safer orchestration.",
      outcomes: [
        "Scope long-running processes so they cancel on unmount.",
        "Compose finalisers that release resources exactly once.",
        "Prevent race conditions by leveraging Effect’s supervision tools.",
      ],
    },
  },
  {
    slug: "services-and-layers",
    name: "Services & Layers",
    meta: "Runtime provisioning",
    detail: {
      description: "Compose runtime layers that provide dependencies to your entire atom graph.",
      outcomes: [
        "Design service layers that unlock dependency injection in React.",
        "Swap implementations per environment without rewriting components.",
        "Share fully typed APIs across multiple modules in the tutorial.",
      ],
    },
  },
  {
    slug: "streams",
    name: "Streams",
    meta: "Reactive pipelines",
    detail: {
      description: "Model time-based pipelines and multi-step workflows with Effect streams.",
      outcomes: [
        "Create stream pipelines that react to user input and network events.",
        "Buffer, debounce, and merge events while keeping types intact.",
        "Fan out updates to multiple subscribers without manual wiring.",
      ],
    },
  },
  {
    slug: "atom-sets",
    name: "Atom Sets",
    meta: "Families & keyed caches",
    detail: {
      description: "Build keyed families of atoms to manage collections and dynamic records.",
      outcomes: [
        "Instantiate atom families on demand using deterministic keys.",
        "Cache expensive reads while respecting resource lifecycles.",
        "Support optimistic updates across complex data structures.",
      ],
    },
  },
  {
    slug: "functions",
    name: "Functions",
    meta: "Reusable behaviour",
    detail: {
      description: "Extract reusable logic from components with Effect-powered functions.",
      outcomes: [
        "Share behaviour across modules without duplicating orchestration.",
        "Inject dependencies into functions using services and layers.",
        "Discover patterns for testable, composable units of logic.",
      ],
    },
  },
  {
    slug: "event-listener",
    name: "Event Listener",
    meta: "DOM integration",
    detail: {
      description: "Bridge DOM events into the Effect runtime for ergonomic React integrations.",
      outcomes: [
        "Subscribe to native DOM events with automatic cleanup.",
        "Translate user intent into strongly typed Effect messages.",
        "Keep side-effects isolated from view rendering concerns.",
      ],
    },
  },
  {
    slug: "search-params",
    name: "Search Params",
    meta: "URL synchronisation",
    detail: {
      description: "Synchronise URL search parameters with your state for shareable experiences.",
      outcomes: [
        "Mirror atoms into the URL without manual parsing.",
        "Retain deep links that restore module state automatically.",
        "Handle browser navigation with confidence and minimal glue code.",
      ],
    },
  },
  {
    slug: "local-storage",
    name: "Local Storage",
    meta: "Browser persistence",
    detail: {
      description: "Persist state to the browser while keeping the data flow fully typed.",
      outcomes: [
        "Serialise atom values to localStorage with zero boilerplate.",
        "Hydrate UI state safely across reloads and devices.",
        "Strike the balance between reactivity and persistence.",
      ],
    },
  },
  {
    slug: "reactivity",
    name: "Reactivity",
    meta: "Invalidation strategies",
    detail: {
      description: "Master invalidation strategies so your UI stays responsive under pressure.",
      outcomes: [
        "Spot opportunities to split atoms for targeted updates.",
        "Invalidate cached work without rebuilding entire screens.",
        "Measure performance to ensure reactive flows stay snappy.",
      ],
    },
  },
  {
    slug: "rpc-integration",
    name: "RPC Integration",
    meta: "Typed client/server bridge",
    detail: {
      description: "Share type-safe contracts between clients and servers using RPC integrations.",
      outcomes: [
        "Generate clients from shared schemas for instant confidence.",
        "Handle loading and error states with structured envelopes.",
        "Streamline mutations with optimistic updates and reconciliation.",
      ],
    },
  },
  {
    slug: "http-api-integration",
    name: "HTTP API Integration",
    meta: "Schema-driven fetches",
    detail: {
      description: "Use schema-driven HTTP clients to reach external APIs while staying resilient.",
      outcomes: [
        "Compose fetches with automatic validation and retries.",
        "Promote error details to actionable UI messages.",
        "Build data loaders that degrade gracefully in rough network conditions.",
      ],
    },
  },
] as const satisfies ReadonlyArray<ModuleDescriptor>

export const MODULES: ReadonlyArray<ModuleDescriptor> = MODULE_DESCRIPTORS

export const DEFAULT_MODULE_DETAIL: ModuleDetail = {
  description:
    "Explore the live code examples inside the canvas and adapt them to your own experiments.",
  outcomes: [
    "Skim the guided notes for quick wins before diving deeper.",
    "Fork the Effect runtime examples to prototype new ideas.",
    "Reflect on how each pattern strengthens student-facing interfaces.",
  ],
}

const moduleBySlug = new Map<string, ModuleDescriptor>()

for (const module of MODULES) {
  moduleBySlug.set(module.slug, module)
}

export type ModuleHandle = {
  module: ModuleDescriptor
}

export function createModuleHandle(slug: ModuleDescriptor["slug"]): ModuleHandle {
  const module = moduleBySlug.get(slug)
  if (!module) {
    throw new Error(`Unknown tutorial module slug: ${slug}`)
  }
  return { module }
}

export function isModuleHandle(handle: unknown): handle is ModuleHandle {
  if (typeof handle !== "object" || handle === null) {
    return false
  }
  const candidate = handle as { module?: unknown }
  return typeof candidate.module === "object" && candidate.module !== null
}

type MatchLike =
  | {
      handle?: unknown
    }
  | undefined

export function getModuleFromMatches(
  matches: ReadonlyArray<MatchLike>
): ModuleDescriptor | undefined {
  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const match = matches[index]
    if (!match) {
      continue
    }
    if (isModuleHandle(match.handle)) {
      return match.handle.module
    }
  }
  return undefined
}

export function getModuleBySlug(slug: string): ModuleDescriptor | undefined {
  return moduleBySlug.get(slug)
}
