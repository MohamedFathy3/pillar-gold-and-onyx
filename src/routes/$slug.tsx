import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm, SiteFooter, SiteHeader } from "@/components/site-layout";
import {
  allServicePages,
  allServiceSlugs,
  featuredServiceImages,
  getPageBySlug,
  getLeadImage,
  getLeadImageAlt,
  isBrandmarkImage,
  otherServiceSlugs,
  type ContentBlock,
  type ReferencePage,
} from "@/data/site";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = getPageBySlug(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => {
    const page = loaderData ?? getPageBySlug(params.slug);
    if (!page) {
      return { meta: [{ title: "Page not found | Pillar Group" }, { name: "robots", content: "noindex, follow" }] };
    }
    const title = pageTitle(page);
    const description = pageDescription(page);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `${displayTitle(page)}, accounting, tax advisory, Egypt` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:site_name", content: "Pillar Group" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663165155686/KiOIgSTZfzqpcSRJ.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663165155686/KiOIgSTZfzqpcSRJ.jpg" },
      ],
    };
  },
  component: RoutedPage,
});

function displayTitle(page: ReferencePage) {
  if (page.slug === "why-us") return "Why Pillar Group";
  if (page.slug === "contact") return "Get In Touch";
  return page.title;
}

function pageTitle(page: ReferencePage) {
  if (page.slug === "government-authorities-support") return "Government Authorities Support | Pillar Group";
  return `${displayTitle(page)} | Pillar Group`;
}

function pageDescription(page: ReferencePage) {
  const intro = page.blocks.find((block) => block.type === "paragraph");
  const text = page.description || (intro?.type === "paragraph" ? intro.text : `${displayTitle(page)} — professional financial and tax services from Pillar Group in Egypt.`);
  const complete = text.length < 50 ? `Professional services from Pillar Group in Egypt. ${text}` : text;
  return complete.length > 155 ? `${complete.slice(0, 152).trimEnd()}…` : complete;
}

function RoutedPage() {
  const page = Route.useLoaderData();
  if (page.slug === "services") return <ServicesPage page={page} />;
  if (page.slug === "contact") return <ContactPage page={page} />;
  if (allServiceSlugs.includes(page.slug)) return <ServicePage page={page} />;
  return <GenericPage page={page} />;
}

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="interior-site">
      <SiteHeader variant="solid" />
      {children}
      <SiteFooter />
      <a className="pillar-contact-float" href="/contact/">Contact us <ArrowUpRight size={15} /></a>
      <a className="pillar-whatsapp interior-whatsapp" href="https://wa.me/201144591010" aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer">W</a>
    </main>
  );
}

function PageHero({ page, eyebrow = "Pillar Group · Financial & Tax Consultancy" }: { page: ReferencePage; eyebrow?: string }) {
  const image = getLeadImage(page)?.src;
  const summary = page.blocks.find((block) => block.type === "paragraph");
  const subtitle = summary?.type === "paragraph" ? summary.text : "Professional financial guidance for your business.";
  const title = displayTitle(page);
  return (
    <section className={`inner-page-hero ${image ? "inner-page-hero--photo" : ""}`} style={image ? { backgroundImage: `linear-gradient(90deg, oklch(0.18 0.02 49 / 95%), oklch(0.18 0.02 49 / 78%) 50%, oklch(0.18 0.02 49 / 38%)), url("${image}")` } : undefined}>
      <div className="inner-page-hero__content section-wrap">
        <p className="section-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-page-hero__summary">{subtitle}</p>
        <div className="breadcrumb"><a href="/">Home Page</a><ChevronRight size={14} /><span>{title}</span></div>
      </div>
    </section>
  );
}

