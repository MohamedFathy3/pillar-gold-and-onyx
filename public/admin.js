const $ = (s, p = document) => p.querySelector(s),
  $$ = (s, p = document) => [...p.querySelectorAll(s)];
let token = sessionStorage.getItem("pillar-admin-token") || "",
  state = { settings: {}, pages: [], links: [], media: [] };
const titles = {
  overview: "نظرة عامة",
  appearance: "الألوان والخطوط",
  content: "المحتوى والصفحات",
  media: "الصور والفيديو",
  links: "الروابط",
};
async function api(path, options = {}) {
  const res = await fetch("/api/" + path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    logout();
    throw Error(data.error || "انتهت الجلسة");
  }
  if (!res.ok) throw Error(data.error || "تعذر إتمام العملية");
  return data;
}
function toast(text, bad = false) {
  const n = $("#notice");
  n.textContent = text;
  n.classList.toggle("bad", bad);
  n.classList.remove("hidden");
  setTimeout(() => n.classList.add("hidden"), 3200);
}
function loginView() {
  $("#login").classList.remove("hidden");
  $("#app").classList.add("hidden");
}
function logout() {
  token = "";
  sessionStorage.removeItem("pillar-admin-token");
  loginView();
}
$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("#login-error").textContent = "";
  try {
    const d = await api("login", {
      method: "POST",
      body: JSON.stringify({ password: $("#password").value }),
    });
    token = d.token;
    sessionStorage.setItem("pillar-admin-token", token);
    $("#password").value = "";
    await init();
  } catch (err) {
    $("#login-error").textContent = err.message;
  }
});
$("#logout").onclick = logout;
function openTab(name) {
  $$(".nav-item").forEach((x) => x.classList.toggle("active", x.dataset.tab === name));
  $$(".panel").forEach((x) => x.classList.toggle("active", x.id === `tab-${name}`));
  $("#page-title").textContent = titles[name] || name;
}
$("#nav").addEventListener("click", (e) => {
  const b = e.target.closest("[data-tab]");
  if (b) openTab(b.dataset.tab);
});
$$("[data-jump]").forEach((b) => (b.onclick = () => openTab(b.dataset.jump)));
async function init() {
  try {
    state = await api("data");
    $("#login").classList.add("hidden");
    $("#app").classList.remove("hidden");
    render();
  } catch (e) {
    if (token) toast(e.message, true);
  }
}
function render() {
  $("#page-count").textContent = state.pages.length;
  $("#media-count").textContent = state.media.length;
  $("#link-count").textContent = state.links.length;
  renderSettings();
  renderPages();
  renderMedia();
  renderLinks();
}
function renderSettings() {
  const f = $("#appearance-form");
  for (const k of [
    "primary",
    "gold",
    "background",
    "text",
    "font",
    "heroTitle",
    "heroSubtitle",
    "heroImage",
  ])
    f.elements[k].value = state.settings[k] || "";
}
$("#appearance-form").onsubmit = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  try {
    await api("settings", { method: "POST", body: JSON.stringify(data) });
    state.settings = data;
    toast("تم حفظ إعدادات الهوية في SQLite");
  } catch (x) {
    toast(x.message, true);
  }
};
function renderPages() {
  const sel = $("#page-select");
  const old = sel.value;
  sel.innerHTML = state.pages
    .map((p, i) => `<option value="${i}">${esc(p.title || p.slug || `صفحة ${i + 1}`)}</option>`)
    .join("");
  if (old && Number(old) < state.pages.length) sel.value = old;
  drawPage();
}
function drawPage() {
  const p = state.pages[Number($("#page-select").value) || 0];
  const box = $("#page-editor");
  if (!p) {
    box.innerHTML = "<p>لا توجد صفحات قابلة للتحرير.</p>";
    return;
  }
  box.innerHTML = `<label>عنوان الصفحة<input data-field="title" value="${attr(p.title || "")}"></label><label>المسار<input data-field="slug" value="${attr(p.slug || "")}" disabled></label><label class="span-2">وصف الصفحة<textarea data-field="description" rows="3">${esc(p.description || "")}</textarea></label><label class="span-2">نصوص الصفحة (JSON، قابل للتحرير)<textarea data-field="blocks" rows="12">${esc(JSON.stringify(p.blocks || [], null, 2))}</textarea></label><label class="span-2">الروابط (JSON)<textarea data-field="links" rows="5">${esc(JSON.stringify(p.links || [], null, 2))}</textarea></label>`;
}
$("#page-select").onchange = drawPage;
$("#save-page").onclick = async () => {
  const p = state.pages[Number($("#page-select").value) || 0];
  if (!p) return;
  try {
    p.title = $("[data-field=title]").value;
    p.description = $("[data-field=description]").value;
    p.blocks = JSON.parse($("[data-field=blocks]").value);
    p.links = JSON.parse($("[data-field=links]").value);
    await api("pages", { method: "POST", body: JSON.stringify(state.pages) });
    toast("تم حفظ محتوى الصفحات في SQLite");
  } catch (e) {
    toast(e instanceof SyntaxError ? "تحقق من صحة JSON في المحتوى أو الروابط" : e.message, true);
  }
};
function renderMedia() {
  const box = $("#media-list");
  box.innerHTML =
    state.media
      .map(
        (m) =>
          `<article class="media-item">${m.kind === "video" ? `<video src="${attr(m.url)}" controls></video>` : `<img src="${attr(m.url)}" alt="">`}<p>${esc(m.name)}</p><a href="${attr(m.url)}" target="_blank">${esc(m.url)}</a><button data-delete="${attr(m.id)}">حذف</button></article>`,
      )
      .join("") || '<div class="card">لم ترفع أي ملفات حتى الآن.</div>';
  $$("[data-delete]", box).forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("حذف هذا الملف؟")) return;
        try {
          await api(`media/${b.dataset.delete}`, { method: "DELETE" });
          state.media = state.media.filter((x) => x.id !== b.dataset.delete);
          renderMedia();
          $("#media-count").textContent = state.media.length;
          toast("تم حذف الملف");
        } catch (e) {
          toast(e.message, true);
        }
      }),
  );
}
$("#upload-form").onsubmit = async (e) => {
  e.preventDefault();
  const file = $("#media-file").files[0];
  if (!file) return;
  if (file.size > 25 * 1024 * 1024) {
    toast("حجم الملف أكبر من 25 ميجابايت", true);
    return;
  }
  try {
    const data = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    const item = await api("media", {
      method: "POST",
      body: JSON.stringify({ name: file.name, data }),
    });
    state.media.unshift(item);
    renderMedia();
    $("#media-count").textContent = state.media.length;
    e.target.reset();
    toast("تم رفع الملف وحفظه");
  } catch (x) {
    toast(x.message, true);
  }
};
function renderLinks() {
  const box = $("#links-list");
  box.innerHTML =
    state.links
      .map(
        (l, i) =>
          `<div class="link-row" data-row="${i}"><input data-key="label" value="${attr(l.label || "")}"><input data-key="url" value="${attr(l.url || "")}"><button type="button" data-remove="${i}">حذف</button></div>`,
      )
      .join("") || "<p>لا توجد روابط.</p>";
  $$("[data-remove]", box).forEach(
    (b) =>
      (b.onclick = () => {
        state.links.splice(Number(b.dataset.remove), 1);
        renderLinks();
      }),
  );
}
$("#add-link").onsubmit = (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.currentTarget));
  state.links.push(d);
  e.currentTarget.reset();
  renderLinks();
};
$("#save-links").onclick = async () => {
  try {
    const links = $$(".link-row").map((r) => ({
      label: $("[data-key=label]", r).value,
      url: $("[data-key=url]", r).value,
    }));
    await api("links", { method: "POST", body: JSON.stringify(links) });
    state.links = links;
    $("#link-count").textContent = links.length;
    toast("تم حفظ الروابط في SQLite");
  } catch (e) {
    toast(e.message, true);
  }
};
function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}
function attr(s) {
  return esc(s);
}
if (token) init();
else loginView();
