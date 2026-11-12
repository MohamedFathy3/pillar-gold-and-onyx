import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  ClipboardCheck,
  FileSpreadsheet,
  Search,
  ShieldCheck,
} from "lucide-react";
import { ContactForm, SiteFooter, SiteHeader } from "@/components/site-layout";
import {
  AdvisoryTrustPanel,
  CompanySpotlight,
  LatestServices,
  ReferenceAbout,
} from "@/components/home-reference-sections";
import {
  featuredServiceImages,
  featuredServiceSlugs,
  getPageBySlug,
  otherServiceSlugs,
} from "@/data/site";
import { useSiteLanguage } from "@/lib/i18n";
import {
  accountingServiceStructuredData,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  SITE_URL,
} from "@/lib/seo";

const serviceIcons = [
  ClipboardCheck,
  Calculator,
  ShieldCheck,
  FileSpreadsheet,
  Search,
  FileSpreadsheet,
];
const audiences = [
  "Startups & entrepreneurs",
  "Small and growing businesses",
  "Established companies",
  "Owners who want clarity",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} | Chartered Accountant in Cairo, Egypt` },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      {
        name: "keywords",
        content:
          "Nour Essam El-Din, chartered accountant Cairo, accountant Egypt, accounting services, tax services, audit, محاسب قانوني, محاسب قانوني القاهرة, محاسب قانوني مصر, خدمات محاسبية, خدمات ضريبية",
      },
      { property: "og:url", content: SITE_URL },
      {
        property: "og:title",
        content: `${SITE_NAME} | Chartered Accountant in Cairo, Egypt`,
      },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: SITE_SOCIAL_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} logo` },
      { name: "twitter:title", content: `${SITE_NAME} | Chartered Accountant in Egypt` },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_SOCIAL_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: HomePage,
});

