export type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string };

export type SiteLanguage = "en" | "ar";
export type ReferencePage = {
  route: string;
  slug: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
  images: Extract<ContentBlock, { type: "image" }>[];
  arTitle: string;
  arDescription: string;
  arBlocks: ContentBlock[];
};

const heroImage = "/images/pillar/hero-writing.jpg";
const aboutImage = "/images/pillar/about-team.jpg";
const serviceImage = "/images/pillar/audit-service.jpg";
export const featuredServiceImages: Record<string, string> = {
  "audit-external-financial-review": "/images/service/المراجعة والتدقيق امالى الخارجى.png",
  "comprehensive-tax-advisory": "/images/service/الاستشارات الضريبية الشاملة_.png",
  "internal-audit-services": "/images/service/خدمات المراجعة الداخلية_.png",
  "tax-returns-filing": "/images/service/اعداد وتقديدم القراارت الضريبيبة.png",
  "tax-examination-inspection-support": "/images/service/دعم الفحض والتفتيش الضريبي.png",
  "financial-statements-preparation": "/images/service/اعداد القوائم المالية_.png",
  "e-invoicing-services": "/images/pillar/tax-filing.jpg",
  "company-formation-registration": aboutImage,
  "payroll-internal-reporting-support": "/images/pillar/statements.jpg",
  "feasibility-studies-project-evaluation": heroImage,
  "assets-business-valuation": serviceImage,
  "government-authorities-support": "/images/pillar/tax-examination.jpg",
  "integrated-financial-accounting-services": "/images/pillar/statements.jpg",
};

