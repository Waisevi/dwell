#!/usr/bin/env node
/**
 * Converts all JPG/PNG in public/images to WebP via cwebp.
 * Requires cwebp in PATH: brew install webp
 * Run: node scripts/convert-to-webp.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execFileSync } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicImages = path.join(__dirname, "..", "public", "images")

const ext = [".jpg", ".jpeg", ".png"]
const QUALITY = 85

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else if (e.isFile() && ext.includes(path.extname(e.name).toLowerCase()))
      yield full
  }
}

try {
  for (const file of walk(publicImages)) {
    const out = file.replace(/\.[^.]+$/i, ".webp")
    if (file === out) continue
    console.log(file, "->", out)
    execFileSync("cwebp", ["-q", String(QUALITY), file, "-o", out], {
      stdio: "inherit",
    })
  }
  console.log("Done.")
} catch (err) {
  if (err.code === "ENOENT") {
    console.error("cwebp not found. Install: brew install webp")
  } else {
    console.error(err)
  }
  process.exit(1)
}
