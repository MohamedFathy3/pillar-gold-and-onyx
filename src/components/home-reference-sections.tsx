import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredServiceImages, getPageBySlug } from "@/data/site";

const latestServices = [
  {
    slug: "financial-statements-preparation",
    title: "إعداد البيانات المالية",
    image: featuredServiceImages["financial-statements-preparation"],
  },
  {
    slug: "tax-examination-inspection-support",
    title: "دعم الفحص والتفتيش الضريبي",
    image: featuredServiceImages["tax-examination-inspection-support"],
  },
  {
    slug: "tax-returns-filing",
    title: "تقديم الإقرارات الضريبية",
    image: featuredServiceImages["tax-returns-filing"],
  },
];

function serviceImage(slug: string) {
  return getPageBySlug(slug)?.images[0]?.src ?? featuredServiceImages[slug] ?? "/images/pillar/hero-writing.jpg";
}

const spotlightSlides = [
  { slug: "company-formation-registration", title: "تأسيس وتسجيل الشركات", image: serviceImage("company-formation-registration") },
  { slug: "financial-statements-preparation", title: "إعداد البيانات المالية", image: serviceImage("financial-statements-preparation") },
  { slug: "tax-returns-filing", title: "تقديم الإقرارات الضريبية", image: serviceImage("tax-returns-filing") },
];

export function LatestServices() {
  return (
    <section className="latest-services section-wrap" lang="ar" dir="rtl" aria-labelledby="latest-services-title">
      <div className="latest-services__header">
        <div>
          <p className="section-kicker">Pillar Group</p>
          <h2 id="latest-services-title">آخر خدماتنا</h2>
        </div>
        <a href="/services/">عرض كل الخدمات <ArrowLeft size={16} /></a>
      </div>
      <div className="latest-services__grid">
        {latestServices.map((service) => (
          <article className="latest-service-card" key={service.slug}>
            <a className="latest-service-card__image" href={`/${service.slug}/`} aria-label={`اقرأ المزيد: ${service.title}`}>
              <img src={service.image} alt={service.title} loading="lazy" />
            </a>
            <div className="latest-service-card__copy">
              <h3>{service.title}</h3>
              <a className="latest-service-card__link" href={`/${service.slug}/`}>اقرأ المزيد <ArrowLeft size={13} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CompanySpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = spotlightSlides[activeIndex]!;
  const goTo = (offset: number) => setActiveIndex((current) => (current + offset + spotlightSlides.length) % spotlightSlides.length);

  return (
    <section className="reference-spotlight" lang="ar" dir="rtl" aria-label="خدمات Pillar Group">
      <div className="reference-spotlight__watermark" aria-hidden="true">PILLAR</div>
      <div className="reference-spotlight__scene" aria-roledescription="carousel">
        <img className="reference-spotlight__image" src={slide.image} alt="" />
        <div className="reference-spotlight__shade" />
        <div className="reference-spotlight__content" aria-live="polite">
          <p className="section-kicker">خدماتنا</p>
          <h2>{slide.title}</h2>
          <a href={`/${slide.slug}/`}>اقرأ المزيد <ArrowLeft size={14} /></a>
        </div>
        <button className="reference-spotlight__control reference-spotlight__control--previous" type="button" onClick={() => goTo(-1)} aria-label="الخدمة السابقة">
          <ChevronRight size={18} />
        </button>
        <button className="reference-spotlight__control reference-spotlight__control--next" type="button" onClick={() => goTo(1)} aria-label="الخدمة التالية">
          <ChevronLeft size={18} />
        </button>
        <div className="reference-spotlight__dots" aria-label="اختيار الخدمة">
          {spotlightSlides.map((item, index) => (
            <button key={item.slug} type="button" onClick={() => setActiveIndex(index)} aria-label={`عرض ${item.title}`} aria-current={index === activeIndex ? "true" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceAbout() {
  return (
    <section className="pillar-about pillar-about--reference" id="about" lang="ar" dir="rtl" aria-labelledby="reference-about-title">
      <div className="pillar-about__brandmark">
        <img src="/images/reference/28605a96-12-768x278.png" alt="Pillar Advisory Group" loading="lazy" />
      </div>
      <div className="pillar-about__copy">
        <p className="section-kicker">Pillar Advisory Group</p>
        <h2 id="reference-about-title">معلومات عنا</h2>
        <p><strong>Pillar Group</strong> شركة محاسبة واستشارات مهنية تخدم الشركات في مختلف الصناعات والقطاعات. وبفضل خبرة فريقنا، نقدم إرشادات مالية موثوقة وتقارير دقيقة ودعمًا استراتيجيًا يساعد المؤسسات على العمل بوضوح والامتثال للمتطلبات.</p>
        <p>نعمل عن قرب مع عملائنا، من الشركات الناشئة والمنشآت الصغيرة والمتوسطة إلى المؤسسات الكبرى، لتقديم حلول تدعم النمو وتحد من المخاطر وتعزز الأداء المالي. ونؤمن بشراكات طويلة الأمد تقوم على الثقة والشفافية والقيمة الملموسة.</p>
        <a className="text-link" href="/about/">اقرأ المزيد <ArrowLeft size={16} /></a>
      </div>
    </section>
  );
}

export function AdvisoryTrustPanel() {
  return (
    <section className="pillar-advisory pillar-advisory--reference" lang="ar" dir="rtl" aria-labelledby="reference-advisory-title">
      <div className="pillar-advisory__panel">
        <p className="section-kicker">Pillar Group</p>
        <h2 id="reference-advisory-title">خدمات استشارية احترافية يمكنك الوثوق بها</h2>
        <p>نقدم دعمًا ماليًا وضريبيًا واضحًا وموثوقًا، يساعد أعمالك على الامتثال واتخاذ قرارات أفضل والنمو بثقة.</p>
        <div className="pillar-advisory__line" />
        <h3>نحن لا نقدم النصائح فحسب، بل نساعدك على اختيار الاتجاه الصحيح والنمو بثقة.</h3>
      </div>
    </section>
  );
}
