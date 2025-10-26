import { Atom, AtomRpc, Result, useAtom, useAtomSet, useAtomValue } from "@effect-atom/atom-react"
import { Rpc, RpcGroup, RpcTest } from "@effect/rpc"
import { Cause, Effect, Ref, Schema } from "effect"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

// Share this cache tag across web, mobile, and background workers so todos stay fresh.
const TODO_REACTIVITY_KEY = ["todos"] as const
// Mirror a “quick add” composer pinned to the top of a collaborative task feed.
const newTodoTitleAtom = Atom.make("")

const Todo = Schema.Struct({
  id: Schema.Number,
  title: Schema.String,
  completed: Schema.Boolean,
})

type Todo = Schema.Schema.Type<typeof Todo>

const BASE_TODOS: ReadonlyArray<Todo> = [
  { id: 1, title: "Walk through the RPC tutorial", completed: true },
  { id: 2, title: "Define a Todo RPC schema", completed: true },
  { id: 3, title: "Wire the client into atoms", completed: false },
]

// Reseed the demo data between onboarding sessions.
const makeInitialTodos = (): Array<Todo> => BASE_TODOS.map((todo) => ({ ...todo }))

class TodoRpcs extends RpcGroup.make(
  Rpc.make("ListTodos", {
    success: Schema.Array(Todo),
  }),
  Rpc.make("CreateTodo", {
    payload: Schema.Struct({ title: Schema.String }),
    success: Todo,
    error: Schema.String,
  }),
  Rpc.make("ToggleTodo", {
    payload: Schema.Struct({ id: Schema.Number }),
    success: Todo,
    error: Schema.String,
  }),
  Rpc.make("ClearCompleted", {
    success: Schema.Array(Todo),
  }),
  Rpc.make("ResetTodos", {
    success: Schema.Array(Todo),
  })
) {}

/**
 * Represents the server boundary for this tutorial. In a production system this logic would
 * execute on your RPC service (Remix actions, a Next.js route, or an Effect-backed worker)
 * instead of shipping with the client bundle.
 */
const TodoHandlersLayer = TodoRpcs.toLayer(
  Effect.gen(function* () {
    const todosRef = yield* Ref.make(makeInitialTodos())
    const nextIdRef = yield* Ref.make<number>(BASE_TODOS.length + 1)

    return TodoRpcs.of({
      // Feels like the “fetch my tasks” endpoint feeding list views and nav badges.
      ListTodos: () => Ref.get(todosRef),
      CreateTodo: ({ title }: { title: string }) =>
        Effect.gen(function* () {
          const trimmedTitle = title.trim()
          if (trimmedTitle.length === 0) {
            // Reader tip: failures travel back through the Result boundary.
            return yield* Effect.fail("Todo titles cannot be empty")
          }
          const id = yield* Ref.modify(nextIdRef, (current) => [current, current + 1] as const)
          // Matches assigning work items with optimistic IDs before broadcasting to peers.
          const todo: Todo = { id, title: trimmedTitle, completed: false }
          yield* Ref.update(todosRef, (todos) => [...todos, todo])
          return todo
        }),
      ToggleTodo: ({ id }: { id: number }) =>
        Effect.gen(function* () {
          const todos = yield* Ref.get(todosRef)
          const existing = todos.find((todo) => todo.id === id)
          if (!existing) {
            return yield* Effect.fail(`Todo ${id} was not found`)
          }
          // Mirrors toggling “done” in a shared board while keeping optimistic UI snappy.
          const updated: Todo = { ...existing, completed: !existing.completed }
          const nextTodos = todos.map((todo) => (todo.id === id ? updated : todo))
          yield* Ref.set(todosRef, nextTodos)
          return updated
        }),
      ClearCompleted: () =>
        Effect.gen(function* () {
          const todos = yield* Ref.get(todosRef)
          // Think “Archive finished tasks” after a sprint review.
          const remaining = todos.filter((todo) => !todo.completed)
          yield* Ref.set(todosRef, remaining)
          return remaining
        }),
      ResetTodos: () =>
        Effect.gen(function* () {
          const reset = makeInitialTodos()
          yield* Ref.set(todosRef, reset)
          // Keeps ID assignment deterministic when QA resets the dataset mid-demo.
          yield* Ref.set(nextIdRef, reset.length + 1)
          return reset
        }),
    })
  })
)

/**
 * Browser-facing RPC client. AtomRpc.Tag bridges the schema into atoms so React components can stay
 * declarative while talking to the server boundary above.
 */
class TodoClient extends AtomRpc.Tag<TodoClient>()("TodoClient", {
  group: TodoRpcs,
  // RpcTest keeps this tutorial self-contained by providing an in-memory transport. In production
  // you would swap this for a network client (HTTP, WebSocket, tRPC bridge, etc.).
  makeEffect: RpcTest.makeClient(TodoRpcs, { flatten: true }),
  // Bundling the protocol locally is a demo convenience. Real apps supply credentials and call a
  // remote service instead of importing server handlers into the browser.
  protocol: TodoHandlersLayer,
}) {}

