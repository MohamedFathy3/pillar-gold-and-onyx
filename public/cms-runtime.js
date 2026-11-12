(() => {
  const safeUrl = (value) => {
    const url = String(value || "").trim();
    return url.startsWith("/") || /^https:\/\//i.test(url) ? url : "";
  };
  const translations = {
    "Home Page": "الرئيسية",
    Services: "خدماتنا",
    "All Services": "كل الخدمات",
    "Why Pillar Group": "لماذا مجموعة بيلار",
    "About Pillar Group": "عن مجموعة بيلار",
    "Contact Us": "اتصل بنا",
    "Contact us": "تواصل معنا",
    "Privacy Policy": "سياسة الخصوصية",
    "Our Service": "خدماتنا",
    "Our Services": "خدماتنا",
    "Other Services": "خدمات أخرى",
    "Beyond the numbers": "أكثر من مجرد أرقام",
    "Why Clients Trust Us": "لماذا يثق بنا عملاؤنا",
    "Professional insight.": "خبرة مهنية.",
    "Personal commitment.": "التزام شخصي.",
    "Partnerships built on trust": "شراكات مبنية على الثقة",
    "Our Key Clients": "أهم عملائنا",
    "Supporting ambitious businesses across industries.": "ندعم الشركات الطموحة في مختلف القطاعات.",
    "GET YOUR CONSULTATION NOW": "احصل على استشارتك الآن",
    "Get your": "احصل على",
    "consultation now.": "استشارتك الآن.",
    "Ready to Get Expert Support?": "هل تحتاج إلى دعم الخبراء؟",
    "Request Your Consultation Below.": "اطلب استشارتك من هنا.",
    "Get In Touch": "تواصل معنا",
    "Send us a message": "أرسل لنا رسالة",
    "Your name": "اسمك",
    Message: "الرسالة",
    "How can we help?": "كيف يمكننا مساعدتك؟",
    "Send another message": "أرسل رسالة أخرى",
    Send: "إرسال",
    "Follow us": "تابعنا",
    Explore: "اكتشف",
    "Our services": "خدماتنا",
    "Get in touch": "تواصل معنا",
    "We are here to support your business growth.": "نحن هنا لدعم نمو أعمالك.",
    "Empowering your business with precise, reliable, and strategic financial solutions.":
      "ندعم أعمالك بحلول مالية دقيقة وموثوقة واستراتيجية.",
    "Professional advisory services": "خدمات استشارية احترافية",
    "Request a consultation": "اطلب استشارة",
    "Request your consultation": "اطلب استشارتك",
    "Facing Challenges with Government Procedures & Compliance?":
      "تواجه تحديات في الإجراءات الحكومية والامتثال؟",
    "Government procedures,": "الإجراءات الحكومية،",
    "handled with care.": "نتولاها بعناية.",
    "Our Key Clients": "أهم عملائنا",
    "Start your own business": "ابدأ مشروعك الخاص",
  };
  function applyTranslations() {
    const locale = localStorage.getItem("pillar-language") || "en";
    const arabic = locale === "ar";
    document.documentElement.lang = locale;
    document.documentElement.dir = arabic ? "rtl" : "ltr";
    document.body.classList.toggle("pillar-arabic", arabic);
    document.querySelectorAll(".pillar-language-toggle").forEach((button) => {
      button.textContent = arabic ? "English" : "العربية";
      button.setAttribute("aria-label", arabic ? "Switch to English" : "التبديل إلى العربية");
    });
    const data = window.__pillarCms;
    if (!data) return;
    const path = location.pathname.replace(/^\/+|\/+$/g, "");
    const page = (data.pages || []).find((item) => item.slug === path);
    if (page) {
      const h = document.querySelector(".inner-page-hero h1,.service-detail-hero h1");
      if (h) h.textContent = (arabic && page.titleAr) || page.title || h.textContent;
      const summary = document.querySelector(
        ".inner-page-hero__summary,.service-detail-hero__copy>p:not(.section-kicker)",
      );
      if (summary)
        summary.textContent =
          (arabic && page.descriptionAr) || page.description || summary.textContent;
      const blocks =
        arabic && Array.isArray(page.blocksAr) && page.blocksAr.length
          ? page.blocksAr
          : page.blocks;
      const article = document.querySelector(".reference-article");
      if (article && Array.isArray(blocks)) article.replaceChildren(...blocks.map(makeBlock));
      const lead = safeUrl(page.featureImage || page.images?.find((image) => image.src)?.src);
      if (lead) {
        const image = document.querySelector(
          ".service-detail-hero__image img,.generic-page-sidebar img",
        );
        if (image) image.src = lead;
        const hero = document.querySelector(".inner-page-hero");
        if (hero)
          hero.style.backgroundImage = `linear-gradient(90deg, oklch(0.18 0.02 49 / 95%), oklch(0.18 0.02 49 / 78%) 50%, oklch(0.18 0.02 49 / 38%)), url("${lead.replaceAll('"', "%22")}")`;
      }
    }
    if (arabic) {
      const titleTranslations = new Map(
        (data.pages || [])
          .filter((item) => item.title && item.titleAr)
          .map((item) => [item.title, item.titleAr]),
      );
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.nodeValue?.trim();
        if (text && titleTranslations.has(text))
          node.nodeValue = node.nodeValue.replace(text, titleTranslations.get(text));
      }
    }
    if (location.pathname === "/" || location.pathname === "") {
      const title = document.querySelector(".pillar-hero__content .pillar-eyebrow");
      if (title)
        title.textContent =
          (arabic && data.settings.heroTitleAr) || data.settings.heroTitle || title.textContent;
      const heroContent = document.querySelector(".pillar-hero__content");
      const logoImage = heroContent?.querySelector(".pillar-hero__logo");
      if (
        heroContent &&
        logoImage &&
        (data.settings.heroSubtitle || data.settings.heroSubtitleAr)
      ) {
        let heroCopy = heroContent.querySelector(".pillar-hero-description");
        if (!heroCopy) {
          heroCopy = document.createElement("p");
          heroCopy.className = "pillar-hero-description";
          heroContent.insertBefore(heroCopy, logoImage.nextSibling);
        }
        heroCopy.textContent =
          (arabic && data.settings.heroSubtitleAr) || data.settings.heroSubtitle || "";
      }
      for (const servicePage of data.pages || []) {
        if (!servicePage.featureImage) continue;
        const card = document.querySelector(
          `a.service-photo[href="/${CSS.escape(servicePage.slug)}/"] img`,
        );
        if (card) card.src = safeUrl(servicePage.featureImage) || card.src;
      }
    }
    for (const link of data.links || []) {
      if (!link.label || !link.url) continue;
      const href = safeUrl(link.url) || (/^(mailto:|tel:)/i.test(link.url) ? link.url : "");
      if (!href) continue;
      for (const anchor of document.querySelectorAll("a"))
        if (anchor.textContent.trim().toLowerCase() === link.label.trim().toLowerCase())
          anchor.href = href;
    }
    const dict = arabic ? translations : null;
    if (dict) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        const text = node.nodeValue?.trim();
        if (text && dict[text]) node.nodeValue = node.nodeValue.replace(text, dict[text]);
      }
    }
  }
  function makeBlock(block) {
    let el;
    if (block.type === "heading") el = document.createElement(block.level <= 2 ? "h2" : "h3");
    else if (block.type === "paragraph") el = document.createElement("p");
    else if (block.type === "quote") el = document.createElement("blockquote");
    else if (block.type === "image") {
      el = document.createElement("figure");
      const img = document.createElement("img");
      img.src = safeUrl(block.src);
      img.alt = block.alt || "";
      el.append(img);
      return el;
    } else if (block.type === "list") {
      el = document.createElement(block.ordered ? "ol" : "ul");
      for (const text of block.items || []) {
        const li = document.createElement("li");
        li.textContent = text;
        el.append(li);
      }
      return el;
    } else return document.createElement("span");
    el.textContent = block.text || "";
    return el;
  }
  function install(data) {
    window.__pillarCms = data;
    const s = data.settings || {},
      root = document.documentElement;
    const color = (key, variable) => {
      if (/^#[\da-f]{3,8}$/i.test(s[key] || "")) root.style.setProperty(variable, s[key]);
    };
    color("primary", "--primary");
    color("gold", "--pillar-gold");
    color("gold", "--pillar-gold-soft");
    color("background", "--background");
    color("background", "--pillar-white");
    color("text", "--foreground");
    if (typeof s.font === "string" && /^[\w\s,'-]{1,80}$/.test(s.font))
      root.style.setProperty("--font-sans", s.font);
    const logo = safeUrl(s.logoUrl);
    if (logo)
      document
        .querySelectorAll(".pillar-brand img,.pillar-footer__brand img,.pillar-hero__logo")
        .forEach((img) => {
          img.src = logo;
        });
    const hero = document.querySelector(".pillar-hero");
    const heroImg = safeUrl(s.heroImage);
    if (hero && heroImg) {
      const img = hero.querySelector(".pillar-hero__photo");
      if (img) img.src = heroImg;
    }
    if (!document.querySelector(".pillar-language-toggle")) {
      const header = document.querySelector(".pillar-header");
      if (header) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pillar-language-toggle";
        button.style.cssText =
          "border:1px solid currentColor;background:transparent;color:inherit;padding:6px 10px;cursor:pointer;font:inherit;font-size:12px;margin-inline:8px";
        button.onclick = () => {
          const current = localStorage.getItem("pillar-language") || s.defaultLanguage || "en";
          localStorage.setItem("pillar-language", current === "ar" ? "en" : "ar");
          location.reload();
        };
        header.append(button);
      }
    }
    if (!localStorage.getItem("pillar-language") && s.defaultLanguage)
      localStorage.setItem("pillar-language", s.defaultLanguage);
    applyTranslations();
  }
  fetch("/api/public/content")
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (data) install(data);
    })
    .catch(() => {});
})();
