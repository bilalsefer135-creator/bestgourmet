import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gourmetbest.tr"),
  title: "Best Gourmet | Profesyonel Lezzet",
  description: "Yeni nesil işletmeler için premium tatlılar. Güvenilir üretim, güçlü sunum ve hızlı tedarik.",
  openGraph: {
    title: "Best Gourmet | Tatlı değil, imza bırakıyoruz.",
    description: "Profesyonel mutfaklar için premium tatlı seçkisi.",
    type: "website",
    locale: "tr_TR",
    images: [{ url: "/og.png", width: 1792, height: 928, alt: "Best Gourmet — Tatlı değil, imza bırakıyoruz." }],
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
