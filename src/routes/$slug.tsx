import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  ContactForm,
  FloatingWhatsAppButton,
  SiteFooter,
  SiteHeader,
} from "@/components/site-layout";
import {
  allServicePages,
  allServiceSlugs,
  featuredServiceImages,
  getLocalizedPage,
  getPageBySlug,
  getLeadImage,
  getLeadImageAlt,
  otherServiceSlugs,
  type ContentBlock,
  type ReferencePage,
} from "@/data/site";
import { useSiteLanguage } from "@/lib/i18n";
import { SITE_NAME, SITE_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = getPageBySlug(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    const page = loaderData;
    if (!page)
      return {
        meta: [
          { title: `Page not found | ${SITE_NAME}` },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    const canonicalUrl = new URL(page.route, SITE_URL).href;
    const title = `${page.title} | ${SITE_NAME}`;
    return {
      meta: [
        { title },
        { name: "description", content: page.description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:title", content: title },
        { property: "og:description", content: page.description },
        { property: "og:image", content: SITE_SOCIAL_IMAGE },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${SITE_NAME} logo` },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: page.description },
        { name: "twitter:image", content: SITE_SOCIAL_IMAGE },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: RoutedPage,
});

function RoutedPage() {
  const page = Route.useLoaderData();
  const { language } = useSiteLanguage();
  const localized = getLocalizedPage(page, language);
  if (page.slug === "services") return <ServicesPage page={localized} language={language} />;
  if (page.slug === "contact") return <ContactPage page={localized} />;
  if (allServiceSlugs.includes(page.slug))
    return <ServicePage page={localized} language={language} />;
  return <GenericPage page={localized} />;
}

function PageFrame({ children }: { children: ReactNode }) {
  const { copy } = useSiteLanguage();
  return (
    <main className="interior-site">
      <SiteHeader variant="solid" />
      {children}
      <SiteFooter />
      <a className="pillar-contact-float" href="/contact/">
        {copy.contact} <ArrowUpRight size={15} />
      </a>
      <FloatingWhatsAppButton className="interior-whatsapp" />
    </main>
  );
}

function PageHero({ page, eyebrow }: { page: ReferencePage; eyebrow: string }) {
  const image = getLeadImage(page)?.src;
  const summary = page.blocks.find((block) => block.type === "paragraph");
  const { copy } = useSiteLanguage();
  return (
    <section
      className={`inner-page-hero ${image ? "inner-page-hero--photo" : ""}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(90deg, oklch(0.18 0.02 49 / 95%), oklch(0.18 0.02 49 / 78%) 50%, oklch(0.18 0.02 49 / 38%)), url("${image}")`,
            }
          : undefined
      }
    >
      <div className="inner-page-hero__content section-wrap">
        <p className="section-kicker">{eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="inner-page-hero__summary">
          {summary?.type === "paragraph" ? summary.text : page.description}
        </p>
        <div className="breadcrumb">
          <a href="/">{copy.homePage}</a>
          <ChevronRight size={14} />
          <span>{page.title}</span>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ page, language }: { page: ReferencePage; language: "en" | "ar" }) {
  const { copy } = useSiteLanguage();
  return (
    <PageFrame>
      <PageHero page={page} eyebrow={language === "ar" ? "خبرتنا" : "Our expertise"} />
      <section className="interior-section section-wrap">
        <div className="section-heading">
          <p className="section-kicker">{copy.servicesKicker}</p>
          <h2>{page.title}</h2>
          <p>{copy.servicesText}</p>
        </div>
        <div className="service-grid interior-service-grid">
          {allServiceSlugs.map((slug, index) => (
            <ServiceCard key={slug} slug={slug} index={index} language={language} />
          ))}
        </div>
      </section>
      <section className="service-page-cta">
        <p className="section-kicker">{copy.advisoryKicker}</p>
        <h2>{copy.consultationTitle}</h2>
        <a className="pillar-button-gold" href="/contact/">
          {copy.request} <ArrowUpRight size={16} />
        </a>
      </section>
    </PageFrame>
  );
}

function ServiceCard({
  slug,
  index,
  language,
}: {
  slug: string;
  index: number;
  language: "en" | "ar";
}) {
  const page = getPageBySlug(slug);
  if (!page) return null;
  const title = language === "ar" ? page.arTitle : page.title;
  return (
    <article className="service-item">
      <a className="service-photo" href={`/${slug}/`} aria-label={title}>
        <img src={featuredServiceImages[slug] ?? page.images[0]?.src} alt={title} loading="lazy" />
        <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
      </a>
      <div className="service-caption">
        <h3>{title}</h3>
        <a href={`/${slug}/`} aria-label={title}>
          <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}

function ServicePage({ page, language }: { page: ReferencePage; language: "en" | "ar" }) {
  const { copy } = useSiteLanguage();
  const leadImage = getLeadImage(page);
  const firstParagraph = page.blocks.find((block) => block.type === "paragraph");
  const bodyBlocks = page.blocks.filter(
    (block, index) => !(block.type === "paragraph" && index === 0) && block.type !== "image",
  );
  return (
    <PageFrame>
      <section className="service-detail-hero">
        <div className="service-detail-hero__copy">
          <p className="section-kicker">THD · {language === "ar" ? "خدماتنا" : "Our services"}</p>
          <h1>{page.title}</h1>
          {firstParagraph?.type === "paragraph" && <p>{firstParagraph.text}</p>}
          <a className="pillar-button-gold" href="/contact/">
            {copy.request} <ArrowUpRight size={16} />
          </a>
          <div className="breadcrumb">
            <a href="/">{copy.homePage}</a>
            <ChevronRight size={14} />
            <a href="/services/">{copy.servicesKicker}</a>
            <ChevronRight size={14} />
            <span>{page.title}</span>
          </div>
        </div>
        <div className="service-detail-hero__image">
          <img
            src={leadImage?.src ?? "/images/pillar/hero-writing.jpg"}
            alt={getLeadImageAlt(page)}
          />
        </div>
      </section>
      <section className="service-detail-body section-wrap">
        <article className="reference-article service-article">
          {bodyBlocks.map((block, index) => (
            <ContentBlockView block={block} key={`${block.type}-${index}`} />
          ))}
        </article>
        <aside className="service-sidebar">
          <div className="service-sidebar__card">
            <p className="section-kicker">{copy.consultationKicker}</p>
            <h2>{copy.consultationTitle}</h2>
            <p>{copy.consultationText}</p>
            <a href="/contact/" className="text-link">
              {copy.contact} <ArrowRight size={16} />
            </a>
          </div>
          <div className="service-sidebar__links">
            <h3>{copy.allServices}</h3>
            {allServicePages
              .filter((item) => item.slug !== page.slug)
              .slice(0, 7)
              .map((item) => (
                <a href={`/${item.slug}/`} key={item.slug}>
                  {language === "ar" ? item.arTitle : item.title}
                  <ArrowUpRight size={14} />
                </a>
              ))}
          </div>
        </aside>
      </section>
      <section className="service-page-cta">
        <p className="section-kicker">THD Certified Accountant</p>
        <h2>{copy.whyTitle}</h2>
        <a className="pillar-button-gold" href="/contact/">
          {copy.contact} <ArrowUpRight size={16} />
        </a>
      </section>
    </PageFrame>
  );
}

function ContactPage({ page }: { page: ReferencePage }) {
  const { copy } = useSiteLanguage();
  const socialLinks = ["Facebook", "Instagram", "TikTok", "WhatsApp"];
  const urls = [
    "https://www.facebook.com/THDcertifiedaccountant",
    "https://www.instagram.com/thdcertifiedaccountant/",
    "https://www.tiktok.com/@thd_certifiedaccountant",
    "https://wa.me/201118383747",
  ];
  return (
    <PageFrame>
      <PageHero page={page} eyebrow={copy.consultationText} />
      <section className="contact-page section-wrap">
        <div className="contact-page__details">
          <p className="section-kicker">{copy.getInTouch}</p>
          <h2>{copy.consultationTitle}</h2>
          <a
            className="contact-detail"
            href="https://www.google.com/maps/search/?api=1&query=31+El+Obour+Buildings+Salah+Salem+Cairo"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-detail__icon">01</span>
            <span>
              <b>{copy.address}</b>
            </span>
          </a>
          <a className="contact-detail" href="tel:+201118383747">
            <span className="contact-detail__icon">02</span>
            <span>
              <b>
                <bdi dir="ltr">{copy.phone}</bdi>
              </b>
            </span>
          </a>
          <div className="contact-social-row">
            <span>{copy.follow}</span>
            {socialLinks.map((name, index) => (
              <a key={name} href={urls[index]} target="_blank" rel="noreferrer">
                {name}
              </a>
            ))}
          </div>
        </div>
        <ContactForm className="contact-page-form" />
      </section>
      <section className="contact-map-link">
        <span>{copy.address}</span>
        <a
          href="https://www.google.com/maps/search/?api=1&query=31+El+Obour+Buildings+Salah+Salem+Cairo"
          target="_blank"
          rel="noreferrer"
        >
          {copy.getInTouch} <ArrowUpRight size={16} />
        </a>
      </section>
    </PageFrame>
  );
}

function GenericPage({ page }: { page: ReferencePage }) {
  const { copy } = useSiteLanguage();
  const image = getLeadImage(page)?.src;
  return (
    <PageFrame>
      <PageHero
        page={page}
        eyebrow={page.slug === "privacy-policy" ? "THD Certified Accountant" : copy.heroKicker}
      />
      <section
        className={`generic-page-body section-wrap ${page.slug === "privacy-policy" ? "generic-page-body--legal" : ""}`}
      >
        <article className="reference-article">
          {page.blocks.map((block, index) => (
            <ContentBlockView block={block} key={`${block.type}-${index}`} />
          ))}
        </article>
        {page.slug !== "privacy-policy" && (
          <aside className="generic-page-sidebar">
            {image && <img src={image} alt={getLeadImageAlt(page)} loading="lazy" />}
            <p className="section-kicker">{copy.advisoryKicker}</p>
            <h2>{copy.consultationTitle}</h2>
            <a className="text-link" href="/contact/">
              {copy.contact} <ArrowRight size={16} />
            </a>
          </aside>
        )}
      </section>
      {page.slug !== "privacy-policy" && (
        <section className="service-page-cta">
          <p className="section-kicker">THD Certified Accountant</p>
          <h2>{copy.whyTitle}</h2>
          <a className="pillar-button-gold" href="/contact/">
            {copy.request} <ArrowUpRight size={16} />
          </a>
        </section>
      )}
    </PageFrame>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (block.type === "heading")
    return block.level <= 2 ? (
      <h2 className="reference-heading">{block.text}</h2>
    ) : (
      <h3 className="reference-subheading">{block.text}</h3>
    );
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag className="reference-list">
        {block.items.map((item, index) => (
          <li key={`${index}-${item}`}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </Tag>
    );
  }
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  return (
    <figure className="reference-image">
      <img src={block.src} alt={block.alt || "THD Certified Accountant"} loading="lazy" />
    </figure>
  );
}
