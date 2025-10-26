import type { Route } from "../../.react-router/types/app/routes/+types/modules.layout"
import { Outlet } from "react-router"

import { ModuleLayout } from "../components/module-layout"
import { DEFAULT_MODULE_DETAIL, getModuleFromMatches } from "../module-manifest"

export default function ModulesLayout({ matches }: Route.ComponentProps) {
  const module = getModuleFromMatches(matches)
  const detail = module?.detail ?? DEFAULT_MODULE_DETAIL

  return (
    <ModuleLayout module={module} detail={detail}>
      <Outlet />
    </ModuleLayout>
  )
}