type ServiceCopy = {
  slug: string;
  title: string;
  arTitle: string;
  description: string;
  arDescription: string;
  benefits: string[];
  arBenefits: string[];
};
const services: ServiceCopy[] = [
  {
    slug: "audit-external-financial-review",
    title: "Audit & External Financial Review",
    arTitle: "المراجعة والتدقيق المالي الخارجي",
    description:
      "Independent financial review that brings clarity to your records, strengthens confidence in reporting, and supports better business decisions.",
    arDescription:
      "مراجعة مالية مستقلة تمنحك وضوحًا أكبر في سجلاتك، وتعزز الثقة في التقارير، وتدعم قرارات أعمال أفضل.",
    benefits: [
      "Review of financial records and reporting processes",
      "Clear observations and practical recommendations",
      "Support for reliable, decision-ready financial information",
    ],
    arBenefits: [
      "مراجعة السجلات والعمليات المالية",
      "ملاحظات واضحة وتوصيات عملية",
      "دعم معلومات مالية موثوقة وجاهزة لاتخاذ القرار",
    ],
  },
  {
    slug: "comprehensive-tax-advisory",
    title: "Comprehensive Tax Advisory",
    arTitle: "الاستشارات الضريبية الشاملة",
    description:
      "Practical tax guidance for compliance, planning, and day-to-day decisions, shaped around your business activity and obligations.",
    arDescription:
      "إرشاد ضريبي عملي للامتثال والتخطيط والقرارات اليومية، مصمم بما يناسب نشاطك والتزاماتك.",
    benefits: [
      "Tax planning and compliance guidance",
      "Review of tax positions and obligations",
      "Clear answers before important decisions",
    ],
    arBenefits: [
      "التخطيط الضريبي وإرشادات الامتثال",
      "مراجعة المواقف والالتزامات الضريبية",
      "إجابات واضحة قبل اتخاذ القرارات المهمة",
    ],
  },
  {
    slug: "internal-audit-services",
    title: "Internal Audit Services",
    arTitle: "خدمات المراجعة الداخلية",
    description:
      "A focused view of controls, processes, and risks so your team can reduce gaps and operate with greater confidence.",
    arDescription:
      "رؤية عملية للضوابط والإجراءات والمخاطر لمساعدة فريقك على تقليل الثغرات والعمل بثقة أكبر.",
    benefits: [
      "Process and control reviews",
      "Risk-focused observations",
      "Actionable steps to improve internal operations",
    ],
    arBenefits: [
      "مراجعة الإجراءات والضوابط",
      "ملاحظات تركز على المخاطر",
      "خطوات قابلة للتنفيذ لتحسين العمليات الداخلية",
    ],
  },
  {
    slug: "tax-returns-filing",
    title: "Tax Returns Filing",
    arTitle: "إعداد وتقديم الإقرارات الضريبية",
    description:
      "Organized preparation and filing support that helps keep your tax submissions accurate, timely, and aligned with your records.",
    arDescription:
      "دعم منظم لإعداد وتقديم الإقرارات يساعد على دقة التسليم والالتزام بالمواعيد واتساق الإقرارات مع سجلاتك.",
    benefits: [
      "Preparation based on reviewed records",
      "Filing calendar and deadline awareness",
      "Documentation support for a smoother process",
    ],
    arBenefits: [
      "إعداد الإقرارات بناءً على سجلات تمت مراجعتها",
      "متابعة المواعيد النهائية",
      "دعم المستندات لتسهيل الإجراءات",
    ],
  },
  {
    slug: "tax-examination-inspection-support",
    title: "Tax Examination & Inspection Support",
    arTitle: "دعم الفحص والتفتيش الضريبي",
    description:
      "Professional preparation and follow-up during tax examinations, with clear documentation and a calm, organized process.",
    arDescription:
      "استعداد ومتابعة مهنية أثناء الفحوصات الضريبية، مع مستندات واضحة وإجراءات منظمة وهادئة.",
    benefits: [
      "Preparation of supporting documentation",
      "Coordination and follow-up during the examination",
      "Clear responses and organized records",
    ],
    arBenefits: [
      "تجهيز المستندات المؤيدة",
      "التنسيق والمتابعة أثناء الفحص",
      "ردود واضحة وسجلات منظمة",
    ],
  },
  {
    slug: "financial-statements-preparation",
    title: "Financial Statements Preparation",
    arTitle: "إعداد القوائم المالية",
    description:
      "Accurate financial statements that turn your accounting records into information you can understand, share, and act on.",
    arDescription:
      "قوائم مالية دقيقة تحول سجلاتك المحاسبية إلى معلومات مفهومة يمكن مشاركتها والاستناد إليها في القرار.",
    benefits: [
      "Period-end closing and reporting support",
      "Clear presentation of financial performance",
      "Statements prepared for management and stakeholders",
    ],
    arBenefits: [
      "دعم الإقفال وإعداد التقارير الدورية",
      "عرض واضح للأداء المالي",
      "قوائم مناسبة للإدارة وأصحاب المصلحة",
    ],
  },
  {
    slug: "e-invoicing-services",
    title: "E-Invoicing Services",
    arTitle: "خدمات الفاتورة الإلكترونية",
    description:
      "Support for setting up, organizing, and operating electronic invoicing in a way that fits your records and workflow.",
    arDescription: "دعم إعداد وتنظيم وتشغيل الفوترة الإلكترونية بما يتناسب مع سجلاتك وطريقة عملك.",
    benefits: [
      "Readiness and process review",
      "Practical setup guidance",
      "Ongoing organization of invoice records",
    ],
    arBenefits: [
      "مراجعة الجاهزية والإجراءات",
      "إرشادات عملية للإعداد",
      "تنظيم مستمر لسجلات الفواتير",
    ],
  },
  {
    slug: "company-formation-registration",
    title: "Company Formation & Registration",
    arTitle: "تأسيس وتسجيل الشركات",
    description:
      "A clear path from business idea to registered entity, with practical guidance on accounting and documentation foundations.",
    arDescription:
      "طريق واضح من فكرة المشروع إلى الكيان المسجل، مع إرشادات عملية للأسس المحاسبية والمستندية.",
    benefits: [
      "Initial structure and activity guidance",
      "Documentation and registration coordination",
      "Accounting setup for a confident start",
    ],
    arBenefits: [
      "إرشادات الهيكل والنشاط من البداية",
      "تنسيق المستندات وإجراءات التسجيل",
      "إعداد محاسبي يساعد على بداية قوية",
    ],
  },
  {
    slug: "payroll-internal-reporting-support",
    title: "Payroll & Internal Reporting Support",
    arTitle: "دعم الرواتب والتقارير الداخلية",
    description:
      "Reliable payroll and management reporting support that helps your business keep people, records, and decisions aligned.",
    arDescription: "دعم موثوق للرواتب وتقارير الإدارة يساعد على اتساق الموظفين والسجلات والقرارات.",
    benefits: [
      "Payroll process organization",
      "Internal management reports",
      "Practical monthly reporting rhythm",
    ],
    arBenefits: ["تنظيم إجراءات الرواتب", "تقارير داخلية للإدارة", "نظام عملي للتقارير الشهرية"],
  },
  {
    slug: "feasibility-studies-project-evaluation",
    title: "Feasibility Studies & Project Evaluation",
    arTitle: "دراسات الجدوى وتقييم المشروعات",
    description:
      "Structured analysis of market, costs, projections, and risks to help you assess an opportunity before committing resources.",
    arDescription:
      "تحليل منظم للسوق والتكاليف والتوقعات والمخاطر لمساعدتك على تقييم الفرصة قبل استثمار الموارد.",
    benefits: [
      "Market and competitor review",
      "Financial projections and investment needs",
      "Risk-focused project evaluation",
    ],
    arBenefits: [
      "مراجعة السوق والمنافسين",
      "توقعات مالية واحتياجات الاستثمار",
      "تقييم للمشروع يركز على المخاطر",
    ],
  },
  {
    slug: "assets-business-valuation",
    title: "Assets & Business Valuation",
    arTitle: "تقييم الأصول والأعمال",
    description:
      "A reasoned view of business or asset value to support planning, transactions, financing, and informed negotiations.",
    arDescription:
      "تقدير مهني لقيمة النشاط أو الأصل لدعم التخطيط والصفقات والتمويل والمفاوضات الواعية.",
    benefits: [
      "Review of financial and operating information",
      "Valuation approach suited to the purpose",
      "A clear basis for discussion and decisions",
    ],
    arBenefits: [
      "مراجعة المعلومات المالية والتشغيلية",
      "منهج تقييم يناسب الغرض المطلوب",
      "أساس واضح للنقاش واتخاذ القرار",
    ],
  },
  {
    slug: "government-authorities-support",
    title: "Government Authorities Support & Compliance",
    arTitle: "دعم الجهات الحكومية والامتثال",
    description:
      "Organized support for official procedures, submissions, and follow-up so your business can handle requirements with less friction.",
    arDescription:
      "دعم منظم للإجراءات والتقديمات والمتابعة الرسمية حتى يتعامل نشاطك مع المتطلبات بسهولة أكبر.",
    benefits: [
      "Preparation and review of official submissions",
      "Follow-up with relevant authorities",
      "Compliance-focused documentation and coordination",
    ],
    arBenefits: [
      "إعداد ومراجعة التقديمات الرسمية",
      "المتابعة مع الجهات المختصة",
      "مستندات وتنسيق يركزان على الامتثال",
    ],
  },
  {
    slug: "integrated-financial-accounting-services",
    title: "Integrated Financial & Accounting Services for SMEs",
    arTitle: "الخدمات المالية والمحاسبية المتكاملة للمنشآت متناهية الصغر والصغيرة والمتوسطة",
    description:
      "Ongoing bookkeeping, reporting, and financial follow-up to keep your business records organized and your decisions informed.",
    arDescription:
      "خدمات مالية ومحاسبية متكاملة تساعد المنشأة على تنظيم سجلاتها ومتابعة أرقامها واتخاذ قرارات مبنية على معلومات دقيقة.",
    benefits: [
      "Bookkeeping and accounting record keeping",
      "Accounts receivable and payable follow-up",
      "Cash-flow monitoring and periodic reporting",
      "Document control and transaction matching",
      "Optional support for payroll, e-invoicing, and tax coordination",
    ],
    arBenefits: [
      "مسك الدفاتر والسجلات المحاسبية",
      "متابعة حسابات العملاء والموردين",
      "متابعة التدفقات النقدية وإعداد التقارير الدورية",
      "التسويات والمطابقات وتنظيم المستندات",
      "خدمات إضافية مثل الرواتب والفاتورة الإلكترونية والتنسيق الضريبي حسب الحاجة",
    ],
  },
];

