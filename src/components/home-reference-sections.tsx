import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredServiceImages, getPageBySlug } from "@/data/site";
import { useSiteLanguage } from "@/lib/i18n";

const serviceSlugs = [
  "financial-statements-preparation",
  "tax-examination-inspection-support",
  "tax-returns-filing",
];
const spotlightSlugs = [
  "company-formation-registration",
  "financial-statements-preparation",
  "tax-returns-filing",
];

export function LatestServices() {
  const { language, copy } = useSiteLanguage();
  return (
    <section className="latest-services section-wrap" aria-labelledby="latest-services-title">
      <div className="latest-services__header">
        <div>
          <p className="section-kicker">{copy.latestKicker}</p>
          <h2 id="latest-services-title">{copy.latestTitle}</h2>
        </div>
        <a href="/services/">
          {copy.allServices} <ArrowLeft size={16} />
        </a>
      </div>
      <div className="latest-services__grid">
        {serviceSlugs.map((slug) => {
          const page = getPageBySlug(slug);
          if (!page) return null;
          return (
            <article className="latest-service-card" key={slug}>
              <a className="latest-service-card__image" href={`/${slug}/`}>
                <img
                  src={featuredServiceImages[slug]}
                  alt={language === "ar" ? page.arTitle : page.title}
                  loading="lazy"
                />
              </a>
              <div className="latest-service-card__copy">
                <h3>{language === "ar" ? page.arTitle : page.title}</h3>
                <a className="latest-service-card__link" href={`/${slug}/`}>
                  {copy.readMore} <ArrowLeft size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CompanySpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language, copy } = useSiteLanguage();
  const slug = spotlightSlugs[activeIndex]!;
  const page = getPageBySlug(slug)!;
  const goTo = (offset: number) =>
    setActiveIndex((current) => (current + offset + spotlightSlugs.length) % spotlightSlugs.length);
  return (
    <section className="reference-spotlight" aria-label={copy.servicesTitle}>
      <div className="reference-spotlight__watermark" aria-hidden="true">
        THD
      </div>
      <div className="reference-spotlight__scene" aria-roledescription="carousel">
        <img className="reference-spotlight__image" src={featuredServiceImages[slug]} alt="" />
        <div className="reference-spotlight__shade" />
        <div className="reference-spotlight__content" aria-live="polite">
          <p className="section-kicker">{copy.servicesKicker}</p>
          <h2>{language === "ar" ? page.arTitle : page.title}</h2>
          <a href={`/${slug}/`}>
            {copy.readMore} <ArrowLeft size={14} />
          </a>
        </div>
        <button
          className="reference-spotlight__control reference-spotlight__control--previous"
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous"
        >
          <ChevronRight size={18} />
        </button>
        <button
          className="reference-spotlight__control reference-spotlight__control--next"
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="reference-spotlight__dots" aria-label="Choose service">
          {spotlightSlugs.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceAbout() {
  const { copy } = useSiteLanguage();
  return (
    <section
      className="pillar-about pillar-about--reference"
      id="about"
      aria-labelledby="reference-about-title"
    >
      <div className="pillar-about__brandmark">
        <div className="thd-monogram" aria-hidden="true">
          THD
        </div>
      </div>
      <div className="pillar-about__copy">
        <p className="section-kicker">{copy.aboutKicker}</p>
        <h2 id="reference-about-title">{copy.aboutTitle}</h2>
        <p>{copy.aboutText}</p>
        <p>{copy.advisoryText}</p>
        <a className="text-link" href="/about/">
          {copy.readMore} <ArrowLeft size={16} />
        </a>
      </div>
    </section>
  );
}

export function AdvisoryTrustPanel() {
  const { copy } = useSiteLanguage();
  return (
    <section
      className="pillar-advisory pillar-advisory--reference"
      aria-labelledby="reference-advisory-title"
    >
      <div className="pillar-advisory__panel">
        <p className="section-kicker">{copy.advisoryKicker}</p>
        <h2 id="reference-advisory-title">{copy.advisoryTitle}</h2>
        <p>{copy.advisoryText}</p>
        <div className="pillar-advisory__line" />
        <h3>{copy.whyText}</h3>
      </div>
    </section>
  );
}