function ServicesPage({ page }: { page: ReferencePage }) {
  const featured = allServiceSlugs.slice(0, 6);
  const other = otherServiceSlugs;
  return (
    <PageFrame>
      <PageHero page={page} eyebrow="Our expertise" />
      <section className="interior-section section-wrap">
        <div className="section-heading">
          <p className="section-kicker">Expertise that moves you forward</p>
          <h2>Our Services</h2>
          <p>Empowering your business with precise, reliable, and strategic financial solutions.</p>
        </div>
        <div className="service-grid interior-service-grid">
          {featured.map((slug, index) => <ServiceCard key={slug} slug={slug} index={index} />)}
        </div>
        <div className="other-services interior-other-services">
          <div><p className="section-kicker">Beyond the numbers</p><h3>Other Services</h3></div>
          <div className="other-service-list">
            {other.map((slug, index) => {
              const service = getPageBySlug(slug);
              if (!service) return null;
              return <a href={`/${slug}/`} key={slug}><span>{String(index + 1).padStart(2, "0")}</span>{service.title}<ArrowRight /></a>;
            })}
          </div>
        </div>
      </section>
      <section className="service-page-cta">
        <p className="section-kicker">Professional advisory services you can trust</p>
        <h2>Let’s discuss what your business needs.</h2>
        <a className="pillar-button-gold" href="/contact/">Request your consultation <ArrowUpRight size={16} /></a>
      </section>
    </PageFrame>
  );
}

function ServiceCard({ slug, index }: { slug: string; index: number }) {
  const page = getPageBySlug(slug);
  if (!page) return null;
  const image = featuredServiceImages[slug] ?? page.images[0]?.src ?? "/images/pillar/hero-writing.jpg";
  return (
    <article className="service-item">
      <a className="service-photo" href={`/${slug}/`} aria-label={`Learn about ${page.title}`}>
        <img src={image} alt={page.title} loading="lazy" />
        <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
      </a>
      <div className="service-caption"><h3>{page.title}</h3><a href={`/${slug}/`} aria-label={`Read more about ${page.title}`}><ArrowUpRight /></a></div>
    </article>
  );
}

function ServicePage({ page }: { page: ReferencePage }) {
  const leadImage = getLeadImage(page);
  const image = leadImage?.src ?? "/images/pillar/hero-writing.jpg";
  const firstParagraph = page.blocks.find((block) => block.type === "paragraph");
  let usedSummary = false;
  const bodyBlocks = page.blocks.filter((block) => {
    if (block.type === "image") {
      return !isBrandmarkImage(block) && block.src !== leadImage?.src;
    }
    if (block.type === "paragraph" && block === firstParagraph && !usedSummary) {
      usedSummary = true;
      return false;
    }
    return true;
  });
  return (
    <PageFrame>
      <section className="service-detail-hero">
        <div className="service-detail-hero__copy">
          <p className="section-kicker">Pillar Group · Our Services</p>
          <h1>{page.title}</h1>
          {firstParagraph?.type === "paragraph" && <p>{firstParagraph.text}</p>}
          <a className="pillar-button-gold" href="/contact/">Request a consultation <ArrowUpRight size={16} /></a>
          <div className="breadcrumb"><a href="/">Home Page</a><ChevronRight size={14} /><a href="/services/">Services</a><ChevronRight size={14} /><span>{page.title}</span></div>
        </div>
        <div className="service-detail-hero__image"><img src={image} alt={leadImage?.alt && leadImage.alt !== "12" ? leadImage.alt : page.title} /></div>
      </section>
      <section className="service-detail-body section-wrap">
        <article className="reference-article service-article">
          {bodyBlocks.map((block, index) => <ContentBlockView block={block} key={`${block.type}-${index}`} />)}
        </article>
        <aside className="service-sidebar">
          <div className="service-sidebar__card">
            <p className="section-kicker">Ready to get expert support?</p>
            <h2>Talk to a professional advisor.</h2>
            <p>We are here to support your business growth.</p>
            <a href="/contact/" className="text-link">Contact us <ArrowRight size={16} /></a>
          </div>
          <div className="service-sidebar__links"><h3>Other Services</h3>{allServicePages.filter((item) => item.slug !== page.slug).slice(0, 7).map((item) => <a href={`/${item.slug}/`} key={item.slug}>{item.title}<ArrowUpRight size={14} /></a>)}</div>
        </aside>
      </section>
      <section className="service-page-cta">
        <p className="section-kicker">Pillar Group</p>
        <h2>Get the right financial support for your business.</h2>
        <a className="pillar-button-gold" href="/contact/">Contact Us <ArrowUpRight size={16} /></a>
      </section>
    </PageFrame>
  );
}

