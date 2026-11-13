import { readFileSync, writeFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";

const packed = readFileSync(new URL("../src/worker.js.gz.b64", import.meta.url), "utf8").trim();
let source = gunzipSync(Buffer.from(packed, "base64")).toString("utf8");
// In this migration, the legacy game's Worker is the authoritative asset source.
// Prefer its Service Binding to the tiny Vite placeholder asset created for builds.
source = source.replace(
  "const siteAssets = env.ASSETS || env.SITE_ASSETS;",
  "const siteAssets = env.SITE_ASSETS || env.ASSETS;"
);
if (!source.includes("const siteAssets = env.SITE_ASSETS || env.ASSETS;")) {
  throw new Error("Could not set the existing game Worker as the primary asset source.");
}
writeFileSync(new URL("../src/worker.js", import.meta.url), source);
console.log("Worker source restored:", Buffer.byteLength(source), "bytes");