function HomePage() {
  const { language, copy } = useSiteLanguage();
  return (
    <main>
      <script type="application/ld+json">
        {JSON.stringify(accountingServiceStructuredData)}
      </script>
      <section className="pillar-hero" id="home">
        <video
          className="pillar-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/AI_managing_accounting_process_66c6bfe3.mp4" type="video/mp4" />
        </video>
        <SiteHeader variant="overlay" />
        <svg
          className="pillar-hero__wave"
          viewBox="0 0 1920 110"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="pillar-hero__wave-accent"
            d="M0 12C330 30 600 92 900 76S1510 18 1920 0V110H0Z"
          />
          <path d="M0 32C330 48 610 108 920 91S1520 40 1920 25V110H0Z" />
        </svg>
      </section>

      <section className="pillar-services section-wrap" id="services">
        <div className="section-heading">
          <p className="section-kicker">{copy.servicesKicker}</p>
          <h2>{copy.servicesTitle}</h2>
          <p>{copy.servicesText}</p>
        </div>
        <div className="service-grid">
          {featuredServiceSlugs.map((slug, index) => {
            const service = getPageBySlug(slug);
            const Icon = serviceIcons[index] ?? ClipboardCheck;
            if (!service) return null;
            const title = language === "ar" ? service.arTitle : service.title;
            return (
              <article className="service-item" key={slug}>
                <a
                  className="service-photo"
                  href={`/${slug}/`}
                  aria-label={`${copy.readMore}: ${title}`}
                >
                  <img src={featuredServiceImages[slug]} alt={title} loading="lazy" />
                  <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-icon">
                    <Icon />
                  </span>
                </a>
                <div className="service-caption">
                  <h3>{title}</h3>
                  <a href={`/${slug}/`} aria-label={`${copy.readMore}: ${title}`}>
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="other-services">
          <div>
            <p className="section-kicker">{copy.latestKicker}</p>
            <h3>{copy.allServices}</h3>
          </div>
          <div className="other-service-list">
            {otherServiceSlugs.map((slug, index) => {
              const service = getPageBySlug(slug);
              if (!service) return null;
              return (
                <a href={`/${slug}/`} key={slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {language === "ar" ? service.arTitle : service.title}
                  <ArrowRight />
                </a>
              );
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
          <p className="section-kicker">{copy.whyKicker}</p>
          <h2>{copy.whyTitle}</h2>
          <p>{copy.whyText}</p>
          <a href="/why-us/" className="text-link">
            {copy.readMore} <ArrowRight />
          </a>
        </div>
        <div className="pillar-trust__seal">
          <div className="seal-ring">
            <ShieldCheck />
            <span>TRUSTED ADVISORY</span>
            <b>THD</b>
            <span>BUILT ON CLARITY</span>
          </div>
        </div>
      </section>

      <section className="pillar-government">
        <img src="/images/pillar/about-team.jpg" alt={copy.governmentTitle} loading="lazy" />
        <div className="pillar-government__shade" />
        <div className="pillar-government__content">
          <p className="section-kicker">{copy.governmentKicker}</p>
          <h2>{copy.governmentTitle}</h2>
          <p className="government-description">{copy.governmentText}</p>
          <ul>
            <li>
              <Check />{" "}
              {language === "ar"
                ? "تنظيم المستندات والتقديمات الرسمية"
                : "Organized documents and official submissions"}
            </li>
            <li>
              <Check />{" "}
              {language === "ar"
                ? "متابعة الإجراءات مع الجهات المختصة"
                : "Follow-up with relevant authorities"}
            </li>
            <li>
              <Check />{" "}
              {language === "ar"
                ? "دعم يركز على الامتثال وتقليل التأخير"
                : "Compliance-focused support that reduces friction"}
            </li>
          </ul>
          <a href="/government-authorities-support/" className="pillar-button-hero">
            {copy.request} <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section className="pillar-clients section-wrap">
        <div className="section-heading">
          <p className="section-kicker">{copy.aboutKicker}</p>
          <h2>{language === "ar" ? "لمن نقدم الدعم؟" : "Who we support"}</h2>
          <p>
            {language === "ar"
              ? "دعم محاسبي ومالي يناسب مراحل مختلفة من نمو الأعمال."
              : "Accounting and financial support for different stages of business growth."}
          </p>
        </div>
        <div className="client-grid">
          {audiences.map((audience, index) => (
            <div className="client-name" key={audience}>
              <span className="client-mark">{String(index + 1).padStart(2, "0")}</span>
              <span>
                {language === "ar"
                  ? [
                      "الشركات الناشئة ورواد الأعمال",
                      "الشركات الصغيرة والمتنامية",
                      "الشركات القائمة",
                      "أصحاب الأعمال الباحثون عن الوضوح",
                    ][index]
                  : audience}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="pillar-consultation" id="contact">
        <div className="pillar-consultation__intro">
          <p className="section-kicker">{copy.consultationKicker}</p>
          <h2>{copy.consultationTitle}</h2>
          <p>{copy.consultationText}</p>
          <a href="tel:+201094866609" className="consult-phone">
            {copy.phone} <ArrowUpRight />
          </a>
        </div>
        <ContactForm className="consultation-form" />
      </section>
      <section className="pillar-feasibility">
        <div className="pillar-feasibility__symbol">
          <FileSpreadsheet />
        </div>
        <div>
          <p className="section-kicker">
            {language === "ar" ? "خطط لنشاطك بثقة" : "Plan your business with confidence"}
          </p>
          <h2>
            {language === "ar" ? "ابدأ بخطة مالية واضحة." : "Start with a clearer financial plan."}
          </h2>
        </div>
        <ul>
          {(language === "ar"
            ? [
                "تحليل السوق والمنافسين",
                "التوقعات المالية",
                "تخطيط احتياجات الاستثمار",
                "تقييم المخاطر",
              ]
            : [
                "Market and competitor analysis",
                "Financial projections",
                "Investment needs planning",
                "Risk assessment",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href="/feasibility-studies-project-evaluation/" className="feasibility-link">
          {copy.request} <ArrowUpRight />
        </a>
      </section>
      <SiteFooter />
      <a className="pillar-contact-float" href="/contact/">
        {copy.contact} <ArrowUpRight size={14} />
      </a>
    </main>
  );
}