function serviceBlocks(service: ServiceCopy, language: SiteLanguage): ContentBlock[] {
  const ar = language === "ar";
  const title = ar ? service.arTitle : service.title;
  return [
    { type: "paragraph", text: ar ? service.arDescription : service.description },
    {
      type: "heading",
      level: 2,
      text: ar ? `كيف نساعدك في ${title}` : `How THD supports you with ${title}`,
    },
    { type: "list", ordered: false, items: ar ? service.arBenefits : service.benefits },
    {
      type: "paragraph",
      text: ar
        ? "نبدأ بفهم نشاطك واحتياجك، ثم نقدم خطوات عملية ومعلومات واضحة تساعدك على التحرك بثقة."
        : "We start by understanding your activity and needs, then provide practical steps and clear information that help you move forward with confidence.",
    },
  ];
}
const image = (src: string, alt: string) => [
  { type: "image", src, alt } as Extract<ContentBlock, { type: "image" }>,
];
function makeServicePage(service: ServiceCopy): ReferencePage {
  return {
    route: `/${service.slug}/`,
    slug: service.slug,
    title: service.title,
    description: service.description,
    blocks: serviceBlocks(service, "en"),
    images: image(featuredServiceImages[service.slug] ?? heroImage, service.title),
    arTitle: service.arTitle,
    arDescription: service.arDescription,
    arBlocks: serviceBlocks(service, "ar"),
  };
}

