import { readFileSync, writeFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";

const packed = readFileSync(new URL("../src/worker.js.gz.b64", import.meta.url), "utf8").trim();
const source = gunzipSync(Buffer.from(packed, "base64"));
writeFileSync(new URL("../src/worker.js", import.meta.url), source);
console.log("Worker source restored:", source.length, "bytes");
