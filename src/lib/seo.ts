export const SITE_URL = "https://pillar-gold-and-onyx.lovable.app";
export const SITE_NAME = "Nour Essam El-Din Chartered Accountant";
export const SITE_DESCRIPTION =
  "Nour Essam El-Din provides accounting, tax, audit, financial statement, and business advisory services in Cairo and across Egypt.";
export const SITE_SOCIAL_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_LOGO = `${SITE_URL}/favicon.png`;

export const accountingServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: SITE_NAME,
  url: SITE_URL,
  image: SITE_SOCIAL_IMAGE,
  logo: SITE_LOGO,
  description: SITE_DESCRIPTION,
  telephone: "+201094866609",
  address: {
    "@type": "PostalAddress",
    streetAddress: "31 El Obour Buildings, Salah Salem Road",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  areaServed: {
    "@type": "Country",
    name: "Egypt",
  },
};
