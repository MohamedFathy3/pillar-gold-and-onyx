import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Calculator, Check, ChevronDown, ClipboardCheck, FileSpreadsheet, Instagram, Menu, MessageCircle, Play, Search, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/pillar/pillar-full-logo.png.asset.json";
import auditImage from "@/assets/pillar/audit-service.jpg.asset.json";
import taxImage from "@/assets/pillar/tax-advisory.jpg.asset.json";
import internalAuditImage from "@/assets/pillar/internal-audit.jpg.asset.json";
import filingImage from "@/assets/pillar/tax-filing.jpg.asset.json";
import examinationImage from "@/assets/pillar/tax-examination.jpg.asset.json";
import statementsImage from "@/assets/pillar/statements.jpg.asset.json";
import heroImage from "@/assets/pillar/hero-writing.jpg.asset.json";
import teamImage from "@/assets/pillar/about-team.jpg.asset.json";

const services = [
  { title: "Audit & External Financial Review", image: auditImage.url, icon: ClipboardCheck },
  { title: "Comprehensive Tax Advisory", image: taxImage.url, icon: Calculator },
  { title: "Internal Audit Services", image: internalAuditImage.url, icon: ShieldCheck },
  { title: "Tax Returns Filing", image: filingImage.url, icon: FileSpreadsheet },
  { title: "Tax Examination & Inspection Support", image: examinationImage.url, icon: Search },
  { title: "Financial Statements Preparation", image: statementsImage.url, icon: FileSpreadsheet },
];