function ContactPage({ page }: { page: ReferencePage }) {
  return (
    <PageFrame>
      <PageHero page={page} eyebrow="We are here to support your business growth." />
      <section className="contact-page section-wrap">
        <div className="contact-page__details">
          <p className="section-kicker">Get In Touch</p>
          <h2>Let’s talk about your business.</h2>
          <a className="contact-detail" href="https://maps.app.goo.gl/Xdnarm5wmcf3JqdT9" target="_blank" rel="noreferrer">
            <span className="contact-detail__icon">01</span>
            <span><b>Address</b>31 El Obour Buildings, Salah Salem Road, Heliopolis, Cairo, Egypt<br />Floor 16 – Unit 4</span>
          </a>
          <a className="contact-detail" href="tel:+201153338081"><span className="contact-detail__icon">02</span><span><b>Phone</b>+20 115 333 8081</span></a>
          <a className="contact-detail" href="mailto:info@pillargroup-eg.com"><span className="contact-detail__icon">03</span><span><b>Email</b>info@pillargroup-eg.com</span></a>
          <div className="contact-social-row"><span>Follow Us</span>{["Facebook", "Instagram", "YouTube", "WhatsApp", "TikTok"].map((name) => {
            const social = name === "Facebook" ? "https://www.facebook.com/profile.php?id=61582425098619" : name === "Instagram" ? "https://www.instagram.com/pillar1789/" : name === "YouTube" ? "https://www.youtube.com/piller/" : name === "WhatsApp" ? "https://wa.me/201144591010" : "https://www.tiktok.com/@pillar1789";
            return <a key={name} href={social} target="_blank" rel="noreferrer">{name}</a>;
          })}</div>
        </div>
        <ContactForm className="contact-page-form" kicker="Send us a message" heading="We are here to support your business growth." />
      </section>
      <section className="contact-map-link"><span>Find Us</span><a href="https://maps.app.goo.gl/Xdnarm5wmcf3JqdT9" target="_blank" rel="noreferrer">View our Cairo office location <ArrowUpRight size={16} /></a></section>
    </PageFrame>
  );
}

function GenericPage({ page }: { page: ReferencePage }) {
  const leadImage = getLeadImage(page);
  const image = leadImage?.src;
  const blocks = page.blocks.filter((block) => {
    if (block.type === "image") {
      return !isBrandmarkImage(block) && block.src !== image;
    }
    return true;
  });
  return (
    <PageFrame>
      <PageHero page={page} eyebrow={page.slug === "privacy-policy" ? "Pillar Group" : "For financial and tax services and consultancy"} />
      <section className={`generic-page-body section-wrap ${page.slug === "privacy-policy" ? "generic-page-body--legal" : ""}`}>
        <article className="reference-article">
          {blocks.map((block, index) => <ContentBlockView block={block} key={`${block.type}-${index}`} />)}
        </article>
        {page.slug !== "privacy-policy" && (
          <aside className="generic-page-sidebar">
            {image && <img src={image} alt={getLeadImageAlt(page)} loading="lazy" />}
            <p className="section-kicker">Professional advisory services</p>
            <h2>We are here to support your business growth.</h2>
            <a className="text-link" href="/contact/">Get in touch <ArrowRight size={16} /></a>
          </aside>
        )}
      </section>
      {page.slug !== "privacy-policy" && <section className="service-page-cta"><p className="section-kicker">Pillar Group</p><h2>Ready to get expert support?</h2><a className="pillar-button-gold" href="/contact/">Request your consultation <ArrowUpRight size={16} /></a></section>}
    </PageFrame>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (block.type === "heading") {
    if (block.level <= 2) return <h2 className="reference-heading">{block.text}</h2>;
    return <h3 className="reference-subheading">{block.text}</h3>;
  }
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return <Tag className="reference-list">{block.items.map((item, index) => <li key={`${index}-${item}`}><Check size={16} />{item}</li>)}</Tag>;
  }
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  const alt = block.alt.trim() && block.alt.trim() !== "12" ? block.alt : "Pillar Group financial and advisory services";
  return <figure className="reference-image"><img src={block.src} alt={alt} loading="lazy" /></figure>;
}
