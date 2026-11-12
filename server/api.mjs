import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, basename } from "node:path";
import { randomUUID, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = join(fileURLToPath(new URL("..", import.meta.url)));
const dbDir = join(root, "data");
const uploadDir = join(root, "public", "uploads");
mkdirSync(dbDir, { recursive: true });
mkdirSync(uploadDir, { recursive: true });
const db = new DatabaseSync(process.env.SQLITE_PATH || join(dbDir, "pillar.sqlite"));
db.exec(
  "PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS records (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, name TEXT NOT NULL, url TEXT NOT NULL, kind TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, external INTEGER NOT NULL DEFAULT 0);",
);
if (
  !db
    .prepare("PRAGMA table_info(media)")
    .all()
    .some((column) => column.name === "external")
)
  db.exec("ALTER TABLE media ADD COLUMN external INTEGER NOT NULL DEFAULT 0");
const get = db.prepare("SELECT value FROM records WHERE key=?");
const put = db.prepare(
  "INSERT INTO records(key,value,updated_at) VALUES(?,?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=CURRENT_TIMESTAMP",
);
if (!get.get("settings"))
  put.run(
    "settings",
    JSON.stringify({
      primary: "#1d1c19",
      gold: "#c5a15f",
      background: "#f7f5f0",
      text: "#282722",
      font: "Cairo, sans-serif",
      heroTitle: "For financial and tax services and consultancy",
      heroSubtitle:
        "Professional accounting, auditing, tax advisory and financial consultancy services for businesses across Egypt.",
      heroImage: "/images/pillar/hero-writing.jpg",
    }),
  );
if (!get.get("pages")) {
  try {
    const source = JSON.parse(
      await readFile(join(root, "src/data/reference-content.json"), "utf8"),
    );
    put.run("pages", JSON.stringify(source.routes));
  } catch {
    put.run("pages", "[]");
  }
}
if (!get.get("links"))
  put.run(
    "links",
    JSON.stringify([
      { label: "Home Page", url: "/" },
      { label: "Services", url: "/services/" },
      { label: "Contact Us", url: "/contact/" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61582425098619" },
      { label: "Instagram", url: "https://www.instagram.com/pillar1789/" },
      { label: "YouTube", url: "https://www.youtube.com/piller/" },
      { label: "WhatsApp", url: "https://wa.me/201144591010" },
      { label: "TikTok", url: "https://www.tiktok.com/@pillar1789" },
    ]),
  );
const password = process.env.ADMIN_PASSWORD || "change-this-admin-password";
const tokens = new Set();
function json(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  res.end(JSON.stringify(body));
}
async function body(req, limit = 2_000_000) {
  let data = "";
  for await (const chunk of req) {
    data += chunk;
    if (data.length > limit) throw new Error("PAYLOAD_LIMIT");
  }
  return JSON.parse(data || "{}");
}
function authorized(req) {
  const token = (req.headers.authorization || "").replace(/^Bearer /, "");
  return !!token && tokens.has(token);
}
function record(key) {
  return JSON.parse(get.get(key)?.value || "null");
}
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    const path = url.pathname;
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "content-type,authorization",
        "access-control-allow-methods": "GET,POST,DELETE,OPTIONS",
      });
      return res.end();
    }
    if (path === "/api/health") return json(res, 200, { ok: true, storage: "sqlite" });
    if ((path === "/api/public/settings" || path === "/api/public/content") && req.method === "GET")
      return json(
        res,
        200,
        path.endsWith("/settings")
          ? { settings: record("settings") }
          : { settings: record("settings"), pages: record("pages"), links: record("links") },
      );
    if (path === "/api/login" && req.method === "POST") {
      const { password: attempt } = await body(req, 10000);
      const a = Buffer.from(String(attempt || ""));
      const b = Buffer.from(password);
      if (a.length !== b.length || !timingSafeEqual(a, b))
        return json(res, 401, { error: "كلمة المرور غير صحيحة" });
      const token = randomUUID() + randomUUID();
      tokens.add(token);
      return json(res, 200, { token });
    }
    if (path.startsWith("/api/")) {
      if (!authorized(req)) return json(res, 401, { error: "يلزم تسجيل الدخول" });
      if (path === "/api/data" && req.method === "GET")
        return json(res, 200, {
          settings: record("settings"),
          pages: record("pages"),
          links: record("links"),
          media: db
            .prepare(
              "SELECT id,name,url,kind,created_at,external FROM media ORDER BY created_at DESC",
            )
            .all(),
        });
      if (path === "/api/settings" && req.method === "POST") {
        const value = await body(req);
        put.run("settings", JSON.stringify(value));
        return json(res, 200, { ok: true });
      }
      if (path === "/api/pages" && req.method === "POST") {
        const value = await body(req);
        if (!Array.isArray(value)) return json(res, 400, { error: "المحتوى غير صحيح" });
        put.run("pages", JSON.stringify(value));
        return json(res, 200, { ok: true });
      }
      if (path === "/api/links" && req.method === "POST") {
        const value = await body(req);
        if (!Array.isArray(value)) return json(res, 400, { error: "الروابط غير صحيحة" });
        put.run("links", JSON.stringify(value));
        return json(res, 200, { ok: true });
      }
      if (path === "/api/media" && req.method === "POST") {
        const value = await body(req, 36_000_000);
        const match = String(value.data || "").match(
          /^data:(image\/[\w.+-]+|video\/[\w.+-]+);base64,([\s\S]+)$/,
        );
        const extensions = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/webp": ".webp",
          "image/gif": ".gif",
          "video/mp4": ".mp4",
          "video/webm": ".webm",
          "video/quicktime": ".mov",
        };
        if (!match || !extensions[match[1]])
          return json(res, 400, { error: "الصيغ المقبولة: JPG وPNG وWebP وGIF وMP4 وWebM وMOV" });
        const buf = Buffer.from(match[2], "base64");
        if (buf.length > 25 * 1024 * 1024)
          return json(res, 413, { error: "الحد الأقصى 25 ميجابايت" });
        const ext = extensions[match[1]];
        const id = randomUUID();
        const name = `${id}${ext}`;
        writeFileSync(join(uploadDir, name), buf);
        const item = {
          id,
          name: String(value.name || name),
          url: `/uploads/${name}`,
          kind: match[1].startsWith("video") ? "video" : "image",
        };
        db.prepare("INSERT INTO media(id,name,url,kind) VALUES(?,?,?,?)").run(
          item.id,
          item.name,
          item.url,
          item.kind,
        );
        return json(res, 201, item);
      }
      if (path === "/api/media/link" && req.method === "POST") {
        const value = await body(req, 20000);
        let parsed;
        try {
          parsed = new URL(String(value.url || ""));
        } catch {
          return json(res, 400, { error: "أدخل رابطًا صالحًا يبدأ بـ https://" });
        }
        if (parsed.protocol !== "https:" || parsed.username || parsed.password)
          return json(res, 400, {
            error: "الرابط الخارجي يجب أن يبدأ بـ https:// ولا يحتوي بيانات دخول",
          });
        const ext = extname(parsed.pathname).toLowerCase();
        const video = [".mp4", ".webm", ".mov"].includes(ext);
        const id = randomUUID();
        const item = {
          id,
          name: String(value.name || basename(parsed.pathname) || parsed.hostname).slice(0, 200),
          url: parsed.href,
          kind: video ? "video" : "image",
          external: true,
        };
        db.prepare("INSERT INTO media(id,name,url,kind,external) VALUES(?,?,?,?,1)").run(
          item.id,
          item.name,
          item.url,
          item.kind,
        );
        return json(res, 201, item);
      }
      if (path.startsWith("/api/media/") && req.method === "DELETE") {
        const id = path.split("/").pop();
        const item = db.prepare("SELECT * FROM media WHERE id=?").get(id);
        if (item) {
          if (!item.external) {
            try {
              await import("node:fs/promises").then((fs) =>
                fs.unlink(join(uploadDir, basename(item.url))),
              );
            } catch {}
          }
          db.prepare("DELETE FROM media WHERE id=?").run(id);
        }
        return json(res, 200, { ok: true });
      }
      return json(res, 404, { error: "غير موجود" });
    }
    if (path.startsWith("/uploads/")) {
      const file = join(uploadDir, basename(path));
      try {
        const st = await import("node:fs/promises").then((fs) => fs.stat(file));
        const ext = extname(file).toLowerCase();
        const mime =
          {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".mp4": "video/mp4",
            ".webm": "video/webm",
            ".mov": "video/quicktime",
          }[ext] || "application/octet-stream";
        res.writeHead(200, {
          "content-type": mime,
          "content-length": st.size,
          "cache-control": "public,max-age=31536000,immutable",
        });
        return createReadStream(file).pipe(res);
      } catch {
        return json(res, 404, { error: "الملف غير موجود" });
      }
    }
    return json(res, 404, { error: "غير موجود" });
  } catch (e) {
    console.error(e);
    return json(res, e.message === "PAYLOAD_LIMIT" ? 413 : 500, {
      error: e.message === "PAYLOAD_LIMIT" ? "حجم البيانات كبير" : "حدث خطأ في الخادم",
    });
  }
});
const port = Number(process.env.API_PORT || 4174);
server.listen(port, "0.0.0.0", () =>
  console.log(
    `Pillar SQLite API listening on http://localhost:${port}; ${process.env.ADMIN_PASSWORD ? "custom admin password configured" : "WARNING: set ADMIN_PASSWORD before exposing this service"}`,
  ),
);