const otherServices = [
  "E-Invoicing Services", "Company Formation & Registration", "Payroll & Internal Reporting Support",
  "Feasibility Studies & Project Evaluation", "Assets & Business Valuation", "Government Authorities Support",
];
const clients = [
  "Isolfeu", "Aquila", "United Kitchens", "Comfort foods", "Genuine", "Craft Collective",
  "Medico Steel Doors", "Ragabco", "Gomla market", "SCIB STEEL", "Express Agriculture", "Motamyez",
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582425098619", glyph: "f" },
  { label: "Instagram", href: "https://www.instagram.com/pillar1789/", glyph: "◎" },
  { label: "YouTube", href: "https://www.youtube.com/piller/", glyph: "▶" },
  { label: "WhatsApp", href: "https://wa.me/201144591010", glyph: "◉" },
  { label: "TikTok", href: "https://www.tiktok.com/@pillar1789", glyph: "♪" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pillar Advisory Group | Financial & Tax Consultancy" },
      { name: "description", content: "Professional accounting, auditing, and tax advisory services in Egypt. Clear financial guidance for businesses of every size." },
      { property: "og:title", content: "Pillar Advisory Group | Financial & Tax Consultancy" },
      { property: "og:description", content: "Professional accounting, auditing, and tax advisory services in Egypt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main>
      <section className="pillar-hero" id="home">
        <img className="pillar-hero__photo" src={heroImage.url} alt="Financial advisor reviewing business documents" />
        <div className="pillar-hero__shade" />
        <header className="pillar-header">
          <a className="pillar-brand" href="#home" aria-label="Pillar Advisory Group home"><img src={logo.url} alt="Pillar Advisory Group" /></a>
          <button className="pillar-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "pillar-nav is-open" : "pillar-nav"} aria-label="Main navigation">
            <a className="is-active" href="#home" onClick={() => setMenuOpen(false)}>Home Page</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Pillar Group</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About Pillar Group</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Privacy Policy</a>
          </nav>
          <div className="pillar-header-socials">
            {socials.map((social) => <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">{social.glyph}</a>)}
            <a href="#services" aria-label="Explore services"><Search size={17} /></a>
          </div>
        </header>

        <div className="pillar-hero__content">
          <p className="pillar-eyebrow">For financial and tax services and consultancy</p>
          <img className="pillar-hero__logo" src={logo.url} alt="Pillar Advisory Group" />
          <a href="#services" className="pillar-scroll" aria-label="Scroll to services"><ArrowDown /></a>
          <Button asChild variant="hero"><a href="#contact">Contact Us</a></Button>
          <div className="pillar-hero-socials">
            {socials.map((social) => <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">{social.glyph}</a>)}
          </div>
        </div>
        <a className="pillar-whatsapp" href="https://wa.me/201144591010" aria-label="Chat on WhatsApp"><MessageCircle /></a>
      </section>

      <section className="pillar-services section-wrap" id="services">
        <div className="section-heading">
          <p className="section-kicker">Expertise that moves you forward</p>
          <h2>Our Services</h2>
          <p>Empowering your business with precise, reliable, and strategic financial solutions.</p>
        </div>
        <div className="service-grid">
          {services.map(({ title, image, icon: Icon }, index) => (
            <article className="service-item" key={title}>
              <a className="service-photo" href="#contact" aria-label={`Learn about ${title}`}>
                <img src={image} alt={title} loading="lazy" />
                <span className="service-index">0{index + 1}</span>
                <span className="service-icon"><Icon /></span>
              </a>
              <div className="service-caption"><h3>{title}</h3><a href="#contact" aria-label={`Contact us about ${title}`}><ArrowUpRight /></a></div>
            </article>
          ))}
        </div>
        <div className="other-services">
          <div><p className="section-kicker">Beyond the numbers</p><h3>Other Services</h3></div>
          <div className="other-service-list">
            {otherServices.map((service, index) => <a href="#contact" key={service}><span>0{index + 1}</span>{service}<ArrowRight /></a>)}
          </div>
        </div>
      </section>

      <section className="pillar-about" id="about">
        <div className="pillar-about__image"><img src={teamImage.url} alt="Business professionals working together" loading="lazy" /></div>
        <div className="pillar-about__copy">
          <p className="section-kicker">Your trusted financial partner</p>
          <h2>Clarity for today.<br /><span>Confidence for tomorrow.</span></h2>
          <p><strong>Pillar Group</strong> is a professional accounting and advisory firm serving businesses across all industries and sectors. Our team provides reliable financial guidance, accurate reporting, and strategic support designed to help organizations operate with clarity and compliance.</p>
          <p>From startups and SMEs to large enterprises, we deliver solutions that support growth, reduce risk, and enhance financial performance. We believe in long-term partnerships built on trust, transparency, and measurable value.</p>
          <a className="text-link" href="#why-us">More About Pillar <ArrowRight /></a>
          <div className="pillar-about__numbers"><div><strong>12+</strong><span>Trusted clients</span></div><div><strong>360°</strong><span>Business support</span></div><div><strong>100%</strong><span>Personalized care</span></div></div>
        </div>
      </section>

      <section className="pillar-advisory" id="why-us">
        <div className="pillar-advisory__icon"><ShieldCheck /></div>
        <p className="section-kicker">Professional advisory services you can trust</p>
        <h2>Make every financial decision<br />with a clearer view.</h2>
        <p>We guide your business through taxation, financial structuring, investment decisions, corporate setup, IFRS alignment, and ongoing financial improvement. Avoid costly mistakes, optimize performance, and make informed decisions backed by accurate analysis and professional insight.</p>
        <div className="pillar-advisory__line" />
        <h3>We don’t only give advice — we help you choose the right direction and grow with certainty.</h3>
      </section>

      <section className="pillar-trust">
        <div className="pillar-trust__copy"><p className="section-kicker">Why clients trust us</p><h2>Professional insight.<br /><span>Personal commitment.</span></h2><p>Our clients trust us because we combine professional expertise with strategic clarity. We don’t deliver generic templates — we provide tailored financial guidance designed to protect your business, strengthen decision-making, and support growth with confidence.</p><a href="#contact" className="text-link">Why Pillar Group <ArrowRight /></a></div>
        <div className="pillar-trust__seal"><div className="seal-ring"><ShieldCheck /><span>TRUSTED ADVISORY</span><b>PILLAR</b><span>BUILT ON CLARITY</span></div></div>
      </section>

      <section className="pillar-government">
        <img src={teamImage.url} alt="Professionals meeting with clients" loading="lazy" />
        <div className="pillar-government__shade" />
        <div className="pillar-government__content"><p className="section-kicker">Compliance, handled with care</p><h2>Facing challenges with<br />government procedures?</h2><ul><li><Check /> We handle official paperwork and submissions.</li><li><Check /> We follow up to avoid delays, fines, and rejections.</li><li><Check /> We help ensure regulatory compliance for your business.</li></ul><Button asChild variant="hero"><a href="#contact">Request Government Support</a></Button></div>
      </section>

      <section className="pillar-clients section-wrap">
        <div className="section-heading"><p className="section-kicker">Partnerships built on trust</p><h2>Our Key Clients</h2><p>Supporting ambitious businesses across industries.</p></div>
        <div className="client-grid">{clients.map((client, index) => <div className="client-name" key={client}><span className="client-mark">{client.slice(0, 1)}</span><span>{client}</span><small>{String(index + 1).padStart(2, "0")}</small></div>)}</div>
      </section>

      <section className="pillar-consultation" id="contact">
        <div className="pillar-consultation__intro"><p className="section-kicker">A better next step starts here</p><h2>Get your<br /><span>consultation now.</span></h2><p>We are here to support your business growth. Tell us what you need and our team will be in touch.</p><a href="tel:+201153338081" className="consult-phone">+20 115 333 8081 <ArrowUpRight /></a></div>
        <form className="consultation-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <p className="section-kicker">Ready to get expert support?</p><h3>Request your consultation below.</h3>
          <label>Your name<input required name="name" autoComplete="name" placeholder="Full name" /></label>
          <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="name@company.com" /></label>
          <label>How can we help?<textarea required name="message" rows={4} placeholder="Tell us a little about your business needs" /></label>
          <Button type="submit" variant="gold">{sent ? "Message received" : "Send your request"}<ArrowRight /></Button>
          {sent && <p className="form-confirmation" role="status">Thank you. Your message is ready for our team.</p>}
        </form>
      </section>

      <section className="pillar-feasibility">
        <div className="pillar-feasibility__symbol"><FileSpreadsheet /></div><div><p className="section-kicker">Turn your idea into a sound investment</p><h2>Start your own business<br />with confidence.</h2></div>
        <ul><li>Feasibility study report</li><li>Market & competitor analysis</li><li>Financial projections</li><li>Investment requirements planning</li><li>Risk assessment & advisory</li></ul>
        <a href="#contact" className="feasibility-link">Get your feasibility study <ArrowUpRight /></a>
      </section>

      <footer className="pillar-footer">
        <div className="pillar-footer__top"><div className="pillar-footer__brand"><img src={logo.url} alt="Pillar Advisory Group" /><p>Professional financial and tax advisory services for businesses in Egypt.</p></div><div className="pillar-footer__contact"><p className="section-kicker">Get in touch</p><a href="https://maps.app.goo.gl/Xdnarm5wmcf3JqdT9">31 El Obour Buildings, Salah Salem Road,<br />Heliopolis, Cairo, Egypt · Floor 16 – Unit 4</a><a href="tel:+201153338081">+20 115 333 8081</a><a href="mailto:info@pillargroup-eg.com">info@pillargroup-eg.com</a></div><div className="pillar-footer__nav"><p className="section-kicker">Explore</p><a href="#services">Our services</a><a href="#about">About Pillar</a><a href="#why-us">Why Pillar Group</a><a href="#contact">Contact us</a></div><div className="pillar-footer__social"><p className="section-kicker">Follow us</p>{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.glyph}<span>{social.label}</span></a>)}</div></div>
        <div className="pillar-footer__bottom"><span>© 2026 Pillar Advisory Group. All rights reserved.</span><a href="#home">Back to top <ChevronDown /></a></div>
      </footer>
      <a className="pillar-contact-float" href="#contact">Contact us <ArrowUpRight /></a>
    </main>
  );
}