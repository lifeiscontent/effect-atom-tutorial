import { Atom, Result, useAtomValue } from "@effect-atom/atom-react"
import * as FetchHttpClient from "@effect/platform/FetchHttpClient"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import { Cause, Effect, Schema } from "effect"

import { ModuleExampleExplainer } from "../../components/module-example-explainer"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

const PostSchema = Schema.Struct({
  userId: Schema.Number,
  id: Schema.Number,
  title: Schema.String,
  body: Schema.String,
})
const PostsSchema = Schema.Array(PostSchema)

const UserSchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  email: Schema.String,
  username: Schema.String,
})

// Provide the HTTP client layer once so every query in this module reuses the same dependency.
// Imagine wiring this into a newsroom analytics console: widget cards, detail dialogs, and background refresh jobs all
// depend on the same client. Swapping layers for mocks or staging transports flips every consumer without hunting through UI code.
const runtimeAtom = Atom.runtime(FetchHttpClient.layer)

const fetchJson = <A, I, R>(path: string, schema: Schema.Schema<A, I, R>) =>
  Effect.gen(function* () {
    // Filter out non-2xx responses before decoding.
    const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk)
    const response = yield* client.get(`${API_BASE_URL}${path}`)
    // Parse + validate with schemas to keep UI state trustworthy.
    return yield* HttpClientResponse.schemaBodyJson(schema)(response)
  })

// Think “hero article” on a newsroom landing page; validate before rendering headlines.
const postAtom = runtimeAtom.atom(fetchJson("/posts/1", PostSchema))
// Feels like the “recent updates” rail that reuses the same client while trimming payloads for compact cards.
const postsAtom = runtimeAtom.atom(
  Effect.gen(function* () {
    const posts = yield* fetchJson("/posts", PostsSchema)
    // Trim the list so you can focus on the schema workflow.
    return posts.slice(0, 5)
  })
)
// Mirrors a “staff profile” sidebar fed by the same shared pipeline.
const userAtom = runtimeAtom.atom(fetchJson("/users/1", UserSchema))

export function HttpApiIntegrationExample() {
  const postResult = useAtomValue(postAtom)
  const userResult = useAtomValue(userAtom)
  const postsResult = useAtomValue(postsAtom)

  return (
    <div className="module-stack">
      <ModuleExampleExplainer
        slug="http-api-integration"
        eyebrow="Schema-driven fetches"
        title="Trace the schema-backed pipeline you drafted during the warm-up"
      >
        <p className="module-inline-note">
          These panels align with the module outcomes: each query runs through a shared HTTP layer,
          schemas validate payloads before React sees them, and
          <code>Result.match</code> keeps loading and error branches declarative.
        </p>
      </ModuleExampleExplainer>

      <article className="module-guide">
        <h3>Single post</h3>
        <p>
          Validate one resource before it ever reaches React. Compare what happens here with the
          error and loading states you predicted in your warm-up notes.
        </p>
        {Result.match(postResult, {
          onInitial: () => <div role="status">Loading post…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="module-stack">
              <h4>{success.value.title}</h4>
              <p>{success.value.body}</p>
              <small>
                Post #{success.value.id} by user #{success.value.userId}
              </small>
            </div>
          ),
        })}
      </article>

      <article className="module-guide">
        <h3>User details</h3>
        <p>
          Reuse the same runtime client and schema validation. Track how this panel either confirms
          or challenges the dataflow hypotheses you logged earlier.
        </p>
        {Result.match(userResult, {
          onInitial: () => <div role="status">Loading user…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <div className="module-stack">
              <strong>{success.value.name}</strong>
              <span>@{success.value.username}</span>
              <span>{success.value.email}</span>
            </div>
          ),
        })}
      </article>

      <article className="module-guide">
        <h3>Recent posts</h3>
        <p>
          Render a slice of posts while leaning on <code>Result.match</code> to stage loading and
          error branches declaratively. Notice how the list stays reactive even though every item is
          schema-validated.
        </p>
        {Result.match(postsResult, {
          onInitial: () => <div role="status">Loading posts…</div>,
          onFailure: (failure) => (
            <div className="result-error" role="alert">
              {Cause.pretty(failure.cause)}
            </div>
          ),
          onSuccess: (success) => (
            <ul className="module-list">
              {success.value.map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong>
                  <p>{post.body.substring(0, 100)}…</p>
                </li>
              ))}
            </ul>
          ),
        })}
      </article>

      <p className="module-inline-note">
        After testing your own draft, compare it with these panels and record any mismatches. Those
        annotations become retrieval hooks the next time you build a schema-backed HTTP workflow.
      </p>
    </div>
  )
}
