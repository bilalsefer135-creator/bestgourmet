import type { Metadata } from "next";

export const SITE_URL = "https://bestgourmet.online";
export const HOME_TITLE = "İstanbul’da Toptan Tatlı | Best Gourmet";
export const HOME_DESCRIPTION = "İstanbul ve çevresindeki kafe ve pastaneler için toptan tatlı üretimi ve satışı. Best Gourmet ürünlerini inceleyin, işletmenize uygun seçki ve sipariş koşulları için iletişime geçin.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, SITE_URL).href;
  const image = new URL("/og.png", SITE_URL).href;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Best Gourmet",
      type: "website",
      locale: "tr_TR",
      images: [{ url: image, alt: "Best Gourmet — toptan tatlı seçkisi" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Best Gourmet",
  url: `${SITE_URL}/`,
  telephone: "+905015740522",
  email: "info@gourmetbest.tr",
  areaServed: "İstanbul ve çevresi",
};