const generalPages: ReferencePage[] = [
  {
    route: "/services/",
    slug: "services",
    title: "Our Services",
    description:
      "Accounting, tax, audit, and business advisory support for companies and entrepreneurs in Egypt.",
    blocks: [
      {
        type: "paragraph",
        text: "THD Certified Accountant provides practical accounting and financial support for businesses that want clearer records, stronger compliance, and more confident decisions.",
      },
    ],
    images: image(heroImage, "THD financial and accounting services"),
    arTitle: "خدماتنا",
    arDescription: "خدمات محاسبية وضريبية وتدقيق واستشارات أعمال للشركات ورواد الأعمال في مصر.",
    arBlocks: [
      {
        type: "paragraph",
        text: "يقدم THD Certified Accountant دعمًا محاسبيًا وماليًا عمليًا للأعمال التي تبحث عن سجلات أوضح وامتثال أقوى وقرارات أكثر ثقة.",
      },
    ],
  },
  {
    route: "/about/",
    slug: "about",
    title: "About THD",
    description:
      "A practical accounting and financial consultancy for businesses that value clarity, responsiveness, and reliable support.",
    blocks: [
      {
        type: "paragraph",
        text: "THD Certified Accountant is a Cairo-based financial service and consultancy focused on helping businesses organize their numbers, understand their obligations, and move forward with confidence.",
      },
      { type: "heading", level: 2, text: "Our approach" },
      {
        type: "paragraph",
        text: "We keep the conversation clear, the process organized, and the advice connected to the decisions your business actually needs to make.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Clear communication",
          "Practical financial guidance",
          "Reliable follow-up",
          "Long-term client relationships",
        ],
      },
    ],
    images: image(aboutImage, "THD team and client consultation"),
    arTitle: "عن THD",
    arDescription:
      "استشارات محاسبية ومالية عملية للأعمال التي تقدر الوضوح وسرعة الاستجابة والدعم الموثوق.",
    arBlocks: [
      {
        type: "paragraph",
        text: "THD Certified Accountant جهة خدمات مالية واستشارات مقرها القاهرة، تركز على مساعدة الأعمال في تنظيم أرقامها وفهم التزاماتها والتحرك بثقة.",
      },
      { type: "heading", level: 2, text: "منهجنا في العمل" },
      {
        type: "paragraph",
        text: "نحافظ على وضوح الحوار وتنظيم الإجراءات وربط المشورة بالقرارات التي يحتاج نشاطك إلى اتخاذها فعليًا.",
      },
      {
        type: "list",
        ordered: false,
        items: ["تواصل واضح", "إرشاد مالي عملي", "متابعة موثوقة", "علاقات طويلة الأمد مع العملاء"],
      },
    ],
  },
  {
    route: "/why-us/",
    slug: "why-us",
    title: "Why Choose THD",
    description:
      "Professional support that is clear, practical, and built around your business context.",
    blocks: [
      {
        type: "paragraph",
        text: "The right accountant should make your next decision clearer. THD combines technical care with practical communication, so you can understand what matters and what to do next.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Business-minded advice",
          "Attention to detail",
          "Professional confidentiality",
          "Responsive follow-up",
        ],
      },
    ],
    images: image(aboutImage, "THD professional advisory meeting"),
    arTitle: "لماذا تختار THD؟",
    arDescription: "دعم مهني واضح وعملي مبني على طبيعة نشاطك واحتياجاته.",
    arBlocks: [
      {
        type: "paragraph",
        text: "المحاسب المناسب يجعل قرارك القادم أوضح. يجمع THD بين الدقة المهنية والتواصل العملي حتى تفهم ما يهمك وما يجب فعله بعد ذلك.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "مشورة تفهم طبيعة الأعمال",
          "اهتمام بالتفاصيل",
          "سرية مهنية",
          "متابعة سريعة وموثوقة",
        ],
      },
    ],
  },
  {
    route: "/contact/",
    slug: "contact",
    title: "Get in Touch",
    description:
      "Talk to THD about accounting, tax, compliance, or financial support for your business.",
    blocks: [
      {
        type: "paragraph",
        text: "Tell us what your business needs and we will help you identify the right next step.",
      },
    ],
    images: image(heroImage, "Contact THD Certified Accountant"),
    arTitle: "تواصل معنا",
    arDescription: "تحدث مع THD عن المحاسبة أو الضرائب أو الامتثال أو الدعم المالي لنشاطك.",
    arBlocks: [
      {
        type: "paragraph",
        text: "أخبرنا بما يحتاجه نشاطك وسنساعدك على تحديد الخطوة المناسبة التالية.",
      },
    ],
  },
  {
    route: "/privacy-policy/",
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How THD handles information shared through this website.",
    blocks: [
      {
        type: "paragraph",
        text: "THD respects your privacy. Information you share through the contact form is used to respond to your enquiry and is not sold to third parties.",
      },
      { type: "heading", level: 2, text: "Contact information" },
      {
        type: "paragraph",
        text: "For questions about this policy or your information, contact THD using the phone or WhatsApp details on this website.",
      },
    ],
    images: [],
    arTitle: "سياسة الخصوصية",
    arDescription: "كيفية تعامل THD مع المعلومات التي تشاركها عبر هذا الموقع.",
    arBlocks: [
      {
        type: "paragraph",
        text: "تحترم THD خصوصيتك. تُستخدم المعلومات التي تشاركها من خلال نموذج التواصل للرد على استفسارك ولا يتم بيعها لأطراف أخرى.",
      },
      { type: "heading", level: 2, text: "معلومات التواصل" },
      {
        type: "paragraph",
        text: "للاستفسار عن هذه السياسة أو عن معلوماتك، تواصل مع THD عبر الهاتف أو واتساب الموضحين في هذا الموقع.",
      },
    ],
  },
  {
    route: "/shows/",
    slug: "shows",
    title: "THD Insights",
    description: "Practical financial and tax insights from THD.",
    blocks: [
      {
        type: "paragraph",
        text: "Follow THD on social media for practical financial and tax content.",
      },
    ],
    images: image(heroImage, "THD insights"),
    arTitle: "رؤى THD",
    arDescription: "محتوى مالي وضريبي عملي من THD.",
    arBlocks: [
      {
        type: "paragraph",
        text: "تابع THD على وسائل التواصل الاجتماعي للحصول على محتوى مالي وضريبي عملي.",
      },
    ],
  },
  {
    route: "/lessons/",
    slug: "lessons",
    title: "Financial Notes",
    description: "Simple explanations for everyday accounting and tax questions.",
    blocks: [
      {
        type: "paragraph",
        text: "We share practical explanations to help business owners understand their numbers and obligations.",
      },
    ],
    images: image(heroImage, "THD financial notes"),
    arTitle: "ملاحظات مالية",
    arDescription: "شروحات مبسطة للأسئلة المحاسبية والضريبية اليومية.",
    arBlocks: [
      {
        type: "paragraph",
        text: "نشارك شروحات عملية تساعد أصحاب الأعمال على فهم أرقامهم والتزاماتهم.",
      },
    ],
  },
  {
    route: "/sample-page/",
    slug: "sample-page",
    title: "Business Support",
    description: "A practical starting point for organized financial support.",
    blocks: [
      {
        type: "paragraph",
        text: "Connect with THD to discuss the financial support your business needs.",
      },
    ],
    images: image(aboutImage, "THD business support"),
    arTitle: "دعم الأعمال",
    arDescription: "بداية عملية للحصول على دعم مالي منظم.",
    arBlocks: [{ type: "paragraph", text: "تواصل مع THD لمناقشة الدعم المالي الذي يحتاجه نشاطك." }],
  },
];

