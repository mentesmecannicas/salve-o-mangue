import { bindings, defineConfig, exports } from "cf/config";
import * as entrypoint from "./src/worker.js" with { type: "cf-worker" };

export default defineConfig({
  worker: {
    name: "salve-mangue-multiplayer-v2",
    entrypoint,
    compatibilityDate: "2026-11-13",
    compatibilityFlags: ["enable_ctx_exports"],
    workersDev: true,
    env: {
      SITE_ASSETS: bindings.worker({ worker: "salve-o-mangue" }),
    },
    exports: {
      MangueRoomV2: exports.durableObject({ storage: "sqlite" }),
    },
    observability: {
      enabled: true,
      logs: { enabled: true, persist: true },
      traces: { enabled: true, persist: true },
    },
  },
});
