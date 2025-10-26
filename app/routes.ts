import type { RouteConfig } from "@react-router/dev/routes"
import { route } from "@react-router/dev/routes"

const moduleRoutes = [
  route("counter", "routes/modules.counter/route.tsx"),
  route("derived-state", "routes/modules.derived-state/route.tsx"),
  route("effects", "routes/modules.effects/route.tsx"),
  route("scoped-effects", "routes/modules.scoped-effects/route.tsx"),
  route("services-and-layers", "routes/modules.services-and-layers/route.tsx"),
  route("streams", "routes/modules.streams/route.tsx"),
  route("atom-sets", "routes/modules.atom-sets/route.tsx"),
  route("functions", "routes/modules.functions/route.tsx"),
  route("event-listener", "routes/modules.event-listener/route.tsx"),
  route("search-params", "routes/modules.search-params/route.tsx"),
  route("local-storage", "routes/modules.local-storage/route.tsx"),
  route("reactivity", "routes/modules.reactivity/route.tsx"),
  route("rpc-integration", "routes/modules.rpc-integration/route.tsx"),
  route("http-api-integration", "routes/modules.http-api-integration/route.tsx"),
]

export default [
  route("/", "routes/_index.tsx"),
  route("modules", "routes/modules.layout.tsx", moduleRoutes),
  route("*", "routes/_404.tsx"),
] satisfies RouteConfig