export function RpcIntegrationExample() {
  const [newTitle, setNewTitle] = useAtom(newTodoTitleAtom)
  // Wire this the same way you would hook a modal or inline composer submit.
  const createTodo = useAtomSet(TodoClient.mutation("CreateTodo"))
  const todosResult = useAtomValue(
    TodoClient.query("ListTodos", void 0, {
      reactivityKeys: TODO_REACTIVITY_KEY,
    })
  )
  const toggleTodo = useAtomSet(TodoClient.mutation("ToggleTodo"))
  const clearCompleted = useAtomSet(TodoClient.mutation("ClearCompleted"))
  // Imagine a support lead wiping demo data before the next customer walk-through.
  const resetTodos = useAtomSet(TodoClient.mutation("ResetTodos"))

  const completedCount =
    Result.match(todosResult, {
      onInitial: () => 0,
      onFailure: () => 0,
      onSuccess: (success) => success.value.filter((todo) => todo.completed).length,
    }) ?? 0

  const todoListView = Result.match(todosResult, {
    onInitial: () => <div role="status">Loading todos…</div>,
    onFailure: (failure) => (
      <div className="result-error" role="alert">
        {Cause.pretty(failure.cause)}
      </div>
    ),
    onSuccess: (success) => {
      const list = success.value
      const completed = list.filter((todo) => todo.completed).length
      const remaining = list.length - completed

      return (
        <>
          <ul className="module-list todo-list">
            {list.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label className="todo-item__label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      toggleTodo({
                        payload: { id: todo.id },
                        reactivityKeys: TODO_REACTIVITY_KEY,
                      })
                    }
                    aria-label={`Toggle ${todo.title}`}
                  />
                  <span className={`todo-item__title ${todo.completed ? "is-completed" : ""}`}>
                    {todo.title}
                  </span>
                </label>
              </li>
            ))}
            {list.length === 0 ? <li>No todos yet. Add one above!</li> : null}
          </ul>
          <p className="module-inline-note">
            Completed: {completed} • Remaining: {remaining}
          </p>
        </>
      )
    },
  })

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="rpc-integration"
        eyebrow="Typed client/server bridge"
        title="Connect your RPC contract sketch to the finished workflow"
      >
        <p className="module-inline-note">
          The form, query list, and mutation controls land every module outcome: typed schemas
          define the contract, AtomRpc exposes queries and mutations with reactivity keys, and
          Result-driven rendering keeps UI states predictable.
        </p>
        <p className="module-inline-note">
          <strong>Server boundary:</strong> the <code>TodoHandlersLayer</code> simulates a backend.
          In production you would host these handlers in an API route or worker so they execute
          outside the browser and can talk to databases or other systems.
        </p>
        <p className="module-inline-note">
          <strong>Demo transport:</strong> <code>RpcTest.makeClient</code> pipes client calls
          straight into that in-memory layer so the browser can exercise the flow without real
          network hops. Swap it for a real transport client (HTTP, WebSocket, queue) to connect to
          live services.
        </p>
      </ModuleExampleExplainer>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const trimmed = newTitle.trim()
          if (trimmed.length === 0) {
            return
          }
          createTodo({
            payload: { title: trimmed },
            reactivityKeys: TODO_REACTIVITY_KEY,
          })
          setNewTitle("")
        }}
        className="module-guide"
      >
        <h3>Create todo</h3>
        <p>
          Use this form to inspect the mutation pathway you sketched earlier. Does the optimistic
          feel match what you predicted for AtomRpc?
        </p>
        <label className="module-control">
          <span className="module-control__label">Todo title</span>
          <input
            className="module-control__input"
            type="text"
            placeholder="Create a todo…"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            aria-label="New todo title"
          />
        </label>
        <button className="module-action" type="submit">
          Add todo
        </button>
      </form>

      <article className="module-guide">
        <h3>Todo list query</h3>
        <p>
          Confirm that loading, success, and failure states line up with your warm-up assumptions.
          Notice how reactivity keys keep the list fresh without manual cache busting.
        </p>
        {todoListView}
      </article>

      <article className="module-guide">
        <h3>Mutations with reactivity</h3>
        <p>
          Use these buttons to validate your reactivity model. Each mutation broadcasts the same key
          so the list query refreshes immediately, matching the plan you drafted.
        </p>
        <div className="module-action-row">
          <button
            className="module-action"
            type="button"
            onClick={() =>
              clearCompleted({
                payload: void 0,
                reactivityKeys: TODO_REACTIVITY_KEY,
              })
            }
            disabled={completedCount === 0}
          >
            Clear completed
          </button>
          <button
            className="module-action module-action--ghost"
            type="button"
            onClick={() =>
              resetTodos({
                payload: void 0,
                reactivityKeys: TODO_REACTIVITY_KEY,
              })
            }
          >
            Reset dataset
          </button>
        </div>
        <p className="module-inline-note">
          Capture where the runtime behaviour aligned with your expectations and where it diverged.
          Those differences become high-yield spaced retrieval notes.
        </p>
      </article>

      <p className="module-inline-note">
        Interact with the todo list, then reconcile what you observe with your warm-up notes.
        Document any mismatches; they become key retrieval cues.
      </p>
    </div>
  )
}
