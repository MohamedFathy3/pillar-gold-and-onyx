const $ = (s, p = document) => p.querySelector(s),
  $$ = (s, p = document) => [...p.querySelectorAll(s)];
let token = sessionStorage.getItem("pillar-admin-token") || "",
  state = { settings: {}, pages: [], links: [], media: [] };
const titles = {
  overview: "نظرة عامة",
  appearance: "الهوية واللوجو",
  content: "الصفحات واللغات",
  media: "مكتبة الصور والفيديو",
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
  setTimeout(() => n.classList.add("hidden"), 3500);
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
    "defaultLanguage",
    "logoUrl",
    "heroTitle",
    "heroTitleAr",
    "heroSubtitle",
    "heroSubtitleAr",
    "heroImage",
  ])
    f.elements[k].value = state.settings[k] || "";
}
$("#appearance-form").onsubmit = async (e) => {
  e.preventDefault();
  const data = { ...state.settings, ...Object.fromEntries(new FormData(e.currentTarget)) };
  try {
    await api("settings", { method: "POST", body: JSON.stringify(data) });
    state.settings = data;
    toast("تم حفظ إعدادات الموقع واللوجو");
  } catch (x) {
    toast(x.message, true);
  }
};
function renderPages() {
  const sel = $("#page-select"),
    old = sel.value;
  sel.innerHTML = state.pages
    .map(
      (p, i) =>
        `<option value="${i}">${esc(p.title || p.slug || `صفحة ${i + 1}`)} — ${esc(p.slug || "")}</option>`,
    )
    .join("");
  if (old && Number(old) < state.pages.length) sel.value = old;
  drawPage();
}
function drawPage() {
  const p = state.pages[Number($("#page-select").value) || 0],
    box = $("#page-editor");
  if (!p) {
    box.innerHTML = "<p>لا توجد صفحات قابلة للتحرير.</p>";
    return;
  }
  box.innerHTML = `<label>عنوان الصفحة — English<input data-field="title" value="${attr(p.title || "")}"></label><label>عنوان الصفحة — العربية<input dir="rtl" data-field="titleAr" value="${attr(p.titleAr || "")}"></label><label>المسار<input data-field="slug" value="${attr(p.slug || "")}" disabled></label><label>وصف الصفحة — English<textarea data-field="description" rows="3">${esc(p.description || "")}</textarea></label><label class="span-2">وصف الصفحة — العربية<textarea dir="rtl" data-field="descriptionAr" rows="3">${esc(p.descriptionAr || "")}</textarea></label><label class="span-2">صورة الصفحة الرئيسية / الغلاف<div class="image-field"><input data-field="featureImage" value="${attr(p.featureImage || p.images?.find((i) => i.src)?.src || "")}" placeholder="/uploads/image.jpg أو https://..."><button type="button" class="pick-image" data-target="featureImage">اختيار صورة من الجهاز</button><input class="hidden-file" type="file" data-image-picker="featureImage" accept="image/jpeg,image/png,image/webp,image/gif"></div></label><label class="span-2">محتوى الصفحة — English (JSON)<textarea data-field="blocks" rows="10">${esc(JSON.stringify(p.blocks || [], null, 2))}</textarea><span class="inline-upload"><button type="button" class="pick-image" data-target="blocks">رفع صورة وإضافتها للمحتوى الإنجليزي</button><input class="hidden-file" type="file" data-image-picker="blocks" accept="image/jpeg,image/png,image/webp,image/gif"></span></label><label class="span-2">محتوى الصفحة — العربية (JSON)<textarea dir="rtl" data-field="blocksAr" rows="10">${esc(JSON.stringify(p.blocksAr || [], null, 2))}</textarea><small>نفس بنية المحتوى الإنجليزي؛ اتركه فارغًا لاستخدام المحتوى الإنجليزي.</small><span class="inline-upload"><button type="button" class="pick-image" data-target="blocksAr">رفع صورة وإضافتها للمحتوى العربي</button><input class="hidden-file" type="file" data-image-picker="blocksAr" accept="image/jpeg,image/png,image/webp,image/gif"></span></label><label class="span-2">روابط الصفحة (JSON)<textarea data-field="links" rows="4">${esc(JSON.stringify(p.links || [], null, 2))}</textarea></label>`;
}
$("#page-select").onchange = drawPage;
$("#save-page").onclick = async () => {
  const p = state.pages[Number($("#page-select").value) || 0];
  if (!p) return;
  try {
    p.title = $("[data-field=title]").value;
    p.titleAr = $("[data-field=titleAr]").value;
    p.description = $("[data-field=description]").value;
    p.descriptionAr = $("[data-field=descriptionAr]").value;
    p.featureImage = $("[data-field=featureImage]").value.trim();
    p.blocks = JSON.parse($("[data-field=blocks]").value);
    const ar = $("[data-field=blocksAr]").value.trim();
    p.blocksAr = ar ? JSON.parse(ar) : [];
    p.links = JSON.parse($("[data-field=links]").value);
    await api("pages", { method: "POST", body: JSON.stringify(state.pages) });
    toast("تم حفظ الصفحة وترجماتها وصورتها في SQLite");
  } catch (e) {
    toast(e instanceof SyntaxError ? "تحقق من صيغة JSON للمحتوى أو الروابط" : e.message, true);
  }
};
function renderMedia() {
  const box = $("#media-list");
  box.innerHTML =
    state.media
      .map(
        (m) =>
          `<article class="media-item">${m.kind === "video" ? `<video src="${attr(m.url)}" controls></video>` : `<img src="${attr(m.url)}" alt="">`}<p>${esc(m.name)}</p><div class="media-url"><input readonly value="${attr(m.url)}"><button type="button" data-copy="${attr(m.url)}">نسخ الرابط</button></div>${m.external ? "<small>رابط خارجي</small>" : ""}<button type="button" data-delete="${attr(m.id)}">حذف</button></article>`,
      )
      .join("") || '<div class="card">لم تضف أي وسائط حتى الآن.</div>';
  $$("[data-copy]", box).forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await navigator.clipboard.writeText(new URL(b.dataset.copy, location.origin).href);
          toast("تم نسخ رابط الملف");
        } catch {
          toast(b.dataset.copy);
        }
      }),
  );
  $$("[data-delete]", box).forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("حذف هذا الملف من المكتبة؟")) return;
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
    toast("الحد الأقصى 25 ميجابايت", true);
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
    toast("تم رفع الصورة إلى مكتبة الوسائط");
  } catch (x) {
    toast(x.message, true);
  }
};
$("#add-media-url").onsubmit = async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.currentTarget));
  try {
    const item = await api("media/link", { method: "POST", body: JSON.stringify(d) });
    state.media.unshift(item);
    renderMedia();
    $("#media-count").textContent = state.media.length;
    e.currentTarget.reset();
    toast("تمت إضافة الرابط إلى مكتبة الوسائط");
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
  state.links.push(Object.fromEntries(new FormData(e.currentTarget)));
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
    toast("تم حفظ الروابط");
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
document.addEventListener("click", (event) => {
  const button = event.target.closest(".pick-image");
  if (!button) return;
  const picker = document.querySelector(
    `[data-image-picker="${CSS.escape(button.dataset.target)}"]`,
  );
  picker?.click();
});
document.addEventListener("change", async (event) => {
  const picker = event.target.closest("[data-image-picker]");
  const file = picker?.files?.[0];
  if (!picker || !file) return;
  if (file.size > 25 * 1024 * 1024) {
    toast("الحد الأقصى لحجم الصورة 25 ميجابايت", true);
    picker.value = "";
    return;
  }
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const item = await api("media", {
      method: "POST",
      body: JSON.stringify({ name: file.name, data }),
    });
    state.media.unshift(item);
    renderMedia();
    $("#media-count").textContent = state.media.length;
    const target = picker.dataset.imagePicker;
    if (target === "blocks" || target === "blocksAr") {
      const textarea = $(`[data-field="${target}"]`);
      const blocks = textarea.value.trim() ? JSON.parse(textarea.value) : [];
      if (!Array.isArray(blocks)) throw Error("صيغة محتوى الصفحة يجب أن تكون قائمة JSON");
      blocks.push({ type: "image", src: item.url, alt: file.name });
      textarea.value = JSON.stringify(blocks, null, 2);
      toast("تم رفع الصورة وإضافتها للمحتوى. اضغط حفظ الصفحة لتثبيتها.");
    } else {
      const input =
        target === "featureImage"
          ? $(`[data-field="${target}"]`)
          : $(`#appearance-form [name="${CSS.escape(target)}"]`);
      if (input) input.value = item.url;
      toast("تم رفع الصورة. اضغط حفظ الإعدادات أو حفظ الصفحة لتطبيقها.");
    }
  } catch (error) {
    toast(error.message || "تعذر رفع الصورة", true);
  } finally {
    picker.value = "";
  }
});
if (token) init();
else loginView();
