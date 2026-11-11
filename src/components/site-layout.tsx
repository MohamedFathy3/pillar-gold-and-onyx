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
  Youtube,
} from "lucide-react";
import { allServicePages } from "@/data/site";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582425098619", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/pillar1789/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/piller/", icon: Youtube },
  { label: "WhatsApp", href: "https://wa.me/201144591010", icon: MessageCircle },
  { label: "TikTok", href: "https://www.tiktok.com/@pillar1789", icon: Music2 },
];

const primaryLinks = [
  { label: "Home Page", href: "/" },
  { label: "Why Pillar Group", href: "/why-us/" },
  { label: "About Pillar Group", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];

export function SiteHeader({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`pillar-header ${variant === "solid" ? "pillar-header--solid" : ""}`}>
      <a className="pillar-brand" href="/" aria-label="Pillar Group home">
        <img src="/images/pillar/pillar-logo.png" alt="Pillar Group" />
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
        <a href="/" onClick={closeMenu}>Home Page</a>
        <div className="pillar-nav__service-group">
          <a href="/services/" onClick={closeMenu}>Services</a>
          <details className="service-dropdown">
            <summary aria-label="Browse individual services"><ChevronDown size={14} /></summary>
            <div className="service-dropdown__panel">
              <a href="/services/" onClick={closeMenu}>All Services</a>
              {allServicePages.map((service) => (
                <a href={`/${service.slug}/`} key={service.slug} onClick={closeMenu}>{service.title}</a>
              ))}
            </div>
          </details>
        </div>
        {primaryLinks.slice(1).map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
        ))}
      </nav>
      <div className="pillar-header-socials" aria-label="Social media">
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
            <Icon size={15} />
          </a>
        ))}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="pillar-footer">
      <div className="pillar-footer__top">
        <div className="pillar-footer__brand">
          <a href="/" aria-label="Pillar Group home"><img src="/images/pillar/pillar-logo.png" alt="Pillar Group" /></a>
          <p>Professional financial and tax advisory services for businesses in Egypt.</p>
        </div>
        <div className="pillar-footer__contact">
          <p className="section-kicker">Get in touch</p>
          <a href="https://maps.app.goo.gl/Xdnarm5wmcf3JqdT9" target="_blank" rel="noreferrer">
            31 El Obour Buildings, Salah Salem Road,<br />Heliopolis, Cairo, Egypt · Floor 16 – Unit 4
          </a>
          <a href="tel:+201153338081">+20 115 333 8081</a>
          <a href="mailto:info@pillargroup-eg.com">info@pillargroup-eg.com</a>
        </div>
        <div className="pillar-footer__nav">
          <p className="section-kicker">Explore</p>
          <a href="/services/">Our services</a>
          <a href="/about/">About Pillar Group</a>
          <a href="/why-us/">Why Pillar Group</a>
          <a href="/contact/">Contact us</a>
          <a href="/privacy-policy/">Privacy Policy</a>
        </div>
        <div className="pillar-footer__social">
          <p className="section-kicker">Follow us</p>
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={15} /><span>{label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="pillar-footer__bottom">
        <span>© 2026 Pillar Group. All rights reserved.</span>
        <a href="/privacy-policy/">Privacy Policy <ArrowUpRight /></a>
      </div>
    </footer>
  );
}

export function ContactForm({
  className = "contact-form",
  kicker = "Send us a message",
  heading = "We are here to support your business growth.",
}: {
  className?: string;
  kicker?: string;
  heading?: string;
}) {
  const [sent, setSent] = useState(false);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Name: ${String(formData.get("name") ?? "")}`,
      `Email: ${String(formData.get("email") ?? "")}`,
      `Message: ${String(formData.get("message") ?? "")}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/201144591010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className={className} onSubmit={submitMessage}>
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h3>{heading}</h3>
      <label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" autoComplete="email" placeholder="name@company.com" /></label>
      <label>Message<textarea required name="message" rows={4} placeholder="How can we help?" /></label>
      <button className="pillar-button-gold" type="submit">{sent ? "Send another message" : "Send"}<ArrowUpRight size={16} /></button>
      {sent && <p className="form-confirmation" role="status">Your message is ready in WhatsApp. Please review and send it there.</p>}
    </form>
  );
}
