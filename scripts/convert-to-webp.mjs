#!/usr/bin/env node
/**
 * Converts all JPG/PNG in public/images to WebP.
 * Run: node scripts/convert-to-webp.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicImages = path.join(__dirname, "..", "public", "images")

const ext = [".jpg", ".jpeg", ".png"]

async function convertToWebP() {
  const sharp = (await import("sharp")).default

  function* walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) yield* walk(full)
      else if (e.isFile() && ext.includes(path.extname(e.name).toLowerCase()))
        yield full
    }
  }

  for (const file of walk(publicImages)) {
    const out = file.replace(/\.[^.]+$/i, ".webp")
    if (file === out) continue
    console.log(file, "->", out)
    await sharp(file)
      .webp({ quality: 85 })
      .toFile(out)
  }
  console.log("Done.")
}

convertToWebP().catch((err) => {
  console.error(err)
  process.exit(1)
})