export const referencePages: ReferencePage[] = [
  ...generalPages.slice(0, 5),
  ...services.map(makeServicePage),
  ...generalPages.slice(5),
];
export function getPageBySlug(slug: string): ReferencePage | undefined {
  return referencePages.find((page) => page.slug === slug);
}
export function getLocalizedPage(page: ReferencePage, language: SiteLanguage): ReferencePage {
  return language === "en"
    ? page
    : { ...page, title: page.arTitle, description: page.arDescription, blocks: page.arBlocks };
}
export function isBrandmarkImage(_image: { src: string; alt: string }) {
  return false;
}
export function getLeadImage(page: ReferencePage) {
  return page.images[0];
}
export function getLeadImageAlt(page: ReferencePage) {
  return getLeadImage(page)?.alt || page.title;
}
export const featuredServiceSlugs = services.slice(0, 6).map((service) => service.slug);
export const otherServiceSlugs = services.slice(6).map((service) => service.slug);
export const allServiceSlugs = services.map((service) => service.slug);
export const allServicePages = allServiceSlugs.flatMap((slug) => {
  const page = getPageBySlug(slug);
  return page ? [{ slug, title: page.title, arTitle: page.arTitle, route: page.route }] : [];
});
export const primaryNavigation = [
  { label: "Home", arLabel: "الرئيسية", href: "/" },
  { label: "Services", arLabel: "الخدمات", href: "/services/" },
  { label: "Why THD", arLabel: "لماذا THD؟", href: "/why-us/" },
  { label: "About THD", arLabel: "عن THD", href: "/about/" },
  { label: "Contact", arLabel: "تواصل معنا", href: "/contact/" },
];
