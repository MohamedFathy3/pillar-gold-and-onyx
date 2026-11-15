import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SiteLanguage } from "@/data/site";

const LanguageContext = createContext<{
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
}>({ language: "en", setLanguage: () => undefined });

export const uiCopy = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      why: "Why THD",
      about: "About THD",
      contact: "Contact",
    },
    language: "العربية",
    heroKicker: "Accounting · Tax · Financial Consultancy",
    heroTitle: "Clear numbers. Confident decisions.",
    heroText:
      "Practical accounting and financial support for businesses in Cairo and across Egypt.",
    contact: "Talk to THD",
    whatsapp: "Chat on WhatsApp",
    servicesKicker: "What we do",
    servicesTitle: "Financial support that moves your business forward.",
    servicesText:
      "From daily accounting to tax compliance and business advisory, THD helps you keep the important numbers clear.",
    allServices: "View all services",
    latestKicker: "Practical support",
    latestTitle: "Services built around your needs",
    aboutKicker: "About THD",
    aboutTitle: "A trusted partner for the numbers behind your business.",
    aboutText:
      "THD Certified Accountant is a Cairo-based financial service and consultancy focused on clarity, practical guidance, and reliable follow-up.",
    readMore: "Read more",
    advisoryKicker: "A clearer way forward",
    advisoryTitle: "Professional advice you can act on.",
    advisoryText:
      "We keep the conversation clear, the process organized, and the advice connected to the decisions your business actually needs to make.",
    whyKicker: "Why clients choose THD",
    whyTitle: "Professional insight. Personal commitment.",
    whyText:
      "You get careful work, clear communication, and support that respects the context of your business.",
    governmentKicker: "Official procedures and compliance",
    governmentTitle: "Government requirements, handled with care.",
    governmentText:
      "We help you organize documents, submissions, and follow-up so your business can keep moving.",
    consultationKicker: "Start a conversation",
    consultationTitle: "Let’s make your next step clearer.",
    consultationText:
      "Call or message THD to discuss the accounting, tax, or financial support your business needs.",
    phone: "+20 11 1838 3747",
    formKicker: "Send us a message",
    formTitle: "Tell us what your business needs.",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "name@company.com",
    messagePlaceholder: "How can we help?",
    send: "Open WhatsApp",
    sent: "Your message is ready in WhatsApp. Please review and send it there.",
    footerText: "Accounting, tax, and financial consultancy for businesses in Egypt.",
    getInTouch: "Get in touch",
    explore: "Explore",
    follow: "Follow THD",
    address: "31 El Obour Buildings, Salah Salem Road, Cairo, Egypt",
    request: "Request a consultation",
    homePage: "Home",
    pageNotFound: "Page not found",
    goHome: "Go home",
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      why: "لماذا THD؟",
      about: "عن THD",
      contact: "تواصل معنا",
    },
    language: "English",
    heroKicker: "محاسبة · ضرائب · استشارات مالية",
    heroTitle: "أرقام أوضح. قرارات أكثر ثقة.",
    heroText: "دعم محاسبي ومالي عملي للأعمال في القاهرة وجميع أنحاء مصر.",
    contact: "تحدث مع THD",
    whatsapp: "تواصل عبر واتساب",
    servicesKicker: "ماذا نقدم",
    servicesTitle: "دعم مالي يساعد نشاطك على التقدم.",
    servicesText:
      "من المحاسبة اليومية إلى الامتثال الضريبي واستشارات الأعمال، تساعدك THD على إبقاء الأرقام المهمة واضحة.",
    allServices: "عرض كل الخدمات",
    latestKicker: "دعم عملي",
    latestTitle: "خدمات مبنية حول احتياجك",
    aboutKicker: "عن THD",
    aboutTitle: "شريك موثوق للأرقام التي تقف خلف نشاطك.",
    aboutText:
      "THD Certified Accountant جهة خدمات مالية واستشارات مقرها القاهرة، تركز على الوضوح والإرشاد العملي والمتابعة الموثوقة.",
    readMore: "اقرأ المزيد",
    advisoryKicker: "طريق أوضح إلى الأمام",
    advisoryTitle: "مشورة مهنية يمكنك تطبيقها.",
    advisoryText:
      "نحافظ على وضوح الحوار وتنظيم الإجراءات وربط المشورة بالقرارات التي يحتاج نشاطك إلى اتخاذها فعليًا.",
    whyKicker: "لماذا يختار العملاء THD؟",
    whyTitle: "خبرة مهنية. التزام شخصي.",
    whyText: "تحصل على عمل دقيق وتواصل واضح ودعم يراعي طبيعة نشاطك.",
    governmentKicker: "الإجراءات الرسمية والامتثال",
    governmentTitle: "متطلبات الجهات الحكومية، بعناية.",
    governmentText: "نساعدك على تنظيم المستندات والتقديمات والمتابعة حتى يستمر نشاطك في التقدم.",
    consultationKicker: "ابدأ حوارًا",
    consultationTitle: "لنجعل خطوتك القادمة أوضح.",
    consultationText:
      "اتصل أو أرسل رسالة إلى THD لمناقشة الدعم المحاسبي أو الضريبي أو المالي الذي يحتاجه نشاطك.",
    phone: "+20 11 1838 3747",
    formKicker: "أرسل لنا رسالة",
    formTitle: "أخبرنا بما يحتاجه نشاطك.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    namePlaceholder: "اسمك",
    emailPlaceholder: "name@company.com",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    send: "فتح واتساب",
    sent: "رسالتك جاهزة في واتساب. راجعها ثم أرسلها.",
    footerText: "استشارات محاسبية وضريبية ومالية للأعمال في مصر.",
    getInTouch: "تواصل معنا",
    explore: "استكشف",
    follow: "تابع THD",
    address: "٣١ عمارات العبور، طريق صلاح سالم، القاهرة، مصر",
    request: "اطلب استشارة",
    homePage: "الرئيسية",
    pageNotFound: "الصفحة غير موجودة",
    goHome: "العودة للرئيسية",
  },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("thd-language") === "ar" ? "ar" : "en";
  });
  const setLanguage = (next: SiteLanguage) => {
    setLanguageState(next);
    window.localStorage.setItem("thd-language", next);
  };
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.dataset.language = language;
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  return { language, setLanguage, copy: uiCopy[language] };
}
