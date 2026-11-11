(() => {
  const validColor = (x) => /^#[\da-f]{3,8}$/i.test(x || "");
  fetch("/api/public/content")
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data) return;
      const s = data.settings || {},
        root = document.documentElement;
      if (validColor(s.primary)) root.style.setProperty("--primary", s.primary);
      if (validColor(s.gold)) {
        root.style.setProperty("--pillar-gold", s.gold);
        root.style.setProperty("--pillar-gold-soft", s.gold);
      }
      if (validColor(s.background)) {
        root.style.setProperty("--background", s.background);
        root.style.setProperty("--pillar-white", s.background);
      }
      if (validColor(s.text)) root.style.setProperty("--foreground", s.text);
      if (typeof s.font === "string" && /^[\w\s,'-]{1,80}$/.test(s.font))
        root.style.setProperty("--font-sans", s.font);
      const hero = document.querySelector(".pillar-hero");
      if (hero && s.heroImage) {
        const image = String(s.heroImage).trim();
        if (image.startsWith("/") || /^https:\/\//i.test(image)) {
          const img = hero.querySelector(".pillar-hero__photo");
          if (img) img.src = image;
        }
      }
      const title = document.querySelector(".pillar-hero__content .pillar-eyebrow");
      if (title && s.heroTitle) title.textContent = s.heroTitle;
      const path = location.pathname.replace(/^\/+|\/+$/g, "");
      const page = (data.pages || []).find((p) => p.slug === path);
      if (page) {
        const h = document.querySelector(".inner-page-hero h1,.service-detail-hero h1");
        if (h && page.title) h.textContent = page.title;
        const summary = document.querySelector(
          ".inner-page-hero__summary,.service-detail-hero__copy>p:not(.section-kicker)",
        );
        const intro = (page.blocks || []).find((b) => b.type === "paragraph");
        if (summary && intro) summary.textContent = intro.text;
        const article = document.querySelector(".reference-article");
        if (article && Array.isArray(page.blocks)) {
          article.replaceChildren(
            ...page.blocks.map((b) => {
              let el;
              if (b.type === "heading") el = document.createElement(b.level <= 2 ? "h2" : "h3");
              else if (b.type === "paragraph") el = document.createElement("p");
              else if (b.type === "quote") el = document.createElement("blockquote");
              else if (b.type === "image") {
                el = document.createElement("figure");
                const img = document.createElement("img");
                img.src = b.src || "";
                img.alt = b.alt || page.title;
                el.append(img);
                return el;
              } else if (b.type === "list") {
                el = document.createElement(b.ordered ? "ol" : "ul");
                for (const text of b.items || []) {
                  const li = document.createElement("li");
                  li.textContent = text;
                  el.append(li);
                }
                return el;
              } else return document.createElement("span");
              el.textContent = b.text || "";
              return el;
            }),
          );
        }
      }
      for (const link of data.links || []) {
        if (
          !link.label ||
          !link.url ||
          !(
            link.url.startsWith("/") ||
            /^https:\/\//i.test(link.url) ||
            /^mailto:|^tel:/i.test(link.url)
          )
        )
          continue;
        for (const a of document.querySelectorAll("a"))
          if (a.textContent.trim().toLowerCase() === link.label.trim().toLowerCase())
            a.href = link.url;
      }
    })
    .catch(() => {});
})();
