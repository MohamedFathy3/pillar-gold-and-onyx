import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const env = {
  ...process.env,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "change-this-admin-password",
};
const api = spawn(process.execPath, ["--experimental-sqlite", "server/api.mjs"], {
  cwd: root,
  env,
  stdio: "inherit",
});
const web = spawn("pnpm", ["exec", "vite", "dev", "--host", "0.0.0.0"], {
  cwd: root,
  env,
  stdio: "inherit",
});
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  api.kill("SIGTERM");
  web.kill("SIGTERM");
  setTimeout(() => process.exit(code), 250).unref();
}
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
api.on("exit", (code) => {
  if (!stopping) {
    console.error("SQLite API exited");
    stop(code || 1);
  }
});
web.on("exit", (code) => {
  if (!stopping) {
    console.error("Vite exited");
    stop(code || 1);
  }
});
