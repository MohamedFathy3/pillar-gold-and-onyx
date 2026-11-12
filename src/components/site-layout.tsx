import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  ChevronDown,
  X,
} from "lucide-react";
import { allServicePages, primaryNavigation } from "@/data/site";
import { useSiteLanguage } from "@/lib/i18n";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/THDcertifiedaccountant", icon: Facebook },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thdcertifiedaccountant/",
    icon: Instagram,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@thd_certifiedaccountant", icon: Music2 },
  { label: "WhatsApp", href: "https://wa.me/201094866609", icon: MessageCircle },
];

export function THDWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "thd-wordmark thd-wordmark--compact" : "thd-wordmark"}
      aria-label="THD Certified Accountant"
    >
      <strong>THD</strong>
      <small>Certified Accountant</small>
    </span>
  );
}

export function SiteHeader({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { language, setLanguage, copy } = useSiteLanguage();
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`pillar-header ${variant === "solid" ? "pillar-header--solid" : ""}`}>
      <a className="pillar-brand" href="/" aria-label="THD Certified Accountant home">
        <THDWordmark />
      </a>
      <button
        className="pillar-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav className={menuOpen ? "pillar-nav is-open" : "pillar-nav"} aria-label="Main navigation">
        <a href="/" onClick={closeMenu}>
          {copy.nav.home}
        </a>
        <div className="pillar-nav__service-group">
          <a href="/services/" onClick={closeMenu}>
            {copy.nav.services}
          </a>
          <details
            className="service-dropdown"
            open={servicesOpen}
            onToggle={(event) => setServicesOpen(event.currentTarget.open)}
          >
            <summary aria-label={copy.nav.services}>
              <ChevronDown size={14} />
            </summary>
            <div className="service-dropdown__panel">
              <a href="/services/" onClick={closeMenu}>
                {copy.allServices}
              </a>
              {allServicePages.map((service) => (
                <a href={`/${service.slug}/`} key={service.slug} onClick={closeMenu}>
                  {language === "ar" ? service.arTitle : service.title}
                </a>
              ))}
            </div>
          </details>
        </div>
        {primaryNavigation.slice(2).map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {language === "ar" ? item.arLabel : item.label}
          </a>
        ))}
        <button
          className="language-switch"
          type="button"
          onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          aria-label={`Switch to ${copy.language}`}
        >
          {copy.language}
        </button>
      </nav>
      <div className="pillar-header-socials" aria-label="Social media">
        {socials.slice(0, 3).map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
            <Icon size={15} />
          </a>
        ))}
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { copy } = useSiteLanguage();
  return (
    <footer className="pillar-footer">
      <div className="pillar-footer__top">
        <div className="pillar-footer__brand">
          <a href="/" aria-label="THD Certified Accountant home">
            <THDWordmark />
          </a>
          <p>{copy.footerText}</p>
        </div>
        <div className="pillar-footer__contact">
          <p className="section-kicker">{copy.getInTouch}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=31+El+Obour+Buildings+Salah+Salem+Cairo"
            target="_blank"
            rel="noreferrer"
          >
            {copy.address}
          </a>
          <a href="tel:+201094866609">{copy.phone}</a>
          <a href="https://wa.me/201094866609" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <div className="pillar-footer__nav">
          <p className="section-kicker">{copy.explore}</p>
          {primaryNavigation.map((item) => (
            <a href={item.href} key={item.href}>
              {
                copy.nav[
                  item.href === "/"
                    ? "home"
                    : item.href === "/services/"
                      ? "services"
                      : item.href === "/why-us/"
                        ? "why"
                        : item.href === "/about/"
                          ? "about"
                          : "contact"
                ]
              }
            </a>
          ))}
        </div>
        <div className="pillar-footer__social">
          <p className="section-kicker">{copy.follow}</p>
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={15} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="pillar-footer__bottom">
        <span>© 2026 THD Certified Accountant. All rights reserved.</span>
        <a href="/privacy-policy/">
          Privacy Policy <ArrowUpRight />
        </a>
      </div>
    </footer>
  );
}

export function ContactForm({
  className = "contact-form",
  kicker,
  heading,
}: {
  className?: string;
  kicker?: string;
  heading?: string;
}) {
  const { copy } = useSiteLanguage();
  const [sent, setSent] = useState(false);
  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Name: ${String(formData.get("name") ?? "")}`,
      `Email: ${String(formData.get("email") ?? "")}`,
      `Message: ${String(formData.get("message") ?? "")}`,
    ].join("\n");
    window.open(
      `https://wa.me/201094866609?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }
  return (
    <form className={className} onSubmit={submitMessage}>
      <p className="section-kicker">{kicker ?? copy.formKicker}</p>
      <h3>{heading ?? copy.formTitle}</h3>
      <label>
        {copy.name}
        <input required name="name" autoComplete="name" placeholder={copy.namePlaceholder} />
      </label>
      <label>
        {copy.email}
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
        />
      </label>
      <label>
        {copy.message}
        <textarea required name="message" rows={4} placeholder={copy.messagePlaceholder} />
      </label>
      <button className="pillar-button-gold" type="submit">
        {sent ? copy.sent : copy.send}
        <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
