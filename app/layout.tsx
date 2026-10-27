import type { Metadata } from "next";
import AnalyticsConsent from "@/components/analytics-consent";
import { HOME_DESCRIPTION, HOME_TITLE, organizationJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./catalog-seo.css";
import "./guides.css";
import "./analytics.css";

export const metadata: Metadata = {
  ...pageMetadata(HOME_TITLE, HOME_DESCRIPTION, "/"),
  metadataBase: new URL(SITE_URL),
  keywords: ["Best Gourmet", "toptan tatlı", "premium pasta", "etkinlik tatlıları", "İstanbul tatlı üretimi"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
