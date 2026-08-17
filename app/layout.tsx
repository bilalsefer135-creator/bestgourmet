import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gourmetbest.tr"),
  title: "Best Gourmet | Profesyonel Lezzet",
  description: "Yeni nesil işletmeler için 69 çeşit premium tatlı. Güvenilir üretim, güçlü sunum ve planlı tedarik.",
  keywords: ["Best Gourmet", "toptan tatlı", "premium pasta", "etkinlik tatlıları", "İstanbul tatlı üretimi"],
  openGraph: {
    title: "Best Gourmet | Tatlı değil, imza bırakıyoruz.",
    description: "Profesyonel mutfaklar ve etkinlikler için 69 çeşit premium tatlı.",
    url: "https://gourmetbest.tr",
    siteName: "Best Gourmet",
    type: "website",
    locale: "tr_TR",
    images: [{ url: "/og.png", alt: "Best Gourmet — Tatlı değil, imza bırakıyoruz." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Gourmet | Profesyonel Lezzet",
    description: "Tatlı değil, imza bırakıyoruz.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
