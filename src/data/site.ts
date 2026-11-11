import importedContent from "./reference-content.json";

export type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string };

export type ReferencePage = {
  route: string;
  slug: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
  links: { text: string; href: string }[];
  images: Extract<ContentBlock, { type: "image" }>[];
};

const content = importedContent as { source: string; routes: ReferencePage[] };
export const referencePages = content.routes;

export function getPageBySlug(slug: string): ReferencePage | undefined {
  return referencePages.find((page) => page.slug === slug);
}

export function isBrandmarkImage(image: { src: string; alt: string }) {
  return image.alt.trim() === "12" || /(?:^|\/)\d+[a-f0-9]*-?12-(?:139x50|768x278)\.png(?:\?.*)?$/i.test(image.src);
}

export function getLeadImage(page: ReferencePage) {
  return page.images.find((image) => !isBrandmarkImage(image));
}

export function getLeadImageAlt(page: ReferencePage) {
  const image = getLeadImage(page);
  return image?.alt.trim() && image.alt.trim() !== "12" ? image.alt : page.title;
}

export const featuredServiceSlugs = [
  "audit-external-financial-review",
  "comprehensive-tax-advisory",
  "internal-audit-services",
  "tax-returns-filing",
  "tax-examination-inspection-support",
  "financial-statements-preparation",
];

export const otherServiceSlugs = [
  "e-invoicing-services",
  "company-formation-registration",
  "payroll-internal-reporting-support",
  "feasibility-studies-project-evaluation",
  "assets-business-valuation",
  "government-authorities-support",
];

export const allServiceSlugs = [...featuredServiceSlugs, ...otherServiceSlugs];

export const allServicePages = allServiceSlugs.flatMap((slug) => {
  const page = getPageBySlug(slug);
  return page ? [{ slug, title: page.title, route: page.route }] : [];
});

export const featuredServiceImages: Record<string, string> = {
  "audit-external-financial-review": "/images/pillar/audit-service.jpg",
  "comprehensive-tax-advisory": "/images/pillar/tax-advisory.jpg",
  "internal-audit-services": "/images/pillar/internal-audit.jpg",
  "tax-returns-filing": "/images/pillar/tax-filing.jpg",
  "tax-examination-inspection-support": "/images/pillar/tax-examination.jpg",
  "financial-statements-preparation": "/images/pillar/statements.jpg",
};

export const primaryNavigation = [
  { label: "Home Page", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Why Pillar Group", href: "/why-us/" },
  { label: "About Pillar Group", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];
