import type { Config } from "@react-router/dev/config"

export default {
  basename: "/effect-atom-tutorial/",
  ssr: false,
  routeDiscovery: {
    mode: "initial",
  },
  buildDirectory: "build",
} satisfies Config
