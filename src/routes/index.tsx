import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  ClipboardCheck,
  FileSpreadsheet,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm, SiteFooter, SiteHeader } from "@/components/site-layout";
import { AdvisoryTrustPanel, CompanySpotlight, LatestServices, ReferenceAbout } from "@/components/home-reference-sections";
import { featuredServiceImages, featuredServiceSlugs, getPageBySlug, otherServiceSlugs } from "@/data/site";

const serviceIcons = [ClipboardCheck, Calculator, ShieldCheck, FileSpreadsheet, Search, FileSpreadsheet];
const clients = [
  "Isolfeu for Specialized Contracting",
  "Aquila for printing & Carton trade Co.",
  "United Kitchens for Import & Export",
  "Comfort foods",
  "Genuine for Industry & Trade",
  "Craft Collective for Advertising & Marketing",
  "Medico Steel Doors",
  "Ragabco for Import & Export",
  "Gomla market",
  "SCIB STEEL FOR TRADING",
  "Express for Modern Agriculture",
  "Motamyez",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pillar Group | Financial & Tax Consultancy in Egypt" },
      { name: "description", content: "Professional accounting, auditing, tax advisory and financial consultancy services for businesses across Egypt." },
      { property: "og:title", content: "Pillar Group | Financial & Tax Consultancy in Egypt" },
      { property: "og:description", content: "Professional accounting, auditing, tax advisory and financial consultancy services for businesses across Egypt." },
      { property: "og:site_name", content: "Pillar Group" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663165155686/KiOIgSTZfzqpcSRJ.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pillar Group | Financial & Tax Consultancy in Egypt" },
      { name: "twitter:description", content: "Professional accounting, auditing, tax advisory and financial consultancy services for businesses across Egypt." },
      { name: "twitter:image", content: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663165155686/KiOIgSTZfzqpcSRJ.jpg" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="pillar-hero" id="home">
        <img className="pillar-hero__photo" src="/images/pillar/hero-writing.jpg" alt="Financial advisor reviewing business documents" />
        <div className="pillar-hero__shade" />
        <SiteHeader variant="overlay" />
        <div className="pillar-hero__content">
          <h1 className="pillar-eyebrow">For financial and tax services and consultancy</h1>
          <img className="pillar-hero__logo" src="/images/pillar/pillar-full-logo.png" alt="Pillar Group" />
          <a href="#services" className="pillar-scroll" aria-label="Scroll to services"><ArrowDown /></a>
          <Button asChild variant="hero"><a href="/contact/">Contact Us</a></Button>
          <div className="pillar-hero-socials">
            <a href="https://www.facebook.com/profile.php?id=61582425098619" aria-label="Facebook" target="_blank" rel="noreferrer">f</a>
            <a href="https://www.instagram.com/pillar1789/" aria-label="Instagram" target="_blank" rel="noreferrer">◎</a>
            <a href="https://www.youtube.com/piller/" aria-label="YouTube" target="_blank" rel="noreferrer">▶</a>
            <a href="https://www.tiktok.com/@pillar1789" aria-label="TikTok" target="_blank" rel="noreferrer">♪</a>
          </div>
        </div>
        <a className="pillar-whatsapp" href="https://wa.me/201144591010" aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer">W</a>
      </section>

      <section className="pillar-services section-wrap" id="services">
        <div className="section-heading">
          <p className="section-kicker">Our Service</p>
          <h2>Our Services</h2>
          <p>Empowering your business with precise, reliable, and strategic financial solutions.</p>
        </div>
        <div className="service-grid">
          {featuredServiceSlugs.map((slug, index) => {
            const service = getPageBySlug(slug);
            const Icon = serviceIcons[index] ?? ClipboardCheck;
            if (!service) return null;
            return (
              <article className="service-item" key={slug}>
                <a className="service-photo" href={`/${slug}/`} aria-label={`Learn about ${service.title}`}>
                  <img src={featuredServiceImages[slug] ?? service.images[0]?.src} alt={service.title} loading="lazy" />
                  <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-icon"><Icon /></span>
                </a>
                <div className="service-caption"><h3>{service.title}</h3><a href={`/${slug}/`} aria-label={`Read more about ${service.title}`}><ArrowUpRight /></a></div>
              </article>
            );
          })}
        </div>
        <div className="other-services">
          <div><p className="section-kicker">Beyond the numbers</p><h3>Other Services</h3></div>
          <div className="other-service-list">
            {otherServiceSlugs.map((slug, index) => {
              const service = getPageBySlug(slug);
              return service ? <a href={`/${slug}/`} key={slug}><span>{String(index + 1).padStart(2, "0")}</span>{service.title}<ArrowRight /></a> : null;
            })}
          </div>
        </div>
      </section>

      <LatestServices />
      <CompanySpotlight />
      <ReferenceAbout />
      <AdvisoryTrustPanel />

      <section className="pillar-trust">
        <div className="pillar-trust__copy">
          <p className="section-kicker">Why Clients Trust Us</p>
          <h2>Professional insight.<br /><span>Personal commitment.</span></h2>
          <p>Our clients trust us because we combine professional expertise with strategic clarity. We don’t deliver generic templates — we provide tailored financial guidance designed to protect your business, strengthen your financial decision-making, and support growth with confidence. Every recommendation is backed by proven experience, reliable analysis, and full transparency. With us, you don’t just receive advice — you receive a trusted partner committed to your long-term success.</p>
          <a href="/why-us/" className="text-link">Why Pillar Group <ArrowRight /></a>
        </div>
        <div className="pillar-trust__seal"><div className="seal-ring"><ShieldCheck /><span>TRUSTED ADVISORY</span><b>PILLAR</b><span>BUILT ON CLARITY</span></div></div>
      </section>

      <section className="pillar-government">
        <img src="/images/pillar/about-team.jpg" alt="Professionals meeting with clients" loading="lazy" />
        <div className="pillar-government__shade" />
        <div className="pillar-government__content">
          <p className="section-kicker">Facing Challenges with Government Procedures & Compliance?</p>
          <h2>Government procedures,<br />handled with care.</h2>
          <ul>
            <li><Check /> We handle all official paperwork & submissions on your behalf.</li>
            <li><Check /> We follow up with authorities to avoid delays, fines, and rejections.</li>
            <li><Check /> We ensure full legal & regulatory compliance for your business.</li>
          </ul>
          <Button asChild variant="hero"><a href="/government-authorities-support/">Request Government Support Now</a></Button>
        </div>
      </section>

      <section className="pillar-clients section-wrap">
        <div className="section-heading"><p className="section-kicker">Partnerships built on trust</p><h2>Our Key Clients</h2><p>Supporting ambitious businesses across industries.</p></div>
        <div className="client-grid">{clients.map((client, index) => <div className="client-name" key={client}><span className="client-mark">{client.slice(0, 1)}</span><span>{client}</span><small>{String(index + 1).padStart(2, "0")}</small></div>)}</div>
      </section>

      <section className="pillar-consultation" id="contact">
        <div className="pillar-consultation__intro">
          <p className="section-kicker">GET YOUR CONSULTATION NOW</p>
          <h2>Get your<br /><span>consultation now.</span></h2>
          <p>We are here to support your business growth.</p>
          <a href="tel:+201153338081" className="consult-phone">+20 115 333 8081 <ArrowUpRight /></a>
        </div>
        <ContactForm className="consultation-form" kicker="Ready to Get Expert Support?" heading="Request Your Consultation Below." />
      </section>

      <section className="pillar-feasibility">
        <div className="pillar-feasibility__symbol"><FileSpreadsheet /></div>
        <div><p className="section-kicker">Start Your Own Business with Confidence</p><h2>Start your own business<br />with confidence.</h2></div>
        <ul><li>Feasibility Study Report</li><li>Market & Competitor Analysis</li><li>Financial Projections</li><li>Investment Requirements Planning</li><li>Risk Assessment & Advisory</li></ul>
        <a href="/feasibility-studies-project-evaluation/" className="feasibility-link">Get Your Feasibility Study Now <ArrowUpRight /></a>
      </section>
      <SiteFooter />
      <a className="pillar-contact-float" href="/contact/">Contact us <ArrowUpRight /></a>
    </main>
  );
}
