import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileSpreadsheet,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  ContactForm,
  FloatingWhatsAppButton,
  HeroSocialLinks,
  SiteFooter,
  SiteHeader,
  THDWordmark,
} from "@/components/site-layout";
import {
  AdvisoryTrustPanel,
  CompanySpotlight,
  LatestServices,
  ReferenceAbout,
} from "@/components/home-reference-sections";
import {
  allServiceSlugs,
  featuredServiceImages,
  getPageBySlug,
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

const clientLogos = [
  "/images/THD_website_clinet/AZ_advertising_logo.png",
  "/images/THD_website_clinet/B_PERFECT.png",
  "/images/THD_website_clinet/DOMINATION.png",
  "/images/THD_website_clinet/Haunted.png",
  "/images/THD_website_clinet/TRADE_MARK.png",
  "/images/THD_website_clinet/apex.png",
  "/images/THD_website_clinet/aro_tech.png",
  "/images/THD_website_clinet/azblack.png",
  "/images/THD_website_clinet/braan.png",
  "/images/THD_website_clinet/egy_compass.png",
  "/images/THD_website_clinet/egypt_4_industry.png",
  "/images/THD_website_clinet/elite_legacy.png",
  "/images/THD_website_clinet/em.png",
  "/images/THD_website_clinet/gi.png",
  "/images/THD_website_clinet/he_and_she.png",
  "/images/THD_website_clinet/kneaded.png",
  "/images/THD_website_clinet/libra.png",
  "/images/THD_website_clinet/mega_express.png",
  "/images/THD_website_clinet/pack_it.png",
  "/images/THD_website_clinet/rak_ict.png",
  "/images/THD_website_clinet/spade.png",
  "/images/THD_website_clinet/ubase.png",
  "/images/THD_website_clinet/waffi.png",
  "/images/THD_website_clinet/we_estate.png",
  "/images/THD_website_clinet/zi_bag_plast.png",
  "/images/THD_website_clinet/الامثل_للمقاولات_.png",
  "/images/THD_website_clinet/البدري.png",
  "/images/THD_website_clinet/الليث.png",
  "/images/THD_website_clinet/المصرية_للعناية_بالمنسوجات.png",
  "/images/THD_website_clinet/بروجكت_كولكتيف.png",
  "/images/THD_website_clinet/تامز.png",
  "/images/THD_website_clinet/حسين_محمد_شافعي.png",
  "/images/THD_website_clinet/صيدلية_دكتور_ايه.png",
  "/images/THD_website_clinet/قهوة_المضيفة.png",
  "/images/THD_website_clinet/كوانتم_كير.png",
  "/images/THD_website_clinet/هايبر_الشمس.png",
  "/images/THD_website_clinet/يور_ماب.png",
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
  const clientsViewportRef = useRef<HTMLDivElement>(null);

  const scrollClients = (direction: "left" | "right") => {
    clientsViewportRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <script type="application/ld+json">
        {JSON.stringify(accountingServiceStructuredData)}
      </script>
      <section className="pillar-hero" id="home">
        <img
          className="pillar-hero__image"
          src="/images/pillar/hero-writing.jpg"
          alt=""
          fetchPriority="high"
          aria-hidden="true"
        />
        <SiteHeader variant="overlay" />
        <div className="pillar-hero__content">
          <p className="pillar-eyebrow">{copy.heroKicker}</p>
          <THDWordmark />
          <h1>{copy.heroTitle}</h1>
          <p className="hero-description">{copy.heroText}</p>
          <a className="pillar-button-hero" href="/contact/">
            {copy.contact} <ArrowUpRight size={16} />
          </a>
          <HeroSocialLinks />
        </div>
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
          {allServiceSlugs.map((slug, index) => {
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
        <img
          src="/%D8%AF%D8%B9%D9%85%20%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%85%D9%84%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%AC%D9%87%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AD%D9%83%D9%88%D9%85%D9%8A%D8%A9.png"
          alt={copy.governmentTitle}
          loading="lazy"
        />
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

      <section className="pillar-clients section-wrap" id="clients">
        <div className="client-marquee-header">
          <div className="client-marquee-header__label">
            <span className="section-kicker">
              {language === "ar" ? "شركاء النجاح" : "TRUSTED PARTNERS"}
            </span>
          </div>

          <h2>{language === "ar" ? "عملاؤنا وشركاء نجاحنا" : "Our Clients & Partners"}</h2>

          <p>
            {language === "ar"
              ? "نفخر بثقة مجموعة من الشركات والعلامات التجارية التي تشاركنا رحلة النجاح."
              : "Proud to work with businesses and brands that trust our expertise."}
          </p>
        </div>

        <div className="client-marquee">
          <button
            className="client-marquee__arrow"
            type="button"
            aria-label="Previous clients"
            onClick={() => scrollClients("left")}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="client-marquee__viewport"
            ref={clientsViewportRef}
            aria-label="Client logos"
          >
            <div className="client-marquee__track">
              {clientLogos.map((logo, index) => (
                <div className="client-logo-card" key={`${logo}-${index}`}>
                  <img src={logo} alt={`THD client ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <button
            className="client-marquee__arrow"
            type="button"
            aria-label="Next clients"
            onClick={() => scrollClients("right")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="pillar-consultation" id="contact">
        <div className="pillar-consultation__intro">
          <p className="section-kicker">{copy.consultationKicker}</p>
          <h2>{copy.consultationTitle}</h2>
          <p>{copy.consultationText}</p>
          <a href="tel:+201118383747" className="consult-phone">
            <bdi dir="ltr">{copy.phone}</bdi> <ArrowUpRight />
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
      <FloatingWhatsAppButton />
    </main>
  );
}
