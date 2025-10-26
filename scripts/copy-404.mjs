import { access, copyFile } from "node:fs/promises"
import { join } from "node:path"

const cwd = process.cwd()
const targets = [
  join(cwd, "build", "client"),
  join(cwd, "build"),
  join(cwd, "dist", "client"),
  join(cwd, "dist"),
]

let copied = false

for (const dir of targets) {
  const source = join(dir, "index.html")
  const destination = join(dir, "404.html")

  if (await fileExists(source)) {
    await copyFile(source, destination)
    console.log(`[copy-404] Copied ${source} -> ${destination}`)
    copied = true
  }
}

if (!copied) {
  console.warn("[copy-404] No index.html found in build/ or dist/ outputs; skipping 404 copy.")
}

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
